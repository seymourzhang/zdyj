package com.mtc.zljk.device.service;

import com.mtc.zljk.util.common.PageData;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Seymour on 2017/2/22.
 */
public interface RotemDataService {
    List<PageData> selectRotemData() throws Exception;
}
