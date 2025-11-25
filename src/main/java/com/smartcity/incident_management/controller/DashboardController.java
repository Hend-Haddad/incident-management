package com.smartcity.incident_management.controller;



import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String role = auth.getAuthorities().iterator().next().getAuthority();
        
        model.addAttribute("username", auth.getName());
        model.addAttribute("role", role);
        
        // Redirection selon le rôle
        if (role.equals("ROLE_ADMINISTRATEUR")) {
            return "redirect:/admin/dashboard";
        } else if (role.equals("ROLE_AGENT_MUNICIPAL")) {
            return "redirect:/agent/dashboard";
        } else {
            return "redirect:/citoyen/dashboard";
        }
    }
    
    @GetMapping("/admin/dashboard")
    public String adminDashboard(Model model) {
        model.addAttribute("pageTitle", "Tableau de bord Administrateur");
        return "admin/dashboard";
    }
    
    @GetMapping("/agent/dashboard")
    public String agentDashboard(Model model) {
        model.addAttribute("pageTitle", "Tableau de bord Agent Municipal");
        return "agent/dashboard";
    }
    
    @GetMapping("/citoyen/dashboard")
    public String citoyenDashboard(Model model) {
        model.addAttribute("pageTitle", "Tableau de bord Citoyen");
        return "citoyen/dashboard";
    }
}
