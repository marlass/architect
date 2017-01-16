function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function calculatePrice () {
    const result = document.querySelector('.calc__result');
    const area = document.querySelector('[name="size"]').value || 0;
    let qs = document.querySelector('[name="garden"]').parentNode.querySelector(':checked');
    let garden = 0;
    if (qs) {
        garden = 1;
    } else {
        garden = 0;
    }
    let qs2 = document.querySelector('[name="build"]').parentNode.querySelector(':checked');
    let build = 0;
    if (qs2) {
        build = 1;
    } else {
        build = 0;
    }
    let qs3 = document.querySelector('[name="terrace"]').parentNode.querySelector(':checked');
    let terrace = 0;
    if (qs3) {
        terrace = 1;
    } else {
        terrace = 0;
    }
    
    const garages = document.getElementsByName('garage');
    let garage = 0;

    for (let i = 0, length = garages.length; i < length; i++) {
        if (garages[i].checked) {
            garage = garages[i].value;
            break;
        }
    }

    const projects = document.getElementsByName('projekt');
    let project = 'project1';

    for (let i = 0, length = projects.length; i < length; i++) {
        if (projects[i].checked) {
            project = projects[i].value;
            break;
        }
    }

    const lang = document.documentElement.lang;

    let price = 0;

    if (isNumber(area)) {
        if (lang === 'en') {
            price = area*160/10.7;
        } else {
            price = area*160;
        }
    }

    if (garage === '1') {
        price += 1500;

    } else if (garage === '2') {
        price += 2000;
    }

    if (project === 'project2') {
        price *= 2.2; 
    } else if (project === 'project3') {
        price *= 3;
    }

    if (garden) {
        price += 4000;
    }
    if (build) {
        price += 1500;
    }

    if (terrace) {
        price += 3000;
    }


    let resultText = '';
    if (lang === 'en') {
        if (garden && terrace) {
            resultText = `We offer project for single-family house of ${area}ft<sup>2</sup> size with garden and terrace`;
        } else if (garden && !terrace) {
            resultText = `We offer project for single-family house of ${area}ft<sup>2</sup> size with garden`;
        } else if (terrace) {
            resultText = `We offer project for single-family house of ${area}ft<sup>2</sup> size with terrace`;
        } else {
            resultText = `We offer project for single-family house of ${area}ft<sup>2</sup> size`;
        }
        if (garage === '1') {
            resultText += `, garage`;
        } else if (garage === '2') {
            resultText += ', double garage';
        }
        if (project === 'project2') {
            resultText += ` and installation project` ;
        } else if (project === 'project3') {
            resultText += ` and instalation project, and decoration`;
        }
        if (build) {
            resultText += ` with build cost estimation`;
        }        
        resultText += ` from ${Math.floor(price/5)}£.`;
    } else {
        if (garden && terrace) {
            resultText = `Oferujemy projekt domu jednorodzinnego o metrażu ${area}m<sup>2</sup> z ogrodem i tarasem`;
        } else if (garden && !terrace) {
            resultText = `Oferujemy projekt domu jednorodzinnego o metrażu ${area}m<sup>2</sup> z ogrodem`;
        } else if (terrace) {
            resultText = `Oferujemy projekt domu jednorodzinnego o metrażu ${area}m<sup>2</sup> z tarasem`;
        } else {
            resultText = `Oferujemy projekt domu jednorodzinnego o metrażu ${area}m<sup>2</sup>`;
        }
        if (garage === '1') {
            resultText += `, garażem`;
        } else if (garage === '2') {
            resultText += ', 2 garażami';
        }
        if (project === 'project2') {
            resultText += ` i projektem instalacji`; 
        } else if (project === 'project3') {
            resultText += ` i projektem instalacji, i wnętrz`;
        }
        if (build) {
            resultText += ` z wyceną budowy`;
        }        
        resultText += ` od ${Math.floor(price)}zł.`;
    }

    result.innerHTML = resultText;
}

const area = document.querySelector('[name="size"]');
const garages = document.querySelectorAll('[name="garage"]');
const projects = document.querySelectorAll('[name="projekt"]');
const build = document.querySelector('[name="build"]');
const garden = document.querySelector('[name="garden"]');
const terrace = document.querySelector('[name="terrace"]');

