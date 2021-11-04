function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
includeHTML();

window.addEventListener("DOMContentLoaded", (event) => {
  jQuery("div#navbar.navbar").css("background-color", "rgba(255, 255, 255, 0)");
  jQuery(".dropbtn2").css("color", "rgb(1, 1, 29)");
  jQuery(".column2 a").css("color", "white");

  jQuery(window).scroll(function () {
    if (jQuery(window).scrollTop() > 0) {
      jQuery("div#navbar.navbar").css("background-color", "rgb(1, 1, 29)");
      jQuery(".dropbtn2").css("color", "rgba(255, 255, 255, 1)");
      jQuery(".column2 a").css("color", "rgb(1, 1, 29)");

      jQuery(".ddc").addClass("dropdown2-content");
      jQuery(".ddc").removeClass("dropdown2-content-dark");
    } else {
      jQuery("div#navbar.navbar").css(
        "background-color",
        "rgba(255, 255, 255, 0)"
      );
      jQuery(".dropbtn2").css("color", "rgb(1, 1, 29)");
      jQuery(".ddc").removeClass("dropdown2-content");
      jQuery(".ddc").addClass("dropdown2-content-dark");
      jQuery(".column2 a").css("color", "white");
    }
  });
});

jQuery(document).ready(function () {
  jQuery(".icofont-search-1").click(function () {
    jQuery(this).addClass("Search-container");
  });
});

$(document).ready(function () {
  $(".icofont-search-1").click(function () {
    $(this).addClass("Search-container");
  });
});

$(function () {
  $(".c_h").click(function (e) {
    if ($(".chat_container").is(":visible")) {
      $(".c_h .right_c .mini").text("+");
    } else {
      $(".c_h .right_c .mini").text("-");
    }
    $(".chat_container").slideToggle("slow");
    return false;
  });
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  $("#vic").removeClass("viclarge");
  $("#vic").addClass("vicsmall");
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  $("#vic").removeClass("vicsmall");
  $("#vic").addClass("viclarge")
}




function sendMail(){
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var subject=document.getElementById("subject").value;
    var phone=document.getElementById("phone").value;
    var message=document.getElementById("message").value

    var payload={name:name, email:email, subject:subject, phone:phone, message:message}
    sendToAdmin(payload);
    sendToUser(payload)
    }
function sendToAdmin(arr){
    Email.send({
    Host: "smtp.gmail.com",
    Username: "hexxondiv",
    Password: "ltzmmwihyzflcpbp",
    To: 'ukohasarah@gmail.com',
    From: "hexxondiv@gmail.com",
    Subject: arr.name +" contacted you",
    Body: "Hello admin. " +arr.name+" sent you a contact message. Here is the message: "+arr.message+
    " here is their phone number: "+arr.phone+" here is their email: "+arr.email,
  })
    .then(function (message) {
      console.log("mail sent successfully to Admin")
    });

}
function sendToUser(arr){
    Email.send({
    Host: "smtp.gmail.com",
    Username: "hexxondiv",
    Password: "ltzmmwihyzflcpbp",
    To: arr.email,
    From: "hexxondiv@gmail.com",
    Subject: "we received your message",
    Body: "Hello "+arr.name+". we received your contact message. An Admin will contact you shortly. Thanks",
  })
    .then(function (message) {
      alert("mail sent successfully")
    });

}





var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
acc[i].addEventListener("click", function() {
/* Toggle between adding and removing the "active" class,
to highlight the button that controls the panel */
this.classList.toggle("active");

/* Toggle between hiding and showing the active panel */
var panel = this.nextElementSibling;
if (panel.style.display === "block") {
panel.style.display = "none";
} else {
panel.style.display = "block";
}
});
}


//for gallery

const isSrcsetSupported = 'srcset' in new Image();
const swipingThreshold = 5;

let $lightbox;
let images = [];
let currentIndex = 0;
let wasSwiping = false;

$(() => {
    initGallery();
    createLightbox();
});

