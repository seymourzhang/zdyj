package com.mtc.zljk.user.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.user.service.RoleService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class RoleServiceImpl implements RoleService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	@Override
	public List<PageData> getRoleList(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDRoleMapper.getRoleList", pd);
	}

	@Override
	public void saveUserRole(PageData pd) throws Exception {
		dao.save("SDRoleMapper.saveUserRole", pd);
	}
	@Override
	public List<PageData> getRoleByUserId(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDRoleMapper.getRoleByUserId", pd);
	}
	
	@Override
	public void editUserRole(PageData pd) throws Exception {
		dao.update("SDRoleMapper.editUserRole", pd);
		
	}
	
}
