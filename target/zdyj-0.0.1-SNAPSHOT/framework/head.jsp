<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- BEGIN HEADER -->
<div class="header navbar navbar-inverse navbar-fixed-top" style="height: 61px;z-index: 1;">

	<div class="navbar-inner" style="height: 61px;z-index: 3;">
		<div class="container-fluid">
			<a class="brand" href="#" style="width: 400px;"> <img src="<%=path%>/framework/image/logo.png" alt="logo" style="padding-left: 13px;float: left;height: 50px;width: 50px;margin-top: -5px;" />
			<div style="font-size: 24px;color: #FFFFFF;padding-left: 8px;padding-top: 10px;float: left;font-weight:bold;">农汇猪场物联网</div>
				<!-- <span style="padding-left: 3px;float: left;padding-top: 5px;color: #FFFFFF;font-size: 14px;font-weight:lighter;">®</span> -->
			<!-- <div style="font-size: 22px;color: #FFFFFF;padding-left: 5px;padding-top: 11px;float: left;font-weight:lighter;">物联网</div> --></a> <a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse"></a>
			<ul class="nav pull-right">
				<li class="dropdown user">
					<div style="width:330px;height:48px;z-index: 2;padding-top: 6px;">
							<iframe  name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=93&num=2" width="330" height="48" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</div>
				</li>
				<li class="dropdown user"><div  style="padding-top: 6px;text-align: center;padding-right: 20px;"> <span style="color: #fff;font-size: 14px;text-align: center;" id="dateMassage"></span> 
				</div>
				</li>

				<li class="dropdown" id="header_notification_bar">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" style="margin-top:6px; "> <img src="<%=path%>/framework/image/warn.png" style="width: 18px;height: 18px;"> <span class="badge"  style="margin-top:6px;" id="head_msg_currCount"></span>

				</a>

					<ul class="dropdown-menu extended notification" style="margin-top:6px; " id="head_msg_CurrList">

						
					</ul></li>

				<!-- BEGIN USER LOGIN DROPDOWN -->
				<li class="dropdown user"><a href="#" class="dropdown-toggle" data-toggle="dropdown" style="margin-top:8px;"> <img alt="" src="<%=path%>/framework/image/user.png" style="width: 20px;height: 20px;" /> <span class="username">${sessionUser.user_real_name }</span> <i class="icon-angle-down" style="margin-top:8px;"></i>
				</a>
					<ul class="dropdown-menu">
						<!-- <li><a href="javascript:void(0);"><i class="icon-lock"></i>
									修改密码</a>
							</li> -->
						<li><a href="<%=path%>/login/outLogin"><i class="icon-key"></i> 退出</a></li>
					</ul></li>
				<!-- END USER LOGIN DROPDOWN -->

			</ul>
		</div>
	</div>
</div>
<!-- END HEADER -->
<!--引入属于此页面的js -->
<script type="text/javascript" src="<%=path%>/framework/js/head.js"></script>