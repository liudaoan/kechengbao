var data = [{"QuestionNo":"1","Ask":{"UserID":"12330285","Date":"2015-04-27 13:05:39.187001666 +0800 HKT","Text":"    hehey我的世界里有很多人来来往往，有的人推着我前进，有的人阻碍我的脚步，有的人冷漠旁观。我希望有一天，我可以不念他人，只问内心，在我的世界里悠游自在。!hey我的世界里有很多人来来往往，有的人推着我前进，有的人阻碍我的脚步，有的人冷漠旁观。我希望有一天，我可以不念他人，只问内心，在我的世界里悠游自在。!y!"},"Anwser":[{"UserID":"12330285","Date":"2015-04-27 17:34:20.979563666 +0800 HKT","Text":"hey我的世界里有很多人来来往往，有的人推着我前进，有的人阻碍我的脚步，有的人冷漠旁观。我希望有一天，我可以不念他人，只问内心，在我的世界里悠游自在。!"},{"UserID":"12330285","Date":"2015-04-27 17:34:58.691924619 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-27 17:36:17.53580219 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-28 20:25:13.180470004 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-28 20:25:13.180470004 +0800 HKT","Text":"heyhey我的世界里有很多人来来往往，有的人推着我前进，有的人阻碍我的脚步，有的人冷漠旁观。我希望有一天，我可以不念他人，只问内心，在我的世界里悠游自在。!hey我的世界里有很多人来来往往，有的人推着我前进，有的人阻碍我的脚步，有的人冷漠旁观。我希望有一天，我可以不念他人，只问内心，在我的世界里悠游自在。!!"},{"UserID":"12330285","Date":"2015-04-28 20:25:13.180470004 +0800 HKT","Text":"我的世界里有很多人来来往往，有的人推着我前进，有的人阻碍我的脚步，有的人冷漠旁观。我希望有一天，我可以不念他人，只问内心，在我的世界里悠游自在。hey!"},{"UserID":"12330285","Date":"2015-04-28 20:25:13.180470004 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-28 20:25:13.180470004 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-28 20:25:13.180470004 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-28 20:25:13.180470004 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-28 20:25:36.981394159 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-28 20:25:57.275809383 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-28 20:26:09.940822053 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-28 20:28:26.518553174 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-30 16:05:12.925570908 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-30 16:05:12.925570908 +0800 HKT","Text":"hey!"},{"UserID":"12330285","Date":"2015-04-30 16:05:12.925570908 +0800 HKT","Text":"hey!"}]}];
var currPage = 0;
var answer = data[0].Anwser;
var maxPage = 0;
var QNO;
var UID;
var PWD;
var CID;
var CTN;
window.onload=function()//用window的onload事件，窗体加载完毕的时候
{
	var Request = new Object();
	var url = location.search; //获取url中"?"符后的字串
    var Request = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
        	Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
	QNO = Request["no"];
	UID = $.cookie("UserID");
	PWD = $.cookie("Password");
	CID = $.cookie("CourseID");
	CTN = $.cookie("ChapterNo");
	$.ajax({
		url : '172.18.35.52:8080',
		type : 'POST',
		data : {
			'Action' : "LISTQ",
			'UserID' : UID,
			'Password' : PWD,
			'CourseID' : CID,
			'ChapterNo' : CTN,
		},
	}).done(function(Data) {
		console.log(Data);
		data = Data;
		answer =data[QNO].Anwser;
	});
	if(answer.length % 15 > 0)
	{
		maxPage =  Math.ceil(answer.length/15);
	}
	else
		maxPage = answer.length / 15;
	if(Request["flag"]==1){
		currPage = maxPage-1;
	}
	$("#question").text(data[0].Ask.Text);
	$("#asker_date").text("(By " +　data[0].Ask.UserID + "  "+  data[0].Ask.Date.substr(0,19)　+ ")");
	$("#maxPage").text("共" + maxPage + "页");
	for(var i = 0; i < 15; i++){
	    var userId = "user"+i;
	    var answerId = "answer"+i;
	    var liid = "comment" + i;
	    $("#comment").append("<li id=" + liid + " + class = " + "list-group-item" + "> </li>");
	    $("#" + liid).append("<dl><dt id= " + userId + "></dt><dd><pre id="+ answerId +"></pre></dd></dl>");
	    $("#" + liid).css("display","none");
	    $("#" + answerId).addClass("textStyle");
	}
	for(var i = 0; i < answer.length && i < i * currPage + 15 ; i++){
		var head = answer[i].UserID + " (" + answer[i].Date.substr(0,19) + ")";
		$("#user" + i).text(head);
		$("#answer" + i).text(answer[i].Text);
	    $("#comment" + i).css("display","block");
	}
	if(Request["flag"]==1){
		$("#currPage").text("第" + (currPage+1) + "页");
		currPage++;
		lastPage();
		window.scrollTo(0,document.body.scrollHeight);//滚动到底部
	}
}

