const path = require("path");

const resolvePath = (_path) => path.resolve(__dirname, _path); //相对路径转绝对路径

const HtmlWebpackPlugin = require("html-webpack-plugin"); //创建模板

const baseConfig = {
  entry: resolvePath("../src/index.js"),
  output: {
    path: resolvePath("../build"),
    filename: "js/[name].bundle.js",
    clean: true,
    library: {
      name: "antd-tree",
      type: "umd",
    },
  },
  resolve: {
    // 要解析的文件的扩展名
    extensions: [".js", ".jsx", ".json"],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              // attributes: { "data-web-component-style": "antd-tree" },
              styleTagTransform: function (css, style) {
                const styleTag = document.createElement("style-store");
                styleTag.setAttribute("data-web-component-style", "antd-tree");
                styleTag.innerHTML = `${css}.modify{}\n`;
                document.head.appendChild(styleTag);
              },
            },
          },
          "css-loader",
          "postcss-loader",
        ], //从右往左执行
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        //使用include来指定编译文件夹
        include: path.resolve(__dirname, "../src"),
        //使用exclude排除指定文件夹
        exclude: /node_modules/,
        use: [
          "cache-loader",
          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: "asset",
        parser: {
          // 转base64的条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          // 打包到 image 文件下
          filename: "images/[contenthash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath("../public/index.html"),
      filename: "index.html",
      title: "",
    }),
  ],
};

module.exports = {
  resolvePath,
  baseConfig,
};
