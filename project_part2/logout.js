document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const logoutBtn = document.getElementById("logoutBtn");
  const welcomeText = document.getElementById("welcome-text");
  const profileLink = document.getElementById("profile-link");

  const currentUser = JSON.parse(localStorage.getItem("currentUser")); // 👈 תיקון כאן

  if (currentUser) {
    if (loginLink) loginLink.style.display = "none";

    if (profileLink) {
      profileLink.style.display = "inline-block";
      profileLink.textContent = "My Profile";
      profileLink.href = "profile.html";
    }

    if (welcomeText) {
      welcomeText.textContent = `Welcome, ${currentUser.firstName}!`;
      welcomeText.style.display = "inline-block";
    }

    if (logoutBtn) {
      logoutBtn.style.display = "inline-block";
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUser"); // 👈
        sessionStorage.removeItem("currentUser"); // 👈
        alert("You have successfully logged out!");
        window.location.href = "home.html";
      });
    }
  } else {
    if (loginLink) loginLink.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (welcomeText) welcomeText.style.display = "none";
    if (profileLink) profileLink.style.display = "none";
  }
});
