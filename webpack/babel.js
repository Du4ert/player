module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            query: {
              plugins: ['transform-runtime', 'react-hot-loader/babel'],
              presets: ['es2015', 'stage-0', 'react'],
            }
          }
        }
      ]
    }
  };
};
