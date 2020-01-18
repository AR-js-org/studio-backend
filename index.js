import MODULES from './config';

const promises = [];

Object.keys(MODULES).forEach((module) => {
    if (MODULES[module]) {
        promises.push(import(MODULES[module]));
    }
});

Promise.all(promises)
    .then(() => {
        console.log('All AR Modules have been loaded');
    })
    .catch((err) => {
        console.error('Error in loading AR Modules', err);
});
