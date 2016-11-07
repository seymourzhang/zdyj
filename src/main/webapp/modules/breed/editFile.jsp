<%--
  Created by IntelliJ IDEA.
  User: Seymour
  Date: 2016/11/4
  Time: 15:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
    <link rel="stylesheet" href="<%=path%>/modules/breed/css/style.css">
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
        var url = "<%=path%>/breed/newUpload";
        $('#fileupload').fileupload({
            url: url,
            autoUpload: true,
            done: function (e, data) {
                $.each(data.files, function (index, file) {
                    $('<p/>').text(file.name).appendTo('#files');
                });
                if(data.result == "fileuploaddone") {
                }else{
                    layer.alert(data.result, {
                        skin: 'layui-layer-lan'
                        ,closeBtn: 0
                        ,shift: 4 //动画类型
                    });
                    return;
                }
            },
            fail:function (e, data) {
                console.log(data);
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                        'width',
                        progress + '%'
                );
            }
        });
    });
    function uploadSubm(){
        var tips = document.getElementById("tips").value;
        var fileName = $("#files > p")[0].textContent;
        $.ajax({
            url:path + "/breed/saveTips",
            data:{"bak":tips,"file_name":fileName, "ISENABLED":"1"},
            success:function (result) {
                var list = result.obj;
//                parent.$("#stockTable").bootstrapTable("load", list);
                layer.alert('上传成功', {
                    skin: 'layui-layer-lan'
                    , closeBtn: 0
                    , shift: 4 //动画类型
                },function () {
                    parent.layer.closeAll();
                    parent.location.reload();
                });
            }
        })
    }
    function uploadCanc() {
        parent.layer.closeAll();
    }
</script>
<body>
    <span class="btn btn-success fileinput-button" style="left: 335px; height: 35px;">
            <span>上传</span>
        <!-- The file input field used as target for the file upload widget -->
            <input id="fileupload" type="file" name="eFiles" multiple>
    </span>

    <div id="files" class="files" style="position: absolute;left: 142px;top: 0px;width: 200px;"></div>
    <div id="progress" class="progress" style="position: relative; height: 5px; width: 247px; left: 142px;">
        <div class="progress-bar progress-bar-success"></div>
    </div>
    <!-- The container for the uploaded files -->

    <div class="control-group">
        <label class="control-label" style="width: 100px; left: 142px; position: relative;">备注:</label>
        <div class="controls" style="margin-left: 142px;">
            <input id="tips" type="text" style="width: 264px; height: 100px; margin-bottom: 0px" name="user_code" value="">
        </div>
    </div>

    <div class="form-actions" style="position: relative; padding-left: 180px; float: left; margin-bottom: 0px;">
        <button type="button" class="btn blue" onclick="uploadSubm()"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" class="btn" onclick="uploadCanc()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>
    </div>

</body>
</html>
