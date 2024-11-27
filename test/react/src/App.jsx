import { useState, useEffect } from 'react'
import { ApplicationInsights } from "@microsoft/applicationinsights-web"
import { ConfigurationObjectFeatureFlagProvider, FeatureManager } from "@microsoft/feature-management"
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
  };

  useEffect(() => {
    init()
  }, []);

  const handleClick = () => {
    setButtonDisabled(true);
    window.setTimeout( () => {
      trackEvent(appInsights, userId, {name : "Button Click"}, { "Count": count + 1});
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
