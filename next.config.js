const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

// Pushing the env variables to next js config
module.exports = {
	webpack(config) {
		config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
		return config;
	},
};
