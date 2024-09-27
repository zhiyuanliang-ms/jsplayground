const azureIdentity = require("@azure/identity");
const appConfig = require("@azure/app-configuration");
const appConfigProvider = require("@azure/app-configuration-provider");

// const endpoint = "https://lzy-cdn.azurewebsites.net/api/FakeCDN?";

const dotenv = require("dotenv");
dotenv.config();

const endpoint = "https://appconfig-lzy.azconfig.io";
// powershell
// $Env:AZURE_TENANT_ID = "e6df9ecc-8735-410f-bb84-6daa89dcc658"
// $Env:AZURE_CLIENT_ID = "63310471-addb-4785-b7d0-3c1de3399977"
// $Env:AZURE_CLIENT_SECRET = "j778Q~XChQmh9w.BbQh80JqTv3l8aC7ufBxEvbGD"

// cmd
// setx AZURE_TENANT_ID "e6df9ecc-8735-410f-bb84-6daa89dcc658"
// setx AZURE_CLIENT_ID "63310471-addb-4785-b7d0-3c1de3399977"
// setx AZURE_CLIENT_SECRET "j778Q~XChQmh9w.BbQh80JqTv3l8aC7ufBxEvbGD"
let credential = new azureIdentity.DefaultAzureCredential();


// credential = azureIdentity.getDefaultAzureCredential();

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