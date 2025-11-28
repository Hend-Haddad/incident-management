document.addEventListener('DOMContentLoaded', function() {
    // Fonctionnalité de visibilité des mots de passe
    function setupPasswordToggle(passwordId, toggleId, iconId) {
        const togglePassword = document.getElementById(toggleId);
        const password = document.getElementById(passwordId);
        const passwordIcon = document.getElementById(iconId);

        if (togglePassword && password && passwordIcon) {
            passwordIcon.classList.add('bi-eye-slash');
            togglePassword.setAttribute('title', 'Afficher le mot de passe');

            togglePassword.addEventListener('click', function() {
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
                
                if (type === 'text') {
                    passwordIcon.classList.remove('bi-eye-slash');
                    passwordIcon.classList.add('bi-eye');
                    togglePassword.setAttribute('title', 'Masquer le mot de passe');
                } else {
                    passwordIcon.classList.remove('bi-eye');
                    passwordIcon.classList.add('bi-eye-slash');
                    togglePassword.setAttribute('title', 'Afficher le mot de passe');
                }
            });
        }
    }

    setupPasswordToggle('newPassword', 'togglePassword1', 'passwordIcon1');
    setupPasswordToggle('confirmPassword', 'togglePassword2', 'passwordIcon2');

    // Validation
    const form = document.getElementById('resetPasswordForm');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const newPasswordError = document.getElementById('newPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    function validatePassword(input) {
        return input.value.length >= 6;
    }

    function validateConfirmation() {
        return newPassword.value === confirmPassword.value && newPassword.value !== '';
    }

    newPassword.addEventListener('blur', function() {
        if (!validatePassword(newPassword)) {
            newPassword.classList.add('is-invalid');
            newPasswordError.textContent = 'Le mot de passe doit contenir au moins 6 caractères';
        } else {
            newPassword.classList.remove('is-invalid');
            newPasswordError.textContent = '';
        }
    });

    confirmPassword.addEventListener('blur', function() {
        if (!validateConfirmation()) {
            confirmPassword.classList.add('is-invalid');
            confirmPasswordError.textContent = 'Les mots de passe ne correspondent pas';
        } else {
            confirmPassword.classList.remove('is-invalid');
            confirmPasswordError.textContent = '';
        }
    });

    form.addEventListener('submit', function(event) {
        let isValid = true;

        if (!validatePassword(newPassword)) {
            newPassword.classList.add('is-invalid');
            newPasswordError.textContent = 'Le mot de passe doit contenir au moins 6 caractères';
            isValid = false;
        }

        if (!validateConfirmation()) {
            confirmPassword.classList.add('is-invalid');
            confirmPasswordError.textContent = 'Les mots de passe ne correspondent pas';
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
});