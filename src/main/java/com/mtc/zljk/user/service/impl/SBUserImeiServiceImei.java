package com.mtc.zljk.user.service.impl;

import com.mtc.zljk.user.service.SBUserImeiService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Seymour on 2016/11/18.
 */
@Service
public class SBUserImeiServiceImei implements SBUserImeiService{

    @Resource(name = "daoSupport")
    private DaoSupport dao;

    public int insert(PageData pd) throws Exception{
        dao.delete("SBUserImeiMapper.delete", pd);
        return (Integer) dao.save("SBUserImeiMapper.insert", pd);
    }

    public int insertLog(PageData pd) throws Exception{
        return (Integer) dao.save("SBUserImeiMapper.insertLog", pd);
    }
}
