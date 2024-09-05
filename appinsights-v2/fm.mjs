import appInsights from "applicationinsights";

let TargetingId;

export function SetTargetingId(targetingId) {
    TargetingId = targetingId;
} 

export function GetTargetingId() {
    return TargetingId;
}

const attachTargetingId = (envelope) => {
    envelope.data.baseData.properties["TargetingId1"] = TargetingId; // work
    // envelope.data["TargetingId2"] = TargetingId; // not work
    // envelope.data.TargetingId = TargetingId; // not work
}

export function InitializeTelemetry(connectionString) {
    appInsights.setup(connectionString)
        .setAutoCollectRequests(true)
        .setSendLiveMetrics(true)
        .start();

    const client = appInsights.defaultClient;
    client.addTelemetryProcessor(attachTargetingId);

    return (event) => {
        client.trackEvent({name: event.name});
    }
}
