package com.mtc.zljk.daily.service.impl;

import com.mtc.zljk.daily.service.DailyService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
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
        return (Integer) dao.save("DailyMapper.dailySave", pd);
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
