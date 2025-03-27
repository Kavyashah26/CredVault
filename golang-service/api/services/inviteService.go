package services

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"golang-service/api/utils"

	"github.com/gin-gonic/gin"
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

// func SendInvites(orgID string, emails []string, message string) error {
// 	redisClient := utils.GetRedis()
// 	ctx := context.Background()

// 	for _, email := range emails {
// 		token := utils.GenerateToken() // Generate token

// 		// Store in Redis (expires in 1 hour)
// 		err := redisClient.Set(ctx, fmt.Sprintf("invite:%s", token), orgID, time.Hour).Err()
// 		if err != nil {
// 			log.Printf("Failed to store invite token in Redis: %v", err)
// 			continue
// 		}

// 		utils.SendInviteEmail(email, token, message)
// 	}
// 	return nil
// }

// AcceptInvite marks an invite as accepted
// func AcceptInvite(token string) error {
// 	return models.AcceptInvite(token)
// }

// func AcceptInviteHandler(c *gin.Context) {
// 	var request struct {
// 		Token string json:"token" binding:"required"
// 	}

// 	if err := c.ShouldBindJSON(&request); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(),"success": false})
// 		return
// 	}

// 	err := services.AcceptInvite(request.Token)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid or expired invite","success": false,})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "Invite accepted successfully","success": true})
// }

func SendInvites(orgID string, emails []string, message string) error {
	redisClient := utils.GetRedis()
	ctx := context.Background()

	for _, email := range emails {
		token := utils.GenerateToken() // Generate a unique token

		// Store in Redis (expires in 1 hour) -> Store as "orgID|email"
		err := redisClient.Set(ctx, fmt.Sprintf("invite:%s", token), fmt.Sprintf("%s|%s", orgID, email), time.Hour).Err()
		if err != nil {
			log.Printf("Failed to store invite token in Redis: %v", err)
			continue
		}

		// Send email with invite token
		utils.SendInviteEmail(email, token, message)
	}
	return nil
}



func AcceptInviteHandler(c *gin.Context) {
	var request struct {
		Token string `json:"token" binding:"required"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request payload",
			"error":   err.Error(),
		})
		return
	}

	redisClient := utils.GetRedis()
	ctx := context.Background()

	// Retrieve invite details from Redis
	key := fmt.Sprintf("invite:%s", request.Token)
	data, err := redisClient.Get(ctx, key).Result()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Invalid or expired invite",
			"error":   err.Error(),
		})
		return
	}

	// Parse stored value "orgID|email"
	parts := strings.Split(data, "|")
	if len(parts) != 2 {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Corrupted invite data",
		})
		return
	}
	orgID, email := parts[0], parts[1]

	// Remove invite from Redis after acceptance
	redisClient.Del(ctx, key)

	// ✅ Return organization ID & user email
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Invite accepted successfully",
		"orgId":   orgID,
		"user":    email,
	})
}
