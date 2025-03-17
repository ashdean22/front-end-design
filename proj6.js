document.forms['registration_form'].addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  const form = document.forms['registration_form'];
  const fullName = form['full_name'].value.trim();
  const username = form['username'].value.trim();
  const email = form['email'].value.trim();
  const password = form['password'].value.trim();
  const confirmPassword = form['confirm_password'].value.trim();
  const phone = form['phone'].value.trim();
  const dob = form['dob'].value;
  const terms = form['terms'].checked;
  const messageDiv = document.getElementById('registration_message');

  // This is used to clear previous messages
  messageDiv.textContent = '';

  try {
    // Full name validation
    if (!fullName || /[^a-zA-Z\s]/.test(fullName)) {
      console.warn('Full name validation failed');
      messageDiv.textContent = 'Full name must not be empty and cannot contain numbers or special characters.';
      form['full_name'].focus();
      return;
    }

    // Username validation
    if (username.length < 6 || username.length > 15 || /^[0-9]/.test(username) || /[^a-zA-Z0-9]/.test(username)) {
      console.warn('Username validation failed');
      messageDiv.textContent = 'Username must be between 6 and 15 characters, only contain letters and numbers, and cannot start with a number.';
      form['username'].focus();
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      console.warn('Email validation failed');
      messageDiv.textContent = 'Please enter a valid email address.';
      form['email'].focus();
      return;
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    if (!passwordPattern.test(password)) {
      console.warn('Password validation failed');
      messageDiv.textContent = 'Password must be between 8 and 20 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).';
      form['password'].focus();
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      console.warn('Confirm password validation failed');
      messageDiv.textContent = 'Passwords do not match!';
      form['confirm_password'].focus();
      return;
    }

    // Phone number validation
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      console.warn('Phone number validation failed');
      messageDiv.textContent = 'Please enter a valid 10-digit phone number.';
      form['phone'].focus();
      return;
    }

    // Date of birth validation
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      console.warn('Date of birth validation failed');
      messageDiv.textContent = 'You must be at least 18 years old to register.';
      form['dob'].focus();
      return;
    }

    // Terms and conditions validation
    if (!terms) {
      console.warn('Terms and conditions validation failed');
      messageDiv.textContent = 'You must agree to the terms and conditions!';
      form['terms'].focus();
      return;
    }

    // If all validations pass
    messageDiv.textContent = `Registration successful! Welcome, ${fullName}.`;
  } catch (error) {
    // Catch any unexpected errors and log them using console.error
    console.error('An unexpected error occurred:', error);
    messageDiv.textContent = 'An unexpected error occurred. Please try again later.';
  }
});