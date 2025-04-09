package services

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"golang-service/api/utils"

	"github.com/gin-gonic/gin"
)

func SendInvites(orgID string, emails []string, message string) error {
	redisClient := utils.GetRedis()
	ctx := context.Background()

	var wg sync.WaitGroup
	var mu sync.Mutex
	var sendErrs []string
	
	for _, email := range emails {
		token := utils.GenerateToken() // Generate a unique token

		// Store in Redis (expires in 1 hour) -> Store as "orgID|email"
		err := redisClient.Set(ctx, fmt.Sprintf("invite:%s", token), fmt.Sprintf("%s|%s", orgID, email), time.Hour).Err()
		if err != nil {
			log.Printf("Failed to store invite token in Redis: %v", err)
			continue
		}

		wg.Add(1)

		// Send email with invite token
		// utils.SendInviteEmail(email, token, message)
		go func(email, token string) {
			defer wg.Done()
			err:=utils.SendInviteEmail(email, token, message);
			if err != nil {
				log.Printf("Failed to send email to %s: %v", email, err)
				mu.Lock()
				sendErrs = append(sendErrs, fmt.Sprintf("Failed to send to %s", email))
				mu.Unlock()
			} else {
				log.Printf("📩 Invite email sent successfully to %s", email)
			}
		}(email, token)
	}
	wg.Wait()

	if len(sendErrs) > 0 {
		return fmt.Errorf("some emails failed to send: %v", sendErrs)
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
