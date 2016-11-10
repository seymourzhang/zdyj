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
</head>

<body style="background-color: #ffffff;" >
			<div id="page-content" class="clearfix"  style="padding-top: 10px;"> 
				<div class="row-fluid" style="background-color: #ffffff;">
<!-- 					<form action=""  method="post" style="background-color: #ffffff;"> -->
					
					  <div class="span12">
						  <div class="tabbable tabbable-custom boxless tabs-left" >
							  <ul class="nav nav-pills">
								  <li  class="active" id="stateTab" style="text-align: center;width:50%;background-color: #BFBFBF;" ><a href="#state2" onclick="forward3();"  data-toggle="tab" id="stateTab1">计划</a></li>
								  <li  id="detailTab" style="text-align: center;width:50%;background-color: #BFBFBF;" ><a href="#detail2" onclick="forward2();"  data-toggle="tab" id="detailTab1">实际</a></li>

							  </ul>

<!-- 								<div class="tab-content"> -->
								  <div class="tab-pane active" id="state2">

										<!-- BEGIN PORTLET-->
											<div class="portlet-body form1">
												<!-- BEGIN FORM-->
												<form id="planForm">
												<div class="form-horizontal">
													 
													 
													 <div class="span3">
															<div class="control-group">
																<label class="control-label" style="width: 60px;">生长周龄</label>
																<div class="controls" style="margin-left: 65px;">
																	<input type="text" id="grow_week_age" name="grow_week_age">
																</div>
															</div>
														</div>
														
														<div class="span2">
															<div class="control-group">
																<label class="control-label" style="width: 30px;margin-left: 30px;">类型</label>
																<div class="controls" style="margin-left: 75px;">
																	<select id="good_type" class="m-wrap span12" tabindex="1"  name="good_type" style="width: 150px;">
						                                                <option value="">全部</option>
						                                                <c:if test="${!empty goodTypeList}">
						                                                 <c:forEach var="goodType" items="${goodTypeList}">
						                                                 <option value="${goodType.biz_code }">${goodType.code_name}</option>
						                                                 </c:forEach>
						                                                 </c:if>
						                                            </select>
																</div>
															</div>
														</div>
													 
														<div class="span2">
															<div class="control-group">
																<label class="control-label" style="width: 30px;margin-left: 70px;">名称</label>
																<div class="controls" style="margin-left: 105px;">
																	<select id="drug_id" class="m-wrap span12" tabindex="1"  name="drug_id" style="width: 150px;">
						                                                <option value="">全部</option>
						                                                <c:if test="${!empty goodsList}">
						                                                 <c:forEach var="goods" items="${goodsList}">
						                                                 <option value="${goods.good_id }">${goods.good_name}</option>
						                                                 </c:forEach>
						                                                 </c:if>
						                                            </select>
																</div>
															</div>
														</div>

														<!--/span-->

														<div class="span3">

															<div class="control-group">
																<label class="control-label" style="width: 60px;margin-left: 95px;">使用方法</label>
																<div class="controls" style="margin-left: 160px;">
																	<select id="instruction" class="m-wrap span12" tabindex="1"  name="instruction" style="width: 150px;">
						                                                <option value="">全部</option>
						                                                <c:if test="${!empty useTypeList}">
						                                                 <c:forEach var="useType" items="${useTypeList}">
						                                                 <option value="${useType.biz_code }">${useType.code_name}</option>
						                                                 </c:forEach>
						                                                 </c:if>
						                                            </select>
																</div>
															</div>

														</div>

														<div class="span2">
															<div class="control-group">
																<button type="button" class="btn blue" onclick="searchData('plan');" style="width: 70px;margin-left: 60px;"
																	id="qued">
																	&nbsp;查询&nbsp;&nbsp;
																</button>
																</div>
															</div>
															</div>
														   </form>
                                                          </div>
<!--                                                         </div> -->
                                                        
<!--                                                         <div class="tab-pane active" id="tab_state"> -->
<!--                                                         <div class="portlet-body" id="user_date_table"> -->
									
<!-- 								</div>														 -->
<!--                                 </div> -->
                            <div class="span12">
                            <br>
                            <span class="span10" id="farmName" style="text-align: center;margin-left: 60px;"><h4><b>${pd.farm_name}</b></h4></span></div>
                                <div id = "reflushText" style="display: none;  float:right;"><font color="#FF0000">刷新中,请稍后...</font></div>
                            <div id="planFrame" style="display: block;">
                                <table id="planTable"></table>
                            </div>
													
                                                
												</div>

												<!-- END FORM-->

											

										
<!-- 							</div> -->
							
							
							     <div id="detail2">
                                  <div class="portlet-body form1">
<!-- 												BEGIN FORM -->
												<div class="form-horizontal">
												
