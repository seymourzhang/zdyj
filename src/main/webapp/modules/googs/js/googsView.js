$(document).ready(function() {
	$(".date-picker").datepicker({
		language : 'zh-CN',
		autoclose : true,
		todayHighlight : true
	});

	$(".date-picker1").datepicker({
		language : 'zh-CN',
		autoclose : true,
		defaultDate : new Date(),
		todayHighlight : true
	});
	$(".date-picker1").datepicker('setDate', new Date());//

	$("#good_type").change(function() {
		setGoodName();
	});

	/** *****耗用*************************************************** */

	$("#good_type_out").change(function() {
		setGoodNameOut();
	});

	/** *****耗用*************************************************** */

	$("#good_id").change(function() {
		setCorporation();
		setFactory();
	});
	/****************************/
	$("#good_type_stock").change(function() {
		setGoodNameStock();
	});
	$("#good_id_stock").change(function() {
		setCorporationStock();
		setFactoryStock();
	});
	setGoodName();
	setGoodNameOut();
	setGoodNameStock();
	
	
	setCorporationStock();
	setFactoryStock();
	
	var dataJosn;
	initTable("inStock", getInStockTableColumns(), dataJosn);
	initTable("outStock", getOutStockTableColumns(), dataJosn);
	initTable("stock", getStockTableColumns(), dataJosn);
	
	getInstock();
	getOutStock();
	queryStock();
	
})

function setGoodName() {
	$.ajax({
		type : "post",
		url : path + "/googs/getGoods",
		data : {
			"good_type" : $("#good_type").val()
		},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#good_id option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#good_id").append("<option value=" + list[i].good_id + ">" + list[i].good_name + "</option>");
			}
			setCorporation();
			setFactory();
		}
	})
}

function setCorporation() {
	$.ajax({
		type : "post",
		url : path + "/googs/getCorporation",
		data : {
			"good_id" : $("#good_id").val()
		},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#corporation_id option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#corporation_id").append("<option value=" + list[i].corporation_id + ">" + list[i].corporation + "</option>");
			}
		}
	})
}

function setFactory() {
	$.ajax({
		type : "post",
		url : path + "/googs/getFactory",
		data : {
			"good_id" : $("#good_id").val()
		},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#factory_id option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#factory_id").append("<option value=" + list[i].factory_id + ">" + list[i].factory_name + "</option>");
			}
		}
	})
}

