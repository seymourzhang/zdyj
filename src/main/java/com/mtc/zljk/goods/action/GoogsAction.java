package com.mtc.zljk.goods.action;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.ehcache.pool.Size;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.mtc.zljk.goods.service.GoogsService;
import com.mtc.zljk.user.entity.SDUser;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Const;
import com.mtc.zljk.util.common.DateUtil;
import com.mtc.zljk.util.common.Json;
import com.mtc.zljk.util.common.Page;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.service.ModuleService;


@Controller
@RequestMapping("/googs")
public class GoogsAction extends BaseAction {
	
	@Autowired 
	private GoogsService googsService;
	
	@Autowired
	private ModuleService moduleService;
	
	@RequestMapping(value="/googsView")
	public ModelAndView googsView(Page page)throws Exception{
		ModelAndView mv = this.getModelAndView();
		mv.setViewName("modules/googs/googsView");
		PageData pd = new PageData();
		pd = this.getPageData();
		pd.put("code_type", "good_type");
		List<PageData> goodType= moduleService.service("codeServiceImpl", "getCodeList", new Object[]{pd});
		mv.addObject("goodType",goodType);
		
		PageData pd1 = new PageData();
		pd1.put("code_type", "unit");
		List<PageData> unit= moduleService.service("codeServiceImpl", "getCodeList", new Object[]{pd1});
		mv.addObject("unit",unit);
		
		PageData pd2 = new PageData();
		pd2.put("code_type", "spec");
		List<PageData> spec= moduleService.service("codeServiceImpl", "getCodeList", new Object[]{pd2});
		mv.addObject("spec",spec);

		List<PageData> farmList = getFarm();
		mv.addObject("farmList",farmList);
		if(farmList.size()>0){
			mv.addObject("farmId",farmList.get(0).get("id"));
			mv.addObject("farm",farmList.get(0).get("name_cn"));
		}

		mv.addObject("houseList",getHouse(farmList.get(0).getInteger("id")));
		mv.addObject("pd",pd);
		return mv;
		
	}
	
	@RequestMapping(value="/googsManage")
	public ModelAndView googsManage()throws Exception{
		ModelAndView mv = this.getModelAndView();
		mv.setViewName("modules/googs/googsManage");
		PageData pd = new PageData();
		pd = this.getPageData();

		List<PageData> farmList = getFarm();
//		mv.addObject("farmList",farmList);
		if(farmList.size()>0){
			mv.addObject("farmId",farmList.get(0).get("id"));
			mv.addObject("farm",farmList.get(0).get("name_cn"));
		}

//		mv.addObject("houseList",getHouse(farmList.get(0).getInteger("id")));
		mv.addObject("pd",pd);
		pd.put("code_type", "good_type");
		List<PageData> goodType= moduleService.service("codeServiceImpl", "getCodeList", new Object[]{pd});
		Json j = new Json();
		j.setObj(goodType);
		mv.addObject("goodTypeList",j.getObj());
		
		pd.put("code_type", "unit");
		List<PageData> unit= moduleService.service("codeServiceImpl", "getCodeList", new Object[]{pd});
		j.setObj(unit);
		mv.addObject("unit",j.getObj());
		
		pd.put("code_type", "spec");
		List<PageData> spec= moduleService.service("codeServiceImpl", "getCodeList", new Object[]{pd});
		j.setObj(spec);
		mv.addObject("spec",spec);
		
		List<PageData> corporation=googsService.getCorporation3(pd);
		j.setObj(corporation);
		mv.addObject("corporation",j.getObj());
		List<PageData> factory=googsService.getFactory3(pd);
		j.setObj(factory);
		mv.addObject("factory",j.getObj());
		List<PageData> goods=googsService.getGoodsList(pd);
		j.setObj(goods);
		mv.addObject("goods",j.getObj());
		
		return mv;
		
	}
	
	@RequestMapping("/getGoods")
	public void getGoods(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> goodsList = googsService.getGoodsList(pd);
		j.setSuccess(true);
		j.setObj(goodsList);
		super.writeJson(j, response);
	}
	
	@RequestMapping("/getGoods2")
	public void getGoods2(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> goodsList = googsService.getGoodsList2(pd);
		j.setSuccess(true);
		j.setObj(goodsList);
		super.writeJson(j, response);
	}
	
