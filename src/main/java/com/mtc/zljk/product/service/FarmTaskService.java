package com.mtc.zljk.product.service;

import com.mtc.zljk.util.common.PageData;
import jdk.nashorn.internal.runtime.ECMAException;

import java.util.List;

/**
 * Created by Seymour on 2016/10/24.
 */
public interface FarmTaskService {

    /***
     * 插入
     * @param pd
     * @throws Exception
     */
    void insert(PageData pd) throws Exception;

    /***
     * 根据userId和status查询
     * @param pd
     * @return
     * @throws Exception
     */
    List<PageData> selectByUserIdOrStatus(PageData pd) throws Exception;

    /***
     * 物理删除任务
     * @Param pd
     * @throws Exception
     */
    int updateTaskStatus(PageData pd) throws Exception;
}
