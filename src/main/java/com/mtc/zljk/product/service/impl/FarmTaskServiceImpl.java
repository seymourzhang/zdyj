package com.mtc.zljk.product.service.impl;

import com.mtc.zljk.batch.service.BatchManageService;
import com.mtc.zljk.product.service.FarmTaskService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Seymour on 2016/10/24.
 */
@Service
public class FarmTaskServiceImpl implements FarmTaskService {
    @Resource(name="daoSupport")
    private DaoSupport dao;

    @Autowired
    private BatchManageService batchManageService;


    public void insert(PageData pd) throws Exception{
        dao.save("SBFarmTaskMapper.insertBatch", pd);
    }

    public List<PageData> selectByUserIdOrStatus(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("SBFarmTaskMapper.selectByUserIdOrStatus", pd);
    }

    public int updateTaskStatus(PageData pd) throws Exception{
        return (Integer) dao.update("SBFarmTaskMapper.updateTaskStatus", pd);
    }

    public List<PageData> selectByTashId(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("SBFarmTaskMapper.selectByTashId", pd);
    }

    public JSONObject selectForMobile(PageData pd) throws Exception{
        JSONObject resJson = new JSONObject();
        Date curDate = new Date();
        Date remindDate = pd.getDate("RemindDate");
        int FarmId = pd.getInteger("FarmId");
        int HouseId = pd.getInteger("HouseId");

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        pd.put("farm_id", FarmId);
        pd.put("house_code", HouseId);
        PageData batch = batchManageService.selectBatchDataForMobile(pd);

        Date batchStartDate = sdf.parse(batch.getString("operation_date"));
        pd.put("remindDate", batchStartDate);
        List<PageData> temp = new ArrayList<PageData>();
        PageData counts = new PageData();
        if (remindDate.equals(curDate)){
            temp = (List<PageData>) dao.findForObject("SBFarmTaskMapper.selectCurrForMobile", pd);
        } else {
            temp = (List<PageData>) dao.findForObject("SBFarmTaskMapper.selectHistForMobile", pd);
        }
        JSONArray taskInfos = new JSONArray();
        if (temp.size() != 0) {
            for (PageData data : temp) {
                JSONObject taskInfo = new JSONObject();
                taskInfo.put("RemindID", data.get("id"));
                taskInfo.put("TskId", data.get("task_id"));
                taskInfo.put("TskType", data.get("task_type"));
                taskInfo.put("TskName", data.get("task_name"));
                taskInfo.put("dealStatus", data.get("deal_status"));
                taskInfos.put(taskInfo);
            }
            resJson.put("Error", "");
            resJson.put("Result", "Success");
            resJson.put("TskInfo", taskInfos);
        }else{
            resJson.put("TskInfo", taskInfos);
            resJson.put("Error", "暂无数据！");
            resJson.put("Result", "Fail");
        }

        counts = (PageData) dao.findForObject("SBFarmTaskMapper.selectCountForMobile", pd);

        resJson.put("HouseId", HouseId);
        resJson.put("UnCompleteTaskNum", counts.get("unCompletes"));
        resJson.put("delayCount", counts.get("delays"));
//        resJson.put("RemindDate", )
        return resJson;
    }
}
