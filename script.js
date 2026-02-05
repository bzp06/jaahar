// Variable to track scale of the Yes button
let yesScale = 1.5;

// Function for Page 1: Grow the Yes button
function growYes() {
    yesScale += 0.2; // Increase scale
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.style.transform = `scale(${yesScale})`;
    
    // Make the No button move randomly to make it harder to click (extra fun)
    const noBtn = document.getElementById('noBtn');
    noBtn.style.position = 'absolute';
    noBtn.style.left = Math.random() * 80 + '%';
    noBtn.style.top = Math.random() * 80 + '%';
}

// Function for Page 1: Navigate to Page 2
function goToPage2() {
    window.location.href = "options.html";
}

// Variables for Page 2
let selectedOption = null;
let selectedOptionText = "";

// Function for Page 2: Handle Option Selection
function selectOption(optionId) {
    // Reset all options
    const allOptions = document.querySelectorAll('.option-card');
    const allBoxes = document.querySelectorAll('.selection-box');
    
    allOptions.forEach(card => card.classList.remove('selected'));
    allBoxes.forEach(box => box.classList.remove('checked'));

    // Highlight clicked option
    const clickedCard = document.querySelector(`[onclick="selectOption('${optionId}')"]`);
    const clickedBox = document.getElementById(`select-${optionId}`);
    
    clickedCard.classList.add('selected');
    clickedBox.classList.add('checked');

    // Save selection
    selectedOption = optionId;
    // Get the Title text of the selected option
    selectedOptionText = clickedCard.querySelector('h3').innerText;
}

// Function for Page 2: Submit Date
function submitDate() {
    const dateInput = document.getElementById('date-picker').value;
    
    if (!selectedOption) {
        alert("Please select a date idea! 🥺");
        return;
    }
    if (!dateInput) {
        alert("Please pick a date! 📅");
        return;
    }

    // Save data to LocalStorage to use on the next page
    localStorage.setItem('selectedActivity', selectedOptionText);
    localStorage.setItem('selectedDate', dateInput);

    window.location.href = "confirmation.html";
}

// Function for Page 3: Load Data
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('confirmation.html')) {
        const activity = localStorage.getItem('selectedActivity');
        const dateStr = localStorage.getItem('selectedDate');

        // Format the date nicely
        const dateObj = new Date(dateStr);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('en-US', options);

        // Update HTML
        document.getElementById('final-activity').innerText = activity;
        document.getElementById('final-date').innerText = formattedDate; // + " (adjusted for timezone)";
    }
});