import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const connectionString = "InstrumentationKey=f02d78f6-0f63-44ba-a6c8-a46bf4814b93;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=cbe807ce-9938-42e2-a934-c51b1d0d4cbb";
function App() {
  useEffect(() => {
    
    const appInsights = new ApplicationInsights({ config: {
      connectionString: connectionString
    }});
    appInsights.loadAppInsights();
    appInsights.trackPageView();
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
