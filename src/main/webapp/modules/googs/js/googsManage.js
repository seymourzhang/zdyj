var objGoods = new Object();

$(document).ready(function() {
	initObjGoods();

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
	
//	setCorporation();
//	setFactory();
//	setGoodName()
	
	var dataJosn;
	initTable("corporation", getCorporationTableColumns(), dataJosn);
	initTable("factory", getFactoryTableColumns(), dataJosn);
	initTableWithToolBar("goods",'goodsToolbar', getGoodsTableColumns(), dataJosn);
	initTable("corporationGood", getCorporationGoodTableColumns(), dataJosn);

	getCorporation();
	getFactory();
	queryGoods();
	getCorporationGood();
	
});

function getCorporationTableColumns(){
	var dataColumns = [{
        checkbox: true,
        width: '5%'
    }, {
        field: "corporation_id",
        title: "ID",
        visible: false
    },{
        field: "corporation",
        title: "供应商"
    },{
    	field: "corporation_person",
        title: "供应商负责人"
    },{
    	field: "corporation_address",
        title: "地址"
    },{
    	field: "telphone",
        title: "联系电话"
    },{
    	field: "bak",
        title: "备注"
    }];
	return dataColumns;
}

function getCorporation() {
	$.ajax({
		url : path + "/googs/getCorporation2",
		data : {
			"corporation" : $("#corporation").val()
		},
		type : "POST",
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#corporationTable").bootstrapTable("load",list);
		}
	});
}

/*获取厂家列表*/
function getFactoryTableColumns(){
	var dataColumns = [{
        checkbox: true,
        width: '5%'
    }, {
        field: "factory_id",
        title: "ID",
        visible: false
    },{
        field: "factory_name",
        title: "厂家名称"
    },{
        field: "factory_person",
        title: "厂家负责人"
    },{
    	field: "factory_address",
        title: "地址"
    },{
    	field: "telphone",
        title: "联系电话"
    },{
    	field: "bak",
        title: "备注"
    }];
	return dataColumns;
}

function getFactory() {
	$.ajax({
		url : path + "/googs/getFactory2",
		data : {
			"factory_name" : $("#factory_name").val()
		},
		type : "POST",
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#factoryTable").bootstrapTable("load",list);
		}
	});
}

