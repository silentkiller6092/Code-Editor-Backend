package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"strings"
)

func javaScript(code string) (string, error) {
	jsFile, err := ioutil.TempFile("", "*.js")
	if err != nil {
		return "", fmt.Errorf("failed to create temp file: %v", err)
	}
	defer os.Remove(jsFile.Name())

	_, err = jsFile.Write([]byte(code))
	if err != nil {
		return "", fmt.Errorf("failed to write to temp file: %v", err)
	}
	jsFile.Close()

	cmd := exec.Command("node", jsFile.Name())
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("execution error: %v. Output: %s", err, output)
	}

	return string(output), nil
}

func pythonExecute(code string) (string, error) {
	pyFile, err := ioutil.TempFile("", "*.py")
	if err != nil {
		return "", fmt.Errorf("failed to create temp file: %v", err)
	}
	defer os.Remove(pyFile.Name())

	_, err = pyFile.Write([]byte(code))
	if err != nil {
		return "", fmt.Errorf("failed to write to temp file: %v", err)
	}
	pyFile.Close()

	cmd := exec.Command("/usr/bin/python3", pyFile.Name())
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("execution error: %v. Output: %s", err, output)
	}

	return string(output), nil
}

func RunJavaScriptCode(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodOptions {
		return // Handle the preflight request by returning early
	}

	if r.Method == http.MethodPost {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": fmt.Sprintf("Execution error: %v", err)})
			return
		}
		output, err := javaScript(string(body))
		if err != nil {
			if err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]string{"error": fmt.Sprintf("Execution error: %v", err)})
				return
			}
		}

		w.Header().Set("Content-Type", "application/json")

		output = strings.TrimSpace(output)
		json.NewEncoder(w).Encode(output)
	} else {
		http.Error(w, "Error: Only POST method is supported", http.StatusMethodNotAllowed)
	}
}

func RunPythonCode(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodOptions {
		return // Handle the preflight request by returning early
	}

	if r.Method == http.MethodPost {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Failed to read request body", http.StatusInternalServerError)
			return
		}

		output, err := pythonExecute(string(body))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		output = strings.TrimSpace(output)
		json.NewEncoder(w).Encode(output)
	} else {
		http.Error(w, "Error: Only POST method is supported", http.StatusMethodNotAllowed)
	}
}
