<%--
  Created by IntelliJ IDEA.
  User: Seymour
  Date: 2016/11/2
  Time: 11:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<html>
<head>
    <meta charset="UTF-8">
    <%@ include file="../../framework/inc.jsp"%>

    <script src="<%=path%>/framework/js/bootstrap_table/bootstrap-table.js"></script>
    <link href="<%=path%>/framework/js/bootstrap_table/bootstrap-table.css" rel="stylesheet" />
    <script src="<%=path%>/framework/js/bootstrap_table/locale/bootstrap-table-zh-CN.js"></script>

    <link rel="stylesheet" href="<%=path%>/framework/js/bootstrap_editable/1.5.1/css/bootstrap-editable.css">
    <script src="<%=path%>/framework/js/bootstrap_editable/1.5.1/js/bootstrap-editable.js"></script>
    <script src="<%=path%>/framework/js/bootstrap_table/extensions/editable/bootstrap-table-editable.js"></script>
    <script type="text/javascript" src="<%=path%>/framework/table/table.js"></script>

</head>
<script>
    $(function () {
        getColumns();
        initTable("stock", getColumns(), ${files});
    });
    function getColumns() {
        var dataColumns = [{
            radio: true,
            title: "选择",
            width: '5%'
        }, {
            field: "file_name",
            title: "文件名"
        }, {
            field: "bak",
            title: "备注"
        }, {
            field: "create_date",
            title: "上传时间"
        }];
        return dataColumns;
    }
    function uploadConfirm() {
        layer.open({
            type: 2,
            title:"提示",
            skin: 'layui-layer-lan', //加上边框
            area: ['520px', '370px'], //宽高
            closeBtn: 0,
            shift: 4, //动画类型
            content: '<%=path%>/breed/editFileUrl'
        });
    }
</script>
<body>

    <button type="button" onclick="uploadConfirm();"><p>上传</p></button>

    <button type="button" onclick=""><p>删除</p></button>

    <div style="position: relative;top: 50px;overflow-x: auto; overflow-y: auto; height: 76%; width:99%;">
        <table id="stockTable"></table>
    </div>
</body>
</html>
