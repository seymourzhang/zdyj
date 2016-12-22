package com.mtc.zljk.daily.service.impl;

import com.mtc.zljk.daily.service.DailyService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Seymour on 2016/11/30.
 */
@Service
public class DailyServiceImpl implements DailyService{

    @SuppressWarnings("restriction")
	@Resource(name = "daoSupport")
	private DaoSupport dao;

    public int dailySave(PageData pd) throws Exception{
        int cullingMale = pd.getInteger("culling_num_male");
        int cullingFemale = pd.getInteger("culling_num_female");
        int deathMale = pd.getInteger("death_num_male");
        int deathFemale = pd.getInteger("death_num_female");
        int genderErrorMale = pd.getInteger("gender_error_male");
        int genderErrorFemale = pd.getInteger("gender_error_female");
        PageData temp = (PageData) dao.findForObject("DailyMapper.selectBySpecialDate", pd);
        int checkMale = temp.getInteger("male_count");
        int checkFemale = temp.getInteger("female_count");
        int result = 0;

        Date curDate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        int maleCountDiff = checkFemale - cullingFemale - deathFemale;
        int femaleCountDiff = checkMale - deathMale - deathFemale;
        if (maleCountDiff < 0 || femaleCountDiff < 0){
            result = -1;
        }else {
            pd.put("service_id", 0);
            pd.put("create_date", sdf.format(curDate));
            pd.put("create_time", sdf.format(curDate));
            pd.put("modify_date", sdf.format(curDate));
            pd.put("modify_time", sdf.format(curDate));
            if (cullingFemale + cullingMale != 0) {
                pd.put("operation_type", "6");
                pd.put("male_count", -cullingMale);
                pd.put("female_count", -cullingFemale);
                pd.put("bak", "损耗数量");
                dao.save("DailyMapper.insertDaily", pd);
                dao.save("DailyMapper.updateCurrCount", pd);
            }
            if (deathFemale + deathMale != 0) {
                pd.put("operation_type", "5");
                pd.put("male_count", -deathMale);
                pd.put("female_count", -deathFemale);
                pd.put("bak", "淘汰数量");
                dao.save("DailyMapper.insertDaily", pd);
                dao.save("DailyMapper.updateCurrCount", pd);
            }
            if (deathFemale + deathMale != 0) {
                pd.put("operation_type", "8");
                pd.put("male_count", -genderErrorMale);
                pd.put("female_count", -genderErrorFemale);
                pd.put("bak", "鉴别错误");
                dao.save("DailyMapper.insertDaily", pd);
            }
            result = (Integer) dao.save("DailyMapper.dailySave", pd);
        }
        return result;
    }

    public List<PageData> dailyQuery(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("DailyMapper.selectDailyByHouse", pd);
    }

    public PageData selectBySpecialDate(PageData pd) throws Exception{
        return (PageData) dao.findForObject("DailyMapper.selectBySpecialDate", pd);
    }

    public PageData selectDate(PageData pd) throws Exception{
        return (PageData) dao.findForObject("DailyMapper.selectDate", pd);
    }
}
