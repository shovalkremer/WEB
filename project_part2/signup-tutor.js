document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tutorSignupForm");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();
    const price = formData.get("price").trim();
    const subjects = formData.getAll("subjects[]");
    const profilePhoto = formData.get("profilePhoto");

    // === Validations ===

    if (!validateEmail(email)) return showError("Invalid email address.");
    if (!validatePhone(phone)) return showError("Invalid phone number.");
    if (username.length < 3) return showError("Username must be at least 3 characters.");
    if (password.length < 6) return showError("Password must be at least 6 characters.");
    if (subjects.length === 0) return showError("Please select at least one subject.");
    if (isNaN(price) || Number(price) <= 0) return showError("Price must be a positive number.");
    if (!profilePhoto || profilePhoto.size === 0) return showError("Please upload a profile photo.");

    let tutors = JSON.parse(localStorage.getItem("tutors")) || [];

    // בדיקה אם מורה עם אותו מייל או טלפון או שם משתמש כבר קיים
    const alreadyExists = tutors.some(tutor =>
      tutor.email === email ||
      tutor.phone === phone ||
      tutor.username === username
    );
    if (alreadyExists) {
      return showError("A tutor with this email, phone or username already exists.");
    }

    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    }


    // יצירת אובייקט מורה
    const newTutor = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email,
      phone,
      username,
      password,
      dob: formData.get("dob"),
      userType: formData.get("userType"),
      subjects,
      profilePhotoName: profilePhoto.name, 
      profilePhotoData: await fileToBase64(profilePhoto),
      background: formData.get("background"),
      bio: formData.get("bio"),
      pricePerHour: Number(price),
      teachingMethod: formData.get("teachingMethod"),
      area: formData.get("area"),
      availability: [] // בעתיד נוכל לאחסן פה גם את הנתונים מה-calendar
    };

    // שמירה
    tutors.push(newTutor);
    localStorage.setItem("tutors", JSON.stringify(tutors));
    

    // שמירת הודעת הצלחה להעברה לעמוד login
    sessionStorage.setItem("signupSuccess", "Registration successful! You can now log in.");

    // מעבר לעמוד login
    window.location.href = "login.html";
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^(\+972|0)?[2-9]\d{7,8}$/;
    return re.test(phone);
  }

  function showError(message) {
    errorMessage.style.display = "block";
    errorMessage.textContent = message;
    successMessage.style.display = "none";
  }
});
