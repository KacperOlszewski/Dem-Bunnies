$(document).ready(function() {
    $('.starter').click(function() {
      randoms();
      $(this).delay(2000).fadeOut().hide();
    });

    var $window = $(window);
    var height = $(window).height();
          
    function checkWidth() {
    var windowsize = $window.width();
    var hole = $('.field div');

    $('.panel, .container').css({"height":(height*0.20)+'px'});  
    hole.css({"height":(height*0.1)+'px',"margin-top":(height*0.1)+'px' });
    }

    checkWidth();
    $(window).resize(checkWidth);

});

var start = [0, 0, 0, -1, 1];    //var [i, points, score, combo, stack] = [0, 0, 0, -1, 1];

function randoms() { 
    var limit = 120; //number of jumps
    var initial = 2200; //starting interval 
    var bunny_duration = 740; //time bunny exists
    var progress = start[0]/limit;
    var max_speed = bunny_duration / initial;
    var speed = initial - (progress * initial * (1-max_speed));
    var random = [1,2,3,4,5,6,7,8,9][Math.floor(Math.random()*9)];
    var black = Math.random();
    var bunny = $('.field div').width();

    $('#speed').html(speed+" "+max_speed);

    setTimeout(function () 
    {
      spawn(random, black, progress);
    $('.field div span').css({"height":(bunny*0.85)+'px'});
        if (start[0] < (limit-1) )
        { 
           randoms();  
        }
        else
        {
          $('.starter').show("fast");
          return start = [0, 0, 0, -1, 1];
        }
    }, speed);

    setTimeout(function () {
          destroy(random);
    }, speed+(bunny_duration-1));

    $('span.white').bind('click touchstart', function () {

        $(this).hide();
        start[1]++;
        if (start[0] == start[3]+1) {
            start[4]++;
            if (start[4] % 3 !== 0) {
              hit = 10 * (Math.round(progress*10) / 5 + 1); 
              $('#wombo').removeClass("combo");
            }
            else {
              wombo = 2*(start[4]/5);
              hit = wombo * 10 * (Math.round(progress*10) / 5 + 1); 
              $('#wombo').html("COMBO:<br>"+wombo+"X !!").show().addClass("combo").delay(2800).fadeOut(); 
              //start[4] - stack
            }
        }       
        else {
            hit = 10 * (Math.round(progress*10) / 5 + 1); 
            start[4] = 1;
        }
        start[2] += hit;     
        start[3] = start[0];
        $('#calculator').html(Math.round(hit));
        $('#points').html(Math.round(start[2])).fadeIn("slow");
    });

    $('span.black').bind('click touchstart', function() {
        $(this).hide();
        start[2] *= 0.8;     
        start[4] = 1;
        $('#calculator').html(Math.round(" -20% :'("));
        $('#points').html(Math.round(start[2]));
    });
   // return start[0] = 0; infinite
}

function spawn(random, black, progress, bunny_size) {
  if (black < (progress*0.5)) {
    $(".rabbit"+random).append("<span class='jump black'>"+random+"</span>");
  }
  else {
    start[0]++; 
    $(".rabbit"+random).append("<span class='jump white'>"+random+"</span>");
  }
}
function destroy(random) {
    $(".rabbit"+random+" span").remove();
}