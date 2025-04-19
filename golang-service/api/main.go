package handler

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"golang-service/api/handlers"
	// "golang-service/api/models"
	"golang-service/api/utils"
)

func InitializeRouter() *gin.Engine {
	router := gin.Default()

	// Custom CORS configuration
	config := cors.Config{
		AllowOrigins:     []string{"https://cred-vault.vercel.app/", "http://localhost:3000" , "hhtps://api.credvaut.xyz"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}

	router.Use(cors.New(config))

	router.POST("/api/send-code", handlers.SendCodeHandler)
	router.POST("/api/verify-code", handlers.VerifyCodeHandler)
	router.GET("/api/health", handlers.HealthCheck)
	router.POST("/api/invites/send", handlers.SendInviteHandler)
	router.POST("/api/invites/accept", handlers.AcceptInviteHandler)

	return router
}
var redisInitialized bool

func init() {
	if !redisInitialized {
		if gin.Mode() != gin.ReleaseMode {
			if err := godotenv.Load(); err != nil {
				log.Println("Error loading .env file, proceeding with system environment variables")
			}
		}
		utils.InitRedis()
		redisInitialized = true
	}
}

func Handler(w http.ResponseWriter, r *http.Request) {
	// if err := godotenv.Load(); err != nil {
	// 	log.Println("Error loading .env file, proceeding with system environment variables")
	// }
	// // utils.ConnectDB()
	// // models.MigrateDB()
	// utils.InitRedis()
	// defer utils.CloseRedis()

	router := InitializeRouter()
	router.ServeHTTP(w, r)
}

// func main() {
// 	// Load environment variables
// 	if err := godotenv.Load(); err != nil {
// 		log.Println("Error loading .env file, using system environment variables")
// 	}

// 	// Connect to the database
// 	utils.ConnectDB()

// 	// Run migrations
// 	models.MigrateDB()

// 	// Start Gin server
// 	r := InitializeRouter()
// 	log.Println("Server running on port 8080")
// 	r.Run(":8080")
// }

// package main

// import (
// 	"golang-service/api/handlers"
// 	"golang-service/api/utils"
// 	"log"

// 	"github.com/gin-gonic/gin"
// 	"github.com/joho/godotenv"
// )

// func main() {
// 	// Load .env file
// 	if err := godotenv.Load(); err != nil {
// 		log.Fatal("Error loading .env file")
// 	}

// 	// Initialize Redis
// 	utils.InitRedis()
// 	defer utils.CloseRedis() // Close Redis on shutdown

// 	r := gin.Default()

// 	// Define routes
// 	r.GET("/health", handlers.HealthCheck)
	
// 	r.POST("/api/invites/send", handlers.SendInviteHandler)
// 	r.POST("/api/invites/accept", handlers.AcceptInviteHandler)
	
// 	r.POST("/api/send-code", handlers.SendCodeHandler)
// 	r.POST("/api/verify-code", handlers.VerifyCodeHandler)
// 	r.GET("/api/health", handlers.HealthCheck)
// 	r.Run(":8080") // Start server
// }
