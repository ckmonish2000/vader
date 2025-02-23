package commands

import (
	"fmt"

	"github.com/ckmonish2000/vader/internal/scripts"
)

func RunCmd(cmd []string) {
	if len(cmd) == 0 {
		fmt.Println("No command provided")
		return
	}

	command := cmd[0]
	value := cmd[1]

	switch command {
	case "run":
		script, err := scripts.GetScript(value)
		if err != nil {
			fmt.Println("Error getting script", err)
			return
		}
		fmt.Println(script)
	}
}
