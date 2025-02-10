package handlers

import (
	"net/http"
	"golang-service/api/utils"
	"github.com/gin-gonic/gin"
)

func HealthCheck(c *gin.Context) {
	db := utils.GetDB()

	// Extract *sql.DB from Gorm to ping the database
	sqlDB, err := db.DB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "Failed to get database instance",
			"details": err.Error(),
		})
		return
	}

	if err := sqlDB.Ping(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "Database connection failed",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "Service and database are healthy"})
}
