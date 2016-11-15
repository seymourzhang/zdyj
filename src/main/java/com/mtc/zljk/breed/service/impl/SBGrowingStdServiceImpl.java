package com.mtc.zljk.breed.service.impl;

import com.mtc.zljk.breed.service.SBGrowingStdService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Seymour on 2016/11/14.
 */
@Service
public class SBGrowingStdServiceImpl implements SBGrowingStdService{
    @Resource(name = "daoSupport")
    private DaoSupport dao;

    public List<PageData> selectByVarietyId(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("SBGrowingStdMapper.selectByVarietyId", pd);
    }

    public List<PageData> selectBroilByVarietyId(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("SBGrowingStdMapper.selectBroilByVarietyId", pd);
    }
}
