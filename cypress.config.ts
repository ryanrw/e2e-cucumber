import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import * as createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { config as loadEnv } from "dotenv";

loadEnv();

export default defineConfig({
  env: {
    ewaas_url: process.env.EWAAS_URL,
  },
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});
