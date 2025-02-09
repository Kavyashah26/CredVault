package handlers

import (
	"github.com/gin-gonic/gin"
	"golang-service/api/models"
	"golang-service/api/utils"
	"net/http"
)

type SendCodeRequest struct {
	Email string `json:"email" binding:"required,email"`
}

func SendCode(c *gin.Context) {
	var req SendCodeRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Generate the security code
	code := utils.GenerateSecurityCode()

	// Send the email
	if err := utils.SendEmail(req.Email, code); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email"})
		return
	}

	if err := models.StoreCode(req.Email, code); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to store security code"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Security code sent!"})
}
