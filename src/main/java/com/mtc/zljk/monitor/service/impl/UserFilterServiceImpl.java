package com.mtc.zljk.monitor.service.impl;

import com.mtc.zljk.monitor.service.UserFilterService;
import com.mtc.zljk.util.common.Page;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

//import jdk.nashorn.internal.runtime.ECMAException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Seymour on 2016/9/7.
 */
@Service
public class UserFilterServiceImpl implements UserFilterService{
    @Resource(name="daoSupport")
    private DaoSupport dao;

    public PageData selectByCondition(PageData pd) throws Exception{
        return (PageData) dao.findForObject("UserFilterMapper.selectByCondition", pd);
    }

    public int saveSet(PageData pd) throws Exception{
        return (Integer) dao.save("UserFilterMapper.saveSet",pd);
    }

    public int updateSet(PageData pd) throws Exception{
        return (Integer) dao.update("UserFilterMapper.updateSet", pd);
    }
}
