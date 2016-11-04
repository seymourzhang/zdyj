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
	<script type="text/javascript" src="<%=path %>/framework/jquery/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="<%=path%>/framework/js/extJquery.js"></script>
	<script type="text/javascript">
	
	 $(document).ready(function(){
		 $("input[name='farm_name_chs']").blur(function(){
				var ac=$("input[name='farm_name_chs']").val();
				if(ac==""){
					$('#addfarm_msg').html("农场不能为空！");
				}else if(restFarmName(ac)){
					$('#addfarm_msg').html("农场已经存在！");
				}else{
					$('#addfarm_msg').html("");
				}
			  });
		 
		$("#province_id").change(function() {
				$.ajax({
					type : "post",
					url : "<%=path%>/farm/getAreaChina",
					data : {
						"parent_id":$("#province_id").val(),
						"level" : 2
					},
					dataType: "json",
					success : function(result) {
						var list = result.obj;
						$("#city_id option:gt(0)").remove();
						for (var i = 0; i < list.length; i++) {
							$("#city_id").append("<option value=" + list[i].id + ">" + list[i].short_name+ "</option>");
						}
						$("#city_id").val(list[0].id);
						setAreaId();
					}
				})
				$('#addfarm_msg').html("");
		});
		$("#city_id").change(function() {
			setAreaId();
		});
		
	})
	
	
	
	function setAreaId(){
		$.ajax({
			type : "post",
			url : "<%=path%>/farm/getAreaChina",
			data : {
				"parent_id":$("#city_id").val(),
				"level" : 3
			},
			dataType: "json",
			success : function(result) {
				var list = result.obj;
				$("#area_id option:gt(0)").remove();
				for (var i = 0; i < list.length; i++) {
					$("#area_id").append("<option value=" + list[i].id + ">" + list[i].short_name+ "</option>");
				}
				$("#area_id").val(list[0].id);
			}
		})
	}	
	
function  addFarm(){
	var ac=$("input[name='farm_name_chs']").val();
	if(ac==""){
		$('#addfarm_msg').html("农场不能为空！");
	}else if(restFarmName(ac)){
		$('#addfarm_msg').html("农场已经存在！");
	}else{
		var param =$.serializeObject($('#addfarm_form'));
		$.ajax({
			url: "<%=path%>/farm/addFarm",
			data: param,
			type : "POST",
			dataType: "json",
			success: function(result) {
				if(result.msg=='1'){
					$("#tab_fag",window.parent.document).val(2);
					$("#farmViewForm",window.parent.document).submit();
					/* parent.location.reload();  */ 
					parent.layer.closeAll(); 
				}else{
					alert("添加失败！");
				}
			}
		});
	}
	
}
	
	
//判断用户名是否重名
function restFarmName(str){
	var rs;
	$.ajaxSetup({ async: false });
    $.get("<%=path%>/farm/isFarmNameNull?farmNameChs="+str, function(result){
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
   <div class="portlet-body form" style="padding-top: 25px;margin-left: -30px;">
	<!-- BEGIN FORM-->
    <form id="addfarm_form" class="form-horizontal"   >
			<div class="control-group" style="float: left;display:inline; ">
				<label class="control-label" style="width: 100px;">农场名:</label>
				<div class="controls" style="margin-left: 110px;">
					<input type="text" class="span6 m-wrap" style="width: 230px;" name="farm_name_chs">
				</div>
			</div>
			<div class="control-group" style="float: left;display:inline; ">
				<label class="control-label" style="width: 100px;">英文名:</label>
				<div class="controls" style="margin-left: 110px;">
					<input type="text" class="span6 m-wrap" style="width: 230px;" name="farm_name_en">
				</div>
			</div>
			<div class="control-group" style="float: left;display:inline; ">
				<label class="control-label" style="width: 100px;">所在省份:</label>
				<div class="controls" style="margin-left: 110px;">
					<select id="province_id" class="medium m-wrap"  name="farm_add1">
					 <option value="">请选择</option>
                      <c:if test="${!empty prlist}">
                      <c:forEach var="prl" items="${prlist}">
                      <option value="${prl.id }">${prl.short_name }</option>
                      </c:forEach>
                     </c:if>
				  	</select>
				</div>
			</div>
			<div class="control-group" style="float: left;display:inline; ">
				<label class="control-label" style="width: 110px;">所在市:</label>
				<div class="controls" style="margin-left: 120px;">
					<select id="city_id" class="medium m-wrap"  name="farm_add2" style="width: 350px;">
					 <option value="">请选择</option>
				  	</select>
				</div>
			</div>
			<div class="control-group" style="float: left;display:inline; ">
				<label class="control-label" style="width: 100px;">所在县:</label>
				<div class="controls" style="margin-left: 110px;">
					<select id="area_id" class="medium m-wrap"  name="farm_add3" style="width: 350px;">
					 <option value="">请选择</option>
				  	</select>
				</div>
			</div>
			<div class="control-group" style="float: left;display:inline; ">
				<label class="control-label" style="width: 110px;">养殖方式:</label>
				<div class="controls" style="margin-left: 120px;">
					<select id="feed_method" class="medium m-wrap"  name="feed_method" style="width: 350px;">
					 <option value="">请选择</option>
                      <c:if test="${!empty feedMethod}">
                      <c:forEach var="fm" items="${feedMethod}">
                      <option value="${fm.biz_code}">${fm.code_name }</option>
                      </c:forEach>
                     </c:if>
				  	</select>
				</div>
			</div>
			
			<div class="control-group" style="clear:both;">
				<label class="control-label" style="width: 100px;">养殖品种:</label>
				<div class="controls" style="margin-left: 110px;">
					<select id="feed_type" class="medium m-wrap"  name="feed_type" style="width: 350px;">
					 <option value="">请选择</option>
                      <c:if test="${!empty feedType}">
                      <c:forEach var="ft" items="${feedType}">
                     	 <option value="${ft.biz_code}">${ft.code_name }</option>
                      </c:forEach>
                     </c:if>
				  	</select>
				</div>
			</div>
			<div class="control-group" style="clear:both;height: 30px;text-align: center;">
				<label class="control-label" style="padding-left: 140px;color: red; width:500px; text-align: center;" id="addfarm_msg"></label>
			</div>
			<div class="form-actions" style="padding-left: 290px;" >
				<button type="button" class="btn blue" onclick="addFarm()"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>
					&nbsp;&nbsp;&nbsp;&nbsp;
				<button type="button" class="btn" onclick="closeB()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>
			</div>
		</form>
		<!-- END FORM-->  
	</div>
  </body>
</html>
