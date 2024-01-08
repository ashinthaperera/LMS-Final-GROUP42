const path = require('path');

module.exports = {
  resolve: (source) => {
    if (source.endsWith('.jpg') || source.endsWith('.jpeg') || source.endsWith('.png') || source.endsWith('.gif') || source.endsWith('.webp') || source.endsWith('.svg')) {
      return path.resolve(__dirname, 'file-mock.js');
    }

    return source;
  },
};
