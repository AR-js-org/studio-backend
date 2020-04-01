import { Octokit } from '@octokit/rest';
import { Provider as BaseProvider, ENC_UTF8 } from './provider';

/* eslint-disable no-unused-vars */
const MODE_FILE = '100644';
const MODE_EXEC = '100755';
const MODE_SUBDIR = '040000';
const MODE_SUBMOD = '160000';
const MODE_SYMLINK = '120000';

const TYPE_BLOB = 'blob';
const TYPE_TREE = 'tree';
const TYPE_COMMIT = 'commit';

const DEFAULT_PAGE_BRANCH = 'gh-pages';
const DEFAULT_COMMIT_MESSAGE = 'built with AR.js Studio';

const rndRepoName = () => {
    const max = 999999;
    const min = 100000;

    return `arjs-studio-${Math.floor(Math.random() * (max - min)) + min}`;
};

export class GithubProvider extends BaseProvider {
    /**
     * Add file to bundle.
     *
     * @param {string} path repository path
     * @param {string} content
     * @param {string} [encoding] utf-8 or base64
     */
    addFile(path, content, encoding = ENC_UTF8) {
        this.files.push({
            content,
            encoding,
            path,
        });
    }

    /**
     * Publish files creating a commit in a custom branch.
     *
     * @param {Object} config
     * @param {string} config.token - GitHub authorization token
     * @param {string} [config.message] - commit message
     * @param {string|null} [config.repo] - repository name (default to random name)
     * @param {string|null} [config.branch] - branch name (default to 'gh-pages')
     * @param {string|null} [config.owner] - owner login name (automatically retrieved if null)
     * @return {Promise<string|null>} - Pages URL for this repository
     */
    async serveFiles({ token, message = DEFAULT_COMMIT_MESSAGE, repo = null, branch = null, owner = null } = {}) {
        super.serveFiles();

        if (!token) {
            throw new Error('Missing required token parameter');
        }

        this.client = new Octokit({
            auth: token,
        });

        this.owner = owner || await this.getOwner();
        this.repo = repo || rndRepoName();
        this.branch = branch || DEFAULT_PAGE_BRANCH;

        await this.getOrCreateRepo(this.repo);
        const ghBranch = await this.getOrCreateBranch(this.branch);
        const blobFiles = await Promise.all(
            /** @type {Array<GitFile>} */
            this.files.map((file) => this.createBlob(file.content, file.encoding)
                .then((data) => ({
                    path: file.path,
                    sha: data.sha,
                    mode: MODE_FILE,
                    type: TYPE_BLOB,
                })))
        );
        const tree = await this.createTree(blobFiles);
        const commit = await this.createCommit(message, tree.sha, [ghBranch.commit.sha]);
        await this.updateRef(commit.sha, this.branch);

        // enable Pages for custom branches
        if (this.branch !== DEFAULT_PAGE_BRANCH) {
            await this.enablePages(this.branch);
        }

        await this.rebuildPages();
        return this.getPagesUrl();
    }

    /**
     * @return {Promise<string>}
     */
    getOwner() {
        return this.client.users.getAuthenticated()
            .then(({ data }) => data.login);
    }

    async getOrCreateRepo(name) {
        try {
            return await this.getRepo(name);
        } catch (e) {
            // console.warn('repo not found, creating');
            return await this.createRepo(name);
        }
    }

    async getOrCreateBranch(name) {
        try {
            return await this.getBranch(name);
        } catch (e) {
            // console.warn('branch not found, creating');
            const masterRef = await this.getRef('master');
            await this.createBranch(masterRef.object.sha, name);
            return await this.getBranch(name);
        }
    }

    /**
     * Scope: public_repo
     *
     * @link https://developer.github.com/v3/repos/#create
     *
     * @param {string} name repository name
     * @return {Promise<Octokit.ReposCreateForAuthenticatedUserResponse>}
     */
    createRepo(name) {
        return this.client.repos.createForAuthenticatedUser({
            name,
            auto_init: true, // first commit
        }).then(({ data }) => data);
    }

    /**
     * @param {string} name repository name
     * @return {Promise<Octokit.ReposGetResponse>}
     */
    getRepo(name) {
        return this.client.repos.get({
            owner: this.owner,
            repo: name,
        }).then(({ data }) => data);
    }

    /**
     * @link https://developer.github.com/v3/git/refs/#create-a-reference
     *
     * @param {string} sha commit SHA from which to branch off
     * @param {string} [branch] new branch name (default to Pages branch)
     * @return {Promise<Octokit.GitCreateRefResponse>}
     */
    createBranch(sha, branch = DEFAULT_PAGE_BRANCH) {
        return this.client.git.createRef({
            owner: this.owner,
            repo: this.repo,
            ref: `refs/heads/${branch}`,
            sha, // original reference
        }).then(({ data }) => data);
    }

