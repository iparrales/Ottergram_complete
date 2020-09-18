var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var RIGHT_LEFT_BUTTONS = '[data-image-button="button"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

//Function for the arrows
function arrowButtons() {
    'use strict';
    var getTitle = document.querySelector(DETAIL_TITLE_SELECTOR); //get the title of the current title image
    var buttons = document.querySelectorAll(RIGHT_LEFT_BUTTONS); //get the two buttons 
    var buttonArray = [].slice.call(buttons); //make into array to differentiate the buttons 
    var leftButton = buttonArray[0];
    var rightButton = buttonArray[1];
    var currentTitle; //will hold the new current title once arrow is clicked 
    var currentImage; //will hold the new current image once arrow is clicked 
    var thumbnailsArray = getThumbnailsArray();

    leftButton.addEventListener('click', function (event) {
        event.preventDefault();

        //loop through thumbnail array to get index of current image
        //to properly execute the left arrow  
        for (var i = 0; i < thumbnailsArray.length; i++) {
            if (thumbnailsArray[i].getAttribute("data-image-title") == getTitle.textContent) {
                if (i == 0) {
                    currentImage = imageFromThumb(thumbnailsArray.slice(-1)); //slice(-1) is to get the last 
                    currentTitle = titleFromThumb(thumbnailsArray.slice(-1)); //element of the array
                    setDetails(currentImage, currentTitle);
                    break;
                } else {
                    currentImage = imageFromThumb(thumbnailsArray[i - 1]);
                    currentTitle = titleFromThumb(thumbnailsArray[i - 1]);
                    setDetails(currentImage, currentTitle);
                }
            }
        }
    });

    //same as above, loop through to find the index to properly execute right arrow
    rightButton.addEventListener('click', function (event) {
        event.preventDefault();
        for (var i = 0; i < thumbnailsArray.length; i++) {
            if (thumbnailsArray[i].getAttribute("data-image-title") == getTitle.textContent) {
                if (i == thumbnailsArray.length - 1) {
                    currentImage = imageFromThumb(thumbnailsArray[0]);
                    currentTitle = titleFromThumb(thumbnailsArray[0]);
                    setDetails(currentImage, currentTitle);
                } else {
                    currentImage = imageFromThumb(thumbnailsArray[i + 1]);
                    currentTitle = titleFromThumb(thumbnailsArray[i + 1]);
                    setDetails(currentImage, currentTitle);
                    break;
                }
            }
        }
    });

}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    arrowButtons();
}

initializeEvents();