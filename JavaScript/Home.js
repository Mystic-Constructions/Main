const targetDate = new Date("October 23, 2024 00:00:00").getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = targetDate - now;

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById('days').innerHTML = `<span>${days}</span><span class="label">Days</span>`;
            document.getElementById('hours').innerHTML = `<span>${hours}</span><span class="label">Hours</span>`;
            document.getElementById('minutes').innerHTML = `<span>${minutes}</span><span class="label">Minutes</span>`;
            document.getElementById('seconds').innerHTML = `<span>${seconds}</span><span class="label">Seconds</span>`;

            if (timeLeft < 0) {
                clearInterval(countdownInterval);
                document.querySelector('.countdown').innerHTML = "Event has passed!";
            }
        }

        const countdownInterval = setInterval(updateCountdown, 1000);
        
        window.onload = checkFeedbackStatus;

        function checkFeedbackStatus() {
            const feedbackInputContainer = document.getElementById('feedbackInput');
        
            // Check if feedback has already been sent
            if (localStorage.getItem('feedbackSent')) {
                feedbackInputContainer.style.display = 'none'; // Hide the container if feedback has already been sent
            } else {
                feedbackInputContainer.style.display = 'flex'; // Show the container if feedback hasn't been sent
            }
        }
        
        function sendFeedback() {
            const feedbackInputContainer = document.getElementById('feedbackInput');
            const feedback = document.getElementById('feedback').value;
        
            // Check if feedback has already been sent
            if (localStorage.getItem('feedbackSent')) {
                alert('Your feedback has already been sent.');
                return;
            }
        
            // Send feedback to a Discord webhook
            fetch('https://discord.com/api/webhooks/1289610244120510599/bro8fR5KUfUlKW2wRK3vYutCLQrTWAkjDKNyK-IyrGrxoT28j2DDzx1w1-PT2qzxv1Ip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: feedback }),
            })
            .then(response => {
                if (response.ok) {
                    alert('Your feedback is now sent.');
                    feedbackInputContainer.style.display = 'none'; // Hide the container
                    localStorage.setItem('feedbackSent', 'true'); // Store that feedback has been sent
                } else {
                    alert('Failed to send feedback.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred.');
            });
        }
        