package com.mtc.zljk.user.action;


import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.serializer.IntegerCodec;
import com.mtc.zljk.batch.service.BatchManageService;
import com.mtc.zljk.farm.service.FarmService;
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
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
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

    @Autowired
    private BatchManageService batchManageService;

    @Autowired
    private FarmService farmService;


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
        String dealRes = null;
        String aa = pd.toString();
        aa = aa.substring(1, aa.length() - 2);
        JSONObject jsonObject = new JSONObject(aa);

        JSONObject tUserJson = jsonObject.getJSONObject("params");
        String userName = tUserJson.optString("userCode");
        String password = tUserJson.optString("passWord");
        String passwd = new SimpleHash("SHA-1", userName, password).toString();    //密码加密
        pd.put("user_code", userName);
        pd.put("user_password", passwd);

        String loginApp = tUserJson.optString("loginApp");
        String AndroidImei = tUserJson.optString("AndroidImei");
        String uuid = tUserJson.optString("uuid");
        String model = tUserJson.optString("model");
        String sysVersion = tUserJson.optString("sysVersion");
        String platForm = tUserJson.optString("platForm");

        pd = userService.getUserBylogin(pd);

        if (pd != null) {
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
            SDUser user = new SDUser();
            user.setId(pd.getInteger("id"));
            user.setUser_code(pd.getString("user_code"));
            user.setUser_password(pd.getString("user_password"));
            user.setUser_real_name(pd.getString("user_real_name"));
            user.setUser_real_name_en(pd.getString("user_real_name_en"));
            user.setUser_mobile_1(pd.getString("user_mobile_1"));
            user.setUser_status(pd.getString("user_status"));
            user.setFreeze_status(pd.getString("freeze_status"));
            session.setAttribute(Const.SESSION_USER, user);
            JSONObject userInfo = getUserInfo(user);
            resJson.put("userinfo", userInfo) ;
            //shiro加入身份验证
            Subject subject = SecurityUtils.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(userName, passwd);
            try {
                subject.login(token);
            } catch (AuthenticationException e) {
                resJson.put("Result", "Fail");
                resJson.put("Error", "身份验证失败！");
                dealRes = Constants.RESULT_SUCCESS;
            }
            if (!pd.getString("user_status").equals("1")) {
                resJson.put("Result", "Fail");
                resJson.put("LoginResult", 2);
                resJson.put("Error", "账户异常！");
                dealRes = Constants.RESULT_SUCCESS;
            } else if (!pd.getString("freeze_status").equals("0")) {
                resJson.put("Result", "Fail");
                resJson.put("LoginResult", 2);
                resJson.put("Error", "账户已被删除！");
                dealRes = Constants.RESULT_SUCCESS;
            } else {
                pd.put("user_id", pd.getInteger("id"));
                List<PageData> lpd = organService.getFarmListByUserId(pd);
                resJson.put("FarmList", lpd);
                resJson.put("Result", "Success");
                resJson.put("LoginResult", 1);
                dealRes = Constants.RESULT_SUCCESS;
            }
        } else {
            resJson.put("Result", "Fail");
            resJson.put("LoginResult", 3);
            resJson.put("Error", "用户名或密码有误！");
            dealRes = Constants.RESULT_SUCCESS;
        }
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }

    @RequestMapping("/queryDetail")
    public void queryDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //shiro管理的session
        Subject currentUser = SecurityUtils.getSubject();
        Session session = currentUser.getSession();

        JSONObject resJson = new JSONObject();
        PageData pd = new PageData();
        pd = this.getPageData();
        String dealRes = null;
        String aa = pd.toString();
        aa = aa.substring(1, aa.length() - 2);
        JSONObject jsonObject = new JSONObject(aa);

        JSONObject tUserJson = jsonObject.getJSONObject("params");
        Integer userId = tUserJson.optInt("userId");
        Integer farmId = tUserJson.optInt("farmId");

        pd.put("id", userId);
        PageData ui = userService.findUserInfo(pd);

        JSONObject userInfo = new JSONObject();
        userInfo.put("id", ui.getInteger("id"));
        userInfo.put("name", ui.getString("user_real_name"));
        userInfo.put("flag", "场长");
        userInfo.put("tele", ui.getString("user_mobile_1"));

//        JSONObject userInfo = getUserInfo(user);
        resJson.put("Result", "Success");
        resJson.put("UserInfo", userInfo);
        List houses = new ArrayList();
        pd.put("user_id", userId);
        pd.put("parent_id", farmId);
        List<PageData> ll = organService.getOrgList(pd);
        pd.put("farm_id", farmId);
        JSONArray ja = new JSONArray();
        for (PageData pageData : ll) {
            pd.put("house_code", pageData.get("id"));
            PageData lpd = batchManageService.selectBatchDataForMobile(pd);
            JSONObject o = new JSONObject();
            o.put("id", pageData.get("id"));
            o.put("name", pageData.get("name_cn"));
            if (lpd == null) {
                o.put("deviceCode", "");
                o.put("BreedBatchId", 0);
                o.put("BreedBatchStatus", 0);
                o.put("houseTypeName", "");
            } else {
                o.put("deviceCode", pageData.get("device_code") == null ? "" : pageData.get("device_code"));
                o.put("BreedBatchId", lpd.get("batch_id") == null ? 0 : lpd.get("batch_id"));
                o.put("BreedBatchStatus", lpd.get("status").equals(0) ? 2 : 1);
                o.put("houseTypeName", lpd.get("house_type"));
            }
            ja.put(o);
        }
        resJson.put("HouseInfos", ja);
        PageData pa = new PageData();
        pa.put("id", farmId);
        List<PageData> llpd = organService.getOrgListById(pa);

        JSONObject farmInfo = new JSONObject();
        farmInfo.put("id", llpd.get(0).get("id"));
        farmInfo.put("name", llpd.get(0).get("name_cn"));
        String feedMethod = llpd.get(0).getString("feed_method");
        String feedType = llpd.get(0).getString("feed_type");
        PageData temp = new PageData();
        temp.put("code_type", "FEED_METHOD");
        temp.put("biz_code", feedMethod);
        List<PageData> temp1 = farmService.findCode(temp);
        farmInfo.put("feedMethod", temp1.get(0).get("code_name"));
        temp.put("code_type", "FEED_TYPE");
        temp.put("biz_code", feedType);
        List<PageData> temp2 = farmService.findCode(temp);
        farmInfo.put("feedType", temp2.get(0).get("code_name"));

        pa.put("id", llpd.get(0).get("parent_id"));
        List<PageData> llpd_parent = organService.getOrgListById(pa);
        farmInfo.put("CompanyName", llpd_parent.get(0).get("name_cn"));
        farmInfo.put("address1", llpd.get(0).get("farm_add1"));
        farmInfo.put("address2", llpd.get(0).get("farm_add2"));
        farmInfo.put("address3", llpd.get(0).get("farm_add3"));

        resJson.put("FarmInfo", farmInfo);
        dealRes = Constants.RESULT_SUCCESS;
        DealSuccOrFail.dealApp(request, response, dealRes, resJson);
    }

    private JSONObject getUserInfo(SDUser user) throws JSONException {
        JSONObject userInfo = null;
        if (user != null) {
            userInfo = new JSONObject();
            try {
                userInfo.put("id", user.getId());
                userInfo.put("name", user.getUser_code());
                userInfo.put("tele", user.getUser_mobile_1());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return userInfo;
    }

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
