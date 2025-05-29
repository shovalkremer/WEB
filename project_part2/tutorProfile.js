document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");

  if (!username) {
    document.querySelector(".tutor-profile").innerHTML = "<h2>Teacher not found</h2>";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tutors = JSON.parse(localStorage.getItem("tutors")) || [];

  const tutor = tutors.find(t => t.username === username) || users.find(u => u.username === username);

  if (!tutor) {
    document.querySelector(".tutor-profile").innerHTML = "<h2>Teacher does not exist in the system./h2>";
    return;
  }

  // עדכון פרטי מורה בעמוד
  document.getElementById("tutorImage").src = tutor.profilePhotoData || "images/default.png";
  document.getElementById("tutorName").textContent = `${tutor.firstName} ${tutor.lastName}`;
  document.getElementById("tutorSubject").textContent = tutor.subjects?.join(", ") || "Not specified";
  document.getElementById("tutorRate").textContent = tutor.pricePerHour || "Not specified";
  document.getElementById("tutorFormat").textContent = tutor.teachingMethod || "Not specified";
  document.getElementById("tutorLocation").textContent = tutor.area || "Not specified";
  document.getElementById("tutorBio").textContent = tutor.bio || "Not specified";
  document.getElementById("tutorExperience").textContent = tutor.background || "Not specified";
  document.getElementById("tutorAvailability").textContent = tutor.availability || "Not specified";
  document.getElementById("tutorPhone").textContent = tutor.phone;

  // הצגת שיעורים פנויים (אם קיימים)
  const lessonSlotsDiv = document.getElementById("lessonSlots");
  if (tutor.lessonSlots && Array.isArray(tutor.lessonSlots)) {
    tutor.lessonSlots.forEach(slot => {
      const slotDiv = document.createElement("div");
      slotDiv.className = "lesson-slot";
      slotDiv.innerHTML = `
        <span class="slot-date">${slot.date}</span>
        <span class="slot-type">${slot.type}</span>
        <span class="slot-price">₪${slot.price}</span>
        <button class="book-btn">Book Lesson</button>
      `;
      lessonSlotsDiv.appendChild(slotDiv);
    });
  } else {
    lessonSlotsDiv.innerHTML = "<p>No lessons available</p>";
  }

  // הצגת ביקורות (אם קיימות)
  const reviewsDiv = document.getElementById("tutorReviews");
  if (tutor.reviews && Array.isArray(tutor.reviews)) {
    tutor.reviews.forEach(review => {
      const reviewDiv = document.createElement("div");
      reviewDiv.className = "review";
      reviewDiv.innerHTML = `
        <div class="review-header">
          <span class="review-stars">${review.stars || "★★★★★"}</span>
          <span class="review-name">${review.name}, ${review.date}</span>
        </div>
        <p>"${review.text}"</p>
      `;
      reviewsDiv.appendChild(reviewDiv);
    });
  } else {
    reviewsDiv.innerHTML = "<p>No reviews yet</p>";
  }
});
