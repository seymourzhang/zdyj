package com.mtc.zljk.monitor.action;

import com.mtc.zljk.Alidayu.entity.SDUser;
import com.mtc.zljk.alarm.action.AlarmAction;
import com.mtc.zljk.alarm.service.AlarmService;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Seymour on 2016/12/27.
 */
@Controller
@RequestMapping("/alarmSettingMobile")
public class AlarmSettingMobileAction extends BaseAction {

    @Autowired
    private AlarmService alarmService;

    @Autowired
    private AlarmAction alarmAction;

    @RequestMapping("/basicQuery")
    public void basicQuery(HttpServletRequest request, HttpServletResponse response) throws Exception{
        String dealRes = "";
        JSONObject resJson = new JSONObject();
        try{
            PageData pd = this.getPageData();
            String aa = pd.toString();
            aa = aa.substring(1, aa.length() - 2);
            JSONObject jsonObject = new JSONObject(aa);

//          SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            int userId = jsonObject.optInt("id_spa");
            JSONObject tUserJson = jsonObject.getJSONObject("params");
            int HouseId = tUserJson.optInt("houseId");
            int FarmId = tUserJson.optInt("farmId");
            String AlarmType = tUserJson.optString("alarm_type");
            pd.put("houseId", HouseId);
            pd.put("farmId", FarmId);
            pd.put("AlarmType", AlarmType);
            List<PageData> lpd = alarmService.selectSBHouseAlarmByCondition(pd);
            JSONArray probes = new JSONArray();
            if (lpd.size() != 0) {
                for (PageData pageData : lpd) {
                    resJson.put("alarm_delay", pageData.get("alarm_delay"));
                    resJson.put("temp_cpsation", "1".equals(pageData.get("temp_cpsation")) ? true : false);
                    resJson.put("temp_cordon", pageData.get("temp_cordon"));
                    resJson.put("alarm_method", pageData.get("alarm_probe"));
                }
            }else {
                resJson.put("alarm_delay", "");
                resJson.put("temp_cpsation", "");
                resJson.put("temp_cordon", "");
                resJson.put("alarm_method", "");
            }
            pd.put("code_type", "SENSOR_LOCATION");
            List<PageData> tem = alarmService.selectInsideTemp(pd);
            if (tem.size() != 0){
                for (PageData pageData : tem) {
                    JSONObject pro = new JSONObject();
                    pro.put("probe_name", pageData.get("biz_code"));
                    pro.put("probe_name_cn", pageData.get("code_name"));
                    pro.put("is_alarm", "Y".equals(pageData.get("is_alarm")) ? true : false);
                    probes.put(pro);
                }
                resJson.put("temp_probe", probes);
                resJson.put("Result", "Success");
            }else{
                resJson.put("Error", "暂无设备绑定，请先绑定设备！");
                resJson.put("Result", "Fail");
            }
            dealRes = Constants.RESULT_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            resJson.put("Error", "程序处理错误，请联系管理员！");
            resJson.put("Result", "Fail");
            dealRes = Constants.RESULT_SUCCESS;
        }
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }

    @RequestMapping("/basicSave")
    public void basicSave(HttpServletRequest request, HttpServletResponse response) throws Exception{
        String dealRes = "";
        JSONObject resJson = new JSONObject();
        try {
            PageData pd = this.getPageData();
            String aa = pd.toString();
            aa = aa.substring(1, aa.length() - 2);
            JSONObject jsonObject = new JSONObject(aa);

          SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            SimpleDateFormat sdf1 = new SimpleDateFormat("HH:mm");

            int userId = jsonObject.optInt("id_spa");
            JSONObject tUserJson = jsonObject.getJSONObject("params");
            int HouseId = tUserJson.optInt("houseId");
            int FarmId = tUserJson.optInt("farmId");
            String AlarmDelay = tUserJson.optString("alarm_delay");
            String TempCpsation = "true".equals(tUserJson.optString("temp_cpsation")) ? "1" : "0";
            String TempCordon = tUserJson.optString("temp_cordon");
            String AlarmMethod = tUserJson.optString("alarm_method");
            JSONArray TempProbe = tUserJson.optJSONArray("temp_probe");
            PageData pageData = new PageData();
            for (int i = 0; i < TempProbe.length(); ++i){
                String ProbeName = TempProbe.getJSONObject(i).get("probe_name").toString();
                String IsAlarm = TempProbe.getJSONObject(i).get("is_alarm").toString();
                pageData.put("is_alarm", "true".equals(IsAlarm) ? "Y" : "N");
                pageData.put("modify_person", userId);
                pageData.put("modify_date", sdf.format(new Date()));
                pageData.put("biz_code", ProbeName);
                pageData.put("houseId", HouseId);
                alarmService.updateDeviceSub(pageData);
            }
            pd.put("houseId", HouseId);
            pd.put("farmId", FarmId);
            pd.put("alarm_delay", AlarmDelay);
            pd.put("temp_cpsation", TempCpsation);
            pd.put("temp_cordon", TempCordon);
            pd.put("alarm_probe", AlarmMethod);
            pd.put("alarm_way", "03");
            pd.put("modify_person", userId);
            pd.put("modify_date", sdf.format(new Date()));
            pd.put("modify_time", sdf.format(new Date()));
            alarmService.updateSBHouseAlarm(pd);
            resJson.put("Result", "Success");
            resJson.put("Error", "");
            dealRes = Constants.RESULT_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            resJson.put("Error", "程序处理错误，请联系管理员！");
            resJson.put("Result", "Fail");
            dealRes = Constants.RESULT_SUCCESS;
        }
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }

