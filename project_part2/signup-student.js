document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentSignupForm");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // איסוף נתונים
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const dob = document.getElementById("dob").value;

    const subjectElements = document.querySelectorAll("input[name='subjects[]']:checked");
    const subjects = Array.from(subjectElements).map(el => el.value);

    // ניקוי הודעות קודמות
    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    // ולידציה בסיסית
    if (!firstName || !lastName || !email || !phone || !username || !password) {
      errorMessage.textContent = "Please fill in all required fields.";
      errorMessage.style.display = "block";
      return;
    }

    if (!/^\d{10}$/.test(phone) || phone[0] !== "0") {
      errorMessage.textContent = "Phone number must be 10 digits and start with 0.";
      errorMessage.style.display = "block";
      return;
    }

    // קריאת רשימת הסטודנטים מה־localStorage (אם יש)
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // בדיקת כפילויות לפי מייל או טלפון
    const duplicate = students.find(s => s.email === email || s.phone === phone);
    if (duplicate) {
      errorMessage.textContent = "User with this email or phone already exists.";
      errorMessage.style.display = "block";
      return;
    }

    // יצירת משתמש חדש
    const newStudent = {
      firstName,
      lastName,
      email,
      phone,
      username,
      password,
      dob,
      subjects,
      userType: "student"
    };

    // הוספה לרשימת המשתמשים ושמירה
    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));

    // הצגת הודעת הצלחה, ניקוי טופס
    successMessage.textContent = "You have successfully registered! 🎉";
    successMessage.style.display = "block";
    form.reset();

    window.location.href = "login.html";

    // או: שינוי כל העמוד להצגת הודעת הצלחה
    // document.body.innerHTML = "<h1>Thank you for registering!</h1>";
  });
});