if (area && garages && projects && build && garden && terrace) {

    area.addEventListener('input', function(e) {
        calculatePrice();
    });

    garages.forEach(function(a) {
        a.addEventListener('change', function(e) {
            calculatePrice();
        });
    });

    projects.forEach(function(a) {
        a.addEventListener('change', function(e) {
            calculatePrice();
        });
    });

    build.addEventListener('change', function(e) {
        calculatePrice();
    });

    garden.addEventListener('change', function(e) {
        calculatePrice();
    });

    terrace.addEventListener('change', function(e) {
        calculatePrice();
    });
}

var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var blockId = el.closest('.content').getAttribute('data-block-id');
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            var originalLink = linkEl.getAttribute('href').replace('/static/uploads/','');

            let itemsFromBackend = window.__GALLERY__[parseInt(blockId)];
            
            for (var l=0; l<itemsFromBackend.length; l++) {
                if (itemsFromBackend[l].path == originalLink) {
                    item = itemsFromBackend[l];
                }
            }

            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }

        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery, true );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
            options.hideAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        var realViewportWidth,
            useLargeImages = true,
            firstResize = true,
            imageSrcWillChange,
            use3840 = false,
            use1920 = false,
            use1600 = false,
            use1280 = false,
            use1024 = false,
            use960 = false,
            use640 = false,
            use320 = false,
            use200 = false;

        // beforeResize event fires each time size of gallery viewport updates
        gallery.listen('beforeResize', function() {
            // gallery.viewportSize.x - width of PhotoSwipe viewport
            // gallery.viewportSize.y - height of PhotoSwipe viewport
            // window.devicePixelRatio - ratio between physical pixels and device independent pixels (Number)
            //                          1 (regular display), 2 (@2x, retina) ...


            // calculate real pixels when size changes
            realViewportWidth = gallery.viewportSize.x * window.devicePixelRatio;

            // Code below is needed if you want image to switch dynamically on window.resize

            // Find out if current images need to be changed
            imageSrcWillChange = true;
            if(realViewportWidth > 1920) {
                use3840 = true;
            } else if(realViewportWidth > 1600) {
                use1920 = true;
            } else if (realViewportWidth > 1280) {
                use1600 = true;
            } else if (realViewportWidth > 1024) {
                use1280 = true;
            } else if (realViewportWidth > 960) {
                use1024 = true;
            } else if (realViewportWidth > 640) {
                use960 = true;
            } else if (realViewportWidth > 320) {
                use640 = true;
            } else if (realViewportWidth > 200) {
                use320 = true;
            } else {
                use200 = true;
            }

            // Invalidate items only when source is changed and when it's not the first update
            if(imageSrcWillChange && !firstResize) {
                // invalidateCurrItems sets a flag on slides that are in DOM,
                // which will force update of content (image) on window.resize.
                gallery.invalidateCurrItems();
            }

            if(firstResize) {
                firstResize = false;
            }

            imageSrcWillChange = false;

        });


        // gettingData event fires each time PhotoSwipe retrieves image source & size
        gallery.listen('gettingData', function(index, item) {

            // Set image source & size based on real viewport width
            if (use3840) {
                item.src = item.img3840.src;
                item.w = item.img3840.w;
                item.h = item.img3840.h;
            } else if (use1920) {
                item.src = item.img1920.src;
                item.w = item.img1920.w;
                item.h = item.img1920.h;
            } else if (use1600) {
                item.src = item.img1600.src;
                item.w = item.img1600.w;
                item.h = item.img1600.h;
            } else if (use1280) {
                item.src = item.img1280.src;
                item.w = item.img1280.w;
                item.h = item.img1280.h;
            } else if (use1024) {
                item.src = item.img1024.src;
                item.w = item.img1024.w;
                item.h = item.img1024.h;
            } else if (use960) {
                item.src = item.img960.src;
                item.w = item.img960.w;
                item.h = item.img960.h;
            } else if (use640) {
                item.src = item.img640.src;
                item.w = item.img640.w;
                item.h = item.img640.h;
            } else if (use320) {
                item.src = item.img320.src;
                item.w = item.img320.w;
                item.h = item.img320.h;
            } else if (use200) {
                item.src = item.img200.src;
                item.w = item.img200.w;
                item.h = item.img200.h;
            }

            // It doesn't really matter what will you do here, 
            // as long as item.src, item.w and item.h have valid values.
            // 
            // Just avoid http requests in this listener, as it fires quite often

        });

        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM('.gallery');
