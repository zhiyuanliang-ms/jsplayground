import { AppConfigurationClient } from "@azure/app-configuration";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const endpoint = "https://localhost:8443";

const dummyTokenCredential = {
    getToken: async () => {
        return {
            token: "",
            expiresOnTimestamp: ""
        }
    }
};

const connectionString = "Endpoint=" + endpoint + ";Id=0;Secret=0"

const client = new AppConfigurationClient(connectionString);

// const client = new AppConfigurationClient(endpoint, dummyTokenCredential);

const settings = client.listConfigurationSettings();


for await (const setting of settings) {
    console.log(setting);
}