//var tickInterval=7;
var count0rg;
var num;
var paramTypeList = new Array("TemperatureCurve","NegativePressure","Carbon","Water");
var paramTypeSelectValue = null;

function OrgSearch(count0rg,num){
	search();
}

//新增
function addAlarmUrl(){
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}
	
	layer.open({
		type: 2, 
		title: "新增",
		skin: 'layui-layer-lan',
		area: ['750px', '300px'],
	    content: path+"/alarm/addAlarmUrl?farmId="+$("#orgId" + (count0rg - 1)).val().split(",")[1]+"&houseId="+$("#orgId" + count0rg).val().split(",")[1]
	    +"&alarm_type="+$("#alarmType").val()
    });
}

//应用至
function applyAlarmUrl(){
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}
	layer.open({
		type: 2, 
		title: "应用至",
		skin: 'layui-layer-lan',
		area: ['530px', '250px'],
	    content: path+"/alarm/applyAlarmUrl?farmId="+$("#orgId" + (count0rg - 1)).val().split(",")[1]+"&houseId="+$("#orgId" + count0rg).val().split(",")[1]+
	    "&alarm_type="+$("#alarmType").val()
    });		
}

//上传报警通讯录
function bindingUserUrl(){
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}
	layer.open({
		type: 2, 
		title: "上传报警联系人",
		skin: 'layui-layer-lan',
		area: ['570px', '400px'],
	    content: path+"/alarm/bindingUserUrl?farmId="+$("#orgId" + (count0rg - 1)).val().split(",")[1]+"&houseId="+$("#orgId" + count0rg).val().split(",")[1]+
	    "&alarm_type="+$("#alarmType").val()
    });
}

//编辑
function editAlarm(uidNum){
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}
	layer.open({
		type: 2, 
		title: "修改",
		skin: 'layui-layer-lan',
		area: ['860px', '400px'],
	    content: '<%=path%>/admin/updateMsgUrl?id=' + uidNum
	});
}
//删除
function deleteAlarm(uidNum,alarmType) {
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}
	//询问框
	layer.confirm('你确定要删除此记录吗？', {
		btn : [ '确定', '取消' ]
	//按钮
	}, function() {
		$.ajax({
			url : path + "/alarm/deleteAlarm",
			data : {
				"uidNum" : uidNum,"alarm_type":alarmType
			},
			type : "POST",
			success : function(result) {
				result = $.parseJSON(result);
				if (result.success) {
					layer.alert(result.msg, function(index) {
						location.reload();
					});
				} else {
					layer.alert(result.msg);
				}
			}
		});
	});
}

