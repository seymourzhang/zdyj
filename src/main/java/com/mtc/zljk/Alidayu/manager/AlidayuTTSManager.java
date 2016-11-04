/**
 *
 * MTC-上海农汇信息科技有限公司
 * Copyright © 2015 农汇 版权所有
 */
package com.mtc.zljk.Alidayu.manager;

import java.util.ArrayList;
import java.util.List;

import com.mtc.zljk.Alidayu.entity.SDTtsTempParam;
import com.mtc.zljk.Alidayu.entity.SDTtsTemplate;
import com.mtc.zljk.Alidayu.service.SDTTSTemplateParamService;
import com.mtc.zljk.Alidayu.service.SDTTSTemplateService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;




@Component
public class AlidayuTTSManager {
	
	private static Logger mLogger =Logger.getLogger(AlidayuTTSManager.class);
	
	@Autowired
	private SDTTSTemplateService templateService;
	
	@Autowired
	private SDTTSTemplateParamService paramService;

	
	
	public SDTtsTemplate getSDTtsTemplate(String tempId){
		return templateService.getSDTtsTemplate(tempId);
	}
	
	public List<SDTtsTempParam> getTTSTempParams(String tempId){
		List<SDTtsTempParam> temps = paramService.getTTSTempParams(tempId);
		if(temps == null){
			return new ArrayList<SDTtsTempParam>();
		}
		return temps;
	}
}

















