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
	<div id="page-content" class="clearfix" style="padding-top: 10px;">
		<div class="row-fluid">
			<div class="span12">

				<div class="tabbable tabbable-custom boxless">

					<ul class="nav nav-tabs">
						
						<li  class="active" id="batchTab"><a href="#tab_1" data-toggle="tab">批次管理</a></li>
					
						<li  id="farmTab"><a href="#tab_2" data-toggle="tab">猪场设置</a></li>

						<li  id="houseTab"><a class="" href="#tab_3" data-toggle="tab">舍间设置</a></li>

						

					</ul>

					<div class="tab-content">
						<div class="tab-pane active" id="tab_1">

							<div class="portlet box blue1">

								<div class="portlet-title">

									<div class="caption">
										<i class="icon-globe"></i>批次信息
									</div>

									<!-- <div class="tools">
	
											<a href="javascript:;" class="collapse"></a>
	
										</div> -->
									<div class="actions">

										<a href="javascript:;" class="btn green" onclick="addBatch();"><i class="icon-plus"></i> 新增入拦</a>

									</div>
								</div>
								<div class="portlet-body" id="user_date_table">
									<table class="table table-striped table-bordered table-hover" id="sample_1">
										<thead>
											<tr>
												<!-- <th class="hidden-480" style="text-align: center;">编号</th> -->
												<th>农场</th>
												<th>舍号</th>
												<th>批次号</th>
												<th>日期</th>
												<th>数量</th>
												<th>状态</th>
												<th>操作</th>
											</tr>
										</thead>
										<tbody>
										<tbody>
										<c:if test="${!empty SDBatchList}">
											<c:forEach var="bl" items="${SDBatchList}" varStatus="vs">
											<tr class="odd gradeX">
												<%-- <td class="hidden-480" style="text-align: center;">${bl.id}</td> --%>
												<td>${bl.farm_name_chs}</td>
												<td>${bl.house_name}</td>
												<td>${bl.batch_no}</td>
												<td><fmt:formatDate value="${bl.batch_date}" type="date"/></td>
												<td>${bl.count}</td>
												<td>${bl.code_name}</td>
												<td class="center hidden-480" style="width: 200px;">
													<c:if test="${bl.operation_type=='2' && bl.batch_flag!='1'}">
														<a href="javascript:void(0);" onclick="laiBatch(${bl.id})" class="btn mini red"><i class="icon-signout"></i> 出栏</a> &nbsp;
														 <a href="javascript:void(0);" onclick="editBatch(${bl.id})" class="btn mini purple"><i class="icon-edit"></i> 修改</a> &nbsp;
													</c:if>
													<c:if test="${bl.operation_type=='1' && bl.batch_flag=='1'}">
														<%-- <a href="javascript:void(0);" onclick="editBatch(${bl.id})" class="btn mini purple"><i class="icon-edit"></i> 修改</a> &nbsp; --%>
													</c:if>
												  <%--  <a href="javascript:void(0);" onclick="delFarm(${lu.id})" class="btn mini black"><i class="icon-trash"></i> 删除</a></td> --%>
											</tr>
											</c:forEach>
										</c:if>
										</tbody>
									</table>
									<div class="row-fluid" style="margin-top: -18px;">
										<div class="span11" style="float: right;height: 40px;">
											<div class="dataTables_paginate paging_bootstrap pagination" style="float: right;margin-top: 10px;">
												${page.pageStr}
											</div>
											<form action="<%=path%>/farm/farmView" method="post" id="farmViewForm">
												<input type="hidden" id="tab_fag" name="fag"  value="1">
											</form>
										</div>
									</div>
								</div>
							</div>

						</div>
					

						<div class="tab-pane" id="tab_2">

							<div class="portlet box blue1">

								<div class="portlet-title">

									<div class="caption">
										<i class="icon-globe"></i>猪场信息
									</div>

									<!-- <div class="tools">
	
											<a href="javascript:;" class="collapse"></a>
	
										</div> -->
									<div class="actions">

										<a href="javascript:;" class="btn green" onclick="addFarm();"><i class="icon-plus"></i> 新增</a>

									</div>
								</div>
								<div class="portlet-body" id="user_date_table">
									<table class="table table-striped table-bordered table-hover" id="sample_1">

										<thead>

											<tr>
												<th class="hidden-480" style="text-align: center;">编号</th>
												<th>猪场名称</th>
												<th>地区</th>
												<th>养殖品种</th>
												<th>养殖方式</th>
												<th>操作</th>
											</tr>

										</thead>
										<tbody>
										<c:if test="${!empty SDFarmList}">
											<c:forEach var="fl" items="${SDFarmList}" varStatus="vs">
												<tr class="odd gradeX">
													<td class="hidden-480" style="text-align: center;">${fl.id}</td>
													<td>${fl.farm_name_chs}</td>
													<td>${fl.province}${fl.city}${fl.area}</td>
													<td>${fl.code_name1}</td>
													<td>${fl.code_name}</td>
													<td class="center hidden-480" style="width: 145px;"><a href="javascript:void(0);" onclick="editFarm(${fl.id})" class="btn mini purple"><i class="icon-edit"></i> 修改</a> &nbsp;&nbsp;&nbsp; <a href="javascript:void(0);" onclick="delFarm(${fl.id})" class="btn mini black"><i class="icon-trash"></i> 删除</a></td>
												</tr>
											</c:forEach>
										</c:if>
										</tbody>
									</table>
								</div>
							</div>

						</div>

						<div class="tab-pane " id="tab_3">

							<div class="portlet box blue1">

								<div class="portlet-title">

									<div class="caption">
										<i class="icon-globe"></i>舍间信息
									</div>

									<!-- <div class="tools">
	
											<a href="javascript:;" class="collapse"></a>
	
										</div> -->
									<div class="actions">

										<a href="javascript:;" class="btn green" onclick="addHouse();"><i class="icon-plus"></i> 新增</a>

									</div>
								</div>
								<div class="portlet-body" id="user_date_table">
									<table class="table table-striped table-bordered table-hover" id="sample_1">

										<thead>

											<tr>
												<th class="hidden-480" style="text-align: center;">编号</th>
												<th>舍号</th>
												<th>所属农场</th>
												<th>鸡舍类别</th>
												<th>数据采集器编号</th>
												<th>操作</th>
											</tr>

										</thead>
										<tbody>
										<c:if test="${!empty SDHouseList}">
											<c:forEach var="hl" items="${SDHouseList}" varStatus="vs">
												<tr class="odd gradeX">
													<td class="hidden-480" style="text-align: center;">${hl.id}</td>
													<td>${hl.house_name}</td>
													<td>${hl.farm_name_chs}</td>
													<td>${hl.code_name}</td>
													<td>${hl.deviceName}</td>
													<td class="center hidden-480" style="width: 145px;">
														<a href="javascript:void(0);" onclick="editHouse('${hl.id}','${hl.deviceID}')" class="btn mini purple"><i class="icon-edit"></i> 修改</a> &nbsp;&nbsp;&nbsp; 
														<a href="javascript:void(0);" onclick="delHouse(${hl.id})" class="btn mini black"><i class="icon-trash"></i> 删除</a></td>
												</tr>
											</c:forEach>
										</c:if>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>

		</div>
	</div>
	<!-- #main-content -->
	<script type="text/javascript" src="<%=path%>/js/bootbox.min.js"></script>
	<!-- 确认窗口 -->
	<script type="text/javascript">
		var isRead="${pd.write_read}";//菜单是否只读
	
		jQuery(document).ready(function() {
			App.init(); // initlayout and core plugins
			 var farm_tab="${pd.fag}";
			 if(farm_tab==3){
				$("#farmTab").removeClass("active"); 
				$("#batchTab").removeClass("active"); 
				$("#houseTab").addClass("active"); 
				$("#tab_1").removeClass("active"); 
				$("#tab_2").removeClass("active"); 
				$("#tab_3").addClass("active"); 
			}
			 if(farm_tab==2){
					$("#batchTab").removeClass("active"); 
					$("#houseTab").removeClass("active"); 
					$("#farmTab").addClass("active"); 
					$("#tab_1").removeClass("active"); 
					$("#tab_3").removeClass("active"); 
					$("#tab_2").addClass("active"); 
				} 
		});
		//新增
		function addFarm(){
			if(isRead==0){
				layer.alert('无权限，请联系管理员!', {
				    skin: 'layui-layer-lan'
				    ,closeBtn: 0
				    ,shift: 4 //动画类型
				  });
				return;
			}
				layer.open({
					type: 2, 
					title: "新增农场",
					skin: 'layui-layer-lan',
					area: ['670px', '430px'],
				    content: '<%=path%>/farm/addFarmUrl'
			    });
		}
		//编辑
		function editFarm(id){
			if(isRead==0){
				layer.alert('无权限，请联系管理员!', {
				    skin: 'layui-layer-lan'
				    ,closeBtn: 0
				    ,shift: 4 //动画类型
				  });
				return;
			}
			layer.open({
				type: 2, 
				title: "修改农场",
				skin: 'layui-layer-lan',
				area: ['670px', '430px'],
			    content: "<%=path%>/farm/editFarmUrl?id=" + id
			});
		}
		//删除
		function delFarm(id) {
			if(isRead==0){
				layer.alert('无权限，请联系管理员!', {
				    skin: 'layui-layer-lan'
				    ,closeBtn: 0
				    ,shift: 4 //动画类型
				  });
				return;
			}
			//询问框
			layer.confirm('你确定要删除此记录吗？', {
				btn : [ '确定', '取消' ]
			//按钮
			}, function() {
				$.ajax({
					url : "<%=path%>/farm/delFarm",
					data : {
						id : id
					},
					type : "POST",
					success : function(result) {
						result = $.parseJSON(result);
						if (result.success) {
							layer.alert(result.msg, function(index) {
							    $("#tab_fag").val(2);
								$("#farmViewForm").submit();
							});
						} else {
							layer.alert(result.msg);
						}
					}
				});
			});
		}
		
		
		
		//新增
		function addBatch(){
			if(isRead==0){
				layer.alert('无权限，请联系管理员!', {
				    skin: 'layui-layer-lan'
				    ,closeBtn: 0
				    ,shift: 4 //动画类型
				  });
				return;
			}
			layer.open({
				type: 2, 
				title: "新增入拦批次",
				skin: 'layui-layer-lan',
				area: ['480px', '480px'],
			    content: '<%=path%>/farm/addBatchUrl'
		    });
		}
		//新增
		function editBatch(id){
			if(isRead==0){
				layer.alert('无权限，请联系管理员!', {
				    skin: 'layui-layer-lan'
				    ,closeBtn: 0
				    ,shift: 4 //动画类型
				  });
				return;
			}
			layer.open({
				type: 2, 
				title: "修改批次",
				skin: 'layui-layer-lan',
				area: ['480px', '480px'],
			    content: "<%=path%>/farm/editBatchUrl?id=" + id
		    });
		}
		//出栏
		function laiBatch(id){
			if(isRead==0){
				layer.alert('无权限，请联系管理员!', {
				    skin: 'layui-layer-lan'
				    ,closeBtn: 0
				    ,shift: 4 //动画类型
				  });
				return;
			}
			layer.open({
				type: 2, 
				title: "批次出栏",
				skin: 'layui-layer-lan',
				area: ['480px', '480px'],
			    content: "<%=path%>/farm/laiBatchUrl?id=" + id
		    });
		}
		//新增栋舍
		function addHouse(){
			if(isRead==0){
				layer.alert('无权限，请联系管理员!', {
				    skin: 'layui-layer-lan'
				    ,closeBtn: 0
				    ,shift: 4 //动画类型
				  });
				return;
			}
			layer.open({
				type: 2, 
				title: "新增栋舍",
				skin: 'layui-layer-lan',
				area: ['670px', '430px'],
			    content: '<%=path%>/farm/addHouseUrl'
		    });
		}
		//编辑栋舍
		function editHouse(id,deviceID){
			if(isRead==0){
				layer.alert('无权限，请联系管理员!', {
				    skin: 'layui-layer-lan'
				    ,closeBtn: 0
				    ,shift: 4 //动画类型
				  });
				return;
			}
			layer.open({
				type: 2, 
				title: "修改",
				skin: 'layui-layer-lan',
				area: ['670px', '430px'],
			    content: "<%=path%>/farm/editHouseUrl?id=" + id+"&deviceID="+deviceID
			});
		}
		
		//删除栋舍
		function delHouse(id) {
			if(isRead==0){
				layer.alert('无权限，请联系管理员!', {
				    skin: 'layui-layer-lan'
				    ,closeBtn: 0
				    ,shift: 4 //动画类型
				  });
				return;
			}
			//询问框
			layer.confirm('你确定要删除此记录吗？', {
				btn : [ '确定', '取消' ]
			//按钮
			}, function() {
				$.ajax({
					url : "<%=path%>/farm/delHouse",
					data : {
						id : id
					},
					type : "POST",
					success : function(result) {
						result = $.parseJSON(result);
						if (result.success) {
							layer.alert(result.msg, function(index) {
								$("#tab_fag").val(3);
								$("#farmViewForm").submit();
							});
						} else {
							layer.alert(result.msg);
						}
					}
				});
			});
		}
		
		
		
	</script>
</body>
</html>
