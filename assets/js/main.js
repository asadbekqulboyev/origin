$(document).ready(function () {
  if ($(window).width() > 992) {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $(".header").addClass("scroll");
      } else {
        $(".header").removeClass("scroll");
        $(".header__nav").css("display", "flex");
      }
    });
  }

  // hero slider
  const hero_left_slide = new Swiper(".hero__left_slider", {
    loop: true,
    pagination: {
      el: ".hero__left_slider .swiper-pagination",
      clickable: true,
    },
  });
  const hero_slider = new Swiper(".hero_slider", {
    spaceBetween: 4,
    breakpoints: {
      0: {
        slidesPerView: 1.05,
      },
      768: {
        slidesPerView: 1,
      },
    },
  });
  let hero_cards; // global o'zgaruvchi

  function initHeroSwiper() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 556 && !hero_cards) {
      hero_cards = new Swiper(".hero_cards", {
        navigation: {
          nextEl: ".hero .button-prev",
          prevEl: ".hero .button-next",
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
    } else if (screenWidth < 556 && hero_cards) {
      hero_cards.destroy(true, true); // Swiper'ni yo'qotish
      hero_cards = null;
    }
  }

  // Dastlab ishga tushirish
  initHeroSwiper();

  // Ekran o'lchami o'zgarsa qayta tekshiradi
  window.addEventListener("resize", initHeroSwiper);

  //   select 2
  $(".filter__select").select2({
    placeholder: "Материал",
    width: "resolve",
  });
  const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
  });
  //   products_cards
  let products_cards = new Swiper(".products_slider", {
    navigation: {
      nextEl: ".products .button-prev",
      prevEl: ".products  .button-next",
    },
    spaceBetween: 8,
    breakpoints: {
      0: {
        slidesPerView: 2.05,
      },
      556: {
        slidesPerView: 2.3,
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
  let popular_slide = new Swiper(".pupular .products_cards ", {
    grid: {
      rows: 2,
      fill: "row",
    },
    spaceBetween: 16,
    pagination: {
      el: ".pupular .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2.06,
      },
      556: {
        slidesPerView: 2.5,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
        grid: {
          rows: 2,
          fill: "row",
        },
      },
      1200: {
        slidesPerView: 5,
      },
    },
  });
  // card height
  function equalizeSlidesHeight() {
    let maxHeight = 0;

    $(".pupular .products_cards .swiper-slide").each(function () {
      let thisHeight = $(this).outerHeight();
      if (thisHeight > maxHeight) {
        maxHeight = thisHeight;
      }
    });

    $(".pupular .products_cards .swiper-slide").css("height", maxHeight + "px");
  }

  // Swiper yuklangandan so‘ng chaqiring:
  $(document).ready(function () {
    equalizeSlidesHeight();

    // Ekran o'lchami o'zgarsa, qaytadan tekislasin:
    $(window).on("resize", function () {
      // Avval balandlikni tozalaymiz
      $(".pupular .products_cards .swiper-slide").css("height", "auto");
      equalizeSlidesHeight();
    });
  });

  const sertficatesSlide = new Swiper(".sertficates_slide", {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1.2,
      },
      768: {
        slidesPerView: 1,
      },
    },
    pagination: {
      el: ".certificates .swiper-pagination",
      clickable: true,
    },
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
  Fancybox.bind("[data-fancybox]", {
    trapFocus: true,
    placeFocusBack: true,
    autoFocus: false,
    dragToClose: false,
  });
  // sidebar_toggle
  $(".dropdown_mobile").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
    $(this).next(".dorpdown_content").slideToggle();
  });

  // Применяем маску для российского номера телефона
  $("input[type='tel']").inputmask({
    mask: "+7 (999) 999-99-99",
    showMaskOnHover: false,
    showMaskOnFocus: true,
    clearIncomplete: true,
  });
  $(".close_btn").on("click", function () {
    $.fancybox.close();
  });
  if ($(window).width() > 992) {
    $(".sidebar__list .catalog").on("click", function (e) {
      e.preventDefault();
      $(".sidebar__list .catalog").removeClass("active");
      $(".sidebar__subcontent").fadeOut(20);
      $(this).toggleClass("active");
      $(this).next(".sidebar__subcontent").slideToggle();
    });
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".sidebar").length) {
        $(".sidebar__list .catalog").removeClass("active");
        $(".sidebar__subcontent").fadeOut(20);
      }
    });
  } else {
    $(".header_mobile .sidebar__list .catalog").on("click", function (e) {
      e.preventDefault();
      $(".header_mobile .sidebar__list .catalog").removeClass("active");
      $(".header_mobile .sidebar__subcontent").fadeOut(20);
      $(this).toggleClass("active");
      $(this).next(".header_mobile .sidebar__subcontent").slideToggle();
    });
  }
  // Фильтр
  $(".filter__checkbox_header").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
    $(this).next(".filter__checkbox_content").slideToggle();
  });
  $(".open__lists").each(function () {
    let inputCount = $(this).children("label").length;
    $(this)
      .next(".open__btn")
      .find(".open__btn_number")
      .text("Ещё " + inputCount);
  });
  $(".open__btn").click(function (e) {
    e.preventDefault();
    $(this).hide();
    $(this).prev(".open__lists").fadeIn().css("display", "flex");
  });
  $("#price_range_slider").ionRangeSlider({
    type: "double",
    min: 250,
    max: 5000,
    from: 250,
    to: 2500,
    postfix: " ₽",
    onStart: function (data) {
      updatePriceInputs(data.from, data.to);
    },
    onChange: function (data) {
      updatePriceInputs(data.from, data.to);
    },
  });

  function updatePriceInputs(from, to) {
    $(".filter__input_from").val(from);
    $(".filter__input_to").val(to);
  }
});
