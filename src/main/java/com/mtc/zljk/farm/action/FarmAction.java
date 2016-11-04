package com.mtc.zljk.farm.action;

import com.mtc.zljk.farm.service.FarmService;
import com.mtc.zljk.user.entity.SDUser;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Const;
import com.mtc.zljk.util.common.Json;
import com.mtc.zljk.util.common.Page;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.service.ModuleService;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @ClassName: FarmAction
 * @Date 2016-7-26
 * @author Varro
 * 农场管理控制类
 */
@Controller
@RequestMapping("/farm")
public class FarmAction extends BaseAction{
    @Autowired 
	private FarmService farmService;
    
    @Autowired
	private ModuleService moduleService;
	
	@RequestMapping("/farmView")
	public ModelAndView farmView(Page page,HttpSession session) throws Exception {
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		/**农场信息-Varro-2016-7-26-**/
		List<PageData> farmList= farmService.findFarm(pd);
		mv.addObject("SDFarmList",farmList);
		
		/**栋舍信息-Varro-2016-7-26-**/
		List<PageData> hoList= farmService.findHouse(pd);
		List<PageData> houseList=new ArrayList<PageData>();
		for (PageData pageData : hoList) {
			PageData paDate = new PageData();
			paDate.put("house_id", pageData.getInteger("id"));
			List<PageData> houseDev=farmService.findHouseDevice(paDate);
			String deviceID ="";
			String deviceName ="";
			for (int i = 0; i < houseDev.size(); i++) {
				if((i+1)==houseDev.size()){
					deviceID+=houseDev.get(i).getString("main_id");
					deviceName+=houseDev.get(i).getString("device_factory")+"（设备号:"+houseDev.get(i).getString("device_code")+"端口号:"+houseDev.get(i).getString("port_id")+"）";
				}else{
					deviceID+=houseDev.get(i).getString("main_id")+",";
					deviceName+=houseDev.get(i).getString("device_factory")+"（设备号:"+houseDev.get(i).getString("device_code")+"端口号:"+houseDev.get(i).getString("port_id")+"）,";
				}
			}
			pageData.put("deviceID", deviceID);
			pageData.put("deviceName", deviceName);
			houseList.add(pageData);
			
		}
		mv.addObject("SDHouseList",houseList);
		
		/**批次信息-Varro-2016-7-26-**/
		page.setPd(pd);
		List<PageData> balist = farmService.findBatchlistPage(page);
		List<PageData> batchList=new ArrayList<PageData>();
		for (PageData pageData : balist) {
			PageData paDate = new PageData();
			paDate.put("operation_type", "1");
			paDate.put("batch_no", pageData.getString("batch_no"));
			paDate.put("farmId",pageData.get("farm_id"));
			paDate.put("houseId", pageData.get("house_code"));
			List<PageData> bblist= farmService.selectBatchByCondition(paDate);
			if(bblist.size()!=0){
				pageData.put("batch_flag", "1");
			}
			if(bblist.size()!=0 && Integer.parseInt(pageData.get("operation_type").toString())==2){
			   continue;
			}
			batchList.add(pageData);
		}
		mv.addObject("pd",pd);
		mv.addObject("SDBatchList",batchList);
		
		mv.setViewName("/modules/farm/farmView");
		return mv;
	}
	
	/**
	 * 跳转到新增农场信息页面
	 * varro 2016-7-9
	 * @return
	 */
	@RequestMapping(value="/addFarmUrl")
	public ModelAndView addFarmUrl()throws Exception{
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		/***查询饲养方式***/
		pd.put("code_type", "FEED_METHOD");
		List<PageData> feedMethod= farmService.findCode(pd);
		
		/***查询饲养品种***/
		pd.put("code_type", "FEED_TYPE");
		List<PageData> feedType= farmService.findCode(pd);
		
		/******查询省份**********/
		pd.put("parent_id", 0);
		pd.put("level", 1);
		List<PageData> prlist= farmService.findAreaChina(pd);
		mv.addObject("pd",pd);
		mv.addObject("feedMethod",feedMethod);
		mv.addObject("feedType",feedType);
		mv.addObject("prlist",prlist);
		mv.setViewName("modules/farm/addFarm");
		return mv;
	}
	