    @RequestMapping("/itemQuery")
    public void itemQuery(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String dealRes = "";
        JSONObject resJson = new JSONObject();
        try {
            PageData pd = this.getPageData();
            String aa = pd.toString();
            aa = aa.substring(1, aa.length() - 2);
            JSONObject jsonObject = new JSONObject(aa);

//          SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            int userId = jsonObject.optInt("id_spa");
            JSONObject tUserJson = jsonObject.getJSONObject("params");
            int HouseId = tUserJson.optInt("houseId");
            int FarmId = tUserJson.optInt("farmId");
            String AlarmType = tUserJson.optString("alarm_type");
            pd.put("houseId", HouseId);
            pd.put("farmId", FarmId);
            pd.put("alarm_type", AlarmType);
            JSONArray dataArray = new JSONArray();
            List<PageData> item = alarmService.selectByCondition(pd);
            if (item.size() != 0) {
                for (PageData pageData : item) {
                    JSONObject data = new JSONObject();
                    if ("1".equals(AlarmType)) {
                        data.put("uid_num", pageData.get("uid_num"));
                        data.put("day_age", pageData.get("day_age"));
                        data.put("set_temp", pageData.get("set_temp"));
                        data.put("high_alarm_temp", pageData.get("high_alarm_temp"));
                        data.put("low_alarm_temp", pageData.get("low_alarm_temp"));
                        dataArray.put(data);
                    } else if ("2".equals(AlarmType)) {
                        data.put("uid_num", pageData.get("uid_num"));
                        data.put("day_age", pageData.get("day_age"));
                        data.put("high_lux", pageData.get("high_lux"));
                        data.put("low_lux", pageData.get("low_lux"));
                        data.put("set_lux", pageData.get("set_lux"));
                        data.put("start_time", pageData.get("start_time"));
                        data.put("end_time", pageData.get("end_time"));
                        data.put("hours", pageData.get("hours"));
                        dataArray.put(data);
                    } else if ("3".equals(AlarmType)) {
                        data.put("uid_num", pageData.get("uid_num"));
                        data.put("day_age", pageData.get("day_age"));
                        data.put("high_alarm_co2", pageData.get("high_alarm_co2"));
                        data.put("set_co2", pageData.get("set_co2"));
                        dataArray.put(data);
                    }
                }
                resJson.put("DataArray", dataArray);
                resJson.put("Result", "Success");
                resJson.put("Error", "");
            }else{
                resJson.put("Result", "Fail");
                resJson.put("Error", "暂无数据！");
            }
            dealRes = Constants.RESULT_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            resJson.put("Error", "程序处理错误，请联系管理员！");
            resJson.put("Result", "Fail");
            dealRes = Constants.RESULT_SUCCESS;
        }
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }

