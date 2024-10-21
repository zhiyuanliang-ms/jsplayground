import { AppConfigurationClient } from "@azure/app-configuration";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const cdnEndpoint = "https://cdn-lzy-b6cxh7fqgybug9dx.z01.azurefd.net";

const dummyTokenCredential = {
    getToken: async () => { return {token: "", expiresOnTimestamp: 0}}
};

// const fakeConnectionString = "Endpoint=" + cdnEndpoint + ";Id=0;Secret=0"
// const client = new AppConfigurationClient(fakeConnectionString);

const client = new AppConfigurationClient(cdnEndpoint, dummyTokenCredential);

const listOptions = {
    keyFilter: "app*",
    labelFilter: "\0"
};

const settings = client.listConfigurationSettings(listOptions);

for await (const setting of settings) {
    console.log(setting);
}