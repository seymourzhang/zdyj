<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<script type="text/javascript">
	var path="<%=path%>";
	var menuId="${pd.id}";
	var menuPid="${pd.pid}";
</script>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="description" content="overview & stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<title>正大鸡场管理系统</title>

		<!-- ace styles -->
		<%@ include file="../../framework/inc.jsp"%>
		<script type="text/javascript" src="<%=path%>/modules/user/js/login.js"></script>
		<link rel="shortcut icon" href="<%=path%>/framework/image/favicon.ico">

		<style>
			#bg{
				width:100%;
				height:100%;
				background-size:cover;
			}
			.win tr {
				text-align:center;
			}
			#div{
				float:right;
				position: relative;
				margin-right:12%;
				z-index: 1;
				width:340px;
				height:310px;
			}
		</style>
	</head>
<body  marginwidth="0" marginheight="0">
<div id="backgrou" style="position:absolute; width:100%; height:100%; z-index:-1">
	<img style="position:fixed;" src="<%=path%>/modules/user/image/login111.jpg" height="100%" width="100%" />
</div>
<div>
<table id="bg" cellpadding="0" cellspacing="0">
	<tr>
		<td style="background-color: #417CC5;height:85px;">
			<%-- <div style='float: left;width:170px;height:40px;background-image: url("<%=path%>/modules/user/image/logo.png");background-repeat: no-repeat;' ></div> --%>
			<div class ='font_system color_system_font_white font_system_size_32' style='float: left;margin-left:20px;'>正大鸡场管理系统 V2017</div>

		</td>
	</tr>
	<tr valign="middle">
		<td>
			<div id="div" style="border:solid #c5c5c5 1px;">
				 <form class="bd" id="loginForm"  method="POST" >
					<table class="win" width="290" cellspacing="0" style="margin:15px auto;" border="0">
						<tr>
							<td colspan="2" class="font_system color_system_font_blue font_system_size_32" style="height:60px;border-bottom: 1px solid #c5c5c5;font-weight: bold;">用户登录</td>
						</tr>
						<tr>
							<td style="height:45px;width:50px;border-left: 1px solid #c5c5c5;border-bottom: 1px solid #c5c5c5;background:#f2f2f3">
								<img src="<%=path%>/modules/user/image/PersonMain.png" />
							</td>
							<td style="height:45px;border-right: 1px solid #c5c5c5;border-bottom: 1px solid #c5c5c5;text-align:left;padding-left:5px;padding-top:12px;">
								<input class="font_system font_system_size_13" type="text" id="userName" name="user_code" autocomplete="on" value="" style='font-weight: bold;width:225px;height:100%;border:0px;outline:none;'/>

							</td>
						</tr>
						<tr>
							<td colspan="2" style="height:20px;"></td>
						</tr>
						<tr>
							<td style="height:45px;width:50px;border-top: 1px solid #c5c5c5;border-left: 1px solid #c5c5c5;border-bottom: 1px solid #c5c5c5;background:#f2f2f3">
								<img src="<%=path%>/modules/user/image/LockMain.png" />
							</td>
							<td style="height:45px;border-top: 1px solid #c5c5c5;border-right: 1px solid #c5c5c5;border-bottom: 1px solid #c5c5c5;text-align:left;padding-left:5px;padding-top:12px;">
								<input class="font_system font_system_size_13" type="password"  onkeydown="javascript:enterSumbit()" name="user_password" id="password" value="" style='font-weight: bold;height:100%;width:225px;border:none;outline:none;' />
							</td>
						</tr>
					</table>
					<table style="margin:15px auto;width:290px;" >
						<tr height="40px">
							<td>
								<label for="rmbUser"  style="margin-right:56px;">
									<input class="font_system font_system_size_13" type="checkbox" name="chkRememberUsername"  checked="true" id="rmbUser">记住帐号</label>
							</td>
						</tr>
						<tr>
							<div style="cursor:pointer;margin-left:25px;background-color:#417CC5;text-align:center;height:40px;width: 290px" onclick="javascript:systemLogin();" >
									<img src="<%=path%>/modules/user/image/button333.png"  style="padding-top: 10px;"/>
							</div>
						</tr>
					</table>
				</form> 
			</div>
		</td>
	</tr>
	<tr>
		<td align="center" style="height:35px;background: #417CC5;">
			<div id="fontwrr" class="font_system color_system_font_white font_system_size_13">
					版权所有(上海农汇信息科技有限公司) 沪ICP备13027505 Copyright©2006-2017 All Rights Reserved
			</div>
		</td>
	</tr>

</table>
</div>
</body>
</html>