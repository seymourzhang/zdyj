package com.mtc.zljk.device.service.impl;

import com.mtc.zljk.device.service.RotemDataService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Seymour on 2017/2/22.
 */
@Service
public class RotemDataServiceImpl implements RotemDataService {
    @Resource(name = "daoSupport")
    private DaoSupport dao;

    public List<PageData> selectRotemData() throws Exception{
        return (List<PageData>) dao.findForList("ShowDataMobileMapper.selectRotemData", null);
    }
}
