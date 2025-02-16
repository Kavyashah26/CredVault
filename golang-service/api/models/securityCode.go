package models

import (
	"time"
	"golang-service/api/utils"
)

type SecurityCode struct {
	ID        uint      `gorm:"primaryKey"`
	Email     string    `gorm:"uniqueIndex;not null"`
	Code      string    `gorm:"not null"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	ExpiresAt time.Time
}


func MigrateDB() {
	utils.DB.AutoMigrate(&SecurityCode{},&Invite{})
}


func StoreCode(email, code string) error {
	expiration := time.Now().Add(15 * time.Minute) // Code expires in 15 minutes

	var securityCode SecurityCode
	result := utils.DB.Where("email = ?", email).First(&securityCode)

	if result.Error == nil {
		// Record exists, update the code and expiration time
		securityCode.Code = code
		securityCode.ExpiresAt = expiration
		return utils.DB.Save(&securityCode).Error
	}

	if result.Error != nil && result.Error.Error() == "record not found" {
		// No existing record, insert a new one
		newCode := SecurityCode{
			Email:     email,
			Code:      code,
			ExpiresAt: expiration,
		}
		return utils.DB.Create(&newCode).Error
	}

	return result.Error
}


func GetStoredCode(email string) (*SecurityCode, error) {
	var securityCode SecurityCode
	result := utils.DB.Where("email = ?", email).First(&securityCode)
	return &securityCode, result.Error
}

func DeleteCode(email string) error {
	return utils.DB.Where("email = ?", email).Delete(&SecurityCode{}).Error
}
