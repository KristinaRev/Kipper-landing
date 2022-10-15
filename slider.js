let images = [{
    url: "images/Slider/sk.png",
    title: "IC 'Repair Design Project'"
  }, {
    url: "images/Slider/kane.png",
    title: "Kane.Digital group"
  }];

  function initSlider(options) {
    if (!images || !images.length) return;
    //Проверяем пришел images пустой или нет. Если нет,то выходим(return)
    
    options = options || {
      titles: false,
      dots: true,
      autoplay: false
    };
    
    let sliderImages = document.querySelector(".slider__images");
    let sliderArrows = document.querySelector(".slider__arrows");
    let sliderDots = document.querySelector(".slider__dots");
    
    initImages();
    initArrows();
    
    if (options.dots) {
      initDots();
    }
    
    if (options.titles) {
      initTitles();
    }
    
    if (options.autoplay) {
      initAutoplay();
    }
    
    function initImages() {
      images.forEach((image, index) => {
        let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;//index === 0? "active" : "" Сделали класс active для изображения с 0 индексом. Это нужно чтобы сделать видимым изображение с классом active, а другие изображения скрыть
        sliderImages.innerHTML += imageDiv;
      });
    }
    
    function initArrows() {
      sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
        arrow.addEventListener("click", function() {
          let curNumber = +sliderImages.querySelector(".active").dataset.index;
          //написали +чтобы преобразовать в число. dataset.index это атрибут который мы придумали и записали как data-index="${index}" выше при помощи initImages(), в таком случае data- не пишется а пишется dataset.index
          let nextNumber;
          if (arrow.classList.contains("left")) {
            nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
          } else {
            nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
          }
          moveSlider(nextNumber);
        });
      });
    }
    
    function initDots() {
      images.forEach((image, index) => {
        let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
        sliderDots.innerHTML += dot;
      });
      sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
        dot.addEventListener("click", function() {
          moveSlider(this.dataset.index);
        })
      })
    }
    
    function moveSlider(num) {
      sliderImages.querySelector(".active").classList.remove("active");
      sliderImages.querySelector(".n" + num).classList.add("active");
      if (options.dots) {
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");
      }
      if (options.titles) changeTitle(num);
    }
    
    function initTitles() {
      let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
      sliderImages.innerHTML += cropTitle(titleDiv, 50);
    }
    
    function changeTitle(num) {
      if (!images[num].title) return;
      let sliderTitle = sliderImages.querySelector(".slider__images-title");
      sliderTitle.innerText = cropTitle(images[num].title, 50); //очень важно здесь указывать не .innerHTML, а .innerText, потому что могут придти разные данные с сервера, не только текст, а какой либо скрипт, тогда это может навредить. 
    }
    
    function cropTitle(title, size) {//если название больше допустимого размера, то оно обрежется
      if (title.length <= size) {
        return title;
      } else {
        return title.substr(0, size) + "...";
      }
    }
    
    function initAutoplay() {
      setInterval(() => {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        moveSlider(nextNumber);
      }, options.autoplayInterval);
    }
  }
  
  let sliderOptions = {
    dots: true,
    titles: true,
    autoplay: true,
    autoplayInterval: 5000
  };
  
  document.addEventListener("DOMContentLoaded", function() {
    initSlider(sliderOptions);
  });