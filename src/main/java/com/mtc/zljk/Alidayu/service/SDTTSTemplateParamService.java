/**
 *
 * MTC-上海农汇信息科技有限公司
 * Copyright © 2015 农汇 版权所有
 */
package com.mtc.zljk.Alidayu.service;

import java.util.List;

import com.mtc.zljk.Alidayu.entity.SDTtsTempParam;
import com.mtc.zljk.Alidayu.entity.mapper.SDTtsTempParamMapper;
import com.mtc.zljk.Alidayu.entity.mapper.SDTtsTempParamMapperCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * 
 * @author lx
 *
 */
@Service
public class SDTTSTemplateParamService {
	
	@Autowired
	private SDTtsTempParamMapper tempParamMapper;
	@Autowired
	private SDTtsTempParamMapperCustom paramMapperCustom;
	
	public List<SDTtsTempParam> getTTSTempParams(String tempId) {
		// TODO Auto-generated method stub
		return paramMapperCustom.getTTSTempParams(tempId);
	}
	
}









