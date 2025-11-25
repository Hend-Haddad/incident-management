package com.smartcity.incident_management;

import com.smartcity.incident_management.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import javax.annotation.PostConstruct;

@SpringBootApplication
public class IncidentManagement1Application {
    
    private final UtilisateurService utilisateurService;

    // Injection par constructeur
    @Autowired
    public IncidentManagement1Application(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    public static void main(String[] args) {
        SpringApplication.run(IncidentManagement1Application.class, args);
    }

    @PostConstruct
    public void init() {
        System.out.println("🚀 Démarrage de l'application - Vérification du compte admin...");
        utilisateurService.initialiserAdminParDefaut();
        System.out.println("✅ Initialisation terminée");
    }
}