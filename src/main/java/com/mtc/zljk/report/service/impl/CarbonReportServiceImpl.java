package com.mtc.zljk.report.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.report.service.CarbonReportService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class CarbonReportServiceImpl implements CarbonReportService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	@Override
	public List<PageData> getCarbonReport(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("CarbonReportMapper.CarbonReportDaily", pd);
	}

	@Override
	public List<PageData> getCarbonReportMonth(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("CarbonReportMapper.CarbonReportMonth", pd);
	}

}
