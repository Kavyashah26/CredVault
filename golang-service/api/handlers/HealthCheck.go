package handlers

import (
	"context"
	"golang-service/api/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// func HealthCheck(c *gin.Context) {
// 	db := utils.GetDB()

// 	// Extract *sql.DB from Gorm to ping the database
// 	sqlDB, err := db.DB()
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"status":  "Failed to get database instance",
// 			"details": err.Error(),
// 		})
// 		return
// 	}

// 	if err := sqlDB.Ping(); err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"status":  "Database connection failed",
// 			"details": err.Error(),
// 		})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"status": "Service and database are healthy"})
// }

func HealthCheck(c *gin.Context) {
	redisClient := utils.GetRedis()
	ctx := context.Background()

	if err := redisClient.Ping(ctx).Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "Redis connection failed", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "Service and Redis are healthy"})
}
