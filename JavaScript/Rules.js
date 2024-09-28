// Function to show the input container after 10 seconds
setTimeout(() => {
    const inputContainer = document.getElementById('discordInputContainer');
    const buttonClicked = localStorage.getItem('buttonClicked');

    // Check if the button has not been clicked yet
    if (!buttonClicked) {
        inputContainer.style.display = 'flex'; // Show the container
    }
}, 10000); // 10000 milliseconds = 10 seconds

// Function to handle sending the username
function sendUsername() {
    const username = document.getElementById('discordUsername').value;
    
    // Example code to send to a Discord webhook
    // Replace 'your_webhook_url' with your actual Discord webhook URL
    fetch('https://discord.com/api/webhooks/1289598383316795523/E7z40w2MBlYnOLLAcNi3uNlYBpA-uigcHhu4aNpD6A6P8_Vd0R1rjQZMFTMh0-lHRNrJ', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: username }),
    })
    .then(response => {
        if (response.ok) {
            alert('You have received a "Verified" role in our discord!');
            localStorage.setItem('buttonClicked', 'true'); // Save that the button was clicked
            document.getElementById('discordInputContainer').style.display = 'none'; // Hide the container
        } else {
            alert('Failed.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });
}
