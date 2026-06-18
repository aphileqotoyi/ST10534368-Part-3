const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;
let carouselInterval;

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove("active");
    });
    slides[index].classList.add("active");
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlide(currentSlide);
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetCarouselTimer();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetCarouselTimer();
    });
}


function startCarouselTimer() {
    carouselInterval = setInterval(nextSlide, 4000);
}

function resetCarouselTimer() {
    clearInterval(carouselInterval);
    startCarouselTimer();
}

startCarouselTimer();



function searchPage() {
    let input = document.getElementById("searchBox").value.trim();

    removeHighlights(document.body);

    if (input === "") {
        alert("Please enter a valid search term.");
        return;
    }

    let pattern = new RegExp(input, "gi");
    let matchesFound = highlightTextNodes(document.body, pattern);

    if (matchesFound > 0) {
        const firstMatch = document.querySelector(".search-highlight");
        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    } else {
        alert("'" + input + "' was not found on this page.");
    }
}

function highlightTextNodes(element, pattern) {
    let count = 0;
    if (element.nodeType === 3) {
        if (element.nodeValue.match(pattern)) {
            let span = document.createElement("span");
            span.innerHTML = element.nodeValue.replace(pattern, match => `<mark class="search-highlight">${match}</mark>`);
            element.parentNode.replaceChild(span, element);
            count++;
        }
    } else if (element.nodeType === 1 && element.childNodes && !/(script|style|header|footer|nav)/i.test(element.tagName)) {
        for (let i = 0; i < element.childNodes.length; i++) {
            count += highlightTextNodes(element.childNodes[i], pattern);
        }
    }
    return count;
}

function removeHighlights(element) {
    const highlights = element.querySelectorAll("mark.search-highlight");
    highlights.forEach(highlight => {
        const textNode = document.createTextNode(highlight.textContent);
        const parentSpan = highlight.parentNode;
        parentSpan.parentNode.replaceChild(textNode, parentSpan);
    });
}

const lightbox = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImg");
const captionText = document.getElementById("lightboxCaption");
const closeBtn = document.querySelector(".lightbox-close");
const imageTriggers = document.querySelectorAll(".lightbox-trigger");

imageTriggers.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
        captionText.innerHTML = img.alt;
    });
});

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
}

 
window.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});
