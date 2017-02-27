//var tickInterval=7;
var count0rg;
var num;
var paramTypeList = new Array("TemperatureCurve","NegativePressure","Carbon","Water");
var paramTypeSelectValue = null;
var pSize = null;
var num3=0;
var dage;
var asyncFlag = false;
var config={};
var config2=true;

var ytlength = 0;
var objAlarmHouse = new Object();
function initObjAlarmHouse(){
	objAlarmHouse.device_code = $("#device_code").val();
	objAlarmHouse.alarm_probe = $("#yincang").val();
	objAlarmHouse.point_alarm = $("#point_alarm").val();
	objAlarmHouse.temp_cordon = $("#temp_cordon").val();
	objAlarmHouse.alarm_delay = $("#alarm_delay").val();
	for(var i=0;i<ytlength;i++){
		var yincang ="yincang2"+i;
			objAlarmHouse[yincang] = document.getElementById("yincang2"+i).checked;
		
	}
};

jQuery(document).ready(function() {
	App.init();
    if(at != '' && at != null){
        document.getElementById('alarmType').value = at;
    }

    $("#temperature").click(function () {
        document.getElementById('alarmType').value= "1";
//        document.getElementById("colorCard").style.display="none";
        search();
    });
    $("#negativePressure").click(function () {
        document.getElementById('alarmType').value= "2";
//        document.getElementById("colorCard").style.display="";
        search();
    });
    $("#carbon").click(function () {
        document.getElementById('alarmType').value= "3";
//        document.getElementById("colorCard").style.display="none";
        search();
    });
    initHelp();
    
    config = {
//    		alarmCloseFlag: config2
//					,
					alarmCloseMsg:"尚未保存设置，请确认是否关闭当前页！"
    				,run: function(){
    					var rt = false;
    					var a =0;
    					var updateRow = new Array();
    					var updateRow3;
    					updateRow3=$('#'+paramTypeSelectValue+'Table').bootstrapTable('getData');
    					for(var i=0;i<updateRow3.length;i++){
    						if(typeof(updateRow3[i].checked) !='undefined'){
    							updateRow[a]=updateRow3[i];
    							a++;
    						}
    					}
    					
    					var j=0;
    			    	for(var i=0;i<ytlength;i++){
    			    		var yincang ="yincang2"+i;
    			    		if(objAlarmHouse[yincang] == document.getElementById("yincang2"+i).checked){
    			    			j++;
    			    		}
    			    	}
    					
    					if (a!=0 || objAlarmHouse.device_code != $("#device_code").val() || objAlarmHouse.alarm_probe != $("#yincang").val() || objAlarmHouse.point_alarm != $("#point_alarm").val() ||
    						    objAlarmHouse.temp_cordon != $("#temp_cordon").val() || objAlarmHouse.alarm_delay != $("#alarm_delay").val() || j!=ytlength) {
    						config2 = false;
    					}
    					  					
    					if(config2==false){
                            layer.confirm(this.alarmCloseMsg, {
                                skin: 'layui-layer-lan'
                                , closeBtn: 0
                                , shift: 4 //动画类型
                            }, function ok() {
								rt = true;
                                getMenuTabObj().close(menuId);
                            });
						}else{
							getMenuTabObj().close(menuId);
						}
    					
						return rt;
					}};
    setGlobalObj(menuId,config);
//    $('#'+paramTypeSelectValue+'Table').editable().change(function(){
//    $(".editable-submit").click(function(){  
//        alert("刷新表格视图");  
//    });  
//    }); 
});

function setAlarmCloseFlag(v){
	config.alarmCloseFlag = v;
};

function initHelp(){
    help.size = ['600px', '400px'];
    help.context = document.getElementById("helpContext").innerHTML;
}

