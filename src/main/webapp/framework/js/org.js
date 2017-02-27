
$(document).ready(function() {
	$.ajax({
		type : "post",
		url : path + "/org/getOrg",
		data : {},
		dataType : "json",
        async: (typeof(asyncFlag)!="undefined")?asyncFlag:true,
		success : function(result) {
			$("#getOrg option").remove();
			var orglist = result.obj1;
			var list = result.obj;
			var str = '';
			var pid=0;
			count0rg=list.length;
			// str += "<div class='row-fluid'>";
			for (var i = 0; i < list.length; i++) {
				if(i==0){
					// str += "<div class='span3'>";
					// str += "<div class='control-group'>";
					// str += "<label class='control-label' style='width: 60px;'>" + list[i].level_name + "</label>";
					str += "<span_customer2 style='" + setDisplay(list[i].level_id) + "'>" + list[i].level_name + "</span_customer2>&nbsp;";
					// str += "<div class='controls' style='margin-left: 65px;'>";
					str += "<select id='orgId"+list[i].level_id+"' style='width: 160px;" + setDisplay(list[i].level_id) + "' onchange='getOrgList("+(list[i].level_id+1)+")' tabindex='1' name='orgId"+list[i].level_id+"'>";
					if(typeof(allSearch)!="undefined"){
					if(allSearch=="true"){
					str +='<option value="">全部</option>'; 
                    }
                    }
					for (var j = 0; j < orglist.length; j++) {
						if (orglist[j].level_id == list[i].level_id&&pid==orglist[j].parent_id) {
							str +="<option value=" + orglist[j].id + ","+orglist[j].organization_id+","+orglist[j].name_cn+","+orglist[j].house_type+">" + orglist[j].name_cn + "</option>";
						}
					}
				
				}else{
					// str += "<div class='span3'>";
					// str += "<div class='control-group'>";
					// str += "<label class='control-label' style='width: 60px;'>" + list[i].level_name + "</label>";
					str += "<span_customer2 style='" + setDisplay(list[i].level_id) + "'>" + list[i].level_name + "</span_customer2>&nbsp;";
					// str += "<div class='controls' style='margin-left: 65px;'>";
					str += "<select id='orgId"+list[i].level_id+"' style='width: 160px;" + setDisplay(list[i].level_id) + "' onchange='getOrgList("+(list[i].level_id+1)+")' tabindex='1' name='orgId"+list[i].level_id+"'>";
					if(typeof(allSearch)!="undefined"){
					if(allSearch=="true"){
						str +='<option value=""> 全部</option>' ;
	                    }
					}
					str +=getChildList(list[i].parent_id);
				}
				
//				for (var j = 0; j < orglist.length; j++) {
//					if (orglist[j].level_id == list[i].level_id&&pid==orglist[j].parent_id) {
//						str +="<option value=" + orglist[j].id + ","+orglist[j].organization_id+">" + orglist[j].name_cn + "</option>";
//					}
//				}
				
				str +="</select>" ;
				str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				// str += "</div>";
				// str += "</div>";
                // str += "</div>";
			}
			// str += "</div>";
			$("#getOrg").append(str);
			getOrgList(list[0].level_id+1);

		}
	});

});

function setDisplay(levelId){
	var rt = "";
    if(typeof(orgLevel) != "undefined"){
    	if(orgLevel < levelId){
			rt = "display: none;";
		}
	}
	return rt;
}

function getChildList(em){
	$.ajaxSetup({ async: false  });
	var str='';
    $.get(path+"/org/getOrgByPid?parent_id="+em+"&d="+ new Date().getTime(), function(result){
    	var re = $.parseJSON(result);
    	var list = re.obj;
    	for (var i = 0; i < list.length; i++) {
				str +="<option value=" + list[i].id + ","+list[i].organization_id+","+list[i].name_cn+","+list[i].house_type+">" + list[i].name_cn + "</option>";
		}
    });
    return str;
}
	
function getOrgList(id){
		if(id==5){
// 			$.ajax({
// 				type : "post",
// 				url : path + "/temProfile/getBatch",
// 				data : {
// 					"farmId" : $("#orgId"+(count0rg-1)).val().split(",")[1] ,
// 					"houseId" :$("#orgId"+count0rg).val().split(",")[1]
// 				},
// 				dataType: "json",
//                 async: (typeof(asyncFlag)!="undefined")?asyncFlag:true,
// 				success : function(result) {
// 					var list = result.obj;
// 					$("#batchId option").remove();
// 					for (var i = 0; i < list.length; i++) {
// 						$("#batchId").append("<option value=" + list[i].batch_no+ ">" + list[i].batch_no + "</option>");
// 					}
// //					$("#batchId").val(list[0].batch_no);
// 					OrgSearch(count0rg,num);
// 				}
// 			});
		}else{
			if(typeof(allSearch)!="undefined"){
				var orgValue = $("#orgId"+(id-1)).val();
				if("" == orgValue || null == orgValue){
                    orgValue=orgValue;
				} else{
                    orgValue=orgValue.split(",")[0];
				}
			if(allSearch=="true" && (orgValue=="" || orgValue==null)){
				$("#orgId"+id+" option").remove();
				$("#orgId"+id).append('<option value="">全部</option>');
				getOrgList(id+1);
				OrgSearch(count0rg,num);
                }else{
                	$.ajax({
        				type : "post",
        				url : path + "/org/getOrgByPid",
        				data : {
        					"parent_id" : $("#orgId"+(id-1)).val().split(",")[0]
        				},
        				dataType: "json",
                        async: (typeof(asyncFlag)!="undefined")?asyncFlag:true,
        				success : function(result) {
        					var list = result.obj;
        					$("#orgId"+id+" option").remove();
        					for (var i = 0; i < list.length; i++) {
        						$("#orgId"+id).append("<option value=" + list[i].id + ","+list[i].organization_id+","+list[i].name_cn+","+list[i].house_type+">" + list[i].name_cn + "</option>");
        					}
        					getOrgList(id+1);
        					OrgSearch(count0rg,num);
        				}
        			});
                }
			}else{
				$.ajax({
    				type : "post",
    				url : path + "/org/getOrgByPid",
    				data : {
    					"parent_id" : $("#orgId"+(id-1)).val().split(",")[0]
    				},
    				dataType: "json",
                    async: (typeof(asyncFlag)!="undefined")?asyncFlag:true,
    				success : function(result) {
    					var list = result.obj;
    					$("#orgId"+id+" option").remove();
    					for (var i = 0; i < list.length; i++) {
    						$("#orgId"+id).append("<option value=" + list[i].id + ","+list[i].organization_id+","+list[i].name_cn+","+list[i].house_type+">" + list[i].name_cn + "</option>");
    					}
    					getOrgList(id+1);
    					OrgSearch(count0rg,num);
    				}
    			});
			}
			
			
		}
		
	}