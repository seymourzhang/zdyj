package com.mtc.zljk.monitor.action;

import com.mtc.zljk.monitor.service.AutioSettingService;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Constants;
import com.mtc.zljk.util.common.DealSuccOrFail;
import com.mtc.zljk.util.common.PageData;
import com.sun.org.apache.regexp.internal.RE;
import com.sun.tools.javac.code.Attribute;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Seymour on 2017/1/10.
 */
@Controller
@RequestMapping("/autioSettingMobile")
public class AutioSettingMobileAction extends BaseAction {

    @Autowired
    private AutioSettingService autioSettingService;

    @RequestMapping("/queryInfo")
    public void queryInfo(HttpServletRequest request, HttpServletResponse response) throws Exception{
        JSONObject resJson = new JSONObject();
        String dealRes = "";
        try{
            PageData pd = new PageData();
            pd = this.getPageData();
            String aa = pd.toString();
            aa = aa.substring(1, aa.length() - 2);
            JSONObject jsonObject = new JSONObject(aa);

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//          Date curDate = new Date();

            int userId = jsonObject.optInt("id_spa");
            JSONObject tUserJson = jsonObject.getJSONObject("params");
            int FarmId = tUserJson.optInt("FarmId");
            String RemindMethod = tUserJson.optString("RemindMethod");
            pd.put("farmId", FarmId);
            pd.put("RemindMethod", RemindMethod);
            pd.put("userId", userId);
            PageData temp = autioSettingService.queryInfo(pd);

            resJson.put("houseAlarmSetting", temp.get("houseAlarmSetting"));
            resJson.put("FarmId", FarmId);
            resJson.put("Error", temp.get("Error"));
            resJson.put("Result", temp.get("Result"));
            dealRes = Constants.RESULT_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            resJson.put("Error", "程序处理错误，请联系管理员！");
            resJson.put("Result", "Fail");
            dealRes = Constants.RESULT_SUCCESS;
        }
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }

    @RequestMapping("/saveInfo")
    public void saveInfo(HttpServletRequest request, HttpServletResponse response) throws Exception{
        JSONObject resJson = new JSONObject();
        String dealRes = "";
        try{
            PageData result = new PageData();
            PageData pd = new PageData();
            pd = this.getPageData();
            String aa = pd.toString();
            aa = aa.substring(1, aa.length() - 2);
            JSONObject jsonObject = new JSONObject(aa);

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date curDate = new Date();

            int userId = jsonObject.optInt("id_spa");
            JSONObject tUserJson = jsonObject.getJSONObject("params");
            int FarmId = tUserJson.optInt("FarmId");
            int HouseId = tUserJson.optInt("HouseId");
            String RemindMethod = tUserJson.optString("RemindMethod");
            String status = tUserJson.optString("status");
            JSONArray alarmers = tUserJson.optJSONArray("alarmers");

            pd.put("userId", userId);
            pd.put("farmId", FarmId);
            pd.put("houseId", HouseId);
            pd.put("remindMethod", RemindMethod);
            pd.put("status", status);
            pd.put("alarmers", alarmers);
            pd.put("create_date", curDate);
            pd.put("create_time", curDate);
            pd.put("create_person", userId);
            pd.put("modify_date", curDate);
            pd.put("modify_time", curDate);
            pd.put("modify_person", userId);
            result = autioSettingService.saveInfo(pd);

            resJson.put("Error", result.get("Error"));
            resJson.put("Result", result.get("Result"));
            dealRes = Constants.RESULT_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            resJson.put("Error", "程序处理错误，请联系管理员！");
            resJson.put("Result", "Fail");
            dealRes = Constants.RESULT_SUCCESS;
        }
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }
}
