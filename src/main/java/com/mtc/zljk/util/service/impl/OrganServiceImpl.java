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
	
	public List<PageData> getOrgListById(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDOrganizationMapper.getOrgListById", pd);
	}
	
	public List<PageData> getCompanyByUserId(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDOrganizationMapper.getCompanyByUserId", pd);
	};

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

    public List<PageData> getHouseType(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDOrganizationMapper.getHouseType",pd);
	}

	public List<PageData> getOrganizationList(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("SDOrganizationMapper.getOrganizationList", pd);
	}

	public List<PageData> getMaxOrgLevelId(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDOrganizationMapper.getMaxOrgLevelId", pd);
	}

	public int insertOrg(PageData pd) throws Exception {
		return (Integer) dao.save("SDOrganizationMapper.insertOrg", pd);
	}

	public int updateOrg(PageData pd) throws Exception {
		return (Integer) dao.update("SDOrganizationMapper.updateOrg", pd);
	}

	public int deleteOrg(PageData pd) throws Exception {
		return (Integer) dao.delete("SDOrganizationMapper.deleteOrg", pd);
	}

	public List<PageData> getFarmForMapping(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDOrganizationMapper.getFarmForMapping", pd);
	}

	public int setFarmMapping(PageData pd) throws Exception {
		return (Integer) dao.save("SDOrganizationMapper.setFarmMapping", pd);
	}

	public int setHouseMapping(PageData pd) throws Exception {
		return (Integer) dao.save("SDOrganizationMapper.setHouseMapping", pd);
	}
}