/****弹出新增供应商窗口*****/
function openCorporationWin(){
	if (isRead == 0) {
		layer.alert('无权限，请联系管理员!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '供应商:';
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="width: 70px;" name="corporation1" id="corporation1"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '供应商负责人:' ;
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="width: 70px;" name="corporation_person" id="corporation_person"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '地址:';
		str += '</div>';
			str += '<div class="span2">';
				str += '<input type="text" style="width: 70px;" name="corporation_address" id="corporation_address"/>' ;
			str += '</div>';
	str += '</div>';

	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '联系电话:';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="width: 70px;" name="telphone" id="telphone"/>';
			str += '</div>';
		str += '<div class="span2">';
			str+='备注:';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="width: 70px;" name="bak" id="bak"/>';
			str += '</div>';
		str += '<div class="span2">';
			
		str += '</div>';
			str += '<div class="span2">';
			
			str += '</div>';
	str += '</div>';
	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['570px', '255px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		if(submitForm()){ 
		var param;
		param ={corporation:$("input[name='corporation1']").val(),
				corporation_person:$("#corporation_person").val(),
				corporation_address:$("#corporation_address").val(),
				telphone:$("#telphone").val(),
				bak:$("#bak").val()};
		$.ajax({
			url : path + "/googs/addCorporation",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#corporationTable").bootstrapTable('load',dataJosn);
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
	  }
	  }
	});
}

function submitForm(){
	var corporation=$("input[name='corporation1']").val();
	var corporation_person=$("input[name='corporation_person']").val();
	var corporation_address=$("input[name='corporation_address']").val();
	var telphone=$("input[name='telphone']").val();
	if(corporation =="" ){
			$('#add_msg').html("供应商不能为空！");
			return false;
	}else
		if(corporation_person =="" ){
			$('#add_msg').html("供应商负责人不能为空！");
			return false;
	}else if(corporation_address =="" ){
		$('#add_msg').html("地址不能为空！");
		return false;
}else if(telphone =="" ){
	$('#add_msg').html("联系电话不能为空！");
	return false;
  }	
return true;
}

/****弹出新增厂家窗口*****/
function openFactoryWin(){
	if (isRead == 0) {
		layer.alert('无权限，请联系管理员!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '厂家:';
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="width: 70px;" name="factory_name1" id="factory_name1"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '厂家负责人:' ;
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="width: 70px;" name="factory_person" id="factory_person"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '地址:';
		str += '</div>';
			str += '<div class="span2">';
				str += '<input type="text" style="width: 70px;" name="factory_address" id="factory_address"/>' ;
			str += '</div>';
	str += '</div>';

	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '联系电话:';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="width: 70px;" name="telphone" id="telphone"/>';
			str += '</div>';
		str += '<div class="span2">';
			str+='备注:';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="width: 70px;" name="bak" id="bak"/>';
			str += '</div>';
		str += '<div class="span2">';
			
		str += '</div>';
			str += '<div class="span2">';
			
			str += '</div>';
	str += '</div>';
	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['570px', '255px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		if(submitForm2()){ 
		var param;
		param ={factory_name:$("input[name='factory_name1']").val(),
				factory_person:$("#factory_person").val(),
				factory_address:$("#factory_address").val(),
				telphone:$("#telphone").val(),
				bak:$("#bak").val()};
		$.ajax({
			url : path + "/googs/addFactory",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#factoryTable").bootstrapTable('load',dataJosn);
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
	  }
	  }
	});
}

function submitForm2(){
	var factory_name=$("input[name='factory_name1']").val();
	var factory_person=$("input[name='factory_person']").val();
	var factory_address=$("input[name='factory_address']").val();
	var telphone=$("input[name='telphone']").val();
	if(factory_name =="" ){
			$('#add_msg').html("厂家不能为空！");
			return false;
	}else
		if(factory_person =="" ){
			$('#add_msg').html("厂家负责人不能为空！");
			return false;
	}else if(factory_address =="" ){
		$('#add_msg').html("地址不能为空！");
		return false;
}else if(telphone =="" ){
	$('#add_msg').html("联系电话不能为空！");
	return false;
  }	
return true;
}

/****弹出新增物资窗口*****/
function openGoodsWin(){
	if (isRead == 0) {
		layer.alert('无权限，请联系管理员!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '物资名称:' ;
str += '</div>';
	str += '<div class="span4" >';
		str += '<input type="text" style="width: 70px;" name="good_name1" id="good_name1"/>' ;
	str += '</div>';
		str += '<div class="span2">';
			str += '物资编码:';
		str += '</div>';
			str += '<div class="span4" >';
				str += '<input type="text" style="width: 70px;" name="good_code" id="good_code"/>' ;
			str += '</div>';
//			str += '<div class="span1">';
//			str += '供应商:' ;
//			str += '</div>';
//				str += '<div class="span1" >';
//				str += "<select id='corporation' style='width: 115px;' class='m-wrap span12' tabindex='1' name='corporation'>";
//				var myobj=corporation.split("=");
//				for (var j = 0; j < myobj.length; j++) {
//					if(myobj[j].indexOf("corporation_id") > 0 ){
//						var tt = myobj[j+2];
//						 str +="<option value=" + myobj[j+1].split(",")[0]+","+ tt.split(",")[0] +">" + tt.split(",")[0] + "</option>";
//						 
//					}
//						
//				}
//		     str+='</select>';
//				str += '</div>';	
	str += '</div>';

	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '物资类别:';
str += '</div>';
	str += '<div class="span4">';
		str += "<select id='good_type' style='width: 115px;' class='m-wrap span12' tabindex='1' name='good_type'>";
//		var myobj=goodTypeList.split("=");
//		for (var j = 0; j < myobj.length; j++) {
//			if(myobj[j].indexOf("code_name") > 0 ){
//				 str +="<option value=" + myobj[j-1].split(",")[0] +">" + myobj[j+1].split(",")[0] + "</option>";
//			}
//				
//		}
     str+='</select>';
	str += '</div>';	
		str += '<div class="span2">';
			str += '备注:';
		str += '</div>';
			str += '<div class="span4">';
			str += '<input type="text" style="width: 70px;" name="bak" id="bak"/>';
			str += '</div>';
//			str += '<div class="span1">';
//			str += '厂家:' ;
//			str += '</div>';
//				str += '<div class="span1">';
//				str += "<select id='factory' style='width: 115px;' class='m-wrap span12' tabindex='1' name='factory'>";
//				var myobj=factory.split("=");
//				for (var j = 0; j < myobj.length; j++) {
//					if(myobj[j].indexOf("factory_id") > 0 ){
//						var tt = myobj[j+2];
//						 str +="<option value=" + myobj[j+1].split(",")[0]+","+ tt.split(",")[0] +">" + tt.split(",")[0] + "</option>";
//						 
//					}
//						
//				}
//		     str+='</select>';
//				str += '</div>';	
	str += '</div>';
	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['470px', '255px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		if(submitForm3()){ 
		var param;
		param ={good_code:$("input[name='good_code']").val(),
				good_name:$("#good_name1").val(),
				good_type:$("#good_type").val(),
				bak:$("#bak").val()};
		$.ajax({
			url : path + "/googs/addGoods",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#goodsTable").bootstrapTable('load',dataJosn);
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
	  }
	  }
	});
setGoodsType();
}

function submitForm3(){
	var good_code=$("input[name='good_code']").val();
	var good_name=$("input[name='good_name1']").val();
	var good_type=$("input[name='good_type']").val();
	if(good_code =="" ){
			$('#add_msg').html("物资编码不能为空！");
			return false;
	}else
		if(good_name =="" ){
			$('#add_msg').html("物资名称不能为空！");
			return false;
	}else if(good_type =="" ){
		$('#add_msg').html("物资类别不能为空！");
		return false;
}
return true;
}

/****弹出新增物资供应商关系窗口*****/
function opencorporationGoodWin(){
	if (isRead == 0) {
		layer.alert('无权限，请联系管理员!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '物资类别:';
    str += '</div>';
	str += '<div class="span2">';
		str += '<select id="good_type" style="width: 115px;" class="m-wrap span12" tabindex="1" name="good_type" onchange="setGoodName()">';
//		var myobj=goodTypeList.split("=");
//		for (var j = 0; j < myobj.length; j++) {
//			if(myobj[j].indexOf("code_name") > 0 ){
//				 str +="<option value=" + myobj[j-1].split(",")[0] +">" + myobj[j+1].split(",")[0] + "</option>";
//			}
//				
//		}
     str+='</select>';
	str += '</div>';
	str += '<div class="span2">';
	str += '物资名称:' ;
str += '</div>';
	str += '<div class="span2" >';
	str += "<select id='goods' style='width: 115px;' class='m-wrap span12' tabindex='1' name='goods'>";
//	var goods = setGoodName();
//	var myobj=goods.split("=");
//	for (var j = 0; j < goods.length; j++) {
//		if(myobj[j].indexOf("good_id") > 0 ){
//			var tt = myobj[j+2];
//			 str +="<option value=" + goods[j].good_id+","+ goods[j].good_name +">" + goods[j].good_name + "</option>";
			 
//		}
			
//	}
 str+='</select>';
	str += '</div>';
		str += '<div class="span2">';
			str += '单价:';
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="width: 70px;" name="price" id="price"/>' ;
			str += '</div>';	
	str += '</div>';

	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '规格:';
	str += '</div>';
	str += '<div class="span2" >';
	str += "<select id='spec' style='width: 115px;' class='m-wrap span12' tabindex='1' name='spec'>";
//	var myobj=spec.split("=");
//	for (var j = 0; j < myobj.length; j++) {
//		if(myobj[j].indexOf("code_name") > 0 ){
//			 str +="<option value=" + myobj[j+1].split(",")[0] +">" + myobj[j+1].split(",")[0] + "</option>";
//		}
//			
//	}
 str+='</select>';
	str += '</div>';
	str += '<div class="span2">';
	str += '单位:';
	str += '</div>';
	str += '<div class="span2">';
	str += "<select id='unit' style='width: 115px;' class='m-wrap span12' tabindex='1' name='unit'>";
//	var myobj=unit.split("=");
//	for (var j = 0; j < myobj.length; j++) {
//		if(myobj[j].indexOf("code_name") > 0 ){
//			 str +="<option value=" + myobj[j+1].split(",")[0] +">" + myobj[j+1].split(",")[0] + "</option>";
//		}
//			
//	}
 str+='</select>';
	str += '</div>';
		str += '<div class="span2">';
			str += '备注:';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="width: 70px;" name="bak" id="bak"/>';
			str += '</div>';	
	str += '</div>';
	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '供应商:';
    str += '</div>';
    str += '<div class="span2">';
    str += "<select id='corporation1' style='width: 115px;' class='m-wrap span12' tabindex='1' name='corporation1'>";
//	var myobj=corporation.split("=");
//	for (var j = 0; j < myobj.length; j++) {
//		if(myobj[j].indexOf("corporation_id") > 0 ){
//			var tt = myobj[j+2];
//			 str +="<option value=" + myobj[j+1].split(",")[0]+","+ tt.split(",")[0] +">" + tt.split(",")[0] + "</option>";
//			 
//		}
//			
//	}
 str+='</select>';
    str += '</div>';
    str += '<div class="span2">';
	str += '厂家:' ;
	str += '</div>';
		str += '<div class="span2">';
		str += "<select id='factory' style='width: 115px;' class='m-wrap span12' tabindex='1' name='factory'>";
//		var myobj=factory.split("=");
//		for (var j = 0; j < myobj.length; j++) {
//			if(myobj[j].indexOf("factory_id") > 0 ){
//				var tt = myobj[j+2];
//				 str +="<option value=" + myobj[j+1].split(",")[0]+","+ tt.split(",")[0] +">" + tt.split(",")[0] + "</option>";
//				 
//			}
//				
//		}
     str+='</select>';
		str += '</div>';
    str += '</div>';
	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['770px', '255px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){ 
		var param;
		param ={goods:$("#goods").val(),
				price:$("#price").val(),
				good_type:$("#good_type").val(),
				spec:$("#spec").val(),
				unit:$("#unit").val(),
				bak:$("#bak").val(),
				corporation:$("#corporation1").val(),
				factory:$("#factory").val()};
		$.ajax({
			url : path + "/googs/addCorporationGood",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#corporationGoodTable").bootstrapTable('load',dataJosn);
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
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
setGoodType();
setSpec();
setUnit();
setFactory();
setCorporation();
}

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
			$("#goods option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#goods").append('<option value="' + list[i].good_id+','+list[i].good_name + '">' + list[i].good_name + '</option>');
			}
            
		}
	});
}

function setGoodType() {
	$.ajax({
		type : "post",
		url : path + "/googs/getGoodType",
		data : {},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#good_type option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#good_type").append("<option value=" + list[i].biz_code + ">" + list[i].code_name + "</option>");
			}
			setGoodName();
		}
	});
}

function setSpec() {
	$.ajax({
		type : "post",
		url : path + "/googs/getSpec",
		data : {},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#spec option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#spec").append("<option value=" + list[i].biz_code + ">" + list[i].code_name + "</option>");
			}
		}
	});
}

