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
<div id="page-content" class="clearfix"  style="padding-top: 10px;">
    <div class="row-fluid">
        <div class="span12">
            <div class="tabbable tabbable-custom boxless" >
                <ul class="nav nav-pills" style="margin-bottom: 0px; ">
                    <li  class="active" id="createBatch" style="text-align: center;width:33%;background-color: #BFBFBF;border-right: 1px solid #E0DFDF;" >
                        <a href="#tabCreateBatch" data-toggle="tab" id="createBatchA">进鸡</a>
                    </li>
                    <li  id="editBatch" style="text-align: center;width:33%;background-color: #BFBFBF;border-right: 1px solid #E0DFDF; " >
                        <a href="#tabEditBatch" data-toggle="tab" id="editBatchA">调鸡</a>
                    </li>
                    <li  id="overBatch" style="text-align: center;width:33%;background-color: #BFBFBF;" >
                        <a href="#tabOverBatch" data-toggle="tab" id="overBatchA">出栏</a>
                    </li>
                </ul>
                <div class="tab-content" style="border:none">
                    <%-- 进鸡 --%>
                    <div class="tab-pane active" id="tabCreateBatch">
                        <div class="container-fluid">
                            <div class="row-fluid">
                                <div class="span3" align="left">
                                    <span_customer>批次号</span_customer><input id="createBatchNo" type="text" placeholder="请输入批次号">
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
                            <div class="row-fluid">
                                <div class="span3" align="left">
                                        <span_customer>进鸡日</span_customer>
                                        <div class="controls">
                                            <div class="input-append date createBatchDatePicker" data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
                                                <input class="m-wrap span11 m-ctrl-medium createBatchDatePicker" readonly type="text" name="queryTime" id="createBatchQueryTime" />
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
                            <div class="row-fluid">
                                <div class="span9" align="left">
                                        <span_customer>备注</span_customer>
                                        <input id="createBatchRemark" type="text" style="width: 82%" maxlength="40" placeholder="请填写备注">
                                </div>
                                <div class="span3" align="left">
                                        <a id="createBatchBtnSave" href="javascript:;" class="btn green" onclick="saveData();"></i>确认</a>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12">
                                    <hr style="height:10px;border:none;border-top:1px solid #555555;" />
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12">
                                    <p id = "createBatchFarmTitle" align="center">
                                        农场
                                    </p>
                                    <div id="createBatchFrame" align="center">
                                        <table id="createBatchTable"></table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <%-- 调鸡 --%>
                    <div class="tab-pane" id="tabEditBatch">
                        <div class="container-fluid">
                            <div class="row-fluid">
                                <div class="span3" align="left">
                                    <span_customer>日期</span_customer>
                                    <div class="controls">
                                        <div class="input-append date editBatchDatePicker" data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
                                            <input class="m-wrap span11 m-ctrl-medium editBatchDatePicker" readonly type="text" name="queryTime" id="editBatchQueryTime" />
                                            <span class="add-on">
                                                    <i class="icon-calendar"></i>
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="span3" align="left">
                                    <span_customer>调出栋</span_customer>
                                    <select id="editBatchHouseSelect" onchange="getCount();">
                                    </select>
                                </div>
                                <div class="span3" align="left">
                                    <span_customer>调入至</span_customer>
                                    <select id="editBatchHouseSelectTarget">
                                    </select>
                                </div>
                                <div class="span3" align="left">

                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span2" align="left" style="width:120px;">
                                    <span_customer>母鸡数</span_customer>
                                    <input id="editBatchFemaleNum" type="text" style="width:40px;" value="0">
                                    
                                </div>
                                <div class="span2" align="left" style="width:150px;">
                                    <label style="width:90px;margin-top: 2px;margin-left:-15px;" >当前库存量</label>
                                    <input id="currStock1" type="text" style="width:40px;margin-top: -40px;margin-left: 60px;" disabled="disabled">
                                </div>
                                <div class="span2" align="left" style="width:120px;">
                                    <span_customer>公鸡数</span_customer>
                                    <input id="editBatchMaleNum" type="text" style="width:40px;" value="0"> 
                                </div>
                                <div class="span2" align="left" style="width:150px;">
                                    <label style="width:90px;margin-top: 2px;" >当前库存量</label>
                                    <input id="currStock2" type="text" style="width:40px;margin-top: -40px;margin-left: 75px;" disabled="disabled">
                                </div>
                                <div class="span3" align="left">
                                    <span_customer>备注</span_customer>
                                    <input id="editBatchRemark" type="text" maxlength="40" placeholder="请填写备注">
                                </div>
                                <div class="span1" align="left">
                                    <a id="editBatchBtnSave" href="javascript:;" class="btn green" onclick="saveData();"></i>确认</a>
                                </div>
                            </div>

                            <div class="row-fluid">
                                <div class="span12">
                                    <hr style="height:10px;border:none;border-top:1px solid #555555;" />
                                </div>
                            </div>

                            <div class="row-fluid">
                                <div class="span12">
                                    <p id = "editBatchFarmTitle" align="center">
                                        农场
                                    </p>
                                    <div id="editBatchFrame" align="center">
                                        <table id="editBatchTable"></table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <%-- 出栏 --%>
                    <div class="tab-pane" id="tabOverBatch">
                        <div class="container-fluid">
                            <div class="row-fluid">
                                <div class="span3" align="left">
                                    <span_customer>出栏日</span_customer>
                                    <div class="controls">
                                        <div class="input-append date overBatchDatePicker" data-date-format="yyyy-mm-dd" data-date-viewmode="years" data-date-minviewmode="months">
                                            <input class="m-wrap span11 m-ctrl-medium overBatchDatePicker" readonly type="text" name="queryTime" id="overBatchQueryTime" />
                                            <span class="add-on">
                                                    <i class="icon-calendar"></i>
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="span3" align="left">
                                    <span_customer>母鸡数</span_customer>
                                    <input id="overBatchFemaleNum" type="text" value="0">
                                </div>
                                <div class="span3" align="left">
                                    <span_customer>公鸡数</span_customer>
                                    <input id="overBatchMaleNum" type="text" value="0">
                                </div>
                                <div class="span3" align="left">
                                    <span_customer>备注</span_customer>
                                    <input id="overBatchRemark" type="text" maxlength="40" placeholder="请填写备注">
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span3" align="left">
                                    <span_customer>出栏栋</span_customer>
                                    <select id="overBatchHouseSelect">
                                    </select>
                                </div>
                                <div class="span3" align="left">
                                    <span_customer>母鸡均重</span_customer>
                                    <input id="overBatchFemaleAvgWeight" type="text" value="0">
                                </div>
                                <div class="span3" align="left">
                                    <span_customer>公鸡均重</span_customer>
                                    <input id="overBatchMaleAvgWeight" type="text" value="0">
                                </div>
                                <div class="span3" align="left">

                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span9" align="left">
                                    --------------------------------------- <B>淘汰鸡</B> ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                </div>
                                <div class="span3" align="left">

                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span3" align="left">
                                    <span_customer>总重量</span_customer>
                                    <input id="overBatchSumWeight" type="text" value="0">
                                </div>
                                <div class="span3" align="left">
                                    <span_customer>只数</span_customer>
                                    <input id="overBatchSumNum" type="text" value="0">
                                </div>
                                <div class="span3" align="left">
                                    <span_customer>均价价格</span_customer>
                                    <input id="overBatchAvgPrice" type="text" value="0">
                                </div>
                                <div class="span3" align="left">
                                    <a id="overBatchBtnSave" href="javascript:;" class="btn green" onclick="saveData();"></i>确认</a>
                                </div>
                            </div>


                            <div class="row-fluid">
                                <div class="span12">
                                    <hr style="height:10px;border:none;border-top:1px solid #555555;" />
                                </div>
                            </div>

                            <div class="row-fluid">
                                <div class="span12">
                                    <p id = "overBatchFarmTitle" align="center">
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
