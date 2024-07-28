package controller

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
)

// Execute JavaScript code
func javaScript(code string) string {
	jsFile, err := ioutil.TempFile("", "*.js")
	if err != nil {
		panic(err)
	}
	defer os.Remove(jsFile.Name())

	_, err = jsFile.Write([]byte(code))
	if err != nil {
		panic(err)
	}
	jsFile.Close()

	cmd := exec.Command("node", jsFile.Name())
	output, err := cmd.CombinedOutput()
	if err != nil {
		panic(err)
	}

	return string(output)
}

// Execute Python code
func pythonExecute(code string) string {
	pyFile, err := ioutil.TempFile("", "*.py")
	if err != nil {
		panic(err)
	}
	defer os.Remove(pyFile.Name())

	_, err = pyFile.Write([]byte(code))
	if err != nil {
		panic(err)
	}
	pyFile.Close()

	cmd := exec.Command("/usr/bin/python3", pyFile.Name())
	output, err := cmd.CombinedOutput()
	if err != nil {
		panic(err)
	}

	return string(output)
}

// Handle JavaScript code execution requests
func RunJavaScriptCode(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Failed to read request body", http.StatusInternalServerError)
			return
		}
		output := javaScript(string(body))
		w.Header().Set("Content-type", "application/text")
		json.NewEncoder(w).Encode(output)
	}
}

// Handle Python code execution requests
func RunPythonCode(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Failed to read request body", http.StatusInternalServerError)
			return
		}
		output := pythonExecute(string(body))
		w.Header().Set("Content-type", "application/text")
		json.NewEncoder(w).Encode(output)
	} else {
		http.Error(w, "Error: Only POST method is supported", http.StatusMethodNotAllowed)
	}
}
