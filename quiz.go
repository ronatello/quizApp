package main

import (
	"fmt"
	"github.com/gin-contrib/cors"                        
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	 _ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB                                         
var err error

type User struct {
	ID uint `json:"id"`
	FirstName string `json:"firstname"`
	LastName string `json:"lastname"`
	Username string `json:"username"`
	Password string `json:"password"`
	Admin int `json:"admin"`
}

type Quiz struct {
	ID uint `json:"id"`
	QuizName string `json:"quizname"`
	Genre string `json:"genre"`
	Questions []Question `gorm:"foreignkey:quiz_id"`
}

type Question struct {
	ID uint `json:"id"`
	Type string `json:"type"`
	Question string `json:"question"`
	OptionA string `json:"optiona"`
	OptionB string `json:"optionb"`
	OptionC string `json:"optionc"`
	OptionD string `json:"optiond"`
	AnswerA bool `json:"answera"`
	AnswerB bool `json:"answerb"`
	AnswerC bool `json:"answerc"`
	AnswerD bool `json:"answerd"`
	QuizID int `json:"quizid"`
}

func main() {

	db, err = gorm.Open("sqlite3", "./gorm.db")
	
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	db.AutoMigrate(&User{})
	db.AutoMigrate(&Question{})
	db.AutoMigrate(&Quiz{})

	//db.Model(&Quiz{}).AddForeignKey("quiz_id", "quizzes(id)", "CASCADE", "RESTRICT")

	r := gin.Default()
	r.POST("/register", Register)
	r.POST("/login", Login)
	r.POST("/adminquiz", createQuiz)
	r.POST("/adminquestion", createQuestion)
	r.GET("/adminquizzes", seeAllQuizzes)
	r.GET("/adminquiz/:id", seeQuiz)
	r.GET("/adminquestions/:id", getQuestions)
	r.PUT("/adminquiz/:id", editQuiz)
	r.PUT("/adminquestion/:id", editQuestion)
	r.DELETE("/adminquiz/:id", deleteQuiz)
	r.Use((cors.Default()))
	r.Run(":8080")
}


func Register(c *gin.Context) {
	var user User
	var check User
	c.BindJSON(&user)

	if err := db.Where("username = ?", user.Username).First(&check).Error; err != nil {
		db.Create(&user)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, user)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, user)
	}
}

func Login(c *gin.Context) {
	var user User
	var check User
	c.BindJSON(&user)

	if err := db.Where("username = ?", user.Username).First(&check).Error; err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(404, user)
		fmt.Println(err)
	} else {
		if check.Password == user.Password {
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, check)
		} else {
			c.Header("access-control-allow-origin", "*")
			c.JSON(404, user)
			fmt.Println(err)
		}
	}
}

func createQuiz(c *gin.Context) {
	var quiz Quiz
	var check Quiz

	c.BindJSON(&quiz)
	if err := db.Where("quiz_name = ?", quiz.QuizName).First(&check).Error; err != nil {
		db.Create(&quiz)
		db.Where("quiz_name = ?", quiz.QuizName).First(&check)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, check)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, quiz)
	}
}

func createQuestion(c *gin.Context) {
	var question Question

	c.BindJSON(&question)
	db.Create(&question)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, question)
}

func seeAllQuizzes(c *gin.Context) {
	var quizzes []Quiz

	if err := db.Find(&quizzes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quizzes)
	}
}

func seeQuiz(c *gin.Context) {
	var quiz Quiz
	id := c.Params.ByName("id")

	if err := db.Where("id = ?", id).First(&quiz).Error; err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	} else {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
}

func getQuestions(c *gin.Context) {
	var questions []Question

	id := c.Params.ByName("id")

	if err := db.Where("quiz_id = ?", id).Find(&questions).Error; err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, questions)
	} else {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
}

func editQuiz(c *gin.Context) {
	var quiz Quiz
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&quiz).Error; err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(404, quiz)
	} else {
		c.BindJSON(&quiz)
		db.Save(&quiz)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	}
}

func editQuestion(c *gin.Context) {
	var question Question
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&question).Error; err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(404, question)
	} else {
		c.BindJSON(&question)
		db.Save(&question)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, question)
	}
}

func deleteQuiz(c *gin.Context) {
	var quiz Quiz
	var check Quiz

	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&quiz).Error; err == nil {
		db.Where("id = ?", id).Delete(&quiz)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, check)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(404, quiz)
	}
}