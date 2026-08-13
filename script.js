/* Ryu Hemingway — portfolio
   Three small behaviours: scroll reveals, counting stats, a nav hairline.
   Everything degrades to a fully readable page with JS off. */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── nav hairline once you leave the hero ───────────────────────── */
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── reveal on enter ────────────────────────────────────────────── */
  var revealables = document.querySelectorAll(".reveal");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) {
      el.classList.add("is-in");
    });
  } else {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealables.forEach(function (el) {
      revealer.observe(el);
    });

    /* Failsafe: if the observer never fired at all, show everything.
       Nothing on this page is allowed to stay invisible. */
    window.setTimeout(function () {
      if (document.querySelector(".reveal.is-in")) return;
      revealables.forEach(function (el) {
        el.classList.add("is-in");
      });
    }, 2000);
  }

  /* ── stats count up once ────────────────────────────────────────── */
  var numbers = document.querySelectorAll(".num[data-count]");
  var format = function (n) {
    return n.toLocaleString("en-US");
  };

  var runCount = function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    var start = performance.now();
    var duration = 1100;
    var step = function (now) {
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = format(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!reducedMotion && "IntersectionObserver" in window) {
    var counter = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCount(entry.target);
          counter.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    numbers.forEach(function (el) {
      counter.observe(el);
    });
  }

  /* ── the routing diagram only animates while it is on screen ────── */
  var diagram = document.querySelector(".diagram");
  if (diagram && !reducedMotion && "IntersectionObserver" in window) {
    var diagramWatcher = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          diagram.classList.toggle("is-live", entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );
    diagramWatcher.observe(diagram);
  }
})();
