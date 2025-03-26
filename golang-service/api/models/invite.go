package models

import (
	"time"
	"golang-service/api/utils"
)

// Invite represents an organization invite
type Invite struct {
	ID        uint      `gorm:"primaryKey"`
	OrgID     string    `gorm:"not null"`
	Email     string    `gorm:"uniqueIndex;not null"`
	Token     string    `gorm:"not null"`
	Status    string    `gorm:"default:'Pending'"` // Possible: Pending, Accepted, Rejected
	CreatedAt time.Time `gorm:"autoCreateTime"`
	ExpiresAt time.Time
}


// StoreInvite stores or updates an invite
// func StoreInvite(orgID, email, token string) error {
// 	expiration := time.Now().Add(48 * time.Hour) // Expires in 48 hours

// 	var invite Invite
// 	result := utils.DB.Where("email = ?", email).First(&invite)

// 	if result.Error == nil {
// 		// Invite exists, update token and expiration
// 		invite.Token = token
// 		invite.ExpiresAt = expiration
// 		invite.Status = "Pending"
// 		return utils.DB.Save(&invite).Error
// 	}

// 	if result.Error != nil && result.Error.Error() == "record not found" {
// 		// Create new invite
// 		newInvite := Invite{
// 			OrgID:     orgID,
// 			Email:     email,
// 			Token:     token,
// 			Status:    "Pending",
// 			ExpiresAt: expiration,
// 		}
// 		return utils.DB.Create(&newInvite).Error
// 	}

// 	return result.Error
// }

func StoreInvite(orgID, email, token string) error {
	expiration := time.Now().Add(48 * time.Hour) // Expires in 48 hours

	invite := Invite{
		OrgID:     orgID,
		Email:     email,
		Token:     token,
		Status:    "Pending",
		ExpiresAt: expiration,
	}

	// Use FirstOrCreate with Assign to avoid separate select/update queries
	return utils.DB.Where("email = ?", email).
		Assign(map[string]interface{}{
			"Token":     token,
			"ExpiresAt": expiration,
			"Status":    "Pending",
		}).
		FirstOrCreate(&invite).Error
}

// GetInvite retrieves an invite by email
func GetInvite(email string) (*Invite, error) {
	var invite Invite
	result := utils.DB.Where("email = ?", email).First(&invite)
	return &invite, result.Error
}

// AcceptInvite updates the invite status to "Accepted"
func AcceptInvite(token string) error {
	var invite Invite

	// Find invite by token
	if err := utils.DB.Where("token = ?", token).First(&invite).Error; err != nil {
		return err
	}

	// Update invite status
	invite.Status = "Accepted"
	invite.ExpiresAt = time.Now() // Mark invite as used

	return utils.DB.Save(&invite).Error
}

// DeleteExpiredInvites removes expired invites
func DeleteExpiredInvites() error {
	return utils.DB.Where("expires_at < ?", time.Now()).Delete(&Invite{}).Error
}
