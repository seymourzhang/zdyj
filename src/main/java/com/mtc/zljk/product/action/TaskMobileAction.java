package com.mtc.zljk.product.action;

import com.mtc.zljk.batch.service.BatchManageService;
import com.mtc.zljk.product.service.FarmTaskService;
import com.mtc.zljk.product.service.TaskService;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.DealSuccOrFail;
import com.mtc.zljk.util.common.PageData;
import com.sun.xml.internal.ws.api.pipe.Tube;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.TagUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Seymour on 2016/12/6.
 */
@Controller
@RequestMapping("/taskMobile")
public class TaskMobileAction extends BaseAction {


    @Autowired
    private FarmTaskService farmTaskService;

    @RequestMapping("/taskQuery")
    public void taskQuery(HttpServletRequest request, HttpServletResponse response) throws Exception{
        JSONObject resJson = new JSONObject();
        String dealRes = null;
        PageData pd = new PageData();
        pd = this.getPageData();
        String aa = pd.toString();
        aa = aa.substring(1, aa.length() - 2);
        JSONObject jsonObject = new JSONObject(aa);

        int userId = jsonObject.optInt("id_spa");
        JSONObject tUserJson = jsonObject.getJSONObject("params");
        String RemindDate = tUserJson.optString("RemindDate");
        int HouseId = tUserJson.optInt("HouseId");
        int FarmId = tUserJson.optInt("FarmId");


        pd.put("FarmId", FarmId);
        pd.put("HouseId", HouseId);
        pd.put("RemindDate", RemindDate);
        resJson = farmTaskService.selectByRemindDate(pd);
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }
}