function initGallery() {
    const $galleryItems = $('.gallery-item');
    const $galleryThumbs = $galleryItems.find('.thumb');

    const loadThumbnail = target => {

        // get the src and srcset from the dataset of the gallery thumb
        const src = target.dataset.src;
        const srcset = target.dataset.srcset;

        // create a temporary image
        const tempImage = new Image();

        // set the src or srcset of the temp img to preload the actual image file
        if (isSrcsetSupported && srcset) {
            tempImage.srcset = srcset;
        } else if (src) {
            tempImage.src = src;
        }

        // when the temp image is loaded, set the src or srcset to the gallery thumb
        tempImage.onload = function () {
            if (tempImage.srcset) {
                target.srcset = srcset;
            } else if (src) {
                target.src = src;
            }

            target.classList.remove('placeholder');
        }
    };

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            rootMargin: '200px 0px'
        }

        const handleIntersectionObserver = entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadThumbnail(entry.target);
                    intersectionObserver.unobserve(entry.target);
                }
            });
        };

        const intersectionObserver = new IntersectionObserver(handleIntersectionObserver, observerOptions);

        $galleryThumbs.each((i, el) => intersectionObserver.observe(el));

    } else {
        // Fallback for unsupported browsers
        $galleryThumbs.each((i, el) => loadThumbnail(el));
    }

    $galleryItems.on('click', e => {
        const $currentTarget = $(e.currentTarget);

        const $currentGallery = $currentTarget.closest('.gallery');
        const itemIndex = $currentTarget.index();

        openLightbox($currentGallery, itemIndex);
        initSlides();
        addLightboxEventListeners();
    });
}

function openLightbox($currentGallery, targetIndex) {
    $lightbox.addClass('open');
    $lightbox.parent('.lightbox-wrapper').fadeIn('fast');

    images = [];
    $currentGallery.find('.gallery-item').each((i, element) => {
        const $currentImageEl = $(element).find('img');

        const currentItem = {
            src: $currentImageEl.data('image') || $currentImageEl.data('src'),
            srcFallback: $currentImageEl.data('image-fallback'),
            srcset: $currentImageEl.data('image-srcset'),
            title: $currentImageEl.data('title')
        }

        images.push(currentItem);
    });

    currentIndex = targetIndex;
    showInitialImage(targetIndex);
    updateLightboxHeader(targetIndex);
}

function showInitialImage(index) {
    const $prevSlide = $lightbox.find('.lightbox-slide[data-state="prev"]');
    const $currentSlide = $lightbox.find('.lightbox-slide[data-state="current"]');
    const $nextSlide = $lightbox.find('.lightbox-slide[data-state="next"]');
    const $currentImage = $currentSlide.find('.lightbox-image');
    const $spinner = $currentSlide.find('.spinner');

    loadImage($currentSlide, index);

    $currentImage.hide();
    $spinner.show();

    $currentImage.on('load.currentImage', e => {
        loadImage($prevSlide, index - 1);
        loadImage($nextSlide, index + 1);
        $currentImage.off('load.currentImage');
    });
}

function createLightbox() {
    // ------------------------- //
    // Create DOM Elements,
    // Append Lightbox to Body
    // ------------------------- //

    const $lightboxWrapper = $('<div class="lightbox-wrapper">');
    $lightbox = $('<div class="lightbox">');

    // Header
    const $lightboxHeader = $('<div class="lightbox-header">');
    const $lightboxNumbers = $('<div class="lightbox-numbers"></div>');
    const $lightboxTitle = $('<div class="lightbox-title"></div>');
    const $lightboxClose = $('<button type="button" class="lightbox-close" aria-label="Close"></button>');
    $lightboxHeader.append($lightboxNumbers, $lightboxTitle, $lightboxClose);
    $lightbox.append($lightboxHeader);

    // Slides Wrapper
    const $slidesWrapper = $('<div class="lightbox-slides-wrapper"></div>');
    $lightbox.append($slidesWrapper);

    // Slides
    const $prevSlide = $('<div class="lightbox-slide" data-state="prev"></div>');
    const $currentSlide = $('<div class="lightbox-slide" data-state="current"></div>');
    const $nextSlide = $('<div class="lightbox-slide" data-state="next"></div>');
    $slidesWrapper.append($prevSlide, $currentSlide, $nextSlide);

    // Image
    const $lightboxImage = $('<img class="lightbox-image" src="" alt="" draggable="false">');
    $currentSlide.append($lightboxImage);
    $prevSlide.append($lightboxImage.clone());
    $nextSlide.append($lightboxImage.clone());

    // Loading Spinner
    const $spinner = $('<div class="spinner spinner-border" role="status"><span class="sr-only">Loading... </span></div>');
    $currentSlide.append($spinner);
    $prevSlide.append($spinner.clone());
    $nextSlide.append($spinner.clone());

    // Arrows
    const $lightboxArrowLeft = $('<div class="lightbox-arrow arrow-left"></div>');
    const $lightboxArrowRight = $('<div class="lightbox-arrow arrow-right"></div>');
    $lightbox.append($lightboxArrowLeft);
    $lightbox.append($lightboxArrowRight);

    // Footer
    const $lightboxFooter = $('<div class="lightbox-footer">');
    $lightbox.append($lightboxFooter);

    // append lightbox to body
    $lightbox.appendTo($lightboxWrapper);
    $lightboxWrapper.appendTo($('body'));
}

