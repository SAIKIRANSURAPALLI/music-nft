module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: false,
  };
  return config;
};
