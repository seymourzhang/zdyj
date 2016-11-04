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
    <link rel="stylesheet" href="<%=path%>/modules/product/css/style.css" media="screen" type="text/css" />


    <script src="<%=path%>/framework/js/bootstrap_table/bootstrap-table.js"></script>
    <link href="<%=path%>/framework/js/bootstrap_table/bootstrap-table.css" rel="stylesheet" />
    <script src="<%=path%>/framework/js/bootstrap_table/locale/bootstrap-table-zh-CN.js"></script>

    <link rel="stylesheet" href="<%=path%>/framework/js/bootstrap_editable/1.5.1/css/bootstrap-editable.css">
    <script src="<%=path%>/framework/js/bootstrap_editable/1.5.1/js/bootstrap-editable.js"></script>
    <script src="<%=path%>/framework/js/bootstrap_table/extensions/editable/bootstrap-table-editable.js"></script>
    <script type="text/javascript" src="<%=path%>/framework/table/table.js"></script>
    <script type="text/javascript" src="<%=path%>/modules/product/js/missionRemind.js"></script>



</head>
<script>
    jQuery(document).ready(function () {
        checkDate($("#wd")[0]);
        initTable("stock", getStockTableColumns(), ${tasks});
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
<%--<div style="text-align:center;clear:both;">
    <script src="/gg_bd_ad_720x90.js" type="text/javascript"></script>
    <script src="/follow.js" type="text/javascript"></script>
</div>--%>
   <div class="panels">
        <table class="panel">
            <tr>
                <td style="width: 50px;"><p style="width: 70px">任务类别</p></td>
                <td>
                    <select id="taskType" class="select1" style="margin: 0px;" onchange="queryNext();">
                        <c:if test="${!empty task_type}">
                            <c:forEach var="type" items="${task_type}">
                                <option value="${type.task_type}">${type.code_name}</option>
                            </c:forEach>
                        </c:if>
                    </select>
                </td>
                <td>
                    <select id="wd" class="select2" style="width: 80px;margin: 0px;" onchange="checkDate(this);">
                        <c:if test="${!empty date_type}">
                            <c:forEach var="type" items="${date_type}">
                                <option value="${type.biz_code}">${type.code_name}</option>
                            </c:forEach>
                        </c:if>
                    </select>
                </td>
                <td>
                    <input id="dateValues" class="select1" style="position: relative;left: 20px;height: 30px;width: 250px;"/>
                </td>
                <td>
                    <button style="position: relative; left: 100px;height: 30px;width: 80px;" class="btn green"  onclick="addMissionRemind();">增加</button>
                </td>
            </tr>
            <tr>
                <td><p style="width: 50px;">任务项</p></td>
                <td>
                    <select id="taskCode" class="select1" style="margin: 0px;">
                        <c:if test="${!empty task_code}">
                            <c:forEach var="code" items="${task_code}">
                                <option value="${code.task_id}">${code.task_name}</option>
                            </c:forEach>
                        </c:if>
                    </select>
                </td>
                <td><p style="position:relative; top: 5px; left: 50px;">提醒日期</p></td>
                <td>
                    <div id="weeks">
                        <table style="position: relative;left: 20px;">
                            <tr>
                                <td><input name="week" type="checkbox" value="1"/></td><td><p style="width: 40px;margin: 0px;">周一</p></td>
                                <td><input name="week" type="checkbox" value="2"/></td><td><p style="width: 40px;margin: 0px;">周二</p></td>
                                <td><input name="week" type="checkbox" value="3"/></td><td><p style="width: 40px;margin: 0px;">周三</p></td>
                                <td><input name="week" type="checkbox" value="4"/></td><td><p style="width: 40px;margin: 0px;">周四</p></td>
                            </tr>
                            <tr>
                                <td><input name="week" type="checkbox" value="5"/></td><td><p style="width: 40px;margin: 0px;">周五</p></td>
                                <td><input name="week" type="checkbox" value="6"/></td><td><p style="width: 40px;margin: 0px;">周六</p></td>
                                <td><input name="week" type="checkbox" value="7"/></td><td><p style="width: 40px;margin: 0px;">周日</p></td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td>
                    <button style="position: relative; left: 100px; height: 30px;width: 80px;" class="btn green" onclick="deleteTask();">删除</button>
                </td>
            </tr>
        </table>
       <hr style="width: 100%;background: #848484;height: 5px;position: relative;top: 30px;">

       <label style="position: relative;top: 30px;text-align: center;height: 20px; width: 84%; font-size: 30px;background: #FFFFFF;"><p>${org_name}</p></label>

       <div style="position: relative;top: 50px;overflow-x: auto; overflow-y: auto; height: 76%; width:99%;">

           <table id="stockTable"></table>

           <%--<table id="formData" style="text-align: center;width: 100%;height: 100%;" border="1">
               <tr style="background: #04488a; color: #FFFFFF;text-align: center;">
                   <td><p>选择</p></td>
                   <td><p>编号</p></td>
                   <td><p>任务类别</p></td>
                   <td><p>任务项</p></td>
                   <td><p>时间单位</p></td>
                   <td><p>循环周期</p></td>
               </tr>
               <c:forEach var="task" items="${tasks}">
               <tr name="taskId">
                   <td><input type="checkbox" value="${task.id}"/></td>
                   <td><p>${task.id}</p></td>
                   <td><p>${task.taskType}</p></td>
                   <td><p>${task.task_name}</p></td>
                   <td><p>${task.dateType}</p></td>
                   <td><p>${task.date_values}</p></td>
               </tr>
               </c:forEach>
           </table>--%>
       </div>

</div>


</body>

</html>