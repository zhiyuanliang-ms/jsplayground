const { InteractiveBrowserCredential, DefaultAzureCredential } = require("@azure/identity");
const appConfig = require("@azure/app-configuration");
const appConfigProvider = require("@azure/app-configuration-provider");

// const dotenv = require("dotenv");
// dotenv.config();

const endpoint = "https://zhiyuanliang-ac.azconfig.io";
// powershell
// $Env:AZURE_TENANT_ID = "72f988bf-86f1-41af-91ab-2d7cd011db47"
// $Env:AZURE_CLIENT_ID = ""
// $Env:AZURE_CLIENT_SECRET = ""

// cmd
// setx AZURE_TENANT_ID "72f988bf-86f1-41af-91ab-2d7cd011db47"
// setx AZURE_CLIENT_ID ""
// setx AZURE_CLIENT_SECRET ""
let credential = new DefaultAzureCredential();

// let credential = new InteractiveBrowserCredential({tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47"});

const client = new appConfig.AppConfigurationClient(
  endpoint, // ex: <https://<your appconfig resource>.azconfig.io>
  credential
);


// client.getConfigurationSetting({key: "message"}).then(res => console.log(res))

const settings = client.listConfigurationSettings()

async function listSettings() {
    for await (const setting of settings) {
        console.log(setting);
    }
}

listSettings().catch(console.error);


// appConfigProvider.load(endpoint, credential).then(res => console.log(res.constructConfigurationObject()))