<!-- 													<div> -->
                                   <input type="hidden" name="farmId" id="farmId" value="${pd.farm_id }">
                                   <input type="hidden" name="farm_name" id="farm_name" value="${pd.farm_name }">
														<div class="container-fluid">
													<div class="row-fluid">
														<div class="span2">
														<label class="control-label" style="width: 30px;">日期</label>
																<div class="controls" style="margin-left: 35px;">
																	<div class="input-append date date-picker" data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
															          <input class="m-wrap  span11 m-ctrl-medium date-picker " readonly type="text" name="use_date" id="use_date"/><span class="add-on"><i class="icon-calendar"></i></span>			
														          </div>
																</div>
														</div>
														<div class="span3"  style="width: 220px;">
														<label class="control-label" style="width: 60px;margin-left: 25px;">使用方法</label>
														<div class="controls" style="margin-left: 90px;">
																	<select id="instruction1" class="m-wrap span12" tabindex="1"  name="instruction1" style="width: 200px;">
						                                                <option value="">全部</option>
						                                                <c:if test="${!empty useTypeList}">
						                                                 <c:forEach var="useType" items="${useTypeList}">
						                                                 <option value="${useType.biz_code }">${useType.code_name}</option>
						                                                 </c:forEach>
						                                                 </c:if>
						                                            </select>
																</div>
														</div>
														<div class="span3"  style="width: 200px;margin-left: 100px;">
														<label class="control-label" style="width: 30px;">名称</label>
														<div class="controls" style="margin-left: 35px;">
																	<select id="drug_id1" class="m-wrap span12" tabindex="1"  name="drug_id1" style="width: 200px;" onchange="setFactory();">
						                                                <option value="">全部</option>
						                                                <c:if test="${!empty goodsList}">
						                                                 <c:forEach var="goods" items="${goodsList}">
						                                                 <option value="${goods.good_id }">${goods.good_name}</option>
						                                                 </c:forEach>
						                                                 </c:if>
						                                            </select>
																</div>
														</div>
														<div class="span2">
														<label class="control-label" style="width: 30px;margin-left: 40px;">用途</label>
														<div class="controls" style="margin-left: 80px;">
																	<input type="text" id="use_type" name="use_type">
																</div>
														</div>
														<div class="span2">
														<button type="button" class="btn blue" onclick="addDrug();" style="width: 70px;margin-left: 180px;"
																	id="qued">
																	&nbsp;新增&nbsp;&nbsp;
																</button>
														</div>
													</div>
													<br>
													<div class="row-fluid">
														<div class="span2">
														<label class="control-label" style="width: 30px;">类型</label>
														<div class="controls" style="margin-left: 35px;">
																	<select id="good_type1" class="m-wrap span12" tabindex="1"  name="good_type" style="width: 160px;" onchange="setDrugId1();">
						                                                <option value="">全部</option>
						                                                <c:if test="${!empty goodTypeList}">
						                                                 <c:forEach var="goodType" items="${goodTypeList}">
						                                                 <option value="${goodType.biz_code }">${goodType.code_name}</option>
						                                                 </c:forEach>
						                                                 </c:if>
						                                            </select>
																</div>
														</div>
														<div class="span3">
														<label class="control-label" style="width: 60px;margin-left: 10px;">使用数量</label>
														<div class="controls" style="margin-left: 75px;">
																	<input type="text" id="use_unit" name="use_unit">
																</div>
														</div>
														<div class="span2">
														<label class="control-label" style="width: 30px;margin-left: 20px;">批号</label>
														<div class="controls" style="margin-left: 55px;">
																	<input type="text" id="good_batch_no" name="good_batch_no">
																</div>
														</div>
														<div class="span3">
														<label class="control-label" style="width: 60px;margin-left: 80px;">负责人</label>
														<div class="controls" style="margin-left: 145px;">
																	<select id="use_user_id" class="m-wrap span12" tabindex="1"  name="use_user_id" style="width: 200px;">
																	    <option value="">全部</option>
						                                                <c:if test="${!empty userList}">
						                                                 <c:forEach var="user" items="${userList}">
						                                                 <option value="${user.id }">${user.user_real_name}</option>
						                                                 </c:forEach>
						                                                 </c:if>
						                                            </select>
																</div>
														</div>
														<div class="span2">
														<button type="button" class="btn blue" onclick="deleteDrug();" style="width: 70px;margin-left: 80px;"
																	id="qued">
																	&nbsp;删除&nbsp;&nbsp;
																</button>
														</div>
													</div>
													<br>
													<div class="row-fluid">
														<div class="span2">
														<label class="control-label" style="width: 30px;">栋舍</label>
														<div class="controls" style="margin-left: 35px;">
																	<select id="houseId" class="m-wrap span12" tabindex="1"  name="houseId" style="width: 160px;">
						                                                <option value="">全部</option>
						                                                <c:if test="${!empty houseList}">
						                                                 <c:forEach var="house" items="${houseList}">
						                                                 <option value="${house.org_id }">${house.org_name}</option>
						                                                 </c:forEach>
						                                                 </c:if>
						                                            </select>
																</div>
														</div>
														<div class="span3">
														<label class="control-label" style="width: 60px;margin-left: 10px;">主要成分</label>	
														<div class="controls" style="margin-left: 75px;">
																	<input type="text" id="main_constitute" name="main_constitute">
																</div>
														</div>
														<div class="span2">
														<label class="control-label" style="width: 50px;">厂家</label>
														<div class="controls" style="margin-left: 55px;">
																	<select id="factory_id" class="m-wrap span12" tabindex="1"  name="factory_id" style="width: 160px;">
						                                            </select>
																</div>
														</div>
														<div class="span2">
														</div>
														<div class="span3">
														</div>
													</div>
													<br>
												</div>
                               <div class="span12">
                            <br>
                            <span class="span10" id="farmName" style="text-align: center;margin-left: 60px;"><h4><b>${pd.farm_name}</b></h4></span></div>                         
                             <div id = "reflushText2" style="display: none;  float:right;"><font color="#FF0000">刷新中,请稍后...</font></div>
                            <div id="factFrame" style="display: block;">
                                <table id="factTable"></table>
                            </div>
								</div>

<!-- 													</div> -->

												</div>

											</div>
                                    </div>
								  </div>	  
<!-- 							  </div> -->
<!-- 							  </div> -->

<!-- 						  </form> -->
						</div>				
				</div> 
		  
<script type="text/javascript" src="<%=path%>/js/bootbox.min.js"></script>
<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.zh-CN.js"></script>
<script type="text/javascript" src="<%=path%>/framework/table/table.js"></script>
<script type="text/javascript" src="<%=path%>/modules/drug/js/drugView.js"></script>
</body>
</html>
