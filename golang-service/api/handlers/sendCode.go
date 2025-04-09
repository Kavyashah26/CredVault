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

// func SendCode(c *gin.Context) {
// 	var req SendCodeRequest

// 	if err := c.ShouldBindJSON(&req); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
// 		return
// 	}

// 	// Generate the security code
// 	code := utils.GenerateSecurityCode()

// 	// Send immediate response to the user
// 	c.JSON(http.StatusOK, gin.H{"message": "Security code is being sent!"})

// 	// Handle email sending and database storing in a goroutine
// 	go func() {
// 		if err := utils.SendEmail(req.Email, code); err != nil {
// 			// Log the error or handle silently
// 			return
// 		}

// 		if err := models.StoreCode(req.Email, code); err != nil {
// 			// Log the error or handle silently
// 			return
// 		}
// 	}()
// }

// func SendCode(c *gin.Context) {
// 	var req SendCodeRequest

// 	if err := c.ShouldBindJSON(&req); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
// 		return
// 	}

// 	// Generate security code
// 	code := utils.GenerateSecurityCode()

// 	// ✅ **Send early response to the user**
// 	c.JSON(http.StatusOK, gin.H{"message": "Security code is being sent!"})

// 	// ✅ **Process email sending and DB storage asynchronously**
// 	go func(email, code string) {
// 		errChan := make(chan error, 2) // Buffered channel to handle errors

// 		go func() {
// 			if err := utils.SendEmail(email, code); err != nil {
// 				errChan <- fmt.Errorf("Failed to send email: %v", err)
// 			} else {
// 				errChan <- nil
// 			}
// 		}()

// 		go func() {
// 			if err := models.StoreCode(email, code); err != nil {
// 				errChan <- fmt.Errorf("Failed to store code: %v", err)
// 			} else {
// 				errChan <- nil
// 			}
// 		}()

// 		// Log any errors without blocking execution
// 		for i := 0; i < 2; i++ {
// 			if err := <-errChan; err != nil {
// 				log.Println(err)
// 			}
// 		}
// 	}(req.Email, code)
// }

func SendCodeHandler(c *gin.Context) {
	var request struct {
		Email string `json:"email" binding:"required,email"`
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

	// Generate security code
	code := utils.GenerateSecurityCode()

	// Store code in Redis with a 10-minute expiration
	key := fmt.Sprintf("security_code:%s", request.Email)
	if err := redisClient.Set(ctx, key, code, 10*time.Minute).Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to store security code",
			"error":   err.Error(),
		})
		return
	}

	// Send email asynchronously
	// go func(email, code string) {
	// 	if err := utils.SendEmail(email, code); err != nil {
	// 		log.Printf("Failed to send email: %v", err)
	// 	}
	// }(request.Email, code)

	if err := utils.SendEmail(request.Email, code); err != nil {
		log.Printf("Failed to send email to %s: %v", request.Email, err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to send email",
			"error":   err.Error(),
		})
		return
	}

	// Return success response immediately
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Security code sent successfully",
	})
}


