var count0rg;
var num;


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
        		"houseId": $("#orgId"+count0rg).val().split(",")[1], 
        		"checked":"false"
        			};
    } else if (obj.checked) {
        param = {"farmId": $("#orgId"+(count0rg-1)).val().split(",")[1], 
        		"houseId": $("#orgId"+count0rg).val().split(",")[1], 
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
                var strTemp = "siMenu('z201','lm2','se2','op2','温度曲线图','/temProfile/showTemProfile?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id']  + "&batch_no=" + list[i]['batch_no'] + "')><a href='javascript:void(0);'";
                var strHumidity = "siMenu('z202','lm2','se2','op2','湿度曲线图','/humidityReport/showHumidityReport?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id'] + "&batch_no=" + list[i]['batch_no'] + "')><a href='javascript:void(0);'";
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
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + (list[i]["point_temp_diff"] != null ? list[i]["point_temp_diff"] : '' ) + "</a></td>";	
                }
                if (list[i]["inside_temp1"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_temp1"] + "</a></td>";
                }
                if (list[i]["inside_temp2"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_temp2"] + "</a></td>";
                }
                if (list[i]["inside_temp10"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_temp10"] + "</a></td>";
                }
                if (list[i]["inside_temp19"] == -99) {
                	str += "<td style='height:30px;text-align: center;border-right: 2px solid #b4cef8;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                str += "<td style='height:30px;text-align: center;border-right: 2px solid #b4cef8;' onclick=" + strTemp + ">" + list[i]["inside_temp19"] + "</a></td>";
                }
                if (list[i]["inside_temp20"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
                } else {
                str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_temp20"] + "</a></td>";
                }
                if (list[i]["inside_humidity"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strHumidity + ">" + "-" + "</td>";
                } else {
                str += "<td style='height:30px;text-align: center;' onclick=" + strHumidity + ">" + list[i]["inside_humidity"] + "</a></td>";
                }
                if (list[i]["lux"] == -99) {
                	str += "<td style='height:30px;text-align: center;' onclick=" + strLux + ">" + "-" + "</td>";
                } else {
                str += "<td style='height:30px;text-align: center;' onclick=" + strLux + ">" + list[i]["lux"] + "</a></td>";
                }
                if (list[i]["co2"] == 0 || list[i]["co2"] == -99) {
                    str += "<td style='height:30px;text-align: center;' onclick=" + strCarbon + ">" + "-" + "</td>";
                } else {
                    str += "<td style='height:30px;text-align: center;' onclick=" + strCarbon + ">" + list[i]["co2"] + "</a></td>";
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
function openMonitorSettingWin(){
//	if (isRead == 0) {
//		layer.alert('无权限，请联系管理员!', {
//			skin : 'layui-layer-lan',
//			closeBtn : 0,
//			shift : 4
//		// 动画类型
//		});
//		return;
//	}
var str = '<div style="float: left;padding-left: 0px;">';
	str += '<div class="zTreeDemoBackground left" style="border:1px solid #FFFFFF; overflow:auto;>';
	str += '<ul id="treeDemo" class="ztree"></ul></div>';
//	str += '<div style="padding-left: 0px;float:left;width: 100%; text-align: center" >';
//    str += '<button type="button" class="btn blue" onclick="addMonitorSet()"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>';
//	str += '&nbsp;&nbsp;&nbsp;&nbsp;';
//		str += '<button type="button" class="btn" onclick="closeB()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>';
     str+='</div>';
	
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['570px', '465px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		  var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		    var nodes = treeObj.getCheckedNodes(true);
		    var v = new Array();
		    for (var i = 0; i < nodes.length; i++) {
		        v.push(nodes[i].id);
		    }
		    $.ajax({
		        url: "<%=path%>/monitor/saveSet",
		        data: {
		            "groupId" : v.toString()
		        },
		        type: "POST",
		        dataType: "json",
		        success: function (result) {
		            if (result.msg == '1') {
		                parent.layer.closeAll();
		                parent.location.reload();
		                var enableMonitorSet = parent.document.getElementById("enableMonitorSet");
		                if (enableMonitorSet.checked == true){
		                    reflushMonitor();
		                }
		            } else {
		                alert("添加失败！");
		            }
		        }
		    });
	  }
	});
changeOrg();
}










