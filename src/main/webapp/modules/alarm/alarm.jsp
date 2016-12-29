<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<head>
<meta charset="utf-8" />
<%@ include file="../../framework/inc.jsp"%>
<link rel="stylesheet" href="<%=path %>/framework/css/datepicker.css" />

<script src="<%=path%>/framework/js/bootstrap_table/bootstrap-table.js"></script>
<link href="<%=path%>/framework/js/bootstrap_table/bootstrap-table.css" rel="stylesheet" />
<script src="<%=path%>/framework/js/bootstrap_table/locale/bootstrap-table-zh-CN.js"></script>

<link rel="stylesheet" href="<%=path%>/framework/js/bootstrap_editable/1.5.1/css/bootstrap-editable.css">
<script src="<%=path%>/framework/js/bootstrap_editable/1.5.1/js/bootstrap-editable.js"></script>
<script src="<%=path%>/framework/js/bootstrap_table/extensions/editable/bootstrap-table-editable.js"></script>

<script type="text/javascript" src="<%=path%>/framework/js/charts/highcharts.js"></script>
<!-- <script type="text/javascript" src="<%=path%>/framework/js/charts/exporting.src.js"></script> -->
<script type="text/javascript">
var isRead="1";//"${pd.write_read}";//菜单是否只读
	jQuery(document).ready(function() {
		App.init(); // initlayout and core plugins
		var win_h = $(window).height() - 208;
		$("#monitor_date_table").css("min-height", win_h);
		$("#page-content").css("min-height", win_h);
		 $("#user_date_table").css("min-height",win_h-80);
		 $("#container").css("height",win_h-100);
		 if(<%=request.getParameter("alarm_type")%>!='' && <%=request.getParameter("alarm_type")%>!=null){
		  document.getElementById('alarmType').value=<%=request.getParameter("alarm_type")%>;
		 }

		 if(document.getElementById('alarmType').value != 1){
			 $("#alarm_delay").attr("disabled",true);
			 $("#temp_cpsation").attr("disabled",true);
			 $("#yincang").attr("disabled",true);
			 $("#temp_cordon").attr("disabled",true);
		 }
		 		 
		 $("#temperature").click(function () {
			 document.getElementById('alarmType').value= "1";
// 			 $("#anniu").css("margin-left","0");
			 $("#alarmParam").css("display", "block");
			 
			 search();
	    });
		 $("#negativePressure").click(function () {
			 document.getElementById('alarmType').value= "2";
			 $("#alarmParam").css("display", "none");
			 search();
	    });
		 $("#carbon").click(function () {
			 document.getElementById('alarmType').value= "3";		 
			 $("#alarmParam").css("display", "none");
			 search();
	    });
		 
		 tempCordon();
// 		 search();
// 		 querySBDayageSettingSub();
	});
	
	function tempCordon(){
		if($("#temp_cpsation").val()==0){
			$("#temp_cordon").attr("disabled",true);
		}else {
			$("#temp_cordon").attr("disabled",false);
		}
	}
	
</script>

</head>
<body style="background-color: #ffffff;">
	<!--  <div class="container-fluid" id="main-container" style="background-color: #ffffff;"> -->
	<div id="page-content" class="clearfix" style="padding-top: 10px;">
		<div class="row-fluid" style="background-color: #ffffff;">
			<form action="" method="post" style="background-color: #ffffff;" id="alarmForm">
				<%-- <input type="hidden" name="id" value="${pd.id}">--%>
						<input type="hidden" name="alarm_type" value="1" id="alarmType"> 
				<div class="span12" style="margin-left: 0px;">
					<!-- BEGIN PORTLET-->
<!-- 					<div class="portlet box blue1"> -->
<!-- 								<div class="portlet-title"> -->
<!-- 									<div class="caption"> -->
<!-- 										<i class="icon-reorder"></i>检索条件 -->
<!-- 									</div> -->
<!-- 								</div> -->
                        <ul class="nav nav-pills">
                    <li  class="active" id="createBatch" style="text-align: center;width:33%;background-color: #BFBFBF;" >
                        <a href="#tabCreateBatch" data-toggle="tab" id="temperature">温度报警设置</a>
                    </li>
                    <li  id="overBatch" style="text-align: center;width:33%;background-color: #BFBFBF; " >
                        <a href="#tabOverBatch" data-toggle="tab" id="carbon">CO2报警设置</a>
                    </li>
                    <li  id="editBatch" style="text-align: center;width:34%;background-color: #BFBFBF; " >
                        <a href="#tabEditBatch" data-toggle="tab" id="negativePressure">光照报警设置</a>
                    </li>
                </ul>

								<div class="portlet-body form1">
									<!-- BEGIN FORM-->
									<div class="form-horizontal" style="height: 40px;">
										<div style="height: 20px;">
                                     <%@ include file="../../framework/org.jsp"%>

