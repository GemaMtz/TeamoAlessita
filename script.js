$(document).ready(function () {
  var envelope = $('#envelope');
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var openSound = $('#openSound')[0];
  var closeSound = $('#closeSound')[0];
  var loveMsg = $("#loveMessage");
  var opened = false;

  function showSparkles() {
    var $sparkles = $('.sparkles');
    $sparkles.empty();
    for (let i = 0; i < 15; i++) {
      let x = Math.random() * 90 + 5;
      let y = Math.random() * 70 + 10;
      let delay = Math.random() * 1.2;
      let sparkle = $("<div class='sparkle'></div>").css({
        left: x + '%',
        top: y + '%',
        animationDelay: delay + 's'
      });
      $sparkles.append(sparkle);
      setTimeout(() => { sparkle.remove(); }, 1500 + delay * 1000);
    }
  }

  function open() {
    if (opened) return;
    envelope.addClass("open").removeClass("close");
    btn_open.prop('disabled', true).removeClass('pulse');
    setTimeout(showSparkles, 400);
    setTimeout(() => {
      loveMsg.addClass("show").removeClass("hidden");
    }, 1200);
    if (openSound) openSound.play();
    opened = true;
  }

  function close() {
    if (!opened) return;
    envelope.addClass("close").removeClass("open");
    btn_open.prop('disabled', false).addClass('pulse');
    loveMsg.removeClass("show").addClass("hidden");
    if (closeSound) closeSound.play();
    opened = false;
  }

  envelope.on('click keypress', function (e) {
    if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
      open();
    }
  });
  btn_open.click(open);
  btn_reset.click(close);

  // Opcional: abre con Enter o Espacio
  envelope.attr('tabindex', 0);
});