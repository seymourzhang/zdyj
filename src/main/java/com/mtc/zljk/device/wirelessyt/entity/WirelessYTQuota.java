package com.mtc.zljk.device.wirelessyt.entity;

import com.mtc.zljk.device.entity.DeviceQuota;

/**
 * 引通控制器指标类
 * Created by Raymon on 7/6/2016.
 */
public class WirelessYTQuota extends DeviceQuota {
    public long maketime ;

    public long getMaketime() {
        return maketime;
    }
    public void setMaketime(long maketime) {
        this.maketime = maketime;
    }
}
