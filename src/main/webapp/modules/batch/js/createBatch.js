/**
 * Created by LeLe on 11/2/2016.
 */
//创建批次表格
function createBatchColumns(){
    var dataColumns = [{field: "houseId",
                            title: "栋舍ID",
                            visible: false
                        }, {
                            field: "house",
                            title: "栋号",
                            width: '5%'
                        }, {
                            field: "batchId",
                            title: "批次序号",
                            visible: false
                        }, {
                            field: "batchNo",
                            title: "批次号",
                            width: '5%'
                        }, {
                            field: "variety_id",
                            title: "品种ID",
                            visible: false
                        },  {
                            field: "variety",
                            title: "品种",
                            width: '15%'
                        }, {
                            field: "corporation_id",
                            title: "来源ID",
                            visible: false
                        },  {
                            field: "corporation",
                            title: "来源",
                            width: '15%'
                        }, {
                            field: "grow_age",
                            title: "生长日龄",
                            width: '5%'
                        }, {
                            field: "operation_date",
                            title: "进鸡日",
                            width: '10%'
                        }, {
                            field: "female_count",
                            title: "母鸡数",
                            width: '10%'
                        }, {
                            field: "male_count",
                            title: "公鸡数",
                            width: '10%'
                        }, {
                            field: "rate",
                            title: "公母配比",
                            width: '5%'
                        }, {
                            field: "bak",
                            title: "备注",
                            width: '20%'
                        }, {field: "status",
                            title: "状态",
                            visible: false
                        }];
    return dataColumns;
};

//刷新创建批次表格数据
function reflushCreateBatchTable(objBatch){
    objBatch.jsonData=[{houseId:"1", house: "H1",batchId: "20161101F4", batchNo: "F4", variety_id: "1", variety: "战斗机"
        , corporation_id: "1", corporation: "微软", grow_age: "1", operation_date: "2016/11/1"
        , female_count: 10000, male_count: 100, bak: "这是条测试记录"}
                        ,{houseId:"2", house: "H2",batchId: "20161101F2", batchNo: "F2", variety_id: "1", variety: "战斗机"
                        , corporation_id: "1", corporation: "微软", grow_age: "1", operation_date: "2016/11/1"
                        , female_count: 10000, male_count: 100, bak: "这是条测试记录2"}];
};

//显示品种下拉框
function showVariety(tabName, varietyList){
    document.getElementById(tabName + 'GoodSelect').options.length = 0;
    for(var key in varietyList){
        document.getElementById(tabName + 'GoodSelect').add(new Option(varietyList[key].variety,varietyList[key].variety_id));
    }
    showCorporation(tabName, getCorporation(tabName)); //显示来源下拉框
};

//获取品种id与名称
function getVariety(){
    var rt = new Array();
    $.ajax({
        type: "post",
        url: path + "/googs/getGoods",
        data: {
            good_type: 1
        },
        dataType: "json",
        success: function (result) {
            dataList = eval(result.obj);
            var rt = new Array();
            for(var key in dataList){
                var tmp ={variety_id:dataList[key].good_id, variety: dataList[key].good_name};
                rt.push(tmp);
            }
            showVariety(currTabName, rt);
        }
    });
    return rt;
};

//品种选择值变化事件
function changeGoodSelect(){
    showCorporation(currTabName, getCorporation(currTabName));
};

//显示来源下拉框
function showCorporation(tabName, corporationList){
    document.getElementById(tabName + 'CorporationSelect').options.length = 0;
    for(var key in corporationList){
        document.getElementById(tabName + 'CorporationSelect').add(new Option(corporationList[key].corporation,corporationList[key].corporation_id));
    }
};

//获取来源id与名称
function getCorporation(tabName) {
    var rt = new Array();
    if (document.getElementById(tabName + 'GoodSelect').options.length > 0) {
        $.ajax({
            type: "post",
            url: path + "/googs/getCorporation",
            data: {
                good_type: 1,
                good_id : $("#" + tabName + "GoodSelect").val()
            },
            dataType: "json",
            success: function (result) {
                dataList = eval(result.obj);
                var rt = new Array();
                for (var key in dataList) {
                    var tmp = {corporation_id: dataList[key].corporation_id, corporation: dataList[key].corporation};
                    rt.push(tmp);
                }
                showCorporation(currTabName, rt);
            }
        });
        return rt;
    }
};

