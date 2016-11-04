package com.mtc.zljk.product.action;

import com.mtc.zljk.product.service.FarmTaskService;
import com.mtc.zljk.product.service.TaskService;
import com.mtc.zljk.user.entity.SDUser;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Const;
import com.mtc.zljk.util.common.Json;
import com.mtc.zljk.util.common.Page;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.service.OrganService;
import com.mtc.zljk.monitor.action.MonitorAction;

import com.sun.tools.internal.xjc.reader.xmlschema.bindinfo.BIConversion;
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

/**
 * Created by Seymour on 2016/10/18.
 */
@Controller
@RequestMapping("/product")
public class MissionRemindAction extends BaseAction{
    @Autowired
    private OrganService organService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private FarmTaskService farmTaskService;

    @RequestMapping("/missionRemindView")
    public ModelAndView missionRemindView(Page page, HttpSession session) throws Exception{
        ModelAndView mav = this.getModelAndView();
        PageData pd = new PageData();
        pd = this.getPageData();
        SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
        pd.put("user_id", user.getId());
        List<PageData> lpd = organService.selectOrgByUser(pd);
        List<PageData> tasks = getTasks(pd);
        JSONArray a = new JSONArray();
        for (PageData task : tasks) {
            a.put(task);
        }
        mav.addObject("org_name", lpd.get(0).get("name_cn").toString());
        mav.addObject("task_type", getTaskTypeName());
        mav.addObject("task_code", getTaskCodeName(pd));
        mav.addObject("date_type", getDateType());
        mav.addObject("tasks", a);
        mav.setViewName("modules/product/missionRemind");
        return mav;
    }

    @RequestMapping("/saveAdd")
    public void saveAdd(HttpServletResponse response, HttpSession session) throws Exception{
        Json j = new Json();
        PageData pd = this.getPageData();
        SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
        PageData pageData = new PageData();
        pageData.put("user_id", user.getId());
        List<PageData> lpd = organService.getFarmListByUserId(pageData);
        pageData.put("task_id", pd.get("taskCode"));
        List<PageData> code = getTaskCodeName(pageData);
        for(int i = 0; i < lpd.size(); ++i){
            PageData temp = new PageData();
            temp.put("farm_id", lpd.get(i).get("org_id"));
            temp.put("farm_name", lpd.get(i).get("org_name"));
            temp.put("task_id", pd.get("taskCode"));
            temp.put("task_name", code.get(0).get("task_name"));
            temp.put("task_type", pd.get("taskType"));
            temp.put("task_status", "Y");
            temp.put("week_age_type", "null");
            temp.put("date_type", pd.get("taskWD"));
            temp.put("date_values", pd.get("dateValues"));
            temp.put("week_group", pd.get("weeks"));
            temp.put("create_person", user.getId());
            temp.put("create_date", new Date());
            temp.put("create_time", new Date());
            temp.put("modify_person", user.getId());
            temp.put("modify_date", new Date());
            temp.put("modify_time", new Date());
            farmTaskService.insert(temp);
        }
        List<PageData> tasks = getTasks(pageData);
        j.setMsg("1");
        j.setObj(tasks);
        super.writeJson(j, response);
    }

    @RequestMapping("/deleteTask")
    public void deleteTask(HttpSession session, HttpServletResponse response) throws Exception{
        Json j = new Json();
        PageData pd = this.getPageData();
        SDUser user = (SDUser)session.getAttribute(Const.SESSION_USER);
        int num = farmTaskService.updateTaskStatus(pd);
        pd.put("user_id", user.getId());
        List<PageData> tasks = getTasks(pd);
        j.setObj(tasks);
        if (num <= 0) {
            j.setMsg("此次更新失败！");
        }else{
            j.setMsg("1");
        }
        super.writeJson(j, response);
    }

    @RequestMapping("/queryTask")
    public void queryTask(HttpSession session, HttpServletResponse response) throws Exception {
        Json j = new Json();
        PageData pd = this.getPageData();
        List<PageData> code = getTaskCodeName(pd);
        j.setMsg("1");
        j.setObj(code);
        super.writeJson(j, response);
    }


    public List<PageData> getTaskTypeName() throws Exception{
        return taskService.getTaskTypeName();
    }

    public List<PageData> getTaskCodeName(PageData pd) throws Exception{
        return taskService.getTaskCodeName(pd);
    }

    public List<PageData> getDateType() throws Exception{
        return taskService.getDateTypeName();
    }

    public List<PageData> getTasks(PageData pd) throws Exception{
        List<PageData> lpd = organService.getFarmListByUserId(pd);
        List temp = new ArrayList();
        for (PageData pageData : lpd) {
            temp.add(pageData.get("org_id").toString());
        }
        String farmIds = MonitorAction.listToString(temp);
        pd.put("farmIds", farmIds);
        List<PageData> tasks = farmTaskService.selectByUserIdOrStatus(pd);
        return tasks;
    }
}
