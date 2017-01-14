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
	<script type="text/javascript" src="<%=path%>/framework/jquery/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="<%=path%>/framework/js/extJquery.js"></script>
	<script type="text/javascript" src="<%=path%>/modules/alarm/js/alarm.js"></script>
  </head>
  <script>
  jQuery(document).ready(function() {

	});
  
  function  applyAlarm(){
		var param =$.serializeObject($('#applyAlarm_form'));
		$("#reflushText").css("display", "");
			$.ajax({
				url: "<%=path%>/alarm/applyAlarm",
				data: param,
				type : "POST",
				dataType: "json",
				success: function(result) {
					$("#reflushText").css("display", "none");
					if(result.msg=='1'){
// 						parent.location.reload();   
						parent.layer.closeAll();
					}else{
						alert("应用失败！");
					}
				}
			});
		
	}
</script>
  <body>
<!--    <div class="portlet-body form" style="padding-top: 15px;margin-left: 10px;"> -->
	<!-- BEGIN FORM-->
<!--     <form action="<%=path %>/alarm/applyAlarm" class="form-horizontal"  onsubmit="return submitForm()" > -->
<!--         <form id="applyAlarm_form" class="form-horizontal"   >  -->			
			<div class="tab-content">
						<div class="tab-pane active" id="tab_1">
							<div class="portlet-body form1">
							<!-- BEGIN FORM-->
								<form id="applyAlarm_form">
		<input type="hidden" name="farmId" id="farmId"  value="${farmId}"/>							
		<input type="hidden" name="houseId" id="houseId"  value="${houseId}"/>	
		<input type="hidden" name="houseId2" id="houseId2" />		
		<input type="hidden" name="alarm_type" id="alarm_type" value="${alarm_type}"/>
								<div class="form-horizontal" style="height: 40px;">
									<div class="span6" style="width: 300px;">
										<div class="control-group">
										  <label class="control-label" style="width: 60px;">当前农场:</label>
										  <div class="controls" style="margin-left: 70px;width: 150px;margin-top: 7px;">
											${farm}
										  </div>
										</div>
									</div>
									<div class="span6" style="width: 150px;">
										<div class="control-group">
										  <label class="control-label" style="width: 60px;margin-left: -30px;">当前栋舍:</label>
										  <div class="controls" style="margin-left: 40px;margin-top: 7px;">
										  	 ${house }
										  </div>
										</div>
									</div>
									<c:if test="${!empty houseList}">
                                     <%int i=1; %>
									<div class="span12" style="width: 550px;">
										<div class="control-group">
										  <label class="control-label" style="width: 100px;margin-left: 70px;"> 应用至:</label>										  
										  	<c:forEach var="houselist" items="${houseList}">
		                                     <c:if test="${houselist.org_code!=houseId }"> 
		                                  <div class="controls" style="margin-left: 300px;margin-top: 5px;">
		                                  <input type="checkbox" id="house<%=i %>" name="house<%=i %>" value="${houselist.org_code }" onclick="xuanze();" style="margin-top: 0px;"/>
                                           ${houselist.org_name }
										  </div>
										  <script>
               function xuanze(){
            			  document.getElementById("houseId2").value = $("#house"+<%=i %>).val();
            	  }
               </script>                                     
               </c:if>
               <%i++; %>
               </c:forEach> 
										</div>
									</div>
									</c:if>
									
									<div class="span6" style="width: 220px;">
										  <div class="controls" style="margin-left: 100px;width: 520px;">
											 <button type="button" class="btn blue" onclick="applyAlarm()"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>
										  </div>
									</div>
									<div class="span6" style="width: 220px;">
										  <div class="controls" style="margin-left: 60px;">
											 <button type="button" class="btn" onclick="closeB()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>
										  </div>
									</div>
									<div class="span6" id = "reflushText" style="display:none;float:right;"><font style="margin-left: 60px;" color="#FF0000">刷新中,请稍后...</font></div>
								</div>
								</form>
								<!-- end from -->
							</div>
						</div>

					</div>
			
			
		<script>
			function closeB(){
				parent.layer.closeAll();
			}
		</script>
<!-- 		</form> -->
		<!-- END FORM-->  
<!-- 	</div> -->
  </body>
</html>
