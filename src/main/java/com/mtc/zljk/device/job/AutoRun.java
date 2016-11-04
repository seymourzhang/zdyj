package com.mtc.zljk.device.job;

import com.mtc.zljk.device.dmr.service.DmrService;
import com.mtc.zljk.device.rotem.service.RotemService;
import com.mtc.zljk.device.yingtong.service.YingtongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * 自动运行作业类
 * Created by Raymon on 7/7/2016.
 */
@Component("deviceAutoRun")
public class AutoRun {

    @Autowired
    DmrService dmrService;
    @Autowired
    RotemService rotemService;
    @Autowired
    YingtongService yingtongService;

    @Scheduled(cron="0/60 * * * * ? ") //每60秒执行一次
    public void run() {
//        System.out.println("更新Rotem数据至数据库...");
//        rotemService.writeData(rotemService.getData());
//        System.out.println("更新Rotem数据完毕！");
//
        System.out.println("更新大牧人数据至数据库...");
        dmrService.start();
        System.out.println("更新大牧人数据完毕！");
//
        System.out.println("更新引通数据至数据库...");
        yingtongService.start();
        System.out.println("更新引通数据完毕！");
    }
}
