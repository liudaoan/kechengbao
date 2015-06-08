var _auth;
var _courseID;
var TA_profile;
var TA_manageList;
var TA_manageListDetail;

$(document).ready(function(){
	var userID = $.cookie("UserID");
	var password = $.cookie("Password");
	if (userID == null || password == null) {
    	//$(window.location).attr('href', 'login.html');
    	userID = "12330285";
    	password = "12330";
	}
	_auth = {"UserID": userID, "Password": password};
	$.ajax(
		{
			url: 	 "/api",
			type: 	 "PROFILE",
			data: 	 {
				"Action": 	  "POST",
				"UserID":     _auth["UserID"],
				"Password":   _auth["Password"]
			},
			dataType: "json",
			success:  function(result) {
				TA_profile = result;
				TA_manageList = TA_profile.Courses;
				if (TA_manageList.length == 0) {
					// 提示注册课程
				} else {
					_courseID = TA_manageList[0];
					mainPro();
				}
			},
			error: function() {
				alert("请重新登录");
				_courseID = "00000001";
				TA_profile = {
					"UserID" : "12330285" ,
					"Courses" : ["00000001"] ,
					"Id" : {
						"WorkID" : "123302853" ,
						"CardID" : "370682 xxxx " ,
						"Email" : " kassian@123 . com" ,
						"Phone" : "118012"
					} ,
					"Education" : {
						"University" : "" ,
						"School" : "" ,
						"Major" : "" ,
						"Level" : "" ,
						"StartYear" : "" ,
						"EndYear" : ""
					} ,
					"Info" : {
						"NickName" : "sjc" ,
						"Name" : "" ,
						"Education" : [ ]
					}
				};
				TA_manageList = TA_profile.Courses;
				mainPro();
			}
		}
	);
});

function mainPro() {
	addr="/api";
	alert("hey");
	initHTML();
	offlineTest();
	staticBind();
	queryData();
	//setInterval("queryData()",60000);
}


var recentMessage = [];
var courseInfo;
var memberDetail = [];
var memberList;

