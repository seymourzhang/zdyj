/**
 * Created by LeLe on 1/20/2017.
 */
var ar ;

$(document).ready(function() {
    ar = getInstance({温湿度:"tab_1",点温差:"tab_2",二氧化碳:"tab_3",光照:"tab_4"}
                        ,{iframe_tab_1:"temProfile.cpt",iframe_tab_2:"tempDiff.cpt",iframe_tab_3:"carbonReport.cpt"
                            ,iframe_tab_4:"lightReport.cpt"});
    ar.initToolBarFarm();
});