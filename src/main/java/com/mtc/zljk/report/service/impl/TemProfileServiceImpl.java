package com.mtc.zljk.report.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.report.service.TemProfileService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class TemProfileServiceImpl implements TemProfileService {
	
	@Resource(name = "daoSupport")
	private DaoSupport dao;

	@Override
	public List<PageData> getTemProfile(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("ReportMapper.temProfileDaily", pd);
	}
	
	@Override
	public List<PageData> getTemProfileMonth(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("ReportMapper.temProfileMonth", pd);
	}
	
}