function offlineTest() {
	recentMessage = [
		{
			"QuestionNo": "0" ,
			"Ask": {
				"UserID": "12330285" ,
				"Date": "2015−04−26 15:02:54.917107647 +0800 HKT" ,
				"Text": "hey151515151515 "},
			"Anwser " : [
					{
					"UserID " : "12330285" ,
					"Date " : "2015−04−26 15:02:54.939743361 +0800 HKT" ,
					"Text " : "hey ! "
					},{
					"UserID " : "12330285" ,
					"Date " : "2015−04−26 15:02:55.667589685 +0800 HKT" ,
					"Text " : "hey ! "
					}
				]
		},{
			"QuestionNo": "1" ,
			"Ask": {
				"UserID": "12330285" ,
				"Date": "2015−04−26 15:02:54.917107647 +0800 HKT" ,
				"Text": "hey ! "},
			"Anwser " : [
					{
					"UserID " : "12330285" ,
					"Date " : "2015−04−26 15:02:54.939743361 +0800 HKT" ,
					"Text " : "hey ! "
					},{
					"UserID " : "12330285" ,
					"Date " : "2015−04−26 15:02:55.667589685 +0800 HKT" ,
					"Text " : "hey ! "
					}
				]
		},
		{
			"QuestionNo": "2" ,
			"Ask": {
				"UserID": "12330285" ,
				"Date": "2015−04−26 15:02:54.917107647 +0800 HKT" ,
				"Text": "hey ! "},
			"Anwser " : [
					{
					"UserID " : "12330285" ,
					"Date " : "2015−04−26 15:02:54.939743361 +0800 HKT" ,
					"Text " : "hey ! "
					},{
					"UserID " : "12330285" ,
					"Date " : "2015−04−26 15:02:55.667589685 +0800 HKT" ,
					"Text " : "hey ! "
					}
				]
		},{
			"QuestionNo": "3" ,
			"Ask": {
				"UserID": "12330285" ,
				"Date": "2015−04−26 15:02:54.917107647 +0800 HKT" ,
				"Text": "hey ! "},
			"Anwser " : [
					{
					"UserID " : "12330285" ,
					"Date " : "2015−04−26 15:02:54.939743361 +0800 HKT" ,
					"Text " : "hey ! "
					},{
					"UserID " : "12330285" ,
					"Date " : "2015−04−26 15:02:55.667589685 +0800 HKT" ,
					"Text " : "hey ! "
					}
				]
		},
		{
			"QuestionNo": "0" ,
			"Ask": {
				"UserID": "12330285" ,
				"Date": "2015−04−26 15:02:54.917107647 +0800 HKT" ,
				"Text": "hey ! "},
			"Anwser " : [
					{
					"UserID " : "12330285" ,
					"Date " : "2015−04−26 15:02:54.939743361 +0800 HKT" ,
					"Text " : "hey ! "
					},{
					"UserID " : "12330285" ,
					"Date " : "2015−04−26 15:02:55.667589685 +0800 HKT" ,
					"Text " : "hey ! "
					}
				]
		},{
			"QuestionNo": "0" ,
			"Ask": {
				"UserID": "12330285" ,
				"Date": "2015−04−26 15:02:54.917107647 +0800 HKT" ,
				"Text": "hey ! "},
			"Anwser " : [
					{
					"UserID " : "12330285" ,
					"Date " : "2015−04−26 15:02:54.939743361 +0800 HKT" ,
					"Text " : "hey ! "
					},{
					"UserID " : "12330285" ,
					"Date " : "2015−04−26 15:02:55.667589685 +0800 HKT" ,
					"Text " : "hey ! "
					}
				]
		},
	];
	courseInfo = {
		"CourseID" : "00000001" ,
		"Name" : "Computer Graphics " ,
		"Code" : "SE−314",
		"Term" : "2015S" ,
		"Room" : "公教B501",
		"Hour" : {
			"StartWeek" : 1 ,
			"EntWeek" : 18 ,
			"ClassHours" : [
			//?????
				{
				"Day" : 5 ,
				"StartClass" : 3 ,
				"EndClass" : 5
				}
			]},
		"Teachers" : ["203124231"] ,
		"TAs"      : ["11330001" , "11330002"] ,
		"Students" : ["12330285" , "12330284" , " dongliangshishabi "] ,
		"Chapters" : [
			{
			"No" : 0 ,
			"Title" : " Intro " ,
			"Intro" : " Intro to xxx " ,
			"Text"  : " Hello every body this is our introlesson"
			} , {
			"No" : 1 ,
			"Title" : "OpenGL API" ,
			"Intro" : " Intro to xxx " ,
			"Text"  : " Hello every body this is our first lesson"
			}
		]
	};
	TA_manageListDetail = [
		{
			"CourseID" : "00000001" ,
			"Name" : "Computer Graphics " ,
			"Code" : "SE−314",
			"Term" : "2015S" ,
			"Room" : "公教B501",
			"Hour" : {
				"StartWeek" : 1 ,
				"EntWeek" : 18 ,
				"ClassHours" : [
				//?????
					{
					"Day" : 5 ,
					"StartClass" : 3 ,
					"EndClass" : 5
					}
				]},
			"Teachers" : ["203124231"] ,
			"TAs"      : ["11330001" , "11330002"] ,
			"Students" : ["12330285" , "12330284" , " dongliangshishabi "] ,
			"Chapters" : [
				{
				"No" : 0 ,
				"Title" : " Intro " ,
				"Intro" : " Intro to xxx " ,
				"Text"  : " Hello every body this is our introlesson"
				} , {
				"No" : 1 ,
				"Title" : "OpenGL API" ,
				"Intro" : " Intro to xxx " ,
				"Text"  : " Hello every body this is our first lesson"
				}
			]
		},
		{
		"CourseID" : "00000001" ,
		"Name" : "Computer Graphics2 " ,
		"Code" : "SE−314",
		"Term" : "2015S" ,
		"Room" : "公教B501",
		"Hour" : {
			"StartWeek" : 1 ,
			"EntWeek" : 18 ,
			"ClassHours" : [
			//?????
				{
				"Day" : 5 ,
				"StartClass" : 3 ,
				"EndClass" : 5
				}
			]},
		"Teachers" : ["203124231"] ,
		"TAs"      : ["11330001" , "11330002"] ,
		"Students" : ["12330285" , "12330284" , " dongliangshishabi "] ,
		"Chapters" : [
			{
			"No" : 0 ,
			"Title" : " Intro " ,
			"Intro" : " Intro to xxx " ,
			"Text"  : " Hello every body this is our introlesson"
			} , {
			"No" : 1 ,
			"Title" : "OpenGL API" ,
			"Intro" : " Intro to xxx " ,
			"Text"  : " Hello every body this is our first lesson"
			}
		]
		}
	];
	memberList = courseInfo.Students;
	memberDetail = [
		{
			"UserID" : "123302851" ,
			"Courses" : ["00000001"] ,
			"Id" : {
				"WorkID" : "123302853" ,
				"CardID" : "370682 xxxx " ,
				"Email" : " kassian@123 . com" ,
				"Phone" : "118012"
			} ,
			"Education" : {
				"University" : "" ,
				"School" : "" ,
				"Major" : "" ,
				"Level" : "" ,
				"StartYear" : "" ,
				"EndYear" : ""
			} ,
			"Info" : {
				"NickName" : "sjc" ,
				"Name" : "" ,
				"Education" : [ ]
			}
		},
		{
			"UserID" : "123302852" ,
			"Courses" : ["00000001"] ,
			"Id" : {
				"WorkID" : "123302852" ,
				"CardID" : "370682 xxxx " ,
				"Email" : " kassian@123 . com" ,
				"Phone" : "118012"
			} ,
			"Education" : {
				"University" : "" ,
				"School" : "" ,
				"Major" : "" ,
				"Level" : "" ,
				"StartYear" : "" ,
				"EndYear" : ""
			} ,
			"Info" : {
				"NickName" : "sjc" ,
				"Name" : "" ,
				"Education" : [ ]
			}
		},
		{
			"UserID" : "123302853" ,
			"Courses" : ["00000001"] ,
			"Id" : {
				"WorkID" : "123302851" ,
				"CardID" : "370682 xxxx " ,
				"Email" : " kassian@123 . com" ,
				"Phone" : "118012"
			} ,
			"Education" : {
				"University" : "" ,
				"School" : "" ,
				"Major" : "" ,
				"Level" : "" ,
				"StartYear" : "" ,
				"EndYear" : ""
			} ,
			"Info" : {
				"NickName" : "sjc" ,
				"Name" : "" ,
				"Education" : [ ]
			}
		}
	];
};

