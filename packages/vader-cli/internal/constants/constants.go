package constants

const (
	API_URL = "http://localhost:3170/v1"
)

func URL(path string) string {
	return API_URL + "/" + path
}
