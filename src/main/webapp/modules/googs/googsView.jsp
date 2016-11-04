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
<body style="background-color: #ffffff;">
	<div id="page-content" class="clearfix" style="padding-top: 10px;">
		<div class="row-fluid">
			<div class="span12">

				<div class="tabbable tabbable-custom boxless">
					<ul class="nav nav-pills" style="margin-bottom: 0px; ">
						<li  class="active"  style="text-align: center;width:33%;background-color: #BFBFBF;border-right: 1px solid #E0DFDF;" >
							<a href="#tab_1" data-toggle="tab">入库</a>
						</li>
						<li  style="text-align: center;width:33%;background-color: #BFBFBF; border-right: 1px solid #E0DFDF;" >
							<a href="#tab_2"   data-toggle="tab" >耗用</a>
						</li>
						<li  style="text-align: center;width:33%;background-color: #BFBFBF; " >
							<a href="#tab_3"  data-toggle="tab">库存</a>
						</li>
					</ul>

					<div class="tab-content">
						<div class="tab-pane active" id="tab_1">
							<div class="portlet-body form1">
							<!-- BEGIN FORM-->
								<form id="inStockForm">
								<div class="form-horizontal" style="height: 40px;">
									<div class="span3" style="width: 150px;">
										<div class="control-group">
										  <label class="control-label" style="width: 60px;">类型</label>
										  <div class="controls" style="margin-left: 70px;">
											<select id="good_type" class="m-wrap span12" tabindex="1"  name="good_type" style="width: 120px;">
                                                 <c:if test="${!empty goodType}">
	                                                 <c:forEach var="goodType" items="${goodType}">
	                                                 	<c:if test="${goodType.biz_code!=1}">
	                                                 		<option value="${goodType.biz_code}">${goodType.code_name}</option>
	                                                 	</c:if>
	                                                 </c:forEach>
                                                 </c:if>
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 150px;">
										<div class="control-group">
										  <label class="control-label" style="width: 60px;">单位</label>
										  <div class="controls" style="margin-left: 70px;">
										  	 <select id="unit" class="m-wrap span12" tabindex="1"  name="unit" style="width: 120px;">
												 <c:if test="${!empty unit}">
	                                                 <c:forEach var="unit" items="${unit}">
	                                                 	<option value="${unit.biz_code}">${unit.code_name}</option>
	                                                 </c:forEach>
                                                 </c:if>
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 150px;">
										<div class="control-group">
										  <label class="control-label" style="width: 90px;">入库量</label>
										  <div class="controls" style="margin-left: 100px;">
										  	 <input type="text" class="m-wrap span12" style="width: 120px;" name="count"  id="sssasd"/>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 150px;">
										<div class="control-group">
										  <label class="control-label" style="width: 100px;">单价</label>
										  <div class="controls" style="margin-left: 110px;">
										  	 <input type="text" class="m-wrap span12" style="width: 120px;" name="price" />
										  </div>
										</div>
									</div>
									
									<div class="span3" style="width: 220px;">
										<div class="control-group">
										  <label class="control-label" style="width: 110px;">供应方</label>
										  <div class="controls" style="margin-left: 120px;">
										  	 <select id="corporation_id" class="m-wrap span12" tabindex="1"  name="corporation_id" style="width: 160px;">
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 240px;">
										<div class="control-group">
										  <label class="control-label" style="width: 92px;">保质期</label>
										  <div class="controls" style="margin-left: 102px;">
										  	 <div class="input-append date date-picker"  data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
												<input class="m-wrap  span11 m-ctrl-medium date-picker " style="width: 120px;" readonly type="text" name="exp" id="exp" /><span class="add-on"><i class="icon-calendar"></i></span>
											</div>
										  </div>
										</div>
									</div>
									
									
									<div class="span3" style="width: 150px;">
										<div class="control-group">
										  <label class="control-label" style="width: 35px;">品名</label>
										  <div class="controls" style="margin-left: 45px;">
										  	  <select id="good_id" class="m-wrap span12" tabindex="1"  name="good_id" style="width: 120px;">
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 150px;">
										<div class="control-group">
										  <label class="control-label" style="width: 35px;">规格</label>
										  <div class="controls" style="margin-left: 45px;">
										  	 <select id="spec" class="m-wrap span12" tabindex="1"  name="spec" style="width: 120px;">
												<c:if test="${!empty spec}">
	                                                 <c:forEach var="spec" items="${spec}">
	                                                 	<option value="${spec.biz_code}">${spec.code_name}</option>
	                                                 </c:forEach>
                                                 </c:if>
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 150px;">
										<div class="control-group">
										  <label class="control-label" style="width: 90px;margin-left: -28px;">入库日期</label>
										  <div class="controls" style="margin-left: 75px;">
										  	  <div class="input-append date date-picker1"  data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
												<input class="m-wrap  date-picker1 " style="width: 78px;" readonly type="text" name="operation_date" id="operation_date" /><span class="add-on"><i class="icon-calendar"></i></span>
											 </div>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 380px;">
										<div class="control-group">
										  <label class="control-label" style="width: 72px;">厂家</label>
										  <div class="controls" style="margin-left: 82px;">
										  	 <select id="factory_id" class="m-wrap span12" tabindex="1"  name="factory_id" style="width: 350px;">
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 220px;">
										<div class="control-group">
										  <label class="control-label" style="width: 90px;"></label>
										  <div class="controls" style="margin-left: 90px;">
											 <button type="button" class="btn green" onclick="inStock()" style="width: 150px;">入 库</button>
										  </div>
										</div>
									</div>
								</div>
								</form>
								<!-- end from -->
							</div>
								<div class="portlet-body">
								<table id="inStockTable"></table>
									<!-- <table class="table table-striped table-bordered table-hover" id="sample_1">
										<thead>
											<tr>
												<th>类型</th>
												<th>品名</th>
												<th>规格</th>
												<th>单位</th>
												<th>入库量</th>
												<th>入库日期</th>
												<th>供应方</th>
												<th>厂家</th>
												<th>保质期</th>
											</tr>
										</thead>
										<tbody id="inStockTbody">
										
										</tbody>
									</table> -->
									<%-- <div class="row-fluid" style="margin-top: -18px;">
										<div class="span11" style="float: right;height: 40px;">
											<div class="dataTables_paginate paging_bootstrap pagination" style="float: right;margin-top: 10px;">
												${page.pageStr}
											</div>
											<form action="<%=path%>/farm/farmView" method="post" id="farmViewForm">
												<input type="hidden" id="tab_fag" name="fag"  value="1">
											</form>
										</div>
									</div> --%>
								</div>
						</div>
					

						<div class="tab-pane" id="tab_2">
						<div class="portlet-body form1">
							<!-- BEGIN FORM-->
							<form id="outStockForm">
								<div class="form-horizontal" style="height: 40px;">
									<div class="span3" style="width: 160px;">
										<div class="control-group">
										  <label class="control-label" style="width: 30px;">栋</label>
										  <div class="controls" style="margin-left: 40px;">
											<select id="house_id" class="m-wrap span12" tabindex="1"  name="house_id" style="width: 140px;">
												<c:if test="${!empty houseList}">
	                                                 <c:forEach var="hl" items="${houseList}">
	                                                 	<option value="${hl.id}">${hl.name_cn}</option>
	                                                 </c:forEach>
                                                 </c:if>
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 160px;">
										<div class="control-group">
										  <label class="control-label" style="width: 30px;">类型</label>
										  <div class="controls" style="margin-left: 40px;">
										  	 <select id="good_type_out" class="m-wrap span12" tabindex="1"  name="good_type" style="width: 120px;">
                                                 <c:if test="${!empty goodType}">
	                                                 <c:forEach var="goodType" items="${goodType}">
	                                                 	<c:if test="${goodType.biz_code!=1}">
	                                                 		<option value="${goodType.biz_code}">${goodType.code_name}</option>
	                                                 	</c:if>
	                                                 </c:forEach>
                                                 </c:if>
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 160px;">
										<div class="control-group">
										  <label class="control-label" style="width: 30px;">品名</label>
										  <div class="controls" style="margin-left: 40px;">
										  	<select id="good_id_out" class="m-wrap span12" tabindex="1"  name="good_id" style="width: 120px;">
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 160px;">
										<div class="control-group">
										  <label class="control-label" style="width: 60px;">耗用数量</label>
										  <div class="controls" style="margin-left: 70px;">
										  	 <input type="text" class="m-wrap span12" style="width: 120px;" name="count" id="count_out" />
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 160px;padding-left: 40px;">
										<div class="control-group">
										  <label class="control-label" style="width: 60px;">耗用日期</label>
										  <div class="controls" style="margin-left: 70px;">
										  	 <div class="input-append date date-picker"  data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
												<input class="m-wrap  date-picker1 " style="width: 78px;" readonly type="text" name="operation_date" id="operation_date_out" /><span class="add-on"><i class="icon-calendar"></i></span>
											&nbsp; </div>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 100px;padding-left: 140px;">
										<div class="control-group">
										  <div class="controls" style="margin-left: 4px;">
										  	<button type="button" class="btn green" onclick="outStock()" style="width: 100px;">耗用</button>
										  </div>
										</div>
									</div>
								</div>
								</form>
							</div>
								<div class="portlet-body">
								<table id="outStockTable"></table>
									<!-- <table class="table table-striped table-bordered table-hover" id="sample_1">

										<thead>

											<tr>
												<th class="hidden-480" style="text-align: center;">栋</th>
												<th>类型</th>
												<th>品名</th>
												<th>耗用数量</th>
												<th>耗用日期</th>
											</tr>

										</thead>
										<tbody id="outStockTbody">
										
										</tbody>
									</table> -->
								</div>
						<!-- 	</div> -->

						</div>

						<div class="tab-pane " id="tab_3">
							<div class="portlet-body form1">
							<!-- BEGIN FORM-->
								<form id="stockForm">
								<div class="form-horizontal" style="height: 40px;">
									<div class="span3" style="width: 250px;">
										<div class="control-group">
										  <label class="control-label" style="width: 85px;">类型</label>
										  <div class="controls" style="margin-left: 95px;">
											<select id="good_type_stock" class="m-wrap span12" tabindex="1"  name="good_type" style="width: 120px;">
                                                 <c:if test="${!empty goodType}">
	                                                 <c:forEach var="goodType" items="${goodType}">
	                                                 	<c:if test="${goodType.biz_code!=1}">
	                                                 		<option value="${goodType.biz_code}">${goodType.code_name}</option>
	                                                 	</c:if>
	                                                 </c:forEach>
                                                 </c:if>
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 250px;">
										<div class="control-group">
										  <label class="control-label" style="width: 70px;">品名</label>
										  <div class="controls" style="margin-left: 80px;">
										  	 <select id="good_id_stock" class="m-wrap span12" tabindex="1"  name="good_id" style="width: 120px;">
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 250px;">
										<div class="control-group">
										  <label class="control-label" style="width: 60px;">规格</label>
										  <div class="controls" style="margin-left: 70px;">
										  	 <select id="spec_stock" class="m-wrap span12" tabindex="1"  name="spec" style="width: 120px;">
												<option value="">全部</option>
												<c:if test="${!empty spec}">
	                                                 <c:forEach var="spec" items="${spec}">
	                                                 	<option value="${spec.biz_code}">${spec.code_name}</option>
	                                                 </c:forEach>
                                                 </c:if>
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 200px;">
										<div class="control-group">
										  <div class="controls" style="margin-left: -20px;">
										  	<button type="button" class="btn green" onclick="queryStock()" style="width: 100px;">查 询</button>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 250px;">
										<div class="control-group">
										  <label class="control-label" style="width: 60px;">生产厂家</label>
										  <div class="controls" style="margin-left: 70px;">
										  	 <select id="factory_id_stock" class="m-wrap span12" tabindex="1"  name="factory_id" style="width: 120px;">
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 250px;">
										<div class="control-group">
										  <label class="control-label" style="width: 50px;margin-left: -5px;">供应方</label>
										  <div class="controls" style="margin-left: 55px;">
										  	 <select id="corporation_id_stock" class="m-wrap span12" tabindex="1"  name="corporation_id" style="width: 160px;">
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 250px;">
										<div class="control-group">
										  <label class="control-label" style="width: 70px;margin-left: -38px;">单位</label>
										  <div class="controls" style="margin-left: 45px;">
										  	  <select id="unit_stock" class="m-wrap span12" tabindex="1"  name="unit" style="width: 120px;">
												 <option value="">全部</option>
												 <c:if test="${!empty unit}">
	                                                 <c:forEach var="unit" items="${unit}">
	                                                 	<option value="${unit.biz_code}">${unit.code_name}</option>
	                                                 </c:forEach>
                                                 </c:if>
											 </select>
										  </div>
										</div>
									</div>
									<div class="span3" style="width: 200px;">
										<div class="control-group" style="margin-left: -45px;">
										  	<button type="button" class="btn green" onclick="getMessages()" style="width: 100px;">调 整</button>
										  </div>
										</div>
									</div>
									</form>
								</div>
								<div class="portlet-body">
									<table id="stockTable"></table>
								
									<!-- <table class="table table-striped table-bordered table-hover" id="sample_1">

										<thead>

											<tr>
												<th class="hidden-480" style="text-align: center;">选择</th>
												<th>类型</th>
												<th>品名</th>
												<th>规格</th>
												<th>单位</th>
												<th>生产厂家</th>
												<th>供应方</th>
												<th>入库量</th>
											</tr>

										</thead>
										<tbody id="stockTbody">
										</tbody>
									</table> -->
								</div>
						<!-- 	</div> -->
						</div>
					</div>

				</div>

			</div>

		</div>
	</div>
	<script type="text/javascript">
		var isRead="${pd.write_read}";//菜单是否只读
	</script>
	<!-- #main-content -->
	<script type="text/javascript" src="<%=path%>/js/bootbox.min.js"></script>
	<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.zh-CN.js"></script>
    <script type="text/javascript" src="<%=path%>/framework/table/table.js"></script>
    <script type="text/javascript" src="<%=path%>/modules/googs/js/googsView.js"></script> 
	<!-- 确认窗口 -->
	
</body>
</html>
