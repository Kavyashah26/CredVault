package handlers

import (
	"context"
	"golang-service/api/models"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)


type VerifyCodeRequest struct {
	Email string `json:"email" binding:"required,email"`
	Code  string `json:"code" binding:"required"`
}

// func VerifyCode(c *gin.Context) {
// 	var req VerifyCodeRequest

// 	if err := c.ShouldBindJSON(&req); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload","success":"false"})
// 		return
// 	}

// 	storedCode, err := models.GetStoredCode(req.Email)
// 	if err != nil {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired code","success":"false"})
// 		return
// 	}

// 	// Check if the code matches and hasn't expired
// 	if storedCode.Code != req.Code || time.Now().After(storedCode.ExpiresAt) {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired code","success":"false"})
// 		return
// 	}

// 	// Delete the code after successful verification
// 	if err := models.DeleteCode(req.Email); err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete security code","success":"false"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "Code verified successfully!","success":"true"})
// }

func VerifyCode(c *gin.Context) {
	var req VerifyCodeRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload", "success": "false"})
		return
	}

	// Fetch stored code with a timeout to prevent long DB waits
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	storedCode, err := models.GetStoredCodeWithContext(ctx, req.Email)
	if err != nil || storedCode.Code != req.Code || time.Now().After(storedCode.ExpiresAt) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired code", "success": "false"})
		return
	}

	// Respond immediately to the client
	c.JSON(http.StatusOK, gin.H{"message": "Code verified successfully!", "success": "true"})

	// Delete code asynchronously in the background
	go func(email string) {
		delCtx, delCancel := context.WithTimeout(context.Background(), 3*time.Second)
		defer delCancel()

		if err := models.DeleteCodeWithContext(delCtx, email); err != nil {
			log.Println("Failed to delete security code:", err)
		}
	}(req.Email)
}

