package com.mtc.zljk.system.service;

import java.util.List;

import com.mtc.zljk.util.common.PageData;

public interface CodeService {
	
	public List<PageData> getCodeList(PageData pd) throws Exception;

}
