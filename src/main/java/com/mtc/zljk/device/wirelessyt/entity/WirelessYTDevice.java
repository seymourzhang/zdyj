package com.mtc.zljk.device.wirelessyt.entity;

/**
 * 引通控制器
 * @TODO
 * @Date 2016-6-23
 * @author loyeWen
 *
 */
public class WirelessYTDevice {
	private String cid;
	private String sNo;
	private String dataV;
	private String dataK;
	public String getCid() {
		return cid;
	}
	public void setCid(String cid) {
		this.cid = cid;
	}
	public String getsNo() {
		return sNo;
	}
	public void setsNo(String sNo) {
		this.sNo = sNo;
	}
	public String getDataV() {
		return dataV;
	}
	public void setDataV(String dataV) {
		this.dataV = dataV;
	}
	public String getDataK() {
		return dataK;
	}
	public void setDataK(String dataK) {
		this.dataK = dataK;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	private String time;

	private String power_status;
	private String voltage;
	private String run_time;
	private String signalStrength;
	private String hardware_version;
	private String software_version;
	private String device_attr;
	private long makeTime;

	public String getSignalStrength() {
		return signalStrength;
	}

	public void setSignalStrength(String signalStrength) {
		this.signalStrength = signalStrength;
	}

	public long getMakeTime() {
		return makeTime;
	}

	public void setMakeTime(long makeTime) {
		this.makeTime = makeTime;
	}

	public String getDevice_attr() {
		return device_attr;
	}

	public void setDevice_attr(String device_attr) {
		this.device_attr = device_attr;
	}

	public String getPower_status() {
		return power_status;
	}

	public void setPower_status(String power_status) {
		this.power_status = power_status;
	}

	public String getVoltage() {
		return voltage;
	}

	public void setVoltage(String voltage) {
		this.voltage = voltage;
	}

	public String getRun_time() {
		return run_time;
	}

	public void setRun_time(String run_time) {
		this.run_time = run_time;
	}

	public String getHardware_version() {
		return hardware_version;
	}

	public void setHardware_version(String hardware_version) {
		this.hardware_version = hardware_version;
	}

	public String getSoftware_version() {
		return software_version;
	}

	public void setSoftware_version(String software_version) {
		this.software_version = software_version;
	}
}
