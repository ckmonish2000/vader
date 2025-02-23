package scripts

type ParsedScript struct {
	Command         string `json:"command"`
	Title           string `json:"title"`
	ID              string `json:"id"`
	ScriptCommandID string `json:"scriptCommandId"`
	ScriptId        string `json:"scriptId"`
}

type ScriptOutput struct {
	ScriptCommandID string `json:scriptCommandID`
	Output          string `json:"output"`
}
