import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { ApplicationInsights } from "@microsoft/applicationinsights-web"
import { FeatureManager, ConfigurationObjectFeatureFlagProvider } from "@microsoft/feature-management";
import { trackEvent, createTelemetryPublisher } from "@microsoft/feature-management-applicationinsights-browser";

const connectionString = "InstrumentationKey=f02d78f6-0f63-44ba-a6c8-a46bf4814b93;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=cbe807ce-9938-42e2-a934-c51b1d0d4cbb";
function App() {
  useEffect(() => {
    
    const appInsights = new ApplicationInsights({ config: {
      connectionString: connectionString
    }});
    appInsights.loadAppInsights();
    appInsights.trackEvent({name: "TestEvent"}, {"MyTag": "Some Value"});

    const telemetryPublisher = createTelemetryPublisher(appInsights);

    const jsonObject = {
      "feature_management": {
        "feature_flags": [
          { 
            "id": "TestFeature",
            "enabled": true,
            "variants": [ { "name": "Big" } ],
            "allocation": { "user": [ { "variant": "Big", "users": [ "Jeff" ] } ] },
            "telemetry": { "enabled": true}
          }
        ]
      }
    };

  const provider = new ConfigurationObjectFeatureFlagProvider(jsonObject);
  const featureManager = new FeatureManager(provider, {onFeatureEvaluated: telemetryPublisher});
  
  featureManager.isEnabled("TestFeature", {userId : "Jeff"}).then((res) => { console.log(res); });
  featureManager.getVariant("TestFeature", {userId : "Jeff"}).then((variant) => { console.log(variant.name); });

  trackEvent(appInsights, "Tom", {name: "MyTestEvent"}, {"MyTag": "Some Value"});

  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
    </>
  )
}

export default App
