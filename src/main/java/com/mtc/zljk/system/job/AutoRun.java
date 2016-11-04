package com.mtc.zljk.system.job;

import com.mtc.zljk.system.service.ProcedureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * 自动运行作业类
 * Created by Raymon on 7/8/2016.
 */
@Component("systemAutoRun")
public class AutoRun {

    @Autowired
    ProcedureService procedureService;

    @Scheduled(cron="0 0/60 * * * ? ") //每小时执行一次
    public void runForHour() {
        procedureService.runForHour();
    }
    @Scheduled(cron="0 30 0 * * ?") //每日执行一次
    public void runForDay() {
        procedureService.runForDay();
    }
}
