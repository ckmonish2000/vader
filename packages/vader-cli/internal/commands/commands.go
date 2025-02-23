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
		fmt.Println("FETCHING: SCRIPT DETAILS \n")

		script, err := scripts.GetScript(value)
		if err != nil {
			fmt.Println("FAILED: TO GET SCRIPT DETAILS \n", err)
			return
		}

		fmt.Println("=============================\n")
		scriptName := script[0].ScriptName
		fmt.Println("EXECUTING-SCRIPT: " + scriptName + "\n")

		outputs, metrics := scripts.ExecuteScript(script)
		downloadUrl, err := adapters.VaderAdapter(outputs)

		if err != nil {
			fmt.Println("Error getting download URL", err)
			return
		}

		successMsg := fmt.Sprintf("SUCCESS: %d", metrics.Success)
		failureMsg := fmt.Sprintf("FAILED: %d", metrics.Failure)

		fmt.Println("=============================")
		fmt.Println("SUMMARY: \n")
		fmt.Println(successMsg)
		fmt.Println(failureMsg)
		fmt.Println("=============================\n")

		fmt.Println("COMPLETED-SCRIPT-EXECUTION \n")
		fmt.Println("HERE'S THE LINK: " + downloadUrl)
	}
}
