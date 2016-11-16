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

<body style="background-color: #ffffff;">
<input type="text"  name="farmId"  id="farmId" style="display:none" value="${farmId}" />
<input type="text"  name="farm"  id="farm" style="display:none" value="${farm}" />
	<div id="page-content" class="clearfix" style="padding-top: 10px;">
		<div class="row-fluid">
			<div class="span12">

				<div class="tabbable tabbable-custom boxless">
					<ul class="nav nav-pills" style="margin-bottom: 0px; " id = "uiTab">
						<li  class="active"  style="text-align: center;width:25%;background-color: #BFBFBF;border-right: 1px solid #E0DFDF;" >
							<a href="#tab_1" data-toggle="tab">入库</a>
						</li>
						<li  style="text-align: center;width:24.5%;background-color: #BFBFBF; border-right: 1px solid #E0DFDF;" >
							<a href="#tab_2"   data-toggle="tab" >耗用</a>
						</li>
						<li  style="text-align: center;width:24.5%;background-color: #BFBFBF; border-right: 1px solid #E0DFDF; " >
							<a href="#tab_3"  data-toggle="tab">库存调整</a>
						</li>
						<li  style="text-align: center;width:25%;background-color: #BFBFBF;" >
							<a href="#tab_4"  data-toggle="tab">库存调整审批</a>
						</li>
					</ul>

					<div class="tab-content" style="border:none">

						<%-- 入库 --%>
						<div class="tab-pane active" id="tab_1">
							<!-- BEGIN FORM-->
							<form id="inStockForm">
								<input type="text"  name="inStockFarmId"  id="inStockFarmId" style="display:none" value="${farmId}" />
								<input type="text"  name="inStockFarm"  id="inStockFarm" style="display:none" value="${farm}" />
								<div class="container-fluid">
									<div class="row-fluid">
										<div class="span3" align="left">
											<span_customer>类型</span_customer>
											<select id="good_type"  tabindex="1"  name="good_type"  >
												<c:if test="${!empty goodType}">
													<c:forEach var="goodType" items="${goodType}">
														<c:if test="${goodType.biz_code!=1}">
															<option value="${goodType.biz_code}">${goodType.code_name}</option>
														</c:if>
													</c:forEach>
												</c:if>
											</select>
										</div>
										<div class="span3" align="left">
											<span_customer>单位</span_customer>
											<select id="unit"   tabindex="1"  name="unit"  >
												<c:if test="${!empty unit}">
													<c:forEach var="unit" items="${unit}">
														<option value="${unit.biz_code}">${unit.code_name}</option>
													</c:forEach>
												</c:if>
											</select>
										</div>
										<div class="span3" align="left">
											<span_customer>入库数量</span_customer>
											<input type="text"  name="count"  id="sssasd"  />
										</div>
										<div class="span3" align="left">
											<span_customer>单价</span_customer>
											<input type="text"  name="price" id="sssasdPrice" />
										</div>
									</div>

									<div class="row-fluid">
										<div class="span3" align="left">
											<span_customer>供应方</span_customer>
											<select id="corporation_id"   tabindex="1"  name="corporation_id" >
											</select>
										</div>
										<div class="span3" align="left">
											<span_customer>保质期</span_customer>
											<div class="input-append date date-picker"  data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
												<input class="m-wrap span11 m-ctrl-medium date-picker " readonly type="text" name="exp" id="exp" />
												<span class="add-on"><i class="icon-calendar"></i></span>
											</div>
										</div>
										<div class="span3" align="left">
											<span_customer>品名</span_customer>
											<select id="good_id" tabindex="1"  name="good_id" >
											</select>
										</div>
										<div class="span3" align="left">
											<span_customer>规格</span_customer>
											<select id="spec" tabindex="1"  name="spec" >
												<c:if test="${!empty spec}">
													<c:forEach var="spec" items="${spec}">
														<option value="${spec.biz_code}">${spec.code_name}</option>
													</c:forEach>
												</c:if>
											</select>
										</div>
									</div>
									<div class="row-fluid">
										<div class="span3" align="left">
											<span_customer>厂家</span_customer>
											<select id="factory_id" tabindex="1"  name="factory_id">
											</select>
										</div>
										<div class="span3" align="left">
											<span_customer>入库日期</span_customer>
											<div class="input-append date date-picker1"  data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
												<input class="m-wrap span11 m-ctrl-medium  date-picker1 "   readonly type="text" name="operation_date" id="operation_date" />
												<span class="add-on"><i class="icon-calendar"></i></span>
											</div>
										</div>
										<div class="span3" align="left">

										</div>
										<div class="span3" align="left">
											<button type="button" class="btn green" onclick="inStock()">确认</button>
										</div>
									</div>
								</div>
							</form>
							<!-- END FORM -->

							<div class="row-fluid">
								<div class="span12">
									<hr style="height:10px;border:none;border-top:1px solid #555555;" />
								</div>
							</div>
							<div class="row-fluid">
								<div class="span12">
									<p id = "inStockFarmTitle" align="center">
										农场
									</p>
									<div id="inStockFrame" align="center">
										<table id="inStockTable"></table>
									</div>
								</div>
							</div>

						</div>
					
						<%-- 耗用 --%>
						<div class="tab-pane" id="tab_2">
							<form id="outStockForm">
								<div class="container-fluid">
									<div class="row-fluid">
										<div class="span3" align="left">
											<span_customer>栋</span_customer>
											<select id="house_id"  tabindex="1"  name="house_id" >
												<c:if test="${!empty houseList}">
													<c:forEach var="hl" items="${houseList}">
														<option value="${hl.id}">${hl.name_cn}</option>
													</c:forEach>
												</c:if>
											</select>
										</div>
										<div class="span3" align="left">
											<span_customer>类型</span_customer>
											<select id="good_type_out" tabindex="1"  name="good_type" >
												<c:if test="${!empty goodType}">
													<c:forEach var="goodType" items="${goodType}">
														<c:if test="${goodType.biz_code!=1}">
															<option value="${goodType.biz_code}">${goodType.code_name}</option>
														</c:if>
													</c:forEach>
												</c:if>
											</select>
										</div>
										<div class="span3" align="left">
											<span_customer>品名</span_customer>
											<select id="good_id_out"  tabindex="1"  name="good_id" >
											</select>
										</div>
										<div class="span3" align="left">
											<span_customer>耗用数量</span_customer>
											<input type="text" name="count" id="count_out" />
										</div>
									</div>

									<div class="row-fluid">
										<div class="span3" align="left">
											<span_customer>耗用日期</span_customer>
											<div class="input-append date date-picker"  data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
												<input class="m-wrap  date-picker1 " readonly type="text" name="operation_date" id="operation_date_out" />
												<span class="add-on"><i class="icon-calendar"></i></span>
											</div>
										</div>
										<div class="span3" align="left">

										</div>
										<div class="span3" align="left">

										</div>
										<div class="span3" align="left">
											<button type="button" class="btn green" onclick="outStock()" >耗用</button>
										</div>
									</div>
								</div>
							</form>
							<!-- END FORM -->

							<div class="row-fluid">
								<div class="span12">
									<hr style="height:10px;border:none;border-top:1px solid #555555;" />
								</div>
							</div>
							<div class="row-fluid">
								<div class="span12">
									<p id = "outStockFarmTitle" align="center">
										农场
									</p>
									<div id="outStockFrame" align="center">
										<table id="outStockTable"></table>
									</div>
								</div>
							</div>
						</div>

						<%-- 库存调整 --%>
						<div class="tab-pane " id="tab_3">
							<form id="stockForm">
								<div class="container-fluid">
									<div class="row-fluid">
										<div class="span3" align="left">
											<span_customer>类型</span_customer>
											<select id="good_type_stock" tabindex="1"  name="good_type" >
												<c:if test="${!empty goodType}">
													<c:forEach var="goodType" items="${goodType}">
														<c:if test="${goodType.biz_code!=1}">
															<option value="${goodType.biz_code}">${goodType.code_name}</option>
														</c:if>
													</c:forEach>
												</c:if>
											</select>
										</div>
										<div class="span3" align="left">
											<span_customer>品名</span_customer>
												<select id="good_id_stock" tabindex="1"  name="good_id">
												</select>
										</div>
										<div class="span3" align="left">
											<span_customer>规格</span_customer>
											<select id="spec_stock" tabindex="1"  name="spec">
												<option value="">全部</option>
												<c:if test="${!empty spec}">
													<c:forEach var="spec" items="${spec}">
														<option value="${spec.biz_code}">${spec.code_name}</option>
													</c:forEach>
												</c:if>
											</select>
										</div>
										<div class="span3" align="left">
										</div>
									</div>

									<div class="row-fluid">
										<div class="span3" align="left">
											<span_customer>生产厂家</span_customer>
											<select id="factory_id_stock" tabindex="1"  name="factory_id">
											</select>
										</div>
										<div class="span3" align="left">
											<span_customer>供应方</span_customer>
											<select id="corporation_id_stock" tabindex="1"  name="corporation_id" >
											</select>
										</div>
										<div class="span3" align="left">
											<span_customer>单位</span_customer>
											<select id="unit_stock"  tabindex="1"  name="unit">
												<option value="">全部</option>
												<c:if test="${!empty unit}">
													<c:forEach var="unit" items="${unit}">
														<option value="${unit.biz_code}">${unit.code_name}</option>
													</c:forEach>
												</c:if>
											</select>
										</div>
										<div class="span3" align="left">
											<button type="button" class="btn green" onclick="queryStock()" >查 询</button>
										</div>
									</div>
								</div>
							</form>
							<!-- END FORM -->

							<div class="row-fluid">
								<div class="span12">
									<hr style="height:10px;border:none;border-top:1px solid #555555;" />
								</div>
							</div>
							<div class="row-fluid">
								<div class="span4" align="left">
									<div id="stockToolbar" class="btn-group">
										<button id='stockToolbar_btn_edit' type='button' class='btn blue' style="display: block;" onclick="javascript:getMessages();">
											<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>调整
										</button>

									</div>
								</div>
								<div class="span4" align="center">
									<p id = "stockFarmTitle" align="center">
										农场
									</p>
								</div>
								<div class="span4" align="center">

								</div>
							</div>
							<div class="row-fluid">
								<div class="span12">
									<div id="stockFrame" align="left">
										<div>
											<table id="stockTable"></table>
										</div>
									</div>
								</div>
							</div>
						</div>

						<%-- 库存调整审批 --%>
						<div class="tab-pane " id="tab_4">
							<div class="row-fluid">
								<div class="span4" align="left">
									<div id="approvalStockFrame" align="left">
										<div id="approvalStockToolbar" class="btn-group">
											<button id='approvalStockToolbar_btn_reject' type='button' class='btn blue' style="display: inline;" onclick="javascript:rejectStockChange();">
												<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>驳回
											</button>
											<button id='approvalStockToolbar_btn_pass' type='button' class='btn blue' style="display: inline;" onclick="javascript:approvalStockChange();">
												<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>通过
											</button>
										</div>
									</div>
								</div>
								<div class="span4" align="center">
									<p id = "approvalStockFarmTitle" align="center">
										农场
									</p>
								</div>
								<div class="span4" align="left">

								</div>

							</div>
							<div class="row-fluid">
								<div class="span12" align="left">
									<div>
										<table id="approvalStockTable"></table>
									</div>
								</div>
							</div>


							<div class="row-fluid">
								<div class="span12">
									<hr style="height:10px;border:none;border-top:1px solid #555555;" />
								</div>
							</div>

							<div class="row-fluid">
								<div class="span12">
									<p id = "approvalStockChangeLog" align="center">
										<font size='3' ><B>变更记录</B></font>
									</p>
									<div id="approvalStockChangeLogFrame" align="left">
										<table id="approvalStockChangeTable"></table>
									</div>
								</div>
							</div>


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
