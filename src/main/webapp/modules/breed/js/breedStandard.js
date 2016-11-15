function BroilerHlh(varietyId) {
    var dataColumns = [];
    if (varietyId == 3) {
        dataColumns = [{
            field: "grow_week_age",
            title: "生长周龄",
        }, {
            title: "母鸡死淘率%",
        }, {
            field: "female_life",
            title: "母鸡成活率%",
        }, {
            title: "平均体重（克）",
        }, {
            title: "产蛋率%",
        }, {
            title: "每只入舍母鸡产蛋数（枚）",
        }, {
            field: "qualified_egg_rate",
            title: "合格种蛋率%",
        }, {
            title: "每只入舍母鸡产合格种蛋数（枚）",
        }, {
            field: "chick_hatching_rate",
            title: "雏鸡孵化率%",
        }, {
            field: "breeding_chick_hatching",
            title: "种雏孵化率%",
        }, {
            title: "种雏数（只）",
        }];
    } else if(varietyId == 1){
        dataColumns = [{
            field: "grow_week_age",
            title: "生长周龄",
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
    } else if (varietyId == 2){
        dataColumns = [{
            field: "grow_week_age",
            title: "生长周龄",
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
        }
    });
}