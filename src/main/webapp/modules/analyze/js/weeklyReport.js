/**
 * Created by LeLe on 11/15/2016.
 */
var ar ;

$(document).ready(function() {
    ar = getInstance({}, {});
    ar.initToolBarFarm();

    if(farmList.size > 0){
        ar.openUrl(farmList[0].id);
    }

});