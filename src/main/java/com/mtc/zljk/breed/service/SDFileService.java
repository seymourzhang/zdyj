package com.mtc.zljk.breed.service;

import com.mtc.zljk.util.common.PageData;

import java.util.List;

/**
 * Created by Seymour on 2016/11/2.
 */
public interface SDFileService {

    List<PageData> selectByStatus(PageData pd) throws Exception;

    int insert(PageData pd) throws Exception;

    int updateStatus(PageData pd) throws Exception;

    int updateDownloadNum(PageData pd) throws Exception;

}