    /**
     * @link https://developer.github.com/v3/repos/branches/#get-branch
     *
     * @param name
     * @return {Promise<Octokit.ReposGetBranchResponse>}
     */
    getBranch(name) {
        return this.client.repos.getBranch({
            owner: this.owner,
            repo: this.repo,
            branch: name,
        }).then(({ data }) => data);
    }

    /**
     * Get SHA of currently referenced commit for a branch.
     * Useful for getting a reference to create a new branch.
     *
     * @link https://developer.github.com/v3/git/refs/#get-a-single-reference
     *
     * @param {string} [branch] branch name (default to master)
     * @return {Promise<Octokit.GitGetRefResponse>}
     */
    getRef(branch = 'master') {
        return this.client.git.getRef({
            owner: this.owner,
            repo: this.repo,
            ref: `heads/${branch}`,
        }).then(({ data }) => data);
    }

    /**
     * @param {string} [branch] branch on which to enable Pages (default to Pages branch)
     * @return {Promise<Octokit.Response<Octokit.ReposEnablePagesSiteResponse>>}
     */
    enablePages(branch = this.branch) {
        return this.client.repos.enablePagesSite({
            owner: this.owner,
            repo: this.repo,
            source: {
                branch,
            },
        });
    }

    /**
     * Force a Pages build.
     *
     * @return {Promise<Octokit.ReposRequestPageBuildResponse>}
     */
    rebuildPages() {
        return this.client.repos.requestPageBuild({
            owner: this.owner,
            repo: this.repo,
        }).then(({ data }) => data);
    }

    /**
     * @return {Promise<string>}
     */
    getPagesUrl() {
        return this.client.repos.getPages({
            owner: this.owner,
            repo: this.repo,
        }).then(({ data }) => data.html_url);
    }

    /**
     * Add a single file with a commit.
     *
     * @param {string} content file content
     * @param {string} path file path
     * @param {string} message commit message
     * @param {string} [branch] branch to commit to (default to Pages branch)
     * @return {Promise<Octokit.ReposCreateOrUpdateFileResponse>}
     */
    commitFile(content, path, message, branch = this.branch) {
        return this.client.repos.createOrUpdateFile({
            owner: this.owner,
            repo: this.repo,
            path,
            message,
            content, // base64
            branch,
        }).then(({ data }) => data);
    }

    /**
     * Create a file tree to commit.
     *
     * @link https://octokit.github.io/rest.js/#octokit-routes-git-create-tree
     * @link https://developer.github.com/v3/git/trees/#create-a-tree
     *
     * @param {GitFile[]} files list of blobs
     * @return {Promise<Octokit.GitCreateTreeResponse>}
     */
    createTree(files) {
        /**
         * @typedef GitFile
         * @property {string} path repository path
         * @property {string} [content] file content, either this or sha
         * @property {string} [sha] blob sha, either this or content
         * @property {number} [mode] 100644 file, 040000 dir
         * @property {string} [type] blob (file) or tree (dir)
         */

        return this.client.git.createTree({
            owner: this.owner,
            repo: this.repo,
            tree: files,
        }).then(({ data }) => data);
    }

    /**
     * Create a file blob for a tree.
     *
     * @link https://developer.github.com/v3/git/blobs/#create-a-blob
     *
     * @param {string} content text or base64 blob content
     * @param [encoding] blob encoding, either 'utf-8' or 'base64' (default to 'utf-8')
     * @return {Promise<Octokit.GitCreateBlobResponse>}
     */
    createBlob(content, encoding = ENC_UTF8) {
        return this.client.git.createBlob({
            owner: this.owner,
            repo: this.repo,
            content,
            encoding, // either 'utf-8' or 'base64'
        }).then(({ data }) => data);
    }

    /**
     * Commit a tree.
     *
     * @link https://octokit.github.io/rest.js/#octokit-routes-git-create-commit
     * @link https://developer.github.com/v3/git/commits/#create-a-commit
     *
     * @param {string} message commit message
     * @param {string} tree SHA of the tree to commit
     * @param {string[]} [parents] array of parent commit SHA strings
     * @return {Promise<Octokit.GitCreateCommitResponse>}
     */
    createCommit(message, tree, parents = []) {
        return this.client.git.createCommit({
            owner: this.owner,
            repo: this.repo,
            message,
            tree, // SHA
            parents,
        }).then(({ data }) => data);
    }

    /**
     * Update a branch to reference a new commit.
     *
     * @link https://octokit.github.io/rest.js/#octokit-routes-git-update-ref
     * @link https://developer.github.com/v3/git/refs/#update-a-reference
     *
     * @param {string} sha git commit SHA to reference
     * @param {string} [branch] branch to update (default to Pages branch)
     * @return {Promise<Octokit.GitUpdateRefResponse>}
     */
    updateRef(sha, branch = this.branch) {
        return this.client.git.updateRef({
            owner: this.owner,
            repo: this.repo,
            ref: `heads/${branch}`,
            sha,
            force: true, // ignore errors
        }).then(({ data }) => data);
    }
}
