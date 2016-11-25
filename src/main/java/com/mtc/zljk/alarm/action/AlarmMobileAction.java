package com.mtc.zljk.alarm.action;

import com.mtc.zljk.alarm.service.AlarmCurrService;
import com.mtc.zljk.alarm.service.AlarmService;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Constants;
import com.mtc.zljk.util.common.DealSuccOrFail;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.service.OrganService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Seymour on 2016/11/25.
 */
@Controller
@RequestMapping("/alarmMobile")
public class AlarmMobileAction extends BaseAction{

    @Autowired
    private OrganService organService;

    @Autowired
    private AlarmCurrService alarmCurrService;

    @RequestMapping("/alarmDealQuery")
    public void alarmDealQuery(HttpServletRequest request, HttpServletResponse response) throws Exception {
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

        pd.put("parent_id", FarmId);
        List<PageData> lpd = organService.getOrgListById(pd);
        JSONArray alarmMessages = new JSONArray();
        JSONArray alarmDatas = new JSONArray();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdf1 = new SimpleDateFormat("HH:mm:ss");
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.s");
        for (PageData a : lpd) {
            JSONObject alarmMessage = new JSONObject();
            int houseId = Integer.parseInt(a.get("id").toString());
            pd.put("houseId", houseId);
            alarmMessage.put("HouseId", houseId);
            alarmMessage.put("HouseName", a.get("name_cn"));
            List<PageData> data = alarmCurrService.selectByCondition(pd);
            for (PageData b : data) {
                JSONObject alarmData = new JSONObject();
                alarmData.put("aDayAge", b.get("day_age"));
                alarmData.put("aDate", sdf.format(sd.parse(b.get("alarm_time").toString())));
                alarmData.put("aTime", sdf1.format(sd.parse(b.get("alarm_time").toString())));
                alarmData.put("alarmID", b.get("id"));
                alarmData.put("alarmCode", b.get("alarm_code"));
                alarmData.put("alarmName", b.get("alarm_name"));
                alarmData.put("realValue", b.get("actual_value"));
                alarmData.put("targetValue", b.get("set_value"));
                alarmData.put("process_status", b.get("deal_status"));
                alarmDatas.put(alarmData);
            }
            alarmMessage.put("CurAlarmData", alarmDatas);
            alarmMessages.put(alarmMessage);
        }
        resJson.put("alarmMessage", alarmMessages);
        resJson.put("Result", "Success");
        dealRes = Constants.RESULT_SUCCESS;
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }
}
