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
<script type="text/javascript" src="<%=path%>/framework/js/charts/highcharts.js"></script>
<script type="text/javascript" src="<%=path%>/framework/js/charts/exporting.src.js"></script>
<script type="text/javascript" src="<%=path%>/modules/report/js/alarmHist.js"></script>
</head>
<script>
</script>

<body style="background-color: #ffffff;" >
			<div id="page-content" class="clearfix"  style="padding-top: 10px;"> 
				<div class="row-fluid" style="background-color: #ffffff;">
					<form action="<%=path%>/alarmHist/queryAlarmHist2"  method="post" style="background-color: #ffffff;" id="alarmHistForm">
					
					  <div class="span12">
						  <%--raymon 20160922--%>
						  <div class="tabbable tabbable-custom boxless tabs-left" >
							  <%--<ul class="nav nav-tabs" >--%>
							  <ul class="nav nav-pills">
								  <li  class="active" id="stateTab" style="text-align: center;width:50%;background-color: #BFBFBF;" ><a href="#" onclick="forward3();"  data-toggle="tab" id="stateTab1">历史统计</a></li>
								  <li  id="detailTab" style="text-align: center;width:50%;background-color: #BFBFBF;font-style: " ><a href="#" onclick="forward2();"  data-toggle="tab" id="detailTab1">历史明细</a></li>
							  </ul>
						  <%--raymon 20160922--%>


								<div class="tab-content">
								  <div class="tab-pane active" >

										<!-- BEGIN PORTLET-->
									    <%--raymon 20160922--%>
										<%--<div class="portlet box blue1">--%>
											<%--raymon 20160922--%>
											<%--<div class="portlet-title">--%>
												<%--<div class="caption">--%>
													<%--<i class="icon-reorder"></i>检索条件--%>
												<%--</div>--%>
												<%--<!-- <div class="actions">--%>

													<%--<a href="javascript:;" class="btn green"><i class="icon-search"></i> 查询</a>--%>

												<%--</div> -->--%>

											<%--</div>--%>
											<%--raymon 20160922--%>
											<div class="portlet-body form1">
												<!-- BEGIN FORM-->
												<div class="form-horizontal">
													<div>
													<%@ include file="../../framework/org.jsp"%>
													 <div id="state2">
													  
<!-- 													 <div class="span3" style="width: 250px;"> -->
<!-- 															<div class="control-group"> -->
<!-- 																<label class="control-label" style="width: 30px;">公司</label> -->
<!-- 																<div class="controls" style="margin-left: 35px;"> -->
<!-- 																	<select id="companyId" style="width: 200px;" tabindex="1" name="companyId"> -->
<!-- 			 															<option value="">中粮肉食投资有限公司</option>   -->
<!-- 																	</select> -->
<!-- 																</div> -->
<!-- 															</div> -->
<!-- 														</div> -->
														
<!-- 														<div class="span3" style="width: 220px;"> -->
<!-- 															<div class="control-group"> -->
<!-- 																<label class="control-label" style="width: 30px;">基地</label> -->
<!-- 																<div class="controls" style="margin-left: 35px;"> -->
<!-- 																	<select id="jidiId" style="width: 160px;" tabindex="1" name="jidiId"> -->
<!-- 			 															<option value="">吉林养殖</option>   -->
<!-- 																	</select> -->
<!-- 																</div> -->
<!-- 															</div> -->
<!-- 														</div> -->
													 
<!-- 														<div class="span3" style="width: 220px;"> -->
<!-- 															<div class="control-group"> -->
<!-- 																<label class="control-label" style="width: 30px;">农场</label> -->
<!-- 																<div class="controls" style="margin-left: 35px;"> -->
<!-- 																	<select id="farmId" style="width: 160px;" tabindex="1" name="farmId" onchange="reflushAlarmHist(1);"> -->
<!-- 																		 <c:if test="${!empty farmList}"> -->
<!-- 																		 <c:forEach var="farm" items="${farmList}"> -->
<!-- 																		 <option value="${farm.id }">${farm.farm_name_chs }</option> -->
<!-- 																		 </c:forEach> -->
<!-- 																	 </c:if> -->
<!-- 																	</select> -->
<!-- 																</div> -->
<!-- 															</div> -->
<!-- 														</div> -->

														<!--/span-->

