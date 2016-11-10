package com.mtc.zljk.goods.service.impl;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.goods.service.GoogsService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class GoogsServiceImpl implements GoogsService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	@Override
	public List<PageData> getGoodsList(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDGoodsMapper.getGoodsList", pd);
	}
	
	@Override
	public List<PageData> getCorporation(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDGoodsMapper.getCorporation", pd);
	}
	
	@Override
	public List<PageData> getFactory(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDGoodsMapper.getFactory", pd);
	}
	@Override
	public int saveStock(PageData pd) throws Exception {
		return (Integer) dao.save("SDGoodsMapper.saveStock", pd);
	}
	@Override
	public int saveStockcChange(PageData pd) throws Exception {
		return (Integer) dao.save("SDGoodsMapper.saveStockcChange", pd);
	}
	
	@Override
	public List<PageData> getStockChange(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDGoodsMapper.getStockChange", pd);
	}
	@Override
	public List<PageData> getStock(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDGoodsMapper.getStock", pd);
	}
	@Override
	public BigDecimal getSumCount(PageData pd) throws Exception {
		return (BigDecimal)dao.findForObject("SDGoodsMapper.getSumCount", pd);
	}
	
	@Override
	public int editStock(PageData pd) throws Exception {
		return (Integer)dao.update("SDGoodsMapper.editStock", pd);
	}
	
	@Override
	public List<PageData> getStockSum(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDGoodsMapper.getStockSum", pd);
	}

	@Override
	public List<PageData> getStockApproval(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDGoodsMapper.getStockApproval", pd);
	}
}
