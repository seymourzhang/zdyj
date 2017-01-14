var count0rg;
var num;

jQuery(document).ready(function() {

	$(".date-picker1").datepicker({
		language : 'zh-CN',
		autoclose : true,
		defaultDate : new Date(),
		todayHighlight : true
	});
	$(".date-picker1").datepicker('setDate', new Date());


	 // searchData();
});

function OrgSearch(count0rg,num){
    this.count0rg = count0rg;
    this.num = num;
	searchData();
}

function searchData(){
	alarmType();
	var alarm_type = $("#alarm_type").val();
	var paramValue,data,url;
	if(alarm_type =="1"){
		paramValue = "TemperatureCurve";
		url= path+"/alarmHis/selectAlarmHisByCondition";
		data = [{
			field: 'modify_time',
			title: '最新设置日期'
			},{
			field: 'day_age',
			title: '日龄'
			}, {
			field: 'set_values',
			title: '目标温度'
			}, {
			field: 'high_alarm_values',
			title: '高报温度'
			}, {
			field: 'low_alarm_values',
			title: '低报温度'
			}, {
			    field: 'modify_person',
				title: '最新设置人'
				}];
//		$("#TemperatureCurveTable").css("display", "");
//    	$("#CarbonTable").css("display", "none");
//    	$("#NegativePressureTable").css("display", "none");
//    	$("#BasisTable").css("display", "none");
	}else if(alarm_type =="2"){
		paramValue = "NegativePressure";
		url= path+"/alarmHis/selectAlarmHisByCondition";
		data = [{
			field: 'modify_time',
			title: '最新设置日期'
			},{
			field: 'day_age',
			title: '日龄'
			}, {
			field: 'set_values',
			title: '光照参考值'
			}, {
			field: 'high_alarm_values',
			title: '光照上限值'
			}, {
			field: 'low_alarm_values',
			title: '光照下限值'
			}, {
			field: 'start_time',
			title: '开启时间'
			}, {
			field: 'end_time',
			title: '结束时间'
			}, {
			    field: 'modify_person',
				title: '最新设置人'
				}];
//		$("#TemperatureCurveTable").css("display", "none");
//    	$("#CarbonTable").css("display", "none");
//    	$("#NegativePressureTable").css("display", "");
//    	$("#BasisTable").css("display", "none");
	}else if(alarm_type =="3"){
		paramValue = "Carbon";
		url= path+"/alarmHis/selectAlarmHisByCondition";
		data = [{
			field: 'modify_time',
			title: '最新设置日期'
			},{
			field: 'day_age',
			title: '日龄'
			}, {
			field: 'high_alarm_values',
			title: 'co2报警值'
			}, {
		    field: 'modify_person',
			title: '最新设置人'
			}];
//		$("#TemperatureCurveTable").css("display", "none");
//    	$("#CarbonTable").css("display", "");
//    	$("#NegativePressureTable").css("display", "none");
//    	$("#BasisTable").css("display", "none");
	}else{
		paramValue = "Basis";
		url= path+"/alarmHis/selectHouseAlarmHisByCondition";
		data = [{
			field: 'modify_time',
			title: '设置日期'
			},{
			field: 'alarm_delay',
			title: '报警延时'
			}, {
			field: 'temp_cpsation',
			title: '温度补偿'
			},{
			field: 'temp_cordon',
			title: '警戒温度'
			}, {
			field: 'alarm_way',
			title: '报警方式'
			}, {
			field: 'alarm_probe',
			title: '报警探头'
			}, {
			field: 'point_alarm',
			title: '点温差报警'
			}, {
				field: 'modify_person',
				title: '设置人'
				}];
//		document.getElementById("TemperatureCurveTable").style.display="none";
//		document.getElementById("CarbonTable").style.display="none";
//		document.getElementById("NegativePressureTable").style.display="none";
//		document.getElementById("BasisTable").style.display="";
	}

	// $("#"+paramValue+"Table").bootstrapTable({
	// 	url: url,
	// 	method: 'get',
	// 	detailView: true,//父子表
	// 	//sidePagination: "server",
	// 	pageSize: 10,
	// 	pageList: [10, 25],
	// 	columns: data,
	// 	//注册加载子表的事件。注意下这里的三个参数！
	// 	onExpandRow: function (index, row, $detail) {
	// 		InitSubTable(index, row, $detail);
	// 	}
	// 	});
    $.ajax({
        // async: true,
        url: url,
        data: {"farmId":$("#orgId" + (count0rg - 1)).val().split(",")[1],
        	   "houseId":$("#orgId" + count0rg).val().split(",")[1],
        	   "alarm_type":alarm_type,
        	   "start_date":$("#start_date").val(),
        	   "end_date":$("#end_date").val()},
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {     
                var obj = result.obj;
                if(alarm_type =="4"){
                	initTable(paramValue, data, []);
                }else{
                	initTableWithSubTable(paramValue, data, [], InitSubTable);
                }
                
                if(null != obj) {
                    var dataJosn = $.parseJSON(JSON.stringify(obj));
                    $("#"+paramValue+"Table").bootstrapTable('load',dataJosn);
                } 
        }
    });
    
//    $("#" + paramValue + "Table").bootstrapTable("load",[{day_age: 1, set_values: 10},{day_age: 2, set_values: 10},{day_age: 3, set_values: 13}]);

}

