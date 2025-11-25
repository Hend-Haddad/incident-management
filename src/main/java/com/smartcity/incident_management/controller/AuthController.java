package com.smartcity.incident_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.smartcity.incident_management.Role;
import com.smartcity.incident_management.Utilisateur;
import com.smartcity.incident_management.service.UtilisateurService;

@Controller
public class AuthController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping("/login")
    public String login(
            @RequestParam(value = "error", required = false) String error,
            @RequestParam(value = "logout", required = false) String logout,
            @RequestParam(value = "success", required = false) String success,
            Model model) {
        
        if (error != null) {
            model.addAttribute("error", "Email ou mot de passe incorrect");
        }
        
        if (logout != null) {
            model.addAttribute("message", "Vous avez été déconnecté avec succès");
        }
        
        if (success != null) {
            model.addAttribute("success", "Compte créé avec succès! Vous pouvez maintenant vous connecter.");
        }
        
        return "auth/login";
    }
    
    @GetMapping("/inscription")
    public String showInscriptionForm(Model model) {
        model.addAttribute("utilisateur", new Utilisateur());
        return "auth/inscription";
    }
    
    @PostMapping("/inscription")
    public String processInscription(
            @Validated @ModelAttribute("utilisateur") Utilisateur utilisateur, 
            BindingResult bindingResult, 
            Model model) {
        
        // Validation manuelle supplémentaire
        if (utilisateurService.emailExiste(utilisateur.getEmail())) {
            bindingResult.rejectValue("email", "error.email", "Cet email est déjà utilisé");
        }
        
        if (utilisateur.getTelephone() != null && !utilisateur.getTelephone().isEmpty() 
            && utilisateur.getTelephone().length() < 8) {
            bindingResult.rejectValue("telephone", "error.telephone", 
                "Le téléphone doit contenir au moins 8 caractères");
        }
        
        if (bindingResult.hasErrors()) {
            return "auth/inscription";
        }
        
        // Par défaut, on crée un citoyen
        utilisateur.setRole(Role.CITOYEN);
        utilisateurService.creerUtilisateur(utilisateur);
        
        return "redirect:/login?success=true";
    }
    
    @GetMapping("/")
    public String home() {
        return "redirect:/dashboard";
    }
    
    @GetMapping("/access-denied")
    public String accessDenied() {
        return "access-denied";
    }
}