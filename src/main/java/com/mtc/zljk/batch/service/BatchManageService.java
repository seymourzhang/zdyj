package com.mtc.zljk.batch.service;

import com.mtc.zljk.util.common.PageData;

import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;

import java.util.List;

/**
 * Created by LeLe on 11/2/2016.
 * 批次管理服务接口
 */
public interface BatchManageService {
    /**
     * 获取创建批次数据
     * @return
     * @throws Exception
     */
    List<PageData> getCreateBatchData(PageData pd) throws Exception;
    
    /**
     * 获取出栏日龄
     * @param pd
     * @return
     * @throws Exception
     */
    List<PageData> getOverBatchAge(PageData pd) throws Exception;
    
    /**
     * 获取调出数量
     * @param pd
     * @return
     * @throws Exception
     */
    List<PageData> getBatchDataCount(PageData pd) throws Exception;

    /**
     * 保存创建批次数据
     * @return
     * @throws Exception
     */
    PageData saveCreateBatchData(PageData pd) throws Exception;

    /**
     * 获取修改批次数据
     * @param pd
     * @return
     * @throws Exception
     */
    List<PageData> getEditBatchData(PageData pd) throws Exception;

    /**
     * 保存修改批次数据
     * @return
     * @throws Exception
     */
    PageData saveEditBatchData(PageData pd) throws Exception;

    /**
     * 获取出栏批次数据
     * @param pd
     * @return
     * @throws Exception
     */
    List<PageData> getOverBatchData(PageData pd) throws Exception;

    /**
     * 保存出栏批次数据
     * @return
     * @throws Exception
     */
    PageData saveOverBatchData(PageData pd) throws Exception;

    /***
     *
     * 查询批次信息for mobile
     * @param pd
     * @return
     * @throws Exception
     */
    PageData selectBatchDataForMobile(PageData pd) throws Exception;


}
