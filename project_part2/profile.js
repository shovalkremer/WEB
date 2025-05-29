document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("You are not logged in.");
    window.location.href = "login.html";
    return;
  }

  // Always shown
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
  document.getElementById("fullName").textContent = fullName;
  document.getElementById("email").textContent = user.email || '';
  document.getElementById("username").textContent = user.username || '';
  document.getElementById("phone").textContent = user.phone || '';

  // Only for teachers
  if (user.type === "tutor") {
    document.getElementById("subjects").textContent = (user.subjects || []).join(', ');
    document.getElementById("method").textContent = user.method || '';
    document.getElementById("price").textContent = user.price || '';
    document.getElementById("area").textContent = user.area || '';
    document.getElementById("background").textContent = user.background || '';
    document.getElementById("bio").textContent = user.bio || '';
    document.getElementById("profilePhoto").src = user.photo || "images/default-user.png";
  } else {
    // Hide teacher-only fields for students
    document.querySelector(".profile-img").style.display = "none";
    const teacherOnlyFields = document.querySelectorAll(
      "#subjects, #method, #price, #area, #background, #bio"
    );
    teacherOnlyFields.forEach((el) => {
      el.parentElement.style.display = "none";
    });
  }
});
