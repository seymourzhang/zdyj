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
<script type="text/javascript" src="<%=path%>/framework/js/extJquery.js"></script>
<script type="text/javascript" src="<%=path%>/modules/monitor/js/monitor.js"></script>
<%----%>
<!--图标样式-->
<!--     <link rel="stylesheet" href="<%=path %>/framework/css/zTreeStyle.css" /> -->

    <!--主要样式-->
<!--     <script type="text/javascript" src="<%=path %>/framework/jquery/jquery.ztree.core.js"></script> -->
<!-- 	<script type="text/javascript" src="<%=path %>/framework/jquery/jquery.ztree.excheck.js"></script> -->
</head>
<script>
	var xNames = new Array();//X坐标


var insideTemp1 = new Array();
var insideTemp2 = new Array();
var insideTemp3 = new Array();
var insideTemp4 = new Array();

var insideSetTemp = new Array();//目标温度
/* var insideAvgTemp = new Array();//实际温度 */
var highAlarmTemp = new Array();//高报温度
var lowAlarmTemp = new Array();//低报温度
var outsideTemp = new Array();//室外温度

<c:forEach items="${TemProfile }" var="tep">
	xNames.push('${tep.time }点');
	insideTemp1.push(${tep.inside_temp1 });
	insideTemp2.push(${tep.inside_temp2 });
	insideTemp3.push(${tep.inside_temp3 });
	insideTemp4.push(${tep.inside_temp4 });
	insideSetTemp.push(${tep.inside_set_temp });
	<%--/* insideAvgTemp.push(${tep.inside_avg_temp }); */--%>
	highAlarmTemp.push(${tep.high_alarm_temp });
	lowAlarmTemp.push(${tep.low_alarm_temp });
	outsideTemp.push(${tep.outside_temp });

</c:forEach>

jQuery(document).ready(function() {
App.init(); // initlayout and core plugins
// reflushMonitor();
$("#lm1").attr("class","active");
$("#se1").attr("class","selected");
$("#z101").attr("class","active");
$("#op1").attr("class","arrow open"); 
$("#monitorExpand").removeClass("collapse").addClass("expand");
// $("#monitorExpandForm").slideUp(200);
$("#monitor_date_table").removeClass("table-hover");

$("#enableMonitorSet").change(function() {
	OrgSearch(count0rg,num);
});
});

	//新增
    function monitorSetting(){
        layer.open({
            type: 2,
            title: "新增",
            skin: 'layui-layer-lan',
            area: ['450px', '450px'],
            content: '<%=path%>/monitor/monitorSet'
        });
    }

    function changeOrg() {
    	$.ajax({
    		type: "post",
    		url: "<%=path%>/monitor/getOrgBySetted",
    		data: {},
    		dataType: "json",
    		success: function (result) {
    			var setting = {
    				check: {
    					enable: true,
    					chkDisabledInherit:true
    				},
    				data: {
    					simpleData: {
    						enable: true
    					}
    				}
    			};
    			var zNodes = result.obj;
    			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
    		}
    	});
    }

	<%--console.log("farmList:" + ${farmList});--%>
</script>
<body style="background-color: #ffffff;">
	<%--引用跳转页面方法:siMenu()--%>
 	<script type="text/javascript" src="<%=path %>/framework/js/head.js"></script>
	<%--引用结束--%>
	<!--  <div class="container-fluid" id="main-container" style="background-color: #ffffff;"> -->
	<div id="page-content" class="clearfix" style="padding-top: 10px;">
		<div class="row-fluid" style="background-color:#ffffff;">
			<form id="farmData" method="post" style="background-color: #ffffff;">
				<%-- <input type="hidden" name="id" value="${pd.id}">
						<input type="hidden" name="pid" value="${pd.pid}"> --%>
				<div class="span12">
					<!-- BEGIN PORTLET-->
<!-- 					<div class="portlet box blue1"> -->
<!-- 								<div class="portlet-title"> -->
<!-- 									<div class="caption"> -->
<!-- 										<i class="icon-reorder"></i>检索条件 -->
<!-- 									</div> -->
<!-- 									<div class="tools"> -->
<!-- 									<a id="monitorExpand" href="javascript:;" class="collapse"></a> -->
<!-- 									</div> -->
<!-- 								</div> -->

								<div class="portlet-body form1" id="monitorExpandForm">
									<!-- BEGIN FORM-->
									<div class="form-horizontal" style="height: 40px;">
										<div style="height: 20px;">
										<script type="text/javascript">
										var allSearch = "true";
										</script>
										<%@ include file="../../framework/org.jsp"%>

											<!--/span-->

