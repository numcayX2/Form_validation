document.addEventListener("DOMContentLoaded", (event) => {
  gsap.from("#title", {
    y: 10,
    opacity: 0,
    duration: 0.5,
  });

  gsap.from("#subtitle", {
    y: 20,
    opacity: 0,
    duration: 0.5,
    delay: 0.2,
  });

  gsap.to("#btn-part", {
    opacity: 1,
    duration: 1,
    delay: 0.5,
  });
});

function callform() {
  gsap.to("#bookingForm", {
    top: 0,
    ease: "power2.out(1.4)",
  });
}

function closeForm() {
  gsap.to("#bookingForm", {
    top: "100vh",
    ease: "power2.out(1.4)",
  });
}

function validateForm(event) {
  event.preventDefault();
  let isValid = true;

  // Get form fields
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const age = document.getElementById("age").value.trim();
  const zone = document.getElementById("zone").value;

  // Error elements
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const ageError = document.getElementById("ageError");
  const zoneError = document.getElementById("zoneError");

  // Reset errors
  [nameError, emailError, phoneError, ageError, zoneError].forEach((err) =>
    err.classList.add("hidden")
  );

  // Name validation
  if (name === "") {
    nameError.classList.remove("hidden");
    isValid = false;
  }

  // Email validation (simple pattern)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.classList.remove("hidden");
    isValid = false;
  }

  // Phone validation (9–10 digits)
  if (!/^\d{9,10}$/.test(phone)) {
    phoneError.classList.remove("hidden");
    isValid = false;
  }

  // Age validation (10–100)
  const ageNum = parseInt(age, 10);
  if (isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
    ageError.classList.remove("hidden");
    isValid = false;
  }

  // Zone selection
  if (zone === "") {
    zoneError.classList.remove("hidden");
    isValid = false;
  }

  // Submit if valid
  if (isValid) {
    document.getElementById("bookingForm").submit();
  }
}
