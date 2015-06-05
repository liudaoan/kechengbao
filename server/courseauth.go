package main

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func CheckIsTeacher(cid, uid string) bool {
	session, err := mgo.Dial(COURSE_HOST)
	HandleFatal(err)
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(DATABASE).C(COURSE)
	n, err := c.Find(bson.M{"courseid": cid, "teachers": bson.M{"$in": []string{uid}}}).Count()
	HandleInfo(err)
	if n == 0 {
		return false
	} else {
		return true
	}
}

func CheckIsTA(cid, uid string) bool {
	session, err := mgo.Dial(COURSE_HOST)
	HandleFatal(err)
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(DATABASE).C(COURSE)
	n, err := c.Find(bson.M{"courseid": cid, "tas": bson.M{"$in": []string{uid}}}).Count()
	HandleInfo(err)
	if n == 0 {
		return false
	} else {
		return true
	}
}

func CheckIsStudent(cid, uid string) bool {
	session, err := mgo.Dial(COURSE_HOST)
	HandleFatal(err)
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(DATABASE).C(COURSE)
	n, err := c.Find(bson.M{"courseid": cid, "students": bson.M{"$in": []string{uid}}}).Count()
	HandleInfo(err)
	if n == 0 {
		return false
	} else {
		return true
	}
}
