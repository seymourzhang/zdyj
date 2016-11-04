package com.mtc.zljk.goods.service;

import java.math.BigDecimal;
import java.util.List;

import com.mtc.zljk.util.common.PageData;

public interface GoogsService {
	
	public List<PageData> getGoodsList(PageData pd) throws Exception;
	
	public List<PageData> getCorporation(PageData pd) throws Exception;
	
	public List<PageData> getFactory(PageData pd) throws Exception;
	
	public int saveStock(PageData pd)throws Exception;
	
	public int saveStockcChange(PageData pd)throws Exception;
	
	public List<PageData> getStockChange(PageData pd) throws Exception;
	
	public List<PageData> getStock(PageData pd) throws Exception;
	
	public BigDecimal getSumCount(PageData pd) throws Exception;
	
	public int editStock(PageData pd)throws Exception;
	
	public List<PageData> getStockSum(PageData pd) throws Exception;
	
}
