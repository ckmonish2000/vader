package adapters

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/ckmonish2000/vader/internal/constants"
	"github.com/ckmonish2000/vader/internal/scripts"
)

func VaderAdapter(outputs []scripts.ScriptOutput) (string, error) {
	url := constants.URL("outputs")

	jsonData, err := json.Marshal(outputs)
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return "", nil
	}

	res, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error posting to Vader:", err)
		return "", nil
	}

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return "", nil
	}

	return string(body), nil
}
