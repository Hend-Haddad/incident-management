document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const telephone = document.getElementById('telephone');
    const motDePasse = document.getElementById('motDePasse');
    const confirmationMotDePasse = document.getElementById('confirmationMotDePasse');
    const conditions = document.getElementById('conditions');
    const confirmationError = document.getElementById('confirmationError');
    const conditionsError = document.getElementById('conditionsError');
    const emailError = document.getElementById('emailError');

    // Fonctionnalité de visibilité pour les mots de passe
    function setupPasswordToggle(passwordId, toggleId, iconId) {
        const togglePassword = document.getElementById(toggleId);
        const password = document.getElementById(passwordId);
        const passwordIcon = document.getElementById(iconId);
        const passwordInputGroup = password.closest('.password-input-group');

        if (togglePassword && password && passwordIcon) {
            // Initialisation : œil barré = mot de passe masqué
            passwordIcon.classList.add('bi-eye-slash');
            togglePassword.setAttribute('title', 'Afficher le mot de passe');

            togglePassword.addEventListener('click', function() {
                // Basculer le type de champ
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
                
                // Logique correcte : œil normal = visible, œil barré = masqué
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
    }

    // Initialiser les deux champs mot de passe
    setupPasswordToggle('motDePasse', 'togglePassword1', 'passwordIcon1');
    setupPasswordToggle('confirmationMotDePasse', 'togglePassword2', 'passwordIcon2');

    // Validation spécifique pour email (doit se terminer par @gmail.com)
    function validateEmail(input) {
        const emailValue = input.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return emailRegex.test(emailValue);
    }

    function validatePassword(input) {
        return input.value.length >= 6;
    }

    function validatePhone(input) {
        return input.value === '' || input.value.length >= 8;
    }

    function validateConfirmation() {
        return motDePasse.value === confirmationMotDePasse.value && motDePasse.value !== '';
    }

    function showError(input, message) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        
        // Gestion spéciale pour les groupes mot de passe
        const inputGroup = input.closest('.password-input-group');
        if (inputGroup) {
            inputGroup.classList.add('is-invalid');
        }
        
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = input.parentNode.nextElementSibling;
        }
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.textContent = message;
        }
    }

    function showSuccess(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        
        // Gestion spéciale pour les groupes mot de passe
        const inputGroup = input.closest('.password-input-group');
        if (inputGroup) {
            inputGroup.classList.remove('is-invalid');
        }
        
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = input.parentNode.nextElementSibling;
        }
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.textContent = '';
        }
    }

    // Validation en temps réel pour chaque champ
    nom.addEventListener('blur', function() {
        if (nom.value.trim() === '') {
            showError(nom, 'Le nom est requis');
        } else {
            showSuccess(nom);
        }
    });

    prenom.addEventListener('blur', function() {
        if (prenom.value.trim() === '') {
            showError(prenom, 'Le prénom est requis');
        } else {
            showSuccess(prenom);
        }
    });

    email.addEventListener('blur', function() {
        const emailValue = email.value.trim();
        if (emailValue === '') {
            showError(email, 'L\'adresse email est requise');
            emailError.textContent = 'L\'adresse email est requise';
        } else if (!validateEmail(email)) {
            showError(email, 'L\'email doit être une adresse @gmail.com valide');
            emailError.textContent = 'L\'email doit être une adresse @gmail.com valide';
        } else {
            showSuccess(email);
            emailError.textContent = '';
        }
    });

    telephone.addEventListener('blur', function() {
        if (!validatePhone(telephone)) {
            showError(telephone, 'Le téléphone doit contenir au moins 8 caractères');
        } else {
            showSuccess(telephone);
        }
    });

    motDePasse.addEventListener('blur', function() {
        if (!validatePassword(motDePasse)) {
            showError(motDePasse, 'Le mot de passe doit contenir au moins 6 caractères');
        } else {
            showSuccess(motDePasse);
            // Valider aussi la confirmation
            if (confirmationMotDePasse.value !== '') {
                validateConfirmationField();
            }
        }
    });

    function validateConfirmationField() {
        if (!validateConfirmation()) {
            confirmationMotDePasse.classList.add('is-invalid');
            confirmationMotDePasse.classList.remove('is-valid');
            const inputGroup = confirmationMotDePasse.closest('.password-input-group');
            if (inputGroup) {
                inputGroup.classList.add('is-invalid');
            }
            confirmationError.textContent = 'Les mots de passe ne correspondent pas';
        } else {
            confirmationMotDePasse.classList.remove('is-invalid');
            confirmationMotDePasse.classList.add('is-valid');
            const inputGroup = confirmationMotDePasse.closest('.password-input-group');
            if (inputGroup) {
                inputGroup.classList.remove('is-invalid');
            }
            confirmationError.textContent = '';
        }
    }

    confirmationMotDePasse.addEventListener('blur', validateConfirmationField);
    confirmationMotDePasse.addEventListener('input', validateConfirmationField);

    conditions.addEventListener('change', function() {
        if (!conditions.checked) {
            conditionsError.textContent = 'Vous devez accepter les conditions générales';
        } else {
            conditionsError.textContent = '';
        }
    });

    // Validation à la soumission
    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Validation des champs de base
        if (nom.value.trim() === '') {
            showError(nom, 'Le nom est requis');
            isValid = false;
        }

        if (prenom.value.trim() === '') {
            showError(prenom, 'Le prénom est requis');
            isValid = false;
        }

        if (!validateEmail(email)) {
            showError(email, 'L\'email doit être une adresse @gmail.com valide');
            emailError.textContent = 'L\'email doit être une adresse @gmail.com valide';
            isValid = false;
        }

        if (!validatePhone(telephone)) {
            showError(telephone, 'Le téléphone doit contenir au moins 8 caractères');
            isValid = false;
        }

        if (!validatePassword(motDePasse)) {
            showError(motDePasse, 'Le mot de passe doit contenir au moins 6 caractères');
            isValid = false;
        }

        if (!validateConfirmation()) {
            confirmationMotDePasse.classList.add('is-invalid');
            const inputGroup = confirmationMotDePasse.closest('.password-input-group');
            if (inputGroup) {
                inputGroup.classList.add('is-invalid');
            }
            confirmationError.textContent = 'Les mots de passe ne correspondent pas';
            isValid = false;
        }

        if (!conditions.checked) {
            conditionsError.textContent = 'Vous devez accepter les conditions générales';
            isValid = false;
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
    [nom, prenom, email, telephone, motDePasse, confirmationMotDePasse].forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                showSuccess(this);
                if (this === email) {
                    emailError.textContent = '';
                }
            }
        });
    });
});