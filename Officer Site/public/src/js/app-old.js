// $(document).ready(async function(){
//     $('.sidenav').sidenav();
// var txt = "";
// var req = await fetch('http://availo-api.herokuapp.com/officers');
// console.log(req);
// var json = await req.json();
// console.log(json.length);

// var i;
// for (i = 0; i < json.length; i++){
// txt += "<div class='col s12 l4 m6'><div class='card blue lighten-2'><div class='card-content'><span class='card-title activator grey-text text-darken-4'>" + json[i].name + '<i class="material-icons right">more_vert</i></span></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + json[i].name + '</span></div></div></div>';
// } 

// $('#main_cont_row').html(txt);

// });

// $(window).on('load', function(){
// $('#cover').fadeOut(1000);
// })

$(document).ready(function() {

    var s_round = '.s_round';
  
    $(s_round).hover(function() {
      $('.b_round').toggleClass('b_round_hover');
      return false;
    });
  
    $(s_round).click(function() {
      $('.flip_box').toggleClass('flipped');
      $(this).addClass('s_round_click');
      $('.s_arrow').toggleClass('s_arrow_rotate');
      $('.b_round').toggleClass('b_round_back_hover');
      return false;
    });
  
    $(s_round).on('transitionend', function() {
      $(this).removeClass('s_round_click');
      $(this).addClass('s_round_back');
      return false;
    });
  });