// https://github.com/open-telemetry/opentelemetry-js/blob/main/doc/esm-support.md

// node --experimental-loader=@opentelemetry/instrumentation/hook.mjs --import ./telemetry.mjs ./poc-activespan.mjs

const connectionString = "InstrumentationKey=f02d78f6-0f63-44ba-a6c8-a46bf4814b93;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=cbe807ce-9938-42e2-a934-c51b1d0d4cbb";

import appInsights from "applicationinsights"; // default import (module.default)
appInsights.setup(connectionString)
  .setAutoCollectRequests(true) // not work for esm
  .setSendLiveMetrics(true)
  .start();

// appInsights.defaultClient.trackEvent({name: "test"})
