package com.mtc.zljk.device.wirelessyt.task;

import com.mtc.zljk.device.wirelessyt.common.WirelessYTConstants;
import com.mtc.zljk.device.wirelessyt.entity.WirelessYTDevice;
import com.mtc.zljk.device.wirelessyt.entity.WirelessYTQuota;
import com.mtc.zljk.device.yingtong.common.ByteNumUtil;
import com.mtc.zljk.device.yingtong.common.CRC16_Modbus;
import com.mtc.zljk.device.yingtong.common.StringHexUtil;
import com.mtc.zljk.util.common.Const;
import com.mtc.zljk.util.common.DateUtil;
import com.mtc.zljk.util.common.Logger;
import com.mtc.zljk.util.common.PageData;
import org.apache.commons.lang3.StringUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Date;

/**
 * 引通控制器任务服务类
 * Created by GX on 11/22/2016.
 */

public class WirelessYTTask implements Runnable {

    private static Logger mLogger =Logger.getLogger(WirelessYTTask.class);

    // 引通无线设备明细数据（传感器）
    private static PageData rtPdDetail = new PageData();

    // 引通无线设备主数据（采集器）
    private static PageData rtPdMain = new PageData();

    private Socket socket = null;

    public void setSocket(Socket socket ){
        this.socket =socket;
    }

    public WirelessYTTask(){
    }

