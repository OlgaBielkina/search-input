module.exports = {
    presets: [
        [
            '@babel/env',
            {
                useBuiltIns: 'usage',
                corejs: { version: 3, proposals: true },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    sourceType: 'unambiguous',
};
