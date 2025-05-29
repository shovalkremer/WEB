// Main event handler that runs after the page fully loads
document.addEventListener("DOMContentLoaded", () => {
  // ---------- FORM VALIDATION ----------

  const form = document.querySelector("form");
  if (form) {
    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default form submission

        const email = form.querySelector("#email").value.trim();
        const phone = form.querySelector("#phone").value.trim();
        const dob = form.querySelector("#dob").value.trim();

        // Email validation
        if (!validateEmail(email)) {
          alert("Invalid email!");
          return;
        }

        // Phone number validation
        if (!validatePhone(phone)) {
          alert("Invalid phone number! Make sure it starts with 0 and has 10 digits.");
          return;
        }

        // Date of birth validation (age must be >= 18)
        if (!validateDOB(dob)) {
          alert("Invalid date of birth! You must be at least 18 years old.");
          return;
        }

        alert("Form submitted successfully!");
        // You can add server submission logic here
      });
    }
  }

  // ---------- LOGIN/LOGOUT UI HANDLING ----------
  const loginLink = document.getElementById("login-link");
  const logoutBtn = document.getElementById("logoutBtn");
  const welcomeText = document.getElementById("welcome-text");
  const profileLink = document.getElementById("profile-link");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    // User is logged in
    if (loginLink) loginLink.style.display = "none";

    if (profileLink) {
      profileLink.style.display = "inline-block";
      profileLink.textContent = "My Profile";
      profileLink.href = "profile.html";
    }

    if (logoutBtn) {
      logoutBtn.style.display = "inline-block";
      logoutBtn.textContent = "Logout";

      // Optional styling function
      if (typeof styleLogoutButton === "function") {
        styleLogoutButton(logoutBtn);
      }

      // Make sure the click event is attached only once
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // Clear login data
        localStorage.removeItem("loggedInUser");
        sessionStorage.removeItem("loggedInUser");

        alert("You have been logged out successfully!");

        // Redirect to homepage (or login page)
        window.location.href = "home.html"; // <-- Replace with your homepage path
      });
    }

    if (welcomeText) {
      welcomeText.textContent = `Welcome, ${loggedInUser.name}!`;
      welcomeText.style.display = "inline-block";
    }
  } else {
    // User is NOT logged in
    if (loginLink) loginLink.style.display = "inline-block";
    if (profileLink) profileLink.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (welcomeText) welcomeText.style.display = "none";
  }
});
