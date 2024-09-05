import { attachTargetingId, trackEvent } from './helper.mjs';

//////////////////// express server //////////////////////
import express from "express";
const app = express();
const port = 5000;

app.get('/', (req, res) => {

    
    attachTargetingId();

    trackEvent("hello", "123456abc");
    res.send(`hello world`);
});

app.get('/test', (req, res) => {
    trackEvent("test", "123456abc");
    res.send(`test`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});