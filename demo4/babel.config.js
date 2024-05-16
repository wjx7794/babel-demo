module.exports = {
  presets: ['@babel/env'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: true,
        corejs: 3,
        regenerator: true,
        useESModules: true,
        absoluteRuntime: false,
        // version: '7.0.0-beta.0',
      },
    ],
  ],
};
