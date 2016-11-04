<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <link rel="stylesheet" href="<%=path %>/framework/css/bootstrap.min.css" />
    <link rel="stylesheet" href="<%=path %>/framework/css/style-metro.css" />
    <link rel="stylesheet" href="<%=path %>/framework/css/style.css"/>
    <link rel="stylesheet" href="<%=path %>/framework/css/bootstrap-fileupload.css" />
    <link rel="stylesheet" href="<%=path %>/framework/css/uniform.default.css" />
    <link rel="stylesheet" href="<%=path %>/framework/css/zTreeStyle.css" />
	<script type="text/javascript" src="<%=path %>/framework/jquery/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="<%=path%>/framework/js/extJquery.js"></script>
	<script type="text/javascript" src="<%=path %>/framework/jquery/jquery.ztree.core.js"></script>
	<script type="text/javascript" src="<%=path %>/framework/jquery/jquery.ztree.excheck.js"></script>
	<script type="text/javascript">
	 $(document).ready(function(){
		 $("input[name='user_code']").blur(function(){
				var ac=$("input[name='user_code']").val();
				if(ac==""){
					$('#addUser_msg').html("用户名不能为空！");
				}else if(restAdminUser(ac)){
						$('#addUser_msg').html("用户名已经存在！");
					}else{
						$('#addUser_msg').html("");
					}
			  });
		 
		 $("input[name='user_password']").blur(function(){
				var pwd=new RegExp("(?![a-z]+$|[0-9]+$)^[a-zA-Z0-9]{6,}$");
				var pd=$("input[name='user_password']").val();
				if(pd==""){
					$('#addUser_msg').html("密码不能为空！");
				}
				else if(!pwd.test(pd)){
					$('#addUser_msg').html("密码必须大于等于6位有字母和数字组成！");
				}else{
					$('#addUser_msg').html("");
				}
			  });
			
			$("input[name='confirmation']").blur(function(){
				var pd=$("input[name='user_password']").val();
				var cpwd=$("input[name='confirmation']").val();
				if(pd==""){
					$('#addUser_msg').html("密码不能为空！");
				} else if(pd!=cpwd){
					$('#addUser_msg').html("两次输入密码不同！");
				}else{
					$('#addUser_msg').html("");
				}
			  });
		 
		$("#role_id").change(function() {
			changeOrg();
		});
		changeOrg();
	})

	function changeOrg(){
			$.ajax({
				type : "post",
				url : "<%=path%>/role/getOrgByRoleId",
				data : {
					"role_id" : $("#role_id").val()
				},
				dataType: "json",
				success : function(result) {
					$("#treeDemo").empty();
					var setting = {
							check: {
								enable: true,
								chkDisabledInherit: true
							},
							data: {
								simpleData: {
									enable: true
								}
							}
						};
					var zNodes =result.obj;
					$.fn.zTree.init($("#treeDemo"), setting, zNodes);
					
				}
			})
		}
	
	 
	
	function submitForm(){
		var pwd=new RegExp("(?![a-z]+$|[0-9]+$)^[a-zA-Z0-9]{6,}$");
		var pd=$("input[name='user_password']").val();
		if(pd !="" ){
			if(!pwd.test(pd)){
				$('#addUser_msg').html("密码必须大于等于6位有字母和数字组成！");
				return false;
			}
		}
		var cpwd=$("input[name='confirmation']").val();
		if(cpwd !="" ){
			if(pd!=cpwd){
				$('#addUser_msg').html("两次输入密码不同！");
				return false;
			}
		}
		 
		return true;
	}
	
function  editUser(){
	var param =$.serializeObject($('#edituser_form'));
	if(submitForm()){
		$.ajax({
			url: "<%=path%>/user/editUser",
			data: param,
			type : "POST",
			dataType: "json",
			success: function(result) {
				if(result.msg=='1'){
					parent.location.reload();   
					parent.layer.closeAll();
				}else{
					alert("添加失败！");
				}
			}
		});
	}
	
}

function closeB(){
	parent.layer.closeAll();
}
	
	</script>
	
  </head>
  
  <body>
   <div class="portlet-body form" style="padding-top: 15px;margin-left: -30px;">
	<!-- BEGIN FORM-->
     <form id="edituser_form" class="form-horizontal"   >
         <input type="hidden" name="id"   value="${userList.id}"/>
    		<div style="float: left;">
	    		<div class="control-group">
					<label class="control-label" style="width: 100px;">用户名:</label>
					<div class="controls" style="margin-left: 110px;">
						<input type="text" class="span6 m-wrap" style="width: 230px;" readonly="readonly" name="user_code" value="${userList.user_code}">
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label" style="width: 100px;">密码:</label>
					<div class="controls" style="margin-left: 110px;">
						<input type="password" class="span6 m-wrap" style="width: 230px;" name="user_password">
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label" style="width: 100px;">确认密码:</label>
					<div class="controls" style="margin-left: 110px;">
						<input type="password" class="span6 m-wrap" style="width: 230px;" name="confirmation">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" style="width: 100px;">中文名:</label>
					<div class="controls" style="margin-left: 110px;">
						<input type="text" class="span6 m-wrap" style="width: 230px;" name="user_real_name" value="${userList.user_real_name}">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" style="width: 100px;">英文名:</label>
					<div class="controls" style="margin-left: 110px;">
						<input type="text" class="span6 m-wrap" style="width: 230px;" name="user_real_name_en" value="${userList.user_real_name_en}">
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label" style="width: 100px;">手机号:</label>
					<div class="controls" style="margin-left: 110px;">
						<input type="text" class="span6 m-wrap" style="width: 230px;" name="user_mobile_1" value="${userList.user_mobile_1}">
					</div>
				</div>
    		</div>
    		<div style="float: left;padding-left: 20px;">
    		  <div class="control-group" >
					<label class="control-label" style="width: 60px;">所属角色:</label>
					<div class="controls" style="margin-left: 70px;">
						<select id="role_id" class="medium m-wrap"  name="role_id" style="width: 350px;">
	                      <c:if test="${!empty roleList}">
	                      <c:forEach var="role" items="${roleList}">
	                      	 <option value="${role.role_id }" <c:if test="${pd.role_id==role.role_id}">selected</c:if>>${role.role_name }</option>
	                      </c:forEach>
	                     </c:if>
					  	</select>
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label" style="width: 60px;">所属机构:</label>
					<div class="zTreeDemoBackground left" style="border:1px solid #e5e5e5; height: 250px;overflow:auto; margin-left: 70px;">
						<ul id="treeDemo" class="ztree"></ul>
					</div>
				</div>
    		</div>
    		<div class="control-group" style="clear:both;height: 20px;text-align: center;">
				<label class="control-label" style="padding-left: 140px;color: red; width:500px; text-align: center;" id="addUser_msg"></label>
			</div>
			<div class="form-actions" style="padding-left: 290px;float:left;" >
				<button type="button" class="btn blue" onclick="editUser()"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>
					&nbsp;&nbsp;&nbsp;&nbsp;
				<button type="button" class="btn" onclick="closeB()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>
			</div>
		</form>
		<!-- END FORM-->  
	</div>
  </body>
</html>
