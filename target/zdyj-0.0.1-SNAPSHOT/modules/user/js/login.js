function enterSumbit(){  
    var event=arguments.callee.caller.arguments[0]||window.event;//消除浏览器差异  
   if (event.keyCode == 13){  
	   systemLogin();
   }  
//   alert(window.parent);
} 

function systemLogin(){
	var param =$.serializeObject($('#loginForm'));
	if(param["user_code"] == ""){
		//alert("您的管理员名称为空，请仔细填写!");
		$("#userName").tips({
			side : 1,
			msg : '用户名不能为空，请仔细填写!',
			bg : '#AE81FF',
			time : 3
		});
		$("#userName").focus();
		return;
	}
	if(param["user_password"] == ""){
		$("#password").tips({
			side : 1,
			msg : '密码不能为空，请仔细填写!',
			bg : '#AE81FF',
			time : 3
		});
		$("#password").focus();
		return;
	}
	$.ajax({
		url: path + "/login/login",
		data: param,
		type : "POST",
		dataType: "json",
		success: function(result) {
			
			if(result.msg=='1'){
				$("#userName").tips({
					side : 1,
					msg : "用户名或密码有误",
					bg : '#FF5080',
					time : 15
				});
				$("#userName").focus();
			}else{
				window.location.href=path+"/user/index";
			}
		}
	});
}
