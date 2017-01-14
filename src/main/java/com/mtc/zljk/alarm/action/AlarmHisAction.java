package com.mtc.zljk.alarm.action;

import com.mtc.zljk.alarm.service.AlarmHisService;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Constants;
import com.mtc.zljk.util.common.DealSuccOrFail;
import com.mtc.zljk.util.common.Json;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.service.ModuleService;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Date;
import java.util.List;

/**
 * @ClassName: AlarmHisAction
 * @Date 2016-12-26
 * @author yoven
 * 报警历史
 */

@Controller
@RequestMapping("/alarmHis")
public class AlarmHisAction extends BaseAction{
    @Autowired 
	private AlarmHisService alarmHisService;

	@RequestMapping("/showAlarmHis")
	public ModelAndView showAlarmHis() throws Exception {
		ModelAndView mv = this.getModelAndView();
		mv.setViewName("/modules/alarm/alarmHis");
		return mv;
	}
	
	@RequestMapping("/selectAlarmHisByCondition")
	public void selectAlarmHisByCondition(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Json j=new Json();
        PageData pd = new PageData();
        pd = this.getPageData();
        List<PageData> alarmHis = alarmHisService.selectAlarmHisByCondition(pd);
          j.setSuccess(true);
          j.setObj(alarmHis);
        super.writeJson(j, response);
	}
	
	@RequestMapping("/selectAlarmHisDetailByCondition")
	public void selectAlarmHisDetailByCondition(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Json j=new Json();
        PageData pd = new PageData();
        pd = this.getPageData();
        List<PageData> alarmHis = alarmHisService.selectAlarmHisDetailByCondition(pd);
          j.setSuccess(true);
          j.setObj(alarmHis);
        super.writeJson(j, response);
	}
	
	@RequestMapping("/selectHouseAlarmHisByCondition")
	public void selectHouseAlarmHisByCondition(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Json j=new Json();
        PageData pd = new PageData();
        pd = this.getPageData();
        List<PageData> alarmHis = alarmHisService.selectHouseAlarmHisByCondition(pd);
          j.setSuccess(true);
          j.setObj(alarmHis);
        super.writeJson(j, response);
	}
	
	@RequestMapping("/selectHouseAlarmHisDetailByCondition")
	public void selectHouseAlarmHisDetailByCondition(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Json j=new Json();
        PageData pd = new PageData();
        pd = this.getPageData();
        List<PageData> alarmHis = alarmHisService.selectHouseAlarmHisDetailByCondition(pd);
          j.setSuccess(true);
          j.setObj(alarmHis);
        super.writeJson(j, response);
	}
	
}
