const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  //   기존의 웹팩 설정 옵션들...
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      //   crypto: false,
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    // 기존의 플러그인들...
  ],
};
