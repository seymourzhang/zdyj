<%--
  Created by IntelliJ IDEA.
  User: Seymour
  Date: 2016/11/4
  Time: 15:24
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

    <%--<link rel="stylesheet" href="<%=path %>/framework/css/bootstrap.min.css" />--%>
    <link rel="stylesheet" href="<%=path%>/modules/breed/css/bootstrap.min.css">
    <!-- Generic page styles -->
    <link rel="stylesheet" href="<%=path%>/framework/css/style.css">
    <!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
    <link rel="stylesheet" href="<%=path%>/modules/breed/css/jquery.fileupload.css">

    <%--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>--%>
    <%--<!-- The jQuery UI widget factory, can be omitted if jQuery UI is already included -->--%>
    <script src="<%=path%>/framework/jquery/jquery.ui.widget.js"></script>
    <%--<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->--%>
    <script src="<%=path%>/framework/jquery/jquery.iframe-transport.js"></script>
    <!-- The basic File Upload plugin -->
    <script src="<%=path%>/framework/jquery/jquery.fileupload.js"></script>
    <!-- Bootstrap JS is not required, but included for the responsive demo navigation -->
    <script src="<%=path%>/framework/js/bootstrap.min.js"></script>

</head>
<script>
    $(function () {
        'use strict';
        var url = "<%=path%>/breed/saveAttach";
        $('#fileupload').fileupload({
            url: url,
            dataType: 'json',
            done: function (e, data) {
                /*$.each(data.obj, function (index, file) {
                    $('<p/>').text(file.name).appendTo('#files');
                });*/
                if(data.msg == "1") {
                    layer.alert('无权限，请联系管理员!', {
                        skin: 'layui-layer-lan'
                        , closeBtn: 0
                        , shift: 4 //动画类型
                    });
                    return;
                }else{
                    layer.alert(data.msg, {
                        skin: 'layui-layer-lan'
                        ,closeBtn: 0
                        ,shift: 4 //动画类型
                    });
                    return;
                }
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                        'width',
                        progress + '%'
                );
            }
        }).prop('disabled', !$.support.fileInput)
                .parent().addClass($.support.fileInput ? undefined : 'disabled');
    });
</script>
<body>
    <span class="btn btn-success fileinput-button" style="left: 335px; height: 35px;">
            <i class="glyphicon glyphicon-plus"></i>
            <span>上传</span>
        <!-- The file input field used as target for the file upload widget -->
            <input id="fileupload" type="file" name="eFiles" multiple>
    </span>

    <div id="files" class="files"></div>
    <div id="progress" class="progress" style="position: relative; height: 5px; width: 235px; left: 142px;">
        <div class="progress-bar progress-bar-success"></div>
    </div>
    <!-- The container for the uploaded files -->

    <div class="control-group">
        <label class="control-label" style="width: 100px; left: 142px; position: relative;">备注:</label>
        <div class="controls" style="margin-left: 142px;">
            <input type="text" style="width: 264px; height: 100px; margin-bottom: 0px" name="user_code">
        </div>
    </div>

    <div class="form-actions" style="position: relative; padding-left: 180px; float: left; margin-bottom: 0px;">
        <button type="button" class="btn blue" onclick="addUser()"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" class="btn" onclick="closeB()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>
    </div>

</body>
</html>
