/**
 * Created by LeLe on 10/25/2016.
 */
var tabs = {"进鸡":"createBatch", "调鸡":"editBatch", "出栏":"overBatch"};
var currTabName = tabs.进鸡;
var showFunctionBarflag=null;
var pSize =null;

var objBatch = new Object();
function initObjBatch(){
    objBatch.batch_no = "";
    objBatch.farm_id = "";
    objBatch.display_farm_name = "";
    objBatch.farm_name = "";
    objBatch.house_code = "";
    objBatch.house_name = "";
    objBatch.house_type = "";
    objBatch.house_code_target = "";
    objBatch.house_name_target = "";
    objBatch.operation_date = "";
    objBatch.grow_age = "";
    objBatch.male_weight = "";
    objBatch.male_count = "";
    objBatch.female_weight = "";
    objBatch.variety_id = "";
    objBatch.variety = "";
    objBatch.corporation_id = "";
    objBatch.corporation = "";
    objBatch.bak = "";
    objBatch.jsonData = [];
    objBatch.resultFlag = false;
    objBatch.resultMsg = "";
    objBatch.house_type = 0;
    objBatch.weed_out_total_weight = "";
    objBatch.weed_out_total_count = "";
    objBatch.weed_out_avg_price = "";
    objBatch.feed_type = "";
};

$(document).ready(function(){ 
    reFlushData(currTabName);
    
    $("#createBatchGrowDay").focus(function(){ 
        var createBatchGrowDay_txt = $(this).val(); 
        if(createBatchGrowDay_txt == this.defaultValue){ 
          $(this).val(""); 
        } 
      }); 
      $("#createBatchGrowDay").blur(function(){ 
        var createBatchGrowDay_txt = $(this).val(); 
        if (createBatchGrowDay_txt == "") { 
          $(this).val(this.defaultValue); 
        } 
      }); 
      
});

//切换标签页事件处理
$(function(){
    $('a[data-toggle="tab"]').on('shown', function (e) {
        currTabName = tabs[$(e.target).text()];
        reFlushData(currTabName);
    });
});

//显示界面
function showTab(tabName, dataList,pd){
    initObjBatch(); //初始化对象
    showFarm(tabName, pd.farm_name); //显示农场名称
    objBatch.farm_id = pd.farm_id;
    objBatch.farm_name = pd.farm_name;
    showHouse(tabName, getHouse(pd.farm_id)); //显示栋舍下拉框
    initDatepicker(tabName); //初始化日期控件

    if(tabName == tabs.进鸡){
    	objBatch.feed_type = pd.feed_type;
        showVariety(tabName, getVariety()); //显示品种下拉框
    }
    if(tabName == tabs.调鸡){
        showHouseTarget(tabName, getHouseTarget(pd.farm_id)); //显示调入至下拉框
    }
    if(tabName == tabs.出栏){
        getOtherVar(dataList);
        // showWeedOut(tabName, getHouseFlag());
    }
    createTable(tabName,dataList); //创建表格
    reflushTable(tabName, dataList); //刷新表格数据
};

//创建表格
function createTable(tabName,dataList){
    initTable(tabName, createTableColumns(tabName,dataList), objBatch.jsonData);
};

//创建表格列
function createTableColumns(tabName,dataList){
    var columns;
    if(tabName == tabs.进鸡){
        columns = createBatchColumns();
    }
    if(tabName == tabs.调鸡){
        columns = editBatchColumns();
    }
    if(tabName == tabs.出栏){
        columns = overBatchColumns(dataList);
    }
    return columns;
};

//刷新表格数据
function reflushTable(tabName, dataList){
    objBatch.jsonData = dataList;
    loadTableData(tabName, objBatch.jsonData);
};

//初始化日期控件
function initDatepicker(tabName){
    $("." + tabName + "DatePicker").datepicker({
        language : 'zh-CN',
        autoclose : true,
        todayHighlight : true
    });
    $("." + tabName + "DatePicker").datepicker('setDate', new Date());
};

