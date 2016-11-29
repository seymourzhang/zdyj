package com.mtc.zljk.report.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.report.service.AlarmHistService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class AlarmHistServiceImpl implements AlarmHistService {
	
	@Resource(name = "daoSupport")
	private DaoSupport dao;


	public List<PageData> getAlarmHist(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("AlarmHistMapper.alarmHist", pd);
	}


	public List<PageData> getAlarmHistDetail(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("AlarmHistMapper.alarmHistDetail", pd);
	}

	public List<PageData> selectSBCode() throws Exception {
	
		return (List<PageData>) dao.findForList("AlarmHistMapper.selectSBCode", null);
	}

	public PageData selectAlarmForMobile(PageData pd) throws Exception{
		return (PageData) dao.findForObject("AlarmHistMapper.selectAlarmForMobile", pd);
	}

}