function  querySBDayageSettingSub(){
	$.ajax({
		type : "post",
		url : path + "/alarm/queryAlarm",
		data : {
			"farmId" : $("#orgId" + (count0rg - 1)).val().split(",")[1],//农场
			"houseId" : $("#orgId" + count0rg).val().split(",")[1],//栋舍
			"alarm_type" : $("#alarmType").val(),//报警类别
		},
		dataType: "json",
		success : function(result) {
			var xNames = new Array();
			var setTemp = new Array();//清空目标温度
			var highAlarmTemp = new Array();//清空高报温度
			var lowAlarmTemp = new Array();//清空低报温度
//			var setNegativePressure = new Array();
			var highAlarmNegativePressure = new Array();
			var lowAlarmNegativePressure = new Array();
			var setCo2 = new Array();
			var highAlarmCo2 = new Array();
//			var lowAlarmCo2 = new Array();
			var setWaterDeprivation = new Array();
			var highWaterDeprivation = new Array();
			var lowWaterDeprivation = new Array();
			var list = result.obj;
			var alarmtype1 = result.msg;
			var alarmType5 =[];
			var yName = '';
			var suffixName = '';
			if(alarmtype1=="1"){
			for (var i = 0; i < list.length; i++) {
				if(list[i].set_temp!=undefined){
					xNames.push(list[i].day_age+'日龄');
					setTemp.push(list[i].set_temp);
					highAlarmTemp.push(list[i].high_alarm_temp );
					lowAlarmTemp.push(list[i].low_alarm_temp );
				}
			}
				alarmType5 = [{
		            name: '目标温度',
		            data: setTemp
		        },  {
		            name: '高报温度',
		            data: highAlarmTemp
		        }, {
		            name: '低报温度',
		            data: lowAlarmTemp
		        }];
				yName = '温度(°C)';
				suffixName = '°C';
			}else if(alarmtype1=="2"){
				for (var i = 0; i < list.length; i++) {
					if(list[i].high_alarm_negative_pressure!=undefined){
						xNames.push(list[i].day_age+'日龄');
//						setNegativePressure.push(list[i].set_negative_pressure);
						highAlarmNegativePressure.push(list[i].high_alarm_negative_pressure );
						lowAlarmNegativePressure.push(list[i].low_alarm_negative_pressure );
					}					
				}
				alarmType5 = [{
		            name: '高报负压',
		            data: highAlarmNegativePressure
		        } ,{
		            name: '低报负压',
		            data: lowAlarmNegativePressure
		        }];
				yName='光照(Lux)';
				suffixName = 'Pa';
			}else if(alarmtype1=="3"){
				for (var i = 0; i < list.length; i++) {
					if(list[i].high_alarm_co2!=undefined){
					xNames.push(list[i].day_age+'日龄');
					setCo2.push(list[i].set_co2);
					highAlarmCo2.push(list[i].high_alarm_co2 );
//					lowAlarmCo2.push(list[i].low_alarm_co2 );
					}
				}
				alarmType5 = [{
		            name: 'CO2报警值',
		            data: highAlarmCo2
		        },{
		            name: 'CO2参考值',
		            data: setCo2
		        }];
				yName='CO2(ml/m³)';
				suffixName = 'ml/m³';
			}else if(alarmtype1=="4"){
				for (var i = 0; i < list.length; i++) {
					if(list[i].set_water_deprivation!=undefined){
					xNames.push(list[i].day_age+'日龄');
					setWaterDeprivation.push(list[i].set_water_deprivation);
					highWaterDeprivation.push(list[i].high_water_deprivation );
					lowWaterDeprivation.push(list[i].low_water_deprivation );
					}
				}
				alarmType5 = [{
		            name: '目标饮水量',
		            data: setWaterDeprivation
		        },  {
		            name: '高报饮水量',
		            data: highWaterDeprivation
		        }, {
		            name: '低报饮水量',
		            data: lowWaterDeprivation
		        }];
				yName='饮水量(L/10分钟)';
				suffixName = 'L/10分钟';
			}
			createChar(suffixName,yName,xNames,alarmType5);
		}
	});
}

//创建报警曲线图
function createChar(suffixName,yName,xNames,alarmType5) {
	 $('#container').highcharts({
		 chart: {
	          type: 'spline'
	      },
	        title: {
	            text: '',
	            x: -20 //center
	        },
	        xAxis: {
	        	tickInterval: 6,      	
	            categories: xNames
	        },
	        credits: {
	            enabled: false
	       },
	       height:300,
	        yAxis: {
	        	 title: {
		                text: yName
		            },
		            minorGridLineWidth: 0,
		            gridLineWidth: 0,
		            alternateGridColor: null,
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: suffixName
	        },
	        plotOptions: {
	        	allowPointSelect:false,
	            spline: {
	                lineWidth: 1,
	                states: {
	                    hover: {
	                        lineWidth: 5
	                    }
	                },
	                marker: {
	                    enabled: false
	                }
	            }
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: alarmType5
	    });
}

//function checkAll() {
//	
//    var checkBoxes = document.getElementsByName("checkedSBDayageSettingSubId");
//    for (var i = 0; i < checkBoxes.length; i++) {
//        checkBoxes[i].checked = true;
//    }
//}

//删除
function batchChange(){
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}
	var deleteRow;
	var deleteRow2 ="";
    deleteRow = $('#'+paramTypeSelectValue+'Table').bootstrapTable('getSelections');
    if(deleteRow==null||deleteRow==''){
		 layer.alert('请选择要删除的数据!', {
				skin : 'layui-layer-lan',
				closeBtn : 0,
				shift : 4
			// 动画类型
			});
		 return;
	 }
    for(var i = 0; i < deleteRow.length; i++){
    	deleteRow2 = deleteRow2+deleteRow[i].uid_num+";";
    }
    document.getElementById("reflushText").style.display="inline";
	$.ajax({
        // async: true,
        url: path+"/alarm/deleteAlarm",
        data: {"deleteRow":deleteRow2,
        	   "farmId":$("#orgId" + (count0rg - 1)).val().split(",")[1],
        	   "houseId":$("#orgId" + count0rg).val().split(",")[1],
        	   "alarm_type":$("#alarmType").val()},
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {     
                var obj = result.obj;
                initTable(paramTypeSelectValue, getTableDataColumns(paramTypeSelectValue), []);
                if(null != obj) {
                    var dataJosn = $.parseJSON(JSON.stringify(obj));
                    $("#"+paramTypeSelectValue+"Table").bootstrapTable('load',dataJosn);
                } else{
                    initTableRow(paramTypeSelectValue, getTableEmptyRow(paramTypeSelectValue));
                }
                querySBDayageSettingSub();
        }
    });
	document.getElementById("reflushText").style.display="none";
}

