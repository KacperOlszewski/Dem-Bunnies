$(document).ready(function() {

/*	for (var i = 1; i < n; i++) { */

  $('.rubber').click(function() {
    randoms();

    $(this).hide("fast");
  })
});

var [i, points, score, combo, stack] = [0, 0, 0, -1, 0]; 

function randoms(n) { 
    var limit = 100;
    var initial = 4000;
    var max_speed = 900 / initial;
    var speed = initial - (i/limit * initial * (1-max_speed));
    var random = [1,2,3,4,5,6,7,8,9][Math.floor(Math.random()*9)];

    $('#speed').html(speed+" "+max_speed);

    setTimeout(function () 
    {
      spawn(random);
        i++; 
        if (i < (limit-1) )
        { 
           randoms();  
        }
        else
        {
          $('.rubber').show("fast");
          return [i, points, score, combo] = [0, 0, 0, -1]; 
        }
    }, speed)

    setTimeout(function () {
          destroy(random);
    }, speed+899);

    $('span.jump').click(function() {

        $(this).hide();
        points++;
        if (i == combo+1) {
            stack++;
            if (stack % 5 != 0) {
            hit = 10 * (Math.round(i/limit*10) / 5 + 1); 
            }
            else {
            wombo = 2*(stack/5);
            hit = wombo * 10 * (Math.round(i/limit*10) / 5 + 1); 
            $('#wombo').html(wombo+"X !!!"+stack);  
            }
        }       
        else {
            hit = 10 * (Math.round(i/limit*10) / 5 + 1); 
            stack = 0;
        };
        score += hit;     
        combo = i;
        $('#points').html(Math.round(score));
    });
   // return i = 0; infinite
}

function spawn(random) {
    $(".rabbit"+random).append("<span class='jump'>"+random+"</span>");
}
function destroy(random) {
    $(".rabbit"+random+" span").remove();
}