function setUnit() {
	$.ajax({
		type : "post",
		url : path + "/googs/getUnit",
		data : {},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#unit option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#unit").append("<option value=" + list[i].biz_code + ">" + list[i].code_name + "</option>");
			}
		}
	});
}

function setCorporation() {
	$.ajax({
		type : "post",
		url : path + "/googs/getCorporation",
		data : {},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#corporation1 option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#corporation1").append('<option value="' + list[i].corporation_id+','+list[i].corporation + '">' + list[i].corporation + '</option>');
			}
		}
	});
}

function setFactory() {
	$.ajax({
		type : "post",
		url : path + "/googs/getFactory",
		data : {},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#factory option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#factory").append('<option value="' + list[i].factory_id+','+list[i].factory_name + '">' + list[i].factory_name + '</option>');
			}
		}
	})
}


function getGoodsTableColumns(){
	var dataColumns = [{
        checkbox: true,
        title: "选择",
        width: '5%'
    }, {
        field: "good_id",
        title: "ID",
        visible: false
    },{
        field: "good_name",
        title: "物资名称"
    },{
    	field: "good_code",
        title: "物资编码"
    },{
    	field: "bak",
        title: "备注"
    }];
	return dataColumns;
}
function queryGoods(){

	var param = $.serializeObject($('#goodsForm'));
	$.ajax({
		url : path + "/googs/getGoods2",
		data : param,
		type : "POST",
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			var dataJosn = $.parseJSON(JSON.stringify(list));
			$("#goodsTable").bootstrapTable("load",dataJosn);
		}
	});
}

