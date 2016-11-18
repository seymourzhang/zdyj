/**
 * Created by LeLe on 11/10/2016.
 */
var urlPath = "../../../fr/ReportServer?reportlet=";
// var urlPath = "http://localhost:8080/fr/ReportServer?reportlet=";
var urlParam = "&org_id=";
var currTabId = "tab_1";
var currFrameId = "iframe_" + currTabId;
var tabList = {};
var frameList = {};
var orgList = [];
var currOrgId = "";
var path = "";
var userId = "";

//获取对象实例
function getInstance(tabList, frameList){
    this.tabList = tabList;
    this.frameList = frameList;
    path = document.getElementById("toolBarFarmParmPath").value;
    userId = document.getElementById("toolBarFarmParmUserId").value;
    return this;
};

//初始化农场工具栏
function initToolBarFarm(){
    // farmList = [{farmId: 2, farmName: "新疆蛋种鸡育成场"},{farmId: 3, farmName: "新疆产蛋一场"}];
    var divStr = "";
    var i =1;

    $.ajax({
        type : "post",
        url : path + "/org/getOrgByUser",
        data : {},
        dataType : "json",
        success : function(result) {
            orgList = result.obj;
            if(orgList.length > 0){
                currOrgId = orgList[0].id;
            }
            divStr += "<div class='span12' align='left'>";
            for(var key in orgList){
                divStr += "<a id='btn_" + i + "' value = '" + orgList[key].id + "' href='javascript:;' class='btn blue' onclick='openUrl(" + orgList[key].id + ");'></i>" + orgList[key].name_cn + "</a>&nbsp;&nbsp;";
                i+=1;
            }
            divStr += "</div>";
            document.getElementById("toolBarFarm").innerHTML = divStr;
            openUrl(currOrgId);
        }
    });
};

//打开url
function openUrl(orgId){
    if(orgId != "" && orgId != null){
        currOrgId = orgId ;
        openUrlByFramId(frameList[currFrameId], currOrgId);
    }
};

//通过farm id打开url
function openUrlByFramId(reportName, paramValue){
    openPath = urlPath + path.replace("/","") + "/" + reportName + urlParam + paramValue ;
    document.getElementById(currFrameId).src = openPath;
};



//切换标签页事件处理
$(function(){
    document.documentElement.style.overflowY = 'hidden';
    $('a[data-toggle="tab"]').on('shown', function (e) {
        currTabId = tabList[$(e.target).text()];
        currFrameId = "iframe_" + currTabId;
        openUrl(currOrgId);
    });
});