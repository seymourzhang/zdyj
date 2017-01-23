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

				<div class="row-fluid">
					<div class="span12" align="right">
						<a href="javascript:;" class="btn blue" onclick="addHouse();"><i class="icon-plus"></i> 新增</a>
					</div>
				</div>

				<p></p>

				<div class="row-fluid">
					<div class="span12" align="center">
						<table class="table table-striped table-bordered table-hover" id="sample_1">

							<thead>

							<tr style="background-color: #1288C0; color: white;" >
								<th class="hidden-480" style="width:5%;text-align: center;">编号</th>
								<th style="width:5%;">栋舍</th>
								<th style="width:15%;">所属农场</th>
								<th style="width:8%;">栋舍类别</th>
								<th style="width:47%;">数据采集设备</th>
								<th style="width:20%;">操作</th>
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
											<a href="javascript:void(0);" onclick="editHouse('${hl.id}','${hl.deviceID}')" class="btn mini blue"><i class="icon-edit"></i> 修改</a> &nbsp;&nbsp;&nbsp;
											<a href="javascript:void(0);" onclick="delHouse(${hl.id})" class="btn mini black"><i class="icon-trash"></i> 删除</a>&nbsp;&nbsp;&nbsp;
											<%--<a href="javascript:void(0);" onclick="setDevice('${hl.id}','${hl.deviceID}')" class="btn mini purple"><i class="icon-list-alt"></i> 绑定设备</a></td>--%>
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
                layer.msg("无权限，请联系管理员！", {});
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
                layer.msg("无权限，请联系管理员！", {});
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
                layer.msg("无权限，请联系管理员！", {});
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
                            layer.msg("删除栋舍成功！", {});
							$("#tab_fag").val(2);
							$("#farmViewForm").submit();

						} else {
                            layer.msg("删除栋舍失败！(" + result.msg + ")", {});
						}
					}
				});
			});
		}
		
		
		
		//新增
		function addBatch(){
			if(isRead==0){
                layer.msg("无权限，请联系管理员！", {});
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
                layer.msg("无权限，请联系管理员！", {});
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
                layer.msg("无权限，请联系管理员！", {});
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
			if(isRead!=2){
                layer.msg("无权限，请联系管理员！", {});
				return;
			}
			layer.open({
				type: 2, 
				title: "新增栋舍",
				skin: 'layui-layer-lan',
				area: ['670px', '240px'],
			    content: '<%=path%>/farm/addHouseUrl'
		    });
		}


		//编辑栋舍
		function editHouse(id,deviceID){
			if(isRead==0){
                layer.msg("无权限，请联系管理员！", {});
				return;
			}
			layer.open({
				type: 2, 
				title: "修改",
				skin: 'layui-layer-lan',
				area: ['670px', '240px'],
			    content: "<%=path%>/farm/editHouseUrl?id=" + id+"&deviceID="+deviceID
			});
		}
		
		//删除栋舍
		function delHouse(id) {
			if(isRead!=2){
                layer.msg("无权限，请联系管理员！", {});
				return;
			}
			//询问框
			layer.confirm('确定要删除该栋舍吗？', {
                skin: 'layui-layer-lan'
                , closeBtn: 0
                , shift: 4 //动画类型
                , btn : [ '确定', '取消' ]
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
                            layer.msg("删除栋舍成功！", {});

								$("#tab_fag").val(3);
								$("#farmViewForm").submit();
                                location.reload();

						} else {
                            layer.msg("删除栋舍失败！(" + result.msg + ")", {});
						}
					}
				});
			});
		}

        //绑定设备
        function setDevice(id,deviceID){
            if(isRead==0){
                layer.msg("无权限，请联系管理员！", {});
                return;
            }
            layer.open({
                type: 2,
                title: "绑定",
                skin: 'layui-layer-lan',
                area: ['1000px', '450px'],
                content: "<%=path%>/farm/setDeviceHouseRelation?id=" + id
            });
        }
		
	</script>

</body>
</html>
