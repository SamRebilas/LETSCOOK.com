const dragSection = document.querySelector('.drag-section');
const dragIcon = document.querySelector('.drag-icon');

let isDragging = false;
let startX;
let scrollLeft;

dragSection.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragSection.classList.add('active');
    startX = e.pageX - dragSection.offsetLeft;
    scrollLeft = dragSection.scrollLeft;
    dragIcon.style.display = 'block';
    dragIcon.style.left = `${e.pageX}px`;
    dragIcon.style.top = `${e.pageY}px`;
});

dragSection.addEventListener('mouseleave', () => {
    isDragging = false;
    dragSection.classList.remove('active');
    dragIcon.style.display = 'none';
});

dragSection.addEventListener('mouseup', () => {
    isDragging = false;
    dragSection.classList.remove('active');
    dragIcon.style.display = 'none';
});

dragSection.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - dragSection.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    dragSection.scrollLeft = scrollLeft - walk;
    dragIcon.style.left = `${e.pageX}px`;
    dragIcon.style.top = `${e.pageY}px`;
});

document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    const blendSection = document.querySelector('.background-blend-section');
    const changingText = document.querySelector('.color-changing-text');
    const paragraphText = document.querySelector('.background-blend-section p');

    // Define your color stops
    const colorStops = [
        { position: 100, backgroundColor: '#ffffff', textColor: '#000000' },
        { position: 600, backgroundColor: '#cfe2f3', textColor: '#333333' },
        { position: 1000, backgroundColor: '#cfe2f3', textColor: '#999999' },
		{ position: 3500, backgroundColor: '#FF9302', textColor: '#16537e' },
      { position: 4000, backgroundColor: '#f46136', textColor: '#16537e' },
    ];

    // Find the appropriate color based on scroll position
    for (let i = 0; i < colorStops.length - 1; i++) {
        if (scrollPosition >= colorStops[i].position && scrollPosition < colorStops[i + 1].position) {
            const start = colorStops[i];
            const end = colorStops[i + 1];
            const range = end.position - start.position;
            const progress = (scrollPosition - start.position) / range;

            // Interpolate colors
            const interpolateColor = (startColor, endColor) => {
                const startRGB = parseInt(startColor.slice(1), 16);
                const endRGB = parseInt(endColor.slice(1), 16);
                const startR = (startRGB >> 16) & 0xff;
                const startG = (startRGB >> 8) & 0xff;
                const startB = startRGB & 0xff;
                const endR = (endRGB >> 16) & 0xff;
                const endG = (endRGB >> 8) & 0xff;
                const endB = endRGB & 0xff;

                const r = Math.round(startR + (endR - startR) * progress).toString(16).padStart(2, '0');
                const g = Math.round(startG + (endG - startG) * progress).toString(16).padStart(2, '0');
                const b = Math.round(startB + (endB - startB) * progress).toString(16).padStart(2, '0');

                return `#${r}${g}${b}`;
            };

            const backgroundColor = interpolateColor(start.backgroundColor, end.backgroundColor);
            const textColor = interpolateColor(start.textColor, end.textColor);

            blendSection.style.backgroundColor = backgroundColor;
            changingText.style.color = textColor;
            paragraphText.style.color = textColor;
            break;
        }
    }
});
//rotate image 
document.addEventListener("DOMContentLoaded", function() {
    const imgContainers = document.querySelectorAll('.individual-img-text-container');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.35
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once the element is in view
            }
        });
    }, observerOptions);

    imgContainers.forEach(container => {
        observer.observe(container);
    });
});
//lazy load
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('img.lazy');

    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    };

    const observer = new IntersectionObserver(lazyLoad, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    lazyImages.forEach(img => {
        observer.observe(img);
    });

    // Existing IntersectionObserver for the image rotation
    const imgContainers = document.querySelectorAll('.individual-img-text-container');

    const containerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });

    imgContainers.forEach(container => {
        containerObserver.observe(container);
    });
});
//color changing background section text slide 
document.addEventListener("DOMContentLoaded", function() {
    const target = document.querySelector('.changing-background-container');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.51
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once the element is in view
            }
        });
    }, observerOptions);

    observer.observe(target);
});