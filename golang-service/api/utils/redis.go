package utils

import (
	"context"
	"log"
	"os"

	"github.com/redis/go-redis/v9"
)

var RedisClient *redis.Client
var ctx = context.Background()

func InitRedis() {
	opt, err := redis.ParseURL(os.Getenv("UPSTASH_REDIS_URL"))
	if err != nil {
		log.Fatalf("Failed to parse Upstash Redis URL: %v", err)
	}

	RedisClient = redis.NewClient(opt)

	// Test Redis connection
	if err := RedisClient.Ping(ctx).Err(); err != nil {
		log.Fatalf("Failed to connect to Upstash Redis: %v", err)
	}

	log.Println("Connected to Upstash Redis successfully")
}

func GetRedis() *redis.Client {
	return RedisClient
}

func CloseRedis() {
	RedisClient.Close()
}