<!-- 											<div class="span4" style="margin-top: 5px;margin-left: 20px;"> -->
	
										<input id="enableMonitorSet" class="reload" type="checkbox" value="checked"  style="width: 100px;display: none"/>
<!-- 										<div style="margin-top: -18px;"> -->
<!-- 										<a href="javascript:;" style="margin-left: 60px;" onclick="monitorSetting();">启用监控设置</a>monitorSetting(); -->
<!-- 									    </div> -->

<!-- 											</div> -->
											<!--/span-->
										</div>
									</div>
									<!-- END FORM-->
								</div>

<!-- 							</div> -->

					<!-- END PORTLET-->

<!-- 					<div class="portlet box blue1"> -->

<!-- 						<div class="portlet-title"> -->

<!-- 							<div class="caption"> -->
<!-- 								<i class="icon-globe"></i>监控列表 -->
<!-- 							</div> -->

<!-- 							<div class="tools"> -->
<!-- 								<a href="javascript:reflushMonitor();" class="reload"></a> <a href="javascript:;" class="collapse"></a> -->
<!-- 							</div> -->

<!-- 						</div> -->

                        <div class="row-fluid">
                                <div class="span12">
                                    <hr style="height:10px;border:none;border-top:1px solid #555555;" />
                                </div>
                            </div>

						<div class="portlet-body" style="overflow-x: auto; overflow-y: auto;" >
							<table class="table table-striped table-bordered table-hover"  id="monitor_date_table">
								<thead style="color: #fff; background-color: #2586C4;">
									<tr>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/farm.png" style="width: 25px; height: 25px;" /></th>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/Shape.png" style="width: 25px; height: 25px;" /></th>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/Fill 203.png" style="width: 25px; height: 25px;" /></th>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/Group 9.png" style="width: 25px; height: 25px;" /></th>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/goal.png" style="width: 25px; height: 25px;" /></th>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/out.png" style="width: 25px; height: 25px;" /></th>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/avg.png" style="width: 25px; height: 25px;" /></th>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/pointTemp.png" style="width: 25px; height: 25px;" /></th>
										<th colspan="5" style="text-align: center;">温度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="<%=path %>/modules/monitor/image/Group 11.png" style="height: 25px;" /></th>
										
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/humidity.png" style="width: 25px; height: 25px;" /></th>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/light.png" style="width: 25px; height: 25px;" /></th>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/co2.png" style="width: 25px; height: 25px;" /></th>

<!-- 										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/Page 1.png" /></th> -->
<!-- 										<th colspan="2" style="text-align: center;"><img src="<%=path %>/modules/monitor/image/Group 18.png" /></th> -->
<!-- 										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/Fill 89.png" /></th> -->
<!-- 										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/Group 10.png" /></th> -->
<!-- 										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/Fill 1.png" /></th> -->
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/Fill 166.png" style="width: 25px; height: 25px;" /></th>
									</tr>
									<tr>
										<th style="text-align: center; border-right:12px solid #2586C4;">农场</th>
										<th style="text-align: center;">栋号</th>
										<th style="text-align: center;">日龄</th>
										<th style="text-align: center;">状态</th>
										
										
										<th style="text-align: center;">目标</th>
										<th style="text-align: center;">室外</th>
										<th style="text-align: center;">平均</th>
										<th style="text-align: center;">点温差</th>
										<th style="text-align: center;">前区1</th>
										<th style="text-align: center;">前区2</th>
										<th style="text-align: center;">中区</th>
										<th style="text-align: center;">后区1</th>
										<th style="text-align: center;">后区2</th>
										<th style="text-align: center;">湿度</th>
										<th style="text-align: center;">光照</th>
										<th style="text-align: center;"><span>CO</span><span style="font-size: 8px;">2</span></th>
										
<!-- 										<th style="text-align: center;">负压</th> -->
										
<!-- 										<th style="text-align: center;">大</th> -->
<!-- 										<th style="text-align: center;">小</th> -->
										
<!-- 										<th style="text-align: center;">小窗</th> -->
<!-- 										<th style="text-align: center;">加热</th> -->
<!-- 										<th style="text-align: center;">制冷</th> -->
										<th style="text-align: center;">时间</th>
									</tr>

								</thead>
								<tbody id="tbodyMonitorCurList">

								</tbody>

							</table>

						</div>

<!-- 					</div> -->
				</div>
			</form>
		</div>
	</div>
	<!-- #main-content -->
	<!-- </div>  -->
	<script type="text/javascript" src="<%=path%>/js/bootbox.min.js"></script>
	<!-- 确认窗口 -->
</body>
</html>
