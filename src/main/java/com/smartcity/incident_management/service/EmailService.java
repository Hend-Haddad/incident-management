package com.smartcity.incident_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSenderImpl mailSender;
    
    public void sendVerificationCode(String toEmail, String verificationCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Code de vérification - Réinitialisation de mot de passe");
        message.setText("Bonjour,\n\n"
                + "Vous avez demandé à réinitialiser votre mot de passe.\n"
                + "Votre code de vérification est : " + verificationCode + "\n\n"
                + "Ce code expirera dans 15 minutes.\n\n"
                + "Cordialement,\nL'équipe Ville Intelligente");
        
        mailSender.send(message);
    }
}