var	recentCount;
var groupCount;

function initHTML() {
	$("#userID").text(_auth["userID"]);

///////////////////////////////////////////////////////////////////////

	var time = new Date();
	var date = time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日";
	$("#date").text(date);
	var week = "周" + "日一二三四五六".split("")[time.getDay()];
	var noon = ["早上", "下午", "晚上"];
	var hour = time.getHours();
	if (hour <= 12 && hour >= 6) noon = noon[0];
	else if (hour <= 18 && hour >= 13) noon = noon[1];
	else noon = noon[2];
	$("#period").text(week + noon);

///////////////////////////////////////////////////////////////////////

	$("#recent-news").empty();
	recentCount = 3;

    groupCount = 1;

}


function setCourseDetail() {
	$(".course-name").text(courseInfo.Name);
	var t = "课程介绍：" + obj2string(courseInfo.Chapters);
	$("#course-intro").text(t);
	$("#course-time").empty();
	$("#course-time").append(
		courseInfo.Term + "学期<br>" + 
		courseInfo.Hour.StartWeek + "周至" + courseInfo.Hour.EntWeek + "周<br>" +  
		courseInfo.Hour.ClassHours[0].StartClass + "节至" + 
		courseInfo.Hour.ClassHours[0].EndClass + "节")
	$("#classroom").empty();
	$("#classroom").append("校区: " + courseInfo.Room.Campus + "<br>"
						+"教室: " + courseInfo.Room.RoomNo);
	var code = "http://qr.liantu.com/api.php?text=" + courseInfo["CourseID"] + "";
	var text = "请课程" + courseInfo["Name"] + "的同学用客户端扫此二维码加入课程";
	$("#QR-Code").attr({"src":code});
	window._bd_share_config = {
        "common":
            {	"bdSnsKey":{}, "bdText": text, "bdPic": code, "bdMini":"2",
            	"bdMiniList":false,"bdStyle":"1","bdSize":"16"
            },
        "share":{"bdSize":16}
    };
    with(document)0[
    	(getElementsByTagName('head')[0]||body)
    		.appendChild(createElement('script'))
    		.src='http://bdimg.share.baidu.com/static/api/js/share.js?'+
    		'v=89860593.js?cdnversion='+~(-new Date()/36e5)];
}

