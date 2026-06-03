// Arsenal Final Project JavaScript
// This file is for interactive features: slider, dark mode, forms, quiz, lightbox, and photo preview.

// Slider data: each object contains the image file and the caption text for one slide.
// Saka portrait and manager portrait are not included here because the Matchday Slider should focus on match action, squad moments, and celebrations.
const slides = [
    { image: 'matchday.webp', text: 'Arsenal matchday celebration' },
    { image: 'team-squad.avif', text: 'Arsenal squad moment' },
    { image: 'arsenal-duel.avif', text: 'Match action and pressure' },
    { image: 'celebration.jpg', text: 'Arsenal celebration moment' },
    { image: 'champions-poster.jpeg', text: 'Premier League champions design' },
    { image: 'arsenal-logo.png', text: 'The Arsenal crest' }
];

// This variable remembers the current slide number. It starts from zero because arrays start from zero in JavaScript.
let slideIndex = 0;

// This function changes the slider image, slider caption, and active dot.
function showSlide(index) {
    // These lines find the slider image, slider caption, and all dots from the HTML page.
    const slideImage = document.getElementById('slide-image');
    const slideText = document.getElementById('slide-text');
    const dots = document.querySelectorAll('.dot');

    // This stops errors on pages that do not have a slider.
    if (!slideImage || !slideText) return;

    // This updates the current slide number.
    slideIndex = index;

    // If the slide goes past the last image, it returns to the first image.
    if (slideIndex >= slides.length) slideIndex = 0;

    // If the slide goes before the first image, it moves to the last image.
    if (slideIndex < 0) slideIndex = slides.length - 1;

    // These lines change the image source, image alt text, and caption text on the page.
    slideImage.src = slides[slideIndex].image;
    slideImage.alt = slides[slideIndex].text;
    slideText.textContent = slides[slideIndex].text;

    // This removes the active style from all dots.
    dots.forEach(dot => dot.classList.remove('active'));

    // This adds the active style to the dot that matches the current slide.
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

// This function moves the slider forward by one image.
function nextSlide() { showSlide(slideIndex + 1); }

// This function moves the slider backward by one image.
function previousSlide() { showSlide(slideIndex - 1); }

// This makes the slider change automatically every 4 seconds.
setInterval(nextSlide, 4000);

// DOMContentLoaded means the JavaScript waits until the HTML page has loaded before running.
document.addEventListener('DOMContentLoaded', function () {
    // This starts the slider from the first image.
    showSlide(0);

    // These variables connect JavaScript to buttons and forms in the HTML.
    const nextButton = document.getElementById('next-slide');
    const prevButton = document.getElementById('prev-slide');
    const themeButton = document.getElementById('theme-button');
    const voteForm = document.getElementById('vote-form');
    const contactForm = document.getElementById('contact-form');
    const predictionForm = document.getElementById('prediction-form');
    const quizButton = document.getElementById('quiz-button');

    // Event listener for the Next button. When clicked, it shows the next slide.
    if (nextButton) nextButton.addEventListener('click', nextSlide);

    // Event listener for the Previous button. When clicked, it shows the previous slide.
    if (prevButton) prevButton.addEventListener('click', previousSlide);

    // Event listeners for slider dots. When a dot is clicked, it opens that slide.
    document.querySelectorAll('.dot').forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            showSlide(index);
        });
    });

    // Dark mode event listener. It adds or removes the dark-mode class on the body.
    if (themeButton) {
        themeButton.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
        });
    }

    // Fan vote form event listener. It prevents page refresh and shows the user's vote on the page.
    if (voteForm) {
        voteForm.addEventListener('submit', function (event) {
            // preventDefault stops the form from refreshing the webpage.
            event.preventDefault();

            // These lines collect the selected player and the written reason.
            const player = document.getElementById('player-choice').value;
            const reason = document.getElementById('vote-reason').value;

            // This writes the vote result into the vote-result div.
            document.getElementById('vote-result').innerHTML =
                '<strong>Your vote:</strong> ' + player + '<br><strong>Reason:</strong> ' + reason;
        });
    }

    // Contact form event listener. It previews the user's message instead of sending it to a server.
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            // This stops the page from reloading after the form is submitted.
            event.preventDefault();

            // These lines collect what the user typed into the form.
            const name = document.getElementById('fan-name').value;
            const email = document.getElementById('fan-email').value;
            const message = document.getElementById('fan-message').value;

            // This displays the message preview on the same page.
            document.getElementById('form-output').innerHTML =
                '<strong>Preview:</strong><br>Name: ' + name + '<br>Email: ' + email + '<br>Message: ' + message;
        });
    }

    // Match prediction form event listener. It displays the predicted score and first scorer.
    if (predictionForm) {
        predictionForm.addEventListener('submit', function (event) {
            // This prevents the form from refreshing the page.
            event.preventDefault();

            // These lines collect the prediction details.
            const score = document.getElementById('score').value;
            const scorer = document.getElementById('scorer').value;

            // This writes the prediction result into the prediction-output div.
            document.getElementById('prediction-output').innerHTML =
                'Your match prediction is <strong>' + score + '</strong>. First scorer: <strong>' + scorer + '</strong>.';
        });
    }

    // These variables connect JavaScript to the hidden lightbox elements in gallery.html.
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('close-lightbox');

    // Lightbox event listener. When a gallery image is clicked, it opens a bigger version of the image.
    document.querySelectorAll('.gallery-img').forEach(function (image) {
        image.addEventListener('click', function () {
            // This prevents errors if the page does not have a lightbox.
            if (!lightbox || !lightboxImg) return;

            // This shows the lightbox and copies the clicked image into it.
            lightbox.style.display = 'flex';
            lightboxImg.src = image.src;
            lightboxImg.alt = image.alt;
        });
    });

    // Close button event listener. When the X is clicked, the lightbox closes.
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function () {
            lightbox.style.display = 'none';
        });
    }

    // Background click event listener. Clicking outside the image also closes the lightbox.
    if (lightbox) {
        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) lightbox.style.display = 'none';
        });
    }

    // These variables connect JavaScript to the file upload input and preview image.
    const fanPhoto = document.getElementById('fan-photo');
    const photoPreview = document.getElementById('photo-preview');

    // Photo preview event listener. When a user selects an image, it appears on the page.
    if (fanPhoto && photoPreview) {
        fanPhoto.addEventListener('change', function () {
            // This gets the first selected image file.
            const file = fanPhoto.files[0];

            // If a file exists, createObjectURL creates a temporary preview link for the image.
            if (file) {
                photoPreview.src = URL.createObjectURL(file);
            }
        });
    }

    // Quiz button event listener. It checks the user's answer and writes feedback on the page.
    if (quizButton) {
        quizButton.addEventListener('click', function () {
            // This gets the answer, changes it to lowercase, and removes extra spaces.
            const answer = document.getElementById('quiz-answer').value.toLowerCase().trim();
            const result = document.getElementById('quiz-result');

            // This checks if the answer is correct.
            if (answer === 'london' || answer === 'north london') {
                result.textContent = 'Correct! Arsenal is based in North London.';
            } else {
                result.textContent = 'Not quite. The answer is North London.';
            }
        });
    }
});
