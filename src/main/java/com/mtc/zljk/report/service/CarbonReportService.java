package com.mtc.zljk.report.service;

import java.util.List;

import com.mtc.zljk.util.common.PageData;

public interface CarbonReportService {
	/**
     * 按条件查询
     * @param pd
     * @return List<SDFarm>
     * @throws Exception
     */
	List<PageData> getCarbonReport(PageData pd) throws Exception;
	
	
	/**
     * 按条件查询co2曲线图月表
     * @param pd
     * @return List<SDFarm>
     * @throws Exception
     */
	public List<PageData> getCarbonReportMonth(PageData pd) throws Exception ;
}