function lastPage(){
	if(currPage == 0){
		return;
	}
	currPage--;
	for(var i = 0; i < 15; i++){
		$("#comment" + i).css("display","none");
	}
	javascript:scroll(0,0)
	for(var i = currPage * 15; i < answer.length && i < 15 * currPage + 15 ; i++){
		var head = answer[i].UserID + " (" + answer[i].Date.substr(0,19) + ")";
		$("#user" + i%15).text(head);
		$("#answer" + i%15).text(answer[i].Text);
		$("#comment" + i%15).css("display","block");
	}
	$("#currPage").text("  第" + (currPage+1) + "页  ");
}
function nextPage(){
	if(currPage + 1 >= maxPage)
		return;
	currPage++;
	javascript:scroll(0,0)
	for(var i = 0; i < 15; i++){
			$("#comment" + i).css("display","none");
	}
	for(var i = currPage * 15; i < answer.length && i < 15 * currPage + 15 ; i++){
		var head = answer[i].UserID + " (" + answer[i].Date.substr(0,19) + ")";
		$("#user" + i%15).text(head);
		$("#answer" + i%15).text(answer[i].Text);
	    $("#comment" + i%15).css("display","block");
	}
	$("#currPage").text("第" + (currPage+1) + "页");
}
function skipToPage(){
	var page = $("#skipTo").val();
	var re = /^[1-9][0-9]*$/;
	if(re.test(page)){
		pa = parseInt(page);
		if(pa > maxPage){
			alert("输入超过最大页数");
			$("#skipTo").text("");
			return;
		}
		currPage = pa - 1;
		for(var i = 0; i < 15; i++){
		    $("#comment" + i).css("display","none");
		}
		javascript:scroll(0,0)
		for(var i = currPage * 15; i < answer.length && i < 15 * currPage + 15 ; i++){
			var head = answer[i].UserID + "(" + answer[i].Date.substr(0,19) + ")";
			$("#user" + i%15).text(head);
			$("#answer" + i%15).text(answer[i].Text);
		    $("#comment" + i%15).css("display","block");
		}
		$("#currPage").text("第" + (currPage+1) + "页");
	}
	else{
		alert("输入不合法，只能包含正数");
	}
	$("#skipTo").text("");
}

function answering(){
	alert(1);
	location.href ="qa.html?no="+QNO + "&flag=1";
	$("#divdiv").css("display","none");
	$.ajax({
		url : '172.18.35.52:8080',
		type : 'POST',
		data : {
			'Action' : "ANWSER",
			'UserID' : UID,
			'Password' : PWD,
			'CourseID' : CID,
			'QuestionNo' : QNO,
			'Body' : $("#myreply").text(),
		},
	}).done(function(data) {
		if(data !="200"){
			alert("回答失败");
			return;
		}
		location.href ="qa.html?no="+QNO + "&flag=1";
	});
}