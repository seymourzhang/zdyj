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
    <meta charset="UTF-8">
    <%@ include file="../../framework/inc.jsp"%>
</head>
<script>
        jQuery(document).ready(function () {
            checkDate($("#wd")[0]);
            setData(${tasks});
            <%--initTableWithToolBar("stock", "taskReminderToolbar", getStockTableColumns(), ${tasks});--%>
        });
</script>
<body style="background-color: #ffffff;">
<div id="page-content" class="clearfix" style="padding-top: 10px;">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span4" align="left">
                <span_customer>任务类别</span_customer>
                <select id="taskType" onchange="queryNext();">
                    <c:if test="${!empty task_type}">
                        <c:forEach var="type" items="${task_type}">
                            <option value="${type.task_type}">${type.code_name}</option>
                        </c:forEach>
                    </c:if>
                </select>
            </div>
            <div class="span4" align="left">
                <select id="wd" onchange="checkDate(this);" style="width: 80px; height: 30px;" disabled="false">
                    <c:if test="${!empty date_type}">
                        <c:forEach var="type" items="${date_type}">
                            <option value="${type.biz_code}">${type.code_name}</option>
                        </c:forEach>
                    </c:if>
                </select>
                <input id="dateValues" style="width: 320px; height: 30px" placeholder="请按周龄或日龄输入"/>
            </div>
            <div class="span4" align="left">

            </div>
        </div>

        <div class="row-fluid">
            <div class="span4" align="left">
                <span_customer>任务项</span_customer>
                <select id="taskCode" >
                    <c:if test="${!empty task_code}">
                        <c:forEach var="code" items="${task_code}">
                            <option value="${code.task_id}">${code.task_name}</option>
                        </c:forEach>
                    </c:if>
                </select>
            </div>
            <div class="span4" align="left">
                <span_customer>提醒日期</span_customer>
                <div id="weeks">
                    <table>
                        <tr>
                            <td><input name="week" type="checkbox" value="1"/>周一</td>
                            <td><input name="week" type="checkbox" value="2"/>周二</td>
                            <td><input name="week" type="checkbox" value="3"/>周三</td>
                            <td><input name="week" type="checkbox" value="4"/>周四</td>
                            <td><input name="week" type="checkbox" value="5"/>周五</td>
                            <td><input name="week" type="checkbox" value="6"/>周六</td>
                            <td><input name="week" type="checkbox" value="7"/>周日</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="span4" align="left">
                <button class="btn blue"  onclick="addMissionRemind();"><i class="icon-plus"></i>增加</button>
            </div>
        </div>

        <div class="row-fluid">
            <div class="span12">
                <hr style="height:10px;border:none;border-top:1px solid #555555;" />
            </div>
        </div>

        <div class="row-fluid">
            <div class="span4" align="left">
                <div id="taskReminderToolbar" class="btn-group">
                    <button id='taskReminderToolbar_btn_delete' type='button' class='btn blue' style="display: inline;" onclick="javascript:deleteTask();">
                        <span class='glyphicon glyphicon-plus' aria-hidden='true'></span><i class="icon-trash"></i> 删除
                    </button>
                </div>

            </div>
            <div class="span4" align="center">
                <p id = "factFarmTitle" align="center">
                    <font size='4' ><B>${org_name}</B></font>
                </p>
            </div>
            <div class="span4" align="left">

            </div>
        </div>

        <div class="row-fluid">
            <div class="span12" align="left">
                <table id="stockTable"></table>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var isRead="${pd.write_read}";//菜单是否只读
</script>
<!-- #main-content -->
<script type="text/javascript" src="<%=path%>/js/bootbox.min.js"></script>
<script type="text/javascript" src="<%=path%>/framework/table/table.js"></script>
<script type="text/javascript" src="<%=path%>/modules/product/js/missionRemind.js"></script>
<!-- 确认窗口 -->
</body>
</html>
