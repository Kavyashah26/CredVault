package services

import (
	"context"
	"fmt"
	"log"
	"time"

	// "golang-service/api/models"
	"golang-service/api/utils"
)

// SendInvites sends invites to multiple users
// func SendInvites(orgID string, emails []string,message string) error {
// 	for _, email := range emails {
// 		token := utils.GenerateToken() // Generate a unique token
// 		err := models.StoreInvite(orgID, email, token)
// 		if err != nil {
// 			log.Printf("Failed to send invite to %s: %v", email, err)
// 			continue
// 		}
// 		utils.SendInviteEmail(email, token,message)
// 	}
// 	return nil
// }

func SendInvites(orgID string, emails []string, message string) error {
	redisClient := utils.GetRedis()
	ctx := context.Background()

	for _, email := range emails {
		token := utils.GenerateToken() // Generate token

		// Store in Redis (expires in 1 hour)
		err := redisClient.Set(ctx, fmt.Sprintf("invite:%s", token), orgID, time.Hour).Err()
		if err != nil {
			log.Printf("Failed to store invite token in Redis: %v", err)
			continue
		}

		utils.SendInviteEmail(email, token, message)
	}
	return nil
}
// AcceptInvite marks an invite as accepted
// func AcceptInvite(token string) error {
// 	return models.AcceptInvite(token)
// }

func AcceptInvite(token string) error {
	redisClient := utils.GetRedis()
	ctx := context.Background()

	// Retrieve Org ID from Redis
	orgID, err := redisClient.Get(ctx, fmt.Sprintf("invite:%s", token)).Result()
	if err != nil {
		return fmt.Errorf("invalid or expired invite")
	}

	// Delete invite after accepting
	redisClient.Del(ctx, fmt.Sprintf("invite:%s", token))

	log.Printf("Invite accepted for OrgID: %s", orgID)
	return nil
}
