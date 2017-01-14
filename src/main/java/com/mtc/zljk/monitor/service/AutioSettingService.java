package com.mtc.zljk.monitor.service;

import com.alibaba.fastjson.JSONObject;
import com.mtc.zljk.util.common.Page;
import com.mtc.zljk.util.common.PageData;

/**
 * Created by Seymour on 2017/1/11.
 */
public interface AutioSettingService {
    /***
     * 语音设置
     * @param pd
     * @return
     * @throws Exception
     */
    PageData saveInfo(PageData pd) throws Exception;

    /***
     * 语音设置查询
     * @param pd
     * @return
     * @throws Exception
     */
    PageData queryInfo(PageData pd) throws Exception;

}
