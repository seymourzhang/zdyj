/**
 * Created by LeLe on 11/10/2016.
 */
var urlPath = "../../../fr/ReportServer?reportlet=";
// var urlPath = "http://localhost:8080/fr/ReportServer?reportlet=";
var urlParam = "&farm_id=";
var currTabId = "tab_1";
var currFrameId = "iframe_" + currTabId;
var tabList = {};
var frameList = {};
var farmList = [];
var currFarmId = "";
var path = "";
var userId = "";


//初始化
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
            farmList = result.obj;
            divStr += "<div class='span12' align='left'>";
            for(var farm in farmList){
                divStr += "<a id='btn_" + i + "' value = '" + farmList[farm].id + "' href='javascript:;' class='btn blue' onclick='openUrl(" + farmList[farm].id + ");'></i>" + farmList[farm].name_cn + "</a>&nbsp;&nbsp;";
                i+=1;
            }
            divStr += "</div>";
            document.getElementById("toolBarFarm").innerHTML = divStr;
        }
    });
};

//打开url
function openUrl(farmId){
    // alert($("#createBatchBtnSave").attr("value"));
    currFarmId = farmId ;
    openUrlByFramId(frameList[currFrameId], farmId);
};

//通过farm id打开url
function openUrlByFramId(reportName, paramValue){
    openPath = urlPath + path.replace("/","") + "/" + reportName + urlParam + paramValue ;
    document.getElementById(currFrameId).src = openPath;
};



//切换标签页事件处理
$(function(){
    $('a[data-toggle="tab"]').on('shown', function (e) {
        currTabId = tabList[$(e.target).text()];
        currFrameId = "iframe_" + currTabId;
        openUrl(currFarmId);
    });
});