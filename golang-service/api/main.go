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

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file, proceeding with system environment variables")
	}

	utils.ConnectDB()
	models.MigrateDB()

	router := gin.Default()

	router.POST("/api/send-code", handlers.SendCode)
	router.POST("/api/verify-code", handlers.VerifyCode)

	http.Handle("/", router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
