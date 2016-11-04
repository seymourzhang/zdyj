/**
 *
 * MTC-上海农汇信息科技有限公司
 * Copyright © 2015 农汇 版权所有
 */
package com.mtc.zljk.Alidayu.service;

import com.mtc.zljk.Alidayu.entity.SLDayuTtsLog;
import com.mtc.zljk.Alidayu.entity.mapper.SLDayuTtsLogMapper;
import com.mtc.zljk.Alidayu.entity.mapper.SLDayuTtsLogMapperCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * 
 * @author lx
 *
 */
@Service
public class SLAlidayuLogService {
	
	@Autowired
	private SLDayuTtsLogMapperCustom dayuTtsLogMapperCustom;
	
	@Autowired
	private SLDayuTtsLogMapper dayuTtsLogMapper;
	
	public int updateByBizId(SLDayuTtsLog record){
		return dayuTtsLogMapperCustom.updateByBizId(record);
	}

	public int insert(SLDayuTtsLog tts) {
		// TODO Auto-generated method stub
		return dayuTtsLogMapperCustom.insert(tts);
	}

	public SLDayuTtsLog getSLDayuTtsLogByBizId(String bizId) {
		// TODO Auto-generated method stub
		return dayuTtsLogMapper.selectByPrimaryKey(bizId);
	}
}









