package com.mtc.zljk.analyze.service.impl;

import com.mtc.zljk.analyze.service.DailyService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.xml.crypto.Data;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Seymour on 2016/11/30.
 */
@Service
public class DailyServiceImpl implements DailyService {

    @SuppressWarnings("restriction")
	@Resource(name = "daoSupport")
	private DaoSupport dao;

    public int dailySave(PageData pd) throws Exception {
        int cullingMale = pd.getInteger("culling_num_male");
        int cullingFemale = pd.getInteger("culling_num_female");
        int deathMale = pd.getInteger("death_num_male");
        int deathFemale = pd.getInteger("death_num_female");
        int genderErrorMale = pd.getInteger("gender_error_male");
        int genderErrorFemale = pd.getInteger("gender_error_female");

        PageData temp = (PageData) dao.findForObject("DailyMapper.selectBySpecialDate", pd);
        int checkMale = temp.getInteger("male_count");
        int checkFemale = temp.getInteger("female_count");
        int dayAge = temp.getInteger("age");
        int result = 0;

        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date specialDate = sdf.parse(temp.get("growth_date").toString());
        Date curDate = sdf.parse(sdf.format(date));

        int maleCountDiff = checkFemale - cullingFemale - deathFemale;
        int femaleCountDiff = checkMale - deathMale - cullingMale;
        if (maleCountDiff < 0 || femaleCountDiff < 0) {
            result = -1;
        } else {
            pd.put("service_id", 0);
            pd.put("create_date", new Date());
            pd.put("create_time", new Date());
            pd.put("modify_date", new Date());
            pd.put("modify_time", new Date());
            int maleOld = temp.getInteger("male_culling_am") + temp.getInteger("male_death_am") + temp.getInteger("male_culling_pm") + temp.getInteger("male_death_pm");
            int femaleOld = temp.getInteger("female_culling_am") + temp.getInteger("female_death_am") + temp.getInteger("female_culling_pm") + temp.getInteger("female_death_pm");
            int diffMale = maleOld - deathMale - cullingMale;
            int diffFemale = femaleOld - deathFemale - cullingFemale;
            pd.put("femaleDiff", diffFemale);
            pd.put("maleDiff", diffMale);
            if (curDate.equals(specialDate)) {
                dao.save("DailyMapper.batchCurSave", pd);
            } else if (specialDate.before(curDate)){
                dao.save("DailyMapper.batchOldSave", pd);
            } else if (specialDate.after(curDate)) {
                result = -2;
            }
            if (cullingFemale + cullingMale != 0) {
                pd.put("operation_type", "6");
                pd.put("male_count", -cullingMale);
                pd.put("female_count", -cullingFemale);
                pd.put("bak", "损耗数量");
                dao.save("DailyMapper.insertDaily", pd);
            }
            if (deathFemale + deathMale != 0) {
                pd.put("operation_type", "5");
                pd.put("male_count", -deathMale);
                pd.put("female_count", -deathFemale);
                pd.put("bak", "淘汰数量");
                dao.save("DailyMapper.insertDaily", pd);
            }
            if (genderErrorMale + genderErrorFemale != 0) {
                pd.put("operation_type", "8");
                pd.put("male_count", -genderErrorMale);
                pd.put("female_count", -genderErrorFemale);
                pd.put("bak", "鉴别错误");
                dao.save("DailyMapper.insertDaily", pd);
            }
            dao.save("DailyMapper.batchSave", pd);
            dao.save("DailyMapper.updateCurrCount", pd);
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
