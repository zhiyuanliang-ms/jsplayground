import { useState, useEffect } from 'react'
import { ApplicationInsights } from "@microsoft/applicationinsights-web"
import { ConfigurationObjectFeatureFlagProvider, FeatureManager } from "@microsoft/feature-management"
import { load } from "@azure/app-configuration-provider";
import { trackEvent, createTelemetryPublisher } from "@microsoft/feature-management-applicationinsights-browser"
import './App.css'

const appInsights = new ApplicationInsights({ config: {
  connectionString: "InstrumentationKey=4d6ce866-937d-4ab4-8b1d-a9d4da485b64;IngestionEndpoint=https://eastasia-0.in.applicationinsights.azure.com/;LiveEndpoint=https://eastasia.livediagnostics.monitor.azure.com/;ApplicationId=9e20d3f8-2192-428e-b12f-77f8d601c7ba"
}});
appInsights.loadAppInsights();

const config = {
  "feature_management": {
      "feature_flags": [
        {
          "id": "TestFeature",
          "enabled": true,
          "variants": [ 
            {
              "name": "Big",
              "configuration_value": "60px"
            },
            {
              "name": "Small",
              "configuration_value": "30px"
            }
          ],
          "allocation": {
            "percentile": [
              { 
                "variant": "Big",
                "from": 0,
                "to": 50 
              },
              { 
                "variant": "Small",
                "from": 50,
                "to": 100 
              }
            ]
          },
          "telemetry": {
            "enabled": true
          }
        }
      ]
  }
};

function App() {
  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userId, setUserId] = useState('');
  const [fontSize, setFontsize] = useState('30px');
  const [count, setCount] = useState(0);

  const init = async () => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user') ?? generateRandomId(); // Get 'user' parameter from query string

    setUserId(user);

    const ffProvider = new ConfigurationObjectFeatureFlagProvider(config);
    const fm = new FeatureManager(ffProvider, { onFeatureEvaluated: createTelemetryPublisher(appInsights)})

    const variant = await fm.getVariant("TestFeature", { userId: user })

    if (variant) {
      setFontsize(variant.configuration);
    }

    const df_cs = "Endpoint=https://zhiyuanliang-test.azconfig-test.io;Id=c0EH;Secret=45T6yvK386A2UfVUFjNDGHDgTGzpsbWOWlt5Pvj5s9orLAS9jsGLJQQJ99AJADLArgHeHiRoAAACAZACTX4k";

    const cs = "Endpoint=https://appconfig-lzy.azconfig.io;Id=lP1r;Secret=AahHLa8mVzRqiDEeMQ4PuxOeu6cT9a410tKWtXlqV2Uxf7ccKDJoJQQJ99AEACYeBjFJhn2FAAACAZACxsaz";

    const settings = await load(df_cs);

    console.log(settings)

  };

  useEffect(() => {
    init()
  }, []);

  const handleClick = () => {
    setButtonDisabled(true);
    window.setTimeout( () => {
      trackEvent(appInsights, userId, {name : "Button Click"}, { "Count": count + 1 });
      setCount(count + 1);
      setButtonDisabled(false);
    }, 500);
  };

  return (
    <>
      <h1 style={{ fontSize: `${fontSize}` }}>Current User: {userId}</h1>
      <button disabled={buttonDisabled} onClick={handleClick}>Click Me</button>
      <h4>{count} times</h4>
    </>
  )
}

export default App
