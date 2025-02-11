package handler

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"golang-service/api/handlers"
	"golang-service/api/models"
	"golang-service/api/utils"
)

func InitializeRouter() *gin.Engine {
	router := gin.Default()

	// Custom CORS configuration
	config := cors.Config{
		AllowOrigins:     []string{"https://cred-vault.vercel.app/", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}

	router.Use(cors.New(config))

	router.POST("/api/send-code", handlers.SendCode)
	router.POST("/api/verify-code", handlers.VerifyCode)
	router.GET("/api/health", handlers.HealthCheck)

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

