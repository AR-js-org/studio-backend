import CONFIG from './config';

const promises = [];

Object.keys(CONFIG.MODULES).forEach((module) => {
    if (CONFIG.MODULES[module]) {
        promises.push(import(CONFIG.MODULES[module]));
    }
});
Object.keys(CONFIG.PROVIDERS).forEach((provider) => {
    if (CONFIG.PROVIDERS[provider]) {
        promises.push(import(CONFIG.PROVIDERS[provider]));
    }
});

Promise.all(promises)
    .then(() => {
        console.log('All AR Modules have been loaded');
    })
    .catch((err) => {
        console.error('Error in loading AR Modules', err);
});
