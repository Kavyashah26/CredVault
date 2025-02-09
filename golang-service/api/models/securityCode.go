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
	utils.DB.AutoMigrate(&SecurityCode{})
}


func StoreCode(email, code string) error {
	expiration := time.Now().Add(15 * time.Minute) // Code expires in 15 minutes

	securityCode := SecurityCode{
		Email:     email,
		Code:      code,
		ExpiresAt: expiration,
	}

	return utils.DB.Create(&securityCode).Error
}


func GetStoredCode(email string) (*SecurityCode, error) {
	var securityCode SecurityCode
	result := utils.DB.Where("email = ?", email).First(&securityCode)
	return &securityCode, result.Error
}

func DeleteCode(email string) error {
	return utils.DB.Where("email = ?", email).Delete(&SecurityCode{}).Error
}
