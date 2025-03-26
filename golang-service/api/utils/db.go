// package utils

// import (
// 	"fmt"
// 	"log"
// 	"os"

// 	"gorm.io/driver/postgres"
// 	"gorm.io/gorm"
// )

// var DB *gorm.DB

// func ConnectDB() {
// 	dsn := os.Getenv("DATABASE_URL")
// 	if dsn == "" {
// 		log.Fatal("DATABASE_URL is not set in the environment variables")
// 	}

// 	var err error
// 	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
// 	if err != nil {
// 		log.Fatalf("Failed to connect to the database: %v", err)
// 	}

// 	fmt.Println("Connected to PostgreSQL successfully!")
// }

// func GetDB() *gorm.DB {
// 	return DB
// }

package utils

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL is not set in the environment variables")
	}

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn), // Reduce logging overhead
	})
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	// Get underlying SQL database connection
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatalf("Failed to get database connection: %v", err)
	}

	// Configure connection pooling
	sqlDB.SetMaxOpenConns(20)                 // Max number of open connections
	sqlDB.SetMaxIdleConns(10)                 // Max idle connections
	sqlDB.SetConnMaxLifetime(30 * time.Minute) // Max connection lifetime
	sqlDB.SetConnMaxIdleTime(10 * time.Minute) // Max idle time before closing

	fmt.Println("Connected to PostgreSQL successfully with connection pooling!")
}

func GetDB() *gorm.DB {
	return DB
}
