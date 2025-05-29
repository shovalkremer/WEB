document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("resultsContainer");
  const resultsSection = document.getElementById("resultsSection");
  const noResultsMessage = document.getElementById("noResultsMessage");
  const form = document.getElementById("searchForm");

  const getTutorsFromStorage = () => {
    const tutors = JSON.parse(localStorage.getItem("tutors")) || [];
    return tutors;
  };


  const createTutorCard = (tutor) => {
    const card = document.createElement("div");
    card.className = "tutor-card";

    card.innerHTML = `
      <img src="${tutor.profilePhotoData || 'images/default.png'}"
      <h3>${tutor.firstName} ${tutor.lastName}</h3>
      <p><strong>Subjects:</strong> ${tutor.subjects.join(', ')}</p>
      <p><strong>Location:</strong> ${tutor.area}</p>
      <p><strong>Method:</strong> ${tutor.teachingMethod}</p>
      <p><strong>Price:</strong> ₪${tutor.pricePerHour || "indefinite"}</p>
      <p><strong>Bio:</strong> ${tutor.bio}</p>
      <button onclick="location.href='teacher-profile.html?username=${tutor.username}'">View Profile</button>
    `;
    return card;
  };

  const displayTutors = (tutors) => {
    resultsContainer.innerHTML = "";
    if (tutors.length === 0) {
      noResultsMessage.style.display = "block";
      resultsSection.style.display = "block";
      return;
    }
    noResultsMessage.style.display = "none";
    resultsSection.style.display = "block";

    tutors.forEach(tutor => {
      const card = createTutorCard(tutor);
      resultsContainer.appendChild(card);
    });
  };

  const filterTutors = (filters) => {
    let tutors = getTutorsFromStorage();

    if (filters.subject) {
      const subjectLower = filters.subject.toLowerCase();
      tutors = tutors.filter(t => 
        t.subjects.some(s => s.toLowerCase() === subjectLower)
      );
    }

    if (filters.location) {
      tutors = tutors.filter(t => t.area.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.price) {
      tutors = tutors.filter(t => Number(t.rates) <= Number(filters.price));
    }
    
    if (filters.lessonType) {
      tutors = tutors.filter(t => t.teachingMethod === filters.lessonType);
    }

    displayTutors(tutors);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const filters = {
      subject: document.getElementById("subject").value,
      location: document.getElementById("location").value,
      price: document.getElementById("price").value,
      lessonType: document.getElementById("lessonType").value
    };
    filterTutors(filters);
  });

  // הצגת כל המורים כברירת מחדל
  const allTutors = getTutorsFromStorage();
  displayTutors(allTutors);
});
