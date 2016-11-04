/**
 *
 * MTC-上海农汇信息科技有限公司
 * Copyright © 2015 农汇 版权所有
 */
package com.mtc.zljk.Alidayu.service;

import java.util.List;

import com.mtc.zljk.Alidayu.entity.SBCallAlarm;
import com.mtc.zljk.Alidayu.entity.mapper.SBCallAlarmMapper;
import com.mtc.zljk.Alidayu.entity.mapper.SBCallAlarmMapperCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 
 * @author lx
 *
 */
@Service
public class SBCallAlarmService {
	
	@Autowired
	private SBCallAlarmMapper alarmMapper;
	@Autowired
	private SBCallAlarmMapperCustom alarmMapperCustom;
	
	public List<SBCallAlarm> getSBCallAlarmByMainId(int mainId){
		return alarmMapperCustom.getSBCallAlarmByMainId(mainId);
	}

	public int insertCallAlarmBatch(List<SBCallAlarm> callAlarms) {
		// TODO Auto-generated method stub
		return alarmMapperCustom.insertCallAlarmBatch(callAlarms);
	}
}









