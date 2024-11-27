import { defaultClient } from "applicationinsights";

export function publishTelemetry(event) {
    if (defaultClient === undefined) {
        console.warn(`Application Insights default client is not found.`);
        return;
    }

    const eventProperties = {
        "FeatureName": event.feature ? event.feature.id : "",
        "Enabled": event.enabled.toString(),
        // Ensure targetingId is string so that it will be placed in customDimensions
        "TargetingId": event.targetingId ? event.targetingId.toString() : "",
        "Variant": event.variant ? event.variant.name : "",
        "VariantAssignmentReason": event.variantAssignmentReason,
    };

    const metadata = event.feature?.telemetry?.metadata;
    if (metadata) {
        for (const key in metadata) {
            if (!(key in eventProperties)) {
                eventProperties[key] = metadata[key];
            }
        }
    }

    defaultClient.trackEvent({ name: "FeatureEvaluation", properties: eventProperties});
}