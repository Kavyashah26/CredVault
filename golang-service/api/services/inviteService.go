package services

import (
	"log"

	"golang-service/api/models"
	"golang-service/api/utils"
)

// SendInvites sends invites to multiple users
func SendInvites(orgID string, emails []string,message string) error {
	for _, email := range emails {
		token := utils.GenerateToken() // Generate a unique token
		err := models.StoreInvite(orgID, email, token)
		if err != nil {
			log.Printf("Failed to send invite to %s: %v", email, err)
			continue
		}
		utils.SendInviteEmail(email, token,message)
	}
	return nil
}

// AcceptInvite marks an invite as accepted
func AcceptInvite(token string) error {
	return models.AcceptInvite(token)
}
