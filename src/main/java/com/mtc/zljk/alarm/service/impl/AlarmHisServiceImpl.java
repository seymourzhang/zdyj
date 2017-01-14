package com.mtc.zljk.alarm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.mtc.zljk.alarm.service.AlarmHisService;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class AlarmHisServiceImpl implements AlarmHisService {

	@SuppressWarnings("restriction")
	@Resource(name = "daoSupport")
	private DaoSupport dao;

	@SuppressWarnings("unchecked")
	public List<PageData> selectAlarmHisByCondition(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("SBDayageSettingSubMapper.selectAlarmHisByCondition", pd);
	}
	
	@SuppressWarnings("unchecked")
	public List<PageData> selectAlarmHisDetailByCondition(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("SBDayageSettingSubMapper.selectAlarmHisDetailByCondition", pd);
	}
	
	@SuppressWarnings("unchecked")
	public List<PageData> selectHouseAlarmHisByCondition(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("SBDayageSettingSubMapper.selectHouseAlarmHisByCondition", pd);
	}
	
	@SuppressWarnings("unchecked")
	public List<PageData> selectHouseAlarmHisDetailByCondition(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("SBDayageSettingSubMapper.selectHouseAlarmHisDetailByCondition", pd);
	}
	
}  
