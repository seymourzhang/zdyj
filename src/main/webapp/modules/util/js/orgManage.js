/**
 * Created by LeLe on 11/18/2016.
 */
var orgListTreeName = "orgListTree";
var orgListTableName = "orgList";

$(document).ready(function(){
    //初始化机构树
    initOrgListTree();

    //初始化表格
    initOrgListTable();
});

//初始化机构树
function initOrgListTree() {
    var setting = {
        view: {
            selectedMulti: false,
            fontCss: { 'color': 'blue', 'font-family': '微软雅黑', 'font-size': '18px' }
        },
        check: {
            enable: true,
            chkDisabledInherit: true
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: zTreeOnClick
        }
    };
    $.fn.zTree.init($("#" + orgListTreeName), setting, getOrgList());
    // initZtreeStyle();
};
//
// function initZtreeStyle(){
//     var zTree = $.fn.zTree.getZTreeObj(orgListTreeName);
//     var nodes = zTree.getSelectedNodes();
//     for(var i =0; i<nodes.length; i++){
//         var style = "font-size: 18px";
//         zTree.setting.view.fontCss["font-style"] = style;
//         zTree.updateNode(nodes[i]);
//     }
//
// }

//点击事件
function zTreeOnClick(event, treeId, treeNode) {
    // alert(treeNode.id + ", " + treeNode.name);
    loadTableData(orgListTableName, getOrgData());
};


//获取机构数据
function getOrgList(){
    var rt =[];
    rt = [ {id:"0",pId:"0",name:"组织架构",open:"true",chkDisabled:"false",p_name:""}
            ,{id:"1",pId:"0",name:"新疆分公司",open:"true",chkDisabled:"false",p_name:""}
            ,{id:"2",pId:"0",name:"内蒙古分公司",open:"true",chkDisabled:"false",p_name:""}
            ,{id:"3",pId:"0",name:"河北分公司",open:"true",chkDisabled:"false",p_name:""}
        ];
    return rt;
}

//初始化机构表格
function initOrgListTable(){
    initTable(orgListTableName, getOrgListTableColumns(), []);
};

//获取机构表格表头定义对象
function getOrgListTableColumns(){
    var dataColumns = [{checkbox:true,
                        title: "选择",
                        width: '5%'
                    }, {field: "id",
                        title: "栋舍ID",
                        visible: false
                    }, {
                        field: "farm_id",
                        title: "农场ID",
                        visible: false
                    }, {
                        field: "farm_name",
                        title: "农场名称"
                    }, {
                        field: "house_code",
                        title: "栋舍编号",
                        visible: false
                    }, {
                        field: "house_name",
                        title: "栋舍名称"
                    }, {
                        field: "house_level_id",
                        title: "栋舍层级",
                        visible: false
                    }];
    return dataColumns;
};

//获取农场、栋舍数据
function getOrgData(){
    var rt =[];
    rt = [{id:"1",house_code:"001",house_name:"H1,H2", farm_id:"1",farm_name:"新疆育成鸡场",house_level_id:"3"}
        ,{id:"3",house_code:"001",house_name:"H3,H4", farm_id:"1",farm_name:"新疆产蛋鸡场",house_level_id:"3"}
    ];
    return rt;
}