import { attachTargetingId, trackEvent } from './helper.mjs';

//////////////////// express server //////////////////////
import express from "express";
const app = express();
const port = 5000;

app.get('/', (req, res) => {

    
    attachTargetingId();

    trackEvent("hellov3mjs", "123456abc");
    res.send(`hello world`);
});

app.get('/test', (req, res) => {
    trackEvent("testv3mjs", "123456abc");
    res.send(`test`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});