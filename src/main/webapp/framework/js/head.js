//菜单状态切换
var fmid = "fhindex";
var oid="fhindex";
var sid="fhindex";
var mid = "fhindex";
$(document).ready(function() {
	lo();
	alarmIncoMsg();
	if(menuId!="" && menuPid!=""){
		$("#fhindex").removeClass();
		$("#lm"+menuPid).attr("class","active");
		$("#se"+menuPid).attr("class","selected");
		$("#z"+menuId).attr("class","active");
		$("#op"+menuPid).attr("class","arrow open");
	}
});
function  alarmIncoMsg(){
    /**获取报警信息**/
	 $.ajax({
	     url: path+"/user/getAlarmIncoMsg",
	     data: {
	     },
	     type : "POST",
	     dataType: "json",
	     cache: false,
	     success: function(result) {
	         var list = eval(result.obj);
	         var number=$("#head_msg_currCount").html();
	         if(number!=list.length&&list.length!=0){
		         $("#head_msg_CurrList").empty();
		         $('#head_msg_currCount').html(list.length);
		         var str="<li><p>有"+list.length+"条报警信息</p></li>";
		         for(var i=0;i<list.length;i++){
		        	 str+="<li><a href='javascript:void(0);' onclick='siMenu(\"z102\",\"lm1\",\"se1\",\"op1\",\"实时报警\",\"/alarmCurr/showAlarmCurr\")'> <span class='label label-success'><i class='icon-bolt'></i></span> ";
		        	 str+=list[i].farm_name+"—— "+list[i].house_name+	"—— "+list[i].alarm_name +"</a></li>";
		         }
		         $("#head_msg_CurrList").append(str); 
		        	 /**闪动效果**/
		         $("#header_notification_bar").pulsate({
		                color: "#66bce6",
		                repeat: 5
		            });
		        
	         }
	         if(list.length==0){
	        	 $('#head_msg_currCount').html("");
	        	 $("#head_msg_CurrList").empty();
	         }
	     }
	 });
	 setTimeout("javascript:alarmIncoMsg();",5000); //1s刷新一次
}




function lo(){
	var d = new Date()//为日期命名
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = d.getDate();

	var weekday = new Array(7);//建立一个星期的数组
	weekday[0] = "星期日";
	weekday[1] = "星期一";
	weekday[2] = "星期二";
	weekday[3] = "星期三";
	weekday[4] = "星期四";
	weekday[5] = "星期五";
	weekday[6] = "星期六";

	var week = weekday[d.getDay()];
	 $("#dateMassage").html(year+"-"+month+"-"+date+"</br> "+week)
	//document.getElementById('dateMassage').innerHTML =year+"-"+month+"-"+date+"</br> "+week;
}


function siMenu(id,fid,seid,opid,MENU_NAME,MENU_URL,write_read){
	
	jQuery('.page-sidebar ul').children('li.active').children('ul.sub-menu').css("display","none");
	jQuery('.page-sidebar ul').each(function () {
		 var menuContainer = jQuery('.page-sidebar ul');
	       menuContainer.children('li.active').removeClass('active');
	       menuContainer.children('arrow.open').removeClass('open');
    });
	
	if(id != mid){
		$("#"+mid).removeClass();
		mid = id;
	}
	if(fid != fmid){
		$("#"+fmid).removeClass();
		fmid = fid;
	}
	if(seid!=sid){
		$("#"+sid).removeClass();
		$("#"+sid).attr("class","arrow");
		sid = seid;
	}
	if(opid!=oid){
		$("#"+oid).removeClass();
		oid = opid;
	}
	$("#"+fid).children('ul.sub-menu').css("display","");
	$("#"+fid).attr("class","active");
	$("#"+sid).attr("class","selected");
	$("#"+id).attr("class","active");
	//$("#"+fid).append("<span id="+oid+" class='arrow open'></span>");
	$("#"+oid).attr("class","arrow open");
	//MENU_URL=path+MENU_URL;
	var murl=MENU_URL+"?write_read="+write_read;
	
	
	top.mainFrame.tabAddHandler(id,MENU_NAME,murl);
	
	//activateUrl(id,fid,MENU_NAME,MENU_URL);
}

function activateUrl(mid,pid,mtitle,murl,write_read){
	mid = mid.substring(1);   // 取子字符串。
	pid = pid.substring(2);  
	alert(path+murl+"?id="+mid+"&pid="+pid+"&write_read"+write_read)
	window.location.href=path+murl+"?id="+mid+"&pid="+pid+"&write_read"+write_read;
}
