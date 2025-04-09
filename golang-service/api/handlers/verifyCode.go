package handlers

import (
	"context"
	"fmt"
	"golang-service/api/utils"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)


type VerifyCodeRequest struct {
	Email string `json:"email" binding:"required,email"`
	Code  string `json:"code" binding:"required"`
}

func VerifyCodeHandler(c *gin.Context) {
	var request struct {
		Email string `json:"email" binding:"required,email"`
		Code  string `json:"code" binding:"required"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request payload",
			"error":   err.Error(),
		})
		return
	}
	log.Printf("Received code verification request for email: %s", request.Email)

	redisClient := utils.GetRedis()
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	// Fetch stored security code from Redis
	key := fmt.Sprintf("security_code:%s", request.Email)
	storedCode, err := redisClient.Get(ctx, key).Result()
	log.Printf("Saved code is: %s", storedCode)
	log.Printf("Received code is: %s", request.Code)
	// Check if the code is valid or expired
	if err != nil || storedCode != request.Code {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid or expired code",
		})
		return
	}

	// ✅ Code verified successfully
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Code verified successfully!",
	})

	// Delete the code asynchronously after successful verification
	go func(email string) {
		delCtx, delCancel := context.WithTimeout(context.Background(), 3*time.Second)
		defer delCancel()

		if err := redisClient.Del(delCtx, key).Err(); err != nil {
			log.Println("Failed to delete security code:", err)
		}
	}(request.Email)
}
