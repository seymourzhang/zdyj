package com.mtc.zljk.user.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.google.gson.Gson;
import com.mtc.zljk.alarm.service.AlarmCurrService;
import com.mtc.zljk.system.entity.SDMenu;
import com.mtc.zljk.system.service.SDMenuService;
import com.mtc.zljk.user.entity.SDUser;
import com.mtc.zljk.user.service.SDUserService;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Const;
import com.mtc.zljk.util.common.Json;
import com.mtc.zljk.util.common.Page;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.service.ModuleService;

@Controller
@RequestMapping(value="/user")
public class UserManageAction extends BaseAction {
	

	@Autowired
	private SDUserService userService;
	
	
	@Autowired
	private ModuleService moduleService;
	
	@Autowired 
	private AlarmCurrService alarmCurrService;
	
	
	
	/**
	 * 访问系统首页
	 */
	@RequestMapping(value="/{changeMenu}")
	public ModelAndView login_index(@PathVariable("changeMenu") String changeMenu){
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		try {
			//shiro管理的session
			Subject currentUser = SecurityUtils.getSubject();  
			Session session = currentUser.getSession();
			
			SDUser user  = (SDUser)session.getAttribute(Const.SESSION_USER);
			if (pd != null) {
				List<SDMenu> allmenuList = new ArrayList<SDMenu>();
				if(null == session.getAttribute(Const.SESSION_allmenuList)){
					pd.put("id", user.getId());  
					pd.put("user_id", user.getId());   
					  /**
			            * 添加菜单信息
			            */
					allmenuList =moduleService.service("SDMenuServiceImpl", "listAllMenu",new Object[]{pd} ); 
					
					
//					allmenuList =sdMenuService.listAllMenu(pd);
					session.setAttribute(Const.SESSION_allmenuList, allmenuList);
				}else{
					allmenuList=(List<SDMenu>)session.getAttribute(Const.SESSION_allmenuList);
				}
				
				session.setAttribute("menuList", allmenuList);	
				mv.addObject("user", pd);
				
			}else {
				mv.setViewName("modules/user/login");//session失效后跳转登录页面
			}
			
		} catch (Exception e) {
			mv.setViewName("modules/user/login");
			logger.error(e.getMessage(), e);
		}
		
		mv.setViewName("framework/index");
		return mv;
	}
	
	/**
	 * 用户管理
	 * @return
	 */
	@RequestMapping(value="/userManage")
	public ModelAndView userManage(Page page)throws Exception{
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		
		String farm_id = pd.getString("farm_id");
		
		if(null != farm_id && !"".equals(farm_id)){
			farm_id = farm_id.trim();
			pd.put("farm_id", farm_id);
		}
		String user_real_name = pd.getString("user_real_name");
		String user_mobile_1 = pd.getString("user_mobile_1");
		
		if(user_real_name != null && !"".equals(user_real_name)){
			user_real_name = user_real_name.trim();
			pd.put("user_real_name", user_real_name);
		}
		if(user_mobile_1 != null && !"".equals(user_mobile_1)){
			user_mobile_1 = user_mobile_1.trim();
			pd.put("user_mobile_1", user_mobile_1);
		} 
		
		String id = pd.getString("id");
		String pid = pd.getString("pid");
		pd.put("id", id);
		pd.put("pid", pid);
		page.setPd(pd);
		List<PageData> list=userService.getUserInfo(page);
		List<PageData> userlist=new ArrayList<PageData>();
		for (PageData pageData : list) {
			PageData paDate = new PageData();
			paDate.put("user_id", pageData.getInteger("id"));
			paDate.put("farm_id", pageData.getInteger("farm_id"));
			List<PageData> houseList=userService.findUserHouseCode(paDate);
			String houseID ="";
			String houseName ="";
			for (int i = 0; i < houseList.size(); i++) {
				if((i+1)==houseList.size()){
					houseID+=houseList.get(i).getString("house_code");
					houseName+=houseList.get(i).getString("house_name");
				}else{
					houseID+=houseList.get(i).getString("house_code")+",";
					houseName+=houseList.get(i).getString("house_name")+",";
				}
			}
			pageData.put("house_code", houseID);
			pageData.put("house_name", houseName);
			userlist.add(pageData);
		}
		mv.addObject("listUser",userlist);
		mv.addObject("farmList",getFarmList());
		mv.setViewName("modules/user/userManage");
		mv.addObject("pd",pd);
		return mv;
	}	
	
