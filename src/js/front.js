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
            resultText = `Oferujemy projekt domu jednorodzinnego o metrażu ${area}<sup>2</sup> z ogrodem i tarasem`;
        } else if (garden && !terrace) {
            resultText = `Oferujemy projekt domu jednorodzinnego o metrażu ${area}<sup>2</sup> z ogrodem`;
        } else if (terrace) {
            resultText = `Oferujemy projekt domu jednorodzinnego o metrażu ${area}<sup>2</sup> z tarasem`;
        } else {
            resultText = `Oferujemy projekt domu jednorodzinnego o metrażu ${area}<sup>2</sup>`;
        }
        if (garage === '1') {
            resultText += `, garażem`
        } else if (garage === '2') {
            resultText += ', 2 garażami'
        }
        if (project === 'project2') {
            resultText += ` i projektem instalacji` 
        } else if (project === 'project3') {
            resultText += ` i projektem instalacji, i wnętrz`
        }

        if (build) {
            resultText += ` z wyceną budowy`
        }
        
        resultText += ` od ${price/5}£.`;
    } else {
        if (garden && terrace) {
            resultText = `Oferujemy projekt domu jednorodzinnego o metrażu ${area}<sup>2</sup> z ogrodem i tarasem`;
        } else if (garden && !terrace) {
            resultText = `Oferujemy projekt domu jednorodzinnego o metrażu ${area}<sup>2</sup> z ogrodem`;
        } else if (terrace) {
            resultText = `Oferujemy projekt domu jednorodzinnego o metrażu ${area}<sup>2</sup> z tarasem`;
        } else {
            resultText = `Oferujemy projekt domu jednorodzinnego o metrażu ${area}<sup>2</sup>`;
        }
        if (garage === '1') {
            resultText += `, garażem`
        } else if (garage === '2') {
            resultText += ', 2 garażami'
        }
        if (project === 'project2') {
            resultText += ` i projektem instalacji` 
        } else if (project === 'project3') {
            resultText += ` i projektem instalacji, i wnętrz`
        }

        if (build) {
            resultText += ` z wyceną budowy`
        }
        
        resultText += ` od ${price}zł.`;
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

var pswpElement = document.querySelectorAll('.pswp')[0];

var items = [
    {
        src: 'https://placekitten.com/600/400',
        w: 600,
        h: 400
    },
    {
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
    }
];

var options = {
    index: 0
};

var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
gallery.init();
