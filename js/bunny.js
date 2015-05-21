$(document).ready(function() {

  $('.rubber').click(function() {
    randoms();

    $(this).hide("fast");
  })
});

var [i, points, score, combo, stack] = [0, 0, 0, -1, 1]; 

function randoms(n) { 
    var [limit, initial, bunny_duration] = [100, 3000, 800];
    var progress = i/limit;
    var max_speed = bunny_duration / initial;
    var speed = initial - (progress * initial * (1-max_speed));
    var random = [1,2,3,4,5,6,7,8,9][Math.floor(Math.random()*9)];
    var black = Math.random();

    $('#speed').html(speed+" "+max_speed);

    setTimeout(function () 
    {
      spawn(random, black, progress);
        i++; 
        if (i < (limit-1) )
        { 
           randoms();  
        }
        else
        {
          $('.rubber').show("fast");
          return [i, points, score, combo, stack] = [0, 0, 0, -1, 1]; 
        }
    }, speed)

    setTimeout(function () {
          destroy(random);
    }, speed+(bunny_duration-1));

    $('span.white').click(function() {

        $(this).hide();
        points++;
        if (i == combo+1) {
            stack++;
            if (stack % 5 != 0) {
              hit = 10 * (Math.round(progress*10) / 5 + 1); 
            }
            else {
              wombo = 2*(stack/5);
              hit = wombo * 10 * (Math.round(progress*10) / 5 + 1); 
              $('#wombo').html(wombo+"X !!!"+stack);  
            }
        }       
        else {
            hit = 10 * (Math.round(progress*10) / 5 + 1); 
            stack = 1;
        };
        score += hit;     
        combo = i;
        $('#points').html(Math.round(score));
    });

    $('span.black').click(function() {
        $(this).hide();
        score *= 0.8;     
        stack = 1;
        $('#points').html(Math.round(score));
    });
   // return i = 0; infinite
}

function spawn(random, black, progress) {
  if (black < (progress*0.5)) {
    $(".rabbit"+random).append("<span class='jump black'>"+random+"</span>");
  }
  else {
    $(".rabbit"+random).append("<span class='jump white'>"+random+"</span>");
  }
}
function destroy(random) {
    $(".rabbit"+random+" span").remove();
}