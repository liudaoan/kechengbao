package main

import (
	//	"encoding/json"
	"fmt"
	"log"
	"sync"
)

type CourseBrief struct {
	CourseID string
	QNo      int
}

type CBDB struct {
	sync.Mutex

	DB    Database
	Brief map[string]CourseBrief
}

func (ud *CBDB) InsertNewCourseMeta(cid string) {
	db := ud.DB.Connect()
	defer db.Close()

	stmt, err := db.Prepare(fmt.Sprintf("INSERT INTO %s values ($1, $2)", ud.DB.Table))
	if err != nil {
		log.Panic(err.Error())
	}

	_, err = stmt.Exec(cid, 0)
	if err != nil {
		//don't exit
		log.Print(err.Error())
	}
	ud.Brief[cid] = CourseBrief{cid, 0}
}

func NewCBDB(backend, dbname, user, table string) *CBDB {
	ud := new(CBDB)
	ud.DB.Backend = backend
	ud.DB.Name = dbname
	ud.DB.UserName = user
	ud.DB.Table = table

	return ud
}

func (ud *CBDB) Init() {
	ud.Brief = make(map[string]CourseBrief)
}

func (ud *CBDB) Cache() {
	db := ud.DB.Connect()
	defer db.Close()

	rows, err := db.Query("select * from " + ud.DB.Table)
	if err != nil {
		log.Panic(err.Error())
	}

	for rows.Next() {
		var cinfo CourseBrief
		err = rows.Scan(&cinfo.CourseID, &cinfo.QNo)
		ud.Brief[cinfo.CourseID] = cinfo
	}
}

func (ud *CBDB) UpdateQNo(cid string) {
	db := ud.DB.Connect()
	defer db.Close()

	stmt, err := db.Prepare(fmt.Sprintf("UPDATE %s SET qno=qno+1", ud.DB.Table))
	if err != nil {
		log.Panic(err.Error())
	}

	_, err = stmt.Exec()
	if err != nil {
		//don't exit
		log.Print(err.Error())
	}
}

func (ud *CBDB) GenerateQNo(cid string) int {
	ud.Lock()
	defer ud.Unlock()
	//update number
	ud.Brief[cid] = CourseBrief{cid, ud.Brief[cid].QNo + 1}
	ud.UpdateQNo(cid)
	return ud.Brief[cid].QNo
}
