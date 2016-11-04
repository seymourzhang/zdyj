package com.mtc.zljk.util.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;
import com.mtc.zljk.util.service.OrganService;

@Service
public class OrganServiceImpl implements OrganService {
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	public List<PageData> getOrgList(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("SDOrganizationMapper.getOrgList", pd);
	}
	
	public List<PageData> getOrgListByRoleId(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("SDOrganizationMapper.getOrgListByRoleId", pd);
	}
	
	@Override
	public List<PageData> getOrgListById(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDOrganizationMapper.getOrgListById", pd);
	}

	public List<PageData> getFarmByUserId(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDOrganizationMapper.getFarmByUserId", pd);
	};

	public List<PageData> getHouseListByUserId(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDOrganizationMapper.getHouseListByUserId", pd);
	};

	public List<PageData> selectOrgByUser(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("SDOrganizationMapper.getOrgListByUser", pd);
	}

    public List<PageData> getFarmListByUserId(PageData pd) throws Exception {
        return (List<PageData>) dao.findForList("SDOrganizationMapper.getFarmListByUserId", pd);
    };

}
