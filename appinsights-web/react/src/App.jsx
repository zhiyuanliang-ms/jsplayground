import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const connectionString = "InstrumentationKey=1ed14b85-2501-4762-a20e-1b8339da0cd5;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=a4b55d1c-c833-4ca9-869e-e4bf8d1ecd4e";
function App() {
  useEffect(() => {
    
    const appInsights = new ApplicationInsights({ config: {
      connectionString: connectionString
    }});
    console.log(appInsights);
    appInsights.loadAppInsights();
    appInsights.trackPageView();
    console.log(appInsights);
    appInsights.trackEvent({name: "YES"})
    console.log(appInsights.trackEvent);
    appInsights.addTelemetryInitializer((envelope) => {
      envelope.data["TargetingId"] = '123456';
    })

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
