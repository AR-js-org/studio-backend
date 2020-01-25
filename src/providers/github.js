import Octokit from '@octokit/rest';

export class Github {
    constructor (token = null) {
        this.client = new Octokit({
            auth: token
        });
    }

    /**
     * Scope: public_repo
     *
     * @link https://developer.github.com/v3/repos/#create
     *
     * @param {string} name repository name
     * @return {Promise<Octokit.Response<Octokit.ReposCreateForAuthenticatedUserResponse>>}
     */
    createRepo (name) {
        return this.client.repos.createForAuthenticatedUser({
            name,
            auto_init: true // first commit
        });
    }

    /**
     * @link https://developer.github.com/v3/git/refs/#create-a-reference
     *
     * @param {string} sha commit SHA from which to branch
     * @param {string} [ref] new branch reference (default to Pages branch)
     * @return {Promise<Octokit.Response<Octokit.GitCreateRefResponse>>}
     */
    createBranch (sha, ref = 'refs/heads/gh-pages') {
        return this.client.git.createRef({
            owner,
            repo,
            ref,
            sha // original reference
        });
    }

    /**
     * Get SHA of currently referenced commit for a branch.
     * Useful for getting a reference to create a new branch.
     *
     * @link https://developer.github.com/v3/git/refs/#get-a-single-reference
     *
     * @param {string} [ref] git branch reference (default to master)
     * @return {Promise<Octokit.Response<Octokit.GitGetRefResponse>>}
     */
    getRef (ref = 'heads/master') {
        return this.client.git.getRef({
            owner,
            repo,
            ref
        });
    }

    /**
     * @param {string} [branch] branch on which to enable Pages (default to Pages branch)
     * @return {Promise<Octokit.Response<Octokit.ReposEnablePagesSiteResponse>>}
     */
    enablePages (branch = 'gh-pages') {
        return this.client.repos.enablePagesSite({
            owner,
            repo,
            source: {
                branch
            }
        });
    }

    /**
     * Force a Pages build.
     *
     * @return {Promise<Octokit.Response<Octokit.ReposRequestPageBuildResponse>>}
     */
    rebuildPages () {
        return this.client.repos.requestPageBuild({
            owner,
            repo
        });
    }

    /**
     * Add a single file with a commit.
     *
     * @param {string} content file content
     * @param {string} [branch] branch to commit to (default to Pages branch)
     * @return {Promise<Octokit.Response<Octokit.ReposCreateOrUpdateFileResponse>>}
     */
    commitFile (content, branch = 'gh-pages') {
        return this.client.repos.createOrUpdateFile({
            owner,
            repo,
            path,
            message,
            content, // base64
            branch
        });
    }

    /**
     * Create a file tree to commit.
     *
     * @link https://octokit.github.io/rest.js/#octokit-routes-git-create-tree
     * @link https://developer.github.com/v3/git/trees/#create-a-tree
     *
     * @param {GitFile[]} files list of blobs
     * @return {Promise<Octokit.Response<Octokit.GitCreateTreeResponse>>}
     */
    createTree (files) {
        /**
         * @typedef GitFile
         * @property {string} path repository path
         * @property {string} [content] file content, either this or sha
         * @property {string} [sha] blob sha, either this or content
         * @property {number} [mode] 100644 file, 040000 dir
         * @property {string} [type] blob (file) or tree (dir)
         */

        return this.client.git.createTree({
            owner,
            repo,
            tree: files
        });
    }

    /**
     * Create a file blob for a tree.
     *
     * @link https://developer.github.com/v3/git/blobs/#create-a-blob
     *
     * @param {string} content text or base64 blob content
     * @param [encoding] blob encoding, either 'utf-8' or 'base64' (default to 'utf-8')
     * @return {Promise<Octokit.Response<Octokit.GitCreateBlobResponse>>}
     */
    createBlob (content, encoding = 'utf-8') {
        return this.client.git.createBlob({
            owner,
            repo,
            content,
            encoding // either 'utf-8' or 'base64'
        });
    }

    /**
     * Commit a tree.
     *
     * @link https://octokit.github.io/rest.js/#octokit-routes-git-create-commit
     * @link https://developer.github.com/v3/git/commits/#create-a-commit
     *
     * @param {string} message commit message
     * @param {tree} tree SHA of the tree to commit
     * @return {Promise<Octokit.Response<Octokit.GitCreateCommitResponse>>}
     */
    createCommit (message, tree) {
        return this.client.git.createCommit({
            owner,
            repo,
            message,
            tree // SHA
        });
    }

    /**
     * Update a branch to reference a new commit.
     *
     * @link https://octokit.github.io/rest.js/#octokit-routes-git-update-ref
     * @link https://developer.github.com/v3/git/refs/#update-a-reference
     *
     * @param {string} sha git commit SHA to reference
     * @param {string} [ref] git reference to update (default to Pages branch)
     * @return {Promise<Octokit.Response<Octokit.GitUpdateRefResponse>>}
     */
    updateRef (sha, ref = 'refs/heads/gh-pages') {
        return this.client.git.updateRef({
            owner,
            repo,
            ref,
            sha
        });
    }
}
