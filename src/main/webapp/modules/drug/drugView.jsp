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
</head>

<body style="background-color: #ffffff;" >
			<div id="page-content" class="clearfix"  style="padding-top: 10px;"> 
				<div class="row-fluid" style="background-color: #ffffff;">
					  <div class="span12">
						  <div class="tabbable tabbable-custom boxless tabs-left" >
							  <ul class="nav nav-pills">
								  <li  class="active" id="stateTab" style="text-align: center;width:50%;background-color: #BFBFBF;" ><a href="#state2" onclick="forward3();"  data-toggle="tab" id="stateTab1">计划查询</a></li>
								  <li  id="detailTab" style="text-align: center;width:50%;background-color: #BFBFBF;" ><a href="#detail2" onclick="forward2();"  data-toggle="tab" id="detailTab1">实际执行</a></li>
							  </ul>
						  </div>

						  <div class="tab-content" style="border:none">
							  <div class="tab-pane active" id="state2">
								  <form id="planForm">
									  <div class="container-fluid">
										  <div class="row-fluid">
											  <div class="span3" align="left">
												  <span_customer>生长周龄</span_customer>
												  <input type="text" id="grow_week_age" name="grow_week_age">
											  </div>
											  <div class="span3" align="left">
												  <span_customer>类型</span_customer>
												  <select id="good_type" tabindex="1"  name="good_type">
<!-- 													  <option value="">全部</option> -->
													  <c:if test="${!empty goodTypeList}">
														  <c:forEach var="goodType" items="${goodTypeList}">
															  <option value="${goodType.biz_code }">${goodType.code_name}</option>
														  </c:forEach>
													  </c:if>
												  </select>
											  </div>
											  <div class="span3" align="left">
												  <span_customer>品名</span_customer>
												  <select id="drug_id"  tabindex="1"  name="drug_id" >
<!-- 													  <option value="">全部</option> -->
													  <c:if test="${!empty goodsList}">
														  <c:forEach var="goods" items="${goodsList}">
															  <option value="${goods.good_id }">${goods.good_name}</option>
														  </c:forEach>
													  </c:if>
												  </select>
											  </div>
<!-- 											  <div class="span3" align="left"> -->
<!-- 												  <span_customer>使用方法</span_customer> -->
<!-- 												  <select id="instruction" tabindex="1"  name="instruction" > -->
<!-- 													  <c:if test="${!empty useTypeList}"> -->
<!-- 														  <c:forEach var="useType" items="${useTypeList}"> -->
<!-- 															  <option value="${useType.biz_code }">${useType.code_name}</option> -->
<!-- 														  </c:forEach> -->
<!-- 													  </c:if> -->
<!-- 												  </select> -->
<!-- 											  </div> -->
                                           
											  <div class="span3" align="left">
												  <button type="button" class="btn blue" onclick="searchData('plan');" id="qued">查询</button>
											  </div>
										  </div>
										  </div>

										  <div class="row-fluid">
											  <div class="span3" align="left" style="margin-left: 20px;">
											  <span_customer>起始周龄</span_customer>
												  <input type="text" id="start_grow_week_age" name="start_grow_week_age">
											  </div>
											  <div class="span3" align="left" style="margin-left: 17px;">
											  <span_customer>结束周龄</span_customer>
												  <input type="text" id="end_grow_week_age" name="end_grow_week_age">
											  </div>
										  </div>


										  <div class="row-fluid">
											  <div class="span12">
												  <hr style="height:10px;border:none;border-top:1px solid #555555;" />
											  </div>
										  </div>

										  <div class="row-fluid">
											  <div class="span12">
												  <p id = "planFarmTitle" align="center">
													  <font size='4' ><B>${pd.company}</B></font>
												  </p>
											  </div>
										  </div>

										  <div class="row-fluid">
											  <div class="span12">
												  <table id="planTable"></table>
											  </div>
										  </div>
									  </div>
									</form>
							  </div>

							  <div class="tab-pane" id="detail2">
								  <input type="hidden" name="farmId" id="farmId" value="${pd.farm_id }">
								  <input type="hidden" name="farm_name" id="farm_name" value="${pd.farm_name }">
								  <div class="container-fluid">
									  <div class="row-fluid">
										  <div class="span3" align="left">
											  <span_customer>日期</span_customer>
											  <div class="input-append date date-picker" data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
												  <input class="m-wrap  span11 m-ctrl-medium date-picker " readonly type="text" name="use_date" value="${systemDate }" id="use_date"/><span class="add-on"><i class="icon-calendar"></i></span>
											  </div>
										  </div>
