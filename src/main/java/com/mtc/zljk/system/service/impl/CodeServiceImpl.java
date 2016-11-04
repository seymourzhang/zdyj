package com.mtc.zljk.system.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.system.service.CodeService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class CodeServiceImpl implements CodeService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	@Override
	public List<PageData> getCodeList(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDCodeMapper.getCodeList", pd);
	}

}