	/**
	 * 跳转到添加用户页面
	 * varro 2016-7-9
	 * @return
	 */
	@RequestMapping(value="/addUserUrl")
	public ModelAndView addUserUrl()throws Exception{
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
//		pd.put("farmId", 1);
		mv.setViewName("modules/user/addUser");
		mv.addObject("pd",pd);
		List<PageData> roleList= moduleService.service("roleServiceImpl", "getRoleList", new Object[]{pd});
		mv.addObject("roleList",roleList);
		
		mv.addObject("farmList",getFarmList());
		mv.addObject("houseList",getHouseList(pd));
		return mv;
	}
	/**
	 * 保存
	 * @return
	 */
	@RequestMapping("/addUser")
	public void addUser(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = new PageData();
		pd = this.getPageData();
		String userName= pd.getString("user_code");
		String password= pd.getString("user_password");
		String passwd = new SimpleHash("SHA-1", userName, password).toString();	//密码加密
		pd.put("id",0);
		pd.put("user_password",passwd);
		pd.put("user_status",1);
		pd.put("freeze_status",0);
		pd.put("create_person",user.getId());
		pd.put("create_date", new Date());	
		pd.put("create_time", new Date());
		pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
		try {
			userService.saveUser(pd);
			if(!StringUtils.isBlank(pd.getString("role_id"))){
				pd.put("user_id",pd.getInteger("id"));
				moduleService.service("roleServiceImpl", "saveUserRole", new Object[]{pd});
			}
			
			
//			if(!StringUtils.isBlank(pd.getString("farm_id"))){
//				pd.put("user_id",pd.getInteger("id"));
//				userService.saveUserFarm(pd);
//				if(!StringUtils.isBlank(pd.getString("house_code"))){
//					String [] arr=pd.getString("house_code").split(",");
//					for (int i = 0; i < arr.length; i++) {
//						pd.put("house_id", arr[i]);	
//						userService.saveUserHouse(pd);
//						
//					}
//				
//				}
//			}
			j.setMsg("1");
			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	
	
	/**
	 * 修改用户
	 * @return
	 */
	@RequestMapping("/editUser")
	public void editUser(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = new PageData();
		pd = this.getPageData();
		
		if(!StringUtils.isBlank(pd.getString("user_password"))){
			String userName= pd.getString("user_code");
			String password= pd.getString("user_password");
			String passwd = new SimpleHash("SHA-1", userName, password).toString();	//密码加密
			pd.put("user_password",passwd);
		}
		pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
		try {
			userService.editUser(pd);
			if(!StringUtils.isBlank(pd.getString("role_id"))){
				pd.put("user_id",pd.getString("id"));
				moduleService.service("roleServiceImpl", "editUserRole", new Object[]{pd});
			}
			
//			userService.delUserFarm(pd);
//			if(!StringUtils.isBlank(pd.getString("farm_id"))){
//				pd.put("create_person",user.getId());
//				pd.put("create_date", new Date());	
//				pd.put("create_time", new Date());
//				userService.saveUserFarm(pd);
//				userService.delUserHouse(pd);
//				if(!StringUtils.isBlank(pd.getString("house_code"))){
//					String [] arr=pd.getString("house_code").split(",");
//					for (int i = 0; i < arr.length; i++) {
//						pd.put("house_id", arr[i]);	
//						userService.saveUserHouse(pd);
//						
//					}
//				
//				}
//			}
			j.setMsg("1");
			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	
	/**
	 * 删除用户
	 * @return
	 */
	@RequestMapping("/delUser")
	public void delUser(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = new PageData();
		pd = this.getPageData();
		pd.put("user_status","0");
		pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
		try {
			userService.editUser(pd);
			j.setMsg("删除成功！");
			j.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	
	@RequestMapping("/isUserCodeNull")
	public void isUserCodeNull(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		PageData mcl = userService.findUserInfo(pd);
		if(mcl!=null){
			j.setMsg("1");//用户名已经存在
			j.setSuccess(true);
		}else{
			j.setMsg("2");// 用户名不存在
		}
		super.writeJson(j, response);
	}
	
	/**
	 * 获取警报提醒信息
	 * @param pd 数据对象
	 * @return 数据列表
     */
	@RequestMapping("/getAlarmIncoMsg")
	public void getAlarmIncoMsg(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> mcl = getAlarmIncoList(pd);
		j.setSuccess(true);
		j.setObj(mcl);
		super.writeJson(j, response);
	}
	
	/**
	 * 获取警报信息
	 * @param pd 数据对象
	 * @return 数据列表
     */
	List<PageData> getAlarmIncoList(PageData pd) throws Exception {
		pd.put("deal_status", "01");//未处理多警报
		List<PageData> mcl = alarmCurrService.selectByCondition(pd);
		return mcl;
	}
	
	
	/**
	 * 跳转到修改用户页面
	 * varro 2016-7-9
	 * @return
	 */
	@RequestMapping(value="/editUserUrl")
	public ModelAndView editUserUrl()throws Exception{
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
//		if(pd.getString("farm_id").equals("0")){
//			pd.put("farm_id", null);
//		}
//		if(pd.getString("house_code").equals("0")){
//			pd.put("house_code", null);
//		}
		PageData user=userService.findUserInfo(pd);
//		pd.put("farmId", pd.getString("farm_id"));
		mv.setViewName("modules/user/editUser");
		
//		pd.put("user_id", pd.getString("id"));
		
//		pd.put("farmId", 1);
		pd.put("user_id", pd.getString("id"));
		List<PageData> roleIdByUserId= moduleService.service("roleServiceImpl", "getRoleByUserId", new Object[]{pd});
		if(roleIdByUserId!=null && roleIdByUserId.size()>0){
			PageData pageData=roleIdByUserId.get(0);
			pd.put("role_id", pageData.getInteger("role_id"));
		}
		mv.addObject("pd",pd);
		List<PageData> roleList= moduleService.service("roleServiceImpl", "getRoleList", new Object[]{pd});
		mv.addObject("roleList",roleList);
		
		
		mv.addObject("pd",pd);
		mv.addObject("userList",user);
//		mv.addObject("farmList",getFarmList());
//		mv.addObject("houseList",getHouseList(pd));
		return mv;
	}
	
	
	@RequestMapping("/getHouse")
	public void getHouse(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> mcl = getHouseList(pd);
		j.setSuccess(true);
		j.setObj(mcl);
		super.writeJson(j, response);
	}
	
	/**
	 * 获取农场信息
	 * @param pd 数据对象
	 * @return 数据列表
     */
	List<PageData> getFarmList() throws Exception {
		List<PageData> mcl;
			mcl = moduleService.service("farmServiceImpl", "selectAll", null);//farmService.selectAll();
		return mcl;
	}
	
	/**
	 * 获取栋舍信息
	 * @param pd 数据对象
	 * @return 数据列表
     */
	List<PageData> getHouseList(PageData pd) throws Exception {
		List<PageData> mcl;
			mcl = moduleService.service("farmServiceImpl", "selectHouseByCondition", new Object[]{pd});//farmService.selectHouseAll();
		return mcl;
	}

}
