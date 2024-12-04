// Mock credentials
const validUsername = "admin";
const validPassword = "admin";

// Login function
function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorElement = document.getElementById("loginError");

    if (username === validUsername && password === validPassword) {
        localStorage.setItem("loggedIn", "true"); // Store login state
        window.location.href = "tipCalculator.html"; // Redirect to Tip Calculator
    } else {
        errorElement.style.display = "block"; // Show error message
    }
}

// Redirect to the Tip Calculator if already logged in
if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "index.html";
}
