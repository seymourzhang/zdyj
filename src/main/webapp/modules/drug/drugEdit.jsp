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
					  <div class="span12">
<!-- 						  <input type="hidden" name="farmId" id="farmId" value="${pd.farm_id }"> -->
<!-- 						  <input type="hidden" name="farm_name" id="farm_name" value=""> -->
						  <div class="container-fluid">
							  <div class="row-fluid">
								  <div class="span3" align="left">
									  <span_customer>生长周龄</span_customer>
									  <input type="text" id="grow_week_age" name="grow_week_age" value="0">
								  </div>
								  <div class="span3" align="left">
									  <span_customer>类型</span_customer>
									  <select id="good_type" tabindex="1"  name="good_type">
										  <c:if test="${!empty goodTypeList}">
											  <c:forEach var="goodType" items="${goodTypeList}">
												  <option value="${goodType.biz_code }">${goodType.code_name}</option>
											  </c:forEach>
										  </c:if>
									  </select>
								  </div>
<!-- 								  <div class="span3" align="left"> -->
<!-- 									  <span_customer>使用方法</span_customer> -->
<!-- 									  <select id="instruction" tabindex="1"  name="instruction"> -->
<!-- 										  <c:if test="${!empty useTypeList}"> -->
<!-- 											  <c:forEach var="useType" items="${useTypeList}"> -->
<!-- 												  <option value="${useType.biz_code }">${useType.code_name}</option> -->
<!-- 											  </c:forEach> -->
<!-- 										  </c:if> -->
<!-- 									  </select> -->
<!-- 								  </div> -->
								  <div class="span3" align="left">
									  <span_customer>用途</span_customer>
									  <input type="text" id="use_type" name="use_type" placeholder="请输入用途">

								  </div>
								  <div class="span3" align="left">
									  <button type="button" class="btn green" onclick="addDrug();" id="add">新增</button>
								  </div>
							 </div>
    
							  <div class="row-fluid">
							      <div class="span3" align="left">
									  <span_customer>农场</span_customer>
									  <select id="farmId" tabindex="1"  name="farmId">
										  <c:if test="${!empty farmList}">
											  <c:forEach var="farm" items="${farmList}">
												  <option value="${farm.org_id }">${farm.org_name}</option>
											  </c:forEach>
										  </c:if>
									  </select>
								  </div>
								  <div class="span3" align="left">
									  <span_customer>使用数量</span_customer>
									  <input type="text" id="use_unit" name="use_unit" value="0">
								  </div>
								  <div class="span3" align="left">
									  <span_customer>品名</span_customer>
									  <select id="drug_id" tabindex="1"  name="drug_id" style="display: none;">
										  <c:if test="${!empty goodsList}">
											  <c:forEach var="goods" items="${goodsList}">
											      <option value=""></option>
												  <option value="${goods.good_id }">${goods.good_name}</option>
											  </c:forEach>
										  </c:if>
									  </select>
									  <input type="text" id="drug_id_select" data-provide="typeahead" placeholder="请输入品名或物资号" autocomplete="off" onchange="empty()" />
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
								  <div class="span4" align="left">
									  <p id = "planFarmTitle" align="center">
										  <font size='4' ><B>${pd.company}</B></font>
									  </p>

								  </div>
								  <div class="span4" align="left">

								  </div>
							  </div>
							  <div class="row-fluid">
								  <div class="span12">
									  <table id="planTable"></table>
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
<script type="text/javascript" src="<%=path%>/modules/drug/js/drugEdit.js"></script>
</body>
</html>
