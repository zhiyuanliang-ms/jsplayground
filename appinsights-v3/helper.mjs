import api from "@opentelemetry/api";
import appInsights from "applicationinsights";


export function attachTargetingId() {
    const span = api.trace.getActiveSpan();
    span.setAttribute("TargetingId", "123456")
}

export function trackEvent(name, targetindId) {
    appInsights.defaultClient.trackEvent({name: name, properties: {"targetingId": targetindId}})
}