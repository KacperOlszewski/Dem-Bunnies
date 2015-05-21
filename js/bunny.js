$(document).ready(function() {

/*	for (var i = 1; i < n; i++) { */

  $('.rubber').click(function() {
    randoms();

    $(this).hide("fast");
  })
});

var [i, points] = [0, 0]; 

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
        if (i < (limit) )
        { 
           randoms();  
        }
        else
        {
          $('.rubber').show("fast");
          return [i, points] = [0, 0]; 
        }
    }, speed)

    setTimeout(function () {
          destroy(random);
    }, speed+899);

    $('span.jump').click(function() {
        $(this).hide();
        points++;
        var score = points * 10;
        $('#points').html(score);
    });
   // return i = 0; infinite
}

function spawn(random) {
    $(".rabbit"+random).append("<span class='jump'>"+random+"</span>");
}
function destroy(random) {
    $(".rabbit"+random+" span").remove();
}