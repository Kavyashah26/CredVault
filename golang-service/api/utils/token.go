package utils

import (
	"crypto/rand"
	"encoding/hex"
)

// GenerateToken creates a random 32-character token
func GenerateToken() string {
	bytes := make([]byte, 16)
	_, err := rand.Read(bytes)
	if err != nil {
		return ""
	}
	return hex.EncodeToString(bytes)
}
