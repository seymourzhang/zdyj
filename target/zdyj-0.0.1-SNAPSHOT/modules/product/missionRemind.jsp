<%--
  Created by IntelliJ IDEA.
  User: Seymour
  Date: 2016/10/19
  Time: 16:43
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
</head>
<script>
    jQuery(document).ready(function () {
        checkDate($("#wd")[0]);
        initTableWithToolBar("stock", "taskReminderToolbar", getStockTableColumns(), ${tasks});
    });
    function checkDate(wd) {
        var che = document.getElementsByName("week");
        if (wd.value == '1') {
            for (var i = 0; i < che.length; ++i) {
                che[i].disabled = true;
            }
        } else {
            for (var i = 0; i < che.length; ++i) {
                che[i].disabled = false;
            }
        }
    }
</script>
<body>

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
                <select id="wd" onchange="checkDate(this);" style="width: 80px; height: 30px">
                    <c:if test="${!empty date_type}">
                        <c:forEach var="type" items="${date_type}">
                            <option value="${type.biz_code}">${type.code_name}</option>
                        </c:forEach>
                    </c:if>
                </select>
                <input id="dateValues" style="width: 320px; height: 30px"/>
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
                            <td><input name="week" type="checkbox" value="1"/></td><td><p>周一</p></td>
                            <td><input name="week" type="checkbox" value="2"/></td><td><p>周二</p></td>
                            <td><input name="week" type="checkbox" value="3"/></td><td><p>周三</p></td>
                            <td><input name="week" type="checkbox" value="4"/></td><td><p>周四</p></td>
                            <td><input name="week" type="checkbox" value="5"/></td><td><p>周五</p></td>
                            <td><input name="week" type="checkbox" value="6"/></td><td><p>周六</p></td>
                            <td><input name="week" type="checkbox" value="7"/></td><td><p>周日</p></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="span4" align="left">
                <button class="btn green"  onclick="addMissionRemind();">增加</button>
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
                        <span class='glyphicon glyphicon-plus' aria-hidden='true'></span>删除
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

<script type="text/javascript" src="<%=path%>/framework/table/table.js"></script>
<script type="text/javascript" src="<%=path%>/modules/product/js/missionRemind.js"></script>

</body>

</html>