const form = document.getElementById("bmiForm");
const age = document.getElementById("age");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hasDisease = document.getElementById("hasDisease");
const diseaseDetailsContainer = document.getElementById(
  "diseaseDetailsContainer"
);
const diseaseDetails = document.getElementById("diseaseDetails");
const submitBtn = document.getElementById("submitBtn");
const submitText = document.getElementById("submitText");
const loadingSpinner = document.getElementById("loadingSpinner");

// Show/hide disease details
hasDisease.addEventListener("change", function () {
  if (this.checked) {
    diseaseDetailsContainer.classList.remove("hidden");
    gsap.fromTo(
      diseaseDetailsContainer,
      { opacity: 0, height: 0 },
      { opacity: 1, height: "auto", duration: 0.3 }
    );
  } else {
    gsap.to(diseaseDetailsContainer, {
      opacity: 0,
      height: 0,
      duration: 0.3,
      onComplete: () => {
        diseaseDetailsContainer.classList.add("hidden");
        hideError("diseaseError");
      },
    });
    diseaseDetails.value = "";
  }
});

function showError(errorId, message) {
  const errorElement = document.getElementById(errorId);
  const inputElement = errorElement
    .closest(".input-group")
    .querySelector(".custom-input");

  if (inputElement) {
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
    gsap.to(inputElement, {
      x: -5,
      duration: 0.1,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut",
    });
  }

  errorElement.textContent = message;
  errorElement.classList.add("show");
}

function hideError(errorId) {
  const errorElement = document.getElementById(errorId);
  const inputElement = errorElement
    .closest(".input-group")
    .querySelector(".custom-input");

  if (inputElement) {
    inputElement.classList.remove("error");
    inputElement.classList.add("success");
    const successIcon = inputElement.parentNode.querySelector(".success-icon");
    if (successIcon) {
      successIcon.classList.add("show");
    }
  }

  errorElement.classList.remove("show");
  errorElement.textContent = "";
}

// Form validation checking
function validateForm() {
  let isValid = true;

  // Age validation
  const ageValue = parseInt(age.value);
  if (!age.value || ageValue < 5 || ageValue > 100) {
    showError("ageError", "อายุต้องอยู่ระหว่าง 5 ถึง 100 ปี");
    isValid = false;
  } else {
    hideError("ageError");
  }

  // Gender validation
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    showError("genderError", "กรุณาเลือกเพศ");
    isValid = false;
  } else {
    hideError("genderError");
  }

  // Weight validation
  const weightValue = parseFloat(weight.value);
  if (!weight.value || weightValue <= 0 || weightValue > 500) {
    showError("weightError", "น้ำหนักต้องอยู่ระหว่าง 1-500 กิโลกรัม");
    isValid = false;
  } else {
    hideError("weightError");
  }

  // Height validation
  const heightValue = parseFloat(height.value);
  if (!height.value || heightValue <= 50 || heightValue > 250) {
    showError("heightError", "ส่วนสูงต้องอยู่ระหว่าง 50-250 เซนติเมตร");
    isValid = false;
  } else {
    hideError("heightError");
  }

  // Disease details validation
  if (hasDisease.checked && !diseaseDetails.value.trim()) {
    showError("diseaseError", "กรุณากรอกรายละเอียดโรคประจำตัว");
    isValid = false;
  } else {
    hideError("diseaseError");
  }

  return isValid;
}

// BMI calculation
function calculateBMI() {
  const weightValue = parseFloat(weight.value);
  const heightValue = parseFloat(height.value) / 100; // Convert cm to m
  const bmi = weightValue / (heightValue * heightValue);

  let category, details, iconClass;
  if (bmi < 18.5) {
    category = "น้ำหนักต่ำกว่าเกณฑ์";
    details = "คุณควรเพิ่มน้ำหนักให้อยู่ในเกณฑ์ปกติ";
    iconClass = "from-yellow-500 to-orange-500";
  } else if (bmi < 25) {
    category = "น้ำหนักปกติ";
    details = "คุณมีน้ำหนักที่เหมาะสม ควรรักษาระดับนี้ไว้";
    iconClass = "from-green-500 to-emerald-600";
  } else if (bmi < 30) {
    category = "น้ำหนักเกิน";
    details = "คุณควรควบคุมน้ำหนักและออกกำลังกาย";
    iconClass = "from-orange-500 to-red-500";
  } else {
    category = "อ้วน";
    details = "คุณควรปรึกษาแพทย์เพื่อควบคุมน้ำหนัก";
    iconClass = "from-red-500 to-red-700";
  }

  // Show modal
  const modal = document.getElementById("resultModal");
  const modalIcon = document.getElementById("modalIcon");

  modalIcon.className = `inline-block p-4 bg-gradient-to-r ${iconClass} rounded-full mb-4`;

  document.getElementById("bmiResult").textContent = bmi.toFixed(1);
  document.getElementById("bmiCategory").textContent = category;
  document.getElementById("bmiDetails").textContent = details;

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Animate modal appearance
  gsap.fromTo(
    "#modalContent",
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
  );
}

// Close modal function
window.closeModal = function () {
  gsap.to("#modalContent", {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: "back.in(1.7)",
    onComplete: () => {
      const modal = document.getElementById("resultModal");
      modal.classList.add("hidden");
      modal.classList.remove("flex");

      // Reset form
      form.reset();
      document.querySelectorAll(".custom-input").forEach((input) => {
        input.classList.remove("success", "error");
      });
      document.querySelectorAll(".success-icon").forEach((icon) => {
        icon.classList.remove("show");
      });
      document.querySelectorAll(".error-message").forEach((error) => {
        error.classList.remove("show");
        error.textContent = "";
      });
      diseaseDetailsContainer.classList.add("hidden");
    },
  });
};

// Form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    // Show loading state
    submitBtn.disabled = true;
    submitText.classList.add("hidden");
    loadingSpinner.classList.remove("hidden");

    // Simulate API call
    setTimeout(() => {
      submitBtn.disabled = false;
      submitText.classList.remove("hidden");
      loadingSpinner.classList.add("hidden");

      calculateBMI();
    }, 1500);
  }
});

// Real-time validation
[age, weight, height].forEach((input) => {
  input.addEventListener("input", function () {
    const errorId = this.id + "Error";
    const errorElement = document.getElementById(errorId);

    if (this.value && this.value > 0) {
      if (errorElement.classList.contains("show")) {
        hideError(errorId);
      }
    }
  });
});

// Gender selection animation
document.querySelectorAll('input[name="gender"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    hideError("genderError");

    // Animate selection
    const radioContent = this.nextElementSibling;
    gsap.to(radioContent, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  });
});

// Initial animations
gsap.fromTo(
  ".bg-white",
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
);

gsap.fromTo(
  ".input-group",
  { y: 30, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.5,
    stagger: 0.1,
    delay: 0.2,
    ease: "power2.out",
  }
);
