/**
 *
 * MTC-上海农汇信息科技有限公司
 * Copyright © 2015 农汇 版权所有
 */
package com.mtc.zljk.Alidayu.manager;

import java.util.ArrayList;
import java.util.List;

import com.mtc.zljk.Alidayu.entity.SLDayuTtsLog;
import com.mtc.zljk.Alidayu.service.SLAlidayuLogService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AlidayuLogManager {
	
	private static Logger mLogger =Logger.getLogger(AlidayuLogManager.class);
	
	@Autowired
	private SLAlidayuLogService logService;

	public int updateByBizId(SLDayuTtsLog tts) {
		// TODO Auto-generated method stub
		return logService.updateByBizId(tts);
	}

	public int insert(SLDayuTtsLog tts) {
		// TODO Auto-generated method stub
		return logService.insert(tts);
	}

	public SLDayuTtsLog getSLDayuTtsLogByBizId(String bizId) {
		// TODO Auto-generated method stub
		return logService.getSLDayuTtsLogByBizId(bizId);
	}
	
}

















