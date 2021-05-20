const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.s?css$/i,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/shell/",
  },
  devtool: "inline-source-map", // TODO: Make source maps external to decrease JS bundle size
  mode: "development", // TODO: Set this to 'production' once I'm happy to get a minified output
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "0.0.0.0",
    port: 1001,
    // historyApiFallback: true, // TODO: Uncomment this when we want the micro-frontend to have separate routes. I've only commented this out now so that I could easily serve /bundle.js to the app shell
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
