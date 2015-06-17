
jQuery(document).ready(function() {
	$("#username").focus(function(){
		$("#tip").css("display","none");
	});
	$("#password").focus(function(){
		$("#tip").css("display","none");
	});
	$("#register").click(function(){
		var type = $("#sure").attr("type");
		if (type=='login') {
			$("#head").text("注册");
			$("#title").text("register");
			$("#password").val("");
			$("#repassword").val("");
			$("#sure").text("注册");
			$("#sure").attr("type", "register");
			$("#register").text("登录");
			$("#tip").css("display","none");
			$("#repassword").css("display","block");
		} else {
			$("#head").text("登录");
			$("#title").text("login");
			$("#password").val("");
			$("#repassword").val("");
			$("#sure").text("登录");
			$("#sure").attr("type", "login");
			$("#register").text("注册");
			$("#tip").css("display","none");
			$("#repassword").css("display","none");
		}
	});
    $('#sure').click(function(){
		var type = $("#sure").attr("type");
        var username = $('#username').val();
        var password = $("#password").val();
        var repassword = $("#repassword").val();
        if(username == '') {
            $("#tip").text("用户名或者密码错误");
            $("#tip").css("display","block");
            return false;
        }
        if(password == '') {
            $("#tip").text("用户名或者密码错误");
            $("#tip").css("display","block");
            return false;
        }
    	if(type=="login"){
		    $.ajax({
				url : '/api',
				type : 'POST', 
				data : {
					'Action' : "LOGIN",
					'UserID' : username,
					'Password': password,
				},
				statusCode: {
				    200: function() {
						$.cookie("UserID", username, { expires: 7 });
						alert("cookie is " + $.cookie("UserID"));
						$.cookie("Password", password, { expires: 7 });
	    				$(window.location).attr('href', 'test.html');
					}
				},   
				error: function() {
					$("#tip").text("用户名或者密码错误");
					$("#tip").css("display","block");
					$("#password").val("");
				}
			 });
    	}
    	else{
    		if(repassword == password){
    			$.ajax({
					url : '/api',
					type : 'POST',
					data : {
						'Action' : "REGISTER",
						'UserID' : username,
						'Password' : password,
					},
					statusCode: {
						200: function() {
							$("#password").val("");
							$("#repassword").val("");
							$("#tip").text("注册成功：请登录");
							$("#tip").css("display","none");
							$(window.location).attr('href', 'login.html');
						},

						402: function() {
							$("#password").val("");
							$("#repassword").val("");
							$("#tip").text("注册失败：用户已存在");
							$("#tip").css("display","block");
						}
					},
					error: function() {
						$("#password").val("");
						$("#repassword").val("");
						$("#tip").text("注册失败：未知错误");
					}
				});
		   }
    		else{
    			$("#password").val("");
				$("#repassword").val("");
    			$("#tip").text("两次密码不一致");
				$("#tip").css("display","block");
    		}
    	}
    });
});
