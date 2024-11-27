import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { ApplicationInsights } from "@microsoft/applicationinsights-web"
import { FeatureManager, ConfigurationObjectFeatureFlagProvider } from "@microsoft/feature-management";
import { trackEvent, createTelemetryPublisher } from "@microsoft/feature-management-applicationinsights-browser";

const connectionString = "InstrumentationKey=1ed14b85-2501-4762-a20e-1b8339da0cd5;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=a4b55d1c-c833-4ca9-869e-e4bf8d1ecd4e";
function App() {
  useEffect(() => {
    
    const appInsights = new ApplicationInsights({ config: {
      connectionString: connectionString
    }});
    console.log(appInsights);
    appInsights.loadAppInsights();
<<<<<<< HEAD
    appInsights.trackPageView();
    console.log(appInsights);
    appInsights.trackEvent({name: "YES"})
    console.log(appInsights.trackEvent);
    appInsights.addTelemetryInitializer((envelope) => {
      envelope.data["TargetingId"] = '123456';
    })
=======
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
>>>>>>> f9041d26845eb40f0679372c523eba36d08102e2

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
