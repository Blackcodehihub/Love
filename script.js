// Starry Background
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random(),
            speed: Math.random() * 0.02 + 0.01
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) {
            star.speed = -star.speed;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
});

resizeCanvas();
createStars();
animateStars();

// Toggle navigation menu on mobile
function toggleNav() {
    const navButtons = document.querySelector('.nav-buttons');
    const hamburger = document.querySelector('.hamburger');
    navButtons.classList.toggle('active');
    // Change hamburger icon to 'X' when menu is open, and back to '☰' when closed
    hamburger.textContent = navButtons.classList.contains('active') ? '✖' : '☰';
}

// Function to show/hide sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close the navigation menu on mobile after selecting a section
    if (window.innerWidth <= 768) {
        const navButtons = document.querySelector('.nav-buttons');
        const hamburger = document.querySelector('.hamburger');
        navButtons.classList.remove('active');
        hamburger.textContent = '☰'; // Reset hamburger icon
    }

    // Trigger typing animation when showing the homepage
    if (sectionId === 'homepage') {
        startTypingAnimation();
    }
}

// Scroll to section
function scrollToSection(sectionId) {
    showSection(sectionId);
}

// Typing Animation for Homepage
function typeText(element, text, speed, callback) {
    let i = 0;
    element.textContent = ''; // Clear the element
    element.style.display = 'block'; // Ensure the element is visible
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function startTypingAnimation() {
    const subheading = document.getElementById('subheading-text');
    const heading = document.getElementById('heading-text');
    const tagline = document.getElementById('tagline-text');
    const bottomHeading = document.getElementById('bottom-heading-text');
    const bottomText = document.getElementById('bottom-text-content');

    // Original text content from data-text attributes
    const subheadingText = subheading.getAttribute('data-text');
    const headingText = heading.getAttribute('data-text');
    const taglineText = tagline.getAttribute('data-text');
    const bottomHeadingText = bottomHeading.getAttribute('data-text');
    const bottomTextContent = bottomText.getAttribute('data-text');

    // Sequentially type each element
    typeText(subheading, subheadingText, 50, () => {
        // Handle the heading with the span for "Stellar Innovations"
        const headingParts = headingText.split('Stellar Innovations');
        heading.innerHTML = ''; // Clear the heading
        typeText(heading, headingParts[0], 50, () => {
            const span = document.createElement('span');
            heading.appendChild(span);
            typeText(span, 'Stellar Innovations', 50, () => {
                if (headingParts[1]) {
                    const remainingText = document.createTextNode(headingParts[1]);
                    heading.appendChild(remainingText);
                }
                typeText(tagline, taglineText, 30, () => {
                    typeText(bottomHeading, bottomHeadingText, 50, () => {
                        typeText(bottomText, bottomTextContent, 30);
                    });
                });
            });
        });
    });
}

// Function to show/hide function boxes in portfolio
function showFunction() {
    const selectedFunction = document.getElementById('functionSelect').value;
    const functionBoxes = document.querySelectorAll('.function-box');
    functionBoxes.forEach(box => {
        box.classList.add('hidden');
    });
    if (selectedFunction) {
        document.getElementById(selectedFunction).classList.remove('hidden');
    }
}

// 1. Temperature Converter
function convertTemperature() {
    const tempInput = parseFloat(document.getElementById('tempInput').value);
    const unit = document.getElementById('tempUnit').value;
    const result = document.getElementById('tempResult');

    if (isNaN(tempInput)) {
        result.textContent = 'Please enter a valid number.';
        return;
    }

    let convertedTemp;
    if (unit === 'celsius') {
        convertedTemp = (tempInput * 9/5) + 32;
        result.textContent = `${tempInput}°C = ${convertedTemp.toFixed(2)}°F`;
    } else {
        convertedTemp = (tempInput - 32) * 5/9;
        result.textContent = `${tempInput}°F = ${convertedTemp.toFixed(2)}°C`;
    }
}

// 2. The Longer Word
function findLongerWord() {
    const word1 = document.getElementById('word1').value.trim();
    const word2 = document.getElementById('word2').value.trim();
    const result = document.getElementById('wordResult');

    if (!word1 || !word2) {
        result.textContent = 'Please enter both words.';
        return;
    }

    if (word1.length > word2.length) {
        result.textContent = `"${word1}" is longer than "${word2}".`;
    } else if (word2.length > word1.length) {
        result.textContent = `"${word2}" is longer than "${word1}".`;
    } else {
        result.textContent = `"${word1}" and "${word2}" are of the same length.`;
    }
}

// 3. Know My Birthstone
function findBirthstone() {
    const month = parseInt(document.getElementById('birthMonth').value);
    const result = document.getElementById('birthstoneResult');

    if (!month) {
        result.textContent = 'Please select a month.';
        return;
    }

    const birthstones = {
        1: 'Garnet',
        2: 'Amethyst',
        3: 'Aquamarine',
        4: 'Diamond',
        5: 'Emerald',
        6: 'Pearl',
        7: 'Ruby',
        8: 'Peridot',
        9: 'Sapphire',
        10: 'Opal',
        11: 'Topaz',
        12: 'Turquoise'
    };

    result.textContent = `Your birthstone is ${birthstones[month]}.`;
}

// 4. Basic Operators
function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operator = document.getElementById('operator').value;
    const result = document.getElementById('operatorResult');

    if (isNaN(num1) || isNaN(num2)) {
        result.textContent = 'Please enter valid numbers.';
        return;
    }

    let calcResult;
    switch (operator) {
        case 'add':
            calcResult = num1 + num2;
            result.textContent = `${num1} + ${num2} = ${calcResult}`;
            break;
        case 'subtract':
            calcResult = num1 - num2;
            result.textContent = `${num1} - ${num2} = ${calcResult}`;
            break;
        case 'multiply':
            calcResult = num1 * num2;
            result.textContent = `${num1} × ${num2} = ${calcResult}`;
            break;
        case 'divide':
            if (num2 === 0) {
                result.textContent = 'Cannot divide by zero.';
                return;
            }
            calcResult = num1 / num2;
            result.textContent = `${num1} ÷ ${num2} = ${calcResult.toFixed(2)}`;
            break;
    }
}