function addLightboxEventListeners() {
    // close lightbox when clicking on background
    $lightbox.find('.lightbox-slide').on('click', e => {
        if (e.currentTarget == e.target && !wasSwiping) closeLightbox();
    });

    // close lightbox when clicking on close button
    $lightbox.find('.lightbox-close').on('click', e => {
        closeLightbox();
    });
}

function closeLightbox() {
    const $lightboxWrapper = $('.lightbox-wrapper');
    const $lightboxImage = $lightbox.find('.lightbox-image');

    // close lightbox
    $lightboxWrapper.removeClass('open').fadeOut('fast', () => {
        $lightboxImage.attr('src', '');
        $lightboxImage.attr('srcset', '');
    });

    // remove lightbox event listeners
    $lightbox.find('.lightbox-slide').off();
    $lightbox.find('.lightbox-close').off();
    $lightbox.find('.lightbox-arrow').off();
    $(document).off('keydown.lightbox');
}

// try avoiding jQuery in mouse and touch event handlers to improve performance
function initSlides() {
    const transitionDuration = 400;
    let distance = 0;
    let startPos = 0;
    let slideWidth = 0;

    let $currentSlide;
    let currentSlideEl;
    let prevSlideEl;
    let nextSlideEl;

    const updateSlideVariables = () => {
        $currentSlide = $('.lightbox-slide[data-state="current"]');
        currentSlideEl = $currentSlide[0];
        prevSlideEl = document.querySelector('.lightbox-slide[data-state="prev"]');
        nextSlideEl = document.querySelector('.lightbox-slide[data-state="next"]');
    }

    updateSlideVariables();

    const handleSlideMove = event => {
        const currentPos = event.type == 'touchmove' ? event.touches[0].clientX : event.clientX;
        distance = currentPos - startPos;

        if (distance < -swipingThreshold || distance > swipingThreshold) wasSwiping = true;

        // move current slide and adjust opacity
        currentSlideEl.style.transform = `translateX(${distance}px)`;
        currentSlideEl.style.opacity = mapRange(Math.abs(distance), 0, slideWidth, 1, 0);

        // TODO: reset slide if (currentPos > slideWidth || currentPos < 0)   (not sure if necessary)

        if (distance < 0) {
            // move next slide and adjust opacity
            nextSlideEl.style.transform = `translateX(${slideWidth + distance}px)`;
            nextSlideEl.style.opacity = mapRange(Math.abs(distance), 0, slideWidth, 0, 1);
        } else {
            // move previous slide and adjust opacity
            prevSlideEl.style.transform = `translateX(${distance - slideWidth}px)`;
            prevSlideEl.style.opacity = mapRange(Math.abs(distance), 0, slideWidth, 0, 1);
        }
    }

    const handleMouseDownOrTouchStart = event => {
        startPos = event.type == 'touchstart' ? event.touches[0].clientX : event.clientX;
        slideWidth = currentSlideEl.offsetWidth;
        wasSwiping = false;

        currentSlideEl.style.transitionDuration = '0ms';
        $currentSlide.on('mousemove touchmove', handleSlideMove);
    }

    const addSlideEventListeners = () => {
        // mouse & touch event listener
        $currentSlide.on('mousedown touchstart', handleMouseDownOrTouchStart);
        $currentSlide.on('mouseup touchend touchcancel', handleMouseUpOrTouchEnd);

        // keyboard event listener
        $(document).on('keydown.lightbox', e => {
            if (e.key == 'ArrowLeft') {
                showPrevSlide();
                updateLightbox('prev');
            } else if (e.key == 'ArrowRight') {
                showNextSlide();
                updateLightbox('next');
            } else if (e.key == 'Escape') closeLightbox();
        });

        // click on left arrow
        $lightbox.find('.lightbox-arrow.arrow-left').on('click', e => {
            showPrevSlide();
            updateLightbox('prev');
        });

        // click on right arrow
        $lightbox.find('.lightbox-arrow.arrow-right').on('click', e => {
            showNextSlide();
            updateLightbox('next');
        });
    }

    removeSlideEventListeners = () => {
        // mouse & touch event listener
        $(currentSlideEl).off('mousedown touchstart');
        $(currentSlideEl).off('mouseup touchend touchcancel');

        // keyboard event listener
        $(document).off('keydown.lightbox');

        // arrow buttons event listener
        $lightbox.find('.lightbox-arrow').off('click');
    }

    const transformSlide = (element, translateX, opacity) => {
        element.style.transform = `translateX(${translateX})`;
        element.style.opacity = opacity;
        element.style.transitionDuration = `${transitionDuration}ms`;
        $(element).off('mousemove touchmove');
        distance = 0;
    }

    const showNextSlide = () => {
        transformSlide(prevSlideEl, '100%', 0);
        transformSlide(currentSlideEl, '-100%', 0);
        transformSlide(nextSlideEl, '0px', 1);
    }

    const showPrevSlide = () => {
        transformSlide(prevSlideEl, '0px', 1);
        transformSlide(currentSlideEl, '100%', 0);
        transformSlide(nextSlideEl, '-100%', 0);
    }

    const resetSlide = () => {
        transformSlide(prevSlideEl, '-100%', 0);
        transformSlide(currentSlideEl, '0px', 1);
        transformSlide(nextSlideEl, '100%', 0);
    }

    const updateLightbox = (newSlide) => {
        if (newSlide != 'current') removeSlideEventListeners();

        setTimeout(() => {
            // reset transition duration
            [currentSlideEl, nextSlideEl, prevSlideEl].forEach(element => {
                element.style.transitionDuration = '0ms';
            });

            let index;

            if (newSlide == 'next') {
                prevSlideEl.dataset.state = 'next';
                nextSlideEl.dataset.state = 'current';
                currentSlideEl.dataset.state = 'prev';

                index = getLoopedIndex(currentIndex + 1);
                loadImage($(prevSlideEl), index + 1);

            } else if (newSlide == 'prev') {
                prevSlideEl.dataset.state = 'current';
                currentSlideEl.dataset.state = 'next';
                nextSlideEl.dataset.state = 'prev';

                index = getLoopedIndex(currentIndex - 1);
                loadImage($(nextSlideEl), index - 1);

            } else {
                return;
            }

            updateSlideVariables();
            addSlideEventListeners();
            updateLightboxHeader(index);

            currentIndex = index;

        }, transitionDuration);
    }

    const handleMouseUpOrTouchEnd = event => {
        const slideChangeThreshold = 150;

        if (distance < -slideChangeThreshold) {
            showNextSlide();
            updateLightbox('next');
        } else if (distance > slideChangeThreshold) {
            showPrevSlide();
            updateLightbox('prev');
        } else {
            resetSlide();
            updateLightbox('current');
        }
    }

    addSlideEventListeners();
}

