function buildConfig(env) {
  return require(`./${env}.js`)(env)
}

module.exports = buildConfig;
