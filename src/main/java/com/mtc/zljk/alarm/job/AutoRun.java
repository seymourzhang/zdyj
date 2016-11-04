package com.mtc.zljk.alarm.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.mtc.zljk.alarm.service.AlarmCurrService;

@Component("alarmAutoRun")
public class AutoRun {
	@Autowired
	AlarmCurrService alarmCurrService;

    @Scheduled(cron="0/60 * * * * ? ") //每分钟执行一次
    public void run() {
        alarmCurrService.run();
    }
}