    @RequestMapping("/itemAdd")
    public void itemAdd(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String dealRes = "";
        JSONObject resJson = new JSONObject();
        try {
            PageData pd = this.getPageData();
            String aa = pd.toString();
            aa = aa.substring(1, aa.length() - 2);
            JSONObject jsonObject = new JSONObject(aa);

          SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            int userId = jsonObject.optInt("id_spa");
            JSONObject tUserJson = jsonObject.getJSONObject("params");
            String AlarmType = tUserJson.optString("alarm_type");

            pd.put("farmId", tUserJson.get("farmId"));
            pd.put("houseId", tUserJson.get("houseId"));
            pd.put("alarm_type", AlarmType);
            int pdID = 0;
            if ("1".equals(AlarmType)) {
                pd.put("set_temp", tUserJson.get("set_temp"));
                pd.put("day_age", tUserJson.get("day_age"));
                pd.put("high_alarm_temp", tUserJson.get("high_alarm_temp"));
                pd.put("low_alarm_temp", tUserJson.get("low_alarm_temp"));
            } else if ("2".equals(AlarmType)) {
                pd.put("day_age", 7 * tUserJson.getInt("day_age"));
                pd.put("high_lux", tUserJson.get("high_lux"));
                pd.put("low_lux", tUserJson.get("low_lux"));
                pd.put("set_lux", tUserJson.get("set_lux"));
                pd.put("start_time", tUserJson.get("start_time"));
                pd.put("end_time", tUserJson.get("end_time"));
            } else if ("3".equals(AlarmType)) {
                pd.put("day_age", tUserJson.get("day_age"));
                pd.put("high_alarm_co2", tUserJson.get("high_alarm_co2"));
                pd.put("set_co2", tUserJson.get("set_co2"));
            }
            List<PageData> pageData5 = alarmService.selectByCondition3(pd);//主要条件：农场、栋舍、日龄
            if (pageData5.size() == 0) {
                pd.put("create_person", userId);
                pd.put("create_date", new Date());
                pd.put("create_time", new Date());
                pd.put("modify_person", userId);
                pd.put("modify_date", new Date());
                pd.put("modify_time", new Date());
                alarmService.saveSBDayageSettingSub(pd);
                pdID = Integer.valueOf(alarmService.selectByCondition3(pd).get(0).get("uid_num").toString()).intValue();
            } else {
                pd.put("modify_person", userId);
                pd.put("modify_date", new Date());
                pd.put("modify_time", new Date());
                pdID = Integer.valueOf(pageData5.get(0).get("uid_num").toString()).intValue();
                pd.put("uid_num", pdID);
                alarmService.updateSBDayageSettingSub(pd);
            }
            Json i = alarmAction.tempSubSave(pd, userId, pdID);
            pd.put("alarm_operation", "新增");
            alarmService.saveSbDayageSettingSubHis(pd);
            String temp = i.getMsg();
            if ("2".equals(temp)) {
                resJson.put("Error", "程序处理错误，请联系管理员！");
                resJson.put("Result", "Fail");
            }else if ("1".equals(temp)){
                resJson.put("Error", "");
                resJson.put("Result", "Success");
            }
            dealRes = Constants.RESULT_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            resJson.put("Error", "程序处理错误，请联系管理员！");
            resJson.put("Result", "Fail");
            dealRes = Constants.RESULT_SUCCESS;
        }
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }

