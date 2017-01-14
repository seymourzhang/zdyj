//var tickInterval=7;
var list10 = new Array();
var count0rg;
var num;
var paramTypeList = new Array("TemperatureCurve","NegativePressure","Carbon","Water");
var paramTypeSelectValue = null;

function OrgSearch(count0rg,num){
	search();
}

//温度探头
function alarmHide(){
	if($("#yincang").val()!="02"){
		for(var i=0;i<5;i++){
		$('#yincang2'+i).attr("disabled","disabled");
		}
	}else{
		for(var i=0;i<5;i++){
		$('#yincang2'+i).removeAttr("disabled");
		}
	}
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
				"uidNum" : uidNum,
				"alarm_type":alarmType,
				"farmId": $("#orgId" + (count0rg - 1)).val().split(",")[1],
		        "houseId": $("#orgId" + count0rg).val().split(",")[1],
		        
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

function  querySBDayageSettingSub(num){
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
			var highLux = new Array();
			var setLux = new Array();
			var lowLux = new Array();
			var timeList = new Array();
			var timeList2 = new Array();
			var timeList3 = new Array();
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
			if($("#orgId" + count0rg).val().split(",")[3]=="1"){
				if(alarmtype1=="1"){
					for (var i = 0; i < list.length; i++) {
						if(list[i].set_temp!=undefined){						 
							xNames.push(parseInt(list[i].day_age/7+1));
							setTemp.push(list[i].set_temp);
							highAlarmTemp.push(list[i].high_alarm_temp );
							lowAlarmTemp.push(list[i].low_alarm_temp );
						}
					}
						alarmType5 = [{
				            name: '目标温度',
				            data: setTemp,
				            color: 'green'
				        },  {
				            name: '高报温度',
				            data: highAlarmTemp,
				            color: 'blue'
				        }, {
				            name: '低报温度',
				            data: lowAlarmTemp,
				            color: 'red'
				        }];
						yName = '温度(°C)';
						suffixName = '°C';
					}else if(alarmtype1=="2"){
						for (var i = 0; i < list.length; i++) {
							if(list[i].high_lux!=undefined){
								if(list[i].day_age%7==0){
								xNames.push(parseInt(list[i].day_age/7));
								highLux.push(list[i].high_lux );
								lowLux.push(list[i].low_lux );
								setLux.push(list[i].set_lux );
								var time1 = new Date(list[i].start_time);
								var time2 = new Date(list[i].end_time);
								var hour1 = time1.getHours();
								var hour2 = time2.getHours();
								timeList.push(hour2-hour1);
								timeList2.push(hour1);
								list10.push(list[i]);
								}
							}					
						}
						
						alarmType5 = [{
				            name: '时间段',
				            data: timeList
				        },{ 
				            name: ' ',
				            data: timeList2,
				            color:'white'
				        }];
						yName='小时(Hour)';
						suffixName = 'Hour';
					}else if(alarmtype1=="3"){
						for (var i = 0; i < list.length; i++) {
							if(list[i].high_alarm_co2!=undefined){
							xNames.push(parseInt(list[i].day_age/7+1));
							highAlarmCo2.push(list[i].high_alarm_co2 );
							}
						}
						alarmType5 = [{
				            name: 'CO2报警值',
				            data: highAlarmCo2,
				            color: 'blue'
				        }
						];
						yName='CO2(PPM)';
						suffixName = 'PPM';
					}
			}else{
			if(alarmtype1=="1"){
			for (var i = 0; i < list.length; i++) {
				if(list[i].set_temp!=undefined){
				  if(num==16){
					xNames.push(parseInt(list[i].day_age/7+1));
					setTemp.push(list[i].set_temp);
					highAlarmTemp.push(list[i].high_alarm_temp );
					lowAlarmTemp.push(list[i].low_alarm_temp );
					if(parseInt(list[i].day_age/7)==16){
						break;
					}
				  }else if(num==36){
						if(parseInt(list[i].day_age/7)>16 && parseInt(list[i].day_age/7)<=36){
						xNames.push(parseInt(list[i].day_age/7+1));
						setTemp.push(list[i].set_temp);
						highAlarmTemp.push(list[i].high_alarm_temp );
						lowAlarmTemp.push(list[i].low_alarm_temp );
						}
					}else if(num==60){
						if(parseInt(list[i].day_age/7)>36 && parseInt(list[i].day_age/7)<=60){
							xNames.push(parseInt(list[i].day_age/7+1));
							setTemp.push(list[i].set_temp);
							highAlarmTemp.push(list[i].high_alarm_temp );
							lowAlarmTemp.push(list[i].low_alarm_temp );
							}
					}else{
						if(parseInt(list[i].day_age/7)>60){
							xNames.push(parseInt(list[i].day_age/7+1));
							setTemp.push(list[i].set_temp);
							highAlarmTemp.push(list[i].high_alarm_temp );
							lowAlarmTemp.push(list[i].low_alarm_temp );
							}
					}
				}
			}
				alarmType5 = [{
		            name: '目标温度',
		            data: setTemp,
		            color: 'green'
		        },  {
		            name: '高报温度',
		            data: highAlarmTemp,
		            color: 'blue'
		        }, {
		            name: '低报温度',
		            data: lowAlarmTemp,
		            color: 'red'
		        }];
				yName = '温度(°C)';
				suffixName = '°C';
			}else if(alarmtype1=="2"){
				for (var i = 0; i < list.length; i++) {
					if(list[i].high_lux!=undefined){
					  if(num==16){
						if(list[i].day_age%7==0){
						xNames.push(parseInt(list[i].day_age/7));
						highLux.push(list[i].high_lux );
						lowLux.push(list[i].low_lux );
						setLux.push(list[i].set_lux );
						var time1 = new Date(list[i].start_time);
						var time2 = new Date(list[i].end_time);
						var hour1 = time1.getHours();
						var hour2 = time2.getHours();
						timeList.push(hour2-hour1);
						timeList2.push(hour1);
						list10.push(list[i]);
						}
						
						if(parseInt(list[i].day_age/7)==16){
							break;
						}
					  }else if(num==36){
						  if(parseInt(list[i].day_age/7)>16 && parseInt(list[i].day_age/7)<=36 && list[i].day_age%7==0){
						  xNames.push(parseInt(list[i].day_age/7));
							highLux.push(list[i].high_lux );
							lowLux.push(list[i].low_lux );
							setLux.push(list[i].set_lux );
							var time1 = new Date(list[i].start_time);
							var time2 = new Date(list[i].end_time);
							var hour1 = time1.getHours();
							var hour2 = time2.getHours();
							timeList.push(hour2-hour1);
							timeList2.push(hour1);
							list10.push(list[i]);
						  }
					  }else if(num==60){
						  if(parseInt(list[i].day_age/7)>36 && parseInt(list[i].day_age/7)<=60 && list[i].day_age%7==0){
							  xNames.push(parseInt(list[i].day_age/7));
								highLux.push(list[i].high_lux );
								lowLux.push(list[i].low_lux );
								setLux.push(list[i].set_lux );
								var time1 = new Date(list[i].start_time);
								var time2 = new Date(list[i].end_time);
								var hour1 = time1.getHours();
								var hour2 = time2.getHours();
								timeList.push(hour2-hour1);
								timeList2.push(hour1);
								list10.push(list[i]);
							  }
					  }else{
						  if(parseInt(list[i].day_age/7)>60 && list[i].day_age%7==0){
							  xNames.push(parseInt(list[i].day_age/7));
								highLux.push(list[i].high_lux );
								lowLux.push(list[i].low_lux );
								setLux.push(list[i].set_lux );
								var time1 = new Date(list[i].start_time);
								var time2 = new Date(list[i].end_time);
								var hour1 = time1.getHours();
								var hour2 = time2.getHours();
								timeList.push(hour2-hour1);
								timeList2.push(hour1);
								list10.push(list[i]);
							  }
					  }
					}					
				}
				
				alarmType5 = [{
		            name: '时间段',
		            data: timeList
		        },{ 
		            name: ' ',
		            data: timeList2,
		            color:'white'
		        }];
				yName='小时(Hour)';
				suffixName = 'Hour';
			}else if(alarmtype1=="3"){
				for (var i = 0; i < list.length; i++) {
					if(list[i].high_alarm_co2!=undefined){
					  if(num==16){
					xNames.push(parseInt(list[i].day_age/7+1));
					highAlarmCo2.push(list[i].high_alarm_co2 );
						if(parseInt(list[i].day_age/7)==16){
							break;
						}
					  }else if(num==36){
						  if(parseInt(list[i].day_age/7)>16 && parseInt(list[i].day_age/7)<=36){
							  xNames.push(parseInt(list[i].day_age/7+1));
							  highAlarmCo2.push(list[i].high_alarm_co2 );
						  }
					  }else if(num==60){
						  if(parseInt(list[i].day_age/7)>36 && parseInt(list[i].day_age/7)<=60){
							  xNames.push(parseInt(list[i].day_age/7+1));
							  highAlarmCo2.push(list[i].high_alarm_co2 );
						  }
					  }else{
						  if(parseInt(list[i].day_age/7)>60){
							  xNames.push(parseInt(list[i].day_age/7+1));
							  highAlarmCo2.push(list[i].high_alarm_co2 );
						  }
					  }
					}
				}
				alarmType5 = [{
		            name: 'CO2报警值',
		            data: highAlarmCo2,
		            color: 'blue'
		        }
//				,{
//		            name: 'CO2参考值',
//		            data: setCo2
//		        }
				];
				yName='CO2(PPM)';
				suffixName = 'PPM';
			}else if(alarmtype1=="4"){
				for (var i = 0; i < list.length; i++) {
					if(list[i].set_water_deprivation!=undefined){
					xNames.push(parseInt(list[i].day_age/7)+'周龄');
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
		  }
			device();
			if(alarmtype1=="2"){
				createChar2(yName,xNames,alarmType5);
//				createChar(suffixName,yName,xNames,alarmType5);
			}else{
			createChar(suffixName,yName,xNames,alarmType5);
			}
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
	            categories: xNames,
	            title: {
	                text: '单位：周龄'
	            }
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
	        legend: {
	            align: 'right',
	            x: 3,
	            verticalAlign: 'top',
	            y: -10,
	            floating: true,
	            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	            borderColor: '#CCC',
	            borderWidth: 1,
	            shadow: false
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
//	        legend: {
//	            layout: 'vertical',
//	            align: 'right',
//	            verticalAlign: 'middle',
//	            borderWidth: 0
//	        },
	        series: alarmType5
	    });
}

//创建光照报警堆叠柱状图
function createChar2(yName,xNames,alarmType5) {
	$('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: xNames,
            lineColor: '#197F07',
            title: {
                text: '单位：周龄'
            }
        },
        yAxis: {
            min: 0,
            gridLineWidth:'0px',
            lineColor: '#197F07',
            minorGridLineColor:'#197F07', 
            gridLineColor: '#197F07',
            gridLineWidth: 0,
            lineColor:'#197F07',
            tickWidth:10,
            tickLength:1,
            tickColor:'#197F07',
            title: {
                text: yName
            },
            tickInterval:1,
            max:24
        },
        legend: {
            align: 'right',
            x: 3,
            verticalAlign: 'top',
            y: -10,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
            	var setLux,highLux,lowLux;
            	for(var i=0;i<list10.length;i++){
            		if(parseInt(list10[i].day_age/7)==this.x){
            			setLux = list10[i].set_lux;
            			highLux = list10[i].high_lux;
            			lowLux = list10[i].low_lux;
            			break;
            		}
            	}
                if(this.series.color=='white'){
                    return;
                }else{
                    return '<b>' + this.x+'周龄' + '</b><br/>' +
                        this.series.name + ': ' + this.y
                        +'<br/>'+
                        '光照上限值:'+highLux
                        +'<br/>'+
                        '光照下限值:'+lowLux
                        +'<br/>'+
                        '光照参考值:'+setLux;
//                        + '<br/>' +
//                        'Total: ' + this.point.stackTotal;
                }
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        credits: {
            enabled: false
        },
        series: alarmType5
//        	[{
//            index:3,
//            name: ' ',
//            data: [5, 3, 4, 7, 2],
//            color:'white'
//        }, {index:2,
//            name: 'Jane',
//            data: [10, 2, 3, 2, 1]
//           }, {index:1,
//               name: ' ',
//               data: [3, 4, 4, 2, 5],
//               color:'white'
//              }]
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
    	deleteRow2 = deleteRow2+deleteRow[i].uid_num+","+deleteRow[i].day_age+";";
    }
    document.getElementById("reflushText").style.display="";
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
                querySBDayageSettingSub(16);
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
    $("#reflushText").css("display", "");
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
                if(paramTypeSelectValue !="Carbon") {
                    var dataJosn = $.parseJSON(JSON.stringify(obj));
                    $("#" + paramTypeSelectValue + "Table").bootstrapTable('load',dataJosn);
                } else if(obj.length != 0 && paramTypeSelectValue =="Carbon"){
                	var dataJosn = $.parseJSON(JSON.stringify(obj));
                    $("#" + paramTypeSelectValue + "Table").bootstrapTable('load',dataJosn);
                    }else{              
                    initTableRow(paramTypeSelectValue, getTableEmptyRow(paramTypeSelectValue));
                }
                if(paramTypeSelectValue =="Carbon"){
                	$("#addData").css("display", "none");
                	$("#delData").css("display", "none");
                	$("#upData").css("display", "none");
                	$("#upData2").css("display", "");
                }
                else{
                	$("#addData").css("display", "");
                	$("#delData").css("display", "");
                	$("#upData").css("display", "");
                	$("#upData2").css("display", "none");
                }
                var obj1 = result.obj1;
                if(obj1 != ""){
                 document.getElementById('alarm_delay').value= obj1.alarm_delay;
	       		 document.getElementById('temp_cpsation').value= obj1.temp_cpsation;
	       		 document.getElementById('yincang').value= obj1.alarm_probe;
	       		 document.getElementById('temp_cordon').value= obj1.temp_cordon;
	       		document.getElementById('point_alarm').value= obj1.point_alarm;
                }
//                showTableToolBar(paramTypeSelectValue);
                querySBDayageSettingSub(16);
                if($("#orgId" + count0rg).val().split(",")[3]=="1"){
                	document.getElementById("one").style.display="none";
                	document.getElementById("two").style.display="none";
                	document.getElementById("three").style.display="none";
                	document.getElementById("fine").style.display="none";
                }else{
                	document.getElementById("one").style.display="";
                	document.getElementById("two").style.display="";
                	document.getElementById("three").style.display="";
                	document.getElementById("fine").style.display="";
                }
            }
        }
    });
    document.getElementById("reflushText").style.display="none";
	
}

