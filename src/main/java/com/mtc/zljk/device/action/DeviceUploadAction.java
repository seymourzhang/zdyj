package com.mtc.zljk.device.action;

import com.mtc.zljk.device.service.impl.RotemNetDataServiceImpl;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.common.PubFun;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.HashMap;

/**
 * Created by Yin Guo Xiang on 2017/2/20.
 */
@Controller
@RequestMapping("/DeviceUploadActionMobile")
public class DeviceUploadAction {

    private static Logger mLogger = Logger.getLogger(DeviceUploadAction.class);
    @Autowired
    private RotemNetDataServiceImpl rotemNetDataServiceImpl;

    @RequestMapping("/rotemNetUpload")
    public void rotemNetUpload(HttpServletRequest request,
                               HttpServletResponse response) {
        mLogger.info("=====Now start executing DeviceUpload.rotemNetUpload");

        String dealRes = null;

        try {
            int columnLength = 50;
            boolean isNull = false;
            PageData tPageData = new PageData();

            for(int i = 1; i <= columnLength; i++ ){
                String paraName = PubFun.excelColIndexToStr(i);
                String paraCol = "";
                if(paraName.length()>1){
                    paraCol = paraName.substring(0, 1) + paraName.substring(1).toLowerCase();
                }else{
                    paraCol = paraName ;
                }
                String paraValue = request.getParameter(paraName);

                if(!StringUtils.isEmpty(paraValue)){
                    paraValue = URLDecoder.decode(paraValue,"UTF-8");
                    tPageData.put("col" + paraCol, paraValue);
                    isNull = true;
                }
                mLogger.info("excel." + paraName + "=" + paraValue);
            }
            if(isNull){
                HashMap<String, Object> mParas = new HashMap<String, Object>();
                tPageData.put("makeTime", new Date());
                rotemNetDataServiceImpl.insertRotemNet(tPageData);
                dealRes = "Success，数据已存储。";
            }else{
                dealRes = "请求无合法数据，请重新上传!";
            }

        } catch (Throwable e) {
            e.printStackTrace();
            dealRes = "服务程序错误，请联系管理员。";
        }
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=utf-8");
        try {
            mLogger.info("Result:" + dealRes);
            response.getWriter().write(dealRes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        mLogger.info("=====Now end executing DeviceUpload.rotemNetUpload");
    }
}
