package com.mtc.zljk.system.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.system.entity.SDMenu;
import com.mtc.zljk.system.service.SDMenuService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;



@Service
public class SDMenuServiceImpl implements SDMenuService {
	
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	public List<SDMenu>  listSubMenuByParentId(PageData pd) throws Exception {
		return (List<SDMenu>)dao.findForList("SDMenuMapper.listSubMenuByParentId", pd);
	}
	
	public List<SDMenu> listAllParentMenu(PageData pd) throws Exception {
		return (List<SDMenu>) dao.findForList("SDMenuMapper.listAllParentMenu",pd);
	}

	public List<SDMenu> listAllMenu(PageData pd) throws Exception {
		List<SDMenu> rl = this.listAllParentMenu(pd);
		for (SDMenu menu : rl) {
			pd.put("MENU_PID", menu.getMENU_ID());   
			List<SDMenu> subList=this.listSubMenuByParentId(pd);
			menu.setSubMenu(subList);
		}
		return rl;
	}

	
}
