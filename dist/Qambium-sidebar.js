$(document).ready (function(){

  /**
   * (992px) est lié à Bootstrap...
   * @see https://getbootstrap.com/docs/4.3/layout/grid/
   */
  var bootstrap_lg_width_breakpoint = 992;

  /**
   * En mode mobile, la sidebar n'est pas
   * ouverte par défault au chargement de
   * la page.
   */
  if($( window ).width() < bootstrap_lg_width_breakpoint){
    $('.wrapper').removeClass('open');
  }

  /**
   * En mode mobile ou quand la fenêtre du
   * navigateur fait moins de 992px,
   * on ferme la fenêtre si la souris
   * quitte la sidebar.
   */
  $(window).mousemove(function(e) {
    if($( window ).width() < bootstrap_lg_width_breakpoint){

      if(e.pageX > 250){
        if($('.wrapper').hasClass('open')){
          $('.wrapper').removeClass('open');
        }
      }

    }
  });

  /**
   * Si la fenêtre est rechargée et que la
   * largeur < bootstrap_lg_width_breakpoint
   * on ferme la sidebar.
   */
  $(window).on('resize', function(){

    if($( window ).width() < bootstrap_lg_width_breakpoint){
      $('.wrapper').removeClass('open');
    } else {
      $('.wrapper').addClass('open');
    }

  });

  /**
   * on toggle la class open.
   */
  $(".sidebarToggle").click(function(){
    $('.wrapper').toggleClass('open');
  });

  /**
   * Pour rappel .closeSidebar se trouve
   * dans la sidebar uniquement en fenetre
   * large.
   */
  $(".closeSidebar").click(function(){
    $('.wrapper').removeClass('open');
  });


});