	@RequestMapping("/getGoodType")
	public void getGoodType(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		pd.put("code_type", "good_type");
		List<PageData> goodType= moduleService.service("codeServiceImpl", "getCodeList", new Object[]{pd});
		j.setSuccess(true);
		j.setObj(goodType);
		super.writeJson(j, response);
	}
	
	@RequestMapping("/getSpec")
	public void getSpec(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		pd.put("code_type", "spec");
		List<PageData> spec= moduleService.service("codeServiceImpl", "getCodeList", new Object[]{pd});
		j.setSuccess(true);
		j.setObj(spec);
		super.writeJson(j, response);
	}
	
	@RequestMapping("/getUnit")
	public void getUnit(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		pd.put("code_type", "unit");
		List<PageData> unit= moduleService.service("codeServiceImpl", "getCodeList", new Object[]{pd});
		j.setSuccess(true);
		j.setObj(unit);
		super.writeJson(j, response);
	}
	
	@RequestMapping("/getCorporationGood")
	public void getCorporationGood(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> goodsList = googsService.getCorporationGood(pd);
		j.setSuccess(true);
		j.setObj(goodsList);
		super.writeJson(j, response);
	}
	
	@RequestMapping("/getCorporation")
	public void getCorporation(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> corporation = googsService.getCorporation(pd);
		j.setSuccess(true);
		j.setObj(corporation);
		super.writeJson(j, response);
	}
	
	@RequestMapping("/getCorporation2")
	public void getCorporation2(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> corporation = googsService.getCorporation2(pd);
		j.setSuccess(true);
		j.setObj(corporation);
		super.writeJson(j, response);
	}
	
	@RequestMapping("/getFactory")
	public void getFactory(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> factory = googsService.getFactory(pd);
		j.setSuccess(true);
		j.setObj(factory);
		super.writeJson(j, response);
	}
	
	@RequestMapping("/getFactory2")
	public void getFactory2(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> factory = googsService.getFactory2(pd);
		j.setSuccess(true);
		j.setObj(factory);
		super.writeJson(j, response);
	}
	