	/**
	 * 跳转到修改农场页面
	 * varro 2016-7-9
	 * @return
	 */
	@RequestMapping(value="/editFarmUrl")
	public ModelAndView editFarmUrl()throws Exception{
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		List<PageData> farmList=farmService.findFarm(pd);
		PageData farm=farmList.get(0);
		/***查询饲养方式***/
		pd.put("code_type", "FEED_METHOD");
		List<PageData> feedMethod= farmService.findCode(pd);
		
		/***查询饲养品种***/
		pd.put("code_type", "FEED_TYPE");
		List<PageData> feedType= farmService.findCode(pd);
		
		/******查询省份**********/
		pd.put("parent_id", 0);
		pd.put("level", 1);
		List<PageData> prlist= farmService.findAreaChina(pd);
		mv.addObject("pd",pd);
		mv.addObject("farmData",farm);
		mv.addObject("feedMethod",feedMethod);
		mv.addObject("feedType",feedType);
		mv.addObject("prlist",prlist);
		mv.setViewName("modules/farm/editFarm");
		return mv;
	}
	
	
	@RequestMapping("/getAreaChina")
	public void getAreaChina(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> prlist= farmService.findAreaChina(pd);
		j.setSuccess(true);
		j.setObj(prlist);
		super.writeJson(j, response);
	}
	
	@RequestMapping("/isFarmNameNull")
	public void isFarmNameNull(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> mcl = farmService.selectByCondition(pd);
		if(mcl!=null&&mcl.size()!=0){
			j.setMsg("1");//用户名已经存在
			j.setSuccess(true);
		}else{
			j.setMsg("2");// 用户名不存在
		}
		super.writeJson(j, response);
	}
	
