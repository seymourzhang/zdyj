package com.mtc.zljk.report.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.report.service.HumidityReportService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class HumidityReportServiceImpl implements HumidityReportService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	@Override
	public List<PageData> getHumidityReport(PageData pd) throws Exception {

		return (List<PageData>) dao.findForList("HumidityReportMapper.HumidityReportDaily",pd);
	}

	@Override
	public List<PageData> getHumidityReportMonth(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("HumidityReportMapper.HumidityReportMonth",pd);
	}

}