//创建批次
function saveData(){
    if(checkRights()){
        if(currTabName == tabs.进鸡){
            objBatch.batch_no = document.getElementById(currTabName + "No").value;
            objBatch.variety_id = document.getElementById(currTabName + "GoodSelect").value;
            objBatch.variety = $("#" + currTabName + "GoodSelect option:selected").text();
            // $("#goodSelect").val(); //获取选中记录的value值
            // $("#goodSelect option:selected").text(); //获取选中记录的text值
            objBatch.corporation_id = document.getElementById(currTabName + "CorporationSelect").value;
            objBatch.corporation = $("#" + currTabName + "CorporationSelect option:selected").text();
            objBatch.grow_age = document.getElementById(currTabName + "GrowDay").value;
            objBatch.operation_date = document.getElementById(currTabName + "QueryTime").value;
            objBatch.house_code = document.getElementById(currTabName + "HouseSelect").value;
            objBatch.house_name = $("#" + currTabName + "HouseSelect option:selected").text();
            objBatch.female_count = document.getElementById(currTabName + "FemaleNum").value;
            objBatch.male_count = document.getElementById(currTabName + "MaleNum").value;
            objBatch.bak = document.getElementById(currTabName + "Remark").value;
            checkVarCreateBatch(objBatch, $('#' + currTabName + 'Table').bootstrapTable('getData'));
            if(objBatch.resultFlag){
                checkConfirm(objBatch);
            }
        }
        if(currTabName == tabs.调鸡){
            objBatch.operation_date = document.getElementById(currTabName + "QueryTime").value;
            objBatch.house_code = document.getElementById(currTabName + "HouseSelect").value;
            objBatch.house_name = $("#" + currTabName + "HouseSelect option:selected").text();
            objBatch.house_code_target = document.getElementById(currTabName + "HouseSelectTarget").value;
            objBatch.house_name_target = $("#" + currTabName + "HouseSelectTarget option:selected").text();
            objBatch.female_count = document.getElementById(currTabName + "FemaleNum").value;
            objBatch.male_count = document.getElementById(currTabName + "MaleNum").value;
            objBatch.bak = document.getElementById(currTabName + "Remark").value;
            checkVarEditBatch(objBatch, $('#' + currTabName + 'Table').bootstrapTable('getData'));
            if(objBatch.resultFlag){
                checkConfirm(objBatch);
            }
        }
        if(currTabName == tabs.出栏){
            objBatch.operation_date = document.getElementById(currTabName + "QueryTime").value;
            objBatch.house_code = document.getElementById(currTabName + "HouseSelect").value;
            objBatch.house_name = $("#" + currTabName + "HouseSelect option:selected").text();
            objBatch.female_count = document.getElementById(currTabName + "FemaleNum").value;
            objBatch.male_count = document.getElementById(currTabName + "MaleNum").value;
            objBatch.female_weight = document.getElementById(currTabName + "FemaleAvgWeight").value;
            objBatch.male_weight = document.getElementById(currTabName + "MaleAvgWeight").value;
            objBatch.bak = document.getElementById(currTabName + "Remark").value;
            objBatch.weed_out_total_weight = document.getElementById(currTabName + "SumWeight").value;
            objBatch.weed_out_total_count = document.getElementById(currTabName + "SumNum").value;
            objBatch.weed_out_avg_price = document.getElementById(currTabName + "AvgPrice").value;
            getBatchNo(currTabName);
            checkVarOverBatch(objBatch, $('#' + currTabName + 'Table').bootstrapTable('getData'));
            if(objBatch.resultFlag){
                checkConfirm(objBatch);
            }
        }
    }
};

//显示农场名称
function showFarm(tabName, farmName){
    if(currTabName == tabs.进鸡){
        document.getElementById(tabName + "FarmTitle").innerHTML= "<div class='font s18 bold'>" + farmName + "进鸡记录</div>";
	}else if(currTabName == tabs.调鸡){
		document.getElementById(tabName + "FarmTitle").innerHTML= "<div class='font s18 bold'>" + farmName + "调鸡记录</div>";
	}else if(currTabName == tabs.出栏){
		document.getElementById(tabName + "FarmTitle").innerHTML= "<div class='font s18 bold'>" + farmName + "出栏记录</div>";
	}
};

//获取农场id与名称
function getFarm(dataList){
    if(dataList.length > 0){
        objBatch.farm_id = dataList[0].farmId;
        objBatch.farm_name = dataList[0].farmName;
        objBatch.display_farm_name =  "<font size='4' ><B>" + objBatch.farm_name +"</B></font>";
    }
    return objBatch.display_farm_name;
}

//显示栋舍下拉框
function showHouse(tabName, houseList){
    document.getElementById(tabName + 'HouseSelect').options.length = 0;
    for(var key in houseList){
        document.getElementById(tabName + 'HouseSelect').add(new Option(houseList[key].house_name,houseList[key].house_code));
    }
    getCount();
};

