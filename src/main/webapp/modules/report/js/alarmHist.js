var count0rg;
var num=1;
var paramTypeList = new Array("alarmHist","alarmHistDetail");
var paramTypeSelectValue = null;

function OrgSearch(count0rg,num){
	reflushAlarmHist2(num);
}

$(document).ready(function(){
	 $('.date-picker').datepicker({
     	language: 'zh-CN',
         autoclose: true,
         todayHighlight: true
     });
	 
	 var win_h = $(window).height()-208;
	 $("#user_date_table").css("min-height",win_h);
	 $("#page-content").css("min-height",win_h);
	 $("#container").css("height",win_h-50);
	    
//	 $("#farmId").change(function() {
//		 setHouseId();
//		});

//	 $("#houseId").change(function() {
//		 // raymon 20160922
//		 setBatchId();
//		 // queryAlarmHist();
//		 // raymon 20160922
//	 });

		// raymon 20160922
//	 $("#batchId").change(function() {
//		 search();
//	 });

//	  setHouseId();
	      // raymon 20160922
	  $("#state2").css("display", "block");
      $("#detail2").css("display", "none");
      forward3();
	});

function setBatchId(){
	$.ajax({
		type : "post",
		url : path + "/temProfile/getBatch",
		data : {
			"farmId" : $("#orgId" + (count0rg - 1)).val().split(",")[1],
			"houseId" : $("#orgId" + count0rg).val().split(",")[1]
		},
		dataType: "json",
		success : function(result) {
			var list = result.obj;
			$("#batchId option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#batchId").append("<option value=" + list[i].batch_no+ ">" + list[i].batch_no + "</option>");
			}
			$("#batchId").val(list[0].batch_no);
			
			$.ajax({                              
		        // async: true,
		        url: path+"/alarmHist/queryAlarmHist2",
		        data: {
					"farmId" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId":$("#orgId" + count0rg).val().split(",")[1],"batchNo":$("#batchId").val()
				},
		        type: "POST",
		        dataType: "json",
		        cache: false,
		        // timeout:50000,
		        success: function (result) {
		            var list = eval(result.obj);
		            $("#tbodyAlarmHistList tr").remove();
		            for (var i = 0; i < list.length; i++) {
		                var str = '';
		                var strForward = "\"forward("+list[i]["date_age"]+","+list[i]["batch_no"]+",'"+list[i]["date"]+"');\"";
		                str += "<tr style='height:30px' onclick="+strForward+">";
		                str += "<td style='height:30px;'>" + list[i]["farm_name"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["house_name"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["date_age"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["high_temp_num"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["low_temp_num"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["high_negative_pressure_num"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["low_negative_pressure_num"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["high_co2_num"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["high_water_num"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["low_water_num"] + "</td>";
		                $("#tbodyAlarmHistList").append(str);
		            }

		        }
		    });
			
		}
	});
}

function setBatchId2(){
	$.ajax({
		type : "post",
		url : path + "/temProfile/getBatch",
		data : {
			"farmId" : $("#orgId" + (count0rg - 1)).val().split(",")[1],
			"houseId" : $("#orgId" + count0rg).val().split(",")[1]
		},
		dataType: "json",
		success : function(result) {
			var list = result.obj;
			$("#batchId2 option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#batchId2").append("<option value=" + list[i].batch_no+ ">" + list[i].batch_no + "</option>");
			}
			$("#batchId2").val(list[0].batch_no);
			
			var param;
			if($("#beginTime").val()=="" && $("#endTime").val()==""){
				param={
						"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"bizCode":$("#bizCode").val()
					};
			}else if($("#beginTime").val()=="" && $("#endTime").val()!=""){
				param = {
						"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"endTime":$("#endTime").val(),
						"bizCode":$("#bizCode").val()
				};
			}else if($("#beginTime").val()!="" && $("#endTime").val()==""){
				param = {
						"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"beginTime":$("#beginTime").val(),
						"bizCode":$("#bizCode").val()
				};
			}else{
				param = {
						"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"beginTime":$("#beginTime").val(),
						"endTime":$("#endTime").val(),"bizCode":$("#bizCode").val()
					};
			}
			
			$.ajax({                              
		        // async: true,
		        url: path+"/alarmHist/queryAlarmHist3",
		        data: param,
		        type: "POST",
		        dataType: "json",
		        cache: false,
		        // timeout:50000,
		        success: function (result) {
		        	var list = eval(result.obj);
		            $("#tbodyAlarmHistDetailList tr").remove();
		            for (var i = 0; i < list.length; i++) {
		                var str = '';
		                str += "<tr style='height:30px' >";
		                str += "<td style='height:30px;'>" + list[i]["date_age"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["alarm_time"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["alarm_Name"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["set_value"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["actual_value"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["continue_time"] + "</td>";
		                str += "<td style='height:30px;'>" + list[i]["response_person"] + "</td>";
		                $("#tbodyAlarmHistDetailList").append(str);
		            }

		        }
		    });
			
		}
	});
}

//function setHouseId(){
//	$.ajax({
//		type : "post",
//		url : path + "/alarmHist/getHouse",
//		data : {
//			"farmId" : $("#farmId").val()
//		},
//		dataType: "json",
//		success : function(result) {
//			var list = result.obj;
//			$("#houseId option").remove();
//			for (var i = 0; i < list.length; i++) {
//				$("#houseId").append("<option value=" + list[i].id + ">" + list[i].house_name+ "</option>");
//			}
//			setBatchId();
//		}
//	});
//}

//function setHouseId2(){
//	$.ajax({
//		type : "post",
//		url : path + "/alarmHist/getHouse",
//		data : {
//			"farmId" : $("#farmId2").val()
//		},
//		dataType: "json",
//		success : function(result) {
//			var list = result.obj;
//			$("#houseId2 option").remove();
//			for (var i = 0; i < list.length; i++) {
//				$("#houseId2").append("<option value=" + list[i].id + ">" + list[i].house_name+ "</option>");
//			}
////			$("#houseId").val(list[0].id);
////			setAlarmName();
//			setBatchId2();
//		}
//	});
//}

function setAlarmName(){
	$.ajax({
		type : "post",
		url : path + "/alarmHist/getAlarmName",
		data : {
			"farmId" : $("#orgId" + (count0rg - 1)).val().split(",")[1],
			"houseId" : $("#orgId" + count0rg).val().split(",")[1]
		},
		dataType: "json",
		success : function(result) {
			var list = result.obj;
			$("#alarmName option").remove();
			$("#alarmName").append("<option value=\"\">" + "全部" + "</option>");
			for (var i = 0; i < list.length; i++) {
				$("#alarmName").append("<option value=" + list[i].biz_code+ ">" + list[i].code_name + "</option>");
			}
//			$("#alarmName").val(list[0].code_name);
			queryAlarmHist(); 
		}
	});
}

function reflushAlarmHist(num){
	if(num==1){
	$.ajax({
		type : "post",
		url : path + "/alarmHist/getHouse",
		data : {
			"farmId" : $("#orgId" + (count0rg - 1)).val().split(",")[1]
		},
		dataType: "json",
		success : function(result) {
			var list = result.obj;
			$("#houseId option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#houseId").append("<option value=" + list[i].id + ">" + list[i].house_name+ "</option>");
			}
			setBatchId();
			
		}
	});
	}else{
		$.ajax({
			type : "post",
			url : path + "/alarmHist/getHouse",
			data : {
				"farmId" : $("#orgId" + (count0rg - 1)).val().split(",")[1]
			},
			dataType: "json",
			success : function(result) {
				var list = result.obj;
				$("#houseId2 option").remove();
				for (var i = 0; i < list.length; i++) {
					$("#houseId2").append("<option value=" + list[i].id + ">" + list[i].house_name+ "</option>");
				}
				setBatchId2();
				
			}
		});
	}

}

function reflushAlarmHist2(num){
	if(num==1){
	$.ajax({
		type : "post",
		url : path + "/temProfile/getBatch",
		data : {
			"farmId" : $("#orgId" + (count0rg - 1)).val().split(",")[1],
			"houseId" : $("#orgId" + count0rg).val().split(",")[1]
		},
		dataType: "json",
		success : function(result) {
			var list = result.obj;
			$("#batchId option").remove();
			if(null != list){
			for (var i = 0; i < list.length; i++) {
				$("#batchId").append("<option value=" + list[i].batch_no+ ">" + list[i].batch_no + "</option>");
			}
			$("#batchId").val(list[0].batch_no);
			}else{
				$("#batchId").val("");
			}
			$.ajax({                              
		        // async: true,
		        url: path+"/alarmHist/queryAlarmHist2",
		        data: {
					"farmId" : $("#orgId" + count0rg).val().split(",")[1],"houseId":$("#orgId" + count0rg).val().split(",")[1],"batchNo":$("#batchId").val()
				},
		        type: "POST",
		        dataType: "json",
		        cache: false,
		        // timeout:50000,
		        success: function (result) {
		            var list = result.obj;
		            initTable("alarmHist", getTableDataColumns("alarmHist"), []);
	                if(null != list) {
	                    var dataJosn = $.parseJSON(JSON.stringify(list));
	                    $("#alarmHistTable").bootstrapTable('load',dataJosn);
	                } else{
	                    initTableRow("alarmHist", getTableEmptyRow("alarmHist"));
	                }
//		            $("#tbodyAlarmHistList tr").remove();
//		            for (var i = 0; i < list.length; i++) {
//		                var str = '';
//		                var strForward = "\"forward("+list[i]["date_age"]+","+list[i]["batch_no"]+",'"+list[i]["date"]+"');\"";
//		                str += "<tr style='height:30px' onclick="+strForward+">";
//		                str += "<td style='height:30px;'>" + list[i]["farm_name"] + "</td>";
//		                str += "<td style='height:30px;'>" + list[i]["house_name"] + "</td>";
//		                str += "<td style='height:30px;'>" + list[i]["date_age"] + "</td>";
//		                str += "<td style='height:30px;'>" + list[i]["high_temp_num"] + "</td>";
//		                str += "<td style='height:30px;'>" + list[i]["low_temp_num"] + "</td>";
//		                str += "<td style='height:30px;'>" + list[i]["high_negative_pressure_num"] + "</td>";
//		                str += "<td style='height:30px;'>" + list[i]["low_negative_pressure_num"] + "</td>";
//		                str += "<td style='height:30px;'>" + list[i]["high_co2_num"] + "</td>";
//		                str += "<td style='height:30px;'>" + list[i]["high_water_num"] + "</td>";
//		                str += "<td style='height:30px;'>" + list[i]["low_water_num"] + "</td>";
//		                $("#tbodyAlarmHistList").append(str);
//		            }

		        }
		    });
			
		}
	});
	}else{
		$.ajax({
			type : "post",
			url : path + "/temProfile/getBatch",
			data : {
				"farmId" : $("#orgId" + (count0rg - 1)).val().split(",")[1],
				"houseId" : $("#orgId" + count0rg).val().split(",")[1]
			},
			dataType: "json",
			success : function(result) {
				var list = result.obj;
				$("#batchId2 option").remove();
				if(null != list){
				for (var i = 0; i < list.length; i++) {
					$("#batchId2").append("<option value=" + list[i].batch_no+ ">" + list[i].batch_no + "</option>");
				}
				$("#batchId2").val(list[0].batch_no);
				}else{
					$("#batchId2").val("");
				}
				var param;
				if($("#beginTime").val()=="" && $("#endTime").val()==""){
					param={
							"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"bizCode":$("#bizCode").val()
						};
				}else if($("#beginTime").val()=="" && $("#endTime").val()!=""){
					param = {
							"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"endTime":$("#endTime").val(),
							"bizCode":$("#bizCode").val()
					};
				}else if($("#beginTime").val()!="" && $("#endTime").val()==""){
					param = {
							"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"beginTime":$("#beginTime").val(),
							"bizCode":$("#bizCode").val()
					};
				}else{
					param = {
							"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"beginTime":$("#beginTime").val(),
							"endTime":$("#endTime").val(),"bizCode":$("#bizCode").val()
						};
				}
				
				$.ajax({                              
			        // async: true,
			        url: path+"/alarmHist/queryAlarmHist3",
			        data: param,
			        type: "POST",
			        dataType: "json",
			        cache: false,
			        // timeout:50000,
			        success: function (result) {
			        	var list = result.obj;
			        	initTable("alarmHistDetail", getTableDataColumns("alarmHistDetail"), []);
		                if(null != list) {
		                    var dataJosn = $.parseJSON(JSON.stringify(list));
		                    $("#alarmHistDetailTable").bootstrapTable('load',dataJosn);
		                } else{
		                    initTableRow("alarmHistDetail", getTableEmptyRow("alarmHistDetail"));
		                }
//			            $("#tbodyAlarmHistDetailList tr").remove();
//			            for (var i = 0; i < list.length; i++) {
//			                var str = '';
//			                str += "<tr style='height:30px' >";
//			                str += "<td style='height:30px;'>" + list[i]["date_age"] + "</td>";
//			                str += "<td style='height:30px;'>" + list[i]["alarm_time"] + "</td>";
//			                str += "<td style='height:30px;'>" + list[i]["alarm_Name"] + "</td>";
//			                str += "<td style='height:30px;'>" + list[i]["set_value"] + "</td>";
//			                str += "<td style='height:30px;'>" + list[i]["actual_value"] + "</td>";
//			                str += "<td style='height:30px;'>" + list[i]["continue_time"] + "</td>";
//			                str += "<td style='height:30px;'>" + list[i]["response_person"] + "</td>";
//			                $("#tbodyAlarmHistDetailList").append(str);
//			            }

			        }
			    });
				
			}
		});
	}

}

function reflushAlarmHist3(num){
	if(num==1){
	$.ajax({                              
        // async: true,
        url: path+"/alarmHist/queryAlarmHist2",
        data: {
			"farmId" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId":$("#orgId" + count0rg).val().split(",")[1],"batchNo":$("#batchId").val()
		},
        type: "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function (result) {
            var list = result.obj;
            initTable("alarmHist", getTableDataColumns("alarmHist"), []);
            if(null != list) {
                var dataJosn = $.parseJSON(JSON.stringify(list));
                $("#alarmHistTable").bootstrapTable('load',dataJosn);
            } else{
                initTableRow("alarmHist", getTableEmptyRow("alarmHist"));
            }
//            $("#tbodyAlarmHistList tr").remove();
//            for (var i = 0; i < list.length; i++) {
//                var str = '';
//                var strForward = "\"forward("+list[i]["date_age"]+","+list[i]["batch_no"]+",'"+list[i]["date"]+"');\"";
//                str += "<tr style='height:30px' onclick="+strForward+">";
//                str += "<td style='height:30px;'>" + list[i]["farm_name"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["house_name"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["date_age"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["high_temp_num"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["low_temp_num"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["high_negative_pressure_num"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["low_negative_pressure_num"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["high_co2_num"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["high_water_num"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["low_water_num"] + "</td>";
//                $("#tbodyAlarmHistList").append(str);
//            }

        }
    });
	}else{
		var param;
		if($("#beginTime").val()=="" && $("#endTime").val()==""){
			param={
					"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"bizCode":$("#bizCode").val()
				};
		}else if($("#beginTime").val()=="" && $("#endTime").val()!=""){
			param = {
					"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"endTime":$("#endTime").val(),
					"bizCode":$("#bizCode").val()
			};
		}else if($("#beginTime").val()!="" && $("#endTime").val()==""){
			param = {
					"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"beginTime":$("#beginTime").val(),
					"bizCode":$("#bizCode").val()
			};
		}else{
			param = {
					"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"beginTime":$("#beginTime").val(),
					"endTime":$("#endTime").val(),"bizCode":$("#bizCode").val()
				};
		}
		
		$.ajax({                              
	        // async: true,
	        url: path+"/alarmHist/queryAlarmHist3",
	        data: param,
	        type: "POST",
	        dataType: "json",
	        cache: false,
	        // timeout:50000,
	        success: function (result) {
	        	var list = result.obj;
	        	initTable("alarmHistDetail", getTableDataColumns("alarmHistDetail"), []);
                if(null != list) {
                    var dataJosn = $.parseJSON(JSON.stringify(list));
                    $("#alarmHistDetailTable").bootstrapTable('load',dataJosn);
                } else{
                    initTableRow("alarmHistDetail", getTableEmptyRow("alarmHistDetail"));
                }
//	            $("#tbodyAlarmHistDetailList tr").remove();
//	            for (var i = 0; i < list.length; i++) {
//	                var str = '';
//	                str += "<tr style='height:30px' >";
//	                str += "<td style='height:30px;'>" + list[i]["date_age"] + "</td>";
//	                str += "<td style='height:30px;'>" + list[i]["alarm_time"] + "</td>";
//	                str += "<td style='height:30px;'>" + list[i]["alarm_Name"] + "</td>";
//	                str += "<td style='height:30px;'>" + list[i]["set_value"] + "</td>";
//	                str += "<td style='height:30px;'>" + list[i]["actual_value"] + "</td>";
//	                str += "<td style='height:30px;'>" + list[i]["continue_time"] + "</td>";
//	                str += "<td style='height:30px;'>" + list[i]["response_person"] + "</td>";
//	                $("#tbodyAlarmHistDetailList").append(str);
//	            }

	        }
	    });
	}

}

function reflushAlarmHist4(){
	var param;
	if($("#beginTime").val()=="" && $("#endTime").val()==""){
		param={
				"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"bizCode":$("#bizCode").val()
			};
	}else if($("#beginTime").val()=="" && $("#endTime").val()!=""){
		param = {
				"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"endTime":$("#endTime").val(),
				"bizCode":$("#bizCode").val()
		};
	}else if($("#beginTime").val()!="" && $("#endTime").val()==""){
		param = {
				"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"beginTime":$("#beginTime").val(),
				"bizCode":$("#bizCode").val()
		};
	}else{
		param = {
				"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"batchNo2":$("#batchId2").val(),"beginTime":$("#beginTime").val(),
				"endTime":$("#endTime").val(),"bizCode":$("#bizCode").val()
			};
	}
	
	$.ajax({                              
        // async: true,
        url: path+"/alarmHist/queryAlarmHist3",
        data: param,
        type: "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function (result) {
        	var list = result.obj;
        	initTable("alarmHistDetail", getTableDataColumns("alarmHistDetail"), []);
            if(null != list) {
                var dataJosn = $.parseJSON(JSON.stringify(list));
                $("#alarmHistDetailTable").bootstrapTable('load',dataJosn);
            } else{
                initTableRow("alarmHistDetail", getTableEmptyRow("alarmHistDetail"));
            }
//            $("#tbodyAlarmHistDetailList tr").remove();
//            for (var i = 0; i < list.length; i++) {
//                var str = '';
//                str += "<tr style='height:30px' >";
//                str += "<td style='height:30px;'>" + list[i]["date_age"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["alarm_time"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["alarm_Name"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["set_value"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["actual_value"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["continue_time"] + "</td>";
//                str += "<td style='height:30px;'>" + list[i]["response_person"] + "</td>";
//                $("#tbodyAlarmHistDetailList").append(str);
//            }

        }
    });
}

//检索
function search(){
	$("#alarmHistForm").submit();
}


function forward(date_age,batchNo,date){
	$("#detailTab1").css("text-decoration", "none");
	$("#detailTab1").css("color", "#fff");
	$("#detailTab1").css("background-color", "#08c");
	$("#stateTab1").css("background-color", "#BFBFBF");
	$("#stateTab1").css("color", "#eee");
	$("#tab_state").css("display", "none");
	$("#tab_detail").css("display", "block");
	$("#state2").css("display", "none");
    $("#detail2").css("display", "block");
//	document.getElementById('farmId2').value=$("#orgId" + (count0rg - 1)).val().split(",")[1];
//	$.ajax({
//		type : "post",
//		url : path + "/alarmHist/getHouse",
//		data : {
//			"farmId" : $("#orgId" + (count0rg - 1)).val().split(",")[1]
//		},
//		dataType: "json",
//		success : function(result) {
//			var list = result.obj;
//			$("#houseId2 option").remove();
//			for (var i = 0; i < list.length; i++) {
//				$("#houseId2").append("<option value=" + list[i].id + ">" + list[i].house_name+ "</option>");
//			}
//			document.getElementById('houseId2').value=$("#houseId").val();
			$.ajax({
				type : "post",
				url : path + "/temProfile/getBatch",
				data : {
					"farmId" : $("#orgId" + (count0rg - 1)).val().split(",")[1],
					"houseId" : $("#orgId" + count0rg).val().split(",")[1]
				},
				dataType: "json",
				success : function(result) {
					var list = result.obj;
					$("#batchId2 option").remove();
					for (var i = 0; i < list.length; i++) {
						$("#batchId2").append("<option value=" + list[i].batch_no+ ">" + list[i].batch_no + "</option>");
					}
//					$("#batchId2").val(list[0].batch_no);
					document.getElementById('batchId2').value=$("#batchId").val();
					document.getElementById('beginTime').value=date.slice(0,10);
					document.getElementById('endTime').value=date.slice(0,10);
					$.ajax({                              
				        // async: true,
				        url: path+"/alarmHist/queryAlarmHist3",
				        data: {
							"farmId2" : $("#orgId" + (count0rg - 1)).val().split(",")[1],"houseId2":$("#orgId" + count0rg).val().split(",")[1],"dateage":date_age,"batchNo2":batchNo,"beginTime":date.slice(0,10),"endTime":date.slice(0,10)
						},
				        type: "POST",
				        dataType: "json",
				        cache: false,
				        // timeout:50000,
				        success: function (result) {
				            var list = eval(result.obj);
				            $("#tbodyAlarmHistDetailList tr").remove();
				            for (var i = 0; i < list.length; i++) {
				                var str = '';
				                str += "<tr style='height:30px' >";
				                str += "<td style='height:30px;'>" + list[i]["date_age"] + "</td>";
				                str += "<td style='height:30px;'>" + list[i]["alarm_time"] + "</td>";
				                str += "<td style='height:30px;'>" + list[i]["alarm_Name"] + "</td>";
				                str += "<td style='height:30px;'>" + list[i]["set_value"] + "</td>";
				                str += "<td style='height:30px;'>" + list[i]["actual_value"] + "</td>";
				                str += "<td style='height:30px;'>" + list[i]["continue_time"] + "</td>";
				                str += "<td style='height:30px;'>" + list[i]["response_person"] + "</td>";
				                $("#tbodyAlarmHistDetailList").append(str);
				            }

				        }
				    });
					
				}
			});
		}
//	});
//}

function forward2(){
	num =2;
	$("#detailTab1").css("text-decoration", "none");
	$("#detailTab1").css("color", "#fff");
	$("#detailTab1").css("background-color", "#08c");
	$("#stateTab1").css("background-color", "#BFBFBF");
	$("#stateTab1").css("color", "#eee");
	$("#tab_state").css("display", "none");
	$("#tab_detail").css("display", "block");
	$("#state2").css("display", "none");
    $("#detail2").css("display", "block");
//    setBatchId2();
    reflushAlarmHist2(2);
}
function forward3(){
	num=1;
	$("#stateTab1").css("text-decoration", "none");
	$("#stateTab1").css("color", "#fff");
	$("#stateTab1").css("background-color", "#08c");
	$("#detailTab1").css("background-color", "#BFBFBF");
	$("#detailTab1").css("color", "#eee");
	$("#tab_state").css("display", "block");
	$("#tab_detail").css("display", "none");
	$("#state2").css("display", "block");
    $("#detail2").css("display", "none");
}

function getTableDataColumns(paramTypeSelectValue){
    if(paramTypeSelectValue == paramTypeList[0]) {
        return getAlarmHistTableDataColumns();
    }
    if(paramTypeSelectValue == paramTypeList[1]) {
        return getAlarmHistDetailTableDataColumns();
    }
}

function getAlarmHistTableDataColumns(){
    var dataColumns = [{
        field: "uid_num",
        title: "ID",
        visible: false
    }, {
        field: "farm_name",
        title: "农场",
        visible: false
    }, {
        field: "house_name",
        title: "栋舍",
        visible: false
    }, {
        field: "date_age",
        title: "日龄"
    }, {
        field: "high_temp_num",
        title: "高温报警"
    }, {
        field: "low_temp_num",
        title: "低温报警"
    }, {
        field: "high_lux_num",
        title: "高光照报警"
    }, {
        field: "low_lux_num",
        title: "低光照报警"
    }, {
        field: "high_co2_num",
        title: "高二氧化碳报警"
    }];
    return dataColumns;
}

function getAlarmHistDetailTableDataColumns(){
    var dataColumns = [{
        field: "uid_num",
        title: "ID",
        visible: false
    }, {
        field: "date_age",
        title: "日龄"
    }, {
        field: "alarm_time",
        title: "报警时间"
    }, {
        field: "alarm_Name",
        title: "报警类型"
    }, {
        field: "set_value",
        title: "目标值"
    }, {
        field: "actual_value",
        title: "实际值"
    }, {
        field: "continue_time",
        title: "持续时间(s)"
    }, {
        field: "response_person",
        title: "执行人"
    }];
    return dataColumns;
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

    return emptyRow;
}


