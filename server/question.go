package main

import (
	"encoding/json"
	"errors"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Message struct {
	UserID string
	Date   string
	Text   string
}

type Question struct {
	CourseID   string `json:"-"`
	QuestionNo string
	Status     string `json:"-"`
	Reply      Message
	Ask        Message
	Anwser     []Message
}

func AddQuestion(uid, cid string, q Question) error {
	if !CheckIsStudent(cid, uid) {
		return errors.New("not exists")
	}
	q.Status = "Unchecked"
	session, err := mgo.Dial(COURSE_HOST)
	if err != nil {
		return err
	}
	defer session.Close()
	// Optional. Switch the session to a monotonic behavior.
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(DATABASE).C(QUESTION)
	n, err := c.Find(bson.M{"questionno": q.QuestionNo,
		"courseid": q.CourseID}).Count()
	if err != nil {
		return err
	}
	if n != 0 {
		return errors.New("questionno exists!")
	}

	err = c.Insert(q)
	return err
}

func AddAnwser(uid, cid string, q Question) error {
	session, err := mgo.Dial(COURSE_HOST)
	if err != nil {
		return err
	}
	defer session.Close()
	// Optional. Switch the session to a monotonic behavior.
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(DATABASE).C(QUESTION)
	if CheckIsStudent(cid, uid) {
		err = c.Update(bson.M{"questionno": q.QuestionNo, "courseid": q.CourseID},
			bson.M{"$push": bson.M{"anwser": q.Anwser[0]}})
		return err
	} else if CheckIsTA(cid, uid) {
		err = c.Update(bson.M{"questionno": q.QuestionNo, "courseid": q.CourseID},
			bson.M{"$set": bson.M{"reply": q.Anwser[0]}})
		err = c.Update(bson.M{"questionno": q.QuestionNo, "courseid": q.CourseID},
			bson.M{"$set": bson.M{"status": "Checked"}})
		return err
	}
	return errors.New("not exists")
}

func FetchQuestion(uid, cid string) (string, error) {
	session, err := mgo.Dial(COURSE_HOST)
	if err != nil {
		return "", err
	}
	defer session.Close()
	// Optional. Switch the session to a monotonic behavior.
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(DATABASE).C(QUESTION)
	res := []Question{}
	if CheckIsStudent(cid, uid) {
		err = c.Find(bson.M{"courseid": cid}).All(&res)
		if err != nil {
			return "", err
		}
		b, err := json.Marshal(res)
		if err != nil {
			return "", err
		}
		return string(b), err
	} else if CheckIsTA(cid, uid) {
		err = c.Find(bson.M{"courseid": cid, "status": "Unchecked"}).All(&res)
		if err != nil {
			return "", err
		}
		b, err := json.Marshal(res)
		if err != nil {
			return "", err
		}
		return string(b), err
	}
	return "", errors.New("not exists")
}
