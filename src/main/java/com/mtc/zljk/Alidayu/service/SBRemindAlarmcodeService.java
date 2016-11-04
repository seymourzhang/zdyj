/**
 *
 * MTC-上海农汇信息科技有限公司
 * Copyright © 2015 农汇 版权所有
 */
package com.mtc.zljk.Alidayu.service;

import java.util.List;

import com.mtc.zljk.Alidayu.entity.SBRemindAlarmcode;
import com.mtc.zljk.Alidayu.entity.mapper.SBRemindAlarmcodeMapperCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 
 * @author lx
 *
 */
@Service
public class SBRemindAlarmcodeService {
	
	
	@Autowired
	private SBRemindAlarmcodeMapperCustom alarmcodeMapperCustom;

	public int insertBatch(List<SBRemindAlarmcode> list){
		return alarmcodeMapperCustom.insertBatch(list);
	}

	public int deleteByFarmHouseType(int farmId,int houseId,int type) {
		// TODO Auto-generated method stub
		return alarmcodeMapperCustom.deleteByFarmHouseType(farmId,houseId,type);
	}
	
}









