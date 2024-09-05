const connectionString = "InstrumentationKey=f02d78f6-0f63-44ba-a6c8-a46bf4814b93;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=cbe807ce-9938-42e2-a934-c51b1d0d4cbb";
const appInsights = require("applicationinsights");

appInsights.setup(connectionString)
    .setAutoCollectRequests(true)
    .setSendLiveMetrics(true)
    .start();

const api = require("@opentelemetry/api");
function attachTargetingId(id) {
    const span = api.trace.getActiveSpan();
    span.setAttribute("TargetingId", id)
}

const Hapi = require('@hapi/hapi');

const init = async () => {

    // Create a Hapi server instance
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // Define a simple route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            attachTargetingId("123456abcdefg")
            return { message: 'Hello, Hapi!' };
        }
    });

    // Start the server
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

// Initialize the server
init();