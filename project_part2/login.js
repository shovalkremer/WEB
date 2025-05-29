// login.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("error-message");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.getElementById("login-link");

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      const students = JSON.parse(localStorage.getItem("students")) || [];
      const tutors = JSON.parse(localStorage.getItem("tutors")) || [];


      const allUsers = students.concat(tutors);
      const foundUser = allUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        window.location.href = "home.html"; // Redirect to home page
      } else {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Invalid email or password.";
      }
    });
  }

  // Handle logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "home.html";
    });
  }

  // Update header for logged-in user (available globally)
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block";
  }

  const successMsg = sessionStorage.getItem("signupSuccess");
  if (successMsg) {
    alert(successMsg); // או תוכל להציג בתוך אלמנט בעמוד
    sessionStorage.removeItem("signupSuccess");
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // מחיקת נתוני התחברות
      localStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("loggedInUser");

      // הודעה וניתוב
      alert("You have successfully logged out!");
      window.location.href = "login.html";
    });
  }
});