/**
 * Created by LeLe on 11/2/2016.
 */
//创建批次表格
function editBatchColumns(){
    var dataColumns = [{field: "operation_date",
        title: "日期",
        width: '15%'
    }, {field: "houseId",
        title: "调出栋ID",
        visible: false
    }, {
        field: "house",
        title: "调出栋",
        width: '5%'
    }, {
        field: "houseIdTarget",
        title: "调入至ID",
        visible: false
    }, {
        field: "houseTarget",
        title: "调入至",
        width: '5%'
    }, {
        field: "female_count_target",
        title: "母鸡数",
        width: '15%'
    }, {
        field: "male_count_target",
        title: "公鸡数",
        width: '15%'
    }, {
        field: "bak",
        title: "备注",
        width: '45%'
    }];
    return dataColumns;
};

//显示调入至下拉框
function showHouseTarget(tabName, houseList){
    document.getElementById(tabName + 'HouseSelectTarget').options.length = 0;
    for(var key in houseList){
        document.getElementById(tabName + 'HouseSelectTarget').add(new Option(houseList[key].house_name,houseList[key].house_code));
    }
}

//获取栋舍id与名称
function getHouseTarget(){
    var rt = new Array();
    $.ajax({
        type: "post",
        url: path + "/org/getOrgByPid",
        data: {
            parent_id: objBatch.farm_id
        },
        dataType: "json",
        success: function (result) {
            dataList = eval(result.obj);
            var rt = new Array();
            for(var key in dataList){
                var tmp ={house_code:dataList[key].id, house_name: dataList[key].name_cn};
                rt.push(tmp);
            }
            showHouseTarget(currTabName, rt);
        }
    });
    return rt;
};

//重置创建批次UI
function clearEditBatchUI(){
    document.getElementById(currTabName + "FemaleNum").value = "";
    document.getElementById(currTabName + "MaleNum").value = "";
    document.getElementById(currTabName + "Remark").value = "";
}

//检查变量
function checkVarEditBatch(objBatch, dataList){
    objBatch.resultFlag = true;
    objBatch.resultMsg = "检测通过";

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

    if(objBatch.house_code == objBatch.house_code_target){
        objBatch.resultFlag = false;
        objBatch.resultMsg = "不能同一栋舍内调出调入，请重新选择栋舍!";
    }

    layer.msg(objBatch.resultMsg, {
        skin: 'layui-layer-lan'
        , closeBtn: 0
        , shift: 4 //动画类型
    });
}


//修改批次
function saveEditBatchData(objBatch){
    objBatch.resultFlag = true;
    objBatch.resultMsg = "修改批次成功!";
    $.ajax({
        type: "post",
        async:false,
        url: path + "/batch/saveEditBatchData",
        data: {house_code: objBatch.house_code
            , house_name: objBatch.house_name
            , house_code_target: objBatch.house_code_target
            , house_name_target: objBatch.house_name_target
            , farm_id: objBatch.farm_id
            , operation_date: objBatch.operation_date
            , male_count: objBatch.male_count
            , female_count: objBatch.female_count
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