//根据栋舍查询设备
function device(){
	$.ajax({
        url: path+"/alarm/device",
        data: {"houseId":$("#orgId" + count0rg).val().split(",")[1]},
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {
        	var list = result.obj;
        	$("#device_code option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#device_code").append("<option value=" + list[i].device_code + ">" + list[i].device_name+ "</option>");
			}
			insideTemp();
        }
    });
}

//根据栋舍查询探头
function insideTemp(){
	$.ajax({
        url: path+"/alarm/insideTemp",
        data: {"houseId":$("#orgId" + count0rg).val().split(",")[1],"device_code":$("#device_code").val()},
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {
        	var list = result.obj;
        	$("#yincang2 div").remove();
			for (var i = 0; i < list.length; i++) {
				if(list[i].is_alarm == "Y"){
				$("#yincang2").append('<div class="span2"><label><input id="yincang2'+i+'" name="Fruit" checked = "checked" type="checkbox" onclick="xuanze2'+i+'();" value="' + list[i].biz_code + '">' + list[i].code_name+ '</label></div> ');
				}else{
				$("#yincang2").append('<div class="span2"><label><input id="yincang2'+i+'" name="Fruit" type="checkbox" onclick="xuanze2'+i+'();" value="' + list[i].biz_code + '">' + list[i].code_name+ '</label></div> ');
			
				}
			}
        }
    });
}

