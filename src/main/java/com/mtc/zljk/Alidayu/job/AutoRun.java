package com.mtc.zljk.Alidayu.job;

import com.mtc.zljk.Alidayu.service.SLAlidayuTMCService;
import com.mtc.zljk.util.common.IPUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * 自动运行作业类
 * Created by Raymon on 7/8/2016.
 */
@Component("callAlarmerExcecuteJob")
public class AutoRun {
    private static Logger mLogger = Logger.getLogger(AutoRun.class);
    @Autowired
    CallAlarmerExecuteJob caej;

    @Autowired
    RemindInfoFiltrateExecuteJob rifej;

    @Autowired
    SLAlidayuTMCService slAlidayuTMCService;

    @Scheduled(cron="0/60 * * * * ? ") //每5分钟执行一次
    public void run() {
        if(!IPUtil.needRunTask()){
            mLogger.info("本机不启用Alidayu的服务");
            return ;
        }
        // 先生成语音提醒任务
        rifej.doGetRemindAlarms();

        // 再根据语音提醒任务实际拨打电话
        caej.doCallAlarmers();
    }
}
