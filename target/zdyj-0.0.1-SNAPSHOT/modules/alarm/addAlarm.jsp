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
	  document.getElementById("alarmType").value = '${pd.alarm_type}';
	  document.getElementById("farmId").value = '${pd.farmId}';
	  document.getElementById("houseId").value = '${pd.houseId}';
	  alarmTypeHide();
	});
  
	function alarmTypeHide(){
		if($("#alarmType").val()=="2"){
			$("#pressure").css("display", "block");
			$("#temp").css("display", "none");
			$("#co2").css("display", "none");
			$("#deprivation").css("display", "none");
		}else if($("#alarmType").val()=="3"){
			$("#pressure").css("display", "none");
			$("#temp").css("display", "none");
			$("#co2").css("display", "block");
			$("#deprivation").css("display", "none");
		}else if($("#alarmType").val()=="4"){
			$("#pressure").css("display", "none");
			$("#temp").css("display", "none");
			$("#co2").css("display", "none");
			$("#deprivation").css("display", "block");
		}else{
			$("#pressure").css("display", "none");
			$("#temp").css("display", "block");
			$("#co2").css("display", "none");
			$("#deprivation").css("display", "none");
		}
	}
	
	function reflushAlarm2(){
		var param;
		if($("#farmId").val()==""){
			param=null;
		}else{
			param = {"farmId":$("#farmId").val()};
		}
	 $.ajax({
	     // async: true,
	     url: "/zljk/alarm/reflushAlarm",
	     data: param,
	     type : "POST",
	     dataType: "json",
	     cache: false,
	     // timeout:50000,
	     success: function(result) {
	         var list = eval(result.obj);
			 var select = document.getElementById("houseId");
			 $("#houseId > *").remove();
			 var option = null; // document.createElement("option");
//			 option.innerHTML += "<option id=\"o1\" value=\"\" >"+"全部"+"</option>";
//			 select.appendChild(option);
//			 document.getElementById("o1").setAttribute("value", "");
	         for(var i=0;i<list.length;i++){
	        	 option = document.createElement("option");
	    		 option.innerHTML += "<option id=\""+list[i]["id"]+"\" value=\"\" >"+list[i]["house_name"]+"</option>";
	    		 select.appendChild(option);
	    		 document.getElementById(list[i]["id"]).setAttribute("value",list[i]["id"]);
			 }
	     }
	 });

	}
	
	function submitForm(){
		var day_age=$("input[name='day_age']").val();
		var set_temp=$("input[name='set_temp']").val();
		var high_alarm_temp=$("input[name='high_alarm_temp']").val();
		var low_alarm_temp=$("input[name='low_alarm_temp']").val();
		var high_alarm_negative_pressure=$("input[name='high_alarm_negative_pressure']").val();
		var low_alarm_negative_pressure=$("input[name='low_alarm_negative_pressure']").val();
		var high_alarm_co2=$("input[name='high_alarm_co2']").val();
		var set_water_deprivation=$("input[name='set_water_deprivation']").val();
		var high_water_deprivation=$("input[name='high_water_deprivation']").val();
		var low_water_deprivation=$("input[name='low_water_deprivation']").val();
		if(day_age =="" ){
				$('#addAlarm_msg').html("日龄不能为空！");
				return false;
		}
		if(day_age < 0 ){
				$('#addAlarm_msg').html("日龄不能负！");
				return false;
		}
		if($("#alarmType").val()=="1"){
			if(set_temp =="" ){
				$('#addAlarm_msg').html("目标温度不能为空！");
				return false;
		}else if(high_alarm_temp =="" ){
			$('#addAlarm_msg').html("高报温度不能为空！");
			return false;
	}else if(low_alarm_temp =="" ){
		$('#addAlarm_msg').html("低报温度不能为空！");
		return false;
      }	
		}else if($("#alarmType").val()=="2"){
			if(high_alarm_negative_pressure =="" ){
			$('#addAlarm_msg').html("高报负压不能为空！");
			return false;
	}else if(low_alarm_negative_pressure =="" ){
		$('#addAlarm_msg').html("低报负压不能为空！");
		return false;
      }	
		}else if($("#alarmType").val()=="3"){

			if(high_alarm_co2 =="" ){
			$('#addAlarm_msg').html("高报二氧化碳不能为空！");
			return false;
	}
		}else if($("#alarmType").val()=="4"){
			if(set_water_deprivation =="" ){
				$('#addAlarm_msg').html("目标饮水量不能为空！");
				return false;
		}else if(high_water_deprivation =="" ){
			$('#addAlarm_msg').html("高报饮水量不能为空！");
			return false;
	}else if(low_water_deprivation =="" ){
		$('#addAlarm_msg').html("低报饮水量不能为空！");
		return false;
      }	
		}
	showdiv('加载中，请稍候');
	return true;
}
	
	function  addAlarm(){
		var param =$.serializeObject($('#addAlarm_form'));
		if(submitForm()){
			$.ajax({
				url: "<%=path%>/alarm/addAlarm",
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
	
	
</script>
  <body>
	<!-- BEGIN FORM-->
         <form id="addAlarm_form" class="form-horizontal"   >   
         <table style="margin-left: 30px;height: 10px;width: 750px;margin-top: 20px;">
         <tr height="30px;">
         <th>
                                  报警类别:
         </th>
         <td>
         <select id="alarmType" class="m-wrap span12" name="alarm_type" tabindex="1" onchange="alarmTypeHide();">
														<option value="1">温度设置</option>
                                                        <option value="2">负压设置</option>
                                                        <option value="3">二氧化碳设置</option>
                                                        <option value="4">饮水量设置</option>
														</select>
         </td>
<!--          </tr> -->
<!--          <tr> -->
         <th>
                                   农场:
         </th>
         <td>
         <select id="farmId" class="m-wrap span12" tabindex="1" name="farmId" onchange="reflushAlarm2();">	
		                                                 <c:if test="${!empty farmList}">
		                                                 <c:forEach var="farm" items="${farmList}">
		                                                 <option value="${farm.id }">${farm.farm_name_chs }</option>
		                                                 </c:forEach>
		                                                 </c:if>
														</select>
         </td>
         </tr>
         <tr height="30px;">
         <th>
                                   栋舍:
         </th>
         <td>
         <select id="houseId" class="m-wrap span12" tabindex="1" name="houseId">
		                                                 <c:if test="${!empty houseList}">
		                                                 <c:forEach var="house" items="${houseList}">
		                                                 <option value="${house.id }">${house.house_name}</option>
		                                                 </c:forEach>
		                                                 </c:if>
														</select>
         </td>
         <th>
                                  日龄:
         </th>
         <td>
         <input type="text" id="day_age" class="span6 m-wrap" style="width: 220px;" name="day_age">
         </td>
         </tr>
         <tr>
         <th style="text-align: center;" colspan="4">
         <label class="control-label" style="padding-left: 140px;color: red; width:500px; text-align: center;" id="addAlarm_msg"></label>
         </th>
         </tr>
         <tr>
         <td style="text-align: center;" colspan="2">
         <button type="button" class="btn blue" onclick="addAlarm();"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>
         </td>
         <td style="text-align: center;" colspan="2">
         <button type="button" class="btn" onclick="closeB()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>
         </td>
         </tr>
         </table>
         <table style="margin-left: 200px;height: 10px;width: 550px;margin-top: 60px;">
         <!-- 温度 -->
         <tbody id="temp" style="display:block;">
         <tr>
         <th style="text-align: center;" colspan="2">
                                    目标温度:
         </th>
         <td style="text-align: center;" colspan="2">
         <input type="text" id="set_temp" class="span6 m-wrap" style="width: 230px;" name="set_temp">
         </td>
         </tr>
         <tr>
         <th style="text-align: center;" colspan="2">
                                       高报温度:
         </th>
         <td style="text-align: center;" colspan="2">
         <input type="text" id="high_alarm_temp" class="span6 m-wrap" style="width: 230px;" name="high_alarm_temp">
         </td>
         </tr>
         <tr>
         <th style="text-align: center;" colspan="2">
                                 低报温度:
         </th>
         <td style="text-align: center;" colspan="2">
         <input type="text" id="low_alarm_temp" class="span6 m-wrap" style="width: 230px;"  name="low_alarm_temp">
         </td>
         </tr>
           </tbody>
           <!-- 负压 -->
           <tbody id="pressure" style="display:none;">
         <tr>
         <th style="text-align: center;" colspan="2">
                                     高报负压:
         </th>
         <td style="text-align: center;" colspan="2">
         <input type="text" id="high_alarm_negative_pressure" class="span6 m-wrap" style="width: 230px;" name="high_alarm_negative_pressure">
         </td>
         </tr>
         <tr>
         <th style="text-align: center;" colspan="2">
                                     低报负压:
         </th>
         <td style="text-align: center;" colspan="2">
         <input type="text" id="low_alarm_negative_pressure" class="span6 m-wrap" style="width: 230px;" name="low_alarm_negative_pressure">
         </td>
         </tr>
           </tbody>
           <!-- 二氧化碳 -->
           <tbody id="co2" style="display:none;">
         <tr>
         <th style="text-align: center;" colspan="2">
                                  高报二氧化碳:
         </th>
         <td style="text-align: center;" colspan="2">
         <input type="text" id="high_alarm_co2" class="span6 m-wrap" style="width: 230px;" name="high_alarm_co2">
         </td>
         </tr>
           </tbody>
           <!-- 饮水量 -->
           <tbody id="deprivation" style="display:none;">
         <tr>
         <th style="text-align: center;" colspan="2">
                                  目标饮水量:
         </th>
         <td style="text-align: center;" colspan="2">
         <input type="text" id="set_water_deprivation" class="span6 m-wrap" style="width: 230px;" name="set_water_deprivation">
         </td>
         </tr>
         <tr>
         <th style="text-align: center;" colspan="2">
                                      高报饮水量:
         </th>
         <td style="text-align: center;" colspan="2">
         <input type="text" id="high_water_deprivation" class="span6 m-wrap" style="width: 230px;" name="high_water_deprivation">
         </td>
         </tr>
         <tr>
         <th style="text-align: center;" colspan="2">
                                    低报饮水量:
         </th>
         <td style="text-align: center;" colspan="2">
         <input type="text" id="low_water_deprivation" class="span6 m-wrap" style="width: 230px;" name="low_water_deprivation">
         </td>
         </tr>
           </tbody>
         </table>                              
		<script>
			function closeB(){
				parent.layer.closeAll();
			}
		</script>
		</form>
		<!-- END FORM-->  
  </body>
</html>
