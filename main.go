package main

import (
	"Code_Editor/controller"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	fmt.Println("Code Running")

	r := mux.NewRouter()
	r.HandleFunc("/javascript", controller.RunJavaScriptCode).Methods("POST")
	r.HandleFunc("/python", controller.RunPythonCode).Methods("POST")

	// Start the server on port 8080
	log.Fatal(http.ListenAndServe(":3000", r))
}