<!-- 														<div class="span3" style="width: 220px;"> -->

<!-- 															<div class="control-group"> -->
<!-- 																<label class="control-label" style="width: 30px;">栋舍</label> -->
<!-- 																<div class="controls" style="margin-left: 35px;"> -->
<!-- 																	<select id="houseId" class="m-wrap span12" tabindex="1" name="houseId" onchange="reflushAlarmHist2(1);"> -->
<!-- 																		 <c:if test="${!empty houseList}"> -->
<!-- 																		 <c:forEach var="house" items="${houseList}"> -->
<!-- 																		 <option value="${house.id }">${house.house_name}</option> -->
<!-- 																		 </c:forEach> -->
<!-- 																		 </c:if> -->
<!-- 																	</select> -->
<!-- 																</div> -->
<!-- 															</div> -->

<!-- 														</div> -->

														<div class="span3">
															<div class="control-group">
																<label class="control-label" style="width: 30px;margin-left: 60px;">批次</label>
																<div class="controls" style="margin-left: 95px;">
																	<select id="batchId" class="m-wrap span12" tabindex="1" name="batchId" onchange="reflushAlarmHist3(1);">
<!-- 																		<c:if test="${!empty batchList}"> -->
<!-- 																			<c:forEach var="batch" items="${batchList}"> -->
<!-- 																				<option value="${batch.id }">${batch.id}</option> -->
<!-- 																			</c:forEach> -->
<!-- 																		</c:if> -->
																	</select>
																</div>
															</div>
														</div>
                                                        
                                                        </div>
                                                        
                                                        <div id="detail2">
                                                        <input type="hidden" name="dateage" id="dateage">
                                                         
<!--                                                         <div class="span3" style="width: 250px;"> -->
<!-- 															<div class="control-group"> -->
<!-- 																<label class="control-label" style="width: 30px;">公司</label> -->
<!-- 																<div class="controls" style="margin-left: 35px;"> -->
<!-- 																	<select id="companyId" class="m-wrap span12" tabindex="1" name="companyId"> -->
<!-- 			 															<option value="">中粮肉食投资有限公司</option>   -->
<!-- 																	</select> -->
<!-- 																</div> -->
<!-- 															</div> -->
<!-- 														</div> -->
														
<!-- 														<div class="span3" style="width: 220px;"> -->
<!-- 															<div class="control-group"> -->
<!-- 																<label class="control-label" style="width: 30px;">基地</label> -->
<!-- 																<div class="controls" style="margin-left: 35px;"> -->
<!-- 																	<select id="jidiId" class="m-wrap span12" tabindex="1" name="jidiId"> -->
<!-- 			 															<option value="">吉林养殖</option>   -->
<!-- 																	</select> -->
<!-- 																</div> -->
<!-- 															</div> -->
<!-- 														</div> -->
                                                        
<!--                                                         <div class="span3" style="width: 220px;"> -->
<!-- 															<div class="control-group"> -->
<!-- 																<label class="control-label" style="width: 30px;">农场</label> -->
<!-- 																<div class="controls" style="margin-left: 35px;"> -->
<!-- 																	<select id="farmId2" class="m-wrap span12" tabindex="1" name="farmId2" onchange="reflushAlarmHist(2);"> -->
<!-- 																		 <c:if test="${!empty farmList}"> -->
<!-- 																		 <c:forEach var="farm" items="${farmList}"> -->
<!-- 																		 <option value="${farm.id }">${farm.farm_name_chs }</option> -->
<!-- 																		 </c:forEach> -->
<!-- 																	 </c:if> -->
<!-- 																	</select> -->
<!-- 																</div> -->
<!-- 															</div> -->
<!-- 														</div> -->

														

<!-- 														<div class="span3" style="width: 220px;"> -->