function updateLightboxHeader(index) {
    index = getLoopedIndex(index);
    const title = images[index].title;

    $lightbox.find('.lightbox-title').text(title);
    $lightbox.find('.lightbox-numbers').text(index + 1 + '/' + images.length);
}

function loadImage($targetSlide, index) {
    index = getLoopedIndex(index);

    const $currentImage = $targetSlide.find('.lightbox-image');
    const src = isSrcsetSupported ? images[index].src : images[index].srcFallback;
    const srcset = images[index].srcset;

    const tempImage = new Image();

    if (isSrcsetSupported && srcset) {
        tempImage.srcset = srcset;
    } else {
        tempImage.src = src;
    }

    $(tempImage).on('load.loadImage', e => {
        if (isSrcsetSupported && srcset) {
            $currentImage.attr('srcset', srcset);
        } else {
            $currentImage.attr('src', src);
        }

        $targetSlide.find('.spinner').hide();
        $currentImage.show();
        $currentImage.off('load.loadImage');
    });
}

function getLoopedIndex(index) {
    if (index > images.length - 1) return 0;
    if (index < 0) return images.length - 1;
    return index;
}

// Re-maps a number from one range to another.
function mapRange(value, fromIn, toIn, fromOut, toOut) {
    return fromOut + (toOut - fromOut) * (value - fromIn) / (toIn - fromIn);
}

