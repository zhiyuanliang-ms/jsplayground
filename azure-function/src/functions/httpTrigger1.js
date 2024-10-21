const { app } = require('@azure/functions');

app.http('httptrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: '',  // Use '/' to match the base URL
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        context.log(`Request Method: ${request.method}`);

        for (const key of request.headers.keys()) {
            context.log(`header ${key}: ${request.headers.get(key)}`);
        }

        return { body: `Hello World!` };
    }
});