function xuanze20(){
	var is_alarm;
	if(document.getElementById("yincang20").checked==true){
		is_alarm = "Y";
	}else{
		is_alarm = "N";
	}
	$.ajax({
        url: path+"/alarm/updateDeviceSub",
        data: {"houseId":$("#orgId" + count0rg).val().split(",")[1],"device_code":$("#device_code").val(),"biz_code":$("#yincang20").val(),"is_alarm":is_alarm},
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {
        	var list = result.obj;
        
        }
    });
}

function xuanze21(){
	var is_alarm;
	if(document.getElementById("yincang21").checked==true){
		is_alarm = "Y";
	}else{
		is_alarm = "N";
	}
	$.ajax({
        url: path+"/alarm/updateDeviceSub",
        data: {"houseId":$("#orgId" + count0rg).val().split(",")[1],"device_code":$("#device_code").val(),"biz_code":$("#yincang21").val(),"is_alarm":is_alarm},
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {
        	var list = result.obj;
        
        }
    });
}

function xuanze22(){
	var is_alarm;
	if(document.getElementById("yincang22").checked==true){
		is_alarm = "Y";
	}else{
		is_alarm = "N";
	}
	$.ajax({
        url: path+"/alarm/updateDeviceSub",
        data: {"houseId":$("#orgId" + count0rg).val().split(",")[1],"device_code":$("#device_code").val(),"biz_code":$("#yincang22").val(),"is_alarm":is_alarm},
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {
        	var list = result.obj;
        
        }
    });
}

