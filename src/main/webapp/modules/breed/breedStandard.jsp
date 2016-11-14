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
            colspan: 2,
        }, {
            field: "female_week_avg_weed_out",
            title: "每周平均",
        }, {
            field: "female_week_total_weed_out",
            title: "累计",
        }, {
            field: "female_life",
            title: "母鸡成活率%",
        }, {
            title: "平均体重（克）",
            colspan: 2,
        }, {
            field: "female_weight",
            title: "母鸡",
        }, {
            field: "male_weight",
            title: "公鸡",
        }, {
            title: "产蛋率%",
            colspan: 2,
        }, {
            field: "cl_laying_rate",
            title: "存栏鸡",
        }, {
            field: "rs_laying_rate",
            title: "入舍鸡",
        }, {
            title: "每只入舍母鸡产蛋数（枚）",
            colspan: 2,
        }, {
            field: "rs_female_laying_avg_count",
            title: "每周平均",
        }, {
            field: "rs_female_laying_total_count",
            title: "累计",
        }, {
            field: "qualified_egg_rate",
            title: "合格种蛋率%",
        }, {
            title: "每只入舍母鸡产合格种蛋数（枚）",
            colspan: 2,
        }, {
            field: "rs_female_avg_qualified_count",
            title: "每周平均",
        }, {
            field: "rs_female_total_qualified_count",
            title: "累计",
        }, {
            field: "chick_hatching_rate",
            title: "雏鸡孵化率%",
        }, {
            field: "chick_hatching_rate",
            title: "种雏孵化率%",
        }, {
            title: "种雏数（只）",
            colspan: 2,
        }, {
            field: "breeding_chick_avg_count",
            title: "每周平均",
        }, {
            field: "breeding_chick_total_count",
            title: "累计",
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
