/**
 * Funnyday — main.js
 * Pure vanilla JS. No jQuery, no dropotron, no breakpoints lib.
 * Mobile nav + dropdown touch support only.
 */
(function () {
    'use strict';

    /* ── Remove preload class after first paint ─────────────── */
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.body.classList.remove('is-preload');
        }, 80);
    });

    /* ── Mobile nav ──────────────────────────────────────────── */
    var toggle   = document.getElementById('navToggle');
    var panel    = document.getElementById('navPanel');
    var overlay  = document.getElementById('navOverlay');
    var closeBtn = document.querySelector('.nav-panel-close');

    function openNav() {
        if (!panel || !overlay) return;
        panel.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        if (!panel || !overlay) return;
        panel.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (toggle)   toggle.addEventListener('click', openNav);
    if (closeBtn) closeBtn.addEventListener('click', closeNav);
    if (overlay)  overlay.addEventListener('click', closeNav);

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNav();
    });

    /* ── Desktop dropdown — touch device fallback ───────────── */
    /* On touch screens hover doesn't fire; use click-toggle     */
    var hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (hasTouch) {
        document.querySelectorAll('nav#nav li').forEach(function (li) {
            if (!li.querySelector('ul')) return;

            li.querySelector('a').addEventListener('click', function (e) {
                var isOpen = li.classList.contains('open');

                /* Close all others */
                document.querySelectorAll('nav#nav li.open').forEach(function (other) {
                    if (other !== li) other.classList.remove('open');
                });

                if (!isOpen) {
                    e.preventDefault();
                    e.stopPropagation();
                    li.classList.add('open');
                }
            });
        });

        document.addEventListener('click', function () {
            document.querySelectorAll('nav#nav li.open').forEach(function (li) {
                li.classList.remove('open');
            });
        });
    }

    /* ── Smooth scroll for in-page anchors ──────────────────── */
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

})();


document.addEventListener('DOMContentLoaded', function() {
    let slides = document.querySelectorAll('.banner-slider .slide');
    if(slides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }
});