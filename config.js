// as default, NFT is disabled for everyone
export default {
    MODULES: {
        NFT: process.env.NFT && './src/modules/nft/index.js',
        MARKER: process.env.MARKER && './src/modules/marker/index.js',
        LOCATION: process.env.LOCATION && './src/modules/location/index.js',
    },
};
