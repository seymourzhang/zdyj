package com.mtc.zljk.monitor.action;

import com.mtc.zljk.alarm.service.AlarmCurrService;
import com.mtc.zljk.monitor.service.MonitorService;
import com.mtc.zljk.user.entity.SDUser;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.*;
import com.mtc.zljk.util.service.OrganService;
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

    @Autowired
    private AlarmCurrService alarmCurrService;

    @Autowired
    private OrganService organService;

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
        List farm = new ArrayList();
        farm.add(FarmId);
        pd.put("farmId", farm);
        mcl = monitorService.selectByCondition(pd);
        JSONArray monitor = new JSONArray();
        for (PageData data : mcl) {
            JSONObject jo = new JSONObject();
            jo.put("houseName", data.get("house_name"));
            jo.put("dayAge", data.get("date_age"));
            jo.put("out_temp", data.get("outside_temp").toString() + "℃");
            jo.put("tempLeft1", data.get("inside_temp1").toString() + "℃");
            jo.put("tempLeft2", data.get("inside_temp2").toString() + "℃");
            jo.put("tempMiddle1", data.get("inside_temp3").toString() + "℃");
            jo.put("tempMiddle2", data.get("inside_temp4").toString() + "℃");
            jo.put("tempRight1", data.get("inside_temp5").toString() + "℃");
            jo.put("tempRight2", data.get("inside_temp5").toString() + "℃");
            jo.put("tar_temp", data.get("inside_set_temp").toString() + "℃");
            jo.put("avg_temp", data.get("inside_avg_temp").toString() + "℃");
            jo.put("H_temp", data.get("high_alarm_temp").toString() + "℃");
            jo.put("L_temp", data.get("low_alarm_temp").toString() + "℃");
            jo.put("point_temp", data.get("point_temp_diff"));
            jo.put("humi", data.get("inside_humidity"));
            jo.put("CO2", data.get("co2"));
//            jo.put("illumination", data.get("lux"));
            jo.put("illumination", "56.5");
            jo.put("power_status", data.get("power_status").equals("1") ? "正常" : "断电");
            jo.put("temp_in1_alarm", data.get("temp_in1_alarm"));
            jo.put("temp_in2_alarm", data.get("temp_in2_alarm"));
            jo.put("temp_in3_alarm", data.get("temp_in3_alarm"));
            jo.put("temp_avg_alarm", data.get("temp_avg_alarm"));
            jo.put("point_temp_alarm", data.get("point_temp_alarm"));
            jo.put("power_status_alarm", data.get("power_status_alarm"));
            jo.put("co2_alarm", data.get("co2_alarm"));
            jo.put("lux_alarm", data.get("lux_alarm"));
            monitor.put(jo);
        }
        resJson.put("Result", "Success");
        resJson.put("MonitorData", monitor);
        dealRes = Constants.RESULT_SUCCESS;
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }

    @RequestMapping("/needAlarm")
    public void needAlarm(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject resJson = new JSONObject();
        PageData pd = new PageData();
        pd = this.getPageData();
        String dealRes = null;
        String aa = pd.toString();
        aa = aa.substring(1, aa.length() - 2);
        JSONObject jsonObject = new JSONObject(aa);

        int userId = jsonObject.optInt("id_spa");
        JSONObject tUserJson = jsonObject.getJSONObject("params");
        int FarmId = tUserJson.optInt("FarmId");

        List farm = new ArrayList();
        List house = new ArrayList();
        farm.add(FarmId + "");
        pd.put("farmId", MonitorAction.listToString(farm));
        pd.put("user_id", userId);
        pd.put("parent_id", FarmId);
        List<PageData> ll = organService.getOrgList(pd);
        for (PageData pageData : ll) {
            house.add(pageData.get("id").toString());
        }
        pd.put("houseId", MonitorAction.listToString(house));
        PageData mcl = monitorService.selectAlarmCounts(pd);
        if ("0".equals(mcl.get("num").toString())){
            resJson.put("AlarmStatus", "0");
        }else{
            resJson.put("AlarmStatus", "1");
        }
        resJson.put("Result", "Success");
        resJson.put("Error", "");
        dealRes = Constants.RESULT_SUCCESS;
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }


}
