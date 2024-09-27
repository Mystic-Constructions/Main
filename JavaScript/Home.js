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