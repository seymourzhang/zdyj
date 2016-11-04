//var tickInterval=7;

function reflushAlarm(){
	var param;
	if($("#farmId").val()==""){
		param=null;
	}else{
		param = {"farmId":$("#farmId").val()};
	}
 $.ajax({
     // async: true,
     url: path+"/alarm/reflushAlarm",
     data: param,
     type : "POST",
     dataType: "json",
     cache: false,
     // timeout:50000,
     success: function(result) {
         var list = eval(result.obj);
		 var select = document.getElementById("houseId");
		 $("#houseId option").remove();
		 var option = null; // document.createElement("option");
//		 option.innerHTML += "<option id=\"o1\" value=\"\" >"+"全部"+"</option>";
//		 select.appendChild(option);
//		 document.getElementById("o1").setAttribute("value", "");
         for(var i=0;i<list.length;i++){
//        	 option = document.createElement("option");
//    		 option.innerHTML += "<option value="+list[i]["id"]+" >"+list[i]["house_name"]+"</option>";
//    		 select.appendChild(option);
    		 $("#houseId").append("<option value=" + list[i].id + ">" + list[i].house_name+ "</option>");
//    		 document.getElementById(list[i]["id"]).setAttribute("value",list[i]["id"]);
		 }
//         $("#houseId").val(list[0].id);
            search();
     }
 });

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
		area: ['750px', '400px'],
	    content: path+"/alarm/addAlarmUrl?farmId="+$("#farmId").val()+"&houseId="+$("#houseId").val()
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
		area: ['530px', '300px'],
	    content: path+"/alarm/applyAlarmUrl?farmId="+$("#farmId").val()+"&houseId="+$("#houseId").val()+
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
	    content: path+"/alarm/bindingUserUrl?farmId="+$("#farmId").val()+"&houseId="+$("#houseId").val()+
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
			"farmId" : $("#farmId").val(),//农场
			"houseId" : $("#houseId").val(),//栋舍
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
//			var setCo2 = new Array();
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
				yName='负压(Pa)';
				suffixName = 'Pa';
			}else if(alarmtype1=="3"){
				for (var i = 0; i < list.length; i++) {
					if(list[i].high_alarm_co2!=undefined){
					xNames.push(list[i].day_age+'日龄');
//					setCo2.push(list[i].set_co2);
					highAlarmCo2.push(list[i].high_alarm_co2 );
//					lowAlarmCo2.push(list[i].low_alarm_co2 );
					}
				}
				alarmType5 = [{
		            name: '高报二氧化碳',
		            data: highAlarmCo2
		        }];
				yName='二氧化碳(ml/m³)';
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
	var alarms=document.getElementsByName("checkedSBDayageSettingSubId");
	var id;
	var day_age;
	if(alarms == null){
		return;
	}
	var num =0;
	for(var i=0;i<alarms.length;i++){
		if(alarms[i].checked){
			id= alarms[i].id;
			day_age = $("#day_age"+id).val();
			num++;
		}
	}
	if(num ==0){
		alert("请选择警报记录");
		closediv();
		return;
	}
    document.forms[0].action = path+"/alarm/deleteAlarm?uid_num="+id+"&day_age="+day_age;
    document.forms[0].submit();
}

//检索
function search(){
	$("#alarmForm").submit();
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
	var alarms=document.getElementsByName("checkedSBDayageSettingSubId");
	var id,set_temp,high_alarm_temp,low_alarm_temp,high_alarm_negative_pressure,low_alarm_negative_pressure,
	high_alarm_co2,set_water_deprivation,high_water_deprivation,low_water_deprivation,day_age,alarm_delay,
	temp_cpsation,yincang,temp_cordon;
	if(alarms == null){
		return;
	}
	var num =0;
	alarm_delay=$("#alarm_delay").val();
	temp_cpsation=$("#temp_cpsation").val();
	yincang=$("#yincang").val();
	temp_cordon=$("#temp_cordon").val();
	for(var i=0;i<alarms.length;i++){
		if(alarms[i].checked){
			id= alarms[i].id;
			day_age= $("#day_age"+id).val();
			if($("#alarmType").val()==1){
				set_temp = $("#set_temp"+id).val();
				high_alarm_temp = $("#high_alarm_temp"+id).val();
				low_alarm_temp = $("#low_alarm_temp"+id).val();
				document.forms[0].action = path+"/alarm/updateAlarm?uid_num="+id+"&set_temp="+set_temp+"&high_alarm_temp="+high_alarm_temp
				+"&low_alarm_temp="+low_alarm_temp+"&day_age="+day_age+"&alarm_delay="+alarm_delay
				+"&temp_cpsation="+temp_cpsation+"&alarm_way="+yincang+"&temp_cordon="+temp_cordon;
			}else if($("#alarmType").val()==2){
//				set_negative_pressure = $("#set_negative_pressure"+id).val();
				high_alarm_negative_pressure = $("#high_alarm_negative_pressure"+id).val();
				low_alarm_negative_pressure = $("#low_alarm_negative_pressure"+id).val();
				document.forms[0].action = path+"/alarm/updateAlarm?uid_num="+id+
				"&high_alarm_negative_pressure="+high_alarm_negative_pressure+"&low_alarm_negative_pressure="+low_alarm_negative_pressure
				+"&day_age="+day_age+"&alarm_delay="+alarm_delay
				+"&temp_cpsation="+temp_cpsation+"&alarm_way="+yincang+"&temp_cordon="+temp_cordon;
			}else if($("#alarmType").val()==3){
//				set_co2 = $("#set_co2c"+id).val();
				high_alarm_co2 = $("#high_alarm_co2c"+id).val();
//				low_alarm_co2 = $("#low_alarm_co2c"+id).val();
				document.forms[0].action = path+"/alarm/updateAlarm?uid_num="+id+"&high_alarm_co2="+high_alarm_co2+
				"&day_age="+day_age+"&alarm_delay="+alarm_delay
				+"&temp_cpsation="+temp_cpsation+"&alarm_way="+yincang+"&temp_cordon="+temp_cordon;
			}else{
				set_water_deprivation = $("#set_water_deprivation"+id).val();
				high_water_deprivation = $("#high_water_deprivation"+id).val();
				low_water_deprivation = $("#low_water_deprivation"+id).val();
				document.forms[0].action = path+"/alarm/updateAlarm?uid_num="+id+"&set_water_deprivation="+set_water_deprivation+
				"&high_water_deprivation="+high_water_deprivation
				+"&low_water_deprivation="+low_water_deprivation+"&day_age="+day_age+"&alarm_delay="+alarm_delay
				+"&temp_cpsation="+temp_cpsation+"&alarm_way="+yincang+"&temp_cordon="+temp_cordon;
			}
			num++;
			break;
		}
	}
	if(num ==0){
//		alert("请选择警报记录");
//		return;
		document.forms[0].action = path+"/alarm/updateHouseAlarm?alarm_delay="+alarm_delay
		+"&temp_cpsation="+temp_cpsation+"&alarm_way="+yincang+"&temp_cordon="+temp_cordon;	
	}

    document.forms[0].submit();
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
