// -----------------------------------------------------------
// EIE Javasript
// -----------------------------------------------------------

$(function() {
    console.log('Initializing EIE...')

    var elem = $('#' + window.location.hash.replace('#', ''))
    if(elem) {
      $('html, body').animate({
        scrollTop: elem.offset().top
      }, 1000)
    }
})
