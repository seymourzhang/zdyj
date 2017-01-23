/**
 * Created by yoven on 10/31/2016.
 */

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

	  $("#good_type").change(function() {
		  setDrugId();
		 });

      searchData();
      initDrugsSelect();
	});

function empty(){
	if(document.getElementById("drug_id_select").value==""){
		document.getElementById("drug_id").value = null;
	}	
}

function initDrugsSelect(){
    $.fn.typeahead.Constructor.prototype.blur = function() {
        var that = this;
        setTimeout(function () { that.hide(); }, 250);
    };

    //计划
    $('#drug_id_select').typeahead({
        source: function(query, process) {
        	var goods = getDrugsNameList('drug_id', query);
            var results = goods.map(function (item,index,input){
                return item.id+"";
			});
            if(results.length ==0){
            	document.getElementById("drug_id").value = null;
            }
            process(results);
            // return goods;
        }
        ,matcher: function (item) {
            var goods = getDrugsNameList('drug_id', item);
            var flag = false;
            for(var key in goods){
            	if(item == goods[key].id || item == goods[key].text){
            		flag = true;
				}
			}
            return flag;
		}
        ,highlighter: function (item) {
            var goods = getDrugsNameList('drug_id', item);
            var good = goods.find(function (p) {
                return p.id == item;
            });
            return good.text;
        }
        ,updater: function (item) {
            var goods = getDrugsNameList('drug_id', item);
            var good = goods.find(function (p) {
                return p.id == item;
            });
            setDrugsInfo('drug_id', good.id);
            return good.text;
        }
    });
}

function setDrugsInfo(selectName, goodId){
    var select = document.getElementById(selectName);
    var options = select.options;
    for(var key in options){
        if(goodId == options[key].value){
        	options[key].selected = true;
        }
	}
}

function getDrugsNameList(selectName, value){
	var drugsNameList = [];
    var select = document.getElementById(selectName);
    var options = select.options;
	var oValue = "";
    var oText = "";
	for(var key in options){
        oValue = options[key].value;
		oText = options[key].text;
        var oTextFlag = new RegExp(value).test(oText);
        var oValueFlag = new RegExp(value).test(oValue);
		if(oTextFlag == true || oValueFlag == true){
			drugsNameList.push({id:oValue, text:oText});
		}
	}
	// goodsNameList = [{id:'1', text:'新的什么'},{id:'2', text:'新的什么2'},{id:'3', text:'的什么'}];
	return drugsNameList;
}

function setDrugId(){
	$.ajax({
		type : "post",
		url : path + "/drug/getGoods",
		data : {
			"good_type" : $("#good_type").val()
		},
		dataType: "json",
		success : function(result) {
			var list = result.obj;
			$("#drug_id option").remove();
			$("#drug_id").append("<option value=\"\">" + "全部"+ "</option>");
			for (var i = 0; i < list.length; i++) {
				$("#drug_id").append("<option value=" + list[i].good_id + ">" + list[i].good_name+ "</option>");
			}
		}
	});
}

function addDrug(){
	var grow_week_age = $("#grow_week_age").val();
	if (parseInt(grow_week_age)<0) {
		layer.alert('生长周龄必须大于0!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var drug_id = $("#drug_id").val(); 
	if (drug_id == "") {
		layer.alert('药品不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var use_unit = $("#use_unit").val();
	if (use_unit<0) {
		layer.alert('使用数量必须大于0!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var good_type = $("#good_type").val();
	if (good_type == "") {
		layer.alert('类型不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var use_type = $("#use_type").val();
	if (use_type == "") {
		layer.alert('用途不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
//	var instruction = $("#instruction").val();
//	if (instruction == "") {
//		layer.alert('使用方法不能为空!', {
//			skin : 'layui-layer-lan',
//			closeBtn : 0,
//			shift : 4
//		// 动画类型
//		});
//		return;
//	}
	var p = {
			"farmId": $("#farmId").val(),
			"farm_name": document.getElementById("farmId").options[document.getElementById("farmId").selectedIndex].text,
			"drug_id": drug_id,
			"drug_name": document.getElementById("drug_id").options[document.getElementById("drug_id").selectedIndex].text,
			"use_unit": use_unit,
			"good_type":good_type,
			"use_type": use_type,
//			"instruction": instruction,
			"grow_week_age":$("#grow_week_age").val()
	    };
	// document.getElementById("reflushText").style.display="inline";
	$.ajax({
        // async: true,
        url: path+"/drug/savePlanData",
        data: p,
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {     
                var obj = result.obj;
                initTable("plan", getTableDataColumns("plan"), []);
                if(null != obj) {
                    var dataJosn = $.parseJSON(JSON.stringify(obj));
                    $("#planTable").bootstrapTable('load',dataJosn);
                } else{
                    initTableRow("plan", getTableEmptyRow("plan"));
                }
           
        }
    });
	// document.getElementById("reflushText").style.display="none";
}

function deleteDrug(){
	var deleteRow;
	var deleteRow2 ="";
    deleteRow = $('#planTable').bootstrapTable('getSelections');
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
    	deleteRow2 = deleteRow2+deleteRow[i].id+";";
    }
    // document.getElementById("reflushText").style.display="inline";
	$.ajax({
        // async: true,
        url: path+"/drug/deletePlanData",
        data: {"deleteRow":deleteRow2},
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {     
                var obj = result.obj;
                initTable("plan", getTableDataColumns("plan"), []);
                if(null != obj) {
                    var dataJosn = $.parseJSON(JSON.stringify(obj));
                    $("#planTable").bootstrapTable('load',dataJosn);
                } else{
                    initTableRow("plan", getTableEmptyRow("plan"));
                }
           
        }
    });
	// document.getElementById("reflushText").style.display="none";
}

function searchData(){
//    var dataJosn;
    var p= {"paramTypeSelectValue":"plan2"};  
    	// document.getElementById("reflushText").style.display="inline";
    $.ajax({
        // async: true,
        url: path+"/drug/searchData",
        data: p,
        type : "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function(result) {     
                var obj = result.obj;
                initTable("plan", getTableDataColumns("plan"), []);
                if(null != obj) {
                    var dataJosn = $.parseJSON(JSON.stringify(obj));
                    $("#planTable").bootstrapTable('load',dataJosn);
                } else{
                    initTableRow("plan", getTableEmptyRow("plan"));
                }
           
        }
    });
    // document.getElementById("reflushText").style.display="none";
};

function getTableEmptyRow(tableName){
    var count = $('#' + tableName + 'Table').bootstrapTable('getData').length;
    count += -10000;
    var emptyRow ;
    var defaultValue = "";
        emptyRow = {drug_id: count,
        		    grow_week_age: defaultValue,
        		    drug_name: defaultValue,
//        		    Instruction: defaultValue,
        		    use_unit: defaultValue,
        		    use_type: defaultValue
                    };

    return emptyRow;
}

function getTableDataColumns(){
        return getPlanTableDataColumns();
}

function getPlanTableDataColumns(){
    var dataColumns = [{
        checkbox: true,
        width: '5%'
    }, {
        field: "id",
        title: "ID",
        visible: false
    }, {
        field: "grow_week_age",
        title: "生长周龄",
        width: '8%'
    }, {
        field: "drug_name",
        title: "疫苗名称",
        width: '18%'
    }, 
//    {
//        field: "Instruction",
//        title: "使用方法"
//    }, 
    {
        field: "use_unit",
        title: "使用数量",
        width: '12%'
    }, {
        field: "use_type",
        title: "用途",
        width: '25%'
    }];
    return dataColumns;
}

