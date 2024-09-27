import { ApplicationInsights } from "@microsoft/applicationinsights-web";

let client;

export function useAppInsights(connectionString) {
    client = new ApplicationInsights({
        config: {
            connectionString: connectionString
        }
    });
    client.loadAppInsights();
}

export function publishFeatureEvaluationTelemetry(event) {
    if (client === undefined) {
        console.log("AppInsights client is not initialized");
        return;
    }
    client.trackEvent({name: "FeatureEvaluation", properties: {"TargetingId": event.targetingId}});
}

export function trackEvent(name, targetingId) {
    if (client === undefined) {
        console.error("AppInsights client is not initialized");
        return;
    }
    client.trackEvent({name: name, properties: {"TargetingId": targetingId}});
}