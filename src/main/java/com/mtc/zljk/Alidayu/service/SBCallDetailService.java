/**
 *
 * MTC-上海农汇信息科技有限公司
 * Copyright © 2015 农汇 版权所有
 */
package com.mtc.zljk.Alidayu.service;

import java.util.List;

import com.mtc.zljk.Alidayu.entity.SBCallDetail;
import com.mtc.zljk.Alidayu.entity.mapper.SBCallDetailMapper;
import com.mtc.zljk.Alidayu.entity.mapper.SBCallDetailMapperCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * 
 * @author lx
 *
 */
@Service
public class SBCallDetailService {
	
	@Autowired
	private SBCallDetailMapper detailMapper;
	@Autowired
	private SBCallDetailMapperCustom detailMapperCustom;
	

	public int insertCallDetails(List<SBCallDetail> details) {
		// TODO Auto-generated method stub
		return detailMapperCustom.insertCallDetails(details);
	}


	public List<SBCallDetail> getSBCallDetail(int mainId) {
		// TODO Auto-generated method stub
		return detailMapperCustom.getSBCallDetail(mainId);
	}


	public int updateSBCallDetail(SBCallDetail detail) {
		// TODO Auto-generated method stub
		return detailMapperCustom.updateByPrimaryKey(detail);
	}


	public List<SBCallDetail> getSBCallDetailByCallResult(int mainId,
			String callResult) {
		// TODO Auto-generated method stub
		return detailMapperCustom.getSBCallDetailByCallResult(mainId,callResult);
	}
}









