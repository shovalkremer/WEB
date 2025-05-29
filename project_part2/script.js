// 🍔 Toggle Hamburger Menu
document.addEventListener("DOMContentLoaded", function () {
  // 🍔 Toggle Hamburger Menu
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".main-nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  // ========== Dynamic Logic ==========
  const path = window.location.pathname;
  if (path.includes('signup-tutor.html')) handleTutorSignup();
  else if (path.includes('signup-student.html')) handleStudentSignup();
  else if (path.includes('login.html')) handleLogin();
  else if (path.includes('contact.html')) handleContactForm();
  else if (path.includes('search.html')) renderSearchResults();
  else if (path.includes('teacher-profile.html')) loadTutorProfile();

  setupDynamicNavbar();
  initFakeTutors();



// ========== Navbar Swap ==========
function setupDynamicNavbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const loginLink = document.getElementById("login-link");
  if (user && loginLink) {
    loginLink.textContent = "My Profile";
    loginLink.href = user.role === "tutor" ? "teacher-profile.html" : "profile.html";
  }
}

// ========== Tutor Signup ==========
function handleTutorSignup() {
  initCalendar();
  const form = document.querySelector("form");
  if (!form) return;

  document.addEventListener("DOMContentLoaded", initCalendar);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#tutor-name")?.value.trim();
    const email = form.querySelector("#tutor-email")?.value.trim();
    const password = form.querySelector("#tutor-password")?.value.trim();
    const phone = form.querySelector("#tutor-phone")?.value.trim();
    const subject = form.querySelector("#tutor-subject")?.value.trim();
    const rate = form.querySelector("#tutor-rate")?.value.trim();
    const format = form.querySelector("#tutor-format")?.value.trim();
    const location = form.querySelector("#tutor-location")?.value.trim();
    const availability = JSON.parse(localStorage.getItem("tempAvailability") || "[]");
    const bio = form.querySelector("#tutor-bio")?.value.trim();
    const experience = form.querySelector("#tutor-experience")?.value.trim();

    if (!validateEnglish(name)) return alert("Name must be in English only");
    if (!validateEmail(email)) return alert("Invalid email format");
    if (!validatePhone(phone)) return alert("Phone must start with 0 and have 10 digits total");
    if (!validatePositiveNumber(rate)) return alert("Hourly rate must be a positive number");
    if (!password || !subject || !format || !location || !bio || !experience) {
      return alert("Please fill in all fields");
    }

    const tutors = JSON.parse(localStorage.getItem("tutors") || "[]");
    if (tutors.some(t => t.email === email)) return alert("Tutor already registered");

    const tutor = {
      name, email, password, phone, subject, rate,
      format, location, availability, bio, experience,
      role: "tutor",
      reviews: generateFakeReviews()
    };

    tutors.push(tutor);
    localStorage.setItem("tutors", JSON.stringify(tutors));
    localStorage.removeItem("tempAvailability");
    alert("Tutor registered successfully!");
    window.location.href = "login.html";
  });
}

function initCalendar() {
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl) return;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    selectable: true,
    height: 500,
    slotMinTime: "09:00:00",
    slotMaxTime: "21:00:00",
    allDaySlot: false,
    headerToolbar: false,
    nowIndicator: true,
    events: [],
    dateClick: function(info) {
      const start = info.date;
      const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 hour
      const event = {
        start: start.toISOString(),
        end: end.toISOString(),
        allDay: false
      };
      calendar.addEvent(event);

      const list = JSON.parse(localStorage.getItem("tempAvailability") || "[]");
      list.push({ start: event.start, end: event.end });
      localStorage.setItem("tempAvailability", JSON.stringify(list));
    },
    eventDidMount: function(info) {
      info.el.title = '';
      info.el.addEventListener('dblclick', () => {
        info.event.remove();
        const list = JSON.parse(localStorage.getItem("tempAvailability") || "[]");
        const filtered = list.filter(e => e.start !== info.event.start.toISOString());
        localStorage.setItem("tempAvailability", JSON.stringify(filtered));
      });
    }
  });

  calendar.render();

  const resetButton = document.getElementById("resetButton");
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      calendar.getEvents().forEach(e => e.remove());
      localStorage.removeItem("tempAvailability");
    });
  }
}

// ========== Utility & Validation ==========
function validateEmail(email) {
  return /^[\w.-]+@[\w.-]+\.\w+$/.test(email);
}

function validatePhone(phone) {
  return /^0\d{9}$/.test(phone);
}

function validatePositiveNumber(n) {
  return /^\d+(\.\d+)?$/.test(n) && parseFloat(n) > 0;
}

function validateEnglish(text) {
  return /^[a-zA-Z\s]+$/.test(text);
}

function generateFakeReviews() {
  const templates = [
    { name: "Daniel", stars: 5, comment: "Excellent and clear explanations!" },
    { name: "Maya", stars: 4, comment: "Very friendly and helpful." },
    { name: "Lior", stars: 5, comment: "Patient and knowledgeable tutor." }
  ];
  const date = new Date().toISOString().split("T")[0];
  return [templates[Math.floor(Math.random()*3)], templates[Math.floor(Math.random()*3)]].map(r => ({...r, date}));
}

function calcAvgStars(reviews = []) {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.stars, 0);
  return Math.round(sum / reviews.length);
}

// ========== Fake Tutors ==========
function initFakeTutors() {
  if (localStorage.getItem("tutors")) return;
  const fake = [{
    name: "Noa Levi",
    email: "noa@example.com",
    password: "1234",
    phone: "0521234567",
    subject: "Math",
    rate: 90,
    format: "Online",
    location: "Tel Aviv",
    availability: [],
    bio: "Experienced tutor with a passion for math.",
    experience: "5 years tutoring high school students",
    role: "tutor",
    reviews: generateFakeReviews()
  }];
  localStorage.setItem("tutors", JSON.stringify(fake));
}
});