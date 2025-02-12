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

// func SendCode(c *gin.Context) {
// 	var req SendCodeRequest

// 	if err := c.ShouldBindJSON(&req); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
// 		return
// 	}

// 	// Generate the security code
// 	code := utils.GenerateSecurityCode()

// 	// Send the email
// 	if err := utils.SendEmail(req.Email, code); err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email"})
// 		return
// 	}

// 	if err := models.StoreCode(req.Email, code); err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"error":   "Failed to store security code",
// 			"details": err.Error(),
// 		})
// 		return
// 	}
	

// 	c.JSON(http.StatusOK, gin.H{"message": "Security code sent!"})
// }

// func SendCode(c *gin.Context) {
// 	var req SendCodeRequest

// 	if err := c.ShouldBindJSON(&req); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
// 		return
// 	}

// 	// Generate the security code
// 	code := utils.GenerateSecurityCode()

// 	// Store the code in DB first
// 	if err := models.StoreCode(req.Email, code); err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"error":   "Failed to store security code",
// 			"details": err.Error(),
// 		})
// 		return
// 	}

// 	// Send email asynchronously
// 	go func(email, code string) {
// 		if err := utils.SendEmail(email, code); err != nil {
// 			utils.LogError("Failed to send email: ", err)
// 		}
// 	}(req.Email, code)

// 	c.JSON(http.StatusOK, gin.H{"message": "Security code sent!"})
// }

// package handlers

// import (
// 	"github.com/gin-gonic/gin"
// 	"golang-service/api/models"
// 	"golang-service/api/utils"
// 	"net/http"
// )

// type SendCodeRequest struct {
// 	Email string `json:"email" binding:"required,email"`
// }

func SendCode(c *gin.Context) {
	var req SendCodeRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Generate the security code
	code := utils.GenerateSecurityCode()

	// Send immediate response to the user
	c.JSON(http.StatusOK, gin.H{"message": "Security code is being sent!"})

	// Handle email sending and database storing in a goroutine
	go func() {
		if err := utils.SendEmail(req.Email, code); err != nil {
			// Log the error or handle silently
			return
		}

		if err := models.StoreCode(req.Email, code); err != nil {
			// Log the error or handle silently
			return
		}
	}()
}

