const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = (env, argv) => ({
    devtool: argv.mode === 'production' ? false : 'inline-source-map',

    entry: {
        ui: './src/ui/ui.ts',
        code: './src/code.ts'
    },

    module: {
        rules: [
            // 处理 TypeScript 文件
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },

            // 处理 .mjs 文件
            {
                test: /\.mjsx?$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },

            // 处理 CSS 文件
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },

            // 处理 SCSS 文件
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            },

            // 处理 Pug 模板
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            },

            // 处理 Vue 文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            // 处理资源文件（使用 Webpack 5 的 Asset Modules）
            {
                test: /\.(png|jpg|gif|webp|svg)$/i,
                type: 'asset/inline'
            }
        ]
    },

    resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new VueLoaderPlugin(),
        new RemovePlugin({
            after: { include: ['dist/ui.js'] }
        }),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         compress: {
        //             drop_console: true,
        //             drop_debugger: true,
        //             pure_funcs: ['console.log'],
        //         },
        //     },
        // }),
        new HtmlWebpackPlugin({
            filename: 'ui.html',
            chunks: ['ui'],
            inject: false,
            templateContent: ({ htmlWebpackPlugin, compilation }) => {
                const cssAssets = htmlWebpackPlugin.files.css;
                const jsAssets = htmlWebpackPlugin.files.js;

                const styles = cssAssets
                    .map(asset => `<style>${compilation.assets[asset].source()}</style>`)
                    .join('\n');
                const scripts = jsAssets
                    .map(asset => `<script>${compilation.assets[asset].source()}</script>`)
                    .join('\n');

                return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Figma Tags Test</title>
        ${styles}
      </head>
      <body>
        <div id="app"></div>
        ${scripts}
      </body>
      </html>
    `;
            }
        })
    ]
});