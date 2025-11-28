document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgotPasswordForm');
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input.value);
    }

    function showError(input, errorElement, message) {
        input.classList.add('is-invalid');
        errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
        input.classList.remove('is-invalid');
        errorElement.textContent = '';
    }

    email.addEventListener('blur', function() {
        if (email.value.trim() === '') {
            showError(email, emailError, 'L\'adresse email est requise');
        } else if (!validateEmail(email)) {
            showError(email, emailError, 'Veuillez saisir une adresse email valide');
        } else {
            clearError(email, emailError);
        }
    });

    form.addEventListener('submit', function(event) {
        let isValid = true;

        if (email.value.trim() === '') {
            showError(email, emailError, 'L\'adresse email est requise');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(email, emailError, 'Veuillez saisir une adresse email valide');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
});