    @Override
    public void run() {
        try {
            String socketTaskName = Const.getSDF().format(new Date()) ;
            mLogger.info("WirelessYTTask("+socketTaskName+") start ,线程号====" + Thread.currentThread());

            int dataCount = 1;
            InputStream in = socket.getInputStream();
            ByteArrayOutputStream bo ;
            byte[] buffer = new byte[1024];
            int length = 0;
            while ((length=in.read(buffer))!=-1) {
                bo = new ByteArrayOutputStream();
                bo.write(buffer, 0, length);
                long longtime = System.currentTimeMillis();
                byte[] res = bo.toByteArray();

                mLogger.info(Const.getSDF().format(new Date(longtime))+"接收帧"+dataCount+"："+ StringHexUtil.bytes2HexString(res));

                byte[] response = dealDatas(res);

                if(response != null){
                    mLogger.info(Const.getSDF().format(new Date(longtime))+"确认帧"+dataCount+"："+ StringHexUtil.bytes2HexString(response));
                    OutputStream tOutputStream = socket.getOutputStream();
                    tOutputStream.write(response);
                    tOutputStream.flush();
                }

                mLogger.info("");
                dataCount++;
            }
            mLogger.info("WirelessYTTask("+socketTaskName+") end   ,线程号====" + Thread.currentThread());
        }catch (Exception e) {
            e.printStackTrace();
        }finally{
            if(socket != null){
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static void main(String [] aa){
        WirelessYTTask tWirelessYTTask = new WirelessYTTask();
        tWirelessYTTask.dealDatas(null);
    }

    private byte [] dealDatas(byte[] datas){
        byte [] returnData = null;
		/*
		String res = "5B3A295D"   // 起始符：4字节 ([:)])
				   + "840B"       // 帧类型：2字节 (b[15]:需确认 b[14]:确认帧 b[13]:保留  b[12-10]:版本号 b[9-8]:加密类型 b[7-0]:消息类型)
				   + "0040"       // 帧长度：2字节 (帧头+帧负荷长度)
				   + "000000001F260064"   // 序列号：8字节 (上行帧时填充 MagicMote 的唯一序列号。下行帧不填数据。)
				   + "0002"      // 帧序号：2字节 (帧号用于标识帧的唯一性。除确认帧外，每发送一帧数据，帧号应加 1。确认帧的帧号应该填入需确认帧的帧号。)
				   + "5C2A"      // 校验码：2字节 (包含整帧（帧头+帧负荷）crc 校验和，计算时本字段填充为 0。源码请参考"crc 计算"这一章节。)
				   + "05E6"      // 采集器序列号(2+8) 1510
				   + "0003108EF03A3E3E"
                    2 + 2  16比特short

					   + "05E7"      // 传感器编号(2+2) 1511
					   + "0001"
					   + "03E8"      // 温度(2+4) 1000
					   + "41B4CCCD"
					   + "07E1"      // 传感器状态(2+4)  2017
					   + "00000001"

				    2 + 2  16比特short

				   + "07D3"          // 供电状态(2+4)  2003
				   + "0004"
				   + "07D4"          // 电池电压  2004
				   + "41B4CCCD"
				   + "0640"          // 时间戳  1600
				   + "56695154";

				   消息类型：254
				   帧内容前4个字节，设置服务器参数，5
				   字符串：127.0.0.1:9876
				   0

                    4个字节，0-成功，其他不成功。

                   消息类型：253
				   帧内容前4个字节，设置服务器参数，5
				   字符串：127.0.0.1:9876
                   0
			*/
		/*
		String res = "5B3A295D880B00E60003108EF06F9DF4001AC3CB05E60003108EF06F9DF407E2FFC205E7000103E841A8CCCD07E10000000007E2FFB205E7000203E841A7333307E10000000007E2FFCA05E7000303E841A8CCCD07E10000000007E2FFB905E7000403E841AC000007E10000000007E2FFAD05E7000503E841A8CCCD07E10000000007E2FFBA05E7000603E841A8CCCD07E10000000007E2FFB505E7000103F2424ACCCD07E10000000007E2FFBC05E7000104104418600007E10000000007E2FFC605E7000104564224000007E10000000007E2FFB507D3000507D44083C1030640584FB91A";
//		res = "5B3A295D8805003D0003108EF06F9DDA0028227305E60003108EF06F9DDA07E00000008D07D80456312E3107D70F563030335230303143303153503741";
		datas = StringHexUtil.hexString2Bytes(res);
        */
        if(datas == null){
            mLogger.error("Error：数据为空。");
            return returnData;
        }
        mLogger.info("数据长度   = " + datas.length);
        if (datas.length<20) {
            mLogger.error("Error：数据长度小于20。");
            return returnData;
        }

        int datas_index = 0;
        // 起始符(4字节)
        if (datas[datas_index++] != WirelessYTConstants.HEADBYTE[0]
                || datas[datas_index++] != WirelessYTConstants.HEADBYTE[1]
                || datas[datas_index++] != WirelessYTConstants.HEADBYTE[2]
                || datas[datas_index++] != WirelessYTConstants.HEADBYTE[3]) {
            mLogger.error("Error：起始符有误。");
            return returnData;
        }
        // 帧类型(2字节)
        String messageStr1 = StringHexUtil.b2BS(datas[datas_index++]);
        boolean needreturn = messageStr1.substring(0, 1).equals("1");   // 是否需要应答帧
        String versionNo = messageStr1.substring(3, 6);
        String aesType = messageStr1.substring(6, 8);   //0-无加密  1-AES_128  2-AES_196   3-AES_256
        byte messageType = datas[datas_index++]; // 1-主动上报数据   2-设备信息查询   3-时间同步

        // 数据长度(2字节)
        byte [] temp1 = {(byte)0,(byte)0,datas[datas_index++],datas[datas_index++]};
        if(ByteNumUtil.bytesToInt(temp1) != datas.length){
            mLogger.error("Error：数据标识长度与实际长度不符。");
            return returnData;
        }

        // 设备序列号(8字节)
        byte [] temp2 = {datas[datas_index++],datas[datas_index++],datas[datas_index++],datas[datas_index++],
                datas[datas_index++],datas[datas_index++],datas[datas_index++],datas[datas_index++]};
        String deviceSN = StringHexUtil.bytes2HexString(temp2);
        long deviceSN_long = ByteNumUtil.bytes2Long(temp2);
        mLogger.info("序列号："+ deviceSN);

        // 帧号(2字节)
        byte [] temp3 = {(byte)0,(byte)0,datas[datas_index++],datas[datas_index++]};
        String dataSN = StringHexUtil.bytes2HexString(temp3);
        mLogger.info("帧号："+ dataSN);

        // 数据CRC校验码(2字节)
        byte [] tempCRC = {(byte)0,(byte)0,datas[datas_index++],datas[datas_index++]};

        byte [] temp4 = datas.clone();
        temp4[18] = 0;
        temp4[19] = 0;
        byte[] crcCal = CRC16_Modbus.getSendBuf(StringHexUtil.bytes2HexString(temp4));
        if(crcCal[0] != tempCRC[2] || crcCal[1] != tempCRC[3]){
            mLogger.error("Error：CRC验证失败。");
            returnData = genResponseByte(messageType,temp3);
            return returnData;
        }

        // 初始化设备信息
        WirelessYTDevice tWirelessYTDevice = new WirelessYTDevice();
        ArrayList<WirelessYTQuota> curYTKeyData = new ArrayList<WirelessYTQuota>();
        WirelessYTQuota quota = null;

        int loopId = 1;
        int IdBit = 0;
        Date dataDate = null;
        int initLoopIndex = datas_index ;

        while((initLoopIndex + IdBit)<datas.length){
            byte [] temp5 = {(byte)0,(byte)0,datas[initLoopIndex+IdBit],datas[initLoopIndex+IdBit+1]};

            int tId = ByteNumUtil.bytesToInt(temp5);

            String tName = ""; // 名称
            String tValueType = WirelessYTConstants.VALUE_TYPE_NULL; // 值类型
            int tValueLength = 0; // 值占用的字节数
            String precision = ""; // 精确数
            if(tId == WirelessYTConstants.ID_TEMPERATURE_1000){
                tName = "温度";
                tValueType = WirelessYTConstants.VALUE_TYPE_FLOAT;
                tValueLength = 4;
                precision = "0.1";
            }else if(tId == WirelessYTConstants.ID_OUTSIDE_TEMPERATURE_1005){
                tName = "室外温度";
                tValueType = WirelessYTConstants.VALUE_TYPE_FLOAT;
                tValueLength = 4;
                precision = "0.1";
            }else if(tId == WirelessYTConstants.ID_HUMIDITY_1010){
                tName = "湿度";
                tValueType = WirelessYTConstants.VALUE_TYPE_FLOAT;
                tValueLength = 4;
                precision = "0.1";
            }else if(tId == WirelessYTConstants.ID_OUTSIDE_HUMIDITY_1015){
                tName = "室外湿度";
                tValueType = WirelessYTConstants.VALUE_TYPE_FLOAT;
                tValueLength = 4;
                precision = "0.1";
            }else if(tId == WirelessYTConstants.ID_NH4_1020){
                tName = "氨气";
                tValueType = WirelessYTConstants.VALUE_TYPE_FLOAT;
                tValueLength = 4;
                precision = "0.1";
            }else if(tId == WirelessYTConstants.ID_H2S_1030){
                tName = "硫化氢";
                tValueType = WirelessYTConstants.VALUE_TYPE_FLOAT;
                tValueLength = 4;
                precision = "0.1";
            }else if(tId == WirelessYTConstants.ID_CO2_1040){
                tName = "二氧化碳";
                tValueType = WirelessYTConstants.VALUE_TYPE_FLOAT;
                tValueLength = 4;
                precision = "0.1";
            }else if(tId == WirelessYTConstants.ID_AIR_PRESSURE_1050){
                tName = "气压";
                tValueType = WirelessYTConstants.VALUE_TYPE_FLOAT;
                tValueLength = 4;
                precision = "0.1";
            }else if(tId == WirelessYTConstants.ID_INTERFACESN_1511){
                tName = "接口编号";
                tValueType = WirelessYTConstants.VALUE_TYPE_INT;
                tValueLength = 2;
            }else if(tId == WirelessYTConstants.ID_ILUMINATION_1110){
                tName = "光照";
                tValueType = WirelessYTConstants.VALUE_TYPE_FLOAT;
                tValueLength = 4;
                precision = "0.01";
            }else if(tId == WirelessYTConstants.ID_SENSOR_STATUS_2017){
                tName = "传感器状态";
                tValueType = WirelessYTConstants.VALUE_TYPE_STRING_2;
                tValueLength = 4;
            }else if(tId == WirelessYTConstants.ID_MMSN_1510){
                tName = "MagicMote序列号";
                tValueType = WirelessYTConstants.VALUE_TYPE_INT;
                tValueLength = 8;
            }else if(tId == WirelessYTConstants.ID_TIME_1600){
                tName = "时间戳";
                tValueType = WirelessYTConstants.VALUE_TYPE_DATETIME;
                tValueLength = 4;
            }else if(tId == WirelessYTConstants.ID_MM_POWER_STATUS_2003){
                tName = "MagicMote供电状态";
                tValueType = WirelessYTConstants.VALUE_TYPE_STRING_2;
                tValueLength = 2;
            }else if(tId == WirelessYTConstants.ID_VOLTAGE_2004){
                tName = "电池电压";
                tValueType = WirelessYTConstants.VALUE_TYPE_FLOAT;
                tValueLength = 4;
                precision = "0.01";
            }else if(tId == WirelessYTConstants.ID_RUNTIME_2006){
                tName = "运行时间";
                tValueType = WirelessYTConstants.VALUE_TYPE_INT;
                tValueLength = 4;
            }else if(tId == WirelessYTConstants.ID_SOFTWARE_VERSION_2007){
                tName = "软件版本";
                tValueType = WirelessYTConstants.VALUE_TYPE_STRING_16;
                tValueLength = 0;
            }else if(tId == WirelessYTConstants.ID_HARDWARE_VERSION_2008){
                tName = "硬件版本";
                tValueType = WirelessYTConstants.VALUE_TYPE_STRING_16;
                tValueLength = 0;
            }else if(tId == WirelessYTConstants.ID_ELEC_QUANTITY_60003){
                tName = "总有功电量";
                tValueType = WirelessYTConstants.VALUE_TYPE_FLOAT;
                tValueLength = 4;
                precision = "0.01";
            }else if(tId == WirelessYTConstants.ID_MM_PROPERTY_2016){
                tName = "Magicmote属性";
                tValueType = WirelessYTConstants.VALUE_TYPE_STRING_2;
                tValueLength = 4;
            }else if(tId == WirelessYTConstants.ID_12_CS_60004){
                tName = "12路电流监测";
                tValueType = WirelessYTConstants.VALUE_TYPE_STRING_2;
                tValueLength = 4;
            }else if(tId == WirelessYTConstants.ID_SIGNAL_STRENGTH_2018){
                tName = "信号强度";
                tValueType = WirelessYTConstants.VALUE_TYPE_INT;
                tValueLength = 2;
            }else{
                mLogger.error("Error：发现未知的数据ID类型。ID="+tId);
                returnData = genResponseByte(messageType,temp3);
                return returnData;
            }
            IdBit += 2;

            if(tValueLength == 0){
                if(tValueType.equals(WirelessYTConstants.VALUE_TYPE_STRING_16)){
                    byte [] tTempStrLength = new byte[4];
                    tTempStrLength[0] = (byte)0;
                    tTempStrLength[1] = (byte)0;
                    tTempStrLength[2] = (byte)0;
                    tTempStrLength[3] = datas[initLoopIndex+IdBit];
                    IdBit += 1;
                    tValueLength = ByteNumUtil.bytesToInt(tTempStrLength);
                }else{
                    mLogger.error("ID="+tId+" Error：数据类型不是字符串，但是未定义。");
                    returnData = genResponseByte(messageType,temp3);
                    return returnData;
                }
            }

            byte [] tValueBytes = new byte[tValueLength];
            for(int in = 0; in < tValueBytes.length; in ++){
                tValueBytes[in] = datas[initLoopIndex+IdBit+in] ;
            }
            String tRealVal = "";
            if(tValueType.equals(WirelessYTConstants.VALUE_TYPE_INT)){
                if(tValueLength == 2){
                    byte [] intBytes = {(byte)0,(byte)0,tValueBytes[0],tValueBytes[1]};
                    tRealVal += ByteNumUtil.bytesToInt(intBytes);
                }else if(tValueLength == 4){
                    tRealVal += ByteNumUtil.bytesToInt(tValueBytes);
                }else if(tValueLength == 8){
                    tRealVal += ByteNumUtil.bytes2Long(tValueBytes);
                }else{
                    mLogger.error("Error：Value类型是Int,但是长度异常。");
                    returnData = genResponseByte(messageType,temp3);
                    return returnData;
                }
            }else if(tValueType.equals(WirelessYTConstants.VALUE_TYPE_FLOAT)){
                if(tValueLength == 4){
                    tRealVal += Float.intBitsToFloat(ByteNumUtil.bytesToInt(tValueBytes));
                }else{
                    mLogger.error("Error：Value类型是Float,但是长度异常");
                }
            }else if(tValueType.equals(WirelessYTConstants.VALUE_TYPE_STRING_16)){
                tRealVal += StringHexUtil.bytes2HexString(tValueBytes);
            }else if(tValueType.equals(WirelessYTConstants.VALUE_TYPE_DATETIME)){
                tRealVal += ByteNumUtil.bytesToInt(tValueBytes);
                dataDate = new Date(Long.parseLong(tRealVal)*1000);
            }else if(tValueType.equals(WirelessYTConstants.VALUE_TYPE_STRING_2)){
                tRealVal = StringHexUtil.bytes2BinaryString(tValueBytes);
            }else if(tValueType.equals(WirelessYTConstants.VALUE_TYPE_NULL)){
                tRealVal = StringHexUtil.bytes2HexString(tValueBytes);
            }

            mLogger.info("(" + StringHexUtil.b2HS(temp5[2]) + StringHexUtil.b2HS(temp5[3]) + ")");
            mLogger.info(tId + "-" + tName + "-" + tRealVal );
            mLogger.info("(" + StringHexUtil.bytes2HexString(tValueBytes)+ "," + tValueLength + "字节,"+tValueType + ")");
            mLogger.info("");

            try {
                if(tId== WirelessYTConstants.ID_MMSN_1510){
                    // 1510 Magicmote设备唯一的序列号
                    tWirelessYTDevice.setCid(tRealVal);
                }else if(tId== WirelessYTConstants.ID_MM_POWER_STATUS_2003){
                    // 2003 Magicmote供电状态
                    tWirelessYTDevice.setPower_status(tRealVal);
                }else if(tId== WirelessYTConstants.ID_VOLTAGE_2004){
                    // 2004 电池电压
                    tWirelessYTDevice.setVoltage(tRealVal);
                }else if(tId== WirelessYTConstants.ID_TIME_1600){
                    // 1600 时间戳
                    tWirelessYTDevice.setTime(tRealVal);
                }else if(tId== WirelessYTConstants.ID_SOFTWARE_VERSION_2007){
                    // 2007 软件版本
                    tWirelessYTDevice.setSoftware_version(tRealVal);
                }else if(tId== WirelessYTConstants.ID_HARDWARE_VERSION_2008){
                    // 2008 硬件版本
                    tWirelessYTDevice.setHardware_version(tRealVal);
                }else if(tId== WirelessYTConstants.ID_MM_PROPERTY_2016){
                    // 2016 MM属性
                    tWirelessYTDevice.setDevice_attr(tRealVal);
                }else if(tId== WirelessYTConstants.ID_RUNTIME_2006){
                    // 2006 MM运行时间
                    tWirelessYTDevice.setRun_time(tRealVal);
                }else{
                    // 1511 接口编号
                    if(tId == WirelessYTConstants.ID_INTERFACESN_1511){
                        quota =new WirelessYTQuota() ;
                        quota.DEVICE_ID.setValue(tWirelessYTDevice.getCid());
                        quota.DEVICE_TYPE.setValue(WirelessYTConstants.DEVICE_TYPE);
                        quota.PORT_ID.setValue(tRealVal);
                    // 2017 传感器状态
                    }else if(tId == WirelessYTConstants.ID_SENSOR_STATUS_2017){
                        quota.STATUS.setValue(tRealVal);
                    }else if(tId == WirelessYTConstants.ID_SIGNAL_STRENGTH_2018){
                        if(curYTKeyData.size() == 0 && quota == null){
                            tWirelessYTDevice.setSignalStrength(tRealVal);
                        }else{
                            quota.setSignalStrength(tRealVal);
                            if(quota != null
                                    && !StringUtils.isEmpty(quota.DEVICE_ID.getValue())
                                    && !StringUtils.isEmpty(quota.PORT_ID.getValue())
                                    ){
                                quota.COLLECT_DATETIME.setValue(DateUtil.getTime());
                                quota.setMaketime(System.currentTimeMillis());
                                quota.SOURCE_CODE.setValue(StringHexUtil.bytes2HexString(datas));
                                quota.setDeviceKeyId();
                                curYTKeyData.add(quota);
                            }
                        }
                    }else if(tId == WirelessYTConstants.ID_TEMPERATURE_1000){
                        if(quota.PORT_ID.getValue().equals("1")){
                            quota.INSIDE_TEMP1.setValue(tRealVal);
                        }else if(quota.PORT_ID.getValue().equals("2")){
                            quota.INSIDE_TEMP2.setValue(tRealVal);
                        }else if(quota.PORT_ID.getValue().equals("3")){
                            quota.INSIDE_TEMP3.setValue(tRealVal);
                        }else if(quota.PORT_ID.getValue().equals("4")){
                            quota.INSIDE_TEMP4.setValue(tRealVal);
                        }else if(quota.PORT_ID.getValue().equals("5")){
                            quota.INSIDE_TEMP5.setValue(tRealVal);
                        }else if(quota.PORT_ID.getValue().equals("6")){
                            quota.INSIDE_TEMP6.setValue(tRealVal);
                        }else if(quota.PORT_ID.getValue().equals("7")){
                            quota.INSIDE_TEMP7.setValue(tRealVal);
                        }else if(quota.PORT_ID.getValue().equals("8")){
                            quota.INSIDE_TEMP8.setValue(tRealVal);
                        }else if(quota.PORT_ID.getValue().equals("9")){
                            quota.INSIDE_TEMP9.setValue(tRealVal);
                        }
                        quota.PORT_ID.setValue(String.valueOf(tId) + "_" + quota.PORT_ID.getValue());
                    }else if(tId == WirelessYTConstants.ID_HUMIDITY_1010){
                        if(quota.PORT_ID.getValue().equals("1")){
                            quota.HUMIDITY.setValue(tRealVal);
                        }
                        quota.PORT_ID.setValue(String.valueOf(tId) + "_" + quota.PORT_ID.getValue());
                    }else if(tId == WirelessYTConstants.ID_CO2_1040){
                        if(quota.PORT_ID.getValue().equals("1")){
                            quota.CO2.setValue(tRealVal);
                        }
                        quota.PORT_ID.setValue(String.valueOf(tId) + "_" + quota.PORT_ID.getValue());
                    }else if(tId == WirelessYTConstants.ID_ILUMINATION_1110){
                        if(quota.PORT_ID.getValue().equals("1")){
                            quota.LUX.setValue(tRealVal);
                        }
                        quota.PORT_ID.setValue(String.valueOf(tId) + "_" + quota.PORT_ID.getValue());
                    }else if(tId == WirelessYTConstants.ID_OUTSIDE_TEMPERATURE_1005){
                        if(quota.PORT_ID.getValue().equals("1")){
                            quota.OUTSIDE_TEMP.setValue(tRealVal);
                        }
                        quota.PORT_ID.setValue(String.valueOf(tId) + "_" + quota.PORT_ID.getValue());
                    }else if(tId == WirelessYTConstants.ID_AIR_PRESSURE_1050){
                        if(quota.PORT_ID.getValue().equals("1")){
                            quota.NEGATIVE_PRESSURE.setValue(tRealVal);
                        }
                        quota.PORT_ID.setValue(String.valueOf(tId) + "_" + quota.PORT_ID.getValue());
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            IdBit += tValueLength;
            if((initLoopIndex + IdBit)==datas.length){
                mLogger.info("Success");
                break;
            }else if((initLoopIndex + IdBit)>datas.length){
                mLogger.error("Error：数据循环异常结束。");
                break;
            }

            loopId ++;
            if(loopId >100){
                mLogger.error("Error：数据循环超过100次，发生异常。");
                return returnData;
            }
        }
        if(tWirelessYTDevice != null && !StringUtils.isEmpty(tWirelessYTDevice.getCid())){
            tWirelessYTDevice.setMakeTime(System.currentTimeMillis());
            rtPdMain.put(tWirelessYTDevice.getCid(),tWirelessYTDevice);
        }
        if(curYTKeyData != null && curYTKeyData.size() > 0){
            for(WirelessYTQuota rq : curYTKeyData){
                rq.YT_DATETIME.setValue(tWirelessYTDevice.getTime());
                rtPdDetail.put(rq.ID.getValue(),rq);
            }
        }
        if(needreturn){
            returnData = genResponseByte(messageType,temp3);
        }
        return returnData;
    }

    private byte[] genResponseByte(byte messageType,byte[] frameSN){
        byte [] ResponseByte ;
        if(messageType == 3){
            ResponseByte = new byte[24];
        }else{
            ResponseByte = new byte[20];
        }

        // 起始符 4字节
        ResponseByte[0] = WirelessYTConstants.HEADBYTE[0];
        ResponseByte[1] = WirelessYTConstants.HEADBYTE[1];
        ResponseByte[2] = WirelessYTConstants.HEADBYTE[2];
        ResponseByte[3] = WirelessYTConstants.HEADBYTE[3];

        // 帧类型，2字节
        ResponseByte[4] = 0x44; // 0100 0100
        ResponseByte[5] = messageType;

        // 帧长度，2字节
        byte[] len = ByteNumUtil.intToBytes(ResponseByte.length);
        ResponseByte[6] = len[2];
        ResponseByte[7] = len[3];
        // 序列号  4字节
        ResponseByte[8] = 0;
        ResponseByte[9] = 0;
        ResponseByte[10] = 0;
        ResponseByte[11] = 0;
        ResponseByte[12] = 0;
        ResponseByte[13] = 0;
        ResponseByte[14] = 0;
        ResponseByte[15] = 0;

        // 帧序号  2字节
        ResponseByte[16] = frameSN[2];
        ResponseByte[17] = frameSN[3];
        // CRC 2字节
        ResponseByte[18] = 0;
        ResponseByte[19] = 0;

        if(messageType == 3){
            int curTimes =  (int)((new Date()).getTime()/1000);
            byte[] curTimeByte = ByteNumUtil.intToBytes(curTimes);

            ResponseByte[20] = curTimeByte[0];
            ResponseByte[21] = curTimeByte[1];
            ResponseByte[22] = curTimeByte[2];
            ResponseByte[23] = curTimeByte[3];
        }

        byte[] crcAck = CRC16_Modbus.getSendBuf(StringHexUtil.bytes2HexString(ResponseByte));
        ResponseByte[18] = crcAck[0];
        ResponseByte[19] = crcAck[1];
        return ResponseByte;
    }

    public static PageData getRtPdDetail() {
        return rtPdDetail;
    }
    public static PageData getRtPdMain() {
        return rtPdMain;
    }
}
