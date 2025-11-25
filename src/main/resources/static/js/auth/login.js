document.addEventListener('DOMContentLoaded', function() {
    // Auto-dismiss des alertes après 5 secondes
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            if (alert.classList.contains('show')) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    });

    // Validation en temps réel
    const form = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input.value);
    }

    function validatePassword(input) {
        return input.value.length >= 6;
    }

    function showError(input, errorElement, message) {
        input.classList.add('is-invalid');
        errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
        input.classList.remove('is-invalid');
        errorElement.textContent = '';
    }

    // Validation lors de la saisie
    email.addEventListener('blur', function() {
        if (email.value.trim() === '') {
            showError(email, emailError, 'L\'adresse email est requise');
        } else if (!validateEmail(email)) {
            showError(email, emailError, 'Veuillez saisir une adresse email valide');
        } else {
            clearError(email, emailError);
        }
    });

    password.addEventListener('blur', function() {
        if (password.value.trim() === '') {
            showError(password, passwordError, 'Le mot de passe est requis');
        } else if (!validatePassword(password)) {
            showError(password, passwordError, 'Le mot de passe doit contenir au moins 6 caractères');
        } else {
            clearError(password, passwordError);
        }
    });

    // Validation à la soumission
    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Validation email
        if (email.value.trim() === '') {
            showError(email, emailError, 'L\'adresse email est requise');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(email, emailError, 'Veuillez saisir une adresse email valide');
            isValid = false;
        } else {
            clearError(email, emailError);
        }

        // Validation mot de passe
        if (password.value.trim() === '') {
            showError(password, passwordError, 'Le mot de passe est requis');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError(password, passwordError, 'Le mot de passe doit contenir au moins 6 caractères');
            isValid = false;
        } else {
            clearError(password, passwordError);
        }

        if (!isValid) {
            event.preventDefault();
            // Scroll vers la première erreur
            const firstError = form.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
});