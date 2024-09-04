const opentelemetry = require('@opentelemetry/api');
const tracer = opentelemetry.trace.getTracer('dice-server', '0.1.0');

function rollOnce(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
  
function rollTheDice(rolls, min, max) {
    const result = [];
    for (let i = 0; i < rolls; i++) {
        result.push(rollOnce(min, max));
    }
    return result;
}

module.exports = { rollTheDice };