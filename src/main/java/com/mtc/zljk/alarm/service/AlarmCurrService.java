package com.mtc.zljk.alarm.service;

import java.util.List;

import com.mtc.zljk.util.common.PageData;

public interface AlarmCurrService {
	    /**
	     * 查询全部
	     * @return List<AlarmCurr>
	     * @throws Exception
	     */
		List<PageData> selectAll() throws Exception;
	    
		/**
		 * 按条件查询
		 * @param pd
		 * @return List<AlarmCurr>
		 * @throws Exception
		 */
		List<PageData> selectByCondition(PageData pd) throws Exception;

		/**
		 * 运行定时任务
		 * @throws Exception
	     */
		void run() ;
		
		public int updateAlarm(PageData pd) throws Exception;
		
		
}
