// Form validation for Faculty Transfer Form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  // Validation rules and error messages in Thai
  const validationRules = {
    date: {
      required: true,
      message: "กรุณาเลือกวันที่",
    },
    deanFaculty: {
      required: true,
      message: "กรุณากรอกชื่อคณะใหม่",
    },
    nameTitle: {
      required: true,
      message: "กรุณาเลือกคำนำหน้าชื่อ",
    },
    fullName: {
      required: true,
      pattern: /^[ก-๙a-zA-Z\s]+$/,
      message: "กรุณากรอกชื่อ-นามสกุล (ตัวอักษรไทยหรืออังกฤษเท่านั้น)",
    },
    studentCode: {
      required: true,
      pattern: /^\d{10}$/,
      message: "รหัสนักศึกษาต้องเป็นตัวเลข 10 หลัก",
    },
    phone: {
      required: true,
      pattern: /^[0-9]{10}$/,
      message: "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก",
    },
    system: {
      required: true,
      message: "กรุณากรอกระบบ",
    },
    course: {
      required: true,
      message: "กรุณาเลือกหลักสูตร",
    },
    section: {
      required: true,
      message: "กรุณาเลือกภาค",
    },
    major: {
      required: true,
      message: "กรุณากรอกสาขาวิชาเดิม",
    },
    faculty: {
      required: true,
      message: "กรุณากรอกคณะเดิม",
    },
    newMajor: {
      required: true,
      message: "กรุณากรอกสาขาวิชาใหม่",
    },
    reason: {
      required: true,
      minLength: 10,
      message: "กรุณากรอกเหตุผล (อย่างน้อย 10 ตัวอักษร)",
    },
    deadlineDate: {
      required: true,
      message: "กรุณาเลือกวันที่กำหนด",
    },
    studentsign: {
      required: true,
      fileType: ["image/jpeg", "image/png", "image/jpg"],
      message: "กรุณาอัพโลดลายเซ็นนักศึกษา (ไฟล์ภาพเท่านั้น)",
    },
    // Approval sections validation
    oldMajorComment: {
      required: true,
      message: "กรุณากรอกความเห็นของสาขาวิชาเดิม",
    },
    advisersign: {
      required: true,
      fileType: ["image/jpeg", "image/png", "image/jpg"],
      message: "กรุณาอัพโลดลายเซ็นอาจารย์ที่ปรึกษา",
    },
    adviserDate: {
      required: true,
      message: "กรุณาเลือกวันที่",
    },
    newMajorComment: {
      required: true,
      message: "กรุณากรอกความเห็นของสาขาวิชาใหม่",
    },
    curriculumsign: {
      required: true,
      fileType: ["image/jpeg", "image/png", "image/jpg"],
      message: "กรุณาอัพโลดลายเซ็นประธานกรรมการบริหารหลักสูตร",
    },
    curriculumDate: {
      required: true,
      message: "กรุณาเลือกวันที่",
    },
    oldCurriculumComment: {
      required: true,
      message: "กรุณากรอกความเห็นประธานกรรมการบริหารหลักสูตรสาขาเดิม",
    },
    oldCurriculumsign: {
      required: true,
      fileType: ["image/jpeg", "image/png", "image/jpg"],
      message: "กรุณาอัพโลดลายเซ็นประธานกรรมการบริหารหลักสูตร",
    },
    oldCurriculumDate: {
      required: true,
      message: "กรุณาเลือกวันที่",
    },
    oldDeanComment: {
      required: true,
      message: "กรุณากรอกความเห็นคณบดีคณะเดิม",
    },
    oldDeanApproval: {
      required: true,
      message: "กรุณาเลือกความเห็นของคณบดีคณะเดิม",
    },
    oldDeansign: {
      required: true,
      fileType: ["image/jpeg", "image/png", "image/jpg"],
      message: "กรุณาอัพโลดลายเซ็นคณบดีคณะเดิม",
    },
    oldDeanDate: {
      required: true,
      message: "กรุณาเลือกวันที่",
    },
    newCurriculumComment2: {
      required: true,
      message: "กรุณากรอกความเห็นประธานกรรมการบริหารหลักสูตรสาขาใหม่",
    },
    newCurriculumsign2: {
      required: true,
      fileType: ["image/jpeg", "image/png", "image/jpg"],
      message: "กรุณาอัพโลดลายเซ็นประธานกรรมการบริหารหลักสูตร",
    },
    newCurriculumDate2: {
      required: true,
      message: "กรุณาเลือกวันที่",
    },
    newDeanComment: {
      required: true,
      message: "กรุณากรอกความเห็นคณบดีคณะใหม่",
    },
    newDeanApproval: {
      required: true,
      message: "กรุณาเลือกความเห็นของคณบดีคณะใหม่",
    },
    newDeansign: {
      required: true,
      fileType: ["image/jpeg", "image/png", "image/jpg"],
      message: "กรุณาอัพโลดลายเซ็นคณบดีคณะใหม่",
    },
    newDeanDate: {
      required: true,
      message: "กรุณาเลือกวันที่",
    },
    receiptBook: {
      required: true,
      message: "กรุณากรอกเล่มที่ใบเสร็จ",
    },
    receiptNumber: {
      required: true,
      message: "กรุณากรอกเลขที่ใบเสร็จ",
    },
    treasurysign: {
      required: true,
      fileType: ["image/jpeg", "image/png", "image/jpg"],
      message: "กรุณาอัพโลดลายเซ็นผู้รับเงิน",
    },
    treasuryDate: {
      required: true,
      message: "กรุณาเลือกวันที่",
    },
    directorComment: {
      required: true,
      message: "กรุณากรอกความเห็นผู้อำนวยการ",
    },
    directorsign: {
      required: true,
      fileType: ["image/jpeg", "image/png", "image/jpg"],
      message: "กรุณาอัพโลดลายเซ็นผู้อำนวยการ",
    },
    directorDate: {
      required: true,
      message: "กรุณาเลือกวันที่",
    },
    registrarComment: {
      required: true,
      message: "กรุณากรอกความเห็นหัวหน้ากลุ่มภารกิจ",
    },
    registrarsign: {
      required: true,
      fileType: ["image/jpeg", "image/png", "image/jpg"],
      message: "กรุณาอัพโลดลายเซ็นหัวหน้ากลุ่มภารกิจ",
    },
    registrarDate: {
      required: true,
      message: "กรุณาเลือกวันที่",
    },
    newStudentCode: {
      required: true,
      pattern: /^\d{10}$/,
      message: "รหัสนักศึกษาใหม่ต้องเป็นตัวเลข 10 หลัก",
    },
    officersign: {
      required: true,
      fileType: ["image/jpeg", "image/png", "image/jpg"],
      message: "กรุณาอัพโลดลายเซ็นเจ้าหน้าที่",
    },
    officerDate: {
      required: true,
      message: "กรุณาเลือกวันที่",
    },
  };

  // Function to show error message
  function showError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;

    const errorElement =
      field.parentNode.querySelector(".error-message") ||
      field.closest("div").querySelector(".error-message");

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove("hidden");
    }

    // Add error styling to field
    field.classList.add("border-red-500");
  }

  // Function to clear error message
  function clearError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;

    const errorElement =
      field.parentNode.querySelector(".error-message") ||
      field.closest("div").querySelector(".error-message");

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.add("hidden");
    }

    // Remove error styling from field
    field.classList.remove("border-red-500");
  }

  // Function to validate individual field
  function validateField(fieldName, value, file = null) {
    const rules = validationRules[fieldName];
    if (!rules) return true;

    // Required validation
    if (rules.required) {
      if (!value || value.trim() === "") {
        showError(fieldName, rules.message);
        return false;
      }
    }

    // Pattern validation
    if (rules.pattern && value) {
      if (!rules.pattern.test(value)) {
        showError(fieldName, rules.message);
        return false;
      }
    }

    // Min length validation
    if (rules.minLength && value) {
      if (value.trim().length < rules.minLength) {
        showError(fieldName, rules.message);
        return false;
      }
    }

    // File type validation
    if (rules.fileType && file) {
      if (!rules.fileType.includes(file.type)) {
        showError(fieldName, rules.message);
        return false;
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showError(fieldName, "ไฟล์มีขนาดเกิน 5MB");
        return false;
      }
    }

    clearError(fieldName);
    return true;
  }

  // Add real-time validation to all form fields
  Object.keys(validationRules).forEach((fieldName) => {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;

    if (field.type === "file") {
      field.addEventListener("change", function () {
        const file = this.files[0];
        validateField(fieldName, file ? "selected" : "", file);
      });
    } else if (field.type === "radio") {
      const radioButtons = document.querySelectorAll(`[name="${fieldName}"]`);
      radioButtons.forEach((radio) => {
        radio.addEventListener("change", function () {
          const checkedValue = document.querySelector(
            `[name="${fieldName}"]:checked`
          );
          validateField(fieldName, checkedValue ? checkedValue.value : "");
        });
      });
    } else {
      field.addEventListener("blur", function () {
        validateField(fieldName, this.value);
      });

      field.addEventListener("input", function () {
        // Clear error on input if field was previously invalid
        if (this.classList.contains("border-red-500")) {
          clearError(fieldName);
        }
      });
    }
  });

  // Form submission validation
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    const formData = new FormData(this);

    // Validate all fields
    Object.keys(validationRules).forEach((fieldName) => {
      const field = document.querySelector(`[name="${fieldName}"]`);
      if (!field) return;

      let value = "";
      let file = null;

      if (field.type === "file") {
        file = field.files[0];
        value = file ? "selected" : "";
      } else if (field.type === "radio") {
        const checkedRadio = document.querySelector(
          `[name="${fieldName}"]:checked`
        );
        value = checkedRadio ? checkedRadio.value : "";
      } else {
        value = field.value;
      }

      if (!validateField(fieldName, value, file)) {
        isValid = false;
      }
    });

    // Additional custom validations

    // Check if deadline date is in the future
    const deadlineDate = document.querySelector('[name="deadlineDate"]').value;
    const currentDate = new Date().toISOString().split("T")[0];
    if (deadlineDate && deadlineDate <= currentDate) {
      showError("deadlineDate", "วันที่กำหนดต้องเป็นวันในอนาคต");
      isValid = false;
    }

    // Check if all dates are not in the future (except deadline)
    const dateFields = [
      "date",
      "adviserDate",
      "curriculumDate",
      "oldCurriculumDate",
      "oldDeanDate",
      "newCurriculumDate2",
      "newDeanDate",
      "treasuryDate",
      "directorDate",
      "registrarDate",
      "officerDate",
    ];

    dateFields.forEach((fieldName) => {
      const field = document.querySelector(`[name="${fieldName}"]`);
      if (field && field.value && field.value > currentDate) {
        showError(fieldName, "วันที่ไม่ควรเป็นวันในอนาคต");
        isValid = false;
      }
    });

    if (isValid) {
      // Show success message
      alert("ส่งคำร้องเรียบร้อยแล้ว!");

      // Here you can add code to actually submit the form
      // this.submit(); // Uncomment this line when you're ready to actually submit
    } else {
      // Scroll to first error
      const firstError = document.querySelector(".border-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.focus();
      }

      alert("กรุณาตรวจสอบข้อมูลให้ครบถ้วนและถูกต้อง");
    }
  });

  // Cancel button functionality
  const cancelButton = document.querySelector('button[class*="bg-gray-300"]');
  if (cancelButton) {
    cancelButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("คุณต้องการยกเลิกการกรอกฟอร์มหรือไม่?")) {
        form.reset();
        // Clear all error messages
        document.querySelectorAll(".error-message").forEach((error) => {
          error.classList.add("hidden");
          error.textContent = "";
        });
        // Remove error styling
        document.querySelectorAll(".border-red-500").forEach((field) => {
          field.classList.remove("border-red-500");
        });
      }
    });
  }

  // Prevent form submission on Enter key (except for submit button)
  form.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.type !== "submit") {
      e.preventDefault();
    }
  });

  // Auto-format phone number and student code
  const phoneField = document.querySelector('[name="phone"]');
  const studentCodeField = document.querySelector('[name="studentCode"]');
  const newStudentCodeField = document.querySelector('[name="newStudentCode"]');

  [phoneField, studentCodeField, newStudentCodeField].forEach((field) => {
    if (field) {
      field.addEventListener("input", function () {
        // Only allow numbers
        this.value = this.value.replace(/[^0-9]/g, "");
      });
    }
  });

  // Auto-format receipt fields to only allow numbers and letters
  const receiptFields = document.querySelectorAll(
    '[name="receiptBook"], [name="receiptNumber"]'
  );
  receiptFields.forEach((field) => {
    field.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-Z0-9]/g, "");
    });
  });
});