<!-- 										  <div class="span3" align="left"> -->
<!-- 											<span_customer>使用方法</span_customer> -->
<!-- 											  <select id="instruction1" tabindex="1"  name="instruction1"> -->
<!-- 												  <c:if test="${!empty useTypeList}"> -->
<!-- 													  <c:forEach var="useType" items="${useTypeList}"> -->
<!-- 														  <option value="${useType.biz_code }">${useType.code_name}</option> -->
<!-- 													  </c:forEach> -->
<!-- 												  </c:if> -->
<!-- 											  </select> -->
<!-- 										  </div> -->
										  <div class="span3" align="left">
											  <span_customer>品名</span_customer>
											  <select id="drug_id1" tabindex="1"  name="drug_id1" onchange="setFactory();">
<!-- 												  <option value="">全部</option> -->
												  <c:if test="${!empty goodsList}">
													  <c:forEach var="goods" items="${goodsList}">
														  <option value="${goods.good_id }">${goods.good_name}</option>
													  </c:forEach>
												  </c:if>
											  </select>
										  </div>
										  <div class="span3" align="left">
											  <span_customer>用途</span_customer>
											  <input type="text" id="use_type" name="use_type">
										  </div>
										  <div class="span3" align="left">
											  <span_customer>负责人</span_customer>
											  <select id="use_user_id" tabindex="1"  name="use_user_id" >
<!-- 												  <option value="">全部</option> -->
												  <c:if test="${!empty userList}">
													  <c:forEach var="user" items="${userList}">
														  <option value="${user.id }">${user.user_real_name}</option>
													  </c:forEach>
												  </c:if>
											  </select>
										  </div>
									  </div>

									  <div class="row-fluid">
										  <div class="span3" align="left">
											  <span_customer>类型</span_customer>
											  <select id="good_type1" tabindex="1"  name="good_type"  onchange="setDrugId1();">
<!-- 												  <option value="">全部</option> -->
												  <c:if test="${!empty goodTypeList}">
													  <c:forEach var="goodType" items="${goodTypeList}">
														  <option value="${goodType.biz_code }">${goodType.code_name}</option>
													  </c:forEach>
												  </c:if>
											  </select>
										  </div>
										  <div class="span3" align="left">
											  <span_customer>使用数量</span_customer>
											  <input type="text" id="use_unit" name="use_unit">
										  </div>
										  <div class="span3" align="left">
											  <span_customer>批号</span_customer>
											  <input type="text" id="good_batch_no" name="good_batch_no">
										  </div>
										  <div class="span3" align="left">
											  <button type="button" class="btn green" onclick="addDrug();" id="add">确认</button>
										  </div>
									  </div>

									  <div class="row-fluid">
										  <div class="span3" align="left">
											  <span_customer>栋舍</span_customer>
											  <select id="houseId" tabindex="1"  name="houseId" >
<!-- 												  <option value="">全部</option> -->
												  <c:if test="${!empty houseList}">
													  <c:forEach var="house" items="${houseList}">
														  <option value="${house.org_id }">${house.org_name}</option>
													  </c:forEach>
												  </c:if>
											  </select>
										  </div>
										  <div class="span3" align="left">
											  <span_customer>主要成分</span_customer>
											  <input type="text" id="main_constitute" name="main_constitute">
										  </div>
										  <div class="span3" align="left">
											  <span_customer>厂家</span_customer>
											  <select id="factory_id" tabindex="1"  name="factory_id">
											  </select>
										  </div>
										  
									  </div>

									  <div class="row-fluid">
										  <div class="span12">
											  <hr style="height:10px;border:none;border-top:1px solid #555555;" />
										  </div>
									  </div>

									  <div class="row-fluid">
										  <div class="span4" align="left">
											  <div id="factToolbar" class="btn-group">
												  <button id='factToolbar_btn_delete' type='button' class='btn blue' style="display: inline;" onclick="javascript:deleteDrug();">
													  <span class='glyphicon glyphicon-plus' aria-hidden='true'></span>删除
												  </button>
											  </div>

										  </div>
										  <div class="span4" align="center">
											  <p id = "factFarmTitle" align="center">
												  <font size='4' ><B>${pd.farm_name}</B></font>
											  </p>
										  </div>
										  <div class="span4">

										  </div>
									  </div>
									  <div class="row-fluid">
										  <div class="span12">
											  <table id="factTable"></table>
										  </div>

									  </div>
								  </div>
							  </div>

						  </div>


					  </div>
				</div>
			</div>
		  
<script type="text/javascript" src="<%=path%>/js/bootbox.min.js"></script>
<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.zh-CN.js"></script>
<script type="text/javascript" src="<%=path%>/framework/table/table.js"></script>
<script type="text/javascript" src="<%=path%>/modules/drug/js/drugView.js"></script>
</body>
</html>