// 5. Compute for Acceleration
function computeAcceleration() {
    const force = parseFloat(document.getElementById('force').value);
    const mass = parseFloat(document.getElementById('mass').value);
    const result = document.getElementById('accelerationResult');

    if (isNaN(force) || isNaN(mass)) {
        result.textContent = 'Please enter valid numbers.';
        return;
    }

    if (mass === 0) {
        result.textContent = 'Mass cannot be zero.';
        return;
    }

    const acceleration = force / mass;
    result.textContent = `Acceleration: ${acceleration.toFixed(2)} m/s²`;
}

// Heart toggle function for favorites gallery
function toggleHeart(heart) {
    heart.classList.toggle('filled');
    heart.textContent = heart.classList.contains('filled') ? '♥' : '♡';
}

// Submit comment function
function submitComment(button) {
    const textarea = button.previousElementSibling;
    const commentText = textarea.value.trim();
    if (commentText) {
        const commentList = button.nextElementSibling;
        const li = document.createElement('li');
        li.textContent = commentText;
        commentList.appendChild(li);
        textarea.value = '';
    }
}

// Submit comment on Enter key
function submitOnEnter(event, textarea) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        const submitButton = textarea.nextElementSibling;
        submitComment(submitButton);
    }
}

// Carousel functionality with 3D effect
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-image');

// Initialize the first slide as active
slides[currentSlide].classList.add('active');

function showNextSlide() {
    // Remove the active class from the current slide
    slides[currentSlide].classList.remove('active');

    // Move to the next slide
    currentSlide = (currentSlide + 1) % slides.length;

    // Add the active class to the new slide
    slides[currentSlide].classList.add('active');
}

// Set interval for automatic sliding
setInterval(showNextSlide, 4000);

// Initialize homepage as visible
document.addEventListener('DOMContentLoaded', () => {
    showSection('homepage');
});