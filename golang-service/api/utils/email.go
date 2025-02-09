package utils

import (
	"fmt"
	"math/rand"
	"net/smtp"
	"os"
	"time"
)

func GenerateSecurityCode() string {
	rand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("%06d", rand.Intn(1000000))
}

func SendEmail(recipient, code string) error {
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"
	sender := os.Getenv("EMAIL_USER")
	password := os.Getenv("EMAIL_PASS")

	auth := smtp.PlainAuth("", sender, password, smtpHost)

	subject := "Your Security Code"
	body := fmt.Sprintf("Here is your security code: %s", code)
	msg := []byte("Subject: " + subject + "\r\n\r\n" + body)

	return smtp.SendMail(smtpHost+":"+smtpPort, auth, sender, []string{recipient}, msg)
}
