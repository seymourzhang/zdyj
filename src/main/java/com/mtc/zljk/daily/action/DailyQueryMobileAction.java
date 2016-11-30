package com.mtc.zljk.daily.action;

import com.mtc.zljk.daily.service.DailyService;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Constants;
import com.mtc.zljk.util.common.DealSuccOrFail;
import com.mtc.zljk.util.common.PageData;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Seymour on 2016/11/30.
 */
@Controller
@RequestMapping("/dailyMobile")
public class DailyQueryMobileAction extends BaseAction{

    @Autowired
    private DailyService dailyService;

    @RequestMapping("/dailySave")
    public void dailySave(HttpServletRequest request, HttpServletResponse response) throws Exception{
        JSONObject resJson = new JSONObject();
        String dealRes = null;
        PageData pd = new PageData();
        pd = this.getPageData();
        String aa = pd.toString();
        aa = aa.substring(1, aa.length() - 2);
        JSONObject jsonObject = new JSONObject(aa);
        int userId = jsonObject.optInt("id_spa");
        JSONObject tUserJson = jsonObject.getJSONObject("params");

        String BreedBatchId = tUserJson.optString("BreedBatchId");
        int HouseId = tUserJson.optInt("HouseId");
        int DayAge = tUserJson.optInt("DayAge");
        int death_num_male = tUserJson.optInt("death_num_male");
        int death_num_female = tUserJson.optInt("death_num_female");
        int culling_num_male = tUserJson.optInt("culling_num_male");
        int culling_num_female = tUserJson.optInt("culling_num_female");
        String body_weight_male = tUserJson.optString("body_weight_male");
        String body_weight_female = tUserJson.optString("body_weight_female");
        int gender_error_male = tUserJson.optInt("gender_error_male");
        int gender_error_female = tUserJson.optInt("gender_error_female");
        String feed_code_female = tUserJson.optString("feed_code_female");
        String feed_weight_female = tUserJson.optString("feed_weight_female");
        String water_capacity_female = tUserJson.optString("water_capacity_female");
        int layer_amount = tUserJson.optInt("layer_amount");
        String uniformity = tUserJson.optString("uniformity");

        pd.put("BreedBatchId", BreedBatchId);
        pd.put("HouseId", HouseId);
        pd.put("DayAge", DayAge);
        pd.put("death_num_male", death_num_male);
        pd.put("death_num_female", death_num_female);
        pd.put("culling_num_male", culling_num_male);
        pd.put("culling_num_female", culling_num_female);
        pd.put("body_weight_male", body_weight_male);
        pd.put("body_weight_female", body_weight_female);
        pd.put("gender_error_male", gender_error_male);
        pd.put("gender_error_female", gender_error_female);
        pd.put("feed_code_female", feed_code_female);
        pd.put("feed_weight_female", feed_weight_female);
        pd.put("water_capacity_female", water_capacity_female);
        pd.put("layer_amount", layer_amount);
        pd.put("uniformity", uniformity);

        int flag = dailyService.dailySave(pd);
        if (flag < 0){
            resJson.put("Result", "Fail");
            resJson.put("Error", "更新失败！");
        } else {
            resJson.put("Result", "Success");
            resJson.put("Error", "");
        }
        dealRes = Constants.RESULT_SUCCESS;
        DealSuccOrFail.dealApp(request, response, dealRes,resJson);
    }

    @RequestMapping("/dailyQuery")
    public void dailyQuery(HttpServletRequest request, HttpServletResponse response) throws Exception{
        JSONObject resJson = new JSONObject();
        String dealRes = null;
        PageData pd = new PageData();
        pd = this.getPageData();
        String aa = pd.toString();
        aa = aa.substring(1, aa.length() - 2);
        JSONObject jsonObject = new JSONObject(aa);
        int userId = jsonObject.optInt("id_spa");
        JSONObject tUserJson = jsonObject.getJSONObject("params");

        int HouseId = tUserJson.optInt("HouseId");
        int BreedBatchId = tUserJson.optInt("BreedBatchId");
        String SpecialFlag = tUserJson.optString("SpecialFlag");
        String SpecialDate = tUserJson.optString("SpecialFlag");


        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }
}