	@RequestMapping("/isBatchNoNull")
	public void isBatchNoNull(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> mcl= farmService.selectBatchByCondition(pd);
		if(mcl!=null&&mcl.size()!=0){
			j.setMsg("1");//批次号已经存在
			j.setSuccess(true);
		}else{
			j.setMsg("2");// 批次号不存在
		}
		super.writeJson(j, response);
	}
	@RequestMapping("/isBatchHouseNull")
	public void isBatchHouseNull(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		PageData mcl= farmService.isBatchHouseNull(pd);
		if(mcl!=null&& mcl.getString("operation_type").equals("2")){
			j.setMsg("1");//该栋舍存在未出栏的批次
			j.setSuccess(true);
		}else{
			j.setMsg("2");// 
		}
		super.writeJson(j, response);
	}
	
	
	
	
	/**
	 * 保存批次
	 * @return
	 */
	@RequestMapping("/addBatch")
	public void addBatch(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = new PageData();
		pd = this.getPageData();
		pd.put("operation_type","2");
		pd.put("create_person",user.getId());
		pd.put("create_date", new Date());	
		pd.put("create_time", new Date());
		try {
			if(pd.get("count").equals("")){
				pd.put("count", null);
			}
			farmService.saveBatch(pd);
			j.setMsg("1");
			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	
	/**
	 * 保存
	 * @return
	 */
	@RequestMapping("/addFarm")
	public void addFarm(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = new PageData();
		pd = this.getPageData();
		
		pd.put("id",0);
		pd.put("freeze_status",0);
		pd.put("create_person",user.getId());
		pd.put("create_date", new Date());	
		pd.put("create_time", new Date());
		pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
		try {
			farmService.saveFarm(pd);
			pd.put("id",pd.getInteger("id"));
			pd.put("farm_code",pd.getInteger("id"));
			farmService.editFarm(pd);
			j.setMsg("1");
			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	/**
	 * 修改农场
	 * @return
	 */
	@RequestMapping("/editFarm")
	public void editFarm(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = new PageData();
		pd = this.getPageData();
		
		pd.put("freeze_status",0);
		pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
		try {
			farmService.editFarm(pd);
			j.setMsg("1");
			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	
	/**
	 * 删除农场
	 * @return
	 */
	@RequestMapping("/delFarm")
	public void delFarm(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = new PageData();
		pd = this.getPageData();
		
		pd.put("freeze_status",1);
		pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
		try {
			farmService.editFarm(pd);
			j.setMsg("删除成功！");
			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	/**
	 * 跳转到新增栋舍信息页面
	 * varro 2016-7-9
	 * @return
	 */
	@RequestMapping(value="/addHouseUrl")
	public ModelAndView addHouseUrl()throws Exception{
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		/***栋舍类型***/
		pd.put("code_type", "HOUSE_TYPE");
		List<PageData> houseType= farmService.findCode(pd);
		List<PageData> device= farmService.findDevice(pd);
		mv.addObject("pd",pd);
		mv.addObject("houseType",houseType);
		mv.addObject("device",device);
		mv.addObject("farmList",getFarmList());
		mv.setViewName("modules/farm/addHouse");
		return mv;
	}
	
	/**
	 * 跳转到修改栋舍信息页面
	 * varro 2016-7-9
	 * @return
	 */
	@RequestMapping(value="/editHouseUrl")
	public ModelAndView editHouseUrl()throws Exception{
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		
		List<PageData> houselist=farmService.findHouse(pd);
		PageData houselData=houselist.get(0);
		
		/***栋舍类型***/
		pd.put("code_type", "HOUSE_TYPE");
		List<PageData> houseType= farmService.findCode(pd);
		pd.put("house_id", pd.getString("id"));
		List<PageData> device= farmService.findDevice(pd);
		mv.addObject("pd",pd);
		mv.addObject("houselData",houselData);
		mv.addObject("houseType",houseType);
		mv.addObject("device",device);
		mv.addObject("farmList",getFarmList());
		mv.setViewName("modules/farm/editHouse");
		return mv;
	}
	
	
	/**
	 * 保存
	 * @return
	 */
	@RequestMapping("/addHouse")
	public void addHouse(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = new PageData();
		pd = this.getPageData();
		
		pd.put("id",0);
		pd.put("house_code","0");
		pd.put("freeze_status","0");
		pd.put("create_person",user.getId());
		pd.put("create_date", new Date());	
		pd.put("create_time", new Date());
		pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
		try {
			farmService.saveHouse(pd);
			int house_id=pd.getInteger("id");
			pd.put("id",house_id);
			pd.put("house_code",house_id);
			farmService.editHouse(pd);
			/**
			 * 新增栋舍警报
			 */
			for (int i = 0; i < 4; i++) {
				pd.put("house_id",pd.getInteger("id"));
				pd.put("alarm_type",i+1);
				farmService.saveHouseAlarm(pd);
			}
			/**
			 * 新增栋舍和设备关系
			 */
			if(!StringUtils.isBlank(pd.getString("deviceKey"))){
				String [] arr=pd.getString("deviceKey").split(",");
				for (int k = 0; k < arr.length; k++) {
					pd.put("main_id", arr[k]);	
					List<PageData> device= farmService.findDevice(pd);
					PageData da=device.get(0);
					pd.put("device_code", da.getString("device_code"));	
					pd.put("device_type", da.getString("device_type"));	
					pd.put("port_id", da.getString("port_id"));	
					pd.put("house_id", house_id);	
					farmService.saveDeviHouse(pd);
				}
			}
			j.setMsg("1");
			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	
		
	
	/**
	 * 修改栋舍
	 * @return
	 */
	@RequestMapping("/editHouse")
	public void editHouse(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = new PageData();
		pd = this.getPageData();
		
		pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
		try {
			farmService.editHouse(pd);
			/**
			 * 修改栋舍和设备关系
			 */
			pd.put("house_id", pd.getString("id"));
			pd.put("farm_id",pd.getString("farmId"));
			farmService.delDeviHouse(pd);
			if(!StringUtils.isBlank(pd.getString("deviceKey"))){
				String [] arr=pd.getString("deviceKey").split(",");
				for (int k = 0; k < arr.length; k++) {
					pd.put("main_id", arr[k]);	
					List<PageData> device= farmService.findDevice(pd);
					PageData da=device.get(0);
					pd.put("create_person",user.getId());
					pd.put("create_date", new Date());	
					pd.put("create_time", new Date());
					pd.put("device_code", da.getString("device_code"));	
					pd.put("device_type", da.getString("device_type"));	
					pd.put("port_id", da.getString("port_id"));	
					farmService.saveDeviHouse(pd);
				}
			}
			j.setMsg("1");
			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	
	@RequestMapping("/isHouseNameNull")
	public void isHouseNameNull(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> mcl= farmService.selectHouseById(pd);
		if(mcl!=null&&mcl.size()!=0){
			j.setMsg("1");//批次号已经存在
			j.setSuccess(true);
		}else{
			j.setMsg("2");// 批次号不存在
		}
		super.writeJson(j, response);
	}
	
	
	/**
	 * 删除栋舍
	 * @return
	 */
	@RequestMapping("/delHouse")
	public void delHouse(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = new PageData();
		pd = this.getPageData();
		pd.put("freeze_status",1);
		pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
		try {
			farmService.editHouse(pd);
			j.setMsg("删除成功！");
			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	
	
	/**
	 * 跳转到新增批次信息页面
	 * varro 2016-7-9
	 * @return
	 */
	@RequestMapping(value="/addBatchUrl")
	public ModelAndView addBatchUrl()throws Exception{
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		/***出入拦方式方式***/
//		pd.put("code_type", "OPERATION_TYPE");
//		List<PageData> operationType= farmService.findCode(pd);
		
		mv.addObject("pd",pd);
//		mv.addObject("operationType",operationType);
		mv.addObject("farmList",getFarmList());
		mv.addObject("houseList",getHouseList(pd));
		mv.setViewName("modules/farm/addBatch");
		return mv;
	}
	
	
	
	/**
	 * 跳转到修改批次信息页面
	 * varro 2016-7-9
	 * @return
	 */
	@RequestMapping(value="/editBatchUrl")
	public ModelAndView editBatchUrl()throws Exception{
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		Page page=new Page();
		page.setPd(pd);
		List<PageData> balist = farmService.findBatchlistPage(page);
		PageData batch=balist.get(0);
		/***出入拦方式方式***/
//		pd.put("code_type", "OPERATION_TYPE");
//		List<PageData> operationType= farmService.findCode(pd);
		
		mv.addObject("pd",pd);
		mv.addObject("batchData",batch);
		mv.addObject("farmList",getFarmList());
		mv.addObject("houseList",getHouseList(pd));
		mv.setViewName("modules/farm/editBatch");
		return mv;
	}
	/**
	 * 修改批次
	 * @return
	 */
	@RequestMapping("/editBatch")
	public void editBatch(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		PageData pd = new PageData();
		pd = this.getPageData();
		try {
			farmService.editBatch(pd);
			j.setMsg("1");
			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	
	/**
	 * 跳转到出栏信息页面
	 * varro 2016-7-9
	 * @return
	 */
	@RequestMapping(value="/laiBatchUrl")
	public ModelAndView laiBatchUrl()throws Exception{
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		Page page=new Page();
		page.setPd(pd);
		List<PageData> balist = farmService.findBatchlistPage(page);
		PageData batch=balist.get(0);
		mv.addObject("pd",pd);
		mv.addObject("batchData",batch);
		mv.addObject("farmList",getFarmList());
		mv.addObject("houseList",getHouseList(pd));
		mv.setViewName("modules/farm/laiBatch");
		return mv;
	}
	
	/**
	 * 批次出栏
	 * @return
	 */
	@RequestMapping("/laiBatch")
	public void laiBatch(HttpServletResponse response,HttpServletRequest request,HttpSession session) throws Exception{
		Json j=new Json();
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = new PageData();
		pd = this.getPageData();
		Page page=new Page();
		page.setPd(pd);
		List<PageData> balist = farmService.findBatchlistPage(page);
		PageData batch=balist.get(0);
		pd.put("house_code",batch.getString("house_code"));
		pd.put("house_name",batch.getString("house_name"));
		pd.put("farm_id",batch.getInteger("farm_id"));
		pd.put("batch_no",batch.getString("batch_no"));
		pd.put("operation_type","1");
		pd.put("create_person",user.getId());
		pd.put("create_date", new Date());	
		pd.put("create_time", new Date());
		try {
			if(pd.get("count").equals("")){
				pd.put("count", null);
			}
			farmService.saveBatch(pd);
			j.setMsg("1");
			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
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
