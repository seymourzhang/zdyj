//package com.mtc.zljk.alarm.job;
//
//import com.mtc.zljk.alarm.service.AlarmPushService;
//import com.mtc.zljk.util.common.IPUtil;
//import org.apache.log4j.Logger;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import com.mtc.zljk.alarm.service.AlarmCurrService;
//
//@Component("alarmAutoRun")
//public class AutoRun {
//	private static Logger mLogger = Logger.getLogger(AutoRun.class);
//	@Autowired
//    AlarmPushService alarmPushService;
//
//    @Scheduled(cron="0/60 * * * * ? ") //每分钟执行一次
//    public void run() {
//		if(!IPUtil.needRunTask()){
//			mLogger.info("本机不启用alarmAutoRun");
//			return ;
//		}
//        alarmPushService.run();
//    }
//}
