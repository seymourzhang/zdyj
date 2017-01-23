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
<!DOCTYPE html>
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
        'use strict';
        var url = "<%=path%>/breed/newUpload";
        $('#fileupload').fileupload({
            url: url,
            autoUpload: true,
            done: function (e, data) {
                var json = eval('(' + data.result + ')');
                if (json.msg == "1") {
                    $.each(data.files, function (index, file) {
                        $("#files > p").remove();
                        $('<p/>').text(file.name).appendTo('#files');
                    });
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css(
                            'width',
                            progress + '%'
                    );
                } else {
                    $("#files > p").remove();
                    $('#progress .progress-bar').css(
                            'width',
                            0 + '%'
                    );
                    layer.alert(json.msg, {
                        skin: 'layui-layer-lan'
                        , closeBtn: 0
                        , shift: 4 //动画类型
                    });
                    return;
                }
            },
            fail:function (e, data) {
                console.log(data);
            }
        });
    });
    function uploadSubm() {
        var tips = document.getElementById("tips").value;
        var fileName = $("#files > p")[0].textContent;
        if ($("#files > p").isEmpty) {
            layer.alert('请上传文件！', {
                skin: 'layui-layer-lan'
                , closeBtn: 0
                , shift: 4 //动画类型
            })
            return;
        } else {
            $.ajax({
                url: path + "/breed/saveTips",
                data: {"bak": tips, "file_name": fileName, "ISENABLED": "1"},
                dataType: "json",
                success: function (result) {
                    var list = result.obj;
                    for (var i = 0; i < list.length; ++i) {
                        var fileName = list[i]["file_name"];
                        fileName = fileName.replace(/\\/g, "");
                        list[i]["file_name"] = fileName;
                    }
                    layer.msg('上传成功', function () {
//                    parent.parent.document.getElementById("stockTable").bootstrapTable("load", list);
                        parent.reflush(list);
                        parent.layer.closeAll();
                    });
                },
                error: function (result) {
                    console.info("保存失败！");
                }
            })
        }
    }
    function uploadCanc() {
        parent.layer.closeAll();
    }
</script>
<body>
    <span class="btn btn-success fileinput-button" style="left: 460px; height: 35px;top: 20px">
            <span>浏览</span>
        <!-- The file input field used as target for the file upload widget -->
            <input id="fileupload" type="file" name="eFiles" multiple>
    </span>

    <div id="files" class="files" style="position: absolute;top: 28px;width: 513px;text-align: center;margin: 0 0 0px"></div>
    <div id="progress" class="progress" style="position: relative; height: 5px; width: 509px; left: 5px; top: 20px;">
        <div class="progress-bar progress-bar-success"></div>
    </div>
    <!-- The container for the uploaded files -->

    <div class="control-group">
        <label class="control-label" style="width: 100px; left: 5px; position: relative;top: 45px;">备注:</label>
        <div class="controls" style="margin-left: 45px;position: relative;top: 20px;">
            <input id="tips" type="text" style="width: 460px; margin-bottom: 0px" name="user_code" value="">
        </div>
    </div>

    <div class="form-actions" style="position: relative; padding-left: 120px; float: left; margin-bottom: 0px;margin-top: 0px;top: 20px;">
        <button type="button" class="btn blue" onclick="uploadSubm()"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" class="btn" style="position: relative; left: 60px;" onclick="uploadCanc()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>
    </div>

</body>
</html>
