const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  pageExtensions: ['js', 'jsx'], // Add any other extensions you want to support
};
