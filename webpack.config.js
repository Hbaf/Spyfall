const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	devServer: {
		contentBase: './dist',
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './dist/index.html',
			favicon: './src/media/images/Spy_favicon.ico',
		}),
	],
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				use: 'ts-loader',
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: 'file-loader',
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: [path.resolve(__dirname, './src'), path.resolve(__dirname, './node_modules')],
	},
};
