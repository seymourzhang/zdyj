package com.mtc.zljk.batch.action;

import com.mtc.zljk.batch.service.BatchManageService;
import com.mtc.zljk.user.entity.SDUser;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Const;
import com.mtc.zljk.util.common.Json;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.service.ModuleService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by LeLe on 10/25/2016.
 * 批次管理控制类
 */
@Controller
@RequestMapping(value="/batch")
public class BatchManageAction extends BaseAction {
    @Autowired
    ModuleService moduleService;

    @Autowired
    BatchManageService batchManageService;

    /**
     * 跳转到批次管理页面
     * raymon 2016-10-18
     * @return
     */
    @RequestMapping(value="/batchManage")
    public ModelAndView batchManage()throws Exception{
        PageData pd = this.getPageData();
        pd.put("user_id", getUserId());
        //获取机构
        List<PageData> orgList = moduleService.service("organServiceImpl","getFarmByUserId",new Object[]{pd});
        pd.put("parent_id",orgList.get(0).get("org_id").toString());
        List<PageData> orgList2 = moduleService.service("organServiceImpl","getOrgListById",new Object[]{pd});
        pd.put("length", orgList2.size());
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("modules/batch/batchManage");
        mv.addObject("pd",pd);
        return mv;
    }

    /**
     * 获取创建批次数据
     * @param response
     */
    @RequestMapping(value="/getCreateBatchData")
    public void getCreateBatchData(HttpServletResponse response) throws Exception{
        Json j=new Json();
        //获取用户信息
        PageData pd = this.getPageData();
        pd.put("user_id", getUserId());

        //获取机构
        List<PageData> orgList = moduleService.service("organServiceImpl","getFarmByUserId",new Object[]{pd});
        pd.put("farm_id",orgList.get(0).get("org_id").toString());
        pd.put("farm_code",orgList.get(0).get("org_code").toString());
        pd.put("farm_name",orgList.get(0).getString("org_name"));
        pd.put("feed_type", orgList.get(0).get("feed_type"));
        //获取数据
        List<PageData> list = batchManageService.getCreateBatchData(pd);

        //返回前端数据
        j.setSuccess(true);
        j.setObj(list);
        j.setObj1(pd);
        super.writeJson(j, response);
    }

    /**
     * 保存创建批次数据
     * @param response
     * @throws Exception
     */
    @RequestMapping(value="/saveCreateBatchData")
    public void saveCreateBatchData(HttpServletResponse response) throws Exception{
        Json j=new Json();
        PageData pd = this.getPageData();
        pd.put("user_id", getUserId());

        //获取农场类型
        PageData tmp = new PageData();
        tmp.put("farmId", pd.getString("farm_id"));
        tmp.put("houseId", pd.getString("house_code"));
        List<PageData> houseList = moduleService.service("organServiceImpl","getHouseType", new Object[]{tmp});
        if(houseList.toArray().length == 1){
            pd.put("house_type", houseList.get(0).getString("house_type")) ;
        } else{
            j.setSuccess(false);
            j.setMsg("请检查栋舍类型");
        }

        j.setSuccess(false);
        j.setMsg("新建批次失败，请联系管理员！");
        PageData result = batchManageService.saveCreateBatchData(pd);
        Boolean flag = (Boolean)(result.get("result"));
        j.setSuccess(flag);
        j.setMsg(result.getString("msg"));
        super.writeJson(j, response);
    }


    /**
     * 获取修改批次数据
     * @param response
     */
    @RequestMapping(value="/getEditBatchData")
    public void getEditBatchData(HttpServletResponse response) throws Exception{
        Json j=new Json();
        //获取用户信息
        PageData pd = this.getPageData();
        pd.put("user_id", getUserId());

        //获取机构
        List<PageData> orgList = moduleService.service("organServiceImpl","getFarmByUserId",new Object[]{pd});
        pd.put("farm_id",orgList.get(0).get("org_id").toString());
        pd.put("farm_code",orgList.get(0).get("org_code").toString());
        pd.put("farm_name",orgList.get(0).getString("org_name"));

        //获取数据
        List<PageData> list = batchManageService.getEditBatchData(pd);

        //返回前端数据
        j.setSuccess(true);
        j.setObj(list);
        j.setObj1(pd);
        super.writeJson(j, response);
    }

