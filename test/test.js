const sleepInMs = require("util").promisify(setTimeout);
const { load } = require("@azure/app-configuration-provider");
const { getDefaultAzureCredential } = require("@azure/identity");
const { FeatureManager, ConfigurationMapFeatureFlagProvider} = require("@microsoft/feature-management")

class RandomFilter {
    name = "Random";

    evaluate(context) {
        const percentage = context.parameters.Percentage;
        const randomNumber = Math.random() * 100;
        return randomNumber <= percentage;
    }
}

const endpoint = "https://appconfig-lzy.azconfig.io";
const credential = getDefaultAzureCredential();

async function run() {
    // Connecting to Azure App Configuration using connection string
    const settings = await load(endpoint, credential, {
        featureFlagOptions: {
            enabled: true,
            // Note: selectors must be explicitly provided for feature flags.
            selectors: [{
                keyFilter: "*"
            }],
            refresh: {
                enabled: true,
                refreshIntervalInMs: 10_000
            }
        }
    });

    // Creating a feature flag provider which uses a map as feature flag source
    const ffProvider = new ConfigurationMapFeatureFlagProvider(settings);
    // Creating a feature manager which will evaluate the feature flag
    const fm = new FeatureManager(ffProvider, {customFilters: [new RandomFilter()]});

    // Polling for configuration changes every 5 seconds
    while (true) {
        await sleepInMs(5000); // Waiting before the next refresh
        await settings.refresh(); // Refreshing the configuration setting
        const isEnabled = await fm.isEnabled("Beta"); // Evaluate the feature flag
        console.log(`Beta is enabled: ${isEnabled}`);
    }
}

run().catch(console.error);