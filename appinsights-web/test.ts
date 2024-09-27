import { ApplicationInsights } from "@microsoft/applicationinsights-web"

const connectionString : string = "InstrumentationKey=f02d78f6-0f63-44ba-a6c8-a46bf4814b93;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=cbe807ce-9938-42e2-a934-c51b1d0d4cbb";

const appInsights = new ApplicationInsights({ config: {
    connectionString: connectionString
}});
appInsights.loadAppInsights();

appInsights.addTelemetryInitializer((envelope) => {
    envelope.data["TargetingId"] = '123456';
})
appInsights.trackEvent({name: "TestEvent", properties: {"MyTag": "Some Value"}});
appInsights.trackPageView();





export function useAppInsights(connectionString : string) : void {}

export function publishFeatureEvaluationTelemetry(event: EvaluationEvent) : void {}

export function trackEvent(eventName : string, targetingId: string, properties?: {[key: string]: any}) : void {}