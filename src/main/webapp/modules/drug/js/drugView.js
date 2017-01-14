/**
 * Created by yoven on 10/31/2016.
 */
var paramTypeList = new Array("plan","fact");

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
	  

//	  $("#state2").css("display", "block");
//      $("#detail2").css("display", "none");
      forward3();
      
      searchData("plan");
      initDrugsSelect();
	});

function empty(){
	if(document.getElementById("drug_id_select").value==""){
		document.getElementById("drug_id").value = null;
	}	
	if(document.getElementById("drug_id1_select").value==""){
		document.getElementById("drug_id1").value = null;
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
        // ,minLength:1
        // ,displayKey: 'text'
    });
    
    //实际
    $('#drug_id1_select').typeahead({
        source: function(query, process) {
        	var goods = getDrugsNameList('drug_id1', query);
            var results = goods.map(function (item,index,input){
                return item.id+"";
			});
            if(results.length ==0){
            	document.getElementById("drug_id1").value = null;
            }
            process(results);
            // return goods;
        }
        ,matcher: function (item) {
            var goods = getDrugsNameList('drug_id1', item);
            var flag = false;
            for(var key in goods){
            	if(item == goods[key].id || item == goods[key].text){
            		flag = true;
				}
			}
            return flag;
		}
        ,highlighter: function (item) {
            var goods = getDrugsNameList('drug_id1', item);
            var good = goods.find(function (p) {
                return p.id == item;
            });
            return good.text;
        }
        ,updater: function (item) {
            var goods = getDrugsNameList('drug_id1', item);
            var good = goods.find(function (p) {
                return p.id == item;
            });
            setDrugsInfo('drug_id1', good.id);
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

function setDrugId1(){
	$.ajax({
		type : "post",
		url : path + "/drug/getGoods",
		data : {
			"good_type" : $("#good_type1").val()
		},
		dataType: "json",
		success : function(result) {
			var list = result.obj;
			$("#drug_id1 option").remove();
			$("#drug_id1").append("<option value=\"\">" + "全部"+ "</option>");
			for (var i = 0; i < list.length; i++) {
				$("#drug_id1").append("<option value=" + list[i].good_id + ">" + list[i].good_name+ "</option>");
			}
			setFactory();
		}
	});
}

function setFactory(){
	$.ajax({
		type : "post",
		url : path + "/drug/getFactory",
		data : {
			"good_type" : $("#good_type1").val(),
			"good_id" : $("#drug_id1").val()
		},
		dataType: "json",
		success : function(result) {
			var list = result.obj;
			$("#factory_id option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#factory_id").append("<option value=" + list[i].factory_id + ">" + list[i].factory_name+ "</option>");
			}
		}
	});
}

function addDrug(){
	var houseId = $("#houseId").val();
	if (houseId == "") {
		layer.alert('栋舍不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var use_date = $("#use_date").val();
	if (use_date == "") {
		layer.alert('日期不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var drug_id1 = $("#drug_id1").val();
	if (drug_id1 == "") {
		layer.alert('药品不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var good_batch_no = $("#good_batch_no").val();
	if (good_batch_no == "") {
		layer.alert('批次号不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var use_unit = $("#use_unit").val();
	if (use_unit == "") {
		layer.alert('使用数量不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var good_type1 = $("#good_type1").val();
	if (good_type1 == "") {
		layer.alert('类型不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var use_user_id = $("#use_user_id").val();
	if (use_user_id == "") {
		layer.alert('负责人不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var main_constitute = $("#main_constitute").val();
//	if (main_constitute == "") {
//		layer.alert('主要成分不能为空!', {
//			skin : 'layui-layer-lan',
//			closeBtn : 0,
//			shift : 4
//		// 动画类型
//		});
//		return;
//	}
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
//	var instruction1 = $("#instruction1").val();
//	if (instruction1 == "") {
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
			"farm_name": $("#farm_name").val(),
			"houseId": houseId,
			"house_name": document.getElementById("houseId").options[document.getElementById("houseId").selectedIndex].text,
			"use_date": use_date,
			"drug_id": drug_id1,
			"drug_name": document.getElementById("drug_id1").options[document.getElementById("drug_id1").selectedIndex].text,
			"good_batch_no": good_batch_no,
			"use_unit": use_unit,
			"good_type":good_type1,
			"use_user_id":use_user_id,
			"main_constitute": main_constitute,
			"use_type": use_type
//			"instruction": instruction1
	    };
	// document.getElementById("reflushText2").style.display="inline";
	layer.confirm('是否确认？', {
        skin: 'layui-layer-lan'
        , closeBtn: 0
        , shift: 4 //动画类型
    }, function ok() {
    	$.ajax({
            // async: true,
            url: path+"/drug/saveData",
            data: p,
            type : "POST",
            dataType: "json",
            cache: false,
            // timeout:50000,
            success: function(result) {     
                    var obj = result.obj;
                    initTable("fact", getTableDataColumns("fact"), []);
                    if(null != obj) {
                        var dataJosn = $.parseJSON(JSON.stringify(obj));
                        $("#factTable").bootstrapTable('load',dataJosn);
                    } else{
                        initTableRow("fact", getTableEmptyRow("fact"));
                    }
               
            }
        });
        layer.msg(false, {
            skin: 'layui-layer-lan'
            , closeBtn: 0
            , shift: 4 //动画类型
        });
    });
	
	// document.getElementById("reflushText2").style.display="none";
}

function deleteDrug(){
	var deleteRow;
	var deleteRow2 ="";
    deleteRow = $('#factTable').bootstrapTable('getSelections');
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
    // document.getElementById("reflushText2").style.display="inline";
    layer.confirm('是否确认删除？', {
        skin: 'layui-layer-lan'
        , closeBtn: 0
        , shift: 4 //动画类型
    }, function ok() {
    	$.ajax({
            // async: true,
            url: path+"/drug/deleteData",
            data: {"deleteRow":deleteRow2},
            type : "POST",
            dataType: "json",
            cache: false,
            // timeout:50000,
            success: function(result) {     
                    var obj = result.obj;
    				initTableWithToolBar("fact", "factToolbar", getTableDataColumns("fact"), []);
                    if(null != obj) {
                        var dataJosn = $.parseJSON(JSON.stringify(obj));
                        $("#factTable").bootstrapTable('load',dataJosn);
                    } else{
                        initTableRow("fact", getTableEmptyRow("fact"));
                    }
                    layer.msg(false, {
                        skin: 'layui-layer-lan'
                        , closeBtn: 0
                        , shift: 4 //动画类型
                    });
            }
        });
    });
	// document.getElementById("reflushText2").style.display="none";
}

function searchData(paramTypeSelectValue){
//    var dataJosn;
    var p;
    if(paramTypeSelectValue=="plan"){
    	p = {
    	    	"grow_week_age": $("#grow_week_age").val(),
    	    	"start_grow_week_age": $("#start_grow_week_age").val(),
    	    	"end_grow_week_age": $("#end_grow_week_age").val(),
    	    	"good_type": $("#good_type").val(),
    	    	"drug_id": $("#drug_id").val(),
//    	    	"instruction": $("#instruction").val(),
    	    	"paramTypeSelectValue" : "plan"
    	    };  
    	// document.getElementById("reflushText").style.display="inline";
    }else{
    	p={"paramTypeSelectValue" :"fact"};
    	// document.getElementById("reflushText2").style.display="inline";
    }
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
                initTable(paramTypeSelectValue, getTableDataColumns(paramTypeSelectValue), []);
                if(null != obj) {
                    var dataJosn = $.parseJSON(JSON.stringify(obj));
                    $("#" + paramTypeSelectValue + "Table").bootstrapTable('load',dataJosn);
                } else{
                    initTableRow(paramTypeSelectValue, getTableEmptyRow(paramTypeSelectValue));
                }
           
        }
    });
    if(paramTypeSelectValue=="plan"){
    // document.getElementById("reflushText").style.display="none";
    }else{
    	// document.getElementById("reflushText2").style.display="none";
    }
};

function getTableEmptyRow(tableName){
    var count = $('#' + tableName + 'Table').bootstrapTable('getData').length;
    count += -10000;
    var emptyRow ;
    var defaultValue = "";
    if(tableName == paramTypeList[0]) {
        emptyRow = {drug_id: count,
        		    grow_week_age: defaultValue,
        		    drug_name: defaultValue,
//        		    Instruction: defaultValue,
        		    use_unit: defaultValue,
        		    use_type: defaultValue
                    };
    }
    if(tableName == paramTypeList[1]) {
        emptyRow = {id: count,
        		    use_date: defaultValue,
        		    house_name: defaultValue,
        		    drug_name: defaultValue,
        		    good_batch_no: defaultValue,
        		    factory_name: defaultValue,
        		    use_unit: defaultValue,
//        		    Instruction: defaultValue,
        		    use_type: defaultValue,
        		    main_constitute: defaultValue,
        		    user_real_name: defaultValue
        };
    }

    return emptyRow;
}

function getTableDataColumns(paramTypeSelectValue){
    if(paramTypeSelectValue == paramTypeList[0]) {
        return getPlanTableDataColumns();
    }
    if(paramTypeSelectValue == paramTypeList[1]) {
        return getFactTableDataColumns();
    }
}

function getPlanTableDataColumns(){
    var dataColumns = [{
        field: "id",
        title: "ID",
        visible: false
    }, {
        field: "grow_week_age",
        title: "生长周龄",
		width: '5%'
    }, {
        field: "drug_name",
        title: "疫苗名称"
    }, 
//    {
//        field: "Instruction",
//        title: "使用方法"
//    }, 
    {
        field: "use_unit",
        title: "使用数量"
    }, {
        field: "use_type",
        title: "用途"
    }];
    return dataColumns;
}

function getFactTableDataColumns(){
    var dataColumns = [{
        checkbox: true,
        width: '5%'
    }, {
        field: "id",
        title: "ID",
        visible: false
    }, {
        field: "use_date",
        title: "日期"
    }, {
        field: "house_name",
        title: "栋舍"
    }, {
        field: "drug_name",
        title: "名称"
    }
//    , {
//        field: "use_unit",
//        title: "使用数量"
//    }
    , {
        field: "good_batch_no",
        title: "批号"
    }, {
        field: "factory_name",
        title: "厂家"
    }, {
        field: "use_unit",
        title: "使用数量"
    }, 
//    {
//        field: "Instruction",
//        title: "使用方法"
//    }, 
    {
        field: "use_type",
        title: "用途"
    }, {
        field: "main_constitute",
        title: "主要成分"
    }, {
        field: "user_real_name",
        title: "负责人"
    }];
    return dataColumns;
}

function setUser(){
	$.ajax({
		type : "post",
		url : path + "/drug/getUser",
		data : {
			"houseId" : $("#houseId").val()
		},
		dataType: "json",
		success : function(result) {
			var list = result.obj;
			$("#use_user_id option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#use_user_id").append("<option value=" + list[i].id + ">" + list[i].user_real_name+ "</option>");
			}
		}
	});
}



function forward2(){
	$("#state2").css("display", "none");
    $("#detail2").css("display", "block");
    searchData("fact");
}
function forward3(){
	$("#state2").css("display", "block");
    $("#detail2").css("display", "none");
}

