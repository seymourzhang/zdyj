<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <link rel="stylesheet" href="<%=path %>/framework/css/bootstrap.min.css" />
    <link rel="stylesheet" href="<%=path %>/framework/css/style-metro.css" />
    <link rel="stylesheet" href="<%=path %>/framework/css/style.css"/>
    <link rel="stylesheet" href="<%=path %>/framework/css/bootstrap-fileupload.css" />
    <link rel="stylesheet" href="<%=path %>/framework/css/uniform.default.css" />
	<script type="text/javascript" src="<%=path %>/framework/jquery/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="<%=path%>/framework/js/extJquery.js"></script>
	<script type="text/javascript">
	 var deviceID= '${pd.deviceID}';
	 $(document).ready(function(){
		 $("input[name=deviceKey1]").each(function(){  
				var bbb= deviceID.split(",");
				 for (var int = 0; int < bbb.length; int++) {
					 if($(this).val()==bbb[int]){
						 $(this).attr("checked", true);
					 }
				}
			  }); 
			
	})
	
function  editHouse(){
	 var chk_value =[];    
	  $("input[name=deviceKey1]:checked").each(function(){    
	  	 chk_value.push($(this).val());    
	  });  
	  $("#deviceKey").val(chk_value);
	  var hn=$("input[name='house_name']").val();
	  var hoNname='${houselData.house_name}';
	  var fid=$("#farmId").val();
	  var ht=$("select[name='house_type']").val();
	/*   var dk=$("#deviceKey").val(); */
		if(hn==""){
			$('#editHouse_msg').html("栋舍名称不能为空！");
		}else if(ht==""||ht==null){
			$('#editHouse_msg').html("请选择栋舍类型！");
		/* }else if(dk==""){
			$('#editHouse_msg').html("请选择对应设备！"); */
		}else if(hn!=hoNname){
			if(restHouseName(hn,fid)){
				$('#editHouse_msg').html("栋舍名称已经存在！");
			}
		}else{
			var param =$.serializeObject($('#editHouse_form'));
			 $.ajax({
				url: "<%=path%>/farm/editHouse",
				data: param,
				type : "POST",
				dataType: "json",
				success: function(result) {
					if(result.msg=='1'){
						$("#tab_fag",window.parent.document).val(3);
						$("#farmViewForm",window.parent.document).submit();
						parent.layer.closeAll();   
					}else{
						alert("修改失败！");
					}
				}
			});  
		}
}
	
	
//判断栋舍是否重名
function restHouseName(hn,fid){
	var rs;
	$.ajaxSetup({ async: false });
    $.get("<%=path%>/farm/isHouseNameNull?house_name="+hn+"&farm_id="+fid, function(result){
    	rs = $.parseJSON(result);
   	 if(rs.msg=="1"){
        	rs = true;//存在
        }else{
        	rs = false;//不存在
        }
   });
   return rs; 
}



function closeB(){
	parent.layer.closeAll();
}
	
	</script>
	
  </head>
  
  <body>
   <div class="portlet-body form" style="padding-top: 15px;margin-left: -30px;">
	<!-- BEGIN FORM-->
    <form id="editHouse_form" class="form-horizontal"   >
    		<input type="hidden" name="deviceKey" id="deviceKey" />
    		<input type="hidden" name="id" id="id" value="${houselData.id}"/>
    		<input type="hidden" name="farmId" id="farmId" value="${houselData.farm_id}"/>
			<div class="control-group" style="clear:both;">
				<label class="control-label" style="width: 100px;">栋舍名称:</label>
				<div class="controls" style="margin-left: 110px;">
					<input type="text" class="span6 m-wrap" style="width: 230px;" name="house_name"  value="${houselData.house_name}">
				</div>
			</div>
			<div class="control-group" style="float: left;display:inline; ">
				<label class="control-label" style="width: 100px;">所属农场:</label>
				<div class="controls" style="margin-left: 110px;">
					<select id="farm_id" class="m-wrap"  name="farm_id" style="width: 230px;" disabled="disabled">
					 <option value="">请选择</option>
                      <c:if test="${!empty farmList}">
                      <c:forEach var="farm" items="${farmList}">
                      <option value="${farm.id }" <c:if test="${farm.id==houselData.farm_id}">selected</c:if>>${farm.farm_name_chs }</option>
                      </c:forEach>
                     </c:if>
				  	</select>
				</div>
			</div>
			<div class="control-group" style="float: left;display:inline; ">
				<label class="control-label" style="width: 100px;">栋舍类型:</label>
				<div class="controls" style="margin-left: 110px;">
					<select id="house_type" class="m-wrap"  name="house_type"  style="width: 220px;">
					 <option value="">请选择</option>
                      <c:if test="${!empty houseType}">
                      <c:forEach var="ht" items="${houseType}">
                       <option value="${ht.biz_code}" <c:if test="${ht.biz_code==houselData.house_type}">selected</c:if>>${ht.code_name }</option>
                      </c:forEach>
                     </c:if>
				  	</select>
				</div>
			</div>
			<div class="control-group" style="clear:both;">
				<label class="control-label" style="width: 100px;">对应设备:</label>
				<div  class="controls" style="margin-left: 130px; margin-right: 10px; " >
					<c:if test="${!empty device}">
	                    <c:forEach var="de" items="${device}">
	                    	<label class="checkbox"  style="width: 250px;">
									<div><span><input type="checkbox" value="${de.main_id }" name="deviceKey1" onclick="houseClick()">${de.device_factory}（设备号:${de.device_code}端口号:${de.port_id}）</span></div> 
						   </label>
	                    </c:forEach>
	                    </c:if>
				</div>
			</div>
			<div class="control-group" style="clear:both;height: 30px;text-align: center;">
				<label class="control-label" style="padding-left: 140px;color: red; width:500px; text-align: center;" id="editHouse_msg"></label>
			</div>
			<div class="form-actions" style="padding-left: 290px;" >
				<button type="button" class="btn blue" onclick="editHouse()"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>
					&nbsp;&nbsp;&nbsp;&nbsp;
				<button type="button" class="btn" onclick="closeB()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>
			</div>
		</form>
		<!-- END FORM-->  
	</div>
  </body>
</html>
