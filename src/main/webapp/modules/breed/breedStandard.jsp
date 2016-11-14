<%--
  Created by IntelliJ IDEA.
  User: Seymour
  Date: 2016/11/14
  Time: 11:56
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
        initTable("breedSTD", getColumns(), ${standards});
    });
    function getColumns() {
        var dataColumns = [{
            field: "grow_week_age",
            title: "生长周龄",
        }, {
            title: "母鸡死淘率%",
//            title: "每周平均",
//            field: "female_week_total_weed_out",
            mergeCells:function (options) {
                index = 1;
                options.field = "female_week_avg_weed_out";
                options.title = "母鸡死淘率%";
                options.rowspan = 3;
                options.colspan = 4;
                index = 2;
                options.field = "female_week_avg_weed_out";
                options.title = "母鸡死淘率%";
                options.rowspan = 3;
                options.colspan = 4;
            }
        }, {
            field: "bak",
            title: "备注"
        }, {
            field: "create_time",
            title: "上传时间"
        }];
        return dataColumns;
    };
</script>
<body>
    <div style="position: relative;top: 70px;width:99%;">
        <table id="breedSTDTable"></table>
    </div>
</body>
</html>
