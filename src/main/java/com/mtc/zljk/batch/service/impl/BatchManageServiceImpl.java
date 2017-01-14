package com.mtc.zljk.batch.service.impl;

import com.mtc.zljk.batch.service.BatchManageService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by LeLe on 11/2/2016.
 * 批次管理服务类
 */
@Service
public class BatchManageServiceImpl implements BatchManageService {
    @SuppressWarnings("restriction")
    @Resource(name = "daoSupport")
    private DaoSupport dao;

    /**
     * 获取创建批次数据
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getCreateBatchData(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("BatchManageMapper.selectCreateBatchData", pd);
    }
    
    /**
     * 获取出栏日龄
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getOverBatchAge(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("BatchManageMapper.selectOverBatchAge", pd);
    }
    
    /**
     * 获取调出数量
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getBatchDataCount(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("BatchManageMapper.selectBatchDataCount", pd);
    }

    /**
     * 保存创建批次数据
     * @return
     * @throws Exception
     */
    public PageData saveCreateBatchData(PageData pd) throws Exception{
        PageData rt = new PageData();
        pd.put("batch_id",getBatchId(pd));
        pd.put("breed_days",getBreedDays(pd.getString("house_type")));
        pd.put("service_id","0");
        pd.put("operation_type","2");

        int i = 0;
        List<PageData> list = (List<PageData>) dao.findForList("BatchManageMapper.selectBatchId", pd);
        if(list.toArray().length == 1 && (Long)(list.get(0).get("num")) == 0){
            i = (Integer) dao.save("BatchManageMapper.deleteCreateBatchDataFromCurr", pd);
            i = (i == 0 || i ==1 )?1:0;
            i *= (Integer) dao.save("BatchManageMapper.insertCreateBatchDataToCurr", pd);
            i *= (Integer) dao.save("BatchManageMapper.insertCreateBatchDataToHis", pd);
            i *= (Integer) dao.save("BatchManageMapper.exec_SP_INIT_DAILY_REPORT", pd);
            if(i == 1){
                rt.put("result",true);
                rt.put("msg","新建批次成功！");
            } else{
                rt.put("result",false);
                rt.put("msg","未知错误，请联系管理员！");
            }
        } else{
            rt.put("result",false);
            rt.put("msg","重复批次号，请重新输入！");
        }
        return rt;
    }

    /**
     * 获取修改批次数据
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getEditBatchData(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("BatchManageMapper.selectEditBatchData", pd);
    }

    /**
     * 保存修改批次数据
     * @return
     * @throws Exception
     */
    public PageData saveEditBatchData(PageData pd) throws Exception{
        PageData rt= new PageData();
        PageData param = new PageData();
        //获取调出批次信息
        param.put("farm_id",pd.getString("farm_id"));
        param.put("house_code",pd.getString("house_code"));
        List<PageData> outList = (List<PageData>) dao.findForList("BatchManageMapper.selectBatchDataCount", param);

        //判断调出数量是否足够
        if(outList.get(0).getInteger("male_count") >= Integer.valueOf(pd.getString("male_count")) &&  outList.get(0).getInteger("female_count") >= Integer.valueOf(pd.getString("female_count"))){
            //获取调入批次信息
            param = new PageData();
            param.put("farm_id",pd.getString("farm_id"));
            param.put("house_code",pd.getString("house_code_target"));
            List<PageData> inList = (List<PageData>) dao.findForList("BatchManageMapper.selectCreateBatchData", param);

            if(outList.toArray().length == 1 && inList.toArray().length == 1){
                //初始化变量参数
                param = new PageData();
                param.putAll(pd);
                SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");//设置日期格式
                param.put("service_id",df.format(new Date()).toString());
                param.putAll(outList.get(0));
                param.put("batchId",outList.get(0).getString("batch_id"));
                param.put("batchId_target",inList.get(0).getString("batchId"));
                param.put("house_code_target",inList.get(0).getInteger("houseId").toString());
                param.put("house_name_target",inList.get(0).getString("house"));
                param.put("male_count",pd.getString("male_count"));
                param.put("female_count",pd.getString("female_count"));
                param.put("operation_date",pd.getString("operation_date"));
                param.put("bak",pd.getString("bak"));

                //修改批次数据入历史表
                int i = (Integer) dao.save("BatchManageMapper.insertEditBatchDataToHis", param);
                i = (i == 2)?1:0;

                //调出批次数据更新当前表
                try{
                    i *= (Integer) dao.update("BatchManageMapper.updateEditBatchDataToCurr", param);
                } catch (Exception e){
                    e.printStackTrace();
                }

                i = (i == 2)?1:0;
                if(1==i){
                    rt.put("result",true);
                    rt.put("msg","修改批次成功！");
                }
            } else{
                rt.put("result",false);
                rt.put("msg","批次数据异常，请联系管理员！");
            }

        } else{
            rt.put("result",false);
            rt.put("msg","调出数量超出存栏数量，请重新输入数量！");
        }

        return rt;
    }

