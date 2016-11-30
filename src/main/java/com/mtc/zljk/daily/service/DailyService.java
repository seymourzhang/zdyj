package com.mtc.zljk.daily.service;

import com.mtc.zljk.util.common.PageData;
import org.json.JSONObject;

/**
 * Created by Seymour on 2016/11/30.
 */
public interface DailyService {
    int dailySave(PageData pd) throws Exception;
}
