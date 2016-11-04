package com.mtc.zljk.farm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.farm.service.FarmService;
import com.mtc.zljk.util.common.Page;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

/**
 * Created by LeLe on 6/30/2016.
 */
@Service
public class FarmServiceImpl implements FarmService {
   
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	public List<PageData> selectByCondition(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("SDFarmMapper.selectByCondition", pd);
	};
	
	public List<PageData> selectAll() throws Exception{
		return (List<PageData>) dao.findForList("SDFarmMapper.selectAll", null);
	}
	
	public List<PageData> selectHouseByCondition(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("SDFarmMapper.selectHouseByCondition", pd);
	}
	
	public List<PageData> selectHouseById(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("SDFarmMapper.selectHouseById", pd);
	}
	
	public List<PageData> selectBatchByCondition(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDFarmMapper.selectBatchByCondition", pd);
	}

	public List<PageData> findFarm(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDFarmMapper.findFarm", pd);
	}
	
	public List<PageData> findHouse(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDFarmMapper.findHouse", pd);
	}
	
	public List<PageData> findBatchlistPage(Page page) throws Exception {
		return (List<PageData>) dao.findForList("SDFarmMapper.findBatchlistPage", page);
	}
	public List<PageData> findCode(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDFarmMapper.findCode", pd);
	}

	public List<PageData> findAreaChina(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDFarmMapper.findAreaChina", pd);
	}
	

	public List<PageData> findDevice(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDFarmMapper.findDevice", pd);
	}
	

	public List<PageData> findHouseDevice(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDFarmMapper.findHouseDevice", pd);
	}
	
	public int saveFarm(PageData pd) throws Exception {
		return (Integer) dao.save("SDFarmMapper.saveFarm", pd);
	}

	public void editFarm(PageData pd) throws Exception {
		dao.update("SDFarmMapper.editFarm", pd);
	}

	public int saveBatch(PageData pd) throws Exception {
		return (Integer) dao.save("SDFarmMapper.saveBatch", pd);
	}
	

	public void editBatch(PageData pd) throws Exception {
		dao.update("SDFarmMapper.editBatch", pd);
		
	}

	public void editHouse(PageData pd) throws Exception {
		dao.update("SDFarmMapper.editHouse", pd);
		
	}

	public int saveHouse(PageData pd) throws Exception {
		return (Integer) dao.save("SDFarmMapper.saveHouse", pd);
	}
	

	public int saveHouseAlarm(PageData pd) throws Exception {
		return (Integer) dao.save("SDFarmMapper.saveHouseAlarm", pd);
	}

	public int saveDeviHouse(PageData pd) throws Exception {
		return (Integer) dao.save("SDFarmMapper.saveDeviHouse", pd);
	}
	

	public void delDeviHouse(PageData pd) throws Exception {
		dao.delete("SDFarmMapper.delDeviHouse", pd);
		
	}
	

	public PageData isBatchHouseNull(PageData pd) throws Exception {
	return (PageData)dao.findForObject("SDFarmMapper.isBatchHouseNull", pd);
	}
	
}
