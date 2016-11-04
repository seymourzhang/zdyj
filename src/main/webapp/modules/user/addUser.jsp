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
		/* var zNodes =[
			{ id:1, pId:0, name:"随意勾选 1", open:true},
			{ id:11, pId:1, name:"随意勾选 1-1", open:true},
			{ id:111, pId:11, name:"随意勾选 1-1-1"},
			{ id:112, pId:11, name:"随意勾选 1-1-2"},
			{ id:12, pId:1, name:"随意勾选 1-2", open:true},
			{ id:121, pId:12, name:"随意勾选 1-2-1"},
			{ id:122, pId:12, name:"随意勾选 1-2-2"},
			{ id:2, pId:0, name:"随意勾选 2", checked:true, open:true},
			{ id:21, pId:2, name:"随意勾选 2-1"},
			{ id:22, pId:2, name:"随意勾选 2-2", open:true},
			{ id:221, pId:22, name:"随意勾选 2-2-1", checked:true},
			{ id:222, pId:22, name:"随意勾选 2-2-2"},
			{ id:23, pId:2, name:"随意勾选 2-3"}
		]; */
	
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
	
	
	/* function houseClick(){
		 var farmId= $("#farm_id").val();
			if(farmId==""){
				$("#addUser_msg").html("请选择农场！");
				$("input[type=checkbox]").attr("disabled",true);
				$("input[name=house_code1]:checkbox").attr("checked", false);
			}else{
				$("input[type=checkbox]").attr("disabled",false);
			}
	 } */
	 
	
	function submitForm(){
			var ac=$("input[name='user_code']").val();
			if(ac==""){
				$('#addUser_msg').html("用户名不能为空！");
				return false;
			}else if(restAdminUser(ac)){
				$('#addUser_msg').html("用户名已经存在！");
				return false;
			}
			var pwd=new RegExp("(?![a-z]+$|[0-9]+$)^[a-zA-Z0-9]{6,}$");
			var pd=$("input[name='user_password']").val();
			if(pd==""){
				$('#addUser_msg').html("密码不能为空！");
				return false;
			}else if(!pwd.test(pd)){
				$('#addUser_msg').html("密码必须大于等于6位有字母和数字组成！");
				return false;
			}
			var pd=$("input[name='user_password']").val();
			var cpwd=$("input[name='confirmation']").val();
			if(pd==""){
				$('#addUser_msg').html("密码不能为空！");
				return false;
			} else if(pd!=cpwd){
				$('#addUser_msg').html("两次输入密码不同！");
				return false;
			}
		 
		return true;
	}
	
function  addUser(){
	 /* var chk_value =[];    
	  $("input[name=house_code1]:checked").each(function(){    
	  	 chk_value.push($(this).val());    
	  });  
	  $("#house_code").val(chk_value); */
	var param =$.serializeObject($('#adduser_form'));
	if(submitForm()){
		$.ajax({
			url: "<%=path%>/user/addUser",
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
	
	
//判断用户名是否重名
function restAdminUser(str){
	var rs;
	$.ajaxSetup({ async: false });
    $.get("<%=path%>/user/isUserCodeNull?user_code="+str, function(result){
    	rs = $.parseJSON(result);
   	 if(rs.msg=="1"){
        	rs = true;//存在
        }else{
        	rs = false;//不存在
        }
   });
   return rs; 
}



function closeB(){
	parent.layer.closeAll();
}
	
	</script>
	
  </head>
  
  <body>
   <div class="portlet-body form" style="padding-top: 15px;margin-left: -30px;">
	<!-- BEGIN FORM-->
  <%--   <form action="<%=path %>/user/addUser" class="form-horizontal"  onsubmit="return submitForm()" > --%>
    <form id="adduser_form" class="form-horizontal"   >
    		<div style="float: left;">
	    		<div class="control-group">
					<label class="control-label" style="width: 100px;">用户名:</label>
					<div class="controls" style="margin-left: 110px;">
						<input type="text" class="span6 m-wrap" style="width: 230px;" name="user_code">
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
						<input type="text" class="span6 m-wrap" style="width: 230px;" name="user_real_name">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" style="width: 100px;">英文名:</label>
					<div class="controls" style="margin-left: 110px;">
						<input type="text" class="span6 m-wrap" style="width: 230px;" name="user_real_name_en">
					</div>
				</div>
				<div class="control-group" >
					<label class="control-label" style="width: 100px;">手机号:</label>
					<div class="controls" style="margin-left: 110px;">
						<input type="text" class="span6 m-wrap" style="width: 230px;" name="user_mobile_1">
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
	                      <option value="${role.role_id }">${role.role_name }</option>
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
				<button type="button" class="btn blue" onclick="addUser()"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>
					&nbsp;&nbsp;&nbsp;&nbsp;
				<button type="button" class="btn" onclick="closeB()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>
			</div>
		</form>
		<!-- END FORM-->  
	</div>
  </body>
</html>
