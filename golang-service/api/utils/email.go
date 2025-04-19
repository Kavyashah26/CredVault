package utils

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"net/smtp"
	"os"
	"time"

	"github.com/resend/resend-go/v2"
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
		if err != nil {
			return fmt.Errorf("failed to send email: %w", err)
		}
		log.Printf("✅ Email sent successfully to %s", recipient) // Confirmation log
		return nil
	case <-time.After(8 * time.Second): // Timeout after 5s
		return fmt.Errorf("SMTP server took too long to respond")
	}
}

func SendEmailResend(recipient, code string) error {
	apiKey := os.Getenv("RESEND_API_KEY")
	if apiKey == "" {
		return fmt.Errorf("RESEND_API_KEY not set in environment")
	}

	client := resend.NewClient(apiKey)
	ctx := context.TODO()

	htmlTemplate := fmt.Sprintf(`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Verify your email</title>
	</head>
	<body style="background-color:#f5f5f5;color:#333;font-family:sans-serif">
		<div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 0 10px rgba(0,0,0,0.1)">
			<div style="background-color:#1a202c;padding:20px;text-align:center">
				<img src="%s" alt="CredVault" width="100" style="display:block;margin:0 auto" />
			</div>
			<div style="padding:30px">
				<h2 style="margin-top:0;color:#1a202c">Verify your device</h2>
				<p>
					Thanks for signing up with <strong>CredVault</strong>. To complete your registration, please verify your device by entering the code below.
				</p>
				<div style="text-align:center;margin:30px 0">
					<p style="margin:0;font-size:14px;font-weight:bold">Your verification code:</p>
					<p style="font-size:36px;margin:10px 0;font-weight:bold;letter-spacing:4px">%s</p>
					<p style="margin:0;font-size:12px;color:#666">(This code is valid for 10 minutes)</p>
				</div>
				<p style="font-size:14px;color:#666">If you didn't request this, you can safely ignore this email.</p>
			</div>
			<p style="font-size:12px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;margin:24px 0;padding:0 20px;margin-bottom:24px;margin-top:24px;margin-left:0;margin-right:0">
    This message was produced and distributed by CredVault, Inc., 1234 Vault St., New York, NY 10001. &copy; 2025, CredVault, Inc. All rights reserved. CredVault is a registered trademark of 
    <a href="https://www.credvault.xyz" style="color:#2754C5;text-decoration-line:none;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;font-size:14px;text-decoration:underline" target="_blank">CredVault.xyz</a>, Inc. View our 
    <a href="https://www.credvault.xyz/privacy-policy" style="color:#2754C5;text-decoration-line:none;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;font-size:14px;text-decoration:underline" target="_blank">privacy policy</a>.
</p>

<div style="padding:15px;text-align:center;font-size:12px;color:#999;background:#f0f0f0">
	© %d CredVault. All rights reserved.
</div>
		</div>
		
	</body>
	</html>
	`, os.Getenv("CREDVAULT_LOGO"),code, time.Now().Year())

	params := &resend.SendEmailRequest{
		From:    "CredVault <noreply@credvault.xyz>",
		To:      []string{recipient},
		Subject: "Your CredVault Verification Code",
		Html:    htmlTemplate,
	}

	sent, err := client.Emails.SendWithContext(ctx, params)
	if err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}

	fmt.Printf("✅ Email sent successfully! Message ID: %s\n", sent.Id)
	return nil
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

func SendInviteEmail(email, token, Customemessage string) error {
	// SMTP settings
	sender := os.Getenv("EMAIL_USER")
	password := os.Getenv("EMAIL_PASS")
	to := email
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Email headers and body
	subject := "Subject: Invitation to Join Organization\n"
	contentType := "MIME-version: 1.0;\nContent-Type: text/plain; charset=\"UTF-8\";\n\n"
	body := fmt.Sprintf("%s\n\nClick the link to accept the invite: https://api.credvault.xyz/api/organizations/accept-invite/%s", Customemessage, token)

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
