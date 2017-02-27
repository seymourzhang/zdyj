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
<div id="page-content" class="clearfix">
    <div class="row-fluid">
        <div class="span12">
            <div class="tabbable tabbable-custom boxless" >
                <div class="row-fluid">
                    <%--标签菜单栏--%>
                    <div class="span12" style="margin-left: 0px;height: 10px">
                        <ul class="nav nav-pills row-fluid" style="margin-bottom: 0px; ">
                            <li  class="active" id="createBatch" style="text-align: center;width:33.2%;background-color: #BFBFBF;border-right: 1px solid #E0DFDF;" >
                                <a href="#tabCreateBatch" data-toggle="tab" id="createBatchA">进鸡</a>
                            </li>
                            <li  id="editBatch" style="text-align: center;width:33.4%;background-color: #BFBFBF;border-right: 1px solid #E0DFDF; " >
                                <a href="#tabEditBatch" data-toggle="tab" id="editBatchA">调鸡</a>
                            </li>
                            <li  id="overBatch" style="text-align: center;width:33.2%;background-color: #BFBFBF;" >
                                <a href="#tabOverBatch" data-toggle="tab" id="overBatchA">出栏</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <input type="hidden" name="house_length" id="house_length" value="${pd.length}">

                <div class="tab-content row-fluid" style="border:none;padding-top: 2px;">
                    <%-- 进鸡 --%>
                    <div class="tab-pane active" id="tabCreateBatch">
                        <%--功能栏--%>
                        <div class="row-fluid" id="toolbarCreateBatch" style="background:#e7e5e5;padding-top: 10px;">
                            <div class="span12">
                                <div class="container-fluid">
                                    <div class="row-fluid" id="jj1">
                                        <div class="span3" align="left">
                                            <span_customer>批次号</span_customer>
                                            <input id="createBatchNo" type="text" placeholder="请输入批次号">
                                        </div>
                                        <div class="span3" align="left">
                                            <span_customer>品种</span_customer>
                                            <select id="createBatchGoodSelect" onchange= "changeGoodSelect()" >
                                            </select>
                                        </div>
                                        <div class="span3" align="left">
                                            <span_customer>来源</span_customer>
                                            <select id="createBatchCorporationSelect">
                                            </select>
                                        </div>
                                        <div class="span3" align="left">
                                            <span_customer>生长日龄</span_customer>
                                            <input id="createBatchGrowDay" type="text" value="0">
                                        </div>
                                    </div>
                                    <div class="row-fluid" id="jj2">
                                        <div class="span3" align="left">
                                            <span_customer>进鸡日</span_customer>
                                            <div class="controls">
                                                <div class="input-append date createBatchDatePicker" data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
                                                    <input readonly type="text" name="queryTime" id="createBatchQueryTime" style="width: 182px">
                                                    <span class="add-on">
                                                    <i class="icon-calendar"></i>
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span3" align="left">
                                            <span_customer>进入栋</span_customer>
                                            <select id="createBatchHouseSelect">
                                            </select>
                                        </div>
                                        <div class="span3" align="left">
                                            <span_customer>母鸡数</span_customer>
                                            <input id="createBatchFemaleNum" type="text" value="0">
                                        </div>
                                        <div class="span3" align="left">
                                            <span_customer>公鸡数</span_customer>
                                            <input id="createBatchMaleNum" type="text" value="0">
                                        </div>
                                    </div>
                                    <div class="row-fluid" id="jj3">
                                        <div class="span6" align="left">
                                            <span_customer>备注</span_customer>
                                            <input id="createBatchRemark" type="text" style="width: 76%" maxlength="40" placeholder="请填写备注">
                                        </div>
                                        <div class="span6" align="left">
                                            <a id="createBatchBtnSave" href="javascript:;" class="btn blue" onclick="saveData();"><i class="icon-ok"></i>确认</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12">
                                <p id = "createBatchFarmTitle" align="center" style="font-weight:bold;">
                                    农场
                                </p>
                                <div id="createBatchFrame" align="center">
                                    <table id="createBatchTable"></table>
                                </div>
                            </div>
                        </div>
                    </div>

                        <%-- 调鸡 --%>
                        <div class="tab-pane" id="tabEditBatch" >
                            <%--功能栏--%>
                            <div class="row-fluid" id="toolbarEditBatch" style="background:#e7e5e5;padding-top: 10px;">
                                <div class="span12">
                                    <div class="container-fluid">
                                        <div class="row-fluid" id="tj1">
                                            <div class="span2" align="left">
                                                <span_customer2>日期</span_customer2>
                                                    <div class="input-append date editBatchDatePicker" data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
                                                        <input readonly type="text" name="queryTime" id="editBatchQueryTime" style="width: 96px">
                                                        <span class="add-on">
                                                            <i class="icon-calendar"></i>
                                                        </span>
                                                    </div>
                                            </div>
                                            <div class="span2" align="left">
                                                <span_customer2>调出栋</span_customer2>
                                                <select id="editBatchHouseSelect" onchange="getCount();" style="width: 90px">
                                                </select>
                                            </div>
                                            <div class="span2" align="left">
                                                <span_customer2>调入至</span_customer2>
                                                <select id="editBatchHouseSelectTarget" style="width: 90px">
                                                </select>
                                            </div>
                                            <div class="span3" align="left">
                                                <span_customer2>母鸡数</span_customer2>
                                                <input id="editBatchFemaleNum" type="text" style="width:40px;" value="0">
                                                母鸡存量
                                                <input id="currStock1" type="text" style="width:40px;" disabled="disabled">
                                            </div>
                                            <div class="span3" align="left">
                                                <span_customer2>公鸡数</span_customer2>
                                                <input id="editBatchMaleNum" type="text" style="width:40px;" value="0">
                                                公鸡存量
                                                <input id="currStock2" type="text" style="width:40px;" disabled="disabled">
                                            </div>
                                        </div>
                                        <div class="row-fluid" id="tj2">
                                            <div class="span6" align="left">
                                                <span_customer2>备注</span_customer2>
                                                <input id="editBatchRemark" type="text" maxlength="40" placeholder="请填写备注" style="width: 80%;">
                                            </div>
                                            <%--<div class="span3" align="left">--%>
                                            <%--</div>--%>
                                            <div class="span6" align="left">
                                                <a id="editBatchBtnSave" href="javascript:;" class="btn blue" onclick="saveData();">
                                                    <i class="icon-ok"></i>&nbsp;确认调鸡
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12">
                                    <p id = "editBatchFarmTitle" align="center" style="font-weight: bold;">
                                        农场
                                    </p>
                                    <div id="editBatchFrame" align="center">
                                        <table id="editBatchTable"></table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <%-- 出栏 --%>
                        <div class="tab-pane" id="tabOverBatch">
                            <%--功能栏--%>
                            <div class="row-fluid" id="toolbarOverBatch" style="background:#e7e5e5;padding-top: 10px;">
                                <div class="span12">
                                    <div class="container-fluid">
                                        <div class="row-fluid" id="cl1">
                                            <div class="span2" align="left">
                                                <span_customer2>出栏日</span_customer2>
                                                    <div class="input-append date overBatchDatePicker" data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
                                                        <input readonly type="text" name="queryTime" id="overBatchQueryTime" onchange="getOverBatchAge();" style="width: 90px;">
                                                        <span class="add-on">
                                                            <i class="icon-calendar"></i>
                                                        </span>
                                                    </div>
                                            </div>
                                            <div class="span2" align="left">
                                                <span_customer2>出栏日龄</span_customer2>
                                                <input id="overBatchAge" type="text" disabled="disabled" style="width: 25px">
                                            </div>
                                            <div class="span2" align="left">
                                                <span_customer2>出栏栋</span_customer2>
                                                <select id="overBatchHouseSelect" onchange="getCount();" style="width: 90px" style="width: 89%;">
                                                </select>
                                            </div>
                                            <div class="span3" align="left">
                                                <span_customer2>母鸡数</span_customer2>
                                                <input id="overBatchFemaleNum" type="text" style="width: 40px;">
                                                &nbsp;&nbsp;
                                                <span_customer2>母鸡均重</span_customer2>
                                                <input id="overBatchFemaleAvgWeight" type="text" value="0" style="width:36px;">&nbsp;g
                                            </div>
                                            <div class="span3" align="left">
                                                <span_customer2>公鸡数</span_customer2>
                                                <input id="overBatchMaleNum" type="text" style="width: 40px;">
                                                &nbsp;&nbsp;
                                                <span_customer2>公鸡均重</span_customer2>
                                                <input id="overBatchMaleAvgWeight" type="text" value="0" style="width:40px;">&nbsp;g
                                            </div>
                                        </div>
                                        <div class="row-fluid" id="cl2">
                                            <div class="span6" align="left">
                                                <span_customer2>备注</span_customer2>
                                                &nbsp;&nbsp;
                                                <input id="overBatchRemark" type="text" maxlength="40" placeholder="请填写备注" style="width: 80%">
                                            </div>
                                            <div class="span6" align="left">
                                                <a id="overBatchBtnSaveY" href="javascript:;" class="btn blue" onclick="saveData();">
                                                    <i class="icon-ok"></i>&nbsp;确认出栏
                                                </a>
                                            </div>
                                        </div>
                                        <div class="row-fluid" id="cl3" style="display: none;">
                                            <div class="span12" align="left">
                                                --------------------------------------- <B>淘汰鸡销售</B> ---------------------------------------
                                            </div>
                                        </div>
                                        <div class="row-fluid" id="cl4" style="display: none;">
                                            <div class="span2" align="left">
                                                <span_customer2>总重量</span_customer2>
                                                <input id="overBatchSumWeight" type="text" value="0" style="width:90px;" disabled="disabled" onblur="getOverBatchAvgPriceSum();">&nbsp;kg
                                            </div>
                                            <div class="span2" align="left">
                                                <span_customer2>总数量</span_customer2>
                                                <input id="overBatchSumNum" type="text" value="0" style="width: 50px;" disabled="disabled">
                                            </div>
                                            <div class="span2" align="left">
                                                <span_customer2>单价</span_customer2>
                                                <input id="overBatchAvgPrice" type="text" value="0" style="width:50px;" disabled="disabled" onblur="getOverBatchAvgPriceSum();">&nbsp;元/kg
                                            </div>
                                            <div class="span3" align="left">
                                                <span_customer2>总金额</span_customer2>
                                                <input id="overBatchAvgPriceSum" type="text" value="0" style="width:90px;" disabled="disabled">&nbsp;元
                                            </div>
                                            <div class="span3" align="left">
                                                <a id="overBatchBtnSave" href="javascript:;" class="btn blue" onclick="saveData();">
                                                    <i class="icon-ok"></i>&nbsp;确认出栏
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12">
                                    <p id = "overBatchFarmTitle" align="center" style="font-weight: bold;">
                                        农场
                                    </p>
                                    <div id="overBatchFrame" align="center">
                                        <table id="overBatchTable"></table>
                                    </div>
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
<script type="text/javascript" src="<%=path%>/js/bootbox.min.js"></script>
<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="<%=path %>/framework/js/bootstrap-datepicker.zh-CN.js"></script>

<script type="text/javascript" src="<%=path%>/framework/table/table.js"></script>
<script type="text/javascript" src="<%=path%>/modules/batch/js/createBatch.js"></script>
<script type="text/javascript" src="<%=path%>/modules/batch/js/editBatch.js"></script>
<script type="text/javascript" src="<%=path%>/modules/batch/js/overBatch.js"></script>
<script type="text/javascript" src="<%=path%>/modules/batch/js/batchManage.js"></script>

</body>
</html>
