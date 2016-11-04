package com.mtc.zljk.report.service;

import java.util.List;

import com.mtc.zljk.util.common.PageData;

public interface WaterReportService {
	/**
     * 按条件查询
     * @param pd
     * @return List<SDFarm>
     * @throws Exception
     */
	List<PageData> getWaterReport(PageData pd) throws Exception;
	
	
	/**
     * 按条件查询饮水曲线图月表
     * @param pd
     * @return List<SDFarm>
     * @throws Exception
     */
	public List<PageData> getWaterReportMonth(PageData pd) throws Exception ;
}
