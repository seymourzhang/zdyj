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
<script type="text/javascript" src="<%=path%>/modules/alarm/js/alarmCurr.js"></script>
</head>
<script>
	jQuery(document).ready(function() {
		App.init(); // initlayout and core plugins
// 		reflushAlarmCurr();
// 		var win_h = $(window).height() - 208;
// 		 $("#real_date_table").css("min-height", win_h);
// 		$("#page-content").css("min-height", win_h);
	});
</script>
<body style="background-color: #ffffff;">
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

<!-- 								</div> -->

								<div class="portlet-body form1">
									<!-- BEGIN FORM-->
									<div class="form-horizontal" style="height: 40px;">
										<div style="height: 20px;">
										<%@ include file="../../framework/org.jsp"%>
<!-- 											<div class="span4"> -->
<!-- 												<div class="control-group"> -->
<!-- 													<label class="control-label" style="width: 60px;">农场</label> -->
<!-- 													<div class="controls" style="margin-left: 65px;"> -->
<!-- 														<select id="farmId" class="m-wrap span12" tabindex="1" name="farmId" onchange="reflushAlarmCurr2();">	 -->
<!-- 		                                                 <option value="">全部</option> -->
<!-- 		                                                 <c:if test="${!empty farmList}"> -->
<!-- 		                                                 <c:forEach var="farm" items="${farmList}"> -->
<!-- 		                                                 <option value="${farm.id }">${farm.farm_name_chs }</option> -->
<!-- 		                                                 </c:forEach> -->
<!-- 		                                                 </c:if> -->
<!-- 														</select> -->
<!-- 													</div> -->
<!-- 												</div> -->
<!-- 											</div> -->

											<!--/span-->

<!-- 											<div class="span4"> -->

<!-- 												<div class="control-group"> -->

<!-- 													<label class="control-label" style="width: 60px;">栋舍</label> -->

<!-- 													<div class="controls" style="margin-left: 65px;"> -->

<!-- 														<select id="houseId" class="m-wrap span12" tabindex="1"  onchange="reflushAlarmCurr();"> -->
<!-- 														<option value="">全部</option> -->
<!-- 		                                                 <c:if test="${!empty houseList}"> -->
<!-- 		                                                 <c:forEach var="house" items="${houseList}"> -->
<!-- 		                                                 <option value="${house.id }">${house.house_name}</option> -->
<!-- 		                                                 </c:forEach> -->
<!-- 		                                                 </c:if> -->
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
                    <div class="row-fluid">
                                <div class="span12">
                                    <hr style="height:10px;border:none;border-top:1px solid #555555;" />
                                </div>
                            </div>

					<!-- END PORTLET-->

<!-- 					<div class="portlet box blue1"> -->

<!-- 						<div class="portlet-title"> -->

<!-- 							<div class="caption"> -->
<!-- 								<i class="icon-globe"></i>警报列表 -->
<!-- 							</div> -->

<!-- 							<div class="tools"> -->
<!-- 								<a href="javascript:reflushAlarmCurr();" class="reload"></a> <a href="javascript:;" class="collapse"></a> -->
<!-- 							</div> -->

<!-- 						</div> -->

						<div class="portlet-body" style="overflow-x: auto; overflow-y: auto;" id="real_date_table">
							<table class="table table-striped table-bordered table-hover" >

								<thead style="color: #fff; background-color: #2586C4;">
                                    <tr>
                                        <th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/farm.png" style="width: 25px; height: 25px;" /></th>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/Shape.png" style="width: 25px; height: 25px;" /></th>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/Group 9.png" style="width: 25px; height: 25px;" /></th>
										<th colspan="2" style="text-align: center;"><img src="<%=path %>/modules/monitor/image/fact.png" style="width: 25px; height: 25px;" /></th>
										<th colspan="2" style="text-align: center;"><img src="<%=path %>/modules/monitor/image/Fill 166.png" style="width: 25px; height: 25px;" /></th>
										<th style="text-align: center;"><img src="<%=path %>/modules/monitor/image/worker.png" style="width: 25px; height: 25px;" /></th>
                                    </tr>
									<tr>
										<th style="text-align: center;">农场</th>
										<th style="text-align: center;">舍号</th>
										<th style="text-align: center;">报警类型</th>
										<th style="text-align: center;">报警值</th>
										<th style="text-align: center;">实际值</th>
<!-- 										<th style="text-align: center;">警报状态</th> -->
										<th style="text-align: center;">警报时间</th>
										<th style="text-align: center;">响应时间</th>
										<th style="text-align: center;">响应人员</th>
										<th style="text-align: center;">持续时间</th>
									</tr>

								</thead>
								<tbody id="tbodyAlarmCurrList">

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