function OrgSearch(count0rg,num){
	if("" != corporation_id){
		var select = document.getElementById("orgId"+(count0rg-2));
		if(null != select && "undefined" != select){
                for(var i=0; i<select.options.length; i++){
                    var corporation = select.options[i].value;
                    var strs= new Array();
                    strs = corporation.split(",");
                    if(strs[0] == corporation_id){
                        corporation_id="";
                        select.options[i].selected = true;
                        select.onchange();
                        break;
                    }
			}
		}
        corporation_id="";
	} else {
        if ("" != farm_id) {
            var select2 = document.getElementById("orgId" + (count0rg - 1));
            if (null != select2 && "undefined" != select2) {
                for (var i = 0; i < select2.options.length; i++) {
                    var farm = select2.options[i].value;
                    var strs2 = new Array();
                    strs2 = farm.split(",");
                    if (strs2[0] == farm_id) {
                        farm_id = "";
                        select2.options[i].selected = true;
                        select2.onchange();
                        break;
                    }
                }
            }
            farm_id = "";
        } else {
            if ("" != house_id) {
                var select3 = document.getElementById("orgId" + (count0rg));
                if (null != select3 && "undefined" != select3) {
                    for (var i = 0; i < select3.options.length; i++) {
                        var house = select3.options[i].value;
                        var strs3 = new Array();
                        strs3 = house.split(",");
                        if (strs3[0] == house_id) {
                            house_id = "";
                            select3.options[i].selected = true;
                            select3.onchange();
                            search();
                            break;
                        }
                    }
                }
                house_id = "";

            } else {
                if ("" == corporation_id && "" == farm_id && "" == house_id) {
                    search();
                }
            }
        }
    }
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
	if($("#orgId" + count0rg).val().split(",")[3]=="1"){
    	dage = 175;
    }else{
    	dage = 455;
    }
	layer.open({
		type: 2, 
		title: "应用至",
		skin: 'layui-layer-lan',
		area: ['550px', '200px'],
	    content: path+"/alarm/applyAlarmUrl?farmId="+$("#orgId" + (count0rg - 1)).val().split(",")[1]+"&houseId="+$("#orgId" + count0rg).val().split(",")[1]+
	    "&alarm_type="+$("#alarmType").val()+"&dage="+dage
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
		title: "设置报警通知人员",
		skin: 'layui-layer-lan',
		area: ['380px', '270px'],
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
					layer.msg(result.msg, function(index) {
						location.reload();
					});
				} else {
					layer.msg(result.msg);
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
			var alarmType5 =new Array();
			var yName = '';
			var suffixName = '';
			var cans=3;
			var list10 = new Array();
			if($("#orgId" + count0rg).val().split(",")[3]=="1"){
				if(alarmtype1=="1"){
					for (var i = 0; i < list.length; i++) {
						if(list[i].set_temp!=undefined){
							xNames.push(parseInt(list[i].day_age/7+1));
							if(parseInt(list[i].day_age/7)==25){
								break;
							}		
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
				            color: 'red'
				        }, {
				            name: '低报温度',
				            data: lowAlarmTemp,
				            color: 'blue'
				        }];
						yName = '温度(°C)';
						suffixName = '°C';
					}else if(alarmtype1=="2"){
						for (var i = 0; i < list.length; i++) {
							if(list[i].high_lux!=undefined){
								if(list[i].day_age%7==0){
									xNames.push(parseInt(list[i].day_age/7));
								}
								if(parseInt(list[i].day_age/7)==26){
									break;
								}
								if(list[i].day_age%7==0){
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
				            name: '0-20',
				            data: timeList,
				            color:'#FFFEF0'
				        },{ 
				            name: '20-40',
				            color:'#FFFCC6'
				        },{
				        	name: '40-60',
				        	color:'#FFFAA1'
				        },{
				        	name:'60-80',
				        	color:'#FFF87D'
				        },{
				        	name:'80-100',
				        	color:'#FFF761'
				        },{
				        	name:'100+',
				        	color:'#FFF53E'
				        },{ 
				            name: ' ',
				            data: timeList2,
				            color:'#FFF'
				        }];
						yName='小时(Hour)';
						suffixName = 'Hour';
					}else if(alarmtype1=="3"){
						for (var i = 0; i < list.length; i++) {
							if(list[i].high_alarm_co2!=undefined){
								xNames.push(parseInt(list[i].day_age/7+1));
								if(parseInt(list[i].day_age/7)==25){
									break;
								}
							highAlarmCo2.push(list[i].high_alarm_co2 );
							}
						}
						alarmType5 = [{
				            name: 'CO2报警值',
				            data: highAlarmCo2,
				            color: 'red'
				        }
						];
						yName='CO2(PPM)';
						suffixName = 'PPM';
						cans = 300;
					}
			}else{
			if(alarmtype1=="1"){
			for (var i = 0; i < list.length; i++) {
				if(list[i].set_temp!=undefined){
				  if(num==20){
					  if(parseInt(list[i].day_age/7)==20){
							break;
						}
					xNames.push(parseInt(list[i].day_age/7+1));
					setTemp.push(list[i].set_temp);
					highAlarmTemp.push(list[i].high_alarm_temp );
					lowAlarmTemp.push(list[i].low_alarm_temp );
				  }else if(num==40){
						if(parseInt(list[i].day_age/7)>20 && parseInt(list[i].day_age/7)<=40){
						xNames.push(parseInt(list[i].day_age/7));
						setTemp.push(list[i].set_temp);
						highAlarmTemp.push(list[i].high_alarm_temp );
						lowAlarmTemp.push(list[i].low_alarm_temp );
						}
					}else if(num==60){
						if(parseInt(list[i].day_age/7)>40 && parseInt(list[i].day_age/7)<=60){
							xNames.push(parseInt(list[i].day_age/7));
							setTemp.push(list[i].set_temp);
							highAlarmTemp.push(list[i].high_alarm_temp );
							lowAlarmTemp.push(list[i].low_alarm_temp );
							}
					}else{
						if(parseInt(list[i].day_age/7)>60){
							xNames.push(parseInt(list[i].day_age/7));
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
		            color: 'red'
		        }, {
		            name: '低报温度',
		            data: lowAlarmTemp,
		            color: 'blue'
		        }];
				yName = '温度(°C)';
				suffixName = '°C';
			}else if(alarmtype1=="2"){
				for (var i = 0; i < list.length; i++) {
					if(list[i].high_lux!=undefined){
					  if(num==20){
						  if(parseInt(list[i].day_age/7)==20){
								break;
							}
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
					  }else if(num==40){
						  if(parseInt(list[i].day_age/7)>20 && parseInt(list[i].day_age/7)<=40 && list[i].day_age%7==0){
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
						  if(parseInt(list[i].day_age/7)>40 && parseInt(list[i].day_age/7)<=60 && list[i].day_age%7==0){
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
					  if(num==20){
						  if(parseInt(list[i].day_age/7)==20){
								break;
							}
					xNames.push(parseInt(list[i].day_age/7+1));
					highAlarmCo2.push(list[i].high_alarm_co2 );
						
					  }else if(num==40){
						  if(parseInt(list[i].day_age/7)>20 && parseInt(list[i].day_age/7)<=40){
							  xNames.push(parseInt(list[i].day_age/7+1));
							  highAlarmCo2.push(list[i].high_alarm_co2 );
						  }
					  }else if(num==60){
						  if(parseInt(list[i].day_age/7)>40 && parseInt(list[i].day_age/7)<=60){
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
		            color: 'red'
		        }
//				,{
//		            name: 'CO2参考值',
//		            data: setCo2
//		        }
				];
				yName='CO2(PPM)';
				suffixName = 'PPM';
				cans = 300;
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
				createChar2(yName,xNames,alarmType5,list10);
//				createChar(suffixName,yName,xNames,alarmType5);
			}else{
				createChar(suffixName,yName,xNames,alarmType5,cans);
			}
		}
	});
}

//创建报警曲线图
function createChar(suffixName,yName,xNames,alarmType5,cans) {
	 $('#container').highcharts({
		 chart: {
			  borderColor: '#c7c5c5',
              borderWidth: 1,
	          type: 'spline'
         },
	        title: {
	            text: '',
	            x: 0 //center
	        },
	        xAxis: {
	        	tickInterval: 7,      	
	            categories: xNames,
	            title: {
	                text: '周龄'
	            }
	        },
	        credits: {
	            enabled: false
	       },
	       // height: 300,
	        yAxis: {
	        	 min: 0,
		            gridLineWidth:'0px',
//		            lineColor: '#197F07',
//		            minorGridLineColor:'#197F07', 
//		            gridLineColor: '#197F07',
		            gridLineWidth: 0,
//		            lineColor:'#197F07',
		            tickWidth:10,
		            tickLength:1,
//		            tickColor:'#197F07',
		            tickInterval:cans,
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
	            // x: 0,
	            verticalAlign: 'top',
	            // y: 0,
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

    var chart = $('#container').highcharts();
    chart.reflow();
}

//创建光照报警堆叠柱状图
function createChar2(yName,xNames,alarmType5,list10) {
	$('#container').highcharts({
        chart: {
            borderColor: '#c7c5c5',
            borderWidth: 1,
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
            y: 0,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 0,
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
//                        this.series.name + ': ' + this.y
//                        +'<br/>'+
                        '光照上限值:'+highLux
                        +'<br/>'+
                        '光照下限值:'+lowLux
                        +'<br/>'+
                        '光照目标值:'+setLux;
//                        + '<br/>' +
//                        'Total: ' + this.point.stackTotal;
                }
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color:  'white'
                    
                }
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
    }, function (chart) {
        SetEveryOnePointColor(chart,list10);
    });
    var chart = $('#container').highcharts();
    chart.reflow();
}

//定义一个全局颜色数组
var colorArr = ['#FFFEF0', '#FFFCC6', '#FFFAA1', '#FFF87D', '#FFF761','#FFF53E'];

//设置每一个数据点的颜色值
function SetEveryOnePointColor(chart,list10) {            
    //获得第一个序列的所有数据点
    var pointsList = chart.series[0].points;
    //遍历设置每一个数据点颜色
    for (var i = 0; i < pointsList.length; i++) {
    	var colorArr2;
    	if(list10[i].set_lux<=0){
    		colorArr2='#fff';
    	}else if(0<list10[i].set_lux && list10[i].set_lux<=20){
    		colorArr2 = colorArr[0];
    	}else if(20<list10[i].set_lux && list10[i].set_lux<=40){
    		colorArr2 = colorArr[1];
    	}else if(40<list10[i].set_lux && list10[i].set_lux<=60){
    		colorArr2 = colorArr[2];
    	}else if(60<list10[i].set_lux && list10[i].set_lux<=80){
    		colorArr2 = colorArr[3];
    	}else if(80<list10[i].set_lux && list10[i].set_lux<=100){
    		colorArr2 = colorArr[4];
    	}else{
    		colorArr2 = colorArr[5];
    	}
        chart.series[0].points[i].update({
            color: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 }, //横向渐变效果 如果将x2和y2值交换将会变成纵向渐变效果
                stops: [
                            [0, Highcharts.Color(colorArr2).setOpacity(1).get('rgba')],
//                            [1, 'rgb(255, 255, 255)'],
                            [0, Highcharts.Color(colorArr2).setOpacity(1).get('rgba')]
                        ]  
            }
        });
    }
}

//function checkAll() {
//	
//    var checkBoxes = document.getElementsByName("checkedSBDayageSettingSubId");
//    for (var i = 0; i < checkBoxes.length; i++) {
//        checkBoxes[i].checked = true;
//    }
//}

//删除
function batchChange(num){
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
    deleteRow = $('#'+paramTypeSelectValue+'Table').bootstrapTable('getRowByUniqueId',parseInt(num));
    if(deleteRow==null||deleteRow==''){
		 layer.msg('请选择要删除的数据!');
		 return;
	 }
    
//    for(var i = 0; i < deleteRow.length; i++){
    	deleteRow2 = deleteRow2+deleteRow.id+","+deleteRow.day_age+";";
//    }
    // document.getElementById("reflushText").style.display="";
    	//获取可设置日龄的最大值
        if($("#orgId" + count0rg).val().split(",")[3]=="1"){
        	dage = 175;
        }else{
        	dage = 455;
        }
        layer.confirm('是否确认？', {
            skin: 'layui-layer-lan'
            , closeBtn: 0
            , shift: 4 //动画类型
        }, function ok() {
	$.ajax({
        // async: true,
        url: path+"/alarm/deleteAlarm",
        data: {"deleteRow":deleteRow2,
        	   "farmId":$("#orgId" + (count0rg - 1)).val().split(",")[1],
        	   "houseId":$("#orgId" + count0rg).val().split(",")[1],
        	   "alarm_type":$("#alarmType").val(),"dage":dage},
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
                querySBDayageSettingSub(20);
                layer.msg("删除成功");
            	return;
        }
    });
        	
	});
	// document.getElementById("reflushText").style.display="none";
}

//检索
function search(){
	changeFrame();
    var p = {
        farmId: $("#orgId" + (count0rg - 1)).val().split(",")[1],
        houseId: $("#orgId" + count0rg).val().split(",")[1],
        alarm_type: $("#alarmType").val()
    };
    // $("#reflushText").css("display", "");
    $.ajax({
        // async: true,
        url: path+"/alarm/queryAlarm2",
        data: p,
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {
            document.getElementById("msgLoad").style.display = "none";

            // document.getElementById("toolbarButton").style.display = "block";

            if(result.success==false){
                document.getElementById(paramTypeSelectValue + 'Table').style.display="none";
//                hideTableToolBar();
                layer.msg(result.msg);
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
                    document.getElementById("upData").style.display = "none";
                }
                else{
                	$("#addData").css("display", "");
                	$("#delData").css("display", "");
                	 $("#upData").css("display", "");
                	 $("#upData2").css("display", "none");
                    document.getElementById("upData").style.display = "inline";
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
                if($("#orgId" + count0rg).val().split(",")[3]=="1"){
                	document.getElementById("user_date_table").style.display="none";
                	document.getElementById("one").style.display="none";
                	document.getElementById("two").style.display="none";
                	document.getElementById("three").style.display="none";
                	document.getElementById("fine").style.display="none";
                }else{
                    document.getElementById("user_date_table").style.display="";
                	document.getElementById("one").style.display="";
                	document.getElementById("two").style.display="";
                	document.getElementById("three").style.display="";
                	document.getElementById("fine").style.display="";
                }
                document.getElementById("btnApply").style.display = "inline";
                document.getElementById("btnDesc").style.display = "inline";
                querySBDayageSettingSub(20);
            }
        }
    });
    // document.getElementById("reflushText").style.display="none";
	
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
        	if(list.length==0){
        		$("#yincang2").append('<div>请先绑定设备</div>');
        		ytlength = list.length;
        	}else{
        		var str = "<div>";
        		ytlength = list.length;
        		for (var i = 0; i < list.length; i++) {
    				if(list[i].is_alarm == "Y"){
    					str += '<input id="yincang2'+i+'" name="Fruit" checked = "checked" type="checkbox" value="' + list[i].biz_code + '">' + list[i].code_name+ '';
    					str += '&nbsp;';
    				}else{
    					str += '<input id="yincang2'+i+'" name="Fruit" type="checkbox" value="' + list[i].biz_code + '">' + list[i].code_name+ ' ';
                        str += '&nbsp;';
    				}
    			}
    			str+="</div>";
                $("#yincang2").append(str);
        	}
        	initObjAlarmHouse();
        }
    });
}

function xuanze2(num){
	var is_alarm;
	if(document.getElementById("yincang2"+num).checked==true){
		is_alarm = "Y";
	}else{
		is_alarm = "N";
	}
	$.ajax({
        url: path+"/alarm/updateDeviceSub",
        data: {"houseId":$("#orgId" + count0rg).val().split(",")[1],"device_code":$("#device_code").val(),"biz_code":$("#yincang2"+num).val(),"is_alarm":is_alarm},
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
    $("#upData").attr("disabled", true);
	var updateRow = new Array();
	var updateRow3;
	var updateRow2="";
	var a =0;
//	updateRow =$('#'+paramTypeSelectValue+'Table').bootstrapTable('getRowByUniqueId',parseInt(num3));
//	$('#'+paramTypeSelectValue+'Table').bootstrapTable('getRowByUniqueId',parseInt(num3)).checked = true;
	updateRow3=$('#'+paramTypeSelectValue+'Table').bootstrapTable('getData');
//	updateRow = $('#' + paramTypeSelectValue + 'Table').bootstrapTable('getSelections');
//	return;
	for(var i=0;i<updateRow3.length;i++){
		if(typeof(updateRow3[i].checked) !='undefined'){
			updateRow[a]=updateRow3[i];
			a++;
		}
	}
	var test = parseInt($("#point_alarm").val());
    if (isNaN(test)){
        layer.msg("点温差报警必须是数字，请重新输入!");
    }
    test = parseInt($("#temp_cordon").val());
    if (isNaN(test)){
        layer.msg("温度补偿必须是数字，请重新输入!");
    }
	var ttpd = 0;
    if (a==0 && objAlarmHouse.device_code == $("#device_code").val() && objAlarmHouse.alarm_probe == $("#yincang").val() && objAlarmHouse.point_alarm == $("#point_alarm").val() &&
	    objAlarmHouse.temp_cordon == $("#temp_cordon").val() && objAlarmHouse.alarm_delay == $("#alarm_delay").val()) {
    	var j=0;
    	for(var i=0;i<ytlength;i++){
    		var yincang ="yincang2"+i;
    		if(objAlarmHouse[yincang] == document.getElementById("yincang2"+i).checked){
    			j++;
    		}else{
    			xuanze2(i);
    			ttpd++;
    			objAlarmHouse[yincang] = document.getElementById("yincang2"+i).checked;
    		}
    	}
    	if(ttpd>0){
    		saveSbHouseAlarmHis();
    	}
    	if(j==ytlength){
    		$("#upData").attr("disabled", false);
    		layer.msg('未修改数据，无法保存!');
    	    return;
    	}else{
    		$("#upData").attr("disabled", false);
    		config2 = true;
    		layer.msg('保存成功!');
    	    return;
    	}
    }else if(a==0){
    	updateHouseAlarm();
    	objAlarmHouse.device_code = $("#device_code").val();
    	objAlarmHouse.alarm_probe = $("#yincang").val();
    	objAlarmHouse.point_alarm = $("#point_alarm").val();
    	objAlarmHouse.temp_cordon = $("#temp_cordon").val();
    	objAlarmHouse.alarm_delay = $("#alarm_delay").val();
    	for(var i=0;i<ytlength;i++){
    		var yincang ="yincang2"+i;
    		if(objAlarmHouse[yincang] != document.getElementById("yincang2"+i).checked){
    			xuanze2(i);
    			objAlarmHouse[yincang] = document.getElementById("yincang2"+i).checked;
    		}
    	}
    	saveSbHouseAlarmHis();
    	$("#upData").attr("disabled", false);
    	config2=true;
    		layer.msg('保存成功!');
    	    return;
    	
    	
    }else{
    	if (!(objAlarmHouse.device_code == $("#device_code").val() && objAlarmHouse.alarm_probe == $("#yincang").val() && objAlarmHouse.point_alarm == $("#point_alarm").val() &&
    		    objAlarmHouse.temp_cordon == $("#temp_cordon").val() && objAlarmHouse.alarm_delay == $("#alarm_delay").val())){
    		updateHouseAlarm();
    		objAlarmHouse.device_code = $("#device_code").val();
        	objAlarmHouse.alarm_probe = $("#yincang").val();
        	objAlarmHouse.point_alarm = $("#point_alarm").val();
        	objAlarmHouse.temp_cordon = $("#temp_cordon").val();
        	objAlarmHouse.alarm_delay = $("#alarm_delay").val();
    	} 
    	for(var i=0;i<ytlength;i++){
    		var yincang ="yincang2"+i;
    		if(objAlarmHouse[yincang] != document.getElementById("yincang2"+i).checked){
    			xuanze2(i);
    			ttpd++;
    			objAlarmHouse[yincang] = document.getElementById("yincang2"+i).checked;
    		}
    	}
    	if(!(objAlarmHouse.device_code == $("#device_code").val() && objAlarmHouse.alarm_probe == $("#yincang").val() && objAlarmHouse.point_alarm == $("#point_alarm").val() &&
    		    objAlarmHouse.temp_cordon == $("#temp_cordon").val() && objAlarmHouse.alarm_delay == $("#alarm_delay").val()) || ttpd>0){
    		saveSbHouseAlarmHis();
    	}
    	
    if($("#alarmType").val()==1){
    	for(var i = 0; i < a; i++){
        	updateRow2 = updateRow2+updateRow[i].id+","+updateRow[i].farm_id+","+updateRow[i].house_id+","+updateRow[i].day_age+","+
        	updateRow[i].set_temp+","+updateRow[i].high_alarm_temp+","+updateRow[i].low_alarm_temp+";";
        }
    }else if($("#alarmType").val()==2){
    	for(var i = 0; i < a; i++){
        	updateRow2 = updateRow2+updateRow[i].id+","+updateRow[i].farm_id+","+updateRow[i].house_id+","+updateRow[i].day_age+","+
        	updateRow[i].set_lux+","+updateRow[i].high_lux+","+updateRow[i].low_lux+","+updateRow[i].start_time+","+updateRow[i].end_time+";";
        }
    }else if($("#alarmType").val()==3){
    	for(var i = 0; i < a; i++){
        	updateRow2 = updateRow2+updateRow[i].id+","+updateRow[i].farm_id+","+updateRow[i].house_id+","+updateRow[i].day_age+","+
        	updateRow[i].set_co2+","+updateRow[i].high_alarm_co2+";";
        }
    }
    
    //获取可设置日龄的最大值
    if($("#orgId" + count0rg).val().split(",")[3]=="1"){
    	dage = 175;
    }else{
    	dage = 455;
    }
    
    var p = {
    		alarm_delay: $("#alarm_delay").val(),
    		temp_cpsation: $("#temp_cpsation").val(),
    		alarm_probe: $("#yincang").val(),
    		temp_cordon: $("#temp_cordon").val(),
    		alarm_type:$("#alarmType").val(),
    		point_alarm:$("#point_alarm").val(),
    		updateRow: updateRow2,
    		dage:dage
        };
    // $("#reflushText").css("display", "");
	$.ajax({
        // async: true,
        url: path+"/alarm/updateAlarm",
        data: p,
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {
        	querySBDayageSettingSub(20);
        	var obj = result.obj;
            initTable(paramTypeSelectValue, getTableDataColumns(paramTypeSelectValue), []);
            if(null != obj) {
                var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#"+paramTypeSelectValue+"Table").bootstrapTable('load',dataJosn);
            } else{
                initTableRow(paramTypeSelectValue, getTableEmptyRow(paramTypeSelectValue));
            }
            // $("#reflushText").css("display", "none");
        	if(result.success==false){
                // alert("保存失败！"+result.msg);
        		$("#upData").attr("disabled", false);
                layer.msg('保存失败！'+result.msg);
                return;
            } else {
                // var list = eval(result.obj);
            	$("#upData").attr("disabled", false);
            	config2=true;
                layer.msg('保存成功！');
                return;
            }
        
        }
    });
    }  
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

function saveSbHouseAlarmHis(){
	var alarm_sensor_no="";
	for(var i=0;i<ytlength;i++){
		var yincang ="yincang2"+i;
			if(objAlarmHouse[yincang] ==true){
				alarm_sensor_no = alarm_sensor_no+$("#yincang2"+i).val();
				if(i+1<ytlength){
					alarm_sensor_no = alarm_sensor_no+",";
				}
			}
		
	}
	var p = {
    		alarm_delay: $("#alarm_delay").val(),
    		temp_cpsation: $("#temp_cpsation").val(),
    		alarm_probe: $("#yincang").val(),
    		temp_cordon: $("#temp_cordon").val(),
    		point_alarm:$("#point_alarm").val(),
    		farmId:$("#orgId" + (count0rg - 1)).val().split(",")[1],
     	    houseId:$("#orgId" + count0rg).val().split(",")[1],
     	    alarm_type:$("#alarmType").val(),
     	    alarm_sensor_no:alarm_sensor_no
        };
	$.ajax({
        // async: true,
        url: path+"/alarm/saveSbHouseAlarmHis",
        data: p,
        type : "POST",
        dataType: "json",
        cache: false,
        success: function(result) {
                var obj = result.obj;
            
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
		help.hideHelp("block");
	}else if($("#alarmType").val()=="2"){
		paramTypeSelectValue = paramTypeList[1];
        help.hideHelp("none");
	}else if($("#alarmType").val()=="3"){
		paramTypeSelectValue = paramTypeList[2];
        help.hideHelp("none");
	}else if($("#alarmType").val()=="4"){
		paramTypeSelectValue = paramTypeList[3];
        help.hideHelp("none");
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
    	field : 'checked',
        checkbox: true,
        width: '5%',
		visible: false
    }, {
        field: "id",
        title: "ID",
        visible: false
    }, {
        field: "day_age",
        title: "日龄",
//        editable: {
//            type: 'text',
//            title: '日龄',
//            mode: 'inline',
//            setValue: null,
//            validate: function (v) {
//                if (!v) return '日龄不能为空';
//            }
//        },
        width: '5%'
    }, {
        field: "set_temp",
        title: "目标温度",
        editable: {
            type: 'text',
            title: '目标温度',
            mode: 'inline',
            validate: function (v) {
            	$('#'+paramTypeSelectValue+'Table').bootstrapTable('getRowByUniqueId',parseInt(num3)).checked = true;
                if (!v) return '目标温度不能为空';
                if(v<15 || v>35){
                	return '请输入15-35范围的数值';
                }
            },
            onblur: 'submit'
        },
        width: '20%'
    }, {
        field: "high_alarm_temp",
        title: "高报温度",
        editable: {
            type: 'text',
            title: '高报温度',
            mode: 'inline',
            validate: function (v) {
            	$('#'+paramTypeSelectValue+'Table').bootstrapTable('getRowByUniqueId',parseInt(num3)).checked = true;
                if (!v) return '高报温度不能为空';
                if(v<this.parentNode.parentNode.childNodes[1].innerText || v>40){
                	return '请输入'+this.parentNode.parentNode.childNodes[1].innerText+'-40范围的数值';
                }
            },
            onblur: 'submit'
        },
        width: '20%'
    }, {
        field: "low_alarm_temp",
        title: "低报温度",
        editable: {
            type: 'text',
            title: '低报温度',
            mode: 'inline',
            validate: function (v) {
            	$('#'+paramTypeSelectValue+'Table').bootstrapTable('getRowByUniqueId',parseInt(num3)).checked = true;
                if (!v) return '低报温度不能为空';
                if(v<10 || v>this.parentNode.parentNode.childNodes[1].innerText){
                	return '请输入10-'+this.parentNode.parentNode.childNodes[1].innerText+'范围的数值';
                }
            },
            onblur: 'submit'
        },
        width: '20%'
    }, {
        field: "opr",
        title: "操作",
		width: '35%',
		formatter: function(value,row,index){
            return '<button id=\'factToolbar_btn_delete\' type=\'button\' class=\'btn blue\' style="display: inline;" onclick="batchChange('+row.id+');">'+
			'<i class="icon-trash"></i>删除</button>';
        }
	}];
    return dataColumns;
}

function getNegaTableDataColumns(){
    var dataColumns = [{
        checkbox: true,
        width: '5%',
        visible: false
    }, {
        field: "id",
        title: "ID",
        visible: false
    }, {
        field: "day_age",
        title: "周龄",
//        editable: {
//            type: 'text',
//            title: '周龄',
//            mode: 'inline',
//            setValue: null,
//            validate: function (v) {
//                if (!v) return '周龄不能为空';
//            }
//        },
        width: '5%'
    }, {
        field: "high_lux",
        title: "光照上限制(Lux)",
        editable: {
            type: 'text',
            title: '光照上限制',
            mode: 'inline',
            validate: function (v) {
            	$('#'+paramTypeSelectValue+'Table').bootstrapTable('getRowByUniqueId',parseInt(num3)).checked = true;
                if (!v) return '光照上限制不能为空';
                if(v<this.parentNode.parentNode.childNodes[3].innerText || v>65){
                	return '请输入'+this.parentNode.parentNode.childNodes[3].innerText+'-65范围的数值';
                }
            },
            onblur: 'submit'
        },
        width: '15%'
    }, {
        field: "low_lux",
        title: "光照下限制(Lux)",
        editable: {
            type: 'text',
            title: '光照下限制',
            mode: 'inline',
            validate: function (v) {
            	$('#'+paramTypeSelectValue+'Table').bootstrapTable('getRowByUniqueId',parseInt(num3)).checked = true;
                if (!v) return '光照下限制不能为空';
                if(v<0 || parseFloat(v)>=parseFloat(this.parentNode.parentNode.childNodes[3].innerText)){
                	return '请输入0-'+this.parentNode.parentNode.childNodes[3].innerText+'范围的数值';
                }
            },
            onblur: 'submit'
        },
        width: '15%'
    }, {
        field: "set_lux",
        title: "光照目标值(Lux)",
        editable: {
            type: 'text',
            title: '光照目标值',
            mode: 'inline',
            validate: function (v) {
            	$('#'+paramTypeSelectValue+'Table').bootstrapTable('getRowByUniqueId',parseInt(num3)).checked = true;
                if (!v) return '光照目标值不能为空';
                if(v<5 || v>60){
                	return '请输入5-60范围的数值';
                }
            },
            onblur: 'submit'
        },
        width: '15%'
    }, {
        field: "start_time",
        title: "开启时间",
        editable: {
            type: 'text',
			// source: [{ value: 1, text: "开发部" }, { value: 2, text: "销售部" }, {value:3,text:"行政部"}] ,
            title: '开启时间',
            mode: 'inline',
            validate: function (v) {
            	$('#'+paramTypeSelectValue+'Table').bootstrapTable('getRowByUniqueId',parseInt(num3)).checked = true;
                if (!v) return '开启时间不能为空';
            },
            onblur: 'submit'
        },
        width: '15%'
    }, {
        field: "end_time",
        title: "关闭时间",
        editable: {
            type: 'text',
            title: '关闭时间',
            mode: 'inline',
            validate: function (v) {
            	$('#'+paramTypeSelectValue+'Table').bootstrapTable('getRowByUniqueId',parseInt(num3)).checked = true;
                if (!v) return '关闭时间不能为空';
            },
            onblur: 'submit'
        },
        width: '15%'
    }, {
        field: "hours",
        title: "开启时长",
        width: '10%'
    }, {
        field: "opr",
        title: "操作",
        width: '10%',
		formatter: function(value,row,index){
            return '<button id=\'factToolbar_btn_delete\' type=\'button\' class=\'btn blue\' style="display: inline;" onclick="batchChange('+row.id+');">'+
			'<i class="icon-trash"></i>删除</button>';
        }
	}];
    return dataColumns;
}

function getCarbonTableDataColumns(){
    var dataColumns = [{
        checkbox: true,
        width: '5%',
        visible: false
    }, {
        field: "id",
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
            	$('#'+paramTypeSelectValue+'Table').bootstrapTable('getRowByUniqueId',parseInt(num3)).checked = true;
                if (!v) return 'CO2报警值不能为空';
            },
            onblur: 'submit'
        },
        formatter: function(value,row,index){
        	if(value ==undefined){
        		return "-";
        	}else{
        		return value;
        	}
        },
        width: '100%'
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
        width: '5%',
        visible: false
    }, {
        field: "id",
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
	var updateRow = new Array();
	var updateRow3;
	var a = 0;
	updateRow3=$('#'+paramTypeSelectValue+'Table').bootstrapTable('getData');
	for(var i=0;i<updateRow3.length;i++){
		if(typeof(updateRow3[i].checked) !='undefined'){
			updateRow[a]=updateRow3[i];
			a++;
		}
	}
    if (a==0) {
    	updateHouseAlarm();
        layer.msg('未修改数据，无法进行保存!');
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
			querySBDayageSettingSub(20);
			layer.close(index); 
			if(result.msg=="1") {
				layer.msg('操作成功!');
			}else{
				layer.msg('操作失败!');
			}
		}
	});
}


/****弹出新增窗口*****/
function openAdjustWin(hourList){
	var p;
	var str = '<div style="padding-left: 10px;">&nbsp;</div>';
	    str+='<div style="padding-left: 20px;font-size:14px; width: 510px;"><span style="display:block;width: 110px;float:left;margin-left:30px;"><span_customer2>农场:</span_customer2></span><span style="display:block;width: 110px;float:left;margin-left:-70px;">'+$("#orgId" + (count0rg - 1)).val().split(",")[2]+'</span> ';
	    str+='<span style="display:block;width: 110px;float:left;margin-left:70px;"><span_customer2>栋舍:</span_customer2></span><span style="display:block;width: 110px;float:left;margin-left:-70px;">'+$("#orgId" + count0rg).val().split(",")[2]+'</span>';
	    if($("#alarmType").val() == "2"){
	    	str+='<span style="display:block;width: 50px;float:left;margin-left:60px;"><span_customer2>周龄:</span_customer2><input type="text" style="width: 100px;margin-top: -30px;margin-left:33px;" name="day_age" id="day_age" value="0"/></span></div>';
	    }else {
	    	str+='<span style="display:block;width: 50px;float:left;margin-left:60px;"><span_customer2>日龄:</span_customer2><input type="text" style="width: 100px;margin-top: -30px;margin-left:33px;" name="day_age" id="day_age" value="0"/></span></div>';
	    }
//	    str+='<span style="display:block;width:60px;float:left;text-align: right;">报警类别:&nbsp;&nbsp; <select style="width: 100px;margin-top: 5px;" name="alarm_type" id="alarmType" value=""/></select></span>';
	    str+='<div style="padding-left: 15px;font-size:14px; width: 620px;padding-top: 20px;margin-top: 30px;">';
	    if($("#alarmType").val() == "1") {
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:7px;"><span_customer2>目标温度:</span_customer2>&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:60px;" name="set_temp" id="set_temp" value="0"/></span> ';   
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:110px;"><span_customer2>高报温度:</span_customer2>&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:60px;" name="high_alarm_temp" id="high_alarm_temp" value="0"/></span> ';   
	    	 str+='<span style="display:block;width: 70px;float:left;margin-left:100px;"><span_customer2>低报温度:</span_customer2>&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:60px;" name="low_alarm_temp" id="low_alarm_temp" value="0"/></span></div> ';   
	         p=['642px', '210px'];
	    }else if($("#alarmType").val() == "2"){
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:-6px;"><span_customer2>光照上限制:</span_customer2>&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="high_lux" id="high_lux" value="0"/></span> ';   
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:110px;"><span_customer2>光照下限制:</span_customer2>&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="low_lux" id="low_lux" value="0"/></span> ';   
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:100px;"><span_customer2>光照目标值:</span_customer2>&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="set_lux" id="set_lux" value="0"/></span></div> ';
	         str+='<div style="padding-left: 15px;font-size:14px; width: 510px;padding-top: 20px;margin-top: 20px;">';
	         str+='<span style="display:block;width: 110px;float:left;margin-left:7px;"><span_customer2>开始时间:</span_customer2>&nbsp;&nbsp; ';
	         str += "<select id='start_time' style='width: 115px;margin-top: -30px;margin-left:60px;' class='m-wrap span12' tabindex='1' name='start_time'>";
//	         hourList = hourList.replace(/=/g,':');
	         var myobj=hourList.split("=");
				for (var j = 0; j < myobj.length; j++) {
					if(myobj[j].indexOf("code_name") > 0 ){
						 str +="<option value=" + myobj[j+1].split(",")[0] +">" + myobj[j+1].split(",")[0] + "</option>";
					}
						
				}
	         str+='</select></span> ';
	         str+='<span style="display:block;width: 110px;float:left;margin-left:110px;"><span_customer2>结束时间:</span_customer2>&nbsp;&nbsp;'; 
	         str += "<select id='end_time' style='width: 115px;margin-top: -30px;margin-left:60px;' class='m-wrap span12' tabindex='1' name='end_time'>";
				for (var j = 0; j < myobj.length; j++) {
					if(myobj[j].indexOf("code_name") > 0 ){
						 str +="<option value=" + myobj[j+1].split(",")[0] +">" + myobj[j+1].split(",")[0] + "</option>";
					}
						
				}
	         str+='</select></span></div> ';
	         p=['643px', '248px'];
	    }else if($("#alarmType").val() == "3"){
	    	str+='<span style="display:block;width: 110px;float:left;margin-left:-7px;"><span_customer2>CO2报警值:</span_customer2>&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="high_alarm_co2" id="high_alarm_co2"/></span> ';     
	    	 str+='<span style="display:block;width: 110px;float:left;margin-left:110px;"><span_customer2>CO2参考值:</span_customer2>&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: -30px;margin-left:75px;" name="set_co2" id="set_co2"/></span></div> ';
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
		    //获取可设置日龄的最大值
		    if($("#orgId" + count0rg).val().split(",")[3]=="1"){
		    	dage = 175;
		    }else{
		    	dage = 455;
		    }
			if($("#alarmType").val() == "1") {
				param = {
						day_age: $("#day_age").val(),
						farmId: $("#orgId" + (count0rg - 1)).val().split(",")[1],
						houseId: $("#orgId" + count0rg).val().split(",")[1],
						alarm_type: $("#alarmType").val(),
						high_alarm_temp: $("#high_alarm_temp").val(),
						low_alarm_temp: $("#low_alarm_temp").val(),
						set_temp: $("#set_temp").val(),
						dage:dage
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
						end_time:$("#end_time").val(),
						dage:dage
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
			        layer.msg('未修改数据，无法进行保存!');
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
			// $("#reflushText").css("display", "");
			$.ajax({
				url : path + "/alarm/addAlarm",
				data : param,
				type : "POST",
				dataType : "json",
				success : function(result) {
					// $("#reflushText").css("display", "none");
//					search();
		        	var obj = result.obj;
		            initTable(paramTypeSelectValue, getTableDataColumns(paramTypeSelectValue), []);
		            if(null != obj) {
		                var dataJosn = $.parseJSON(JSON.stringify(obj));
		                $("#"+paramTypeSelectValue+"Table").bootstrapTable('load',dataJosn);
		            } else{
		                initTableRow(paramTypeSelectValue, getTableEmptyRow(paramTypeSelectValue));
		            }
					layer.close(index); 
					querySBDayageSettingSub(20);
					if(result.msg=="1") {
						layer.msg('操作成功!');
						return;
					}else{
						layer.msg('操作失败!');
						return;
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
//	var set_alarm_co2=$("input[name='set_alarm_co2']").val();
	if($("#orgId" + count0rg).val().split(",")[3]=="1"){
    	dage = 175;
    }else{
    	dage = 455;
    }
	if(day_age < 0 ){
			 layer.msg("日龄不能负");
			return false;
	}
	if (isNaN(parseInt(day_age))){
        layer.msg("日龄必须是数字，请重新输入!");
        return false;
    }
	if($("#alarmType").val()=="1"){	
     if (isNaN(parseFloat(set_temp))){
	    layer.msg("目标温度必须是数字，请重新输入!");
	    return false;
	 }else if(parseFloat(set_temp)<15 || parseFloat(set_temp)>35){
		 layer.msg("目标温度必须是不小于15且不大于35的数，请重新输入!");
		    return false;
	 }else if(isNaN(parseFloat(high_alarm_temp))){
		layer.msg("高报温度必须是数字，请重新输入!");
		return false;
	}else if(parseFloat(high_alarm_temp)<=parseFloat(set_temp) || parseFloat(high_alarm_temp)>40){
		layer.msg("高报温度必须是大于"+set_temp+"且小于等于40的数，请重新输入!");
		return false;
	}else if(isNaN(parseFloat(low_alarm_temp))){
		layer.msg("低报温度必须是数字，请重新输入!");
		return false;
	  }else if(parseFloat(low_alarm_temp)<10 || parseFloat(low_alarm_temp)>=parseFloat(set_temp)){
		  layer.msg("低报温度必须是大于等于10且小于"+set_temp+"的数，请重新输入!");
			return false;
	  }else if (parseInt(day_age)>dage){
	        layer.msg("日龄不能大于"+dage+"，请重新输入!");
	        return false;
	    }	
	}else if($("#alarmType").val()=="2"){
		if (isNaN(parseFloat(high_lux))){
		    layer.msg("光照上限制必须是数字，请重新输入!");
		    return false;
		 }else if(parseFloat(high_lux)<=parseFloat(set_lux) || parseFloat(high_lux) >65){
			 layer.msg("光照上限制必须是大于"+set_lux+"且小于等于65的数，请重新输入!");
			    return false;
		 }else if(isNaN(parseFloat(low_lux))){
			layer.msg("光照下限制必须是数字，请重新输入!");
			return false;
		}else if(parseFloat(low_lux)<0 || parseFloat(low_lux)>=parseFloat(set_lux)){
			layer.msg("光照下限制必须是大于等于0且小于"+set_lux+"的数，请重新输入!");
			return false;
		}else if(isNaN(parseFloat(set_lux))){
			layer.msg("光照参照值必须是数字，请重新输入!");
			return false;
		  }else if(parseFloat(set_lux)<5 || parseFloat(set_lux)>60){
			  layer.msg("光照参照值必须是不小于5且不大于60的数，请重新输入!");
				return false;
		  }else if (parseInt(day_age)*7>dage){
			    var dage2 = dage/7;
		        layer.msg("周龄不能大于"+dage2+"，请重新输入!");
		        return false;
		    }		
	}else if($("#alarmType").val()=="3"){	
		if(isNaN(parseFloat(high_alarm_co2))){
			layer.msg("CO2报警值必须是数字，请重新输入!");
			return false;
		  }	
	}
	//showdiv('加载中，请稍候');
return true;
}


function addshuju(){
    if(checkRights())
        addRow(paramTypeSelectValue, getTableEmptyRow(paramTypeSelectValue));
}


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
}