    @RequestMapping("/itemUpdate")
    public void itemUpdate(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String dealRes = "";
        JSONObject resJson = new JSONObject();
        try {
            PageData pd = this.getPageData();
            String aa = pd.toString();
            aa = aa.substring(1, aa.length() - 2);
            JSONObject jsonObject = new JSONObject(aa);

//          SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            int userId = jsonObject.optInt("id_spa");
            JSONObject tUserJson = jsonObject.getJSONObject("params");
            String AlarmType = tUserJson.optString("alarm_type");

            pd.put("farmId", tUserJson.get("farmId"));
            pd.put("houseId", tUserJson.get("houseId"));
            pd.put("uid_num", tUserJson.get("uid_num"));
            pd.put("day_age", tUserJson.get("day_age"));
            pd.put("alarm_type", AlarmType);
            int pdID = 0;
            if ("1".equals(AlarmType)) {
                pd.put("set_temp", tUserJson.get("set_temp"));
                pd.put("high_alarm_temp", tUserJson.get("high_alarm_temp"));
                pd.put("low_alarm_temp", tUserJson.get("low_alarm_temp"));
            } else if ("2".equals(AlarmType)) {
                pd.put("high_lux", tUserJson.get("high_lux"));
                pd.put("low_lux", tUserJson.get("low_lux"));
                pd.put("set_lux", tUserJson.get("set_lux"));
                pd.put("start_time", tUserJson.get("start_time"));
                pd.put("end_time", tUserJson.get("end_time"));
            } else if ("3".equals(AlarmType)) {
                pd.put("high_alarm_co2", tUserJson.get("high_alarm_co2"));
                pd.put("set_co2", tUserJson.get("set_co2"));
            }

            pd.put("modify_person", userId);
            pd.put("modify_date", new Date());
            pd.put("modify_time", new Date());
            alarmService.updateSBDayageSettingSub(pd);
            PageData pd1 = new PageData();

            pd1.put("farmId", pd.get("farmId"));
            pd1.put("houseId", pd.get("houseId"));
            pd1.put("day_age", pd.get("day_age"));
            pd1.put("alarm_type", pd.get("alarm_type"));
            Json i = alarmAction.tempSubUpdate(pd1 ,pd, userId);
            pd.put("alarm_operation", "修改");
            alarmService.saveSbDayageSettingSubHis(pd);
            String temp = i.getMsg();
            if ("2".equals(temp)) {
                resJson.put("Error", "程序处理错误，请联系管理员！");
                resJson.put("Result", "Fail");
            }else if ("1".equals(temp)){
                resJson.put("Error", "");
                resJson.put("Result", "Success");
            }
            resJson.put("Error", "");
            resJson.put("Result", "Success");
            dealRes = Constants.RESULT_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            resJson.put("Error", "程序处理错误，请联系管理员！");
            resJson.put("Result", "Fail");
            dealRes = Constants.RESULT_SUCCESS;
        }
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }

    @RequestMapping("/itemDelete")
    public void itemDelete(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String dealRes = "";
        JSONObject resJson = new JSONObject();
        try {
            PageData pd = this.getPageData();
            String aa = pd.toString();
            aa = aa.substring(1, aa.length() - 2);
            JSONObject jsonObject = new JSONObject(aa);

//          SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            int userId = jsonObject.optInt("id_spa");
            JSONObject tUserJson = jsonObject.getJSONObject("params");
            String AlarmType = tUserJson.optString("alarm_type");

            pd.put("farmId", tUserJson.get("farmId"));
            pd.put("houseId", tUserJson.get("houseId"));
            pd.put("uid_num", tUserJson.get("deleteRow"));
            pd.put("day_age", tUserJson.get("day_age"));
            pd.put("alarm_type", AlarmType);
            int pdID = 0;
            /*if ("1".equals(AlarmType)) {
                pd.put("set_temp", tUserJson.get("set_temp"));
                pd.put("high_alarm_temp", tUserJson.get("high_alarm_temp"));
                pd.put("low_alarm_temp", tUserJson.get("low_alarm_temp"));
            } else if ("2".equals(AlarmType)) {
                pd.put("high_lux", tUserJson.get("high_lux"));
                pd.put("low_lux", tUserJson.get("low_lux"));
                pd.put("set_lux", tUserJson.get("set_lux"));
                pd.put("start_time", tUserJson.get("start_time"));
                pd.put("end_time", tUserJson.get("end_time"));
            } else if ("3".equals(AlarmType)) {
                pd.put("high_alarm_co2", tUserJson.get("high_alarm_co2"));
                pd.put("set_co2", tUserJson.get("set_co2"));
            }*/
            pd.put("modify_person", userId);
            pd.put("modify_date", new Date());
            pd.put("modify_time", new Date());

            Json i = alarmAction.tempSubDelete(pd, userId);
            alarmService.deleteSBDayageSettingSub(pd);
            pd.put("alarm_operation", "删除");
            alarmService.saveSbDayageSettingSubHis(pd);
            alarmService.deleteSBDayageTempSub(pd);
            String temp = i.getMsg();
            if ("2".equals(temp)) {
                resJson.put("Error", "程序处理错误，请联系管理员！");
                resJson.put("Result", "Fail");
            }else if ("1".equals(temp)){
                resJson.put("Error", "");
                resJson.put("Result", "Success");
            }
            resJson.put("Error", "");
            resJson.put("Result", "Success");
            dealRes = Constants.RESULT_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            resJson.put("Error", "程序处理错误，请联系管理员！");
            resJson.put("Result", "Fail");
            dealRes = Constants.RESULT_SUCCESS;
        }
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }
}
