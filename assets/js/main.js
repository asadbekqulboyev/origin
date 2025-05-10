$(document).ready(function () {
  // header

  // hero slider
  const hero_left_slide = new Swiper(".hero__left_slider", {
    loop: true,
    pagination: {
      el: ".hero__left_slider .swiper-pagination",
      clickable: true,
    },
  });
  const hero_slider = new Swiper(".hero_slider", {});
  const hero_cards = new Swiper(".hero_cards", {
    navigation: {
      nextEl: ".hero .button-prev",
      prevEl: ".hero  .button-next",
    },
    spaceBetween: 8,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      556: {
        slidesPerView: 1.5,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
  //   select 2
  $(".filter__select").select2({
    placeholder: "Материал",
    width: "resolve",
  });
  const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
  });
  //   products_cards
  let products_cards = new Swiper(".products_cards", {
    navigation: {
      nextEl: ".products .button-prev",
      prevEl: ".products  .button-next",
    },
    spaceBetween: 8,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      556: {
        slidesPerView: 1.5,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3.5,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  });

  const sertficatesSlide = new Swiper(".sertficates_slide", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const totalSlides = sertficatesSlide.slides.length;
  $("#slide-counter").text(`01/${totalSlides.toString().padStart(2, "0")}`);

  sertficatesSlide.on("slideChange", function () {
    const currentSlide = sertficatesSlide.activeIndex + 1;
    $("#slide-counter").text(
      `${currentSlide.toString().padStart(2, "0")}/${totalSlides
        .toString()
        .padStart(2, "0")}`
    );
  });

  $("#download-btn").on("click", function () {
    const activeSlide = $(
      sertficatesSlide.slides[sertficatesSlide.activeIndex]
    );
    const pdfUrl = activeSlide.attr("data-pdf");
    if (pdfUrl) {
      window.location.href = pdfUrl;
    }
  });
});