<!-- 											<div class="span2" style="width: 250px;"> -->

<!-- 												<div class="control-group"> -->

<!-- 													<label class="control-label" style="width: 90px;">报警类别</label> -->

<!-- 													<div class="controls" style="margin-left: 95px;"> -->
<!--                                                       <select id="alarmType" class="m-wrap span12" name="alarm_type" tabindex="1" onchange="search();"> -->
<!-- 														<option value="1">温度设置</option> -->
<!--                                                         <option value="2">负压设置</option> -->
<!--                                                         <option value="3">二氧化碳设置</option> -->
<!--                                                         <option value="4">饮水量设置</option> -->
<!-- 														</select> -->
<!-- 													</div> -->

<!-- 												</div> -->

<!-- 											</div> -->

											<!--/span-->
										</div>
									</div>
									<!-- END FORM-->
								</div>

<!-- 							</div> -->
                            <div class="row-fluid" >
                                <div class="span12" style="margin-top: -20px;">
                                    <hr style="height:1px;border:none;border-top:1px solid #555555;" />
                                </div>
                            </div>

					<!-- END PORTLET-->

<!-- 					<div class="portlet box blue1"> -->

<!-- 						<div class="portlet-title"> -->

<!-- 							<div class="caption"> -->
<!-- 								<i class="icon-globe"></i>报警设置列表 -->
<!-- 							</div> -->

<!-- 						</div> -->
                        
						<div class="portlet-body" style="overflow-x: auto; overflow-y: auto;margin-top: -10px;" >
<!-- 							<table class="table table-striped table-bordered table-hover" id="monitor_date_table"   -->
<!-- 							style="margin-left: 30px;float: left;width: 500px;" data-options="singleSelect:true,collapsible:true,method:'POST'">                               -->
<!-- 							</table> -->
                        <div id = "reflushText" style="display: none;  float:right;"><font color="#FF0000">刷新中,请稍后...</font></div>
                            <div id="TemperatureCurveFrame" style="display: block;margin-left: 20px;float: left;width: 503px;margin-top: -20px;">
                                <table id="TemperatureCurveTable" style="margin-left: 0px;float: left;width: 500px;"></table>
                            </div>

                            <div id="CarbonFrame" style="display: none;margin-left: 20px;float: left;width: 503px;margin-top: -20px;" >
                                <table id="CarbonTable" style="margin-left: 0px;float: left;width: 500px;"></table>
                            </div>
                            
                            <div id="NegativePressureFrame" style="display: none;margin-left: 20px;float: left;width: 1203px;margin-top: -20px;" >
                                <table id="NegativePressureTable" style="margin-left: 0px;float: left;width: 1200px;"></table>
                            </div>

                            <div id="WaterFrame" style="display: none;margin-left: 20px;float: left;width: 500px;" >
                                <table id="WaterTable" style="margin-left: 0px;float: left;width: 500px;"></table>
                            </div>
        
                            <div style="margin-left: 550px;height: 10px;width: 610px;margin-top: 0px;" id="alarmParam">
                             <div class="row-fluid">
                             <div class="span3"></div>
                             <div class="span3">
									  <span_customer>报警延迟</span_customer>
									  <select id="alarm_delay" name="alarm_delay" class="m-wrap span12" tabindex="1" onchange=""  style="margin-left:60px;margin-top: -40px;">													
														<c:if test="${!empty alarm_delay}">
		                                                 <c:forEach var="alarmDelay" items="${alarm_delay}">
		                                                 <option value="${alarmDelay.biz_code }">${alarmDelay.code_name }</option>
		                                                 </c:forEach>
		                                                 </c:if>
														</select>
								  </div>
