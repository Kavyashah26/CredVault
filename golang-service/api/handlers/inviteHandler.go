package handlers

import (
	"log"
	"net/http"

	"golang-service/api/services"

	"github.com/gin-gonic/gin"
)


func SendInviteHandler(c *gin.Context) {
	var request struct {
		OrgID  string   `json:"orgId" binding:"required"`
		Emails []string `json:"emails" binding:"required"`
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

	// ✅ Immediate success response (ensures faster response time)
	c.JSON(http.StatusAccepted, gin.H{
		"success": true,
		"message": "Invites are being processed.",
	})

	// ✅ Process the invites asynchronously
	go func() {
		err := services.SendInvites(request.OrgID, request.Emails,request.Message)
		if err != nil {
			log.Printf("Failed to send invites: %v", err)
			// No c.JSON here (cannot send response again)
		} else {
			log.Printf("Invites sent successfully for OrgID: %s", request.OrgID)
		}
	}()
}


// AcceptInviteHandler accepts an invite using a token
func AcceptInviteHandler(c *gin.Context) {
	var request struct {
		Token string `json:"token" binding:"required"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(),"success": false})
		return
	}

	err := services.AcceptInvite(request.Token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid or expired invite","success": false,})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Invite accepted successfully","success": true})
}
