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
<script>
		jQuery(document).ready(function() {
			 var win_h = $(window).height()-208;
			/*  $("#user_date_table").css("min-height",win_h);
			 $("#page-content").css("min-height",win_h); */
		});
	</script>
<body style="background-color: #ffffff;">
	<!--  <div class="container-fluid" id="main-container" style="background-color: #ffffff;"> -->
			<div id="page-content" class="clearfix" style="padding-top: 10px;" > 
				<div class="row-fluid" style="background-color: #ffffff;">
					<form action="<%=path%>/user/userManage" method="post" style="background-color: #ffffff;" id="userForm">
						<%-- <input type="hidden" name="id" value="${pd.id}">
						<input type="hidden" name="pid" value="${pd.pid}"> --%>
					  <div class="span12">
							<!-- BEGIN PORTLET-->
							<div class="portlet box blue1">
								<div class="portlet-title">
									<div class="caption">
										<i class="icon-reorder"></i>检索条件
									</div>
									<!-- <div class="tools">

										<a href="javascript:;" class="collapse"></a>

									</div> -->
									<div class="actions">

										<a href="javascript:search();" class="btn green"><i class="icon-search"></i> 查询</a>

									</div>

								</div>

								<div class="portlet-body form1">
									<!-- BEGIN FORM-->
									<div class="form-horizontal" style="height: 40px;">
										<div style="height: 20px;">
											<%-- <div class="span4">
												<div class="control-group">
													<label class="control-label" style="width: 60px;">农场</label>
													<div class="controls" style="margin-left: 65px;">
														<select id="farmId" class="m-wrap span12" tabindex="1" name="farm_id" >	
			                                               	<option value="">全部</option>
			                                                 <c:if test="${!empty farmList}">
			                                                 	<c:forEach items="${farmList}" var="farm">
																	<option value="${farm.id }" <c:if test="${pd.farm_id==farm.id}">selected</c:if>>${farm.farm_name_chs }</option>
															 	</c:forEach>
		                                                 	 </c:if>
														</select>
													</div>
												</div>
											</div> --%>

											<!--/span-->

											<div class="span4">

												<div class="control-group">

													<label class="control-label" style="width: 60px;">中文名</label>

													<div class="controls" style="margin-left: 65px;">

														<input type="text" class="m-wrap span12" value="${pd.user_real_name }" placeholder="模糊查询中文名" name="user_real_name"">

													</div>

												</div>

											</div>

											<!--/span-->

											<!--/span-->

											<div class="span4">

												<div class="control-group">

													<label class="control-label" style="width: 60px;">手机号</label>

													<div class="controls" style="margin-left: 65px;">

														<input type="text" class="m-wrap span12" value="${pd.user_mobile_1 }" placeholder="模糊查询手机号" name="user_mobile_1">

													</div>

												</div>

											</div>

											<!--/span-->

										</div>

									</div>

									<!-- END FORM-->
								</div>

							</div>

							<!-- END PORTLET-->

							<div class="portlet box blue1">

								<div class="portlet-title">

									<div class="caption">
										<i class="icon-globe"></i>用户信息
									</div>

									<!-- <div class="tools">

										<a href="javascript:;" class="collapse"></a>

									</div> -->
									<div class="actions">

										<a href="javascript:;" class="btn green" onclick="add();"><i class="icon-plus"></i> 新增</a>

									</div>
								</div>

								<div class="portlet-body" id="user_date_table">
									<table class="table table-striped table-bordered table-hover" id="sample_1">

										<thead>

											<tr>
												<th class="hidden-480" style="text-align: center;">编号</th>
												<th>用户名</th>
												<th>中文名</th>
												<th>手机</th>
												<!-- <th>所属农场</th>
												<th>所属栋舍</th> -->
												<th>状态</th>
												<th>操作</th>
											</tr>
										</thead>
										<tbody>
											<c:if test="${!empty listUser}">
												<c:forEach var="lu" items="${listUser}" varStatus="vs">
													<tr class="odd gradeX">
														<td class="hidden-480" style="text-align: center;">${lu.id}</td>
														<td>${lu.user_code}</td>
														<td>${lu.user_real_name}</td>
														<td>${lu.user_mobile_1 != null ? lu.user_mobile_1 : 0}</td>
														<%-- <td>${lu.farm_name_chs}</td>
														<td>${lu.house_name}</td> --%>
														<c:choose>
															<c:when test="${lu.user_status=='1'}">
																<td>正常</td>
															</c:when>
															<c:otherwise>
																<td>冻结</td>
															</c:otherwise>
														</c:choose>
														<td class="center hidden-480" style="width: 145px;"><a href="javascript:void(0);" onclick="editUser(${lu.id},${lu.farm_id!=null? lu.farm_id :'0'},'${lu.house_code!=null?lu.house_code:'0'}')" class="btn mini purple"><i class="icon-edit"></i> 修改</a> &nbsp;&nbsp;&nbsp; <a href="javascript:void(0);" onclick="delUser(${lu.id})" class="btn mini black"><i class="icon-trash"></i> 删除</a></td>
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
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div> 
		 </div> 
		<!-- #main-content -->
	<!-- </div>  -->
	<script type="text/javascript" src="<%=path%>/js/bootbox.min.js"></script>
	<!-- 确认窗口 -->
	<script type="text/javascript">
	var isRead="${pd.write_read}";//菜单是否只读
	//检索
	function search(){
		$("#userForm").submit();
		/* layer.load(1, {
			  shade: [0.3,'#fff'], //0.1透明度的白色背景
			  time: 1000
			}); */
	}
	
		//新增
		function add(){
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
				title: "新增",
				skin: 'layui-layer-lan',
				area: ['670px', '520px'],
			    content: '<%=path%>/user/addUserUrl'
		    });
		}
		//编辑
		function editUser(id,farm_id,house_code){
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
				area: ['670px', '520px'],
			    content: "<%=path%>/user/editUserUrl?id=" + id+"&farm_id="+farm_id+"&house_code="+house_code
			});
		}
		//删除
		function delUser(id) {
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
					url : "<%=path%>/user/delUser",
					data : {
						id : id
					},
					type : "POST",
					success : function(result) {
						result = $.parseJSON(result);
						if (result.success) {
							layer.alert(result.msg, function(index) {
								layer.load(1, {
									  shade: [0.3,'#fff'], //0.1透明度的白色背景
									  time: 1000
									});
								location.reload();
							});
						} else {
							layer.alert(result.msg);
						}
					}
				});
			});
		}

		jQuery(document).ready(function() {
			App.init(); // initlayout and core plugins
			/* layer.load(1, {
				  shade: [0.3,'#fff'], //0.1透明度的白色背景
				  time: 2000
				}); */
		});
	</script>
</body>
</html>
