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

    // Fonctionnalité de visibilité du mot de passe
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    const passwordIcon = document.getElementById('passwordIcon');
    const passwordInputGroup = document.querySelector('.password-input-group');

    if (togglePassword && password && passwordIcon) {
        // Initialisation : œil barré = mot de passe masqué
        passwordIcon.classList.add('bi-eye-slash');
        togglePassword.setAttribute('title', 'Afficher le mot de passe');

        togglePassword.addEventListener('click', function() {
            // Basculer le type de champ
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            
            // CORRECTION : Logique inversée
            if (type === 'text') {
                // Mot de passe visible = œil normal (non barré)
                passwordIcon.classList.remove('bi-eye-slash');
                passwordIcon.classList.add('bi-eye');
                togglePassword.setAttribute('title', 'Masquer le mot de passe');
            } else {
                // Mot de passe masqué = œil barré
                passwordIcon.classList.remove('bi-eye');
                passwordIcon.classList.add('bi-eye-slash');
                togglePassword.setAttribute('title', 'Afficher le mot de passe');
            }
        });
    }

    // Validation en temps réel
    const form = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const passwordField = document.getElementById('password');
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
        if (input === passwordField && passwordInputGroup) {
            passwordInputGroup.classList.add('is-invalid');
        }
        errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
        input.classList.remove('is-invalid');
        if (input === passwordField && passwordInputGroup) {
            passwordInputGroup.classList.remove('is-invalid');
        }
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

    passwordField.addEventListener('blur', function() {
        if (passwordField.value.trim() === '') {
            showError(passwordField, passwordError, 'Le mot de passe est requis');
        } else if (!validatePassword(passwordField)) {
            showError(passwordField, passwordError, 'Le mot de passe doit contenir au moins 6 caractères');
        } else {
            clearError(passwordField, passwordError);
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
        if (passwordField.value.trim() === '') {
            showError(passwordField, passwordError, 'Le mot de passe est requis');
            isValid = false;
        } else if (!validatePassword(passwordField)) {
            showError(passwordField, passwordError, 'Le mot de passe doit contenir au moins 6 caractères');
            isValid = false;
        } else {
            clearError(passwordField, passwordError);
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

    // Effacer les erreurs lors de la saisie
    email.addEventListener('input', function() {
        if (email.value.trim() !== '') {
            clearError(email, emailError);
        }
    });

    passwordField.addEventListener('input', function() {
        if (passwordField.value.trim() !== '') {
            clearError(passwordField, passwordError);
        }
    });
});