package com.mtc.zljk.breed.service.impl;

import com.mtc.zljk.breed.service.SDFileService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Seymour on 2016/11/2.
 */
@Service
public class SDFileServiceImpl implements SDFileService{
    @Resource(name = "daoSupport")
    private DaoSupport dao;

    /***
     * 查询有效状态记录
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> selectByStatus(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("SDfileMapper.selectByStatus", pd);
    }

    public int updateStatus(PageData pd) throws Exception{
        return (int) dao.update("SDfileMapper.updateStatus", pd);
    }

    public int insert(PageData pd) throws Exception{
        return (int) dao.save("SDfileMapper.insert", pd);
    }
}
