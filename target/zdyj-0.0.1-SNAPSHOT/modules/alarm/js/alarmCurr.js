var count0rg;
var num;

function OrgSearch(count0rg,num){
		reflushAlarmCurr();	
}


function reflushAlarmCurr(){

	var param;
//	if($("#farmId").val()=="" && $("#houseId").val()==""){
//		param=null;
//	}else if($("#farmId").val()=="" && $("#houseId").val()!=""){
//		param = {"houseId":$("#houseId").val()};
//	}else if($("#farmId").val()!="" && $("#houseId").val()==""){
//		param = {"farmId":$("#farmId").val()};
//	}else{
		 param = {
				 "farmId":$("#orgId"+(count0rg-1)).val().split(",")[1],
				 "houseId":$("#orgId"+count0rg).val().split(",")[1]
				 };
//	}

 $.ajax({
     // async: true,
     url: path+"/alarmCurr/reflushAlarmCurr",
     data: param,
     type : "POST",
     dataType: "json",
     cache: false,
     // timeout:50000,
     success: function(result) {
         var list = eval(result.obj);
         $("#tbodyAlarmCurrList tr").remove();
         for(var i=0;i<list.length;i++){
        	 var str='';
        	 str+="<tr align='center' style='height:30px' >";
              str+="<td style='height:30px;text-align: center;'>"+ list[i]["farm_name"]+"</td>";
              str+="<td style='height:30px;text-align: center;'>"+ list[i]["house_name"]+"</td>";
//              if(list[i]["alarm_code"]=='正常'){
//            	  str+="<td style='height:30px;text-align: center;'>"+ list[i]["alarm_code"]+"</td>";
//         	 }else{
//         		  str+="<td bgcolor='red' style='height:30px;text-align: center;'>"+ list[i]["alarm_code"]+"</td>";
//         	 }
        
              str+="<td style='height:30px;text-align: center;'>"+ list[i]["alarm_name"]+"</td>";
              str+="<td style='height:30px;text-align: center;'>"+ list[i]["set_value"]+" "+list[i]["value_unit"]+"</td>";
              str+="<td style='height:30px;text-align: center;'>"+ list[i]["actual_value"]+" "+list[i]["value_unit"]+"</td>";
              if(list[i]["deal_status_name"]=='处理中'){
            	  str+="<td style='color:#FF6600;height:30px;text-align: center;'>" + list[i]["deal_status_name"]+"</td>";
              }else if(list[i]["deal_status_name"]=='已处理'){
            	  str+="<td style='color:#00EC00;height:30px;text-align: center;'>" + list[i]["deal_status_name"]+"</td>";
              }else if(list[i]["deal_status_name"]=='未处理'){
            	  str+="<td style='color:#EA0000;height:30px;text-align: center;'>" + list[i]["deal_status_name"]+"</td>";
              }
//            str+="<td style='height:30px;text-align: center;'>"+ list[i]["deal_status_name"]+"</td>";
              str+="<td style='height:30px;text-align: center;'>"+ list[i]["alarm_time"]+"</td>";
              str+="<td style='height:30px;text-align: center;'>"+(list[i]["deal_time"] != null ? list[i]["deal_time"]:'' )+"</td>";
              str+="<td style='height:30px;text-align: center;'>"+(list[i]["user_name"] != null ? list[i]["user_name"]:'' )+"</td>";
//            str+="<td style='height:30px;text-align: center;'>"+ list[i]["deal_time"]+"</td>";
//            str+="<td style='height:30px;text-align: center;'>"+ list[i]["user_name"]+"</td>";
              $("#tbodyAlarmCurrList").append(str);    
         }
     // alert("reflush");

     }
 });
 setTimeout("javascript:reflushAlarmCurr();",10000); //10s刷新一次
}

function reflushAlarmCurr2(){
	var param;
	if($("#farmId").val()==""){
		param=null;
	}else{
		param = {"farmId":$("#farmId").val()};
	}

 $.ajax({
     // async: true,
     url: path+"/alarmCurr/reflushAlarmCurr2",
     data: param,
     type : "POST",
     dataType: "json",
     cache: false,
     // timeout:50000,
     success: function(result) {
    	 var list = result.obj;
			$("#houseId option:gt(0)").remove();
			for (var i = 0; i < list.length; i++) {
				$("#houseId").append("<option value=" + list[i].id + ">" + list[i].house_name+ "</option>");
			}
			reflushAlarmCurr();
     }
 });

}

