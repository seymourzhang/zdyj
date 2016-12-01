package com.mtc.zljk.goods.service;

import java.math.BigDecimal;
import java.util.List;

import com.mtc.zljk.util.common.PageData;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;

public interface GoogsService {
	
	public List<PageData> getGoodsList(PageData pd) throws Exception;
	
	public List<PageData> getGoodsList2(PageData pd) throws Exception;
	
	public List<PageData> getCorporationGood(PageData pd) throws Exception;
	
	public List<PageData> getCorporation(PageData pd) throws Exception;
	
	public List<PageData> getCorporation2(PageData pd) throws Exception;
	
	public List<PageData> getCorporation3(PageData pd) throws Exception;
	
	public List<PageData> getFactory(PageData pd) throws Exception;
	
	public List<PageData> getFactory2(PageData pd) throws Exception;
	
	public List<PageData> getFactory3(PageData pd) throws Exception;
	
	public int saveStock(PageData pd)throws Exception;
	
	public int saveStockcChange(PageData pd)throws Exception;
	
	public List<PageData> getStockChange(PageData pd) throws Exception;
	
	public List<PageData> getStock(PageData pd) throws Exception;
	
	public BigDecimal getSumCount(PageData pd) throws Exception;
	
	public int editStock(PageData pd)throws Exception;
	
	public List<PageData> getStockSum(PageData pd) throws Exception;

	public List<PageData> getStockApproval(PageData pd) throws Exception;

	public int approvalStockChange(PageData pd) throws Exception;

	public int updateRemindData(PageData pd) throws Exception;
	
	public int saveCorporation(PageData pd)throws Exception;
	
	public int saveFactory(PageData pd)throws Exception;
	
	public int saveGoods(PageData pd)throws Exception;
	
	public int saveCorporationGoods(PageData pd)throws Exception;
	
	public int editCorporation(PageData pd)throws Exception;
	
	public int editFactory(PageData pd)throws Exception;
	
	public int editGoods(PageData pd)throws Exception;
	
	public int editCorporationGood(PageData pd)throws Exception;
}
