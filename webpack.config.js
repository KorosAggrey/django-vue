var path = require('path');
var webpack = require('webpack');


// Naming and path settings
var appName = 'app';


// Environment flag
var plugins = [];
var env = process.env.VUE_ENV;

// Differ settings base on production flag
if (env === 'production') {
    var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

    plugins.push(new UglifyJsPlugin({ minimize: true }));
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));

    appName = appName + '.min.js';
} else {
    appName = appName + '.js';
}


module.exports = {
    mode: 'development',

    context: __dirname,

    entry: './static_root/src/index.js',

    output: {
        path: path.resolve('./static_root/bundles'),
        filename: '[name].js',
    },

    // plugins: [
    //     new webpack.ProvidePlugin({
    //         $: 'jquery',
    //         jQuery: 'jquery',
    //         'window.jQuery': 'jquery'
    //     }),
    // ],

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    resolve: {
        alias: {vue: 'vue/dist/vue.js'},
        modules: ['node_modules'],
        extensions: ['*', '.js', '.vue', '.json'],
    },
    plugins,
    performance: {
        hints: false
    }
};
