// console.log("Home frontend javascript file");

// function fitElementToParent(el, padding) {
//   let timeout = null;

//   function resize() {
//     if (timeout) clearTimeout(timeout);
//     anime.set(el, { scale: 1 });
//     let pad = padding || 0;
//     let parentEl = el.parentNode;
//     let elOffsetWidth = el.offsetWidth - pad;
//     let parentOffsetWidth = parentEl.offsetWidth;
//     let ratio = parentOffsetWidth / elOffsetWidth;
//     timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
//   }

//   resize();
//   window.addEventListener("resize", resize);
// }

// (function () {
//   const sphereEl = document.querySelector(".sphere-animation");
//   const spherePathEls = sphereEl.querySelectorAll(".sphere path");
//   const pathLength = spherePathEls.length;
//   const animations = [];

//   fitElementToParent(sphereEl);

//   const breathAnimation = anime({
//     begin: function () {
//       for (let i = 0; i < pathLength; i++) {
//         animations.push(
//           anime({
//             targets: spherePathEls[i],
//             stroke: {
//               value: ["rgba(255,75,75,1)", "rgba(80,80,80,.35)"],
//               duration: 500,
//             },
//             translateX: [2, -4],
//             translateY: [2, -4],
//             easing: "easeOutQuad",
//             autoplay: false,
//           })
//         );
//       }
//     },
//     update: function (ins) {
//       animations.forEach(function (animation, i) {
//         let percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
//         animation.seek(animation.duration * percent);
//       });
//     },
//     duration: Infinity,
//     autoplay: false,
//   });

//   const introAnimation = anime
//     .timeline({
//       autoplay: false,
//     })
//     .add(
//       {
//         targets: spherePathEls,
//         strokeDashoffset: {
//           value: [anime.setDashoffset, 0],
//           duration: 3900,
//           easing: "easeInOutCirc",
//           delay: anime.stagger(190, { direction: "reverse" }),
//         },
//         duration: 2000,
//         delay: anime.stagger(60, { direction: "reverse" }),
//         easing: "linear",
//       },
//       0
//     );

//   const shadowAnimation = anime(
//     {
//       targets: "#sphereGradient",
//       x1: "25%",
//       x2: "25%",
//       y1: "0%",
//       y2: "75%",
//       duration: 30000,
//       easing: "easeOutQuint",
//       autoplay: false,
//     },
//     0
//   );

//   function init() {
//     introAnimation.play();
//     breathAnimation.play();
//     shadowAnimation.play();
//   }

//   init();
// })();


document.addEventListener("DOMContentLoaded", function () {

  // Sofa entry
  anime({
    targets: ".furniture-sofa",
    translateY: [120, 0],
    opacity: [0, 1],
    duration: 1400,
    easing: "easeOutExpo"
  });

  // Chair
  anime({
    targets: ".furniture-chair",
    translateX: [120, 0],
    opacity: [0, 1],
    duration: 1400,
    delay: 200,
    easing: "easeOutExpo"
  });

  // Table
  anime({
    targets: ".furniture-table",
    translateY: [80, 0],
    opacity: [0, 1],
    duration: 1200,
    delay: 350,
    easing: "easeOutExpo"
  });

  // Lamp
  anime({
    targets: ".furniture-lamp",
    translateX: [-100, 0],
    opacity: [0, 1],
    duration: 1300,
    delay: 150,
    easing: "easeOutExpo"
  });

  // Plant
  anime({
    targets: ".furniture-plant",
    translateY: [80, 0],
    opacity: [0, 1],
    duration: 1300,
    delay: 300,
    easing: "easeOutExpo"
  });


  // Lamp glowing
  anime({
    targets: ".lamp-light",
    opacity: [0.3, 0.9],
    scale: [0.9, 1.12],
    direction: "alternate",
    duration: 1800,
    loop: true,
    easing: "easeInOutSine"
  });


  // Plant leaves move
  anime({
    targets: ".plant-leaf",
    rotate: function (_, index) {
      const base = [-50, -20, 15, 48];

      return [
        base[index] - 3,
        base[index] + 3
      ];
    },
    duration: 1800,
    delay: anime.stagger(150),
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine"
  });


  // Pillows slowly float
  anime({
    targets: ".sofa-cushion",
    translateY: [-3, 4],
    direction: "alternate",
    duration: 1600,
    delay: anime.stagger(300),
    loop: true,
    easing: "easeInOutSine"
  });


  // Furniture click animation
  document
    .querySelectorAll(".furniture-piece")
    .forEach(function (item) {

      item.addEventListener("click", function () {

        anime({
          targets: item,
          scale: [1, 1.06, 1],
          duration: 500,
          easing: "easeInOutQuad"
        });

      });

    });


  // Mouse parallax
  const animation = document.querySelector(".furniture-animation");

  if (animation) {

    animation.addEventListener("mousemove", function (event) {

      const rect = animation.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;


      anime({
        targets: ".furniture-sofa",
        translateX: x * 15,
        translateY: y * 8,
        duration: 500,
        easing: "easeOutQuad"
      });


      anime({
        targets: ".furniture-chair",
        translateX: x * 28,
        translateY: y * 14,
        duration: 500,
        easing: "easeOutQuad"
      });


      anime({
        targets: ".furniture-table",
        translateX: x * 35,
        translateY: y * 18,
        duration: 500,
        easing: "easeOutQuad"
      });


      anime({
        targets: ".furniture-lamp",
        translateX: x * 10,
        translateY: y * 5,
        duration: 500,
        easing: "easeOutQuad"
      });

    });


    animation.addEventListener("mouseleave", function () {

      anime({
        targets:
          ".furniture-sofa, .furniture-chair, .furniture-table, .furniture-lamp",

        translateX: 0,
        translateY: 0,

        duration: 700,

        easing: "easeOutExpo"
      });

    });

  }

});
