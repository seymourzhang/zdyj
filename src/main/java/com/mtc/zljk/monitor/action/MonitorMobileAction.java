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

        int userId = jsonObject.optInt("id_spa");
        JSONObject tUserJson = jsonObject.getJSONObject("params");
        int FarmId = tUserJson.optInt("FarmId");
        List<PageData> mcl = new ArrayList<>();
        List farm = new ArrayList();
        farm.add(FarmId);
        pd.put("farmId", farm);
        pd.put("parent_id", FarmId);
        pd.put("user_id", userId);
        List<PageData> datas = organService.getOrgList(pd);
        JSONArray monitor = new JSONArray();
        for (PageData a : datas) {
            List house = new ArrayList();
            house.add(a.getInteger("id"));
            pd.put("houseId", house);
            mcl = monitorService.selectByCondition(pd);
            if (mcl.size() != 0) {
                for (PageData data : mcl) {
                    JSONObject jo = new JSONObject();
                    jo.put("houseName", a.get("name_cn"));
                    jo.put("dayAge", data.get("date_age"));
                    jo.put("out_temp", "-99.0".equals(data.get("outside_temp").toString()) || "-".equals(data.get("outside_temp").toString())  ? "-" : data.get("outside_temp").toString() + "℃");
                    jo.put("tempLeft1", "-99.0".equals(data.get("inside_temp1").toString()) || "-".equals(data.get("inside_temp1").toString())  ? "-" : data.get("inside_temp1").toString() + "℃");
                    jo.put("tempLeft2", "-99.0".equals(data.get("inside_temp2").toString()) || "-".equals(data.get("inside_temp2").toString())  ? "-" : data.get("inside_temp2").toString() + "℃");
                    jo.put("tempMiddle1", "-99.0".equals(data.get("inside_temp3").toString()) || "-".equals(data.get("inside_temp3").toString())  ? "-" : data.get("inside_temp3").toString() + "℃");
                    jo.put("tempMiddle2", "-99.0".equals(data.get("inside_temp4").toString()) || "-".equals(data.get("inside_temp4").toString())  ? "-" : data.get("inside_temp4").toString() + "℃");
                    jo.put("tempRight1", "-99.0".equals(data.get("inside_temp5").toString()) || "-".equals(data.get("inside_temp5").toString())  ? "-" : data.get("inside_temp5").toString() + "℃");
                    jo.put("tempRight2", "-99.0".equals(data.get("inside_temp6").toString()) || "-".equals(data.get("inside_temp6").toString())  ? "-" : data.get("inside_temp6").toString() + "℃");
                    jo.put("tar_temp", "-99.0".equals(data.get("inside_set_temp").toString()) || "-".equals(data.get("inside_set_temp").toString())  ? "-" : data.get("inside_set_temp").toString() + "℃");
                    jo.put("avg_temp", "-99.0".equals(data.get("inside_avg_temp").toString()) || "-".equals(data.get("inside_avg_temp").toString())  ? "-" : data.get("inside_avg_temp").toString() + "℃");
                    jo.put("H_temp", "-99.0".equals(data.get("high_alarm_temp").toString()) || "-".equals(data.get("high_alarm_temp").toString())  ? "-" : data.get("high_alarm_temp").toString() + "℃");
                    jo.put("L_temp", "-99.0".equals(data.get("low_alarm_temp").toString()) || "-".equals(data.get("low_alarm_temp").toString())  ? "-" : data.get("low_alarm_temp").toString() + "℃");
                    jo.put("point_temp", "-99.0".equals(data.get("point_temp_diff").toString()) || "-".equals(data.get("point_temp_diff").toString())  ? "-" : data.get("point_temp_diff").toString() + "℃");
                    jo.put("humi", "-99.0".equals(data.get("point_temp_diff").toString()) || "-".equals(data.get("point_temp_diff").toString())  ? "-" : data.get("inside_humidity").toString() + "%");
                    jo.put("CO2", "-99.0".equals(data.get("point_temp_diff").toString()) || "-".equals(data.get("point_temp_diff").toString())  ? "-" : data.get("co2"));
                    jo.put("illumination", "-99.0".equals(data.get("point_temp_diff").toString()) || "-".equals(data.get("point_temp_diff").toString())  ? "-" : data.get("lux"));
                    jo.put("power_status", "-".equals(data.get("power_status")) ? "-" : (data.get("power_status").equals("1") ? "断电" : "正常"));
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
            } else {
                JSONObject jo = new JSONObject();
                jo.put("houseName", a.get("name_cn"));
                jo.put("dayAge", "-");
                jo.put("out_temp", "-");
                jo.put("tempLeft1", "-");
                jo.put("tempLeft2", "-");
                jo.put("tempMiddle1", "-");
                jo.put("tempMiddle2", "-");
                jo.put("tempRight1", "-");
                jo.put("tempRight2", "-");
                jo.put("tar_temp", "-");
                jo.put("avg_temp", "-");
                jo.put("H_temp", "-");
                jo.put("L_temp", "-");
                jo.put("point_temp", "-");
                jo.put("humi", "-");
                jo.put("CO2", "-");
                jo.put("illumination", "-");
                jo.put("power_status", "-");
                jo.put("temp_in1_alarm", "-");
                jo.put("temp_in2_alarm", "-");
                jo.put("temp_in3_alarm", "-");
                jo.put("temp_avg_alarm", "-");
                jo.put("point_temp_alarm", "-");
                jo.put("power_status_alarm", "-");
                jo.put("co2_alarm", "-");
                jo.put("lux_alarm", "-");
                monitor.put(jo);
            }
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
            resJson.put("AlarmStatus", "N");
        }else{
            resJson.put("AlarmStatus", "Y");
        }
        resJson.put("Result", "Success");
        resJson.put("Error", "");
        dealRes = Constants.RESULT_SUCCESS;
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }


}
