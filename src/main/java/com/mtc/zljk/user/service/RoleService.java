package com.mtc.zljk.user.service;

import java.util.List;

import com.mtc.zljk.util.common.PageData;

public interface RoleService {
	
	public List<PageData> getRoleList(PageData pd) throws Exception;
	
	public void saveUserRole(PageData pd)throws Exception;
	
	public List<PageData> getRoleByUserId(PageData pd) throws Exception;

	public void editUserRole(PageData pd) throws Exception;

	void insertRightsObj(PageData pd) throws Exception;

	void insertRoleRightsByUserId(PageData pd) throws Exception;
}
