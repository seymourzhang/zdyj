package com.mtc.zljk.report.service;

import java.util.List;

import com.mtc.zljk.util.common.PageData;

public interface TemProfileService {
	
	
	
	 /**
     * 按条件查询
     * @param pd
     * @return List<SDFarm>
     * @throws Exception
     */
	List<PageData> getTemProfile(PageData pd) throws Exception;
	
	
	/**
     * 按条件查询温度曲线图月表
     * @param pd
     * @return List<SDFarm>
     * @throws Exception
     */
	public List<PageData> getTemProfileMonth(PageData pd) throws Exception ;
	

}
