package handlers

import (
	"github.com/gin-gonic/gin"
	"golang-service/api/models"
	"net/http"
	"time"
)


type VerifyCodeRequest struct {
	Email string `json:"email" binding:"required,email"`
	Code  string `json:"code" binding:"required"`
}

func VerifyCode(c *gin.Context) {
	var req VerifyCodeRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	storedCode, err := models.GetStoredCode(req.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired code"})
		return
	}

	// Check if the code matches and hasn't expired
	if storedCode.Code != req.Code || time.Now().After(storedCode.ExpiresAt) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired code"})
		return
	}

	// Delete the code after successful verification
	if err := models.DeleteCode(req.Email); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete security code"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Code verified successfully!"})
}
