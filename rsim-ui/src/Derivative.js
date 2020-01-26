
export default function Derivative(data) {
    let derivative = [];
    for(let i = 1; i < data.length; i++) {
        const dataPoint = data[i];
        const prev = data[i - 1];
        derivative.push({
            x: dataPoint.x,
            y: (dataPoint.y - prev.y) / (dataPoint.x - prev.x),
        });
    }
    return derivative;
};
