/**
 * Created by LeLe on 11/15/2016.
 */
var ar ;

$(document).ready(function() {
    ar = getInstance({入库:"tab_1"}, {iframe_tab_1:"dailyProductionReport.frm"});
    ar.initToolBarFarm();
});