<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String urlPre = "../../../fr/ReportServer?reportlet=" + path.replace("/","") ;
	String urlParamUserId = "?user_id=";
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
							<iframe id="inStockForm" name="inStockForm" width="100%" height="700" frameborder="no" allowtransparency="yes" src="<%=urlPre%>/inStockForm.cpt<%=urlParamUserId%>${pd.user_id} ">
							</iframe>
						</div>
					

						<div class="tab-pane" id="tab_2">
				2

						</div>

						<div class="tab-pane " id="tab_3">
					3
								

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
	<script type="text/javascript" src="<%=path%>/modules/analyze/js/analyzeReport.js"></script>
	<!-- 确认窗口 -->

</body>
</html>