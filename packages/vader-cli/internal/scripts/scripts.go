package scripts

import (
	"bufio"
	"encoding/json"
	"log"
	"net/http"

	"github.com/ckmonish2000/vader/internal/constants"
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
