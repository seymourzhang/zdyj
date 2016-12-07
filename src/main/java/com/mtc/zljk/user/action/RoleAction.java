package com.mtc.zljk.user.action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.mtc.zljk.user.entity.SDUser;
import com.mtc.zljk.util.common.Const;
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
		SDUser user=(SDUser)session.getAttribute(Const.SESSION_USER);
		pd = this.getPageData();
		if(null == pd.get("user_id"))
			pd.put("user_id", user.getId());
		List<PageData> orglist= moduleService.service("organServiceImpl", "getOrgListByRoleId", new Object[]{pd});

//		PageData pdate = new PageData();
//		List<PageData> orgAll= moduleService.service("organServiceImpl", "getOrgListByRoleId", new Object[]{pdate});
		boolean isSuperUser = false;
		for (PageData pageData : orglist) {
			if(null != pageData.get("role_level") && 1 == pageData.getInteger("role_level"))
				isSuperUser = true;
		}

		List<PageData> list=new ArrayList<PageData>();
		for (PageData pageData : orglist) {
			PageData data=new PageData();
			data.put("id", pageData.getInteger("id") + "");
			data.put("pId", pageData.getInteger("parent_id")+ "");
			data.put("name", pageData.getString("name_cn") + "");
			data.put("open", "true");
			data.put("chkDisabled", "false");

			String flag = pd.getString("checkedFlag");
			if(null != flag && "1".equals(flag)){
				if (null != pageData.get("role_level")) {
					data.put("checked", "true");
				} else {
					data.put("checked", "false");
				}
			} else{
				data.put("checked", "false");
			}
			if(isSuperUser){
				list.add(data);
			} else {
				if(null != pageData.get("role_level"))
					list.add(data);
			}
		}
		j.setSuccess(true);
		j.setObj(list);
		super.writeJson(j, response);
	}
	
}
