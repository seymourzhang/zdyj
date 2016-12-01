package com.mtc.zljk.daily.service;

import com.mtc.zljk.util.common.PageData;
import org.json.JSONObject;

import java.util.List;

/**
 * Created by Seymour on 2016/11/30.
 */
public interface DailyService {

    /***
     * 日报录入
     * @param pd
     * @return
     * @throws Exception
     */
    int dailySave(PageData pd) throws Exception;

    /***
     * 日报查询
     * @param pd
     * @return
     * @throws Exception
     */
    List<PageData> dailyQuery(PageData pd) throws Exception;

    /***
     * 根据指定日期查询
     * @param pd
     * @return
     * @throws Exception
     */
    PageData selectBySpecialDate(PageData pd) throws Exception;

    /***
     * 查询入栏日期和出栏日期
     * @param pd
     * @return
     * @throws Exception
     */
    PageData selectDate(PageData pd) throws Exception;
}