function setRecentMes() {
	$("#recent-news").empty();
	for (var i = 0; i < recentMessage.length && i < recentCount; i++) {
		$("#recent-news").append("<div class='message well'>" + 
			"<h4 class='media-heading'>" +
				"<img class='message-head' src='http://s.bootply.com/assets/example/bg_iphone.png'>" +
				"<a class='message-title'>ASK：" + recentMessage[i].Ask.Text + 
				"</a></h4><p>"+ recentMessage[i].Ask.Date + "</p><div id='"+ recentMessage[i].QuestionNo +"'class='btn-toolbar'>" + 
				"<span role='button' class='btn-xs btn-warning'>" + "未解决" + 
				"</span><span role='button' class='question-detail btn-xs btn-primary'>查看</span></div></div>");
	};
    $(".question-detail").click(function(){
    	//alert($(this).parent().attr('id'));
    	$(window.location).attr('href', 'qa.html?no='+ $(this).parent().attr('id'));
    });

}

function setMemberList() {
	$("#member-list").empty();
	var pos = (groupCount - 1) * 10;
	for (var i = 0; pos < memberList.length && i < 10; i++, pos++) {
    	$("#member-list").append(
    		"<tr data-toggle='modal' data-target='#memberInfo' class='member'><td>" + 
    		"<img src='" + memberList[pos] + ".jpg' class='member-head'></td><td>" +
    		memberDetail[pos].Info.NickName + "</td><td class='SID'>" +
    		memberDetail[pos].Id.WorkID + "</td>"
    	);
    };
    $(".member").click(function(target) {
    	chosen_one = $(this).find("td:eq(2)").text();
		var pos = (groupCount - 1) * 10;
    	chosen_one_index = pos + $(this).prevAll().length;
    	$("#info-SID").text(memberDetail[chosen_one_index].Id.WorkID);
    	$("#info-CID").text(memberDetail[chosen_one_index].Id.CardID);
    	$("#info-EMAIL").text(memberDetail[chosen_one_index].Id.Email);
    	$("#info-PHONE").text(memberDetail[chosen_one_index].Id.Phone);
	});
}

function setMemberGroup() {
	var slit = (memberList.length - memberList.length % 10) / 10;
    if (memberList.length % 10 != 0) slit += 1;
    for (var i = slit + 1; i <= 5; i++) {
    	$(".pagination").find("li:eq("+i+")").addClass("disabled");
    };
    if (slit >= 5) {
    	$(".pagination").empty();
    	$(".pagination").append("<li><a href='#'>&laquo;</a></li>");
	    for (var i = 1; i <= slit + 1; i++) {
	    	$(".pagination").append("<li><a>"+i+"</a></li>");
	    };
    	$(".pagination").append("<li><a href='#'>&raquo;</a></li>");
    };
}

function setMemberSelect() {
	$("#member-check").empty();
    for (var i = 0; i < memberList.length; i++) {
    	$("#member-check").append(
    		    "<div class='checkbox btn btn-success btn-md col-md-4 col-sm-4 chosen' role='button'>" +
                    "<label><input type='checkbox' name='recipient' value='" + memberList[i] + "'>" +
                        "<span class='choic-SID'>" + memberList[i] + "</span>" +
                        "<span class='choic-Name'>" + "ABCD" + "</span></input></label></div>"

    	);
    };
}

var recipient;

