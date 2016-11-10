package com.mtc.zljk.analyze.action;

import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Page;
import com.mtc.zljk.util.common.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by LeLe on 11/9/2016.
 * 分析报表控制类
 */
@Controller
@RequestMapping("/analyze")
public class AnalyzeReportAction extends BaseAction {

    @RequestMapping(value="/showGoods")
    public ModelAndView showGoods(Page page)throws Exception{
        PageData pd = new PageData();
        pd = this.getPageData();
        pd.put("user_id", getUserId());
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("modules/analyze/goods");
        mv.addObject("pd",pd);
        return mv;
    }

}
