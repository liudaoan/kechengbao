package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"log"
	"sync"
)

type Database struct {
	sync.Mutex
	Name     string
	Table    string
	Backend  string
	UserName string
	Memory   map[string]interface{}
}

type Fetch func(map[string]interface{}, *sql.Rows)

func (d *Database) Connect() *sql.DB {
	db, err := sql.Open(d.Backend, fmt.Sprintf("dbname=%s user=%s sslmode=disable", d.Name, d.UserName))
	if err != nil {
		log.Fatal(err)
		return nil
	}
	return db
}

func NewDB(backend, dbname, user, table string) *Database {
	ret := new(Database)
	ret.Backend = backend
	ret.Name = dbname
	ret.UserName = user
	ret.Table = table
	ret.Memory = make(map[string]interface{})
	return ret
}

func (ud *Database) Cache(f Fetch) {
	db := ud.Connect()
	defer db.Close()

	rows, err := db.Query("select * from " + ud.Table)
	if err != nil {
		log.Panic(err.Error())
	}

	for rows.Next() {
		f(ud.Memory, rows)
	}
}

func FetchCourseBrief(s map[string]interface{}, rows *sql.Rows) {
	var cinfo CourseBrief
	err := rows.Scan(&cinfo.CourseID, &cinfo.QNo)
	if err != nil {
		log.Panic(err)
	}
	s[cinfo.CourseID] = cinfo
}