//初始化子表格(无线循环)
InitSubTable = function (index, row, $detail) {
	var alarm_type = $("#alarm_type").val();
	var data,url;
	if(alarm_type =="1"){
		url= path+"/alarmHis/selectAlarmHisDetailByCondition";
		data = [{
			checkbox: true
		},{
			field: 'modify_time',
			title: '设置日期'
			},{
			field: 'set_values',
			title: '目标温度'
			}, {
			field: 'high_alarm_values',
			title: '高报温度'
			}, {
			field: 'low_alarm_values',
			title: '低报温度'
			}, {
			field: 'modify_person',
			title: '设置人'
			}];
	}else if(alarm_type =="2"){
		url= path+"/alarmHis/selectAlarmHisDetailByCondition";
		data = [{
			checkbox: true
		},{
			field: 'modify_time',
			title: '设置日期'
			},{
			field: 'set_values',
			title: '光照参考值'
			}, {
			field: 'high_alarm_values',
			title: '光照上限值'
			}, {
			field: 'low_alarm_values',
			title: '光照下限值'
			}, {
			field: 'start_time',
			title: '开启时间'
			}, {
			field: 'end_time',
			title: '结束时间'
			}, {
			field: 'modify_person',
			title: '设置人'
			}];
	}else if(alarm_type =="3"){
		url= path+"/alarmHis/selectAlarmHisDetailByCondition";
		data = [{
			checkbox: true
		},{
			field: 'modify_time',
			title: '设置日期'
			},{
			field: 'high_alarm_values',
			title: 'co2报警值'
			}, {
			field: 'modify_person',
			title: '设置人'
			}];
	}else{
		url= path+"/alarmHis/selectHouseAlarmHisDetailByCondition";
		data = [{
			checkbox: true
		},{
			field: 'modify_time',
			title: '设置日期'
			},{
			field: 'alarm_delay',
			title: '报警延时'
			}, {
			field: 'temp_cpsation',
			title: '温度补偿'
			},{
			field: 'temp_cordon',
			title: '警戒温度'
			}, {
			field: 'alarm_way',
			title: '报警方式'
			}, {
			field: 'alarm_probe',
			title: '报警探头'
			}, {
			field: 'point_alarm',
			title: '点温差报警'
			}, {
			field: 'modify_person',
			title: '设置人'
			}];
	}
var parentid = row.day_age;
var cur_table = $detail.html('<table></table>').find('table');
$(cur_table).bootstrapTable({
//url: url,
method: 'get',
queryParams: { strParentID: parentid },
ajaxOptions: { strParentID: parentid },
clickToSelect: true,
detailView: false,//父子表
uniqueId: "MENU_ID",
pageSize: 10,
pageList: [10, 25],
columns: data,
//无线循环取子表，直到子表里面没有记录
onExpandRow: function (index, row, $Subdetail) {
	InitSubTable (index, row, $Subdetail);
}
});

$.ajax({
    // async: true,
    url: url,
    data: {"farmId":$("#orgId" + (count0rg - 1)).val().split(",")[1],
    	   "houseId":$("#orgId" + count0rg).val().split(",")[1],
    	   "alarm_type":alarm_type,
    	   "day_age":parentid,
    	   "start_date":$("#start_date").val(),
    	   "end_date":$("#end_date").val()},
    type : "POST",
    dataType: "json",
    cache: false,
    // timeout:50000,
    success: function(result) {     
            var obj = result.obj;
//            initTable(cur_table, data, []);
//            initTableWithSubTable(paramValue, data, [], InitSubTable);
            if(null != obj) {
                var dataJosn = $.parseJSON(JSON.stringify(obj));
                $(cur_table).bootstrapTable('load',dataJosn);
            } 
            
    }
});
//    $(cur_table).bootstrapTable("load",[{day_age: 1, set_values: 10},{day_age: 2, set_values: 10},{day_age: 3, set_values: 13}]);

};



function alarmType(){
	var alarm_type = $("#alarm_type").val();
	if(alarm_type =="1"){
		document.getElementById("TemperatureCurveFrame").style.display="";
		document.getElementById("CarbonFrame").style.display="none";
		document.getElementById("NegativePressureFrame").style.display="none";
		document.getElementById("BasisFrame").style.display="none";
	}else if(alarm_type =="2"){
		document.getElementById("TemperatureCurveFrame").style.display="none";
		document.getElementById("CarbonFrame").style.display="none";
		document.getElementById("NegativePressureFrame").style.display="";
		document.getElementById("BasisFrame").style.display="none";
	}else if(alarm_type =="3"){
		document.getElementById("TemperatureCurveFrame").style.display="none";
		document.getElementById("CarbonFrame").style.display="";
		document.getElementById("NegativePressureFrame").style.display="none";
		document.getElementById("BasisFrame").style.display="none";
	}else{
		document.getElementById("TemperatureCurveFrame").style.display="none";
		document.getElementById("CarbonFrame").style.display="none";
		document.getElementById("NegativePressureFrame").style.display="none";
		document.getElementById("BasisFrame").style.display="";
	}
}




