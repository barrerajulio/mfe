const { merge } = require("webpack-merge");
const ModuleFederationModule = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("./../package.json");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name][contenthash].js",
  },
  plugins: [
    new ModuleFederationModule({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
