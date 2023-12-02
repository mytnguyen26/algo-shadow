module.exports = {
    presets: [
      ["@babel/preset-env", {
        "targets": {
          "node": "current"
        },
        "modules": "commonjs"
      }],
      ["@babel/preset-react", {
        "runtime": "automatic"
      }]
    ],
    plugins: [
      "@babel/plugin-syntax-jsx",
      "@babel/plugin-transform-react-jsx",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-modules-commonjs",
      "@babel/plugin-proposal-class-properties"
    ]
  };