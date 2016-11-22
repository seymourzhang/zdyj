package com.mtc.zljk.monitor.action;

import com.mtc.zljk.monitor.service.MonitorService;
import com.mtc.zljk.user.entity.SDUser;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Seymour on 2016/11/22.
 */
@Controller
@RequestMapping("/monitorMobile")
public class MonitorMobileAction extends BaseAction {

    @Autowired
    private MonitorService monitorService;

    @RequestMapping("/monitoring")
    public void monitoring(HttpServletRequest request, HttpServletResponse response) throws Exception {
        /*Json j=new Json();
        PageData pd = this.getPageData();
        PageData pageData = new PageData();*/
        JSONObject resJson = new JSONObject();
        PageData pd = new PageData();
        pd = this.getPageData();
        String dealRes = null;
        String aa = pd.toString();
        aa = aa.substring(1, aa.length() - 2);
        JSONObject jsonObject = new JSONObject(aa);

        JSONObject tUserJson = jsonObject.getJSONObject("params");
        int FarmId = tUserJson.optInt("FarmId");
        List<PageData> mcl = new ArrayList<>();
        pd.put("farmId", FarmId);
        mcl = monitorService.selectByCondition(pd);
        JSONArray monitor = new JSONArray();
        if (mcl.size() == 0){
            resJson.put("Error", "暂无监测信息！");
            resJson.put("Result", "Fail");
            dealRes = Constants.RESULT_SUCCESS;
        }else{
            for (PageData data : mcl) {
                JSONObject jo = new JSONObject();
                jo.put("houseName", "");
                jo.put("dayAge", data.get("date_age"));
                jo.put("out_temp", data.get("outside_temp"));
                jo.put("tempLeft1", data.get("inside_temp1"));
                jo.put("tempLeft2", data.get("inside_temp2"));
                jo.put("tempMiddle1", data.get("inside_temp3"));
                jo.put("tempMiddle2", data.get("inside_temp4"));
                jo.put("tempRight1", data.get("inside_temp5"));
                jo.put("tempRight2", data.get("inside_temp5"));
                jo.put("tar_temp", data.get("inside_set_temp"));
                jo.put("avg_temp", data.get("inside_avg_temp"));
                jo.put("H_temp", data.get("high_alarm_temp"));
                jo.put("L_temp", data.get("low_alarm_temp"));
                jo.put("point_temp", data.get("point_temp_diff"));
                jo.put("humi", data.get("inside_humidity"));
                jo.put("CO2", data.get("co2"));
                jo.put("illumination", data.get(""));
                jo.put("power_status", data.get("power_status"));
            }
            resJson.put("Result", "Success");
            resJson.put("MonitorData", mcl);
            dealRes = Constants.RESULT_SUCCESS;
        }
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }
}
