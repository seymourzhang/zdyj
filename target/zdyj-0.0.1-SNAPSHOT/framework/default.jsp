<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
<base href="<%=basePath%>">

<!-- jsp文件头和头部 -->
<%@ include file="inc.jsp"%>

</head>
<body  id="wodder">
<div style="background-color: #fff;" id="wodder2">
 欢迎访问中粮猪场监控系统
</div>
<!-- END CONTAINER -->
	<script>
		jQuery(document).ready(function() {
			var win_h = $(window).height();
			 $("#wodder").css("height",win_h);
			 $("#wodder2").css("height",win_h);
		});
	</script>
</body>
</html>
