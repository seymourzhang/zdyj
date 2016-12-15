package com.mtc.zljk.goods.job;

import com.mtc.zljk.batch.service.BatchManageService;
import com.mtc.zljk.goods.service.GoogsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component("batchAutoRun")
public class AutoRun {
    @Autowired
    GoogsService googsService;

    @Scheduled(cron="0 5 0 ? * *") //每天0点5分执行一次
    public void run() {
        try{
            googsService.execProc("exec_SP_DELETE_STOCK_REMIND");
        } catch (Exception e){
            e.printStackTrace();
        }

    }

}