//获取栋舍id与名称
function getHouse(farm_id){
    var rt = new Array();
    $.ajax({
        type: "post",
        url: path + "/org/getOrgByPid",
        data: {
            parent_id: farm_id
        },
        dataType: "json",
        success: function (result) {
            dataList = eval(result.obj);
            var rt = new Array();
            var houseType = "0";
            for(var key in dataList){
                var tmp ={house_code:dataList[key].id, house_name: dataList[key].name_cn, house_type:dataList[key].house_type };
                houseType = dataList[key].house_type;
                rt.push(tmp);
            }
            showHouse(currTabName, rt);

            if(currTabName == tabs.出栏 && houseType =="2"){
                // document.getElementById("overBatchFemaleAvgWeight").disabled=true;
                // document.getElementById("overBatchMaleAvgWeight").disabled=true;
                document.getElementById("cl3").style.display = "block";
                document.getElementById("cl4").style.display = "block";
                document.getElementById("overBatchBtnSaveY").style.display = "none";
                showWeedOut(currTabName,false);
            }
            // this.objBatch.house_type = houseType;
        }
    });
    return rt;
};

//检查权限
function checkRights(){
    if(isRead==0){
        layer.alert('无权限，请联系管理员!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return false;
    } else {
        return true;
    };
};

//刷新数据
function reFlushData(tabName){
    var dataList = [];
    var url = "/batch/getCreateBatchData";
    if(tabName == tabs.进鸡){
//        clearCreateBatchUI(tabName);
        url = "/batch/getCreateBatchData";
    }
    if(tabName == tabs.调鸡){
//        clearEditBatchUI(tabName);
        url = "/batch/getEditBatchData";
    }
    if(tabName == tabs.出栏){
//        clearOverBatchUI(tabName);
        url = "/batch/getOverBatchData";
    }
    $.ajax({
        type: "post",
        url: path + url,
        data: {},
        dataType: "json",
        success: function (result) {
            dataList = eval(result.obj);
            pd = eval(result.obj1);
            hiddenC(dataList.length,$("#house_length").val(),tabName);
            showTab(tabName, dataList,pd);
        }
    });
}

function hiddenC(length,house_length, currTabName){
    if(currTabName == tabs.进鸡){
        if(length==house_length){
            document.getElementById("jj1").style.display="none";
            document.getElementById("jj2").style.display="none";
            document.getElementById("jj3").style.display="none";
            document.getElementById("toolbarCreateBatch").style.display="none";
            document.getElementById("toolbarEditBatch").style.display="block";
            document.getElementById("toolbarOverBatch").style.display="block";
            // document.getElementById("jj4").style.display="none";
            //    	document.getElementById("tj1").style.display="none";
            //    	document.getElementById("tj2").style.display="none";
            //    	document.getElementById("tj3").style.display="none";
            //    	document.getElementById("cl1").style.display="none";
            //    	document.getElementById("cl2").style.display="none";
            //    	document.getElementById("cl3").style.display="none";
            //    	document.getElementById("cl4").style.display="none";
            //    	document.getElementById("cl5").style.display="none";
        }else{
            document.getElementById("jj1").style.display="inline";
            document.getElementById("jj2").style.display="inline";
            document.getElementById("jj3").style.display="inline";
            document.getElementById("toolbarCreateBatch").style.display="block";
            if(length==0){
                document.getElementById("toolbarEditBatch").style.display="none";
                document.getElementById("toolbarOverBatch").style.display="none";
            } else{
                document.getElementById("toolbarEditBatch").style.display="block";
                document.getElementById("toolbarOverBatch").style.display="block";
            }

            // document.getElementById("jj4").style.display="inline";
            //    	document.getElementById("tj1").style.display="inline";
            //    	document.getElementById("tj2").style.display="inline";
            //    	document.getElementById("tj3").style.display="inline";
            //    	document.getElementById("cl1").style.display="inline";
            //    	document.getElementById("cl2").style.display="inline";
            //    	document.getElementById("cl3").style.display="inline";
            //    	document.getElementById("cl4").style.display="inline";
            //    	document.getElementById("cl5").style.display="inline";
        }
    }

    var createBatchCount = $("#createBatchTable").bootstrapTable("getData").length;


    if(currTabName == tabs.出栏){
        if(length==house_length || createBatchCount==0){
            document.getElementById("jj1").style.display="inline";
            document.getElementById("jj2").style.display="inline";
            document.getElementById("jj3").style.display="inline";
            document.getElementById("toolbarCreateBatch").style.display="block";
            document.getElementById("toolbarEditBatch").style.display="none";
            document.getElementById("toolbarOverBatch").style.display="none";
        }else{
            document.getElementById("jj1").style.display="none";
            document.getElementById("jj2").style.display="none";
            document.getElementById("jj3").style.display="none";
            document.getElementById("toolbarCreateBatch").style.display="none";
            document.getElementById("toolbarEditBatch").style.display="block";
            document.getElementById("toolbarOverBatch").style.display="block";

        }
    }

}

//检查是否确认
function checkConfirm(objBatch){
	var tishi = '是否确认？';
	if(currTabName == tabs.出栏){
		tishi = '出栏后，日报将无法修改，请确认无误后出栏！';
	}
    layer.confirm(tishi, {
        skin: 'layui-layer-lan'
        , closeBtn: 0
        , shift: 4 //动画类型
    }, function ok() {
        if(currTabName == tabs.进鸡){
            objBatch = saveCreateBatchData(objBatch);
        }
        if(currTabName == tabs.调鸡){
            objBatch = saveEditBatchData(objBatch);
        }
        if(currTabName == tabs.出栏){
            objBatch = saveOverBatchData(objBatch);
        }
        if(objBatch.resultFlag){
            reFlushData(currTabName);
        }
        layer.msg(objBatch.resultMsg);
    });
};

//获取指定栋舍的当前库存量
function getCount(){	
	$.ajax({
        type: "post",
        url: path + "/batch/getCount",
        data: {house_code:document.getElementById(currTabName + "HouseSelect").value,farm_id:objBatch.farm_id},
        dataType: "json",
        success: function (result) {
            dataList = eval(result.obj);
            if(currTabName == tabs.调鸡){
            	if(dataList.length==0){
                	document.getElementById("currStock1").value = 0;
                    document.getElementById("currStock2").value = 0;
                }else{
                document.getElementById("currStock1").value = dataList[0].female_count;
                document.getElementById("currStock2").value = dataList[0].male_count;
                }
            }
            if(currTabName == tabs.出栏){
            	if(dataList.length==0){
                	document.getElementById("overBatchFemaleNum").value = 0;
                    document.getElementById("overBatchMaleNum").value = 0;
                }else{
                document.getElementById("overBatchFemaleNum").value = dataList[0].female_count;
                document.getElementById("overBatchMaleNum").value = dataList[0].male_count;
                }
            	getOverBatchAge();
            }
            
        }
    });
}

//获取指定栋舍的出栏日龄
function getOverBatchAge(){
    var houseCode = document.getElementById(currTabName + "HouseSelect").value;
    var operationDate = document.getElementById(currTabName + "QueryTime").value;
    if(null != houseCode && "" != houseCode && null != operationDate && "" != operationDate){
        $.ajax({
            type: "post",
            url: path + "/batch/getOverBatchAge",
            data: {house_code:document.getElementById(currTabName + "HouseSelect").value,operation_date:document.getElementById(currTabName + "QueryTime").value},
            dataType: "json",
            success: function (result) {
                dataList = eval(result.obj);
                var currDate = getNowFormatDate();
                if(document.getElementById(currTabName + "QueryTime").value >currDate){
                    document.getElementById("overBatchQueryTime").value = currDate;
                	layer.msg("出栏日不可选大于今天的日期！");
                	return;
                }
                if(dataList.length==0 && result.msg !=0){
                    document.getElementById("overBatchAge").value = "";
                     document.getElementById("overBatchQueryTime").value = currDate;
                    // var overBatchFemaleNum = $("#overBatchFemaleNum").val();
                    // if(parseInt(overBatchFemaleNum)!=0){
                    // getOverBatchAge();
                    // document.getElementById("overBatchQueryTime").value = "";
                        layer.msg("出栏日设置过大，请重新选择出栏日!");
                        return;
                    // }
                }else{
                    if(dataList.length!=0){
                        document.getElementById("overBatchAge").value = dataList[0].age;
                    }
                }
            }
        });
    }
}

//获取总金额
function getOverBatchAvgPriceSum(){	
	var num1,num2;
	num1 = $("#overBatchSumWeight").val();
	num2 = $("#overBatchAvgPrice").val();
	document.getElementById("overBatchAvgPriceSum").value = num1 * num2;
}

//获取当前日期
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
//    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
//            + " " + date.getHours() + seperator2 + date.getMinutes()
//            + seperator2 + date.getSeconds();
    return currentdate;
}
