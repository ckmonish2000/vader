package scripts

import (
	"bufio"
	"encoding/json"
	"log"
	"net/http"

	"github.com/ckmonish2000/vader/internal/constants"
	"github.com/ckmonish2000/vader/internal/runners"
)

func GetScript(scriptId string) ([]ParsedScript, error) {
	url := constants.URL("scripts/" + scriptId + "/parsed")
	res, err := http.Get(url)
	if err != nil {
		return []ParsedScript{}, err
	}
	defer res.Body.Close()

	scanner := bufio.NewScanner(res.Body)
	var commands []ParsedScript

	for scanner.Scan() {
		line := scanner.Text()
		err := json.Unmarshal([]byte(line), &commands)
		if err != nil {
			log.Println("Error unmarshalling JSON:", err)
			continue
		}
	}

	return commands, nil
}

func ExecuteScript(commands []ParsedScript) []ScriptOutput {
	var outputs []ScriptOutput
	for _, command := range commands {
		output, err := runners.Bash(command.Command)

		if err != nil {
			log.Fatal(err)
		}

		outputs = append(outputs, ScriptOutput{
			ScriptCommandID: command.ScriptCommandID,
			Output:          output,
		})
	}
	return outputs
}