function getCorporationGoodTableColumns(){
	var dataColumns = [{
        checkbox: true,
        title: "选择",
        width: '5%'
    }, {
        field: "id",
        title: "ID",
        visible: false
    },{
        field: "good_name",
        title: "物资名称"
    },{
    	field: "spec",
        title: "规格"
    },{
    	field: "price",
        title: "单价"
    },{
    	field: "unit",
        title: "单位"
    },{
    	field: "factory_name",
        title: "厂家"
    },{
    	field: "corporation",
        title: "供应商"
    },{
    	field: "bak",
        title: "备注"
    }];
	return dataColumns;
}

function getCorporationGood(){

	var param = $.serializeObject($('#corporationGoodForm'));
	$.ajax({
		url : path + "/googs/getCorporationGood",
		data : param,
		type : "POST",
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			var dataJosn = $.parseJSON(JSON.stringify(list));
			$("#corporationGoodTable").bootstrapTable("load",dataJosn);
		}
	});
}

//修改供应商
function updateCorporation(){
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}

	var updateRow;
	updateRow = $('#corporationTable').bootstrapTable('getSelections');
    if (updateRow.length==0) {
        layer.alert('请选择要修改的记录！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }else if (updateRow.length>1) {
        layer.alert('只允许修改一条记录！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }
    
    var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '供应商:';
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="width: 70px;" name="corporation1" id="corporation1" value="'+updateRow[0].corporation+'"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '供应商负责人:' ;
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="width: 70px;" name="corporation_person" id="corporation_person" value="'+updateRow[0].corporation_person+'"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '地址:';
		str += '</div>';
			str += '<div class="span2">';
				str += '<input type="text" style="width: 70px;" name="corporation_address" id="corporation_address" value="'+updateRow[0].corporation_address+'"/>' ;
			str += '</div>';
	str += '</div>';

	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '联系电话:';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="width: 70px;" name="telphone" id="telphone" value="'+updateRow[0].telphone+'"/>';
			str += '</div>';
		str += '<div class="span2">';
			str+='备注:';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="width: 70px;" name="bak" id="bak" value="'+updateRow[0].bak+'"/>';
			str += '</div>';
		str += '<div class="span2">';
			
		str += '</div>';
			str += '<div class="span2">';
			
			str += '</div>';
	str += '</div>';
	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['570px', '255px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		if(submitForm()){ 
		var param;
		param ={corporation:$("input[name='corporation1']").val(),
				corporation_person:$("#corporation_person").val(),
				corporation_address:$("#corporation_address").val(),
				telphone:$("#telphone").val(),
				corporation_id:updateRow[0].corporation_id,
				bak:$("#bak").val()};
		
		$.ajax({
			url : path + "/googs/updateCorporation",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#corporationTable").bootstrapTable('load',dataJosn);
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
	  }
	  }
	});
    
}

//修改厂家
function updateFactory(){
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}

	var updateRow;
	updateRow = $('#factoryTable').bootstrapTable('getSelections');
    if (updateRow.length==0) {
        layer.alert('请选择要修改的记录！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }else if (updateRow.length>1) {
        layer.alert('只允许修改一条记录！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }

    var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '厂家:';
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="width: 70px;" name="factory_name1" id="factory_name1" value="'+updateRow[0].factory_name+'"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '厂家负责人:' ;
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="width: 70px;" name="factory_person" id="factory_person" value="'+updateRow[0].factory_person+'"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '地址:';
		str += '</div>';
			str += '<div class="span2">';
				str += '<input type="text" style="width: 70px;" name="factory_address" id="factory_address" value="'+updateRow[0].factory_address+'"/>' ;
			str += '</div>';
	str += '</div>';

	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '联系电话:';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="width: 70px;" name="telphone" id="telphone" value="'+updateRow[0].telphone+'"/>';
			str += '</div>';
		str += '<div class="span2">';
			str+='备注:';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="width: 70px;" name="bak" id="bak" value="'+updateRow[0].bak+'"/>';
			str += '</div>';
		str += '<div class="span2">';
			
		str += '</div>';
			str += '<div class="span2">';
			
			str += '</div>';
	str += '</div>';
	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['570px', '255px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		if(submitForm2()){ 
		var param;
		param ={factory_name:$("input[name='factory_name1']").val(),
				factory_person:$("#factory_person").val(),
				factory_address:$("#factory_address").val(),
				telphone:$("#telphone").val(),
				factory_id:updateRow[0].factory_id,
				bak:$("#bak").val()};
		$.ajax({
			url : path + "/googs/updateFactory",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#factoryTable").bootstrapTable('load',dataJosn);
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
	  }
	  }
	});
}

//修改物资
function updateGoods(){
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}

	var updateRow;
	updateRow = $('#goodsTable').bootstrapTable('getSelections');
    if (updateRow.length==0) {
        layer.alert('请选择要修改的记录！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }else if (updateRow.length>1) {
        layer.alert('只允许修改一条记录！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }

    var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '物资名称:' ;
str += '</div>';
	str += '<div class="span4" >';
		str += '<input type="text" style="width: 70px;" name="good_name1" id="good_name1" value="'+updateRow[0].good_name+'"/>' ;
	str += '</div>';
		str += '<div class="span2">';
			str += '物资编码:';
		str += '</div>';
			str += '<div class="span4" >';
				str += '<input type="text" style="width: 70px;" name="good_code" id="good_code" value="'+updateRow[0].good_code+'"/>' ;
			str += '</div>';	
	str += '</div>';

	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '物资类别:';
str += '</div>';
	str += '<div class="span4">';
		str += '<select id="good_type" style="width: 115px;" class="m-wrap span12" tabindex="1" name="good_type" value="'+updateRow[0].good_type+'">';
//		var myobj=goodTypeList.split("=");
//		for (var j = 0; j < myobj.length; j++) {
//			if(myobj[j].indexOf("code_name") > 0 ){
//				 str +="<option value=" + myobj[j].split(",")[0] +">" + myobj[j+1].split(",")[0] + "</option>";
//			}
//				
//		}
     str+='</select>';
	str += '</div>';	
		str += '<div class="span2">';
			str += '备注:';
		str += '</div>';
			str += '<div class="span4">';
			str += '<input type="text" style="width: 70px;" name="bak" id="bak" value="'+updateRow[0].bak+'"/>';
			str += '</div>';
	str += '</div>';
	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['470px', '255px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		if(submitForm3()){
		var param;
		param ={good_code:$("input[name='good_code']").val(),
				good_name:$("#good_name1").val(),
				good_type:$("#good_type").val(),
				good_id:updateRow[0].good_id,
				bak:$("#bak").val()};
		$.ajax({
			url : path + "/googs/updateGoods",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#goodsTable").bootstrapTable('load',dataJosn); 
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
		}
	  }
	});
setGoodType();
}

//切换标签页事件处理
$(function(){
	$('a[data-toggle="tab"]').on('shown', function (e) {
		if("供应商" == $(e.target).text()){
			getCorporation();
			return;
		}
		if("厂家" == $(e.target).text()){
			getFactory();
			return;
		}
		if("物资" == $(e.target).text()){
			queryGoods();
			return;
		}
		if("物资关系" == $(e.target).text()){
			queryGoods();
			return;
		}
	});
});

function initObjGoods(){
	objGoods.farmId =  document.getElementById("farmId").value;
	objGoods.farm =  document.getElementById("farm").value;

	document.getElementById("corporationFarmTitle").innerHTML = "<font size='4' ><B>" + objGoods.farm +"</B></font>";
	document.getElementById("factoryFarmTitle").innerHTML =  "<font size='4' ><B>" + objGoods.farm +"</B></font>";
	document.getElementById("goodsFarmTitle").innerHTML = "<font size='4' ><B>" + objGoods.farm +"</B></font>";
	document.getElementById("corporationGoodFarmTitle").innerHTML = "<font size='4' ><B>" + objGoods.farm +"</B></font>";
}


