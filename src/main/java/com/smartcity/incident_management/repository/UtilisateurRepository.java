package com.smartcity.incident_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartcity.incident_management.Role;
import com.smartcity.incident_management.Utilisateur;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByRole(Role role);

    List<Utilisateur> findByRole(Role role);
   
    List<Utilisateur> findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(
            String nom, String prenom);
}
