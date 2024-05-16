module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        targets: {
          firefox: '27',
        },
        corejs: 3,
        modules: false,
      },
    ],
  ],
  plugins: [],
};
