package com.mtc.zljk.report.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.report.service.NegativePressureService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class NegativePressureServiceImpl implements NegativePressureService {
	
	@Resource(name = "daoSupport")
	private DaoSupport dao;

	@Override
	public List<PageData> getNegativePressure(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("NegativePressureMapper.NegativePressureDaily", pd);
	}

	@Override
	public List<PageData> getNegativePressureMonth(PageData pd)
			throws Exception {
		
		return (List<PageData>) dao.findForList("NegativePressureMapper.NegativePressureMonth", pd);
	}

}
