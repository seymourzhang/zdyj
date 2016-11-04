package com.mtc.zljk.user.action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mtc.zljk.user.service.RoleService;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Json;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.service.ModuleService;

@Controller
@RequestMapping(value="/role")
public class RoleAction extends BaseAction {
	
	@Autowired
	private RoleService roleService;
	
	@Autowired
	private ModuleService moduleService;
	
	
	/**
	 * 通过角色获取组织架构
	 * @return
	 */
	@RequestMapping("/getOrgByRoleId")
	public void getOrgByRoleId(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		PageData pd = new PageData();
		pd = this.getPageData();
		List<PageData> orglist= moduleService.service("organServiceImpl", "getOrgListByRoleId", new Object[]{pd});
		PageData pdate = new PageData();
		List<PageData> orgAll= moduleService.service("organServiceImpl", "getOrgListByRoleId", new Object[]{pdate});
		List<PageData> list=new ArrayList<PageData>();
		for (PageData pageData : orgAll) {
			PageData data=new PageData();
			data.put("id", pageData.getInteger("id") + "");
			data.put("pId", pageData.getInteger("parent_id")+ "");
			data.put("name", pageData.getString("name_cn") + "");
			data.put("open", "true");
			data.put("chkDisabled", "true");
			int tmp = 0;
			for (PageData p2 : orglist) {
				if(p2.getInteger("id")==pageData.getInteger("id")){
					tmp = 1;
					break;
				}
			}
			if (tmp == 1) {
				data.put("checked", "true");
			} else {
				data.put("checked", "false");
			}
			list.add(data);
		}
		j.setSuccess(true);
		j.setObj(list);
		super.writeJson(j, response);
	}
	
}