function staticBind() {
    $("#retract-news").hide().click(function(){
    	recentCount = 3;
    	setRecentMes();
    	$("#retract-news").hide();
    	$("#redirect-news").hide();
    	$("#more-news").show();
    });
    $("#redirect-news").hide().click(function(){
    	$(window.location).attr('href', 'http://www.baidu.com');
    });
    $("#more-news").click(function() {
    	if (recentCount > 6) {
    		$(this).hide();
   			$("#retract-news").show();
    		$("#redirect-news").show();
    	}
    	else if (recentCount > recentMessage.length) {
    		$(this).text("没有更多的消息");
    		updata();
    	} else {
    		recentCount += 1;
    		setRecentMes();
    		$(this).text("查看更多");
    	}
    });


    $("#check-recipient").text('发送对象');
	$("#send-message").attr(
		"data-content", "请确认接收对象"
	);
    $("#all-members").click(function(){
    	$("#check-recipient").text("to All");
    	$("#send-message").attr(
    		"data-content", "发送至参与课程所有学生"
    	);
    	recipient = memberList;
    });

    $("#chosse-done").click(function(){
    	recipient = [];
    	$('input[name="recipient"]:checked').each(function(){
			recipient.push($(this).val());
		});
    	$("#check-recipient").text("to chosen students");
    	$("#send-message").attr(
    		"data-content", "发送至选择的所有学生"
    	);
    });

    $("#send-message").click(function() {
		$.ajax(
			{
				url: 	 addr,
				type: 	 "POST",
				data: 	 {
					"Action": 	  "POST",
					"UserID":     _auth["UserID"],
					"Password":   _auth["Password"],
					"CourseID":   _courseID,
					//未知，待解决
					"Type": 	  "Inform",
					"Body": 	  $("#mess2send").val()
				},
				dataType: "json",
				success:  function(result) {
					alert("发送成功");
    				$("#check-recipient").text('发送对象');
    				recipient = [];
    				$("#send-message").attr(
    					"data-content", "请确认接收对象"
    				);
				},
				error:function() {
					alert("发送失败");
				}
			}
		);
    });

    $("#chosse-all").click(function(){
    	if ($("[name='recipient']").prop("checked") == true) {
    		$("[name='recipient']").prop("checked", false);
    	} else {
    		$("[name='recipient']").prop("checked", true);
    	}
    });

    $("#otherCourseChoose").click(function(){
    	$("#otherCourseList").empty();
    	for(var i = 0; i < TA_manageListDetail.length; i++) {
    		$("#otherCourseList").append(
    			 "<li class='otherCourse'><b>" + TA_manageListDetail[i].Name + "</b></li>"
    		);
    	}
    	$(".otherCourse").click(function(){
    		alert($(this).prevAll().length);
    	});
    });

    $("#kick-member").click(function(){
		$.ajax(
			{
				url: 	 addr,
				type: 	 "POST",
				data: 	 {
					"Action": 	  "KICK",
					"UserID":     _auth["UserID"],
					"Password":   _auth["Password"],
					"CourseID":   _courseID,
					// 待解决
					"UserID":     chosen_one,
					"Role": 	  ""
				},
				dataType: "json",
				success:  function(result) {
					alert("把id" + chosen_one + "踢出课程成功");
				},
				error:function() {
					alert("把id" + chosen_one + "踢出课程失败");
				}
			}
		);
    });

    $("#promo-member").click(function(){
		$.ajax(
			{
				url: 	 addr,
				type: 	 "POST",
				data: 	 {
					"Action": 	  "Accept",
					"UserID":     _auth["UserID"],
					"Password":   _auth["Password"],
					"CourseID":   _courseID,
					// 待解决
					"UserID":     chosen_one,
					"Role": 	  ""
				},
				dataType: "json",
				success:  function(result) {
					alert("把id" + chosen_one + "提权成功");
				},
				error:function() {
					alert("把id" + chosen_one + "提权失败");
				}
			}
		);
    });


    $(".pagination a").click(function(){
    	var n = $(this).text();
    	if (!isNaN(n)) {
    		if (!$(this).parent().hasClass("disabled")){
	    		$(".pagination .active").removeClass("active");
	    		$(this).parent().addClass("active");
	    		groupCount = n;
	    		if (memberList) setMemberList();
    		}
    	}
    });

    $("#createCourse").click(function(){
    	$("#newCourseLabel").text("新建课程");
		$("#TAs-form").empty();
		$("#TEs-form").empty();
		$("#chapter-form").empty();
		$("#newTA").click();
		$("#newTE").click();
		$("#newChapter").click();
		$("#NC-Loca").val("");
		$("#NC-Room").val("");
		$("#NC-ID").val("");
		$("#NC-Name").val("");
		$("#NC-Code").val("");
		$("#NC-Term").val("");
		$("#NC-STime").val("");
		$("#NC-ETime").val("");
		$("#NC-WDay").val("");
		$("#NC-SCour").val("");
		$("#NC-ECour").val("");
		$("#newCourse-done").click(function(){
	    	var Course = genCourdata();
			// ajax
		});
    });

    $("#course-info-edit").click(function(){
    	$("#newCourseLabel").text("编辑课程信息");
    	setEditCourse(courseInfo);

    });

    $("#edit-mem-pro").click(function(){
    	setEditPro(TA_profile);
    });
}