    /**
     * 保存修改批次数据
     * @param response
     * @throws Exception
     */
    @RequestMapping(value="/saveEditBatchData")
    public void saveEditBatchData(HttpServletResponse response) throws Exception{
        Json j=new Json();
        PageData pd = this.getPageData();
        pd.put("user_id", getUserId());

        j.setSuccess(false);
        j.setMsg("修改批次失败，请联系管理员！");
        PageData result = batchManageService.saveEditBatchData(pd);
        Boolean flag = (Boolean)(result.get("result"));
        j.setSuccess(flag);
        j.setMsg(result.getString("msg"));
        super.writeJson(j, response);
    }

    /**
     * 获取出栏批次数据
     * @param response
     */
    @RequestMapping(value="/getOverBatchData")
    public void getOverBatchData(HttpServletResponse response) throws Exception{
        Json j=new Json();
        //获取用户信息
        PageData pd = this.getPageData();
        pd.put("user_id", getUserId());

        //获取机构
        List<PageData> orgList = moduleService.service("organServiceImpl","getFarmByUserId",new Object[]{pd});
        pd.put("farm_id",orgList.get(0).get("org_id").toString());
        pd.put("farm_code",orgList.get(0).get("org_code").toString());
        pd.put("farm_name",orgList.get(0).getString("org_name"));

        //获取数据
        List<PageData> list = batchManageService.getOverBatchData(pd);

        //返回前端数据
        j.setSuccess(true);
        j.setObj(list);
        j.setObj1(pd);
        super.writeJson(j, response);
    }

    /**
     * 保存出栏批次数据
     * @param response
     * @throws Exception
     */
    @RequestMapping(value="/saveOverBatchData")
    public void saveOverBatchData(HttpServletResponse response) throws Exception{
        Json j=new Json();
        PageData pd = this.getPageData();
        pd.put("user_id", getUserId());

        //获取农场类型
        PageData tmp = new PageData();
        tmp.put("farmId", pd.getString("farm_id"));
        tmp.put("houseId", pd.getString("house_code"));
        List<PageData> houseList = moduleService.service("organServiceImpl","getHouseType", new Object[]{tmp});
        if(houseList.toArray().length == 1){
            pd.put("house_type", houseList.get(0).getString("house_type")) ;
        } else{
            j.setSuccess(false);
            j.setMsg("请检查栋舍类型");
        }

        j.setSuccess(false);
        j.setMsg("批次出栏失败，请联系管理员！");
        PageData result = batchManageService.saveOverBatchData(pd);
        Boolean flag = (Boolean)(result.get("result"));
        j.setSuccess(flag);
        j.setMsg(result.getString("msg"));
        super.writeJson(j, response);
    }
    
    @RequestMapping(value="/getCount")
    public void getCount(HttpServletResponse response) throws Exception{
    	Json j=new Json();
    	PageData pd = this.getPageData();
        List<PageData> outList = batchManageService.getBatchDataCount(pd);
        j.setObj(outList);
        j.setSuccess(true);
        super.writeJson(j, response);
    }
    
    @RequestMapping(value="/getOverBatchAge")
    public void getOverBatchAge(HttpServletResponse response) throws Exception{
    	Json j=new Json();
    	PageData pd = this.getPageData();
        List<PageData> outList = batchManageService.getOverBatchAge(pd);
        pd.put("operation_date", "");
        List<PageData> outList2 = batchManageService.getOverBatchAge(pd);
        if(outList2.size()==0){
            j.setMsg("0");
        } else {
            j.setMsg("1");
        }
        j.setObj(outList);
        j.setSuccess(true);
        super.writeJson(j, response);
    }
}
