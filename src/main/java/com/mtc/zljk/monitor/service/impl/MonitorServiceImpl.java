package com.mtc.zljk.monitor.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.mtc.zljk.monitor.service.MonitorService;
import org.springframework.stereotype.Service;

import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class MonitorServiceImpl implements MonitorService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;

	public List<PageData> selectAll() throws Exception{
		return (List<PageData>) dao.findForList("MonitorCurrMapper.selectAll", null);
	}

	public List<PageData> selectAllForMobile() throws Exception{
		return (List<PageData>) dao.findForList("MonitorCurrMapper.selectAllForMobile", null);
	}

	public List<PageData> selectByCondition(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("MonitorCurrMapper.selectByCondition", pd);
	}

	/**
	 * 运行调度任务
	 * @throws Exception
	 */
	public void run() {
		try{
			dao.save("MonitorCurrMapper.SP_MONITOR",null);
		} catch (Exception e){
			e.printStackTrace();
		}
	}
  
}  
