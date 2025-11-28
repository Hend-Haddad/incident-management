package dto;

public class ResetPasswordRequest {
    private String newPassword;
    private String confirmPassword;
    
    // Constructeur par défaut
    public ResetPasswordRequest() {
    }
    
    // Constructeur avec paramètres
    public ResetPasswordRequest(String newPassword, String confirmPassword) {
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }
    
    // Getters et Setters
    public String getNewPassword() { 
        return newPassword; 
    }
    
    public void setNewPassword(String newPassword) { 
        this.newPassword = newPassword; 
    }
    
    public String getConfirmPassword() { 
        return confirmPassword; 
    }
    
    public void setConfirmPassword(String confirmPassword) { 
        this.confirmPassword = confirmPassword; 
    }
    
    // Méthode utilitaire pour vérifier si les mots de passe correspondent
    public boolean passwordsMatch() {
        return newPassword != null && newPassword.equals(confirmPassword);
    }
    
    // Méthode utilitaire pour vérifier la longueur du mot de passe
    public boolean isPasswordValid() {
        return newPassword != null && newPassword.length() >= 6;
    }
    
    // Méthode toString pour le débogage
    @Override
    public String toString() {
        return "ResetPasswordRequest{" +
                "newPassword='[PROTECTED]'" +
                ", confirmPassword='[PROTECTED]'" +
                '}';
    }
}