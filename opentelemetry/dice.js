const opentelemetry = require('@opentelemetry/api');
const tracer = opentelemetry.trace.getTracer('dice-server', '0.1.0');

function rollOnce(i, min, max) {
    return tracer.startActiveSpan(`rollOnce:${i}`, (span) => {
        const result = Math.floor(Math.random() * (max - min) + min);
        span.end();
        return result;
    });
}
  
function rollTheDice(rolls, min, max) {
    // Create a span. A span must be closed.
    return tracer.startActiveSpan('rollTheDice', (span) => {
        const result = [];
        for (let i = 0; i < rolls; i++) {
        result.push(rollOnce(i, min, max));
        }
        // Be sure to end the span!
        span.end();
        return result;
    });
}

module.exports = { rollTheDice };