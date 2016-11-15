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

    <script type="text/javascript" src="<%=path%>/modules/breed/js/breedStandard.js"></script>
</head>
<script>
    $(function () {
        getColumns();
        initTable("breedSTD", getColumns(), ${standards});
        $("#varietyName").init();
    });
    function getColumns() {
        var dataColumns = [{
            field: "grow_week_age",
            title: "生长周龄",
        }, {
            title: "母鸡死淘率%",
        },{
            field: "female_life",
            title: "母鸡成活率%",
        }, {
            title: "平均体重（克）",
        },{
            title: "产蛋率%",
        }, {
            title: "每只入舍母鸡产蛋数（枚）",
        }, {
            field: "qualified_egg_rate",
            title: "合格种蛋率%",
        },{
            title: "每只入舍母鸡产合格种蛋数（枚）",
        }, {
            field: "chick_hatching_rate",
            title: "雏鸡孵化率%",
        }, {
            field: "breeding_chick_hatching",
            title: "种雏孵化率%",
        }, {
            title: "种雏数（只）",
        }];
        return dataColumns;
    };
</script>
<body>
    <div id="page-content" class="clearfix" style="padding-top: 10px;">
        <div class="row-fluid">
            <div class="span12">
                <div class="tabbable tabbable-custom boxless">
                    <ul class="nav nav-pills" style="margin-bottom: 0px;" id = "uiTab">
                        <li  class="active" style="text-align: center; width:33%; background-color: #BFBFBF;border-right: 1px solid #E0DFDF;" >
                            <a href="#tab_1" data-toggle="tab" onclick="BroilerHlh(1);">海兰褐父母代育成</a>
                        </li>
                        <li  style="text-align: center; width:33%; background-color: #BFBFBF; border-right: 1px solid #E0DFDF;" >
                            <a href="#tab_2" data-toggle="tab" onclick="BroilerHlh(3);">罗曼褐父母代育成</a>
                        </li>
                        <li  style="text-align: center; width:33%; background-color: #BFBFBF; border-right: 1px solid #E0DFDF; " >
                            <a href="#tab_3" data-toggle="tab" onclick="BroilerHlh(2);">罗曼褐父母代产蛋</a>
                        </li>
                    </ul>
                    <div class="tab-content" style="border:none">
                        <%-- 海兰褐父母代育成 --%>
                        <div class="tab-pane active" id="tab_1">
                            <div style="position: relative;top: 70px;width:99%;">
                                <%--<table id="breedSTDTable"></table>--%>
                                <div class="bootstrap-table">
                                    <div class="fixed-table-container">
                                        <div class="fixed-table-body">
                                            <table id="varietyName1">
                                                <tr>
                                                    <th data-valign="middle" data-align="center">${varietyName}</th>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <table id="breedSTD1Table">
                                    <thead>
                                    <tr>
                                        <th rowspan="2" data-valign="middle" data-align="center">生长周龄</th>
                                        <th colspan="2" data-valign="middle" data-align="center">母鸡死淘率%</th>
                                        <th rowspan="2" data-field="female_life" data-valign="middle" data-align="center">母鸡成活率%</th>
                                        <th colspan="2" data-valign="middle" data-align="center">平均体重（克）</th>
                                        <th colspan="2" data-valign="middle" data-align="center">饲料消耗（克/只）</th>
                                        <th rowspan="2" data-field="chick_hatching_rate" data-valign="middle" data-align="center">均匀度%</th>
                                        <th rowspan="2" colspan="2" data-field="breeding_chick_hatching" data-valign="middle" data-align="center">母鸡体重范围</th>
                                    </tr>
                                    <tr>
                                        <th data-field="female_week_avg_weed_out" data-align="center">每周平均</th>
                                        <th data-field="female_week_total_weed_out" data-align="center">累计</th>

                                        <th data-field="female_weight" data-align="center">母鸡</th>
                                        <th data-field="male_weight" data-align="center">公鸡</th>

                                        <th data-field="avg_feed_daliy" data-align="center">克/只/天</th>
                                        <th data-field="total_feed" data-align="center">累计</th>

                                        <th data-field="female_min_std_weight" data-align="center"></th>
                                        <th data-field="female_max_std_weight" data-align="center"></th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <%-- 罗曼褐父母代育成 --%>
                        <div class="tab-pane active" id="tab_2">
                            <div style="position: relative;top: 70px;width:99%;">
                                <%--<table id="breedSTDTable"></table>--%>
                                <div class="bootstrap-table">
                                    <div class="fixed-table-container">
                                        <div class="fixed-table-body">
                                            <table id="varietyName2">
                                                <tr>
                                                    <th data-valign="middle" data-align="center">${varietyName}</th>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <table id="breedSTD2Table">
                                    <thead>
                                    <tr>
                                        <th rowspan="2" data-valign="middle" data-align="center">生长周龄</th>
                                        <th colspan="2" data-valign="middle" data-align="center">母鸡死淘率%</th>
                                        <th rowspan="2" data-field="female_life" data-valign="middle" data-align="center">母鸡成活率%</th>
                                        <th colspan="2" data-valign="middle" data-align="center">平均体重（克）</th>
                                        <th colspan="2" data-valign="middle" data-align="center">饲料消耗（克/只）</th>
                                        <th rowspan="2" data-field="chick_hatching_rate" data-valign="middle" data-align="center">均匀度%</th>
                                        <th rowspan="2" colspan="2" data-field="breeding_chick_hatching" data-valign="middle" data-align="center">母鸡体重范围</th>
                                    </tr>
                                    <tr>
                                        <th data-field="female_week_avg_weed_out" data-align="center">每周平均</th>
                                        <th data-field="female_week_total_weed_out" data-align="center">累计</th>

                                        <th data-field="female_weight" data-align="center">母鸡</th>
                                        <th data-field="male_weight" data-align="center">公鸡</th>

                                        <th data-field="avg_feed_daliy" data-align="center">克/只/天</th>
                                        <th data-field="total_feed" data-align="center">累计</th>

                                        <th data-field="female_min_std_weight" data-align="center"></th>
                                        <th data-field="female_max_std_weight" data-align="center"></th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <%-- 海兰褐父母代产蛋 --%>
                        <div class="tab-pane active" id="tab_3">
                            <div style="position: relative;top: 70px;width:99%;">
                                <%--<table id="breedSTDTable"></table>--%>
                                <div class="bootstrap-table">
                                    <div class="fixed-table-container">
                                        <div class="fixed-table-body">
                                            <table id="varietyName3">
                                                <tr>
                                                    <th data-valign="middle" data-align="center">${varietyName}</th>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <table id="breedSTD3Table">
                                    <thead>
                                    <tr>
                                        <th rowspan="2" data-valign="middle" data-align="center">生长周龄</th>
                                        <th colspan="2" data-valign="middle" data-align="center">母鸡死淘率%</th>
                                        <th rowspan="2" data-field="female_life" data-valign="middle" data-align="center">母鸡成活率%</th>
                                        <th colspan="2" data-valign="middle" data-align="center">平均体重（克）</th>
                                        <th colspan="2" data-valign="middle" data-align="center">产蛋率%</th>
                                        <th colspan="2" data-valign="middle" data-align="center">每只入舍母鸡产蛋数（枚）</th>
                                        <th rowspan="2" data-field="qualified_egg_rate" data-valign="middle" data-align="center">合格种蛋率%</th>
                                        <th colspan="2" data-valign="middle" data-align="center">每只入舍母鸡产合格种蛋数（枚）</th>
                                        <th rowspan="2" data-field="chick_hatching_rate" data-valign="middle" data-align="center">雏鸡孵化率%</th>
                                        <th rowspan="2" data-field="breeding_chick_hatching" data-valign="middle" data-align="center">种雏孵化率%</th>
                                        <th colspan="2" data-valign="middle" data-align="center">种雏数（只）</th>
                                    </tr>
                                    <tr>
                                        <th data-field="female_week_avg_weed_out" data-align="center">每周平均</th>
                                        <th data-field="female_week_total_weed_out" data-align="center">累计</th>

                                        <th data-field="female_weight" data-align="center">母鸡</th>
                                        <th data-field="male_weight" data-align="center">公鸡</th>

                                        <th data-field="cl_laying_rate" data-align="center">存栏鸡</th>
                                        <th data-field="rs_laying_rate" data-align="center">入舍鸡</th>

                                        <th data-field="rs_female_laying_avg_count" data-align="center">每周平均</th>
                                        <th data-field="rs_female_laying_total_count" data-align="center">累计</th>

                                        <th data-field="rs_female_avg_qualified_count" data-align="center">每周平均</th>
                                        <th data-field="rs_female_total_qualified_count" data-align="center">累计</th>

                                        <th data-field="breeding_chick_avg_count" data-align="center">每周平均</th>
                                        <th data-field="breeding_chick_total_count" data-align="center">累计</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
