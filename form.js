// This function calculates the user's age based on their birthdate
function calculateAge(birthdate) {
    var today = new Date();
    var birthDate = new Date(birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    console.log("Age: " + age); //This logs the user's age based on their birthdate.
    return age;
  }
  
  // This function is for the subscription button
  function subscribe(event) {

    // Prevent the default behavior of the form. This will update the message on the webpage without refreshing the page.
    event.preventDefault();
  
    // Getting the name, email and birthdate input values from the user
    var name = document.getElementById("name_text").value;
    var email = document.getElementById("email_text").value;
    var birthdate = document.getElementById("birthdate_text").value;

    // Logging the user's inputs
    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Birthdate: " + birthdate);
  
    // Check if any input is empty
    if (name === "" || email === "" || birthdate === "") {
      alert("You must enter your name, email, and birthdate to subscribe.");
      return;
    }
  
    // This calculates the user's age
    var age = calculateAge(birthdate);
  
    // Check if the user is under 18
    if (age < 18) {
      console.warn("THIS USER IS UNDER 18");// Logs the warning message.
      alert("You must be at least 18 years old to subscribe.");
      return;
    }

  
    // Personalized message
    var message = "Thank you for subscribing, " + name + "! We'll be in touch.";
  
    // Display the personalized message on the webpage
    document.getElementById("message").innerText = message;
  
    // Changes the button appearance after subscription
    var button = document.getElementById("subscribe_btn");
    button.innerText = "Subscribe"; // Reset button text
    button.disabled = false; // Ensure button is enabled
  }
  
  // Add event listener to button
  document
    .getElementById("subscribe_btn")
    .addEventListener("click", subscribe); // once the subscribe button is clicked, it will activate the subscribe function.