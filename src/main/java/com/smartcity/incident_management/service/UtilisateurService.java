package com.smartcity.incident_management.service;

import com.smartcity.incident_management.Role;
import com.smartcity.incident_management.Utilisateur;
import com.smartcity.incident_management.repository.UtilisateurRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Créer un utilisateur
    public Utilisateur creerUtilisateur(Utilisateur utilisateur) {

        if (utilisateurRepository.existsByEmail(utilisateur.getEmail())) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà");
        }

        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        utilisateur.setActif(true);

        return utilisateurRepository.save(utilisateur);
    }

    // Créer un citoyen
    public Utilisateur creerCitoyen(String nom, String prenom, String email, String motDePasse, String telephone) {
        Utilisateur u = new Utilisateur(nom, prenom, email, motDePasse, Role.CITOYEN);
        u.setTelephone(telephone);
        return creerUtilisateur(u);
    }

    // Créer un administrateur
    public Utilisateur creerAdministrateur(String nom, String prenom, String email, String motDePasse, String telephone) {
        Utilisateur admin = new Utilisateur(nom, prenom, email, motDePasse, Role.ADMINISTRATEUR);
        admin.setTelephone(telephone);
        return creerUtilisateur(admin);
    }

    // Créer un agent municipal
    public Utilisateur creerAgentMunicipal(String nom, String prenom, String email, String motDePasse, String telephone) {
        Utilisateur agent = new Utilisateur(nom, prenom, email, motDePasse, Role.AGENT_MUNICIPAL);
        agent.setTelephone(telephone);
        return creerUtilisateur(agent);
    }

    // Mettre à jour
    public Utilisateur mettreAJourUtilisateur(Long id, Utilisateur details) {

        Utilisateur u = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        u.setNom(details.getNom());
        u.setPrenom(details.getPrenom());
        u.setTelephone(details.getTelephone());

        if (details.getMotDePasse() != null && !details.getMotDePasse().isEmpty()) {
            u.setMotDePasse(passwordEncoder.encode(details.getMotDePasse()));
        }

        return utilisateurRepository.save(u);
    }

    // Récupération
    public Optional<Utilisateur> trouverParId(Long id) { return utilisateurRepository.findById(id); }

    public Optional<Utilisateur> trouverParEmail(String email) { return utilisateurRepository.findByEmail(email); }

    public boolean emailExiste(String email) { return utilisateurRepository.existsByEmail(email); }

    public List<Utilisateur> trouverTous() { return utilisateurRepository.findAll(); }

    public List<Utilisateur> trouverParRole(Role role) { return utilisateurRepository.findByRole(role); }

    public List<Utilisateur> rechercherParNom(String r) {
        return utilisateurRepository.findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(r, r);
    }

    // Activation / désactivation
    public void desactiverUtilisateur(Long id) {
        Utilisateur u = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        u.setActif(false);
        utilisateurRepository.save(u);
    }

    public void activerUtilisateur(Long id) {
        Utilisateur u = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        u.setActif(true);
        utilisateurRepository.save(u);
    }

    public void changerRoleUtilisateur(Long id, Role role) {
        Utilisateur u = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        u.setRole(role);
        utilisateurRepository.save(u);
    }

    // Login
    public boolean verifierIdentifiants(String email, String motDePasse) {
        Optional<Utilisateur> opt = utilisateurRepository.findByEmail(email);

        if (opt.isPresent()) {
            Utilisateur u = opt.get();
            return u.isActif() && passwordEncoder.matches(motDePasse, u.getMotDePasse());
        }
        return false;
    }
    
    
    
    

    public void supprimerUtilisateur(Long id) {
        if (!utilisateurRepository.existsById(id)) {
            throw new RuntimeException("Utilisateur non trouvé");
        }
        utilisateurRepository.deleteById(id);
    }

    public String obtenirStatistiques() {
        long total = utilisateurRepository.count();
        long citoyens = utilisateurRepository.countByRole(Role.CITOYEN);
        long agents = utilisateurRepository.countByRole(Role.AGENT_MUNICIPAL);
        long admins = utilisateurRepository.countByRole(Role.ADMINISTRATEUR);

        return "Total: " + total + " | Citoyens: " + citoyens + " | Agents: " + agents + " | Admins: " + admins;
    }

    // Méthode utilitaire pour créer un admin rapidement
    public void initialiserAdminParDefaut() {
        String emailAdmin = "admin@ville-intelligente.com";
        if (!emailExiste(emailAdmin)) {
            creerAdministrateur(
                "Administrateur", 
                "System", 
                emailAdmin, 
                "admin123", 
                "99999999"
            );
            System.out.println("🔄 Compte administrateur initialisé");
        }
    }
}