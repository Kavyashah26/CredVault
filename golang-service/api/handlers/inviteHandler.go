package handlers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"

	"golang-service/api/services"
	"golang-service/api/utils"

	"github.com/gin-gonic/gin"
)

func SendInviteHandler(c *gin.Context) {
	var request struct {
		OrgID   string   `json:"orgId" binding:"required"`
		Emails  []string `json:"emails" binding:"required"`
		Message string   `json:"message"` // Custom message (optional)
	}

	// Validate request body
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request payload",
			"error":   err.Error(),
		})
		return
	}

	// // ✅ Immediate success response (ensures faster response time)
	// c.JSON(http.StatusAccepted, gin.H{
	// 	"success": true,
	// 	"message": "Invites are being processed.",
	// })

	// // ✅ Process the invites asynchronously
	// go func() {
	// 	// for _, email := range request.Emails {
	// 		err := services.SendInvites(request.OrgID, request.Emails, request.Message)
	// 		if err != nil {
	// 			log.Printf("Error sending invites: %v", err)
	// 		} else {
	// 			log.Printf("Invites sent successfully for OrgID: %s", request.OrgID)
	// 		}
	// 	// }
	// }()
	err := services.SendInvites(request.OrgID, request.Emails, request.Message)
	if err != nil {
		log.Printf("Error sending invites: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to send some or all invites.",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Invites sent successfully.",
	})
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
