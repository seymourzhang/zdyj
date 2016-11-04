package com.mtc.zljk.user.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.user.service.SDUserService;
import com.mtc.zljk.util.common.Page;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class SDUserServiceImpl implements SDUserService {
	
	@Resource(name = "daoSupport")
	private DaoSupport dao;

	/** 登录判断 **/
	public PageData getUserBylogin(PageData pd) throws Exception {
		return (PageData) dao.findForObject("SDUserMapper.getUserInfo", pd);
	}
	
	@Override
	public List<PageData> getUserInfo(Page page) throws Exception {
		return (List<PageData>)dao.findForList("SDUserMapper.userlistPage", page);
	}
	@Override
	public int saveUser(PageData pd) throws Exception {
		return (Integer) dao.save("SDUserMapper.saveUser", pd);
	}
	
	@Override
	public void saveUserFarm(PageData pd) throws Exception {
		dao.save("SDUserMapper.saveUserFarm", pd);
	}
	
	@Override
	public void editUser(PageData pd) throws Exception {
		dao.update("SDUserMapper.editUser", pd);
		
	}
	@Override
	public void delUserFarm(PageData pd) throws Exception {
		dao.delete("SDUserMapper.delUserFarm", pd);
	}
	
	@Override
	public void delUserHouse(PageData pd) throws Exception {
		dao.delete("SDUserMapper.delUserHouse", pd);
	}
	
	
	@Override
	public void saveUserHouse(PageData pd) throws Exception {
		dao.save("SDUserMapper.saveUserHouse", pd);
	}
	@Override
	public PageData findUserInfo(PageData pd) throws Exception {
		return (PageData) dao.findForObject("SDUserMapper.findUserInfo", pd);
	}
	
	/**
	 * 根据用户id查询用户栋舍 
	 */
	@Override
	public List<PageData> findUserHouseCode(PageData pd) throws Exception {
		return  (List<PageData>) dao.findForList("SDUserMapper.findUserHouseCode", pd);
	}
	
	
}
