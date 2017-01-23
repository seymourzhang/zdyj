var count0rg;
var num=2;
var allSearch = "true";

$(document).ready(function() {
    App.init(); // initlayout and core plugins

    $("#lm1").attr("class","active");
    $("#se1").attr("class","selected");
    $("#z101").attr("class","active");
    $("#op1").attr("class","arrow open");
    $("#monitorExpand").removeClass("collapse").addClass("expand");

    $("#monitor_date_table").removeClass("table-hover");

    $("#enableMonitorSet").change(function() {
        OrgSearch(count0rg,num);
    });
});

//$(function() {
//    $('#tbodyMonitorCurList').vTicker({      
//        speed: 700,           //滚动速度，单位毫秒。
//            pause: 4000,            //暂停时间，就是滚动一条之后停留的时间，单位毫秒。                          
//            showItems: 1,           //显示内容的条数。                          
//            mousePause: true,       //鼠标移动到内容上是否暂停滚动，默认为true。                           
//            height: 0,              //滚动内容的高度。
//            direction: 'up' ,      //滚动的方向，默认为up向上，down则为向下滚动。                           
//            animation: 'fade',    //动画效果，默认是fade，淡出。    
//            mousePause: true      //鼠标移动到内容上是否暂停滚动，默认为true。
//     
//    });
//});

//新增
function monitorSetting(){
    layer.open({
        type: 2,
        title: "新增",
        skin: 'layui-layer-lan',
        area: ['450px', '450px'],
        content: '<%=path%>/monitor/monitorSet'
    });
}

function changeOrg() {
    $.ajax({
        type: "post",
        url: "<%=path%>/monitor/getOrgBySetted",
        data: {},
        dataType: "json",
        success: function (result) {
            var setting = {
                check: {
                    enable: true,
                    chkDisabledInherit: true
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                }
            };
            var zNodes = result.obj;
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        }
    });
};

function OrgSearch(count0rg,num){
	reflushMonitor();
}

