package com.mtc.zljk.user.service;

import com.mtc.zljk.util.common.PageData;

/**
 * Created by Seymour on 2016/11/18.
 */
public interface SBUserImeiService {

    int insert(PageData pd) throws Exception;

    int insertLog(PageData pd) throws Exception;
}