    /**
     * 获取出栏批次数据
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getOverBatchData(PageData pd) throws Exception{
        return (List<PageData>) dao.findForList("BatchManageMapper.selectOverBatchData", pd);
    }

    /**
     * 保存出栏批次数据
     * @return
     * @throws Exception
     */
    public PageData saveOverBatchData(PageData pd) throws Exception{
        PageData rt = new PageData();
        pd.put("batch_id",getBatchId(pd));
        pd.put("service_id","0");

        List<PageData> outList = (List<PageData>) dao.findForList("BatchManageMapper.selectBatchDataCount", pd);

        //判断出栏数量是否足够
        int currMaleCount = outList.get(0).getInteger("male_count");
        int currFemaleCount = outList.get(0).getInteger("female_count");
        int maleCount = Integer.valueOf(pd.getString("male_count"));
        int femaleCount = Integer.valueOf(pd.getString("female_count"));
        int weed_out_total_count = Integer.valueOf(pd.getString("weed_out_total_count"));

        DecimalFormat dDf =new java.text.DecimalFormat("#.00");
        double maleWeight = Double.valueOf(dDf.format(Double.valueOf(pd.getString("male_weight"))));
        double femaleWeight = Double.valueOf(dDf.format(Double.valueOf(pd.getString("female_weight"))));
        double weed_out_total_weight = Double.valueOf(dDf.format(Double.valueOf(pd.getString("weed_out_total_weight"))));


        if( (currMaleCount + currFemaleCount) == (maleCount + femaleCount + weed_out_total_count)) {
                if((currMaleCount*maleWeight + currFemaleCount*femaleWeight) == (maleCount*maleWeight + femaleCount*femaleWeight + weed_out_total_weight)){
                    int i = 0;
                    i = (Integer) dao.save("BatchManageMapper.insertOverBatchDataToHis", pd);
                    i *= (Integer) dao.update("BatchManageMapper.updateOverBatchDataToCurr", pd);
                    if(i == 1){
                        rt.put("result",true);
                        rt.put("msg","出栏批次成功！");
                    } else{
                        rt.put("result",false);
                        rt.put("msg","未知错误，请联系管理员！");
                    }
                } else{
                    rt.put("result",false);
                    rt.put("msg","出栏重量及淘汰重量不等于存栏重量，请重新输入重量！");
                }
        } else{
            rt.put("result",false);
            rt.put("msg","出栏数量及淘汰数量不等于存栏数量，请重新输入数量！");
        }
        return rt;
    }

    /**
     * 获取预计饲养天数
     * @param houseType
     * @return
     */
    int getBreedDays(String houseType){
        return ("1".equals(houseType))?175:455;
    }

    /**
     * 生成批次ID
     * @param pd
     * @return
     */
    String getBatchId(PageData pd){
        return pd.getString("farm_id") + "-" + pd.getString("house_code") + "-" + pd.getString("batch_no");
    }

    public PageData selectBatchDataForMobile(PageData pd) throws Exception{
        return (PageData) dao.findForObject("BatchManageMapper.selectBatchDataForMobile", pd);
    }

}
