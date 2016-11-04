package com.mtc.zljk.product.service;

import com.mtc.zljk.util.common.PageData;

import java.util.List;

/**
 * Created by Seymour on 2016/10/24.
 */
public interface TaskService {
    /**
     * @return
     * @throws Exception
     */
    List<PageData> getTaskTypeName() throws Exception;

    /**
     *
     * @param pd
     * @return
     * @throws Exception
     */
    List<PageData> getTaskCodeName(PageData pd) throws Exception;

    /***
     *
     * @return
     * @throws Exception
     */
    List<PageData> getDateTypeName() throws Exception;
}
