package main

import (
	"log"
	"net/http"
)

const (
	COURSE_HOST = "localhost"
	DATABASE    = "test"
	COURSE      = "course"
	QUESTION    = "question"
	PROFILE     = "profile"
)

const (
	FAILED = iota + 400
	AUTH_FAILED
	USER_EXISTED
	NO_PRIVILEGE
	FORM_INVALID
)
const (
	UNDEFINED_ACTION = iota + 300
)
const (
	SUCCESS = iota + 200
)

const (
	FATAL = iota
	PANIC
	INFO
)

func HandleFatal(err error) {
	if err != nil {
		log.Panic(err.Error())
	}
}

func HandleInfo(err error) {
	if err != nil {
		log.Println(err.Error())
	}
}

func HTTPHandleError(w http.ResponseWriter, err error, towrite []byte) {
	if err != nil {
		log.Println(err.Error())
		http.Error(w, err.Error(), FAILED)
	} else {
		w.WriteHeader(SUCCESS)
		if towrite != nil {
			w.Write(towrite)
		}
	}
}