//检索
function search(){
	changeFrame();
    var p = {
        farmId: $("#orgId" + (count0rg - 1)).val().split(",")[1],
        houseId: $("#orgId" + count0rg).val().split(",")[1],
        alarm_type: $("#alarmType").val()
    };
    document.getElementById("reflushText").style.display="inline";
    $.ajax({
        // async: true,
        url: path+"/alarm/queryAlarm2",
        data: p,
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {
            if(result.success==false){
                document.getElementById(paramTypeSelectValue + 'Table').style.display="none";
//                hideTableToolBar();
                layer.alert(result.msg, {
                    skin: 'layui-layer-lan'
                    ,closeBtn: 0
                    ,shift: 4 //动画类型
                });
            } else {
                var obj = result.obj;
                initTable(paramTypeSelectValue, getTableDataColumns(paramTypeSelectValue), []);
                if(null != obj) {
                    var dataJosn = $.parseJSON(JSON.stringify(obj));
                    $("#" + paramTypeSelectValue + "Table").bootstrapTable('load',dataJosn);
                } else{
                    initTableRow(paramTypeSelectValue, getTableEmptyRow(paramTypeSelectValue));
                }
                var obj1 = result.obj1;
                if(obj1 != ""){
                 document.getElementById('alarm_delay').value= obj1.alarm_delay;
	       		 document.getElementById('temp_cpsation').value= obj1.temp_cpsation;
	       		 document.getElementById('yincang').value= obj1.alarm_way;
	       		 document.getElementById('temp_cordon').value= obj1.temp_cordon;
                }
//                showTableToolBar(paramTypeSelectValue);
                querySBDayageSettingSub();
            }
        }
    });
    document.getElementById("reflushText").style.display="none";
	
}

