package com.mtc.zljk.user.action;


import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.serializer.IntegerCodec;
import com.mtc.zljk.user.entity.SDUser;
import com.mtc.zljk.user.service.SBUserImeiService;
import com.mtc.zljk.user.service.SDUserService;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.*;
import com.mtc.zljk.util.service.ModuleService;
import com.mtc.zljk.util.service.OrganService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.codehaus.jackson.map.deser.ValueInstantiators;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;


@Controller
@RequestMapping("/loginMobile")
public class LoginMobileAction extends BaseAction{
	
	@Autowired
	private SDUserService userService;
	
//	@Autowired
//	private SDMenuService sdMenuService;
	
	@Autowired
	private ModuleService moduleService;

	@Autowired
	private SBUserImeiService sbUserImeiService;

	@Autowired
	private OrganService organService;


	/**
	 * 移动端登陆
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/login")
	public void login(HttpServletRequest request,HttpServletResponse response)throws Exception {
		//shiro管理的session
		Subject currentUser = SecurityUtils.getSubject();
		Session session = currentUser.getSession();

		JSONObject resJson = new JSONObject();
		PageData pd = new PageData();
		pd = this.getPageData();
		String dealRes = null ;
		String aa=pd.toString();
		aa=aa.substring(1,aa.length()-2);
		JSONObject jsonObject = new JSONObject(aa);

		JSONObject tUserJson = jsonObject.getJSONObject("params");
		String userName= tUserJson.optString("userCode");
		String password= tUserJson.optString("passWord");
		String passwd = new SimpleHash("SHA-1", userName, password).toString();	//密码加密
		pd.put("user_code", userName);
		pd.put("user_password", passwd);

		String loginApp = tUserJson.optString("loginApp");
		String AndroidImei = tUserJson.optString("AndroidImei");
		String uuid = tUserJson.optString("uuid");
		String model = tUserJson.optString("model");
		String sysVersion = tUserJson.optString("sysVersion");
		String platForm = tUserJson.optString("platForm");

		pd=userService.getUserBylogin(pd);

		if(pd != null){
			PageData pageData = new PageData();
			if (!"".equals(AndroidImei) && AndroidImei != null) {
				pageData.put("imei_no", AndroidImei);
				pageData.put("user_id", pd.getInteger("id"));
				pageData.put("user_code", userName);
				pageData.put("uuid", uuid);
				pageData.put("model", model);
				pageData.put("sys_version", sysVersion);
				pageData.put("platform", platForm);
				pageData.put("create_person", pd.getInteger("id"));
				int i = sbUserImeiService.insert(pageData);
			}
			SDUser user=new SDUser();
			user.setId(pd.getInteger("id"));
			user.setUser_code(pd.getString("user_code"));
			user.setUser_password(pd.getString("user_password"));
			user.setUser_real_name(pd.getString("user_real_name"));
			user.setUser_real_name_en(pd.getString("user_real_name_en"));
			user.setUser_mobile_1(pd.getString("user_mobile_1"));
			user.setUser_status(pd.getString("user_status"));
			user.setFreeze_status(pd.getString("freeze_status"));
			session.setAttribute(Const.SESSION_USER, user);
			JSONObject userInfo = genUserInfo(user);
			resJson.put("userinfo", userInfo);
			//shiro加入身份验证
			Subject subject = SecurityUtils.getSubject();
		    UsernamePasswordToken token = new UsernamePasswordToken(userName, passwd);
		    try {
		        subject.login(token);
		    } catch (AuthenticationException e) {
		    	resJson.put("Result", "Fail");
		    	resJson.put("Error","身份验证失败！");
		    	dealRes = Constants.RESULT_FAIL ;
		    }
		    if(!pd.getString("user_status").equals("1")){
		    	resJson.put("Result", "Fail");
		    	resJson.put("LoginResult", 2);
		    	resJson.put("Error","账户异常！");
		    	dealRes = Constants.RESULT_FAIL ;
		    }else{
				List<PageData> lpd = organService.getFarmListByUserId(pd);
				resJson.put("FarmList", lpd);
		    	resJson.put("Result", "Fail");
				resJson.put("LoginResult", 1);
		    	dealRes = Constants.RESULT_SUCCESS ;
		    }
		}else{
			resJson.put("Result", "Fail");
			resJson.put("LoginResult",3);
			resJson.put("Error", "用户名或密码有误！");
			dealRes = Constants.RESULT_FAIL ;
		}
		DealSuccOrFail.dealApp(request,response,dealRes,resJson);
	}

	private JSONObject genUserInfo(SDUser tSDUser) throws JSONException{
		JSONObject userInfo = null;
		if(tSDUser != null){
			userInfo = new JSONObject();
			try {
				userInfo.put("id", tSDUser.getId());
				userInfo.put("name", tSDUser.getUser_code());
				userInfo.put("tele", tSDUser.getUser_mobile_1());
			} catch (org.json.JSONException e) {
				e.printStackTrace();
			}
		}
		return userInfo;
	}
	
	/**
	 * 用户登陆
	 * varro
	 * 2016-7-6
	 *//*
	@RequestMapping("/login")
	public void login(HttpServletRequest request,HttpServletResponse response)throws Exception {
		Json j=new Json();
		PageData pd = new PageData();
		pd = this.getPageData();
		String userName= pd.getString("user_code");
		String password= pd.getString("user_password");
		
		//shiro管理的session
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		
		
		pd.put("user_code", userName);   
		String passwd = new SimpleHash("SHA-1", userName, password).toString();	//密码加密
		pd.put("user_password", passwd);
		pd=userService.getUserBylogin(pd);
		if(pd != null){
			SDUser user=new SDUser();
			user.setId(pd.getInteger("id"));
			user.setUser_code(pd.getString("user_code"));
			user.setUser_password(pd.getString("user_password"));
			user.setUser_real_name(pd.getString("user_real_name"));
			user.setUser_real_name_en(pd.getString("user_real_name_en"));
			user.setUser_mobile_1(pd.getString("user_mobile_1"));
			user.setUser_status(pd.getString("user_status"));
			user.setFreeze_status(pd.getString("freeze_status"));
			session.setAttribute(Const.SESSION_USER, user);
			
			//shiro加入身份验证
			Subject subject = SecurityUtils.getSubject(); 
		    UsernamePasswordToken token = new UsernamePasswordToken(userName, passwd); 
		    try { 
		        subject.login(token); 
		    } catch (AuthenticationException e) { 
		    	j.setMsg("身份验证失败！");
		    }
		    if(!pd.getString("user_status").equals("1")){
		    	j.setMsg("账户异常！");
		    }else{
		    	j.setSuccess(true);
				j.setMsg("登录成功");
		    }
		}else{
			j.setMsg("1");//用户名或密码有误
			//errInfo = "usererror"; 				
		}
		super.writeJson(j, response);
	}
	*/
	/**
	 * 进入tab标签
	 * @return
	 */
	@RequestMapping("/tab")
	public ModelAndView tab(){
		ModelAndView mav = new ModelAndView("framework/tab");
		return mav;
	}
	
	/**
	 * 进入首页后的默认页面
	 * @return
	 */
	@RequestMapping("/login_default")
	public ModelAndView defaultPage(){
		ModelAndView mav = new ModelAndView("framework/default");
		return mav;
	}
	
	
	
	/**
	 * 退出系统
	 * @param request
	 * @return
	 */
	@RequestMapping("/outLogin")
	public ModelAndView outLogin(HttpServletRequest request) {
		request.getSession().setAttribute(Const.SESSION_USER, null);
		request.getSession().setAttribute(Const.SESSION_allmenuList, null);
		ModelAndView mav = new ModelAndView("/modules/user/login");
		return mav;
	}

}
