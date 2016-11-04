package com.mtc.zljk.system.service;

import java.util.List;


import com.mtc.zljk.system.entity.SDMenu;
import com.mtc.zljk.util.common.PageData;

public interface SDMenuService {
	
	public List<SDMenu> listAllMenu(PageData pd) throws Exception;

}