function inStock() {
	if (isRead == 0) {
		layer.alert('无权限，请联系管理员!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var count = $("input[name='count']").val();
	if (count == "") {
		layer.alert('入库量不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var price = $("input[name='price']").val();
	if (price == "") {
		layer.alert('单价不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var exp = $("input[name='exp']").val();
	if (exp == "") {
		layer.alert('保质期不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var param = $.serializeObject($('#inStockForm'));
	$.ajax({
		url : path + "/googs/inStock",
		data : param,
		type : "POST",
		dataType : "json",
		success : function(result) {
			if (result.msg == '1') {
				getInstock();
			}else{
				layer.alert('操作失败!', {
					skin : 'layui-layer-lan',
					closeBtn : 0,
					shift : 4
				// 动画类型
				});
				return;
			}
		}
	});
}
function getInStockTableColumns(){
	var dataColumns = [{
        field: "type_name",
        title: "类型"
    },{
    	field: "good_name",
        title: "品名"
    },{
    	field: "spec_name",
        title: "规格"
    },{
    	field: "unit_name",
        title: "单位"
    },{
    	field: "count",
        title: "入库量"
    },{
    	field: "operation_date",
        title: "入库日期"
    },{
    	field: "corporation",
    	title: "供应方"
    },{
    	field: "factory_name",
        title: "生产厂家"
    },{
    	field: "exp",
        title: "保质期"
    }];
	return dataColumns;
}

function getInstock() {
	$.ajax({
		url : path + "/googs/getStockChange",
		data : {
			"operation_kind" : 2
		},
		type : "POST",
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#inStockTable").bootstrapTable("load",list);
//			$("#inStockTbody tr").remove();
//			for (var i = 0; i < list.length; i++) {
//				var str = '';
//				str += "<tr class='odd gradeX'>";
//				str += "<td>" + list[i].type_name + "</td>";
//				str += "<td>" + list[i].good_name + "</td>";
//				str += "<td>" + list[i].spec_name + "</td>";
//				str += "<td>" + list[i].unit_name + "</td>";
//				str += "<td>" + list[i].count + "</td>";
//				str += "<td>" + list[i].operation_date + "</td>";
//				if (list[i].corporation == null) {
//					str += "<td></td>";
//				} else {
//					str += "<td>" + list[i].corporation + "</td>";
//				}
//				if (list[i].factory_name == null) {
//					str += "<td></td>";
//				} else {
//					str += "<td>" + list[i].factory_name + "</td>";
//				}
//				str += "<td>" + list[i].exp + "</td>";
//				$("#inStockTbody").append(str);
//			}
		}
	});
}
/** *****耗用*************************************************** */

function setGoodNameOut() {
	$.ajax({
		type : "post",
		url : path + "/googs/getGoods",
		data : {
			"good_type" : $("#good_type_out").val()
		},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#good_id_out option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#good_id_out").append("<option value=" + list[i].good_id + ">" + list[i].good_name + "</option>");
			}
		}
	})
}
function outStock() {
	if (isRead == 0) {
		layer.alert('无权限，请联系管理员!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	var count_out = $("#count_out").val();
	if (count_out == "") {
		layer.alert('耗用量不能为空!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}

	var param = $.serializeObject($('#outStockForm'));
	$.ajax({
		url : path + "/googs/outStock",
		data : param,
		type : "POST",
		dataType : "json",
		success : function(result) {
			if (result.msg == '1') {
				getOutStock();
			} else if (result.msg == '2') {
				layer.alert('库存不足！', {
					skin : 'layui-layer-lan',
					closeBtn : 0,
					shift : 4
				// 动画类型
				});
				return;
			}else{
				layer.alert('操作失败!', {
					skin : 'layui-layer-lan',
					closeBtn : 0,
					shift : 4
				// 动画类型
				});
				alert("操作失败！");
			}
		}
	});
}
function getOutStockTableColumns(){
	var dataColumns = [{
        field: "house_name",
        title: "栋"
    },{
        field: "type_name",
        title: "类型"
    },{
    	field: "good_name",
        title: "品名"
    },{
    	field: "count",
        title: "耗用数量"
    },{
    	field: "operation_date",
        title: "耗用日期"
    }];
	return dataColumns;
}

function getOutStock() {
	$.ajax({
		url : path + "/googs/getStockChange",
		data : {
			"operation_kind" : 1
		},
		type : "POST",
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#outStockTable").bootstrapTable("load",list);
//			
//			$("#outStockTbody tr").remove();
//			for (var i = 0; i < list.length; i++) {
//				var str = '';
//				str += "<tr class='odd gradeX'>";
//				str += "<td>" + list[i].house_name + "</td>";
//				str += "<td>" + list[i].type_name + "</td>";
//				str += "<td>" + list[i].good_name + "</td>";
//				str += "<td>" + list[i].count + "</td>";
//				str += "<td>" + list[i].operation_date + "</td>";
//				$("#outStockTbody").append(str);
//			}
		}
	});
}

/** *****库存*************************************************** */

function setGoodNameStock() {
	$.ajax({
		type : "post",
		url : path + "/googs/getGoods",
		data : {
			"good_type" : $("#good_type_stock").val()
		},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#good_id_stock option").remove();
			$("#good_id_stock").append("<option value=''>全部</option>");
			for (var i = 0; i < list.length; i++) {
				$("#good_id_stock").append("<option value=" + list[i].good_id + ">" + list[i].good_name + "</option>");
			}
			setCorporationStock();
			setFactoryStock();
		}
	})
}

function setCorporationStock() {
	$.ajax({
		type : "post",
		url : path + "/googs/getCorporation",
		data : {
			"good_type" : $("#good_type_stock").val(),
			"good_id" : $("#good_id_stock").val()
		},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#corporation_id_stock option").remove();
			$("#corporation_id_stock").append("<option value=''>全部</option>");
			for (var i = 0; i < list.length; i++) {
				$("#corporation_id_stock").append("<option value=" + list[i].corporation_id + ">" + list[i].corporation + "</option>");
			}
		}
	})
}

function setFactoryStock() {
	$.ajax({
		type : "post",
		url : path + "/googs/getFactory",
		data : {
			"good_type" : $("#good_type_stock").val(),
			"good_id" : $("#good_id_stock").val()
		},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#factory_id_stock option").remove();
			$("#factory_id_stock").append("<option value=''>全部</option>");
			for (var i = 0; i < list.length; i++) {
				$("#factory_id_stock").append("<option value=" + list[i].factory_id + ">" + list[i].factory_name + "</option>");
			}
		}
	})
}

function getMessages(){
	if (isRead == 0) {
		layer.alert('无权限，请联系管理员!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	 var getRow = $('#stockTable').bootstrapTable('getSelections');
	 if(getRow==null||getRow==''){
		 layer.alert('请选择要调整的数据!', {
				skin : 'layui-layer-lan',
				closeBtn : 0,
				shift : 4
			// 动画类型
			});
		 return;
	 }
	 /***判断是否存在未审批的调整纪录*************/
	 var param =getRow[0];
		param["operation_kind"]=3;
		param["approve_status"]=1;
		$.ajax({
			url : path + "/googs/isAdjust",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				if(result.msg=="1") {
					layer.alert('此纪录存在未审批的处理，请先审批!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					openAdjustWin(getRow);
				}
			}
		});
	 
	 
}
/****弹出调整窗口*****/
function openAdjustWin(getRow){
var str = '<div style="padding-left: 10px;">&nbsp;</div>';
    str+='<div style="padding-left: 20px;font-size:14px; width: 510px;color: #999999;"><span style="display:block;width: 60px;float:left;text-align: right;">类型:</span><span style="display:block;width: 110px;float:left;">'+getRow[0].type_name+'</span> <span style="display:block;width:60px;float:left;text-align: right;">品名:</span><span style="display:block;width: 110px;float:left;">'+getRow[0].good_name+'</span><span style="display:block;width: 50px;float:left;text-align: right;">规格:</span><style="display:block;width: 100px;float:left;">'+getRow[0].spec_name+'</span></span></span> </div>';
    str+='<div style="padding-left: 20px;font-size:14px; width: 510px;padding-top: 10px;color: #999999;"><span style="display:block;width: 60px;float:left;text-align: right;">生产厂家:</span>';
    if (getRow[0].factory_name == null) {
		str+='<span style="display:block;width: 110px;float:left;">&nbsp;</span> ';   
	 }else{
		 str+='<span style="display:block;width: 110px;float:left;">'+getRow[0].factory_name+'</span> ';   
	 }
    str+='<span style="display:block;width:60px;float:left;text-align: right;">供应方:</span>';
    if(getRow[0].corporation == null) {
    	 str+='<span style="display:block;width: 110px;float:left;">&nbsp;</span> ';   
    }else{
    	 str+='<span style="display:block;width: 110px;float:left;">'+getRow[0].corporation+'</span>';
    }
    str+='<span style="display:block;width: 50px;float:left;text-align: right;">单位:</span><style="display:block;width: 100px;float:left;">'+getRow[0].unit_name+'</span></span></span> </div>';
    str+='<div style="padding-left: 15px;font-size:14px; width: 510px;padding-top: 20px;"><span style="display:block;width: 210px;float:left;padding-top: 10px;">调整数量:&nbsp;&nbsp; <input type="text" style="width: 100px;margin-top: 5px;" name="count" id="adjustValue"/></span> <span style="display:block;width: 141px;float:left;padding-top: 20px;color: #999999;">调整后库存量:&nbsp;&nbsp;<span id="adjustNum">'+getRow[0].stockCount+'</span></span><span style="display:block;width: 120px;float:left;padding-top: 20px;color: #999999;">当前库存量:&nbsp;&nbsp;'+getRow[0].stockCount+'</span> </div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-green', //加上边框
	  area: ['530px', '240px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		  var adjustValue=$("#adjustValue").val();
		  if(adjustValue==null||adjustValue==''){
				 layer.alert('请输入调整数量!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				 return;
			}
		  if(isNaN(adjustValue)){
			  layer.alert('请输入数字!', {
					skin : 'layui-layer-lan',
					closeBtn : 0,
					shift : 4
				// 动画类型
				});
			 return;
		  }
		var param =getRow[0];
		param["adjustValue"]=adjustValue;
		$.ajax({
			url : path + "/googs/setStockSum",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				layer.close(index); 
				if(result.msg=="1") {
					layer.alert('操作成功,进入审批流程!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.alert('操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
	  }
	});
$("#adjustValue").blur(function(){
	  var adjustValue=$("#adjustValue").val();
	  if(isNaN(adjustValue)){
		  layer.alert('请输入数字!', {
				skin : 'layui-layer-lan',
				closeBtn : 0,
				shift : 4
			// 动画类型
			});
		 return;
	  }else{
		  var num=Number(getRow[0].stockCount)+Number($("#adjustValue").val());
			if(num<0){
				layer.alert('调整后的数量小于零!', {
					skin : 'layui-layer-lan',
					closeBtn : 0,
					shift : 4
				// 动画类型
				});
			}else{
				$("#adjustNum").text(num);
			}
	  }
 });
	
	
	
	
	
}


function getStockTableColumns(){
	var dataColumns = [{
		radio: true,
        title: "选择",
        width: '5%'
    },{
        field: "type_name",
        title: "类型"
    },{
    	field: "good_name",
        title: "品名"
    },{
    	field: "spec_name",
        title: "规格"
    },{
    	field: "unit_name",
        title: "单位"
    },{
    	field: "corporation",
    	title: "供应方"
    },{
    	field: "factory_name",
        title: "生产厂家"
    },{
    	field: "stockCount",
        title: "库存量"
    }];
	return dataColumns;
}
function queryStock(){
	
	var param = $.serializeObject($('#stockForm'));
	$.ajax({
		url : path + "/googs/getStockSum",
		data : param,
		type : "POST",
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#stockTable").bootstrapTable("load",list);
//			$("#stockTbody tr").remove();
//			for (var i = 0; i < list.length; i++) {
//				var str = '';
//				str += "<tr class='odd gradeX'>";
//				str += "<td> <input type='checkbox' name='stockId' value="+list[i].type_name+">&nbsp;</td>";
//				str += "<td>" + list[i].type_name + "</td>";
//				str += "<td>" + list[i].good_name + "</td>";
//				str += "<td>" + list[i].spec_name + "</td>";
//				str += "<td>" + list[i].unit_name + "</td>";
//				if (list[i].corporation == null) {
//					str += "<td></td>";
//				} else {
//					str += "<td>" + list[i].corporation + "</td>";
//				}
//				if (list[i].factory_name == null) {
//					str += "<td></td>";
//				} else {
//					str += "<td>" + list[i].factory_name + "</td>";
//				}
//				str += "<td>" + list[i].stockCount + "</td>";
//				$("#stockTbody").append(str);
//			}
		}
	});
}

/*****库存****************************************************/
