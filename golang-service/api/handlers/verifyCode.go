package handlers

import (
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

	// Fetch stored code
	storedCode, err := models.GetStoredCode(req.Email)
	if err != nil || storedCode.Code != req.Code || time.Now().After(storedCode.ExpiresAt) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired code", "success": "false"})
		return
	}

	// Send success response immediately
	c.JSON(http.StatusOK, gin.H{"message": "Code verified successfully!", "success": "true"})

	// Delete code asynchronously to avoid blocking response
	go func() {
		if err := models.DeleteCode(req.Email); err != nil {
			log.Println("Failed to delete security code:", err)
		}
	}()
}