function setEditPro(profile) {
	$("#TA-ID").val(profile.UserID);
	$("#TA-NickName").val(profile.Info.NickName);
	$("#TA-Name").val(profile.Info.Name);
	$("#TA-WorkID").val(profile.Id.WorkID);
	$("#TA-CardID").val(profile.Id.CardID);
	$("#TA-Email").val(profile.Id.Email);
	$("#TA-Phone").val(profile.Id.Phone);
	$("#TA-Univer").val(profile.Education.University);
	$("#TA-School").val(profile.Education.School);
	$("#TA-Major").val(profile.Education.Major);
	$("#TA-Level").val(profile.Education.Level);
	$("#TA-SYear").val(profile.Education.StartYear);
	$("#TA-EYear").val(profile.Education.EndYear);
	$("#TA-Manage-form").empty();
	for (var i = 0; i < profile.Courses.length; i++) {
		$("#TA-Manage-form").append(
			"<input type='text' class='TA-Manage form-control' disabled value='"
			+ profile.Courses[i] + "'>"
		);
	}	
}

function setEditCourse(Course) {
	var chapters = Course.Chapters;
	$("#TAs-form").empty();
	$("#TEs-form").empty();
	$("#chapter-form").empty();
	for (var i = 0; i < chapters.length; i++) {
		$("#chapter-form").append(
              " <div class='col-md-12'>"+
              "    <div class='input-group'>"+
              "    <span class='input-group-addon'>章节:</span>"+
              "    <input type='text' class='NC-C-No form-control' value='"
              +    chapters[i].No  +  "'>"+
              "    </div>"+
              "    <div class='input-group'>"+
              "    <span class='input-group-addon'>名称:</span>"+
              "    <input type='text' class='NC-C-Name form-control' value='"
              +    chapters[i].Title + "'>"+
              "    </div>"+
              " </div>"+
              " <div class='col-md-12'>"+
              "    <span class='input-group-addon'>简介:</span>"+
              "    <textarea class='form-control NC-C-Bref' rows='1'>"
              +    chapters[i].Intro + "</textarea>"+
              " </div>"+
              " <div class='col-md-12'>"+
              "    <span class='input-group-addon'>内容:</span>"+
              "    <textarea class='form-control NC-C-Cont' rows='1'>"
              +    chapters[i].Text + "</textarea>"+
              " </div>" + 
              " <hr>" 
        );
	}
	var teacher=Course.Teachers;
	$("#TEs-form").empty();
	for (var i = 0; i < teacher.length; i++) {
        $("#TEs-form").append(
          "<input type='text' class='NC-Teacher form-control' value='"
           + teacher[i] + "'>"
        );		
	}
	var TA=Course.TAs;
	$("#TAs-form").empty();
	for (var i = 0; i < TA.length; i++) {
        $("#TAs-form").append(
          "<input type='text' class='NC-TAS form-control' value='"
          + TA[i] + "'>"
        );
	}
	$("#NC-Loca").val(Course.Room.Campus);
	$("#NC-Room").val(Course.Room.RoomNo);
	$("#NC-ID").val(Course.CourseID);
	$("#NC-Name").val(Course.Name);
	$("#NC-Code").val(Course.Code);
	$("#NC-Term").val(Course.Term);
	$("#NC-STime").val(Course.Hour.StartWeek);
	$("#NC-ETime").val(Course.Hour.EntWeek);
	$("#NC-WDay").val(Course.Hour.ClassHours[0].Day);
	$("#NC-SCour").val(Course.Hour.ClassHours[0].StartClass);
	$("#NC-ECour").val(Course.Hour.ClassHours[0].EndClass);
}

function genTAProfile() {
	var profile = {
		"UserID" : $("#TA-ID").val(),
		"Courses" : TA_manageList,
		"Id" : {
			"WorkID" : $("#TA-WorkID").val() ,
			"CardID" : $("#TA-CardID").val() ,
			"Email" :  $("#TA-Email").val() ,
			"Phone" :  $("#TA-Phone").val()
		} ,
		"Education" : {
			"University" : $("#TA-Univer").val(),
			"School" : $("#TA-School").val(),
			"Major" : $("#TA-Major").val(),
			"Level" : $("#TA-Level").val(),
			"StartYear" : $("#TA-SYear").val(),
			"EndYear" : $("#TA-EYear").val()
		} ,
		"Info" : {
			"NickName" : $("#TA-NickName").val() ,
			"Name" : $("#TA-Name").val ,
			"Education" : []
		}
	};
	return profile;
}

