package handler

import (
	"log"
	"net/http"


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

