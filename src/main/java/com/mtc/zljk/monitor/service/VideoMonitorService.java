package com.mtc.zljk.monitor.service;

import com.mtc.zljk.util.common.PageData;
//import com.sun.tools.javac.util.List;
import java.util.List;

/**
 * Created by Ants on 2016/8/25.
 */
public interface VideoMonitorService {
    /**
	 * 按条件查询
	 * @param pd
	 * @return List<videoMonitor>
	 * @throws Exception
	 */
	List<PageData> selectByCondition(PageData pd) throws Exception;
}
