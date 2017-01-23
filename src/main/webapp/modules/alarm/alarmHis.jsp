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
	<script type="text/javascript" src="<%=path%>/framework/table/table.js"></script>
	<script type="text/javascript" src="<%=path%>/modules/alarm/js/alarmHis.js"></script>
<!-- <script type="text/javascript" src="<%=path%>/framework/js/charts/exporting.src.js"></script> -->
<script type="text/javascript">
var isRead="1";//"${pd.write_read}";//菜单是否只读

</script>

</head>
<body style="background-color: #ffffff;">
	<!--  <div class="container-fluid" id="main-container" style="background-color: #ffffff;"> -->
	<div id="page-content" class="clearfix" style="padding-top: 10px;">
		<div class="row-fluid" style="background-color: #ffffff;">
			<form action="" method="post" style="background-color: #ffffff;" id="alarmForm">
				<%-- <input type="hidden" name="id" value="${pd.id}">--%>
<!-- 						<input type="hidden" name="alarm_type" value="1" id="alarmType">  -->
						
				<div class="container-fluid">
				 <%--<div class="row-fluid">--%>
				 <%--<div class="form-horizontal" style="height: 40px;">--%>
										<%--<div style="height: 20px;">--%>
					 <%--<div class="span12">--%>
						 <%@ include file="../../framework/org.jsp"%>
					 <%--</div>--%>


										<%--</div>	--%>
										<%--<div class="span3">--%>
												<%----%>
											<%--</div>									--%>
									<%--</div>--%>
									
				 <%--</div>--%>
								<div class="row-fluid">
									<div class="span3">
										<span_customer>报警类别</span_customer>
										<select id="alarm_type"  name="alarm_type" tabindex="1" >
											<option value="1">温度设置</option>
											<option value="2">光照设置</option>
											<option value="3">二氧化碳设置</option>
											<option value="4">基础设置</option>
										</select>
									</div>

									<div class="span3" >
									 <span_customer>开始时间</span_customer>
											<div class="input-append date date-picker"  data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
												<input class="m-wrap span11 m-ctrl-medium  date-picker1 "   readonly type="text" name="start_date" id="start_date" />
												<span class="add-on"><i class="icon-calendar"></i></span>
											</div>	
									</div>
									<div class="span3">
									 <span_customer>结束时间</span_customer>
											<div class="input-append date date-picker"  data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
												<input class="m-wrap span11 m-ctrl-medium  date-picker1 "   readonly type="text" name="end_date" id="end_date"/>
												<span class="add-on"><i class="icon-calendar"></i></span>
											</div>		
									</div>

									<div class="span3">
										<button type="button" class="btn blue" onclick="searchData();" ><i class="icon-search"></i>查询</button>
									</div>

									</div>
                            <div class="row-fluid" >
                                <div class="span12" style="margin-top: -20px;">
                                    <hr style="height:1px;border:none;border-top:1px solid #555555;" />
                                </div>
                            </div>
                        
						<div class="portlet-body" style="overflow-x: auto; overflow-y: auto;" >
<!--                         <div id = "reflushText" style="display: none;  float:right;"><font color="#FF0000">刷新中,请稍后...</font></div> -->
                            <div id="TemperatureCurveFrame" style="display:block;margin-left: 20px;float: left;width: 1203px;">
                                <table id="TemperatureCurveTable" style="margin-left: 0px;float: left;width: 1200px;"></table>
                            </div>

                            <div id="CarbonFrame" style="display:none;margin-left: 20px;float: left;width: 1203px;" >
                                <table id="CarbonTable" style="margin-left: 0px;float: left;width: 1200px;"></table>
                            </div>
                            
                            <div id="NegativePressureFrame" style="display:none;margin-left: 20px;float: left;width: 1203px;" >
                                <table id="NegativePressureTable" style="margin-left: 0px;float: left;width: 1200px;"></table>
                            </div>
                            
                            <div id="BasisFrame" style="display:none;margin-left: 20px;float: left;width: 1203px;" >
                                <table id="BasisTable" style="margin-left: 0px;float: left;width: 1200px;"></table>
                            </div>
 
						</div>
                        
                       
					<br/>
				</div>
			</form>
		</div>
	</div>
	<script type="text/javascript" src="<%=path%>/js/bootbox.min.js"></script>
	<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.zh-CN.js"></script>


</body>
</html>