//修改
function update(){
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}

	var updateRow;
	var updateRow2="";
	updateRow = $('#' + paramTypeSelectValue + 'Table').bootstrapTable('getSelections');
    if (updateRow.length==0) {
    	updateHouseAlarm();
        layer.alert('请先进行设置！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }
    if($("#alarmType").val()==1){
    	for(var i = 0; i < updateRow.length; i++){
        	updateRow2 = updateRow2+updateRow[i].uid_num+","+updateRow[i].farm_id+","+updateRow[i].house_id+","+updateRow[i].day_age+","+
        	updateRow[i].set_temp+","+updateRow[i].high_alarm_temp+","+updateRow[i].low_alarm_temp+";";
        }
    }else if($("#alarmType").val()==2){
    	for(var i = 0; i < updateRow.length; i++){
        	updateRow2 = updateRow2+updateRow[i].uid_num+","+updateRow[i].farm_id+","+updateRow[i].house_id+","+updateRow[i].day_age+";";
        }
    }else if($("#alarmType").val()==3){
    	for(var i = 0; i < updateRow.length; i++){
        	updateRow2 = updateRow2+updateRow[i].uid_num+","+updateRow[i].farm_id+","+updateRow[i].house_id+","+updateRow[i].day_age+","+
        	updateRow[i].set_co2+","+updateRow[i].high_alarm_co2+";";
        }
    }
    
    var p = {
    		alarm_delay: $("#alarm_delay").val(),
    		temp_cpsation: $("#temp_cpsation").val(),
    		yincang: $("#yincang").val(),
    		temp_cordon: $("#temp_cordon").val(),
    		alarm_type:$("#alarmType").val(),
    		updateRow: updateRow2
        };
    
	$.ajax({
        // async: true,
        url: path+"/alarm/updateAlarm",
        data: p,
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {
        	querySBDayageSettingSub();
        	var obj = result.obj;
            initTable(paramTypeSelectValue, getTableDataColumns(paramTypeSelectValue), []);
            if(null != obj) {
                var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#"+paramTypeSelectValue+"Table").bootstrapTable('load',dataJosn);
            } else{
                initTableRow(paramTypeSelectValue, getTableEmptyRow(paramTypeSelectValue));
            }
        	if(result.success==false){
                // alert("保存失败！"+result.msg);
                layer.alert('保存失败！'+result.msg, {
                    skin: 'layui-layer-lan'
                    ,closeBtn: 0
                    ,shift: 4 //动画类型
                });
            } else {
                // var list = eval(result.obj);
                layer.alert('保存成功！', {
                    skin: 'layui-layer-lan'
                    ,closeBtn: 0
                    ,shift: 4 //动画类型
                });
            }
        
        }
    });
}

function updateHouseAlarm(){
	var p = {
    		alarm_delay: $("#alarm_delay").val(),
    		temp_cpsation: $("#temp_cpsation").val(),
    		yincang: $("#yincang").val(),
    		temp_cordon: $("#temp_cordon").val()
        };
	$.ajax({
        // async: true,
        url: path+"/alarm/updateHouseAlarm",
        data: p,
        type : "POST",
        dataType: "json",
        cache: false,
        success: function(result) {
                var obj = result.obj;
                if(obj != ""){
                 document.getElementById('alarm_delay').value= obj.alarm_delay;
	       		 document.getElementById('temp_cpsation').value= obj.temp_cpsation;
	       		 document.getElementById('yincang').value= obj.alarm_way;
	       		 document.getElementById('temp_cordon').value= obj.temp_cordon;
                }
            
        }
    });
}

//关闭等待窗口  
function closediv() {  
    //Close Div   
    document.body.removeChild(document.getElementById("bgDiv"));  
    document.getElementById("msgDiv").removeChild(document.getElementById("msgTitle"));  
    document.body.removeChild(document.getElementById("msgDiv"));  
}  
//显示等待窗口  
function showdiv(str) {  
    var msgw, msgh, bordercolor;  
    msgw = 400; //提示窗口的宽度   
    msgh = 100; //提示窗口的高度   
    bordercolor = "#336699"; //提示窗口的边框颜色   
    titlecolor = "#99CCFF"; //提示窗口的标题颜色   
  
    var sWidth, sHeight;  
    sWidth = document.body.clientWidth;//window.screen.Width;  
    sHeight = document.body.clientHeight;//window.screen.Height;  
  
    var bgObj = document.createElement("div");  
    bgObj.setAttribute('id', 'bgDiv');  
    bgObj.style.position = "absolute";  
    bgObj.style.top = "0";  
    bgObj.style.background = "#777";  
    bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";  
    bgObj.style.opacity = "0.6";  
    bgObj.style.left = "0";  
    bgObj.style.width = sWidth + "px";  
    bgObj.style.height = sHeight + "px";  
    document.body.appendChild(bgObj);  
    var msgObj = document.createElement("div")  
    msgObj.setAttribute("id", "msgDiv");  
    msgObj.setAttribute("align", "center");  
    msgObj.style.position = "absolute";  
    msgObj.style.background = "white";  
    msgObj.style.font = "16px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";  
    msgObj.style.border = "1px solid " + bordercolor;  
    msgObj.style.width = msgw + "px";  
    msgObj.style.height = msgh + "px";  
    msgObj.style.top = (document.documentElement.scrollTop + (sHeight - msgh) / 2) + "px";  
    msgObj.style.left = (sWidth - msgw) / 2 + "px";  
    var title = document.createElement("h4");  
    title.setAttribute("id", "msgTitle");  
    title.setAttribute("align", "right");  
    title.style.margin = "0";  
    title.style.padding = "3px";  
    title.style.background = bordercolor;  
    title.style.filter = "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";  
    title.style.opacity = "0.75";  
    title.style.border = "1px solid " + bordercolor;  
    title.style.height = "18px";  
    title.style.font = "12px Verdana, Geneva, Arial, Helvetica, sans-serif";  
    title.style.color = "white";  
    //title.style.cursor = "pointer";  
    //title.innerHTML = "关闭";  
    //title.onclick = closediv;  
    document.body.appendChild(msgObj);  
    document.getElementById("msgDiv").appendChild(title);  
    var txt = document.createElement("p");  
    txt.style.margin = "1em 0"  
    txt.setAttribute("id", "msgTxt");  
    txt.innerHTML = str;  
    document.getElementById("msgDiv").appendChild(txt);  
}  




function changeFrame(){
	if($("#alarmType").val()=="1"){
		paramTypeSelectValue = paramTypeList[0];
	}else if($("#alarmType").val()=="2"){
		paramTypeSelectValue = paramTypeList[1];
	}else if($("#alarmType").val()=="3"){
		paramTypeSelectValue = paramTypeList[2];
	}else if($("#alarmType").val()=="4"){
		paramTypeSelectValue = paramTypeList[3];
	}
    // alert(selectOption.value);
    for(tmp in paramTypeList) {
        var ui = document.getElementById(paramTypeList[tmp]+"Frame");
        if(paramTypeSelectValue == paramTypeList[tmp]){
            ui.style.display="block";
        }else {
            ui.style.display="none";
        }
    }
};

function getTableDataColumns(paramTypeSelectValue){
    if(paramTypeSelectValue == paramTypeList[0]) {
        return getTempTableDataColumns();
    }
    if(paramTypeSelectValue == paramTypeList[1]) {
        return getNegaTableDataColumns();
    }
    if(paramTypeSelectValue == paramTypeList[2]) {
        return getCarbonTableDataColumns();
    }
    if(paramTypeSelectValue == paramTypeList[3]) {
        return getWaterTableDataColumns();
    }
}

function getTableEmptyRow(tableName){
    var count = $('#' + tableName + 'Table').bootstrapTable('getData').length;
    count += -10000;
    var emptyRow ;
    var defaultValue = "";
    if(tableName == paramTypeList[0]) {
        emptyRow = {id: count,
                    Day: defaultValue,
                    Target: defaultValue,
                    Heat: defaultValue,
                    Tunnel: defaultValue,
                    MinLevel: defaultValue,
                    MaxLevel: defaultValue
                    };
    }
    if(tableName == paramTypeList[1]) {
        emptyRow = {id: count,
            FromTime: defaultValue,
            ToTime: defaultValue,
            TunnelDiff: defaultValue,
            Till_Humid: defaultValue,
            On: defaultValue,
            Off: defaultValue
        };
    }
    if(tableName == paramTypeList[2]) {
        emptyRow = {id: count,
            FromTime: defaultValue,
            ToTime: defaultValue,
            Trg_Diff: defaultValue,
            Till_Humid: defaultValue,
            On: defaultValue,
            Off: defaultValue
        };
    }
    if(tableName == paramTypeList[3]) {
        emptyRow = {id: count,
            Day: defaultValue,
            FromTime: defaultValue,
            ToTime: defaultValue,
            Intencity: defaultValue
        };
    }

    return emptyRow;
}

function getTempTableDataColumns(){
    var dataColumns = [{
        checkbox: true,
        width: '5%'
    }, {
        field: "uid_num",
        title: "ID",
        visible: false
    }, {
        field: "day_age",
        title: "日龄",
        editable: {
            type: 'text',
            title: '日龄',
            mode: 'inline',
            setValue: null,
            validate: function (v) {
                if (!v) return '日龄不能为空';
            }
        },
        width: '5%'
    }, {
        field: "set_temp",
        title: "目标温度",
        editable: {
            type: 'text',
            title: '目标温度',
            mode: 'inline',
            validate: function (v) {
                if (!v) return '目标温度不能为空';
            }
        },
        width: '18%'
    }, {
        field: "high_alarm_temp",
        title: "高报温度",
        editable: {
            type: 'text',
            title: '高报温度',
            mode: 'inline',
            validate: function (v) {
                if (!v) return '高报温度不能为空';
            }
        },
        width: '18%'
    }, {
        field: "low_alarm_temp",
        title: "低报温度",
        editable: {
            type: 'text',
            title: '低报温度',
            mode: 'inline',
            validate: function (v) {
                if (!v) return '低报温度不能为空';
            }
        },
        width: '18%'
    }];
    return dataColumns;
}

function getNegaTableDataColumns(){
    var dataColumns = [{
        checkbox: true,
        width: '5%'
    }, {
        field: "uid_num",
        title: "ID",
        visible: false
    }, {
        field: "day_age",
        title: "日龄",
        editable: {
            type: 'text',
            title: '日龄',
            mode: 'inline',
            setValue: null,
            validate: function (v) {
                if (!v) return '日龄不能为空';
            }
        },
        width: '5%'
    }, {
        field: "high_lux",
        title: "光照上限制",
        editable: {
            type: 'text',
            title: '光照上限制',
            mode: 'inline',
            validate: function (v) {
                if (!v) return '光照上限制不能为空';
            }
        },
        width: '18%'
    }, {
        field: "low_lux",
        title: "光照下限制",
        editable: {
            type: 'text',
            title: '光照下限制',
            mode: 'inline',
            validate: function (v) {
                if (!v) return '光照下限制不能为空';
            }
        },
        width: '18%'
    }, {
        field: "set_lux",
        title: "光照参考值",
        editable: {
            type: 'text',
            title: '光照参考值',
            mode: 'inline',
            validate: function (v) {
                if (!v) return '光照参考值不能为空';
            }
        },
        width: '18%'
    }, {
        field: "start_time",
        title: "开启时间",
        editable: {
            type: 'text',
            title: '开启时间',
            mode: 'inline',
            validate: function (v) {
                if (!v) return '开启时间不能为空';
            }
        },
        width: '18%'
    }, {
        field: "end_time",
        title: "关闭时间",
        editable: {
            type: 'text',
            title: '关闭时间',
            mode: 'inline',
            validate: function (v) {
                if (!v) return '关闭时间不能为空';
            }
        },
        width: '18%'
    }];
    return dataColumns;
}

function getCarbonTableDataColumns(){
    var dataColumns = [{
        checkbox: true,
        width: '5%'
    }, {
        field: "uid_num",
        title: "ID",
        visible: false
    }, {
        field: "day_age",
        title: "日龄",
        editable: {
            type: 'text',
            title: '日龄',
            mode: 'inline',
            setValue: null,
            validate: function (v) {
                if (!v) return '日龄不能为空';
            }
        },
        width: '5%'
    }, {
        field: "high_alarm_co2",
        title: "CO2报警值",
        editable: {
            type: 'text',
            title: 'CO2报警值',
            mode: 'inline',
            validate: function (v) {
                if (!v) return 'CO2报警值不能为空';
            }
        },
        width: '18%'
    }, {
        field: "set_co2",
        title: "CO2参考值",
        editable: {
            type: 'text',
            title: 'CO2参考值',
            mode: 'inline',
            validate: function (v) {
                if (!v) return 'CO2参考值不能为空';
            }
        },
        width: '18%'
    }];
    return dataColumns;
}

function getWaterTableDataColumns(){
    var dataColumns = [{
        checkbox: true,
        width: '5%'
    }, {
        field: "uid_num",
        title: "ID",
        visible: false
    }, {
        field: "day_age",
        title: "日龄",
        editable: {
            type: 'text',
            title: '日龄',
            mode: 'inline',
            setValue: null,
            validate: function (v) {
                if (!v) return '日龄不能为空';
            }
        },
        width: '5%'
    }, {
        field: "set_water_deprivation",
        title: "目标耗水",
        editable: {
            type: 'text',
            title: '目标耗水',
            mode: 'inline',
            validate: function (v) {
                if (!v) return '目标耗水不能为空';
            }
        },
        width: '18%'
    }, {
        field: "high_water_deprivation",
        title: "高报耗水",
        editable: {
            type: 'text',
            title: '高报耗水',
            mode: 'inline',
            validate: function (v) {
                if (!v) return '高报耗水不能为空';
            }
        },
        width: '18%'
    }, {
        field: "low_water_deprivation",
        title: "低报耗水",
        editable: {
            type: 'text',
            title: '低报耗水',
            mode: 'inline',
            validate: function (v) {
                if (!v) return '低报耗水不能为空';
            }
        },
        width: '18%'
    }];
    return dataColumns;
}


/****弹出新增窗口*****/
function openAdjustWin(){
	var str = '<div style="padding-left: 10px;">&nbsp;</div>';
	    str+='<div style="padding-left: 20px;font-size:14px; width: 510px;"><span style="display:block;width: 110px;float:left;margin-left:0px;">农场:</span><span style="display:block;width: 210px;float:left;margin-left:-70px;">'+$("#orgId" + (count0rg - 1)).val().split(",")[2]+'</span> ';
	    str+='<span style="display:block;width: 110px;float:left;margin-left:0px;">栋舍:</span><span style="display:block;width: 110px;float:left;margin-left:-70px;">'+$("#orgId" + count0rg).val().split(",")[2]+'</span>';
	    str+='<span style="display:block;width: 110px;float:left;margin-left:0px;">日龄:<input type="text" style="width: 100px;margin-top: -30px;margin-left:33px;" name="day_age" id="day_age"/></span></div>';
//	    str+='<span style="display:block;width:60px;float:left;text-align: right;">报警类别:&nbsp;&nbsp; <select style="width: 100px;margin-top: 5px;" name="alarm_type" id="alarmType" value=""/></select></span>';
	    str+='<div style="padding-left: 15px;font-size:14px; width: 510px;padding-top: 20px;margin-top: 20px;">';
	    if($("#alarmType").val() == "1") {
	    	 str+='<span style="display:block;width: 110px;float:left;">目标温度:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:60px;" name="set_temp" id="set_temp"/></span> ';   
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:70px;">高报温度:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:60px;" name="high_alarm_temp" id="high_alarm_temp"/></span> ';   
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:70px;">低报温度:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:60px;" name="low_alarm_temp" id="low_alarm_temp"/></span></div> ';   
	    }else if($("#alarmType").val() == "2"){
	    	 str+='<span style="display:block;width: 110px;float:left;">光照上限制:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="high_lux" id="high_lux"/></span> ';   
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:90px;">光照下限制:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="low_lux" id="low_lux"/></span> ';   
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:90px;">光照参照值:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="set_lux" id="set_lux"/></span></div> ';
	    }else if($("#alarmType").val() == "3"){
	    	str+='<span style="display:block;width: 110px;float:left;">CO2报警值:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="high_alarm_co2" id="high_alarm_co2"/></span> ';     
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:90px;">CO2参考值:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="set_co2" id="set_co2"/></span></div> ';
	    }
	    str+='<div style="padding-left: 15px;font-size:14px; width: 510px;padding-top: 20px;"><label style="padding-left: 110px;color: red; width:500px; text-align: center;margin-top: 25px;" id="addAlarm_msg"></label></div>';
	layer.open({
		  type: 1,
		  skin: 'layui-layer-green', //加上边框
		  area: ['630px', '240px'], //宽高
		  title:"新增",
		  content: str,
		  btn: ['确定','取消'],
		  yes: function(index){
			if(submitForm()){ 
		    var param;
			if($("#alarmType").val() == "1") {
				param = {
						day_age: $("#day_age").val(),
						farmId: $("#orgId" + (count0rg - 1)).val().split(",")[1],
						houseId: $("#orgId" + count0rg).val().split(",")[1],
						alarm_type: $("#alarmType").val(),
						high_alarm_temp: $("#high_alarm_temp").val(),
						low_alarm_temp: $("#low_alarm_temp").val(),
						set_temp: $("#set_temp").val()
		        };
			}else if($("#alarmType").val() == "2") {
				param = {
						day_age: $("#day_age").val(),
						farmId: $("#orgId" + (count0rg - 1)).val().split(",")[1],
						houseId: $("#orgId" + count0rg).val().split(",")[1],
						alarm_type: $("#alarmType").val(),
						high_lux: $("#high_lux").val(),
						low_lux: $("#low_lux").val(),
						set_lux: $("#set_lux").val()
		        };
			}else {
				param = {
						day_age: $("#day_age").val(),
						farmId: $("#orgId" + (count0rg - 1)).val().split(",")[1],
						houseId: $("#orgId" + count0rg).val().split(",")[1],
						alarm_type: $("#alarmType").val(),
						high_alarm_co2: $("#high_alarm_co2").val(),
						set_co2: $("#set_co2").val()
		        };
			}

			$.ajax({
				url : path + "/alarm/addAlarm",
				data : param,
				type : "POST",
				dataType : "json",
				success : function(result) {
					layer.close(index); 
					search();
					if(result.msg=="1") {
						layer.alert('操作成功!', {
							skin : 'layui-layer-lan',
							closeBtn : 0,
							shift : 4
						// 动画类型
						});
					}else{
						layer.alert('操作失败!', {
							skin : 'layui-layer-lan',
							closeBtn : 0,
							shift : 4
						// 动画类型
						});
					}
				}
			});
		  }
		  }
		});
	}


function submitForm(){
	var day_age=$("input[name='day_age']").val();
	var set_temp=$("input[name='set_temp']").val();
	var high_alarm_temp=$("input[name='high_alarm_temp']").val();
	var low_alarm_temp=$("input[name='low_alarm_temp']").val();
	var high_lux=$("input[name='high_lux']").val();
	var low_lux=$("input[name='low_lux']").val();
	var set_lux=$("input[name='set_lux']").val();
	var high_alarm_co2=$("input[name='high_alarm_co2']").val();
	var set_alarm_co2=$("input[name='set_alarm_co2']").val();
	if(day_age =="" ){
			$('#addAlarm_msg').html("日龄不能为空！");
			return false;
	}
	if(day_age < 0 ){
			$('#addAlarm_msg').html("日龄不能负！");
			return false;
	}
	if($("#alarmType").val()=="1"){
		if(set_temp =="" ){
			$('#addAlarm_msg').html("目标温度不能为空！");
			return false;
	}else if(high_alarm_temp =="" ){
		$('#addAlarm_msg').html("高报温度不能为空！");
		return false;
}else if(low_alarm_temp =="" ){
	$('#addAlarm_msg').html("低报温度不能为空！");
	return false;
  }	
	}else if($("#alarmType").val()=="2"){
		if(high_lux =="" ){
		$('#addAlarm_msg').html("光照上限制不能为空！");
		return false;
}else if(low_lux =="" ){
	$('#addAlarm_msg').html("光照下限制不能为空！");
	return false;
  }else if(set_lux =="" ){
		$('#addAlarm_msg').html("光照参照值不能为空！");
		return false;
	  }		
	}else if($("#alarmType").val()=="3"){

		if(high_alarm_co2 =="" ){
		$('#addAlarm_msg').html("CO2报警值不能为空！");
		return false;
}else if(set_alarm_co2 =="" ){
	$('#addAlarm_msg').html("CO2参考值不能为空！");
	return false;
  }	
	}
	//showdiv('加载中，请稍候');
return true;
}











