package dto;

public class ForgotPasswordRequest {
    private String email;
    
    // Constructeur par défaut
    public ForgotPasswordRequest() {
    }
    
    // Constructeur avec paramètres
    public ForgotPasswordRequest(String email) {
        this.email = email;
    }
    
    // Getters et Setters
    public String getEmail() { 
        return email; 
    }
    
    public void setEmail(String email) { 
        this.email = email; 
    }
    
    // Méthode toString pour le débogage
    @Override
    public String toString() {
        return "ForgotPasswordRequest{" +
                "email='" + email + '\'' +
                '}';
    }
}