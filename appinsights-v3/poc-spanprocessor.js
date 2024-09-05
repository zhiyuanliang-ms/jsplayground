const connectionString = "InstrumentationKey=f02d78f6-0f63-44ba-a6c8-a46bf4814b93;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=cbe807ce-9938-42e2-a934-c51b1d0d4cbb";
const appInsights = require("applicationinsights");

appInsights.setup(connectionString)
    .setAutoCollectRequests(true)
    .setSendLiveMetrics(true)
    .start();

const api = require("@opentelemetry/api");
const api_logs = require("@opentelemetry/api-logs");

class TestSpanProcessor {
    constructor() {
    }
    forceFlush() {
      return Promise.resolve();
    }
    onStart(span, _context) {
        span.setAttribute("TargetingId", "123456");
    }
    onEnd(span) {
    }
    shutdown() {
      return Promise.resolve();
    }
}
  
class TestLogProcessor {
    constructor() {
    }
    onEmit(record) {
        record.setAttribute("TargetingId", "123456");
    }
    shutdown() {
        return Promise.resolve();
    }
    forceFlush() {
        return Promise.resolve();
    }
}

api.trace.getTracerProvider().getDelegate().addSpanProcessor(new TestSpanProcessor());
api_logs.logs.getLoggerProvider().addLogRecordProcessor(new TestLogProcessor());





//////////////////// express server //////////////////////
const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    appInsights.defaultClient.trackEvent({name: "hello"})
    res.send(`hello world`);
});

app.get('/test', (req, res) => {
    appInsights.defaultClient.trackEvent({name: "test"})
    res.send(`test`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});