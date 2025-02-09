package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"golang-service/api/handlers"
	"golang-service/api/models"
	"golang-service/api/utils"
)

func InitializeRouter() *gin.Engine {
	router := gin.Default()
	router.POST("/api/send-code", handlers.SendCode)
	router.POST("/api/verify-code", handlers.VerifyCode)
	return router
}

func Handler(w http.ResponseWriter, r *http.Request) {
	if err := godotenv.Load(); err != nil {
		log.Println("Error loading .env file, proceeding with system environment variables")
	}

	utils.ConnectDB()
	models.MigrateDB()

	router := InitializeRouter()
	router.ServeHTTP(w, r)
}

// For local development, we still use the main() function
func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)

	// Use the same router for local development
	router := InitializeRouter()

	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
