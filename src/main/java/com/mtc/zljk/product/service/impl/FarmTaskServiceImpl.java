package com.mtc.zljk.product.service.impl;

import com.mtc.zljk.product.service.FarmTaskService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Seymour on 2016/10/24.
 */
@Service
public class FarmTaskServiceImpl implements FarmTaskService {
    @Resource(name="daoSupport")
    private DaoSupport dao;

    public void insert(PageData pd) throws Exception{
        dao.save("SBFarmTaskMapper.insertBatch", pd);
    }

    public List<PageData> selectByUserIdOrStatus(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("SBFarmTaskMapper.selectByUserIdOrStatus", pd);
    }

    public int updateTaskStatus(PageData pd) throws Exception{
        return (Integer) dao.update("SBFarmTaskMapper.updateTaskStatus", pd);
    }
}
