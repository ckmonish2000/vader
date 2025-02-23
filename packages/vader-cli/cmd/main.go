package main

import (
	"fmt"
	"os"

	"github.com/ckmonish2000/vader/internal/commands"
)

func main() {
	args := os.Args[1:]

	fmt.Println("Welcome to Vader 👑 \n")

	commands.RunCmd(args)
}
