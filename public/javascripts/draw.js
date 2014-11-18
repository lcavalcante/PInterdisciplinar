paper.install(window);
var circleTump, cloud;
window.onload = function() {


    paper.setup('draw');



    var path;

    cloud = new Tool();

    cloud.onMouseDown = function(event) {
        path = new Path();
        var color = randomColor();
        path.strokeColor = new RgbColor(color.red, color.green, color.blue, color.alpha);
        path.add(event.point);
    }

    cloud.onMouseDrag = function(event){
        path.arcTo(event.point);
    }


    function randomColor() {

        return {
            red: 0,
            green: Math.random(),
            blue: Math.random(),
            alpha: ( Math.random() * 0.25 ) + 0.05
        };
    }

    circleTump.maxDistance = 50;
    circleTump.minDistance = 20;

    circleTump = new Tool();
    circleTump.onMouseDrag = function(event) {
        var circle = new Path.Circle({
            center: event.middlePoint,
            radius: event.delta.length / 2

        });
        var color = randomColor();

        circle.fillColor = new RgbColor(color.red, color.green, color.blue, color.alpha);

        var sound = new Howl({
            urls: ['/sounds/Game-Break.mp3'],
            loop: true
        }).play();
    }


}

