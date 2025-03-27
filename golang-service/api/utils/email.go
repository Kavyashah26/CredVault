package utils

import (
	"fmt"
	"log"
	"math/rand"
	"net/smtp"
	"os"
	"time"
)

func GenerateSecurityCode() string {
	rand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("%06d", rand.Intn(1000000))
}

// func SendEmail(recipient, code string) error {
// 	smtpHost := "smtp.gmail.com"
// 	smtpPort := "587"
// 	sender := os.Getenv("EMAIL_USER")
// 	password := os.Getenv("EMAIL_PASS")

// 	auth := smtp.PlainAuth("", sender, password, smtpHost)

// 	subject := "Your Security Code"
// 	body := fmt.Sprintf("Here is your security code: %s", code)
// 	msg := []byte("Subject: " + subject + "\r\n\r\n" + body)

// 	return smtp.SendMail(smtpHost+":"+smtpPort, auth, sender, []string{recipient}, msg)
// }

func SendEmail(recipient, code string) error {
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"
	sender := os.Getenv("EMAIL_USER")
	password := os.Getenv("EMAIL_PASS")

	auth := smtp.PlainAuth("", sender, password, smtpHost)

	subject := "Your Security Code"
	body := fmt.Sprintf("Here is your security code: %s", code)
	msg := []byte("Subject: " + subject + "\r\n\r\n" + body)

	// ✅ Set timeout for SMTP to prevent hanging
	errChan := make(chan error, 1)
	go func() {
		errChan <- smtp.SendMail(smtpHost+":"+smtpPort, auth, sender, []string{recipient}, msg)
	}()

	select {
	case err := <-errChan:
		return err
	case <-time.After(5 * time.Second): // Timeout after 5s
		return fmt.Errorf("SMTP server took too long to respond")
	}
}

// func SendInviteEmail(email, token string) {
// 	// SMTP settings
// 	sender := os.Getenv("EMAIL_USER")
// 	password := os.Getenv("EMAIL_PASS")
// 	to := email
// 	smtpHost := "smtp.gmail.com"
// 	smtpPort := "587"

// 	// Email body
// 	body := fmt.Sprintf("Click the link to accept the invite: https://your-app.com/invite/%s", token)

// 	// Set up authentication
// 	auth := smtp.PlainAuth("", sender, password, smtpHost)

// 	// Send email
// 	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, sender, []string{to}, []byte(body))
// 	if err != nil {
// 		log.Printf("Failed to send email to %s: %v", email, err)
// 	}
// }

func SendInviteEmail(email, token,Customemessage string) error{
	// SMTP settings
	sender := os.Getenv("EMAIL_USER")
	password := os.Getenv("EMAIL_PASS")
	to := email
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Email headers and body
	subject := "Subject: Invitation to Join Organization\n"
	contentType := "MIME-version: 1.0;\nContent-Type: text/plain; charset=\"UTF-8\";\n\n"
	body := fmt.Sprintf("%s\n\nClick the link to accept the invite: http://localhost:5000/api/organizations/accept-invite/%s", Customemessage,token)
	
	// Combine headers and body
	message := []byte(subject + contentType + "\n" + body)

	// Set up authentication
	auth := smtp.PlainAuth("", sender, password, smtpHost)

	// Send email
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, sender, []string{to}, message)
	if err != nil {
		log.Printf("Failed to send email to %s: %v", email, err)
		return err
	} else {
		log.Printf("Invite email sent successfully to %s", email)
		return nil
	}
}
