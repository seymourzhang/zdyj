package com.mtc.zljk.util.action;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mtc.zljk.user.entity.SDUser;
import com.mtc.zljk.util.common.Const;
import com.mtc.zljk.util.common.Json;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.service.OrganService;

@Controller
@RequestMapping("/org")
public class OrgAction extends BaseAction{
	
	@Autowired
	private OrganService  organService;
	
	
	@RequestMapping("/getOrg")
	public void getOrg(HttpServletResponse response) throws Exception{
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		SDUser user=(SDUser)session.getAttribute(Const.SESSION_USER);
		
		Json j=new Json();
		PageData pd = this.getPageData();
		pd.put("user_id", user.getId());
		List<PageData> orglist = organService.getOrgList(pd);
		int count=0;
		if(orglist!=null&&orglist.size()!=0){
			count=orglist.get(orglist.size()-1).getInteger("level_id");
		}
		List<PageData> list=new ArrayList<PageData>();
		for (int i = 1; i <= count; i++) {
			for (PageData pageData : orglist) {
				if(i==pageData.getInteger("level_id")){
					PageData paData=new PageData();
					BeanUtils.copyProperties(pageData,paData);
					paData.put("level_id", pageData.getInteger("level_id"));
					paData.put("parent_id", pageData.getInteger("parent_id"));
					paData.put("level_name", pageData.getString("level_name"));
					list.add(paData);
					break;
				}
				
			}
		}
		
//		j.setMsg(conut);
		j.setSuccess(true);
		j.setObj(list);
		j.setObj1(orglist);
		super.writeJson(j, response);
	}
	@RequestMapping("/getOrgByPid")
	public void getOrgByPid(HttpServletResponse response) throws Exception{
		Json j=new Json();
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		SDUser user=(SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = this.getPageData();
		pd.put("user_id", user.getId());
		List<PageData> orglist = organService.getOrgList(pd);
		j.setSuccess(true);
		j.setObj(orglist);
		super.writeJson(j, response);
	}
	

}
