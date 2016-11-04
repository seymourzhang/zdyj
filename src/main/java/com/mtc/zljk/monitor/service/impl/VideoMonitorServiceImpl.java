package com.mtc.zljk.monitor.service.impl;

import com.mtc.zljk.monitor.service.VideoMonitorService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;
import java.util.List;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Ants on 2016/8/25.
 */
@Service
public class VideoMonitorServiceImpl implements VideoMonitorService {
    @Resource(name="daoSupport")
    private DaoSupport dao;

    public List<PageData> selectByCondition(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("VideoMonitorMapper.selectByCondition", pd);
    }
}
