document.getElementById("password").addEventListener("input", function() {
    const password = this.value;
    const strengthIndicator = document.querySelector(".strength-indicator");
    let strength = 0;

    if (password.length >= 8) strength += 1; // Length
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase
    if (/[a-z]/.test(password)) strength += 1; // Lowercase
    if (/[0-9]/.test(password)) strength += 1; // Number
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Special character

    strengthIndicator.style.width = (strength * 20) + "%"; // Update strength indicator width

    // Optional: Change color based on strength
    if (strength === 5) {
        strengthIndicator.style.backgroundColor = "#4CAF50"; // Strong
    } else if (strength >= 3) {
        strengthIndicator.style.backgroundColor = "#FFC107"; // Medium
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll(); // Run once on page load

    // Toggle navigation links visibility
    const burgerMenu = document.getElementById("burger-menu");
    burgerMenu.addEventListener("click", () => {
        const navLinks = document.getElementById("nav-links");
        navLinks.classList.toggle("active");
    });
});

// Get the modal
const modal = document.getElementById("productModal");

// Get all product cards
const products = document.querySelectorAll(".product");

// Get modal content elements
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");

// Get the close button
const closeBtn = document.querySelector(".close");

// Function to open the modal with product details
function openModal(product) {
    modalImage.src = product.querySelector("img").src;
    modalTitle.textContent = product.querySelector("h3").textContent;
    modalDescription.textContent = product.querySelector("p").textContent;
    modalPrice.textContent = product.querySelector(".price").textContent;
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Add click event listeners to product cards
products.forEach((product) => {
    product.addEventListener("click", () => {
        openModal(product);
    });
});

// Close the modal when the close button is clicked
closeBtn.addEventListener("click", closeModal);

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

function copyToClipboard(text, element) {
    // Copy text to clipboard
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Show the styled message
    const copyMessage = document.getElementById('copy-message');
    copyMessage.classList.add('show');
    setTimeout(() => {
        copyMessage.classList.remove('show');
    }, 2000); // Hide the message after 2 seconds

    // Change the color of the clicked element
    element.classList.add('copied');
    setTimeout(() => {
        element.classList.remove('copied');
    }, 1000); // Reset the color after 1 second
}

document.getElementById("password").addEventListener("input", function() {
    const password = this.value;
    const strengthIndicator = document.querySelector(".strength-indicator");
    let strength = 0;

    if (password.length >= 8) strength += 1; // Length
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase
    if (/[a-z]/.test(password)) strength += 1; // Lowercase
    if (/[0-9]/.test(password)) strength += 1; // Number
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Special character

    strengthIndicator.style.width = (strength * 20) + "%"; // Update strength indicator width

    // Optional: Change color based on strength
    if (strength === 5) {
        strengthIndicator.style.backgroundColor = "#4CAF50"; // Strong
    } else if (strength >= 3) {
        strengthIndicator.style.backgroundColor = "#FFC107"; // Medium
    } else {
        strengthIndicator.style.backgroundColor = "#F44336"; // Weak
    }
});

document.getElementById("signupForm").addEventListener("submit", async (e) => {

    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    });
    const data = await response.json();
    if (response.ok) alert("Inscription réussie !");
});

document.getElementById("signinForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('atimart_token', data.token);
        localStorage.setItem('atimart_username', data.username);
        window.location.href = 'index.html';
    } else {
        alert("Échec de la connexion. Vérifiez vos identifiants.");
    }
});

// Update navigation based on auth status
function updateNavAuthStatus() {
    const token = localStorage.getItem('atimart_token');
    const username = localStorage.getItem('atimart_username');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');

    if (token && username) {
        // User is logged in
        if (loginButton) {
            loginButton.textContent = username;
            loginButton.href = '#';
            loginButton.id = 'logout-button';
            loginButton.addEventListener('click', logout);
        }
        if (signupButton) {
            signupButton.style.display = 'none';
        }
    } else {
        // User is not logged in
        if (loginButton) {
            loginButton.textContent = 'Se Connecter';
            loginButton.href = 'signin.html';
            loginButton.id = 'login-button';
        }
        if (signupButton) {
            signupButton.style.display = 'block';
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('atimart_token');
    localStorage.removeItem('atimart_username');
    window.location.href = 'index.html';
}

// Call this function when each page loads
document.addEventListener('DOMContentLoaded', updateNavAuthStatus);
