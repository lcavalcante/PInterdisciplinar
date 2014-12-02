paper.install(window);
var tool1, tool2, tool3;
window.onload = function() {

    var bg = new Howl({
        urls: ['public/sounds/spaced.mp3'],
        volume: 0.5,
        loop: true,

    }).play();
    var x = 0;
    var corrgb;
    $('.color-box').colpick({
        colorScheme:'dark',
        layout:'rgbhex',
        color:'000000',
        onSubmit:function(hsb,hex,rgb,el) {
            $(el).css('background-color', '#'+hex);
            $(el).colpickHide();
            corrgb = hex;
        }
     })
.css('background-color', '#000000');
    

    paper.setup('draw');


    // Create a simple drawing tool:
    tool1 = new Tool();
    tool2 = new Tool();
    tool3 = new Tool();
    var path;
    tool1.minDistance = 30;
    tool1.maxDistance = 45;
    tool2.fixedDistance = 20;
    tool3.maxDistance = 50;
    tool3.minDistance = 20;
    var count = 0;
    var piano = 0;

   
    


    function onMouseDown(event) {
        // Create a new path and select it:
        path = new Path();
        
        path.fillColor = '#'+corrgb//window.cor;

        // Add a segment to the path where
        // you clicked:
        path.add(event.point);
        count++;
    }

    function onMouseDrag(event) {
        path.add(event.point);


        var step = event.delta;
        step.angle = step.angle + 90;

        var top = event.middlePoint;
        //top.add(step);
        //top.x = top.x + step.x;
        //top.y = top.y + step.y;
        var bottom = event.middlePoint;
        //bottom.add(-step);

        //bottom.x = bottom.x + step.x;
        //bottom.y = bottom.y + step.y;

        path.add(top);
        //path.add(bottom);
        path.insert(0, bottom);
        path.smooth;

        

        
    }
    function onMouseDrag2(event) {
        
        path.add(event.point);

        var step = event.delta;
        step.angle = step.angle + 90;

        var top = event.middlePoint;

        //top.add(step);
        top.x = top.x + step.x;
        top.y = top.y + step.y;
        var bottom = event.middlePoint;
        //bottom.add(-step);

        bottom.x = bottom.x - step.x;
        bottom.y = bottom.y - step.y;

        path.add(top);
        //path.add(bottom);
        path.insert(0, bottom);
        path.smooth;

    }

    function onMouseDrag3(event){
        var circle = new Path.Circle({
            center: event.middlePoint,
            radius: event.delta.length / 2

        });
        var color = '#'+corrgb;

        circle.fillColor = '#'+corrgb;
   
    }



    function onMouseUpPiano(event){
        path.add(event.point);
        console.log(event.middlePoint.x);
        path.closed = true;
        path.smooth();
        count++;

            if(count > 1){
                if(event.middlePoint.x < 500) {
                    var sound = new Howl({
                        urls: ['public/sounds/musical_piano_chord_e_seventh_ninth.mp3'],
                        volume: 0.5,
                        loop: true
                        
                    }).play();
                    count = 0;
                    console.log(sound.pos3d());
                }

                else if(event.middlePoint.x > 500) {
                    var sound = new Howl({
                        urls: ['public/sounds/musical_piano_chord_g_major_11th.mp3'],
                        volume: 0.5,
                        loop: true,
                        pos3d: 1000
                    }).play();
                    count = 0;
                }
            else{

            }
            
        }
        

    }

        function onMouseUpG(event){
        path.add(event.point);
        console.log(event.middlePoint.x);
        path.closed = true;
        path.smooth();
        count++;

            if(event.middlePoint.x < 500) {
                    var sound = new Howl({
                        urls: ['public/sounds/musical_electric_guitar_dry_bb_sus4.mp3'],
                        volume: 0.5,
                        loop: true,
                        pos3d: 1000
                    }).play();
                    count = 0;
        }
        else if(event.middlePoint.x > 500) {
                    var sound = new Howl({
                        urls: ['public/sounds/musical_electric_guitar_dry_bb_sus4.mp3'],
                        volume: 0.5,
                        loop: false,
                        pos3d: 1000
                    }).play();
                    count = 0;
        }
        else{
                var sound = new Howl({
                    urls: ['public/sounds/electric_piano_riff_2.mp3'],
                    loop: false,
                    pos3d: [event.middlePoint.x /1000, event.middlePoint.y, 0]
                    }).play();
                count = 0;
        }
            
        }
        

    
    

    tool1.onMouseDown = onMouseDown;
    tool1.onMouseDrag = onMouseDrag;
    tool1.onMouseUp = onMouseUpG;
    tool2.onMouseDown = onMouseDown;
    tool2.onMouseDrag = onMouseDrag2;
    tool2.onMouseUp = onMouseUpPiano;
    tool3.onMouseDown = onMouseDown;
    tool3.onMouseDrag = onMouseDrag3;

}