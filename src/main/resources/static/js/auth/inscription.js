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

    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input.value);
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
        let errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.textContent = message;
        }
    }

    function showSuccess(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        const errorDiv = input.nextElementSibling;
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
        if (!validateEmail(email)) {
            showError(email, 'Veuillez saisir une adresse email valide');
        } else {
            showSuccess(email);
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
            confirmationError.textContent = 'Les mots de passe ne correspondent pas';
        } else {
            confirmationMotDePasse.classList.remove('is-invalid');
            confirmationMotDePasse.classList.add('is-valid');
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
            showError(email, 'Veuillez saisir une adresse email valide');
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
});