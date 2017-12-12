const webpack = require('webpack');
module.exports = function(useSourceMap) {
    return {
        plugins: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          }),
        ]
    };
};
