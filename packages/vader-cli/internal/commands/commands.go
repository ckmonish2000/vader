package commands

import (
	"fmt"

	"github.com/ckmonish2000/vader/internal/adapters"
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
		outputs := scripts.ExecuteScript(script)
		downloadUrl, err := adapters.VaderAdapter(outputs)

		if err != nil {
			fmt.Println("Error getting download URL", err)
			return
		}

		fmt.Println(downloadUrl)
	}
}
