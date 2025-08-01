const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production';
	
	return {
		mode: isProduction ? 'production' : 'development',
		entry: './src/index.tsx',
		devtool: isProduction ? undefined : 'inline-source-map',
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
				template: path.resolve(__dirname, 'src/index.html'),
				favicon: './src/media/images/Spy_favicon.ico',
			}),
		],
		module: {
			rules: [
				{
					test: /\.ts(x?)$/,
					use: {
						loader: 'ts-loader',
						options: {
							transpileOnly: isProduction,
							configFile: path.resolve(__dirname, 'tsconfig.json')
						}
					},
					exclude: /node_modules/
				},
				{
					test: /\.s[ac]ss$/i,
					use: ['style-loader', 'css-loader', { loader: 'sass-loader', options: { api: 'modern' } }],
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
};
