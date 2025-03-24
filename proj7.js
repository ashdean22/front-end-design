document.addEventListener("DOMContentLoaded", () => {
  const selectedSurfaces = []; // Array to store selected surfaces
  const surfaceList = document.getElementById("surface_list");

  // Regular expression to validate the surface type values
  const validSurfaceRegex = /^(Hard|Clay|Grass)$/;

  // Function to update the displayed list
  function updateSurfaceList() {
    surfaceList.innerHTML = ""; // Clear the list
    selectedSurfaces.forEach((surface, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = surface;

      // Add a remove button for each item
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.style.marginLeft = "10px";
      removeButton.addEventListener("click", () => {
        selectedSurfaces.splice(index, 1); // Remove the item from the array
        updateSurfaceList(); // Update the displayed list
      });

      listItem.appendChild(removeButton);
      surfaceList.appendChild(listItem);
    });
  }

  // Handle form submission
  document.getElementById("submit_surface_btn").addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".court_surface");
    checkboxes.forEach((checkbox) => {
      if (
        checkbox.checked &&
        validSurfaceRegex.test(checkbox.value) && // Validate value with regex
        !selectedSurfaces.includes(checkbox.value)
      ) {
        selectedSurfaces.push(checkbox.value); // Add to the array if valid and not already added
      }
    });
    updateSurfaceList(); // Update the displayed list
  });

  // Handle file upload
  document.getElementById("upload_btn").addEventListener("click", () => {
    const fileInput = document.getElementById("tennis_photo");
    const file = fileInput.files[0]; // Get the selected file
    const displayImage = document.getElementById("display_image");

    if (file) {
      const reader = new FileReader();

      // When the file is loaded, display it
      reader.onload = (e) => {
        displayImage.src = e.target.result; // Set the image source to the file's data URL
        displayImage.style.display = "block"; // Make the image visible
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      alert("Please select a file to upload.");
    }
  });
});