package com.mtc.zljk.farm.action;

import com.mtc.zljk.farm.service.FarmService;
import com.mtc.zljk.farm.service.impl.FarmServiceImpl;
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
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by Seymour on 2016/12/21.
 */
@Controller
@RequestMapping("/farmMobile")
public class FarmMobileAction extends BaseAction {

    @Autowired
    private FarmService farmService;

    @RequestMapping("/deviceQuery")
    public void deviceQuery(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject resJson = new JSONObject();
        PageData pd = new PageData();
        pd = this.getPageData();
        String dealRes = null;
        String aa = pd.toString();
        aa = aa.substring(1, aa.length() - 2);
        try {
            JSONObject jsonObject = new JSONObject(aa);

            int userId = jsonObject.optInt("id_spa");
            JSONObject tUserJson = jsonObject.getJSONObject("params");
            int FarmId = tUserJson.optInt("farm_id");
            int HouseId = tUserJson.optInt("house_id");

            pd.put("house_id", HouseId);

            JSONArray sensorInfos = new JSONArray();
            String DeviceCode = "";
            String mainId = "";
            List<PageData> deviceList = farmService.findDevice(pd);
            if (deviceList.size() != 0){
                DeviceCode = deviceList.get(0).get("device_code").toString();
                mainId = deviceList.get(0).get("main_id").toString();

                pd.put("main_id", mainId);
                pd.put("sensor_code", "1000");
                List<PageData> sensorList = farmService.findSensor(pd);
                for (PageData pageData : sensorList) {
                    JSONObject sensorInfo = new JSONObject();
                    sensorInfo.put("sensor_no", pageData.get("sensor_no") == null ? "" : pageData.get("sensor_no"));
                    sensorInfo.put("sensor_code", pageData.get("sensor_type") == null ? "" : pageData.get("sensor_type"));
                    sensorInfo.put("show_column", pageData.get("location_code"));
                    sensorInfos.put(sensorInfo);
                }
            }
            resJson.put("device_code", DeviceCode);
            resJson.put("Result", "Success");
            resJson.put("sensorInfo", sensorInfos);
            dealRes = Constants.RESULT_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            resJson.put("Result", "Fail");
            resJson.put("Error", "程序处理错误，请联系管理员！");
            dealRes = Constants.RESULT_SUCCESS;
        }
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }

    @RequestMapping("/deviceSave")
    public void deviceSave(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject resJson = new JSONObject();
        PageData pd = new PageData();
        pd = this.getPageData();
        String dealRes = null;
        String aa = pd.toString();
        aa = aa.substring(1, aa.length() - 2);
        try {
            JSONObject jsonObject = new JSONObject(aa);
            int userId = jsonObject.optInt("id_spa");
            JSONObject tUserJson = jsonObject.getJSONObject("params");
            int FarmId = tUserJson.optInt("farm_id");
            int HouseId = tUserJson.optInt("house_id");
            String DeviceCode = tUserJson.optString("device_code");
            JSONArray SensorInfo = tUserJson.optJSONArray("sensorInfo");
            pd.put("farm_id", FarmId);
            pd.put("house_id", HouseId);
            pd.put("device_code", DeviceCode);
            pd.put("create_person", userId);
            List<PageData> deviceList = farmService.findDeviceIsExist(pd);
            if (deviceList.size() > 0 && !DeviceCode.equals("") ) {
                resJson.put("Result", "Fail");
                resJson.put("Error", "该设备已绑定栋舍");
                dealRes = Constants.RESULT_SUCCESS;
            } else {
                String mainId = "4-" + DeviceCode + "-x";
                PageData pp = new PageData();
                pp.put("house_id", HouseId);
                List<PageData> device = farmService.findDevice(pp);
                for (PageData temp : device) {
                    pp.put("device_code", temp.get("device_code").toString());
                    int ii = farmService.delDevice(pp);
                    for (int i = 0; i < SensorInfo.length(); ++i) {
                        PageData pageData = new PageData();
                        pageData.put("main_id", "4-" + temp.get("device_code").toString() + "-x");
                        pageData.put("show_column", SensorInfo.getJSONObject(i).get("show_column"));
                        pageData.put("sensor_code", "1000");
                        int o = farmService.delSensor(pageData);
                    }
                }
                if (!DeviceCode.equals("")) {
                    int j = farmService.mappingDevice(pd);
                    if (j == 1) {
                        resJson.put("Result", "Success");
                        resJson.put("Error", "");
                        for (int i = 0; i < SensorInfo.length(); ++i) {
                            PageData pageData = new PageData();
                            pageData.put("farm_id", FarmId);
                            pageData.put("house_id", HouseId);
                            pageData.put("device_code", DeviceCode);
                            pageData.put("main_id", mainId);
                            pageData.put("show_column", SensorInfo.getJSONObject(i).get("show_column"));
                            pageData.put("sensor_code", "1000");
                            pageData.put("sensor_no", SensorInfo.getJSONObject(i).get("sensor_no"));
                            pageData.put("create_person", userId);
                            int a = farmService.insertSensor(pageData);
                        }
                    } else {
                        resJson.put("Result", "Fail");
                        resJson.put("Error", "无该编号的设备");
                    }
                    dealRes = Constants.RESULT_SUCCESS;
                } else {
                    resJson.put("Result", "Success");
                    resJson.put("Error", "");
                    dealRes = Constants.RESULT_SUCCESS;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            resJson.put("Result", "Fail");
            resJson.put("Error", "程序处理错误，请联系管理员！");
            dealRes = Constants.RESULT_SUCCESS;
        }
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }
}
