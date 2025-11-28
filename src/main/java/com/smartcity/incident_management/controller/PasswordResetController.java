package com.smartcity.incident_management.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


import com.smartcity.incident_management.service.EmailService;
import com.smartcity.incident_management.service.UtilisateurService;

import dto.ForgotPasswordRequest;
import dto.ResetPasswordRequest;


@Controller
public class PasswordResetController {
    
    @Autowired
    private UtilisateurService utilisateurService;
    
    @Autowired
    private EmailService emailService;
    
    // Page de demande de réinitialisation
    @GetMapping("/forgot-password")
    public String showForgotPasswordForm(Model model) {
        model.addAttribute("forgotPasswordRequest", new ForgotPasswordRequest());
        return "auth/forgot-password";
    }
    
    // Traitement de la demande
    @PostMapping("/forgot-password")
    public String processForgotPassword(@ModelAttribute ForgotPasswordRequest request, 
                                      Model model, 
                                      HttpSession session) {
        try {
            // Vérifier si l'email existe
            if (!utilisateurService.emailExiste(request.getEmail())) {
                model.addAttribute("error", "Aucun compte trouvé avec cette adresse email.");
                return "auth/forgot-password";
            }
            
            // Générer un code de vérification
            String verificationCode = utilisateurService.generateVerificationCode();
            
            // Sauvegarder le code en session
            session.setAttribute("resetCode", verificationCode);
            session.setAttribute("resetEmail", request.getEmail());
            session.setAttribute("codeExpiration", System.currentTimeMillis() + 15 * 60 * 1000); // 15 minutes
            
            // Envoyer l'email
            emailService.sendVerificationCode(request.getEmail(), verificationCode);
            
            model.addAttribute("success", "Un code de vérification a été envoyé à votre adresse email.");
            return "auth/verify-code";
            
        } catch (Exception e) {
            model.addAttribute("error", "Erreur lors de l'envoi du code. Vérifiez votre adresse email.");
            return "auth/forgot-password";
        }
    }
    
    // Vérification du code
    @PostMapping("/verify-code")
    public String verifyCode(@RequestParam String code, 
                           HttpSession session, 
                           Model model) {
        String sessionCode = (String) session.getAttribute("resetCode");
        String email = (String) session.getAttribute("resetEmail");
        Long expiration = (Long) session.getAttribute("codeExpiration");
        
        if (expiration == null || System.currentTimeMillis() > expiration) {
            model.addAttribute("error", "Le code a expiré. Veuillez recommencer.");
            return "auth/forgot-password";
        }
        
        if (sessionCode != null && sessionCode.equals(code)) {
            session.setAttribute("codeVerified", true);
            model.addAttribute("resetPasswordRequest", new ResetPasswordRequest());
            return "auth/reset-password";
        } else {
            model.addAttribute("error", "Code incorrect. Veuillez réessayer.");
            return "auth/verify-code";
        }
    }
    
    // Réinitialisation du mot de passe
    @PostMapping("/reset-password")
    public String resetPassword(@ModelAttribute ResetPasswordRequest request,
                              HttpSession session,
                              Model model) {
        
        if (session.getAttribute("codeVerified") == null || !session.getAttribute("codeVerified").equals(true)) {
            model.addAttribute("error", "Vérification requise.");
            return "auth/forgot-password";
        }
        
        String email = (String) session.getAttribute("resetEmail");
        
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            model.addAttribute("error", "Les mots de passe ne correspondent pas.");
            return "auth/reset-password";
        }
        
        if (request.getNewPassword().length() < 6) {
            model.addAttribute("error", "Le mot de passe doit contenir au moins 6 caractères.");
            return "auth/reset-password";
        }
        
        try {
            utilisateurService.updatePassword(email, request.getNewPassword());
            
            // Nettoyer la session
            session.removeAttribute("resetCode");
            session.removeAttribute("resetEmail");
            session.removeAttribute("codeExpiration");
            session.removeAttribute("codeVerified");
            
            model.addAttribute("success", "Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.");
            return "auth/login";
            
        } catch (Exception e) {
            model.addAttribute("error", "Erreur lors de la réinitialisation du mot de passe.");
            return "auth/reset-password";
        }
    }
    
    // Renvoyer le code
    @PostMapping("/resend-code")
    public String resendCode(HttpSession session, Model model) {
        String email = (String) session.getAttribute("resetEmail");
        
        if (email == null) {
            return "redirect:/forgot-password";
        }
        
        try {
            String verificationCode = utilisateurService.generateVerificationCode();
            
            session.setAttribute("resetCode", verificationCode);
            session.setAttribute("codeExpiration", System.currentTimeMillis() + 15 * 60 * 1000);
            
            emailService.sendVerificationCode(email, verificationCode);
            
            model.addAttribute("success", "Un nouveau code a été envoyé à votre adresse email.");
            return "auth/verify-code";
            
        } catch (Exception e) {
            model.addAttribute("error", "Erreur lors de l'envoi du code.");
            return "auth/verify-code";
        }
    }
}