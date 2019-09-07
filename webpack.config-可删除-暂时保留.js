const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './src/js/index.js',
		login: './src/js/login.js'
	},
	output: {
		// js生成到dist/js，[name]表示保留原js文件名
		filename: 'js/[name].js',
		// 输出路径为dist
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		// 自动清空dist目录
		new CleanWebpackPlugin(),
		// 设置html模板生成路径
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/html/index.html',
			chunks: ['index']
		}),
		new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/html/login.html',
            chunks: ['login']
        }),
	],
	// 动态监测并实时更新页面
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		// 默认8080, 可不写
		port: 8080,
		// 热更新，无需刷新
		hot: true
	},
	// 方便追踪源代码错误
	// inline-source-map: 将source map 转换为 DataUrl 后添加到页面的js中，生成的js文件较大（不推荐）
	// source-map: 生成对应的map文件，js较小，但是需要服务器设置不允许访问map文件（推荐）
	devtool: 'source-map',
};