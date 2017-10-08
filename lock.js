$(document).ready(function(){
  $('.button').click(function(e){
    $(this).find('i').toggleClass('fa-lock').toggleClass('fa-unlock');
  });

});