//end of gallery


//for alumni


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
	if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : 
        decodeURIComponent(sParameterName[1]);
   }
  }
};
if(getUrlParameter('register') == 'true')
{
   document.getElementById('flipcard-inner').style.transform = 'rotateY(180deg)';			
		}



        //for FAQ

       function myFunction() {
          var dots = document.getElementById("dots");
          var moreText = document.getElementById("more");
          var btnText = document.getElementById("myBtn");

          if (dots.style.display === "none") {
            dots.style.display = "block";
            btnText.innerHTML = "";
            moreText.style.display = "none";
          } else {
            dots.style.display = "none";
            btnText.innerHTML = "";
            moreText.style.display = "block";

          }
        }


        function myFunction2() {
          var dots2 = document.getElementById("dots2");
          var moreText = document.getElementById("more2");
          var btnText = document.getElementById("myBtn2");

          if (dots2.style.display === "none") {
            dots2.style.display = "block";
            btnText.innerHTML = "";
            moreText.style.display = "none";
          } else {
            dots2.style.display = "none";
            btnText.innerHTML = "";
            moreText.style.display = "block";

          }
        }


        function myFunction3() {
          var dots3 = document.getElementById("dots3");
          var moreText = document.getElementById("more3");
          var btnText = document.getElementById("myBtn3");

          if (dots3.style.display === "none") {
            dots3.style.display = "block";
            btnText.innerHTML = "";
            moreText.style.display = "none";
          } else {
            dots3.style.display = "none";
            btnText.innerHTML = "";
            moreText.style.display = "block";

          }
        }

        function myFunction4() {
          var dots4 = document.getElementById("dots4");
          var moreText = document.getElementById("more4");
          var btnText = document.getElementById("myBtn4");

          if (dots4.style.display === "none") {
            dots4.style.display = "block";
            btnText.innerHTML = "";
            moreText.style.display = "none";
          } else {
            dots4.style.display = "none";
            btnText.innerHTML = "";
            moreText.style.display = "block";

          }
        }

        function myFunction5() {
          var dots5 = document.getElementById("dots5");
          var moreText = document.getElementById("more5");
          var btnText = document.getElementById("myBtn5");

          if (dots5.style.display === "none") {
            dots5.style.display = "block";
            btnText.innerHTML = "";
            moreText.style.display = "none";
          } else {
            dots5.style.display = "none";
            btnText.innerHTML = "";
            moreText.style.display = "block";

          }
        }
        function myFunction6() {
          var dots6 = document.getElementById("dots6");
          var moreText = document.getElementById("more6");
          var btnText = document.getElementById("myBtn6");

          if (dots6.style.display === "none") {
            dots6.style.display = "block";
            btnText.innerHTML = "";
            moreText.style.display = "none";
          } else {
            dots6.style.display = "none";
            btnText.innerHTML = "";
            moreText.style.display = "block";


          }
        }

        function myFunction7() {
          var dots7 = document.getElementById("dots7");
          var moreText = document.getElementById("more7");
          var btnText = document.getElementById("myBtn7");

          if (dots7.style.display === "none") {
            dots7.style.display = "block";
            btnText.innerHTML = "";
            moreText.style.display = "none";
          } else {
            dots7.style.display = "none";
            btnText.innerHTML = "";
            moreText.style.display = "block";


          }
        }

        function myFunction8() {
          var dots8 = document.getElementById("dots8");
          var moreText = document.getElementById("more8");
          var btnText = document.getElementById("myBtn8");

          if (dots8.style.display === "none") {
            dots8.style.display = "block";
            btnText.innerHTML = "";
            moreText.style.display = "none";
          } else {
            dots8.style.display = "none";
            btnText.innerHTML = "";
            moreText.style.display = "block";


          }
        }
        //for welcome address


