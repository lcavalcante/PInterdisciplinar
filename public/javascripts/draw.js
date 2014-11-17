var tool = new Tool()


function randomColor() {

    return {
        red: 0,
        green: Math.random(),
        blue: Math.random(),
        alpha: ( Math.random() * 0.25 ) + 0.05
    };
}

tool.maxDistance = 50;
tool.minDistance = 20;

function onMouseDrag(event) {
    var circle = new Path.Circle({
        center: event.middlePoint,
        radius: event.delta.length / 2

    });
    var color = randomColor();

    circle.fillColor = new RgbColor(color.red, color.green, color.blue, color.alpha);
}