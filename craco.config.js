const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");

module.exports = {
    reactScriptsVersion: "react-scripts" /* (default value) */,
    eslint: {
        enable: true /* (default value) */,
        mode: "extends" /* (default value) */ || "file",
        // mode: ESLINT_MODES.file,
        configure: { /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */ },
        configure: (eslintConfig, { env, paths }) => { return eslintConfig; },
        pluginOptions: { /* Any eslint plugin configuration options: https://github.com/webpack-contrib/eslint-webpack-plugin#options. */ },
        pluginOptions: (eslintOptions, { env, paths }) => { return eslintOptions; }
    },
    babel: {
        presets: [],
        plugins: [],
        loaderOptions: { /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */ },
        loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions; }
    },
    webpack: {
        alias: {},
        plugins: {
            add: [], /* An array of plugins */
            add: [], /* An array of plugins */
            remove: [],  /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */
        },
        stats: 'errors-only',

        configure: { /* Any webpack configuration options: https://webpack.js.org/configuration */ },
        configure: (webpackConfig, { env, paths }) => { return webpackConfig; }
    },
    devServer: { /* Any devServer configuration options: https://webpack.js.org/configuration/dev-server/#devserver */ },
    devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => { return devServerConfig; },
  
};