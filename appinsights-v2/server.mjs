const connectionString = "InstrumentationKey=f02d78f6-0f63-44ba-a6c8-a46bf4814b93;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=cbe807ce-9938-42e2-a934-c51b1d0d4cbb";

import applicationInsights from "applicationinsights";

applicationInsights.setup(connectionString)
  .setAutoCollectRequests(false)
  .setSendLiveMetrics(true)
  .enableWebInstrumentation(true, connectionString)
  .start();

applicationInsights.defaultClient.trackEvent({name: "TestEvent"});


import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    appInsights.defaultClient.trackEvent({name: "hello"})
    res.send(`hello world`);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});