<!-- 								  <div class="span3"></div> -->
								  <div class="span3" style="width:180px;margin-left: 70px; ">
									  <span_customer>语音报警</span_customer>
									  <a href="javascript:bindingUserUrl();" onclick="">上传报警通讯录</a>
								  </div>
								 </div>
								 <div class="row-fluid" style="margin-top: -130px;margin-left: 120px;">
                                <div class="span12">
                                    <hr style="height:0px;border:none;border-top:1px solid #555555;width: 550px;" />
                                </div>
                            </div>
							<div class="row-fluid" style="margin-top: -100px;">
							<div class="span3"></div>
                             <div class="span3" >
									  <span_customer>温度补偿</span_customer>
									  <select id="temp_cpsation" name="temp_cpsation" class="m-wrap span12" tabindex="1" onchange="tempCordon()" style="margin-left:60px;margin-top: -40px;">									                    
														<option value="1">是</option>
														<option value="0">否</option>                                                        
														</select>
								  </div>
								  <div class="span3" style="width:180px;margin-left: 70px; ">
									  <span_customer>补偿值</span_customer>
									  <input  type="text" id="temp_cordon" class="span6 m-wrap" style="width: 100px;margin-left: -15px;margin-top: -4px;" name="temp_cordon">
								  </div>
								 </div>	
								 <div class="row-fluid" style="margin-top: -130px;margin-left: 120px;">
                                <div class="span12">
                                    <hr style="height:0px;border:none;border-top:1px solid #555555;width: 550px;" />
                                </div>
                            </div>
                            <div class="row-fluid">
								 <div class="span3"></div>
								 <div class="span3">
									  设备信息
									  <select id="device_code" name="device_code" class="m-wrap span12" tabindex="1" style="margin-left:59px;margin-top: -40px;width: 300px;">
														                                                       
									 </select>
								 </div>
								 </div>
								 <div class="row-fluid">
								 <div class="span3"></div>
								 <div class="span3" style="width: 200px;margin-left: 0px;">
								  点温差报警
								  <input  type="text" id="point_alarm" class="span6 m-wrap" style="width: 100px;margin-left: 3px;margin-top: -7px;" name="point_alarm">
								 </div>
                             <div class="span3" style="width: 200px;">
									  <span_customer>报警形式</span_customer>
									  <select id="yincang" name="alarm_way" class="m-wrap span12" tabindex="1" style="width: 130px;margin-left: -2px;margin-top: -7px;">
<!-- 														onchange="alarmHide();" -->
														<option value="02">独立探头报警</option> 
														<option value="03">平均温度报警</option>                                                        
														</select>
								  </div>
								  
								  </div>
								 
								 <div class="row-fluid" id="yincang2" style="margin-left: 130px;width: 500px;">
								 </div>
								
						</div>

						<div class="portlet-body" style="margin-left: 25px;float:left; id="anniu">
						<button type="button" class="btn blue" onclick="openAdjustWin('${hourList}')" id="addData" style="display:">
<!-- 						<i class="icon-ok"></i> -->
<!-- 						<a href="javascript:addAlarmUrl();"><i class="icon-edit"></i> -->
						&nbsp;&nbsp;&nbsp;&nbsp;新增&nbsp;&nbsp;&nbsp;&nbsp;
<!-- 						</a> -->
						</button>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;
						<button type="button" class="btn blue" onclick="batchChange()" id="delData" style="display:">
                        &nbsp;&nbsp;&nbsp;&nbsp;删除&nbsp;&nbsp;&nbsp;&nbsp;
                         </button> 
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         &nbsp;&nbsp;
                         <button type="button" class="btn blue" onclick="update()" id="upData" style="display:">                                                          
<!--                          <a href="javascript:update();"><i class="icon-edit"></i> -->
                        &nbsp;&nbsp;&nbsp;&nbsp;保存&nbsp;&nbsp;&nbsp;&nbsp;
<!--                         </a> -->
                        </button>
                         <button type="button" class="btn blue" onclick="upAndAdd()" id="upData2" style="display:none;">                                                          
<!--                          <a href="javascript:update();"><i class="icon-edit"></i> -->
                        &nbsp;&nbsp;&nbsp;&nbsp;保存&nbsp;&nbsp;&nbsp;&nbsp;
<!--                         </a> -->
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;
                         <button type="button" class="btn blue" onclick="applyAlarmUrl()" style="display:">
<!--                          <a href="javascript:applyAlarmUrl();"><i class="icon-edit"></i> -->
                             &nbsp;&nbsp;  应用至&nbsp;&nbsp;
<!--                          </a> -->
                         </button>
						</div>
						</div>
                        
                       
					<br/>
					<div class="portlet box blue1">
								<div class="portlet-title">
									<div class="caption">
										<i class="icon-globe"></i>报警曲线图
									</div>
								</div>

								<div class="portlet-body" id="user_date_table">
									<input type="hidden" name="buttonValue" id="buttonValue">
									<div id="container" class="form-horizontal" ></div>
								</div>
							</div>
				</div>
			</form>
		</div>
	</div>
	<script type="text/javascript" src="<%=path%>/js/bootbox.min.js"></script>
	<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.zh-CN.js"></script>

<script type="text/javascript" src="<%=path%>/framework/table/table.js"></script>
<script type="text/javascript" src="<%=path%>/modules/alarm/js/alarm.js"></script>
</body>
</html>
