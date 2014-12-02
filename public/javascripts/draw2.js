paper.install(window);
var tool1, tool2, tool3;
window.onload = function() {

    var bg = new Howl({
        urls: ['public/sounds/spaced.mp3'],
        volume: 0.5,
        loop: true,

    })  ;
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
    tool1.maxDistance = 60;
    
    tool2.maxDistance = 60;
    tool2.fixedDistance = 20;
    tool3.maxDistance = 90;
    //tool3.minDistance = 20;
    var count = 0;
    var piano = 0;
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;

    var a, b;

   
    


    function onMouseDown(event) {
        // Create a new path and select it:
        path = new Path();
        
        path.fillColor = '#'+corrgb//window.cor;

        // Add a segment to the path where
        // you clicked:
        path.add(event.point);
        count++;

        a = event.middlePoint.x;
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
        console.log(event.middlePoint);
       
        

        
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
        console.log("ashdgadh ->" + event.delta.length /2);

        if((event.delta.length /2 > 43) && ( count1 == 0)){
            var sound = new Howl({
                        urls: ['public/sounds/tribal_drum_rhythm.mp3'],
                        volume: 1.0,
                        loop: true
                        
                    }).play();
            count1++;
        }
        else {

        var sound = new Howl({
                        urls: ['public/sounds/Bass 1.mp3'],
                        volume: 0.1,
                        loop: false
                        
                    }).play();
        }
   
    }



    function onMouseUpPiano(event){
        path.add(event.point);
        console.log(event.middlePoint.x);
        path.closed = true;
        path.smooth();
        count++;

        console.log("a->" + a);
        console.log("b->" + b);
        b = event.middlePoint.x;

        if(((a-b)  > 400 || (b-a) > 400) && count2 == 0){
            var sound = new Howl({
                        urls: ['public/sounds/musical_chopper_chord_progression_loop.mp3'],
                        volume: 0.5,
                        loop: true
                        
                    }).play();
            count2++;


        }

        else {
            var sound = new Howl({
                        urls: ['public/sounds/musical_xylophone_run_slide.mp3'],
                        volume: 0.5,
                        loop: true
                        
                    }).play();

            sound.fadeIn(1, 1000);
           

        }



            
        }
        

    

        function onMouseUpG(event){
        path.add(event.point);
        console.log(event.middlePoint.x);
        path.closed = true;
        path.smooth();
        count++;

        b = event.middlePoint.x;

        

        if(((a-b)  > 400 || (b-a) > 400) && (count3 == 0)){

            var sound = new Howl({
                        urls: ['public/sounds/130_glockenspiel_1.mp3'],
                        volume: 0.1,
                        loop: true
                        
                    }).play();
            count3++;

        }

        else {

             if(event.middlePoint.x < 500) {
                    var sound = new Howl({
                        urls: ['public/sounds/Voz 1.mp3'],
                        volume: 1.0,
                        loop: false,
                    }).play();
                    sound.fadeIn(1, 200);
                    count = 0;
        }
        else if(event.middlePoint.x > 700) {
                    var sound = new Howl({
                        urls: ['public/sounds/Voz 1_2.mp3'],
                        volume: 1.0,
                        loop: false,

                    }).play();
                    count = 0;
                    sound.fadeIn(1, 200);

        }

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