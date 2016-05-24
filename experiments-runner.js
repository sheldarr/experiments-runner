var args = process.argv.slice(2);

var path = args[0];
var n = args[1] ? args[1] : 4;
var iterations = args[2] ? args[2] : 1;
var min = args[3] ? args[3] : 1;
var max = args[4] ? args[4] : 2 ^ 16;

var results = [];

var sortingFunction = require(path);

console.time('Execution-time');

for (var i = 0; i < iterations; i++) {
    var arrayToSort = getRandomArray(n);
    var result = sortingFunction(arrayToSort);

    results.push(result);
}

console.timeEnd('Execution-time');

var statistics = calculateStatistics(results, n);

console.log('---Iterations---')
console.log('Min: ' + statistics.iterations.min);
console.log('Max: ' + statistics.iterations.max);
console.log('Avg: ' + statistics.iterations.avg.toFixed(2));
console.log('---Ratio---')
console.log('Min: ' + statistics.ratio.min);
console.log('Max: ' + statistics.ratio.max);
console.log('Avg: ' + statistics.ratio.avg.toFixed(2));

function getRandomArray(n) {
    var array = [];

    for (var i = 0; i < n; i++) {
        var randomValue = Math.random() * max + min;
        array.push(randomValue);
    }

    return array;
}

function calculateStatistics(results, n) {
    var minIterations = results[0];
    var maxIterations = results[0];
    var iterationsSum = 0;

    var minRatio = results[0] / n;
    var maxRatio = results[0] / n;
    var ratioSum = 0;

    for (var i = 0; i < results.length; i++) {
        var iterations = results[i];
        var ratio = iterations / n;

        if (iterations < minIterations) {
            minIterations = iterations;
        }

        if (iterations > maxIterations) {
            maxIterations = iterations;
        }

        if(ratio < minRatio) {
            minRatio = ratio;
        }

        if(ratio > maxRatio) {
            maxRatio = ratio;
        }

        iterationsSum += iterations;
        ratioSum += ratio;
    }

    var avgIterations = iterationsSum / results.length;
    var avgRatio = ratioSum / results.length;

    return {
        iterations: {
            min: minIterations,
            max: maxIterations,
            avg: avgIterations
        },
        ratio: {
            min: minRatio,
            max: maxRatio,
            avg: avgRatio
        }
    };
}
