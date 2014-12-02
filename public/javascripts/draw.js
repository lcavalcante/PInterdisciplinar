paper.install(window);
var circleTump, cloud;
window.onload = function() {


    paper.setup('draw');
    
    var tool = new Tool();
    var path;

    tool.minDistance = 10;
    tool.maxDistance = 45;

    
    tool.onMouseDown = function(event) {
        path = new Path();
        path.strokeColor = 'white';
        path.add(event.point);
    }
    tool.onMouseDrag = function(event) {
        path.add(event.point)

        var step = event.delta;
        step.angle += 90;

        var top = event.middlePoint + step;
        var bottom = event.middlePoint - step;

        var line = new Path();
        line.strokeColor = 'white';
        line.add(top);
        line.add(bottom);
    }
}