	@RequestMapping("/inStock")
	public void inStock(HttpServletResponse response,HttpSession session) throws Exception{
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> goodsList = googsService.getGoodsList(pd);
		pd.put("id",0);
		pd.put("good_code", goodsList.get(0).getString("good_code"));
		pd.put("good_name", goodsList.get(0).getString("good_name"));
		pd.put("stock_batch_no", DateUtil.getDaysTime());
		pd.put("create_person",user.getId());
		pd.put("create_date", new Date());	
		pd.put("create_time", new Date());
		pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
		try {
			if("".equals(pd.getString("exp"))){
				pd.put("exp",null);
			}
			googsService.saveStock(pd);
			pd.put("stock_id",pd.getInteger("id"));
			pd.put("operation_kind",2);
			pd.put("farm_id",pd.getString("inStockFarmId"));
			pd.put("farm_name",pd.getString("inStockFarm"));
			pd.put("house_id",null);
			pd.put("house_name",null);
			googsService.saveStockcChange(pd);
			j.setMsg("1");
			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	
	@RequestMapping("/getStockChange")
	public void getStockChange(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> stockChange = googsService.getStockChange(pd);
		j.setSuccess(true);
		j.setObj(stockChange);
		super.writeJson(j, response);
	}
	
	@RequestMapping("/isAdjust")
	public void isAdjust(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> stockChange = googsService.getStockChange(pd);

		if(stockChange!=null&&stockChange.size()>0){
			j.setMsg("1");
			j.setSuccess(true);
		}else{
			j.setMsg("2");
		}
		super.writeJson(j, response);
	}
	
	
	
	@RequestMapping("/outStock")
	public void outStock(HttpServletResponse response,HttpSession session) throws Exception{
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		Json j=new Json();
		PageData pd = this.getPageData();
		
		//查询农场 栋舍
		pd.put("id", pd.getString("house_id"));
		List<PageData> house=moduleService.service("organServiceImpl", "getOrgListById", new Object[]{pd});
		
		PageData pd2=new PageData();
		pd2.put("id", house.get(0).getInteger("parent_id"));
		List<PageData> farm=moduleService.service("organServiceImpl", "getOrgListById", new Object[]{pd2});
		
		pd.put("flag",1);
		List<PageData> stock = googsService.getStock(pd);
		BigDecimal count=new BigDecimal(pd.getString("count"));
		BigDecimal num=googsService.getSumCount(pd);
		if(stock.size()==0 || count.compareTo(num)==1){
			j.setMsg("2");
		}else{
			for (PageData pageData : stock) {
				BigDecimal cc=pageData.getBigDecimal("count");
				pageData.put("approve_status",pd.getString("approve_status"));
				if(count.compareTo(cc)==1){//消耗量大于库存，第一条库存不够消耗
					count=count.subtract(cc);
					pageData.put("operation_date",pd.getString("operation_date"));
					pageData.put("modify_person",user.getId());
					pageData.put("modify_date", new Date());	
					pageData.put("modify_time", new Date());
					pageData.put("count", 0);
					int n=googsService.editStock(pageData);
					if(n!=0){
						pageData.put("create_person",user.getId());
						pageData.put("create_date", new Date());	
						pageData.put("create_time", new Date());
						pageData.put("stock_id",pageData.getInteger("id"));
						pageData.put("operation_kind",1);
						pageData.put("count",BigDecimal.valueOf(-1).multiply(cc));
						pageData.put("farm_id",farm.get(0).getInteger("id"));
						pageData.put("farm_name",farm.get(0).getString("name_cn"));
						pageData.put("house_id",house.get(0).getInteger("id"));
						pageData.put("house_name",house.get(0).getString("name_cn"));
						googsService.saveStockcChange(pageData);
					}
				}else{
					pageData.put("operation_date",pd.getString("operation_date"));
					pageData.put("modify_person",user.getId());
					pageData.put("modify_date", new Date());	
					pageData.put("modify_time", new Date());
					pageData.put("count", cc.subtract(count));
					int n=googsService.editStock(pageData);
					if(n!=0){
						pageData.put("create_person",user.getId());
						pageData.put("create_date", new Date());	
						pageData.put("create_time", new Date());
						pageData.put("stock_id",pageData.getInteger("id"));
						pageData.put("operation_kind",1);
						pageData.put("count",BigDecimal.valueOf(-1).multiply(count));
						pageData.put("farm_id",farm.get(0).getInteger("id"));
						pageData.put("farm_name",farm.get(0).getString("name_cn"));
						pageData.put("house_id",house.get(0).getInteger("id"));
						pageData.put("house_name",house.get(0).getString("name_cn"));
						googsService.saveStockcChange(pageData);
						break;
					}
				}
			}
			j.setMsg("1");
			j.setSuccess(true);
		}
		super.writeJson(j, response);
	}
	/**
	 * 获得库存信息
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/getStockSum")
	public void getStockSum(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		List<PageData> stockSum = googsService.getStockSum(pd);
		j.setSuccess(true);
		j.setObj(stockSum);
		super.writeJson(j, response);
	}
	
	/**
	 * 库存调整，插入库存变动表一条未审批的纪录
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/setStockSum")
	public void setStockSum(HttpServletResponse response,HttpSession session){
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		Json j=new Json();
		PageData pd = this.getPageData();
		try {
			List<PageData> stock = googsService.getStock(pd);
			String adjustValue =pd.getString("adjustValue");
			int count=Integer.valueOf(adjustValue);
			if(count>0){//调增，读取库存第一条数据，插入库存变动表
				PageData pd2=stock.get(0);
				pd2.putAll(pd);
				pd2.put("stock_id",stock.get(0).getInteger("id"));
				pd2.put("create_person",user.getId());
				pd2.put("create_date", new Date());	
				pd2.put("create_time", new Date());
				pd2.put("operation_date",new Date());
				pd2.put("modify_person",user.getId());
				pd2.put("modify_date", new Date());	
				pd2.put("modify_time", new Date());
				pd2.put("operation_kind",3);
				pd2.put("count",count);
				pd2.put("approve_status",1);
				googsService.saveStockcChange(pd2);
				googsService.updateRemindData(pd2);
			}else{
				BigDecimal number=new BigDecimal(count);
				for (PageData pageData : stock) {
					pageData.putAll(pd);
					BigDecimal cc=pageData.getBigDecimal("count");
					BigDecimal big_decimal=cc.add(number);
					int r=big_decimal.compareTo(BigDecimal.ZERO); //和0，Zero比较
					if(r==-1){
						number=cc.add(number);
						pageData.put("stock_id",pageData.getInteger("id"));
						pageData.put("create_person",user.getId());
						pageData.put("create_date", new Date());	
						pageData.put("create_time", new Date());
						pageData.put("operation_date",new Date());
						pageData.put("modify_person",user.getId());
						pageData.put("modify_date", new Date());	
						pageData.put("modify_time", new Date());
						pageData.put("operation_kind",3);
						pageData.put("count",BigDecimal.ZERO.subtract(cc));
						pageData.put("approve_status",1);
						googsService.saveStockcChange(pageData);
					}else{
						pageData.put("stock_id",pageData.getInteger("id"));
						pageData.put("create_person",user.getId());
						pageData.put("create_date", new Date());	
						pageData.put("create_time", new Date());
						pageData.put("operation_date",new Date());
						pageData.put("modify_person",user.getId());
						pageData.put("modify_date", new Date());	
						pageData.put("modify_time", new Date());
						pageData.put("operation_kind",3);
						pageData.put("count",number);
						pageData.put("approve_status",1);
						googsService.saveStockcChange(pageData);

					}
					googsService.updateRemindData(pageData);
				}
			}

			j.setSuccess(true);
			j.setMsg("1");
		} catch (Exception e) {
			e.printStackTrace();
		}
		super.writeJson(j, response);
	}
	
	/**
	 * 新增供应商
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/addCorporation")
	public void addCorporation(HttpServletResponse response,HttpSession session){
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		Json j=new Json();
		PageData pd = this.getPageData();
		try {
			List<PageData> stock = googsService.getCorporation2(pd);
			if(stock.size()>0){
				j.setMsg("0");
			}else{
				pd.put("create_person",user.getId());
				pd.put("create_date", new Date());	
				pd.put("create_time", new Date());
				pd.put("modify_person",user.getId());
				pd.put("modify_date", new Date());	
				pd.put("modify_time", new Date());
				googsService.saveCorporation(pd);
				List<PageData> mcl = googsService.getCorporation(pd);
				j.setMsg("1");
				j.setObj(mcl);	
			}

			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		super.writeJson(j, response);
	}
	
	/**
	 * 新增厂家
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/addFactory")
	public void addFactory(HttpServletResponse response,HttpSession session){
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		Json j=new Json();
		PageData pd = this.getPageData();
		try {
			List<PageData> stock = googsService.getFactory2(pd);
			if(stock.size()>0){
				j.setMsg("0");
			}else{
				pd.put("create_person",user.getId());
				pd.put("create_date", new Date());	
				pd.put("create_time", new Date());
				pd.put("modify_person",user.getId());
				pd.put("modify_date", new Date());	
				pd.put("modify_time", new Date());
				googsService.saveFactory(pd);
				List<PageData> mcl = googsService.getFactory(pd);
				j.setMsg("1");
				j.setObj(mcl);	
			}

			j.setSuccess(true);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		super.writeJson(j, response);
	}
	
	/**
	 * 新增物资
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/addGoods")
	public void addGoods(HttpServletResponse response,HttpSession session){
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		Json j=new Json();
		PageData pd = this.getPageData();
//		String[] corporation = pd.get("corporation").toString().split(",");
//		pd.put("corporation_id", corporation[0]);
//		String[] factory = pd.get("factory").toString().split(",");
//		pd.put("factory_id", factory[0]);
		try {
			List<PageData> stock = googsService.getGoodsList(pd);
			if(stock.size()>0){
				j.setMsg("0");
			}else{
				pd.put("create_person",user.getId());
				pd.put("create_date", new Date());	
				pd.put("create_time", new Date());
				pd.put("modify_person",user.getId());
				pd.put("modify_date", new Date());	
				pd.put("modify_time", new Date());
				googsService.saveGoods(pd);
//				List<PageData> stock2 = googsService.getGoodsList(pd);
//				pd.put("good_id", stock2.get(0).get("good_id"));
//				pd.put("corporation_name", corporation[1]);
//				pd.put("factory_name", factory[1]);
//				pd.put("bak", null);
//				List<PageData> stock3 = googsService.getGoodsList2(pd);
//				if(!(stock3.size()>0)){
//				googsService.saveCorporationGoods(pd);
//				}
				List<PageData> mcl = googsService.getGoodsList(null);
				j.setMsg("1");
				j.setObj(mcl);
			}

			j.setSuccess(true);
			
		} catch (Exception e) {
			j.setMsg("0");
			e.printStackTrace();
		}
		super.writeJson(j, response);
	}
	
	/**
	 * 新增物资关系
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/addCorporationGood")
	public void addCorporationGood(HttpServletResponse response,HttpSession session){
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		Json j=new Json();
		PageData pd = this.getPageData();
		String[] corporation = pd.get("corporation").toString().split(",");
		pd.put("corporation_id", corporation[0]);
		String[] factory = pd.get("factory").toString().split(",");
		pd.put("factory_id", factory[0]);
		String[] goods = pd.get("goods").toString().split(",");
		pd.put("good_id", goods[0]);
		try {
			List<PageData> stock = googsService.getCorporationGood(pd);
			if(stock.size()>0){
				j.setMsg("0");
			}else{
				pd.put("create_person",user.getId());
				pd.put("create_date", new Date());	
				pd.put("create_time", new Date());
				pd.put("modify_person",user.getId());
				pd.put("modify_date", new Date());	
				pd.put("modify_time", new Date());
				pd.put("corporation_name", corporation[1]);
				pd.put("factory_name", factory[1]);
				pd.put("good_name", goods[1]);
				googsService.saveCorporationGoods(pd);
				List<PageData> mcl = googsService.getCorporationGood(null);
				j.setMsg("1");
				j.setObj(mcl);
			}

			j.setSuccess(true);
			
		} catch (Exception e) {
			j.setMsg("0");
			e.printStackTrace();
		}
		super.writeJson(j, response);
	}
	
	/**
	 * 修改供应商
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/updateCorporation")
	public void updateCorporation(HttpServletResponse response,HttpSession session) throws Exception{
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		Json j=new Json();
		PageData pd = this.getPageData();
        try{
        pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
	    googsService.editCorporation(pd);
	    googsService.editCorporationGood(pd);
	    List<PageData> mcl = googsService.getCorporation(null);
		j.setMsg("1");
		j.setObj(mcl);
        
		
	} catch (Exception e) {
		j.setMsg("0");
		e.printStackTrace();
	}
//        List<PageData> mc = googsService.getCorporation2(null);
		super.writeJson(j, response);
	}
	
	/**
	 * 修改厂家
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/updateFactory")
	public void updateFactory(HttpServletResponse response,HttpSession session) throws Exception{
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		Json j=new Json();
		PageData pd = this.getPageData();
        try{    
        pd.put("factory_id", pd.get("factory_id"));
        pd.put("factory_name", pd.get("factory_name"));
        pd.put("factory_person", pd.get("factory_person"));
        pd.put("factory_address", pd.get("factory_address"));
        pd.put("telphone", pd.get("telphone"));
        pd.put("bak", pd.get("bak"));
        pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
	    googsService.editFactory(pd);
	    googsService.editCorporationGood(pd);
	    List<PageData> mcl = googsService.getFactory(null);
		j.setMsg("1");
		j.setObj(mcl);
        
		
	} catch (Exception e) {
		j.setMsg("0");
		e.printStackTrace();
	}
//        List<PageData> mc = googsService.getCorporation2(null);
		super.writeJson(j, response);
	}
	
	/**
	 * 修改物资
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/updateGoods")
	public void updateGoods(HttpServletResponse response,HttpSession session) throws Exception{
		SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
		Json j=new Json();
		PageData pd = this.getPageData();
        try{
        pd.put("good_id", pd.get("good_id"));
        pd.put("good_code", pd.get("good_code"));
        pd.put("good_name", pd.get("good_name"));
        pd.put("bak", pd.get("bak"));
        pd.put("modify_person",user.getId());
		pd.put("modify_date", new Date());	
		pd.put("modify_time", new Date());
	    googsService.editGoods(pd);
	    googsService.editCorporationGood(pd);
	    List<PageData> mcl = googsService.getGoodsList(null);
		j.setMsg("1");
		j.setObj(mcl);  
		
	} catch (Exception e) {
		j.setMsg("0");
		e.printStackTrace();
	}
//        List<PageData> mc = googsService.getCorporation2(null);
		super.writeJson(j, response);
	}
	
	
	/**
	 * 获取农场信息
	 * @return 数据列表
     */
	List<PageData> getFarm() throws Exception {
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		SDUser user=(SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = this.getPageData();
		pd.put("user_id", user.getId());
		List<PageData> orglist=moduleService.service("organServiceImpl", "getFarmByUserId", new Object[]{pd});//farmService.selectAll();
		int count=0;
		List<PageData> list=new ArrayList<PageData>();
		if(orglist!=null&&orglist.size()!=0){
//			count=orglist.get(orglist.size()-1).getInteger("org_level_id");
			for (PageData pageData : orglist) {
//				if((count-1)==pageData.getInteger("org_level_id")){
					PageData paData=new PageData();
					paData.put("id", pageData.getInteger("org_id"));
					paData.put("organization_id", pageData.getInteger("org_code"));
					paData.put("name_cn", pageData.getString("org_name"));
					paData.put("parent_id", pageData.getInteger("org_parent_id"));
					paData.put("level_id", pageData.getInteger("org_level_id"));
//					paData.put("level_name", pageData.getString("level_name"));
					list.add(paData);
//				}
			}
		}
		return list;
	}
	

	/**
	 * 获取栋舍信息
	 * @return 数据列表
     */
	List<PageData> getHouse(Integer farmId) throws Exception {
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		SDUser user=(SDUser)session.getAttribute(Const.SESSION_USER);
		PageData pd = this.getPageData();
		pd.put("user_id", user.getId());
		pd.put("parent_id",farmId);
		List<PageData> orglist=moduleService.service("organServiceImpl", "getOrgList", new Object[]{pd});//farmService.selectAll();
		int count=0;
		List<PageData> list=new ArrayList<PageData>();
		if(orglist!=null&&orglist.size()!=0){
			count=orglist.get(orglist.size()-1).getInteger("level_id");
			for (PageData pageData : orglist) {
				if(count==pageData.getInteger("level_id")){
					PageData paData=new PageData();
					paData.put("id", pageData.getInteger("id"));
					paData.put("organization_id", pageData.getInteger("organization_id"));
					paData.put("name_cn", pageData.getString("name_cn"));
					paData.put("parent_id", pageData.getInteger("parent_id"));
					paData.put("level_id", pageData.getInteger("level_id"));
					paData.put("level_name", pageData.getString("level_name"));
					list.add(paData);
				}
			}
		}
		
		return list;
	}

	/**
	 * 获得库存调整待审批信息
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/getStockApproval")
	public void getStockApproval(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		pd.put("currFlag",1);
		List<PageData> stockApprovalList = googsService.getStockApproval(pd);
		j.setSuccess(true);
		j.setObj(stockApprovalList);
		super.writeJson(j, response);
	}

    /**
     * 获得库存调整待审批信息
     * @param response
     * @throws Exception
     */
    @RequestMapping("/getStockApprovalChange")
    public void getStockApprovalChange(HttpServletResponse response) throws Exception{
        Json j=new Json();
        PageData pd = this.getPageData();
        pd.put("currFlag",null);
        List<PageData> stockApprovalList = googsService.getStockApproval(pd);
        j.setSuccess(true);
        j.setObj(stockApprovalList);
        super.writeJson(j, response);
    }

	/**
	 * 驳回审批
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/rejectStockChange")
	public void rejectStockChange(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		pd.put("approve_status",3);
		int result = googsService.approvalStockChange(pd);
		googsService.updateRemindData(pd);
		if(result == 1){
			j.setSuccess(true);
		} else{
			j.setSuccess(false);
		}
		super.writeJson(j, response);
	}


	/**
	 * 通过审批
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/approvalStockChange")
	public void approvalStockChange(HttpServletResponse response) throws Exception{
		Json j=new Json();
		PageData pd = this.getPageData();
		pd.put("approve_status",2);
		int result = googsService.approvalStockChange(pd);
		googsService.updateRemindData(pd);
		if(result == 1){
			j.setSuccess(true);
		} else{
			j.setSuccess(false);
		}
		super.writeJson(j, response);
	}
}
