package com.mtc.zljk.Alidayu.job;

import com.mtc.zljk.Alidayu.service.SLAlidayuTMCService;
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
    private static Logger mLogger = Logger.getLogger(CallAlarmerExecuteJob.class);
    @Autowired
    CallAlarmerExecuteJob caej;

    @Autowired
    RemindInfoFiltrateExecuteJob rifej;

    @Autowired
    SLAlidayuTMCService slAlidayuTMCService;

    @Scheduled(cron="0/60 * * * * ? ") //每5分钟执行一次
    public void run() {
        rifej.doGetRemindAlarms();
        mLogger.info("从报警提醒表(当前表)结合农场报警设置，获取符合规则的提醒记录，计入语音报警模块，供报警提醒处理服务处理！");

        mLogger.info("开始出来打电话处理逻辑！");
        caej.doCallAlarmers();
        /*try {
            slAlidayuTMCService.afterPropertiesSet();
        }catch (Exception e){
            e.printStackTrace();
        }*/
    }

}
