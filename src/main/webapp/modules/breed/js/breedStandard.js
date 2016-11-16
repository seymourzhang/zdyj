function BroilerHlh(varietyId) {
    var dataColumns = [];
    if (varietyId == 3) {
        dataColumns = [{
            field: "grow_week_age",
            title: "生长<br>周龄",
            width: "5%",
            /*cellStyle: function cellStyle(value, row, index, field) {
                return {
                    css: {"background-color": "#93B3D9"}
                };
            },*/
        }, {
            title: "母鸡死淘率%",
        }, {
            field: "female_life",
            title: "母鸡<br>成活率%",
        }, {
            title: "平均体重（克）",
        }, {
            title: "产蛋率%",
        }, {
            title: "每只入舍母鸡<br>产蛋数（枚）",
        }, {
            field: "qualified_egg_rate",
            title: "合格<br>种蛋率%",
        }, {
            title: "每只入舍母鸡<br>产合格种蛋数（枚）",
        }, {
            field: "chick_hatching_rate",
            title: "雏鸡<br>孵化率%",
        }, {
            field: "breeding_chick_hatching",
            title: "种雏<br>孵化率%",
        }, {
            title: "种雏数（只）",
        }];
    } else if (varietyId == 1){
        dataColumns = [{
            field: "grow_week_age",
            title: "生长<br>周龄",
            width: "5%",
        }, {
            title: "母鸡死淘率%",
        }, {
            field: "female_life",
            title: "母鸡成活率%",
        }, {
            title: "平均体重（克）",
        }, {
            title: "饲料消耗（克/只）",
        }, {
            field: "evenness",
            title: "均匀度%",
        }, {
            title: "母鸡体重范围",
        }];
    } else if (varietyId == 2) {
        dataColumns = [{
            field: "grow_week_age",
            title: "生长<br>周龄",
            width: "5%",
        }, {
            title: "母鸡死淘率%",
        }, {
            field: "female_life",
            title: "母鸡成活率%",
        }, {
            title: "平均体重（克）",
        }, {
            title: "饲料消耗（克/只）",
        }, {
            field: "evenness",
            title: "均匀度%",
        }, {
            title: "母鸡体重范围",
        }];
    }
    $.ajax({
        url: path + "/breed/searchBreedStandard",
        data: {"variety_id": varietyId},
        dataType: "json",
        success: function (result) {
            var list = result.obj;
            initTable("breedSTD" + varietyId, dataColumns, list);
            $("#breedSTD" + varietyId + "Table").bootstrapTable("load", list);
            // $("#varietyName").remove();
            document.getElementById("varietyName"+varietyId).innerHTML = "<font size='4' ><B>" + list[0]["variety"] +"</B></font>";
        }
    });
}