const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
			template: './src/html/index.ejs',
			chunks: ['style', 'jquery', 'index']
		}),
		new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/html/login.html',
            chunks: ['style', 'jquery', 'login']
        }),
        new webpack.ProvidePlugin({
        	$: 'jquery-1x',
        	jQuery: 'jquery-1x'
        }),
        new CopyWebpackPlugin([{
        	from: './src/static', 
        	to: 'static'
        }]),
        new MiniCssExtractPlugin({
        	filename: 'css/[name].css'
        })
	],
	optimization: {
       	splitChunks: {
           	cacheGroups: {
               	commons: {
                   	test: /jquery/,
                   	name: 'jquery',
                   	chunks: 'all'
               	},
               	styles: {
               		test: /[\\/]common[\\/].+\.css$/,
               		name: 'styles',
               		chunks: 'all',
               		enforce: true
               	}
           	}
       	},
       	minimizer: [
       		new UglifyJsPlugin({
               	uglifyOptions: {
                 	ie8: true
               	}
           	})
       	]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
              	exclude: /(node_modules|bower_components)/,
	            use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
						  	'@babel/plugin-transform-runtime',
						  	'@babel/plugin-transform-modules-commonjs'
						]
					}
	            }
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.styl$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
			},
			{
				test: /\.ejs/,
				use: ['ejs-loader']
			},
			{
				test: /\.(png|svg|jpg|gif|webp)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// 最终生成的css代码中，图片url前缀
							publicPath: '../images',
							// 图片输出的实际路径(相对于dist)
							outputPath: 'images',
							// 当小于某个KB时转为base64
							limit: 0
						}
					}
				]
			}
		]
	}
};