function reflushMonitor() {
//  var param =$.serializeObject($('#farmData'));
    var obj = document.getElementById("enableMonitorSet");
    var param;
//    var farmList = $("#farmId").val();
//    var houseList = $("#houseId").val();
//    if ($("#farmId").val() == "" && $("#houseId").val() == "" && !obj.checked) {
//        param = {"checked":"false"};
//    } else if ($("#farmId").val() == "" && $("#houseId").val() != "" && !obj.checked) {
//        param = {"houseId": houseList,"checked":"false"};
//    } else if ($("#farmId").val() != "" && $("#houseId").val() == "" && !obj.checked) {
//        param = {"farmId": farmList, "checked":"false"};
//    } else 
    	if (!obj.checked) {
        param = {"farmId": $("#orgId"+(count0rg-1)).val().split(",")[1],
//        		"houseId": $("#orgId"+count0rg).val().split(",")[1], 
        		"checked":"false"
        			};
    } else if (obj.checked) {
        param = {"farmId": $("#orgId"+(count0rg-1)).val().split(",")[1], 
//        		"houseId": $("#orgId"+count0rg).val().split(",")[1], 
        		"checked":"true"};
    }
    var obj = document.getElementById("enableMonitorSet");
    if (obj.checked) {
        document.getElementById("orgId"+(count0rg-1)).disabled = true;
        document.getElementById("orgId"+count0rg).disabled = true;
    } else {
        document.getElementById("orgId"+(count0rg-1)).disabled = false;
        document.getElementById("orgId"+count0rg).disabled = false;
    }
    $.ajax({
        // async: true,
        url: path + "/monitor/reflushMonitor",
        data: param,
        type: "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function (result) {
            var list = eval(result.obj);
            $("#tbodyMonitorCurList tr").remove();
            for (var i = 0; i < list.length; i++) {
                var str = '';
                // var strVideo = "siMenu('z104','lm1','se1','op1','视频监视','/monitor/videoMonitor?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id'] + "')><a href='javascript:void(0);'";
                var strTemp = "siMenu('z201','lm2','se2','op2','温湿度曲线图','/temProfile/showTemProfile?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id']  + "&batch_no=" + list[i]['batch_no'] + "')><a href='javascript:void(0);'";
                var strHumidity = "siMenu('z201','lm2','se2','op2','温湿度曲线图','/humidityReport/showHumidityReport?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id'] + "&batch_no=" + list[i]['batch_no'] + "')><a href='javascript:void(0);'";
                // var strWater = "siMenu('z203','lm2','se2','op2','饮水量曲线图','/waterReport/showWaterReport?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id'] + "&batch_no=" + list[i]['batch_no'] + "')><a href='javascript:void(0);'";
                var strLux = "siMenu('z207','lm2','se2','op2','光照曲线图','/lightReport/showLightReport?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id'] + "&batch_no=" + list[i]['batch_no'] + "')><a href='javascript:void(0);'";
                var strCarbon = "siMenu('z204','lm2','se2','op2','二氧化碳曲线图','/carbonReport/showCarbonReport?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id'] + "&batch_no=" + list[i]['batch_no'] + "')><a href='javascript:void(0);'";
                // var strNegative = "siMenu('z205','lm2','se2','op2','负压曲线图','/negativePressure/showNegativePressure?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id'] + "&batch_no=" + list[i]['batch_no'] + "')><a href='javascript:void(0);'";
                str += "<tr align='center' style='height:30px' >";
//        	 if(list[i]["alarm_code"]=='正常'){
//        		 str+="<tr align='center' style='height:30px' >";
//        	 }else{
//        		 str+="<tr bgcolor='red' align='center' style='height:30px' >";
//        	 }
                str += "<td style='height:30px;text-align: center;'>" + list[i]["farm_name"] + "</td>";
                // str += "<td style='height:30px;text-align: center;' onclick=" + strVideo + ">" + list[i]["house_name"] + "</a></td>";
                str += "<td style='height:30px;text-align: center;'>" + list[i]["house_name"] + "</td>";
                str += "<td style='height:30px;text-align: center;'>" + list[i]["date_age"] + "</td>";
                if (list[i]["alarm_code"] == '正常') {
                    str += "<td style='height:30px;text-align: center;'>" + list[i]["alarm_code"] + "</a></td>";
                } else {
                    str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["alarm_code"] + "</a></td>";
                }

                if (list[i]["inside_set_temp"] == -99) {
                	str += "<td style='height:30px;text-align: center;border-left: 2px solid #b4cef8;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                    str += "<td style='height:30px;text-align: center;border-left: 2px solid #b4cef8;' onclick=" + strTemp + ">" + list[i]["inside_set_temp"] + "</a></td>";
                }
                if (list[i]["outside_temp"] == -99) {
                    str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                    str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["outside_temp"] + "</a></td>";
                }
                if (list[i]["inside_avg_temp"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_avg_temp"] + "</a></td>";
                }
                if (list[i]["point_temp_diff"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                	if (list[i]["point_temp_diff"]>list[i]["point_alarm"]) {
                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["point_temp_diff"] + "</a></td>";
                    } else if(list[i]["point_alarm"]-list[i]["point_temp_diff"] >0 && list[i]["point_alarm"]-list[i]["point_temp_diff"] <=1){
                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["point_temp_diff"] + "</a></td>";
                    }else{
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + (list[i]["point_temp_diff"] != null ? list[i]["point_temp_diff"] : '' ) + "</a></td>";	
                    }
                }
                if (list[i]["inside_temp1"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                	if (list[i]["inside_temp1"]<list[i]["low_alarm_temp"] || list[i]["inside_temp1"]>list[i]["high_alarm_temp"]) {
                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["inside_temp1"] + "</a></td>";
                    } else if((list[i]["inside_temp1"]-list[i]["low_alarm_temp"] >0 && list[i]["inside_temp1"]-list[i]["low_alarm_temp"] <=1) 
                    		|| (list[i]["high_alarm_temp"]-list[i]["inside_temp1"] >0 && list[i]["high_alarm_temp"]-list[i]["inside_temp1"] <=1)){
                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["inside_temp1"] + "</a></td>";
                    }else{
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_temp1"] + "</a></td>";	
                    }
                }
                if (list[i]["inside_temp2"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                	if (list[i]["inside_temp2"]<list[i]["low_alarm_temp"] || list[i]["inside_temp2"]>list[i]["high_alarm_temp"]) {
                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["inside_temp2"] + "</a></td>";
                    } else if((list[i]["inside_temp2"]-list[i]["low_alarm_temp"] >0 && list[i]["inside_temp2"]-list[i]["low_alarm_temp"] <=1) 
                    		|| (list[i]["high_alarm_temp"]-list[i]["inside_temp2"] >0 && list[i]["high_alarm_temp"]-list[i]["inside_temp2"] <=1)){
                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["inside_temp2"] + "</a></td>";
                    }else{
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_temp2"] + "</a></td>";	
                    }
                }
                if (list[i]["inside_temp10"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                	if (list[i]["inside_temp10"]<list[i]["low_alarm_temp"] || list[i]["inside_temp10"]>list[i]["high_alarm_temp"]) {
                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["inside_temp10"] + "</a></td>";
                    } else if((list[i]["inside_temp10"]-list[i]["low_alarm_temp"] >0 && list[i]["inside_temp10"]-list[i]["low_alarm_temp"] <=1) 
                    		|| (list[i]["high_alarm_temp"]-list[i]["inside_temp10"] >0 && list[i]["high_alarm_temp"]-list[i]["inside_temp10"] <=1)){
                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["inside_temp10"] + "</a></td>";
                    }else{
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_temp10"] + "</a></td>";	
                    }
                }
                if (list[i]["inside_temp19"] == -99) {
                	str += "<td style='height:30px;text-align: center;border-right: 2px solid #b4cef8;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                	if (list[i]["inside_temp19"]<list[i]["low_alarm_temp"] || list[i]["inside_temp19"]>list[i]["high_alarm_temp"]) {
                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["inside_temp19"] + "</a></td>";
                    } else if((list[i]["inside_temp19"]-list[i]["low_alarm_temp"] >0 && list[i]["inside_temp19"]-list[i]["low_alarm_temp"] <=1) 
                    		|| (list[i]["high_alarm_temp"]-list[i]["inside_temp19"] >0 && list[i]["high_alarm_temp"]-list[i]["inside_temp19"] <=1)){
                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["inside_temp19"] + "</a></td>";
                    }else{
                    	str += "<td style='height:30px;text-align: center;border-right: 2px solid #b4cef8;' onclick=" + strTemp + ">" + list[i]["inside_temp19"] + "</a></td>";
                    }
                }
                if (list[i]["inside_temp20"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                	if (list[i]["inside_temp20"]<list[i]["low_alarm_temp"] || list[i]["inside_temp20"]>list[i]["high_alarm_temp"]) {
                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["inside_temp20"] + "</a></td>";
                    } else if((list[i]["inside_temp20"]-list[i]["low_alarm_temp"] >0 && list[i]["inside_temp20"]-list[i]["low_alarm_temp"] <=1) 
                    		|| (list[i]["high_alarm_temp"]-list[i]["inside_temp20"] >0 && list[i]["high_alarm_temp"]-list[i]["inside_temp20"] <=1)){
                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["inside_temp20"] + "</a></td>";
                    }else{
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_temp20"] + "</a></td>";	
                    }
                }
                if (list[i]["inside_humidity"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strHumidity + ">" + "-" + "</td>";
                } else {
                str += "<td style='height:30px;text-align: center;' onclick=" + strHumidity + ">" + list[i]["inside_humidity"] + "</a></td>";
                }
                if (list[i]["lux"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strLux + ">" + "-" + "</td>";
                } else {
                	if (list[i]["lux"]<list[i]["low_lux"] || list[i]["lux"]>list[i]["high_lux"]) {
                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["lux"] + "</a></td>";
                    } else if((list[i]["lux"]-list[i]["low_lux"] >0 && list[i]["lux"]-list[i]["low_lux"] <=1) 
                    		|| (list[i]["high_lux"]-list[i]["lux"] >0 && list[i]["high_lux"]-list[i]["lux"] <=1)){
                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["lux"] + "</a></td>";
                    }else{
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["lux"] + "</a></td>";	
                    }
                }
                if (list[i]["co2"] == 0 || list[i]["co2"] == -99) {
                    str += "<td style='height:30px;text-align: center;' onclick=" + strCarbon + ">" + "-" + "</td>";
                } else {
                	if (list[i]["co2"]>list[i]["high_alarm_co2"]) {
                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["co2"] + "</a></td>";
                    } else if(list[i]["high_alarm_co2"]-list[i]["co2"] >0 && list[i]["high_alarm_co2"]-list[i]["co2"] <=1){
                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["co2"] + "</a></td>";
                    }else{
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["co2"] + "</a></td>";	
                    }
                }
//                if (list[i]["negative_pressure"] == 0) {
//                    str += "<td style='height:30px;text-align: center;' onclick=" + strNegative + ">" + "-" + "</a></td>";
//                } else {
//                    str += "<td style='height:30px;text-align: center;' onclick=" + strNegative + ">" + list[i]["negative_pressure"] + "</a></td>";
//                }
//                str += "<td style='height:30px;text-align: center;'>" + list[i]["larger_fan"] + "</td>";
//                str += "<td style='height:30px;text-align: center;'>" + list[i]["small_fan"] + "</td>";
//                str += "<td style='height:30px;text-align: center;'>" + list[i]["fenestella_name"] + "</td>";
//                str += "<td style='height:30px;text-align: center;'>" + list[i]["heating_name"] + "</td>";
//                str += "<td style='height:30px;text-align: center;'>" + list[i]["refrigeration_name"] + "</td>";
                str += "<td style='height:30px;text-align: center;'>" + list[i]["collect_datetime"] + "</td>";
                $("#tbodyMonitorCurList").append(str);

//        	  var td = document.createElement("td");
//             var tr = document.createElement("tr");
//             tr.innerHTML = "<tr class=\"odd gradeX\" >";
//             var td = document.createElement("td");
//             td.innerHTML = "<td  bgcolor=\"red\" style=\"text-align: center;\">"+list[i]["farm_name"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td bgcolor=\"red\" style=\"text-align: center;\">"+list[i]["house_name"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["date_age"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["alarm_code"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["inside_set_temp"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["outside_temp"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["inside_avg_temp"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+(list[i]["point_temp_diff"] != null ? list[i]["point_temp_diff"]:'' )+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["inside_temp1"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["inside_temp2"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["inside_temp3"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["inside_temp4"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["inside_humidity"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["water_consumption"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["co2"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["negative_pressure"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["larger_fan"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["small_fan"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["fenestella_name"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["heating_name"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["refrigeration_name"]+"</td>";
//             tr.appendChild(td);
//
//             td = document.createElement("td");
//             td.innerHTML += "<td  style=\"text-align: center;\">"+list[i]["collect_datetime"]+"</td>";
//             tr.appendChild(td);
//
//             $("#tbodyMonitorCurList").append(tr);
            }
            // alert("reflush");

        }
    });
     setTimeout("javascript:reflushMonitor();", 10000); //10s刷新一次
}

function reflushMonitor2() {
    var param;
    if ($("#farmId").val() == "") {
        param = null;
    } else {
        param = {"farmId": $("#farmId").val()};
    }

    $.ajax({
        // async: true,
        url: path + "/monitor/reflushMonitor2",
        data: param,
        type: "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function (result) {
            var list = result.obj;
            $("#houseId option:gt(0)").remove();
            for (var i = 0; i < list.length; i++) {
                $("#houseId").append("<option value=" + list[i].id + ">" + list[i].house_name + "</option>");
            }
            reflushMonitor();
        }
    });
}

/****弹出启用监控设置窗口*****/
// function openMonitorSettingWin(){
//	if (isRead == 0) {
//		layer.alert('无权限，请联系管理员!', {
//			skin : 'layui-layer-lan',
//			closeBtn : 0,
//			shift : 4
//		// 动画类型
//		});
//		return;
//	}
// var str = '<div style="float: left;padding-left: 0px;">';
// 	str += '<div class="zTreeDemoBackground left" style="border:1px solid #FFFFFF; overflow:auto;>';
// 	str += '<ul id="treeDemo" class="ztree"></ul></div>';
//	str += '<div style="padding-left: 0px;float:left;width: 100%; text-align: center" >';
//    str += '<button type="button" class="btn blue" onclick="addMonitorSet()"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>';
//	str += '&nbsp;&nbsp;&nbsp;&nbsp;';
//		str += '<button type="button" class="btn" onclick="closeB()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>';
//      str+='</div>';
//
// layer.open({
// 	  type: 1,
// 	  skin: 'layui-layer-lan', //加上边框
// 	  area: ['570px', '465px'], //宽高
// 	  content: str,
// 	  btn: ['确定','取消'],
// 	  yes: function(index){
// 		  var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
// 		    var nodes = treeObj.getCheckedNodes(true);
// 		    var v = new Array();
// 		    for (var i = 0; i < nodes.length; i++) {
// 		        v.push(nodes[i].id);
// 		    }
// 		    $.ajax({
// 		        url: "<%=path%>/monitor/saveSet",
// 		        data: {
// 		            "groupId" : v.toString()
// 		        },
// 		        type: "POST",
// 		        dataType: "json",
// 		        success: function (result) {
// 		            if (result.msg == '1') {
// 		                parent.layer.closeAll();
// 		                parent.location.reload();
// 		                var enableMonitorSet = parent.document.getElementById("enableMonitorSet");
// 		                if (enableMonitorSet.checked == true){
// 		                    reflushMonitor();
// 		                }
// 		            } else {
// 		                alert("添加失败！");
// 		            }
// 		        }
// 		    });
// 	  }
// 	});