function genCourdata() {
	var chapters = [];
	var CNo = $(".NC-C-No");
	var CName = $(".NC-C-Name");
	var CBref = $(".NC-C-Bref");
	var CCont = $(".NC-C-Cont");
	for (var i = 0; i < CNo.length; i++) {
		var chap = {
			"No": CNo.eq(i).val(),
			"Title": CName.eq(i).val(),
			"Intro": CBref.eq(i).val(),
			"Text": CCont.eq(i).val()
		}
		chapters.push(chap);
	}
	var teacher=[];
	for (var i = 0; i < $(".NC-Teacher"); i++) {
		teacher.push($(".NC-Teacher").eq(i).val());
	}
	var TA=[];
	for (var i = 0; i < $(".NC-TAS"); i++) {
		teacher.push($(".NC-TAS").eq(i).val());
	}
	var Room = {
		"Campus": $("#NC-Loca").val(),
		"RoomNo": $("#NC-Room").val()
	};
	var newCourse = {
		"CourseID" : $("#NC-ID").val(),
		"Name" : $("#NC-Name").val(),
		"Code" : $("#NC-Code").val(),
		"Term" : $("#NC-Term").val(),
		"Room" : Room,
		"Hour" : {
			"StartWeek" : $("#NC-STime").val(),
			"EntWeek" : $("#NC-ETime").val(),
			"ClassHours" : [
				{
				"Day" : $("#NC-WDay").val(),
				"StartClass" : $("#NC-SCour").val(),
				"EndClass" : $("#NC-ECour").val()
				}
			]},
		"Teachers" : teacher,
		"TAs"      : TA,
		"Students" : [],
		"Chapters" : chapters
	};
	return newCourse;
}


function queryData() {
	// TA_manageListDetail = [];
	for(var i = 0; i < TA_manageList; i++) {
		$.ajax(
			{
				url: 	 addr,
				type: 	 "POST",
				dataType: "json",
				data: 	 {
					"Action": 	  "DETAIL",
					"UserID":     _auth["UserID"],
					"Password":   _auth["Password"],
					"CourseID":   TA_manageList[i]
				},
				success: function(result) {
					TA_manageListDetail.push(result);
				}
			}
		);
	}


	// initialize the question list
	$.ajax(
		{
			url: 	 addr,
			type: 	 "POST",
			dataType: "json",
			data: 	 {
				"Action": 	  "LISTQ",
				"UserID":     _auth["UserID"],
				"Password":   _auth["Password"],
				"CourseID":   _courseID
			},
			success:  function(result) {
				recentMessage = result;
				setRecentMes();
			},
			error:function() {
				alert("can't get data");
				setRecentMes();
			}
		}
	);

	// initialize the course data
	$.ajax(
		{
			url: 	 addr,
			type: 	 "POST",
			dataType: "json",
			data: 	 {
				"Action": 	  "DETAIL",
				"UserID":     _auth["UserID"],
				"Password":   _auth["Password"],
				"CourseID":   _courseID
			},
			success:  function(result) {
				courseInfo = result;
				memberList = courseInfo.Students;
				setCourseDetail();
				setMemberSelect();
				setMemberGroup();
				queryDetaiList();
			},
			error:function() {
				alert("can't get data");
				memberList = courseInfo.Students;
				setCourseDetail();
				setMemberSelect();
				setMemberGroup();
				queryDetaiList();
			}
		}
	);
}
function queryDetaiList() {
	// initialize the member data
	$.ajax(
		{
			url: 	 addr,
			type: 	 "POST",
			dataType: "json",
			data: 	 {
				"Action": 	  "PROFILE_BATCH",
				"UserID":     _auth["UserID"],
				"Password":   _auth["Password"],
				"UIDList":    JSON.stringify(memberList)
			},
			success:  function(result) {
				memberDetail = result;
				setMemberList();
			},
			error:function() {
				alert("can't get data");
				setMemberList();
			}
		}
	);
}




function obj2string(o){ 
    var r=[]; 
    if(typeof o=="string"){ 
        return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\""; 
    } 
    if(typeof o=="object"){ 
        if(!o.sort){ 
            for(var i in o){ 
                r.push(i+":"+obj2string(o[i])); 
            } 
            if(!!document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){ 
                r.push("toString:"+o.toString.toString()); 
            } 
            r="{"+r.join()+"}"; 
        }else{ 
            for(var i=0;i<o.length;i++){ 
                r.push(obj2string(o[i])) 
            } 
            r="["+r.join()+"]"; 
        }  
        return r; 
    }  
    return o.toString(); 
}