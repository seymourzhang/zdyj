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
// 	  if(document.getElementById("house1").value ==${house.id }){
// 		  document.getElementById("house1").checked = true;
// 	  }else if(document.getElementById("house2").value ==${house.id }){
// 		  document.getElementById("house2").checked = true;
// 	  }else if(document.getElementById("house3").value ==${house.id }){
// 		  document.getElementById("house3").checked = true;
// 	  }else if(document.getElementById("house4").value ==${house.id }){
// 		  document.getElementById("house4").checked = true;
// 	  }
	});
  
  function  applyAlarm(){
		var param =$.serializeObject($('#applyAlarm_form'));
			$.ajax({
				url: "<%=path%>/alarm/applyAlarm",
				data: param,
				type : "POST",
				dataType: "json",
				success: function(result) {
					if(result.msg=='1'){
						parent.location.reload();   
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
        <form id="applyAlarm_form" class="form-horizontal"   > 
		<input type="hidden" name="farmId" id="farmId"  value="${farm.id}"/>							
		<input type="hidden" name="houseId" id="houseId"  value="${house.id}"/>	
		<input type="hidden" name="houseId2" id="houseId2" />		
		<input type="hidden" name="alarm_type" id="alarm_type" value="${alarm_type}"/>
		<table style="margin-left: 10px;height: 10px;width: 500px;margin-top: 30px;">							
               <tr>
               <th>当前农场:</th>
               <td>${farm.farm_name_chs}</td>
               <th>当前栋舍:</th>
               <td>${house.house_name }</td>
               </tr> 
               <tr></tr> <tr></tr><tr></tr>
               <c:if test="${!empty houseList}">
               <%int i=1; %>
                <tr style="margin-top: 60px;height: 90px;">
                <th style="text-align: center;" colspan="2" height="60px;"> 
                                                                    应用至:
               </th>
		       <c:forEach var="houselist" items="${houseList}">
		       <c:if test="${houselist.id!=house.id }">
               <td style="text-align: center;" colspan="2" height="60px;"> 
              <input type="checkbox" id="house<%=i %>" name="house<%=i %>" value="${houselist.id }" onclick="xuanze();"/>
               ${houselist.house_name }
               </td>  
               <script>
               function xuanze(){
//             		  if(document.getElementById("house1").checked == true && document.getElementById("house1").value !=${house.id }){
            			  document.getElementById("houseId2").value = $("#house"+<%=i %>).val();
//             		  }
//             		  else if(document.getElementById("house2").checked == true && document.getElementById("house2").value !=${house.id }){
//             			  document.getElementById("houseId2").value = $("#house2").val();
//             		  }else if(document.getElementById("house3").checked == true && document.getElementById("house3").value !=${house.id }){
//             			  document.getElementById("houseId2").value = $("#house3").val();
//             		  }else if(document.getElementById("house4").checked == true && document.getElementById("house4").value !=${house.id }){
//             			  document.getElementById("houseId2").value = $("#house4").val();
//             		  }
            	  }
               </script>                                     
               </c:if>
               <%i++; %>
               </c:forEach> 
               </tr>
               </c:if>
<!--                <tr> -->
<!--                <td style="text-align: center;" colspan="4" height="60px;"> -->
<!--                <input type="checkbox" id="house2" name="house2" value="2" onclick="xuanze();"/>02栋舍 -->
<!--                </td>  -->
<!--                </tr>   -->
                  
<!--                <c:if test="${farm.id==house.farm_id }"> -->
<!--                <tr> -->
<!--                <td style="text-align: center;" colspan="4" height="60px;"> -->
<!--                <input type="checkbox" id="house3" name="house3" value="3" onclick="xuanze();"/>03栋舍 -->
<!--                </td>    -->
<!--                </tr> -->
<!--                <tr>        -->
<!--                <td style="text-align: center;" colspan="4" height="60px;"> -->
<!--                <input type="checkbox" id="house4" name="house4" value="4" onclick="xuanze();"/>04栋舍 -->
<!--                </td> -->
<!--                </tr> -->
<!--                </c:if>                              -->
			
			</table>
			<table style="margin-left: 10px;height: 10px;width: 500px;margin-top: 10px;">
			<tr style="margin-top: 10px;height: 30px;">
           <td style="text-align: center;" colspan="2">
           <button type="button" class="btn blue" onclick="applyAlarm()"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>
           </td>
           <td style="text-align: center;" colspan="2">
           <button type="button" class="btn" onclick="closeB()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>
           </td>
           </tr>
			</table>
		<script>
			function closeB(){
				parent.layer.closeAll();
			}
		</script>
		</form>
		<!-- END FORM-->  
<!-- 	</div> -->
  </body>
</html>
