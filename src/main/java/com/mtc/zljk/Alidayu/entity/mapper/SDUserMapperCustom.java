package com.mtc.zljk.Alidayu.entity.mapper;



import com.mtc.zljk.Alidayu.entity.SDUser;

import java.util.List;

public interface SDUserMapperCustom {
   
	SDUser selectByUserCode(String userCode);
	
	List<SDUser> selectByFarmer(int farmerId);
	
	SDUser selectValidByPrimaryKey(Integer id);
}