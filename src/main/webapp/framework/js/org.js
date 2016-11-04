$(document).ready(function() {
	$.ajax({
		type : "post",
		url : path + "/org/getOrg",
		data : {},
		dataType : "json",
		success : function(result) {
			$("#getOrg option").remove();
			var orglist = result.obj1;
			var list = result.obj;
			var str = '';
			var pid=0;
			count0rg=list.length;
			for (var i = 0; i < list.length; i++) {
				if(i==0){
					str += "<div class='span3' style='width: 180px;'>";
					str += "<div class='control-group'>";
					str += "<label class='control-label' style='width: 30px;'>" + list[i].level_name + "</label>";
					str += "<div class='controls' style='margin-left: 35px;'>";
					str += "<select id='orgId"+list[i].level_id+"' style='width: 160px;' onchange='getOrgList("+(list[i].level_id+1)+")' class='m-wrap span12' tabindex='1' name='orgId"+list[i].level_id+"'>";
					for (var j = 0; j < orglist.length; j++) {
						if (orglist[j].level_id == list[i].level_id&&pid==orglist[j].parent_id) {
							str +="<option value=" + orglist[j].id + ","+orglist[j].organization_id+">" + orglist[j].name_cn + "</option>";
						}
					}
				
				}else{
					str += "<div class='span3' style='width: 120px;'>";
					str += "<div class='control-group'>";
					str += "<label class='control-label' style='width: 30px;'>" + list[i].level_name + "</label>";
					str += "<div class='controls' style='margin-left: 35px;'>";
					str += "<select id='orgId"+list[i].level_id+"' style='width: 100px;' onchange='getOrgList("+(list[i].level_id+1)+")' class='m-wrap span12' tabindex='1' name='orgId"+list[i].level_id+"'>";
					str +=getChildList(list[i].parent_id);
				}
				
//				for (var j = 0; j < orglist.length; j++) {
//					if (orglist[j].level_id == list[i].level_id&&pid==orglist[j].parent_id) {
//						str +="<option value=" + orglist[j].id + ","+orglist[j].organization_id+">" + orglist[j].name_cn + "</option>";
//					}
//				}
				
				str +="</select></div></div></div>";
			}
			$("#getOrg").append(str);
			getOrgList(list[0].level_id+1);
		}
	})
})
	
function getChildList(em){
	$.ajaxSetup({ async: false  });
	var str='';
    $.get(path+"/org/getOrgByPid?parent_id="+em+"&d="+ new Date().getTime(), function(result){
    	var re = $.parseJSON(result);
    	var list = re.obj;
    	for (var i = 0; i < list.length; i++) {
				str +="<option value=" + list[i].id + ","+list[i].organization_id+">" + list[i].name_cn + "</option>";
		}
    });
    return str;
}
	
function getOrgList(id){
		if(id==5){
			$.ajax({
				type : "post",
				url : path + "/temProfile/getBatch",
				data : {
					"farmId" : $("#orgId"+(count0rg-1)).val().split(",")[1] ,
					"houseId" :$("#orgId"+count0rg).val().split(",")[1]
				},
				dataType: "json",
				success : function(result) {
					var list = result.obj;
					$("#batchId option").remove();
					for (var i = 0; i < list.length; i++) {
						$("#batchId").append("<option value=" + list[i].batch_no+ ">" + list[i].batch_no + "</option>");
					}
//					$("#batchId").val(list[0].batch_no);
					OrgSearch(count0rg,num);
				}
			})
		}else{
			$.ajax({
				type : "post",
				url : path + "/org/getOrgByPid",
				data : {
					"parent_id" : $("#orgId"+(id-1)).val().split(",")[0]
				},
				dataType: "json",
				success : function(result) {
					var list = result.obj;
					$("#orgId"+id+" option").remove();
					for (var i = 0; i < list.length; i++) {
						$("#orgId"+id).append("<option value=" + list[i].id + ","+list[i].organization_id+">" + list[i].name_cn + "</option>");
					}
					getOrgList(id+1);
					OrgSearch(count0rg,num);
				}
			})
			
		}
		
	}