function xuanze23(){
	var is_alarm;
	if(document.getElementById("yincang23").checked==true){
		is_alarm = "Y";
	}else{
		is_alarm = "N";
	}
	$.ajax({
        url: path+"/alarm/updateDeviceSub",
        data: {"houseId":$("#orgId" + count0rg).val().split(",")[1],"device_code":$("#device_code").val(),"biz_code":$("#yincang23").val(),"is_alarm":is_alarm},
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {
        	var list = result.obj;
        
        }
    });
}

function xuanze24(){
	var is_alarm;
	if(document.getElementById("yincang24").checked==true){
		is_alarm = "Y";
	}else{
		is_alarm = "N";
	}
	$.ajax({
        url: path+"/alarm/updateDeviceSub",
        data: {"houseId":$("#orgId" + count0rg).val().split(",")[1],"device_code":$("#device_code").val(),"biz_code":$("#yincang24").val(),"is_alarm":is_alarm},
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {
        	var list = result.obj;
        
        }
    });
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
        	updateRow2 = updateRow2+updateRow[i].uid_num+","+updateRow[i].farm_id+","+updateRow[i].house_id+","+updateRow[i].day_age+","+
        	updateRow[i].set_lux+","+updateRow[i].high_lux+","+updateRow[i].low_lux+","+updateRow[i].start_time+","+updateRow[i].end_time+";";
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
    		alarm_probe: $("#yincang").val(),
    		temp_cordon: $("#temp_cordon").val(),
    		alarm_type:$("#alarmType").val(),
    		point_alarm:$("#point_alarm").val(),
    		updateRow: updateRow2
        };
    $("#reflushText").css("display", "");
	$.ajax({
        // async: true,
        url: path+"/alarm/updateAlarm",
        data: p,
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {
        	querySBDayageSettingSub(16);
        	var obj = result.obj;
            initTable(paramTypeSelectValue, getTableDataColumns(paramTypeSelectValue), []);
            if(null != obj) {
                var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#"+paramTypeSelectValue+"Table").bootstrapTable('load',dataJosn);
            } else{
                initTableRow(paramTypeSelectValue, getTableEmptyRow(paramTypeSelectValue));
            }
            $("#reflushText").css("display", "none");
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
    		alarm_probe: $("#yincang").val(),
    		temp_cordon: $("#temp_cordon").val(),
    		point_alarm:$("#point_alarm").val(),
    		farmId:$("#orgId" + (count0rg - 1)).val().split(",")[1],
     	    houseId:$("#orgId" + count0rg).val().split(",")[1],
     	    alarm_type:$("#alarmType").val()
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
	       		 document.getElementById('yincang').value= obj.alarm_probe;
	       		 document.getElementById('temp_cordon').value= obj.temp_cordon;
	       		document.getElementById('point_alarm').value= obj.point_alarm;
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
        title: "周龄",
        editable: {
            type: 'text',
            title: '周龄',
            mode: 'inline',
            setValue: null,
            validate: function (v) {
                if (!v) return '周龄不能为空';
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
    }, {
        field: "hours",
        title: "开启时长",
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
        visible: false,
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
        formatter: function(value,row,index){
        	if(value ==undefined){
        		return "-";
        	}else{
        		return value;
        	}
        },
        width: '18%'
    }, {
        field: "set_co2",
        title: "CO2参考值",
        visible: false,
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

/** 二氧化碳保存功能按键 **/
function upAndAdd(){
	var param;
	var dage;
	var updateRow;
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
    if($("#orgId" + count0rg).val().split(",")[3]=="1"){
    	dage = 175;
    }else{
    	dage = 455;
    }
	param = {
			day_age: dage,
			farmId: $("#orgId" + (count0rg - 1)).val().split(",")[1],
			houseId: $("#orgId" + count0rg).val().split(",")[1],
			alarm_type: $("#alarmType").val(),
			set_co2: 0,//updateRow[0].set_co2,
			high_alarm_co2: updateRow[0].high_alarm_co2
    };
	
	$.ajax({
		url : path + "/alarm/addAlarm",
		data : param,
		type : "POST",
		dataType : "json",
		success : function(result) {
			search();
			layer.close(index); 
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


/****弹出新增窗口*****/
function openAdjustWin(hourList){
	var p;
	var str = '<div style="padding-left: 10px;">&nbsp;</div>';
	    str+='<div style="padding-left: 20px;font-size:14px; width: 510px;"><span style="display:block;width: 110px;float:left;margin-left:30px;">农场:</span><span style="display:block;width: 110px;float:left;margin-left:-70px;">'+$("#orgId" + (count0rg - 1)).val().split(",")[2]+'</span> ';
	    str+='<span style="display:block;width: 110px;float:left;margin-left:70px;">栋舍:</span><span style="display:block;width: 110px;float:left;margin-left:-70px;">'+$("#orgId" + count0rg).val().split(",")[2]+'</span>';
	    if($("#alarmType").val() == "2"){
	    	str+='<span style="display:block;width: 50px;float:left;margin-left:60px;">周龄:<input type="text" style="width: 100px;margin-top: -30px;margin-left:33px;" name="day_age" id="day_age" value="0"/></span></div>';
	    }else {
	    	str+='<span style="display:block;width: 50px;float:left;margin-left:60px;">日龄:<input type="text" style="width: 100px;margin-top: -30px;margin-left:33px;" name="day_age" id="day_age" value="0"/></span></div>';
	    }
//	    str+='<span style="display:block;width:60px;float:left;text-align: right;">报警类别:&nbsp;&nbsp; <select style="width: 100px;margin-top: 5px;" name="alarm_type" id="alarmType" value=""/></select></span>';
	    str+='<div style="padding-left: 15px;font-size:14px; width: 680px;padding-top: 20px;margin-top: 30px;">';
	    if($("#alarmType").val() == "1") {
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:7px;">目标温度:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:60px;" name="set_temp" id="set_temp" value="0"/></span> ';   
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:110px;">高报温度:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:60px;" name="high_alarm_temp" id="high_alarm_temp" value="0"/></span> ';   
	    	 str+='<span style="display:block;width: 70px;float:left;margin-left:100px;">低报温度:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:60px;" name="low_alarm_temp" id="low_alarm_temp" value="0"/></span></div> ';   
	         p=['730px', '210px'];
	    }else if($("#alarmType").val() == "2"){
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:-6px;">光照上限制:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="high_lux" id="high_lux" value="0"/></span> ';   
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:110px;">光照下限制:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="low_lux" id="low_lux" value="0"/></span> ';   
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:100px;">光照参照值:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="set_lux" id="set_lux" value="0"/></span></div> ';
	         str+='<div style="padding-left: 15px;font-size:14px; width: 510px;padding-top: 20px;margin-top: 20px;">';
	         str+='<span style="display:block;width: 110px;float:left;margin-left:7px;">开始时间:&nbsp;&nbsp; ';
	         str += "<select id='start_time' style='width: 115px;margin-top: -30px;margin-left:60px;' class='m-wrap span12' tabindex='1' name='start_time'>";
//	         hourList = hourList.replace(/=/g,':');
	         var myobj=hourList.split("=");
				for (var j = 0; j < myobj.length; j++) {
					if(myobj[j].indexOf("code_name") > 0 ){
						 str +="<option value=" + myobj[j+1].split(",")[0] +">" + myobj[j+1].split(",")[0] + "</option>";
					}
						
				}
	         str+='</select></span> ';
	         str+='<span style="display:block;width: 110px;float:left;margin-left:110px;">结束时间:&nbsp;&nbsp;'; 
	         str += "<select id='end_time' style='width: 115px;margin-top: -30px;margin-left:60px;' class='m-wrap span12' tabindex='1' name='end_time'>";
				for (var j = 0; j < myobj.length; j++) {
					if(myobj[j].indexOf("code_name") > 0 ){
						 str +="<option value=" + myobj[j+1].split(",")[0] +">" + myobj[j+1].split(",")[0] + "</option>";
					}
						
				}
	         str+='</select></span></div> ';
	         p=['730px', '260px'];
	    }else if($("#alarmType").val() == "3"){
	    	str+='<span style="display:block;width: 110px;float:left;margin-left:-7px;">CO2报警值:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="high_alarm_co2" id="high_alarm_co2"/></span> ';     
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:110px;">CO2参考值:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="set_co2" id="set_co2"/></span></div> ';
	    	 p=['730px', '210px'];
	    }
	    str+='<div style="padding-left: 15px;font-size:14px; width: 510px;padding-top: 20px;"><label style="padding-left: 110px;color: red; width:500px; text-align: center;margin-top: 25px;" id="addAlarm_msg"></label></div>';
	layer.open({
		  type: 1,
		  skin: 'layui-layer-lan', //加上边框
		  area: p, //宽高
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
						set_lux: $("#set_lux").val(),
						start_time:$("#start_time").val(),
						end_time:$("#end_time").val()
		        };
			}else {
//				param = {
//						day_age: $("#day_age").val(),
//						farmId: $("#orgId" + (count0rg - 1)).val().split(",")[1],
//						houseId: $("#orgId" + count0rg).val().split(",")[1],
//						alarm_type: $("#alarmType").val(),
//						high_alarm_co2: $("#high_alarm_co2").val(),
//						set_co2: $("#set_co2").val()
//		        };
				var updateRow;
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
				param = {
						day_age: updateRow[0].day_age,
						farmId: $("#orgId" + (count0rg - 1)).val().split(",")[1],
						houseId: $("#orgId" + count0rg).val().split(",")[1],
						alarm_type: $("#alarmType").val(),
						high_alarm_co2: updateRow[0].high_alarm_co2
		        };
			}			
			$("#reflushText").css("display", "");
			$.ajax({
				url : path + "/alarm/addAlarm",
				data : param,
				type : "POST",
				dataType : "json",
				success : function(result) {
					$("#reflushText").css("display", "none");
					search();
					layer.close(index); 
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