<!-- 															<div class="control-group"> -->
<!-- 																<label class="control-label" style="width: 30px;">栋舍</label> -->
<!-- 																<div class="controls" style="margin-left: 35px;"> -->
<!-- 																	<select id="houseId2" class="m-wrap span12" tabindex="1" name="houseId2" onchange="reflushAlarmHist2(2);"> -->
<!-- 																		 <c:if test="${!empty houseList}"> -->
<!-- 																		 <c:forEach var="house" items="${houseList}"> -->
<!-- 																		 <option value="${house.id }">${house.house_name}</option> -->
<!-- 																		 </c:forEach> -->
<!-- 																		 </c:if> -->
<!-- 																	</select> -->
<!-- 																</div> -->
<!-- 															</div> -->

<!-- 														</div> -->

														<div class="span3" style="width: 220px;">
															<div class="control-group">
																<label class="control-label" style="width: 60px;">批次</label>
																<div class="controls" style="margin-left: 65px;">
																	<select id="batchId2" class="m-wrap span12" tabindex="1" name="batchId2" onchange="reflushAlarmHist3(2);">
<!-- 																		<c:if test="${!empty batchList}"> -->
<!-- 																			<c:forEach var="batch" items="${batchList}"> -->
<!-- 																				<option value="${batch.id }">${batch.id}</option> -->
<!-- 																			</c:forEach> -->
<!-- 																		</c:if> -->
																	</select>
																</div>
															</div>
														</div>
														<div class="span3" style="width: 220px;">
															<div class="control-group">
																<label class="control-label" style="width: 60px;">报警类型</label>
																<div class="controls" style="margin-left: 65px;">
																	<select id="bizCode" class="m-wrap span12" tabindex="1" name="bizCode" onchange="reflushAlarmHist4();">
																		<option value="">全部</option>
																		<c:if test="${!empty alarmNameList}">
																			<c:forEach var="alarm" items="${alarmNameList}">
																				<option value="${alarm.biz_code }">${alarm.code_name}</option>
																			</c:forEach>
																		</c:if>
																	</select>
																</div>
															</div>
														</div>
														<div class="row-fluid">
														<div class="span12">
														<div class="span3" style="width: 220px;">
															<div class="control-group">
																<label class="control-label" style="width: 60px;">起始时间</label>
																<div class="controls" style="margin-left: 65px;">
														<div class="input-append date date-picker" data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
															<input class="m-wrap  span11 m-ctrl-medium date-picker " readonly type="text" name="beginTime" id="beginTime" onchange="reflushAlarmHist4();" /><span class="add-on"><i class="icon-calendar"></i></span>			
														</div>
													    </div>
															</div>
														</div>
														
														<div class="span3" style="width: 220px;">
															<div class="control-group">
																<label class="control-label" style="width: 60px;">截止时间</label>
																<div class="controls" style="margin-left: 65px;">
														<div class="input-append date date-picker" data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
															<input class="m-wrap  span11 m-ctrl-medium date-picker " readonly type="text" name="endTime" id="endTime" onchange="reflushAlarmHist4();" /><span class="add-on"><i class="icon-calendar"></i></span>			
														</div>
													    </div>
															</div>
														</div>
														
												
														</div>
														</div>
                                                        </div>
                                                        
                                                        <div class="row-fluid">
							                                <div class="span12">
							                                    <hr style="height:10px;border:none;border-top:1px solid #555555;" />
							                                </div>
							                            </div>
                                                        
                                                        <div class="tab-pane active" id="tab_state">
                                                        <div class="row-fluid">
							                                <div class="span12">
							                                    <div id="alarmHistFrame" align="center">
							                                        <table id="alarmHistTable"></table>
							                                    </div>
							                                </div>
							                            </div>
<!--                                                         <div class="portlet-body" id="user_date_table"> -->
<!-- 									<table class="table table-striped table-bordered table-hover" id="sample_1"> -->
<!-- 										<thead> -->
<!-- 											<tr> -->
												<!-- <th class="hidden-480" style="text-align: center;">编号</th> -->
<!-- 												<th>农场</th> -->
<!-- 												<th>栋舍</th> -->
<!-- 												<th>日龄</th> -->
<!-- 												<th>高温报警</th> -->
<!-- 												<th>低温报警</th> -->
<!-- 												<th>高负压报警</th> -->
<!-- 												<th>低负压报警</th> -->
<!-- 												<th>高二氧化碳报警</th> -->
<!-- 												<th>高饮水量报警</th> -->
<!-- 												<th>低饮水量报警</th> -->
<!-- 											</tr> -->
<!-- 										</thead> -->
										
