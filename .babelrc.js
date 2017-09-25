module.exports = function(context) {
  const env = context.cache(() => process.env.BABEL_ENV);
  const isServer = env === "server";

  let targets = {
    "chrome": { chrome: 60 },
    "edge": { edge: 14 },
    "safari": { safari: 10 },
    "firefox": { firefox: 54 },
    "server": { node: 6 },
    "fallback": {
      browsers: ["last 2 versions", "ie >= 11", "safari >= 7"]
    },
  };

  return {
    presets: [
      ["env", {
        targets: targets[env],
        modules: isServer ? "commonjs" : false,
        loose: isServer ? false : true,
        // debug: true,
      }]
    ],
    plugins: [
      ["transform-class-properties"],
      ["transform-es2015-block-scoping", {
        "throwIfClosureRequired": true
      }],
      ["transform-react-jsx", {
        pragma: "React.createElement",
        useBuiltIns: true
      }]
    ]
  };
};