//检查变量
function checkVarCreateBatch(objBatch, dataList){
    objBatch.resultFlag = true;
    objBatch.resultMsg = "检测通过";

    var test = parseInt(objBatch.grow_age);
    if (isNaN(test))
    {
        objBatch.resultFlag = false;
        objBatch.resultMsg = "生长日龄必须是数字，请重新输入!";
    }

    test = parseInt(objBatch.female_count);
    if (isNaN(test))
    {
        objBatch.resultFlag = false;
        objBatch.resultMsg = "母鸡数必须是数字，请重新输入!";
    }

    test = parseInt(objBatch.male_count);
    if (isNaN(test))
    {
        objBatch.resultFlag = false;
        objBatch.resultMsg = "公鸡数必须是数字，请重新输入!";
    }

    for(var key in dataList){
        if(objBatch.batch_no == '' || objBatch.batch_no == null){
            objBatch.resultFlag = false;
            objBatch.resultMsg = "必须指定批次号，请重新输入!";
        }
        if(typeof dataList[key].batchNo != 'undefined' && dataList[key].batchNo != objBatch.batch_no){
            objBatch.resultFlag = false;
            objBatch.resultMsg = "同一农场内批次号必须相同，请重新输入!";
        }
        if((dataList[key].houseId == objBatch.house_code) && (dataList[key].batchId != '')  && (dataList[key].batchId != null)){
            objBatch.resultFlag = false;
            objBatch.resultMsg = "该栋舍已进鸡，请重新输入!";
        }
    }

    if (objBatch.operation_date == '' || objBatch.operation_date == null)
    {
        objBatch.resultFlag = false;
        objBatch.resultMsg = "必须指定进鸡日，请重新输入!";
    }

    if (objBatch.variety_id == '' || objBatch.variety_id == null)
    {
        objBatch.resultFlag = false;
        objBatch.resultMsg = "必须指定品种，请重新输入!";
    }

    if (objBatch.corporation_id == '' || objBatch.corporation_id == null)
    {
        objBatch.resultFlag = false;
        objBatch.resultMsg = "必须指定来源，请重新输入!";
    }

    layer.msg(objBatch.resultMsg, {
        skin: 'layui-layer-lan'
        , closeBtn: 0
        , shift: 4 //动画类型
    });
}

//创建批次
function saveCreateBatchData(objBatch){
    objBatch.resultFlag = true;
    objBatch.resultMsg = "新建批次成功!";
    $.ajax({
        type: "post",
        async:false,
        url: path + "/batch/saveCreateBatchData",
        data: {batch_no: objBatch.batch_no
            , house_code: objBatch.house_code
            , house_name: objBatch.house_name
            , farm_id: objBatch.farm_id
            , operation_date: objBatch.operation_date
            , grow_age: objBatch.grow_age
            , male_count: objBatch.male_count
            , female_count: objBatch.female_count
            , variety_id: objBatch.variety_id
            , variety: objBatch.variety
            , corporation_id: objBatch.corporation_id
            , corporation: objBatch.corporation
            , bak: objBatch.bak},
        dataType: "json",
        success: function (result) {
            if(!result.success) {
                objBatch.resultFlag = false;
                objBatch.resultMsg = result.msg;
            }
            return objBatch;
        }
    });
    return objBatch;
};

//重置创建批次UI
function clearCreateBatchUI(){
    document.getElementById(currTabName + "No").value = "";
    document.getElementById(currTabName + "GrowDay").value = "";
    document.getElementById(currTabName + "FemaleNum").value = "";
    document.getElementById(currTabName + "MaleNum").value = "";
    document.getElementById(currTabName + "Remark").value = "";
}


