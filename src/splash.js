(function () {
  "use strict";

  var MIN_DURATION = 3500; // ms — minimum time splash stays visible
  var startTime = Date.now();
  var pageLoaded = false;
  var timerDone = false;

  var FLAG_SRC = "assets/images/kazembe/identity/flag.png";
  var COA_SRC = "assets/images/kazembe/identity/coat-of-arms.png";
  var SEGMENTS = 28;
  var AMPLITUDE = 14;   // px at free (right) edge
  var WAVE_FREQ = 0.018; // spatial frequency
  var WAVE_SPEED = 0.055; // radians per frame

  var canvas = document.getElementById("splash-canvas");
  var ctx = canvas ? canvas.getContext("2d") : null;
  var flagImg = null;
  var phase = 0;
  var rafId = null;

  function loadFlag() {
    flagImg = new Image();
    flagImg.onload = function () {
      // Set canvas size to match flag aspect ratio
      var aspect = flagImg.naturalHeight / flagImg.naturalWidth;
      var w = canvas.offsetWidth || 340;
      canvas.width = w;
      canvas.height = Math.round(w * aspect);
      drawFlag();
    };
    flagImg.onerror = function () {
      if (canvas) canvas.style.display = "none";
    };
    flagImg.src = FLAG_SRC;
  }

  function drawFlag() {
    if (!ctx || !flagImg || !canvas) return;
    var W = canvas.width;
    var H = canvas.height;
    var segW = W / SEGMENTS;

    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < SEGMENTS; i++) {
      var sx = (flagImg.naturalWidth / SEGMENTS) * i;
      var sw = flagImg.naturalWidth / SEGMENTS;

      // Amplitude increases linearly from left (pole) to right (free end)
      var t = i / (SEGMENTS - 1);
      var amp = t * AMPLITUDE;
      var yOffset = Math.sin(phase + i * WAVE_FREQ * W) * amp;

      var dx = i * segW;
      var dy = yOffset;
      var dw = segW + 1; // +1 to avoid sub-pixel gaps
      var dh = H;

      ctx.drawImage(flagImg, sx, 0, sw, flagImg.naturalHeight, dx, dy, dw, dh);
    }

    phase += WAVE_SPEED;
    rafId = requestAnimationFrame(drawFlag);
  }

  function stopWave() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  function showCoaAndMessages() {
    var coa = document.getElementById("splash-coa");
    if (coa) coa.classList.add("splash-visible");

    var msgs = document.querySelectorAll(".splash-msg");
    var delays = [350, 900, 1500];
    msgs.forEach(function (msg, idx) {
      setTimeout(function () {
        msg.classList.add("splash-visible");
      }, delays[idx] || idx * 600);
    });
  }

  function tickProgress() {
    var bar = document.getElementById("splash-progress");
    if (!bar) return;
    var elapsed = Date.now() - startTime;
    var pct = Math.min((elapsed / MIN_DURATION) * 100, 95);
    bar.style.width = pct + "%";
    if (elapsed < MIN_DURATION) {
      setTimeout(tickProgress, 80);
    }
  }

  function tryDismiss() {
    if (!pageLoaded || !timerDone) return;
    var bar = document.getElementById("splash-progress");
    if (bar) bar.style.width = "100%";
    setTimeout(function () {
      stopWave();
      var splash = document.getElementById("splash");
      if (splash) {
        splash.classList.add("splash-hidden");
        // Remove from DOM after transition ends
        setTimeout(function () {
          if (splash.parentNode) splash.parentNode.removeChild(splash);
        }, 750);
      }
    }, 200);
  }

  function onPageLoad() {
    pageLoaded = true;
    tryDismiss();
  }

  function onTimerDone() {
    timerDone = true;
    tryDismiss();
  }

  // Kick off
  if (canvas && ctx) {
    loadFlag();
  }

  showCoaAndMessages();
  tickProgress();

  // Page fully loaded
  if (document.readyState === "complete") {
    onPageLoad();
  } else {
    window.addEventListener("load", onPageLoad);
  }

  // Minimum display timer
  var elapsed = Date.now() - startTime;
  var remaining = Math.max(0, MIN_DURATION - elapsed);
  setTimeout(onTimerDone, remaining);
})();
