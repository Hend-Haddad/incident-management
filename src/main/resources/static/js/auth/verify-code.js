document.addEventListener('DOMContentLoaded', function() {
    // Compte à rebours
    let timeLeft = 15 * 60;
    const countdownElement = document.getElementById('countdown');
    const timerElement = document.getElementById('timer');
    const resendBtn = document.getElementById('resendBtn');

    function updateCountdown() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            countdownElement.textContent = "00:00";
            timerElement.classList.add('expired');
            clearInterval(countdownInterval);
            resendBtn.disabled = false;
        } else {
            timeLeft--;
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Validation du code
    const form = document.getElementById('verifyCodeForm');
    const code = document.getElementById('code');
    const codeError = document.getElementById('codeError');

    code.addEventListener('input', function() {
        code.value = code.value.replace(/[^0-9]/g, '');
        
        if (code.value.length === 6) {
            code.classList.remove('is-invalid');
            codeError.textContent = '';
        }
    });

    form.addEventListener('submit', function(event) {
        if (code.value.length !== 6) {
            event.preventDefault();
            code.classList.add('is-invalid');
            codeError.textContent = 'Le code doit contenir exactement 6 chiffres';
        }
    });

    // Renvoyer le code
    resendBtn.addEventListener('click', function() {
        fetch('/resend-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(response => {
            if (response.ok) {
                location.reload();
            }
        });
    });
});