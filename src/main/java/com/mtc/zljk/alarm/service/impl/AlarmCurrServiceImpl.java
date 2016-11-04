package com.mtc.zljk.alarm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.alarm.service.AlarmCurrService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class AlarmCurrServiceImpl implements AlarmCurrService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;

	public List<PageData> selectAll() throws Exception {
		
		return (List<PageData>) dao.findForList("AlarmCurrMapper.selectAll", null);
	}

	public List<PageData> selectByCondition(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("AlarmCurrMapper.selectByCondition", pd);
	}
	
	@Override
	public int updateAlarm(PageData pd) throws Exception{
		return (Integer) dao.update("AlarmCurrMapper.updateAlarm", pd);
	}
	

	public void run() {
		try{
			dao.save("AlarmCurrMapper.SP_ALARM",null);
		} catch (Exception e){
			e.printStackTrace();
		}
		
	}
}
