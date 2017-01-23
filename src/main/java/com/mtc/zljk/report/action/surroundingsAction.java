package com.mtc.zljk.report.action;

import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by LeLe on 1/20/2017.
 */
@Controller
@RequestMapping("/surroundingsReport")
public class surroundingsAction extends BaseAction {
    @RequestMapping("/showSurroundingsReport")
    public ModelAndView showSurroundingsReport() throws Exception {
        PageData pd = new PageData();
        pd = this.getPageData();
        pd.put("user_id", getUserId());
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("modules/report/surroundingsReport");
        mv.addObject("pd",pd);
        return mv;
    }
}