<!-- 										<tbody id="tbodyAlarmHistList"> -->
<!-- 										<c:if test="${!empty AlarmHist}"> -->
<!-- 											<c:forEach var="bl" items="${AlarmHist}" varStatus="vs"> -->
<!-- 											<tr class="odd gradeX" onclick="forward(${bl.farm_id},${bl.house_id},${bl.date_age},${bl.batch_no},'${bl.date }');"> -->
<!-- 												<%-- <td class="hidden-480" style="text-align: center;">${bl.id}</td> --%> -->
<!-- 												<td>${bl.farm_name}</td> -->
<!-- 												<td>${bl.house_name}</td> -->
<!-- 												<td id="detailTab">${bl.date_age}</td> -->
<!-- 												<td>${bl.high_temp_num}</td> -->
<!-- 												<td>${bl.low_temp_num}</td> -->
<!-- 												<td>${bl.high_negative_pressure_num}</td> -->
<!-- 												<td>${bl.low_negative_pressure_num}</td> -->
<!-- 												<td>${bl.high_co2_num}</td> -->
<!-- 												<td>${bl.high_water_num}</td> -->
<!-- 												<td>${bl.low_water_num}</td> -->
<!-- 											</tr> -->
<!-- 											</c:forEach> -->
<!-- 										</c:if> -->
<!-- 										</tbody> -->
<!-- 									</table> -->
<!-- 								</div>														 -->
                                </div>
													</div>

												</div>

												<!-- END FORM-->

											</div>

										
							</div>
							<div class="tab-pane" id="tab_detail">
                                  <div class="portlet-body form1">
												<!-- BEGIN FORM-->
												<div class="form-horizontal">
													<div>
                                                        <div class="row-fluid">
							                                <div class="span12">
							                                    <div id="alarmHistDetailFrame" align="center">
							                                        <table id="alarmHistDetailTable"></table>
							                                    </div>
							                                </div>
							                            </div>
<!--                                                         <div class="portlet-body" id="user_date_table"> -->
<!-- 									<table class="table table-striped table-bordered table-hover" id="sample_1"> -->
<!-- 										<thead> -->
<!-- 											<tr> -->
<!-- 											    <th>日龄</th> -->
<!-- 												<th>报警时间</th> -->
<!-- 												<th>报警类型</th> -->
<!-- 												<th>目标值</th> -->
<!-- 												<th>实际值</th> -->
<!-- 												<th>持续时间</th> -->
<!-- 												<th>执行人</th> -->
<!-- 											</tr> -->
<!-- 										</thead> -->
										
<!-- 										<tbody id="tbodyAlarmHistDetailList"> -->
<!-- 										<c:if test="${!empty AlarmHistDetail}"> -->
<!-- 											<c:forEach var="bl" items="${AlarmHistDetail}" varStatus="vs"> -->
<!-- 											<tr class="odd gradeX"> -->
<!-- 											    <td>${bl.date_age}</td> -->
<!-- 												<td>${bl.alarm_time}</td> -->
<!-- 												<td>${bl.alarm_Name}</td> -->
<!-- 												<td>${bl.set_value}</td> -->
<!-- 												<td>${bl.actual_value}</td> -->
<!-- 												<td>${bl.continue_time}分钟</td>  -->
<!-- 												<td>${bl.response_person}</td> -->
<!-- 											</tr> -->
<!-- 											</c:forEach> -->
<!-- 										</c:if> -->
<!-- 										</tbody> -->
<!-- 									</table> -->
<!-- 								</div> -->

													</div>

												</div>

											</div>

								  </div>	  
							  </div></div>
						  <%--raymon--%>
						</div>
					</form>
				</div> 
		 </div> 
<script type="text/javascript" src="<%=path%>/js/bootbox.min.js"></script>
<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.zh-CN.js"></script>
<script type="text/javascript" src="<%=path%>/framework/table/table.js"></script>
</body>
</html>
