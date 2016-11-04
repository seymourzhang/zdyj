package com.mtc.zljk.breed.action;

import com.mtc.zljk.breed.service.SDFileService;
import com.mtc.zljk.user.entity.SDUser;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Const;
import com.mtc.zljk.util.common.Json;
import com.mtc.zljk.util.common.Page;
import com.mtc.zljk.util.common.PageData;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Seymour on 2016/11/2.
 */
@Controller
@RequestMapping("/breed")
public class breedValueBook extends BaseAction {

    @Autowired
    private SDFileService sdFileService;

    private int uploadFileMaxSize = 10 * 1024 * 1024; //10M
    private String filePath = "/modules/file/upload/";

    @RequestMapping("/companyFileView")
    public ModelAndView missionRemindView(Page page, HttpSession session) throws Exception {
        ModelAndView mav = this.getModelAndView();
        PageData pd = new PageData();
        pd = this.getPageData();
        pd.put("ISENABLED", "1");
        List<PageData> lol = sdFileService.selectByStatus(pd);
        JSONArray a = new JSONArray();
        for (PageData task : lol) {
            a.put(task);
        }
        mav.addObject("files", a);
        mav.setViewName("modules/breed/companyFile");
        return mav;
    }

    @RequestMapping("/editFileUrl")
    public ModelAndView editFileUrl(Page page, HttpSession session) throws Exception{
        ModelAndView mav = this.getModelAndView();
        PageData pd = new PageData();
        pd = this.getPageData();
        mav.setViewName("modules/breed/editFile");
        return mav;
    }

    @RequestMapping("/saveAttach")
    public void saveAttach(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        Json j = new Json();
        PageData pd = this.getPageData();
        pd.put("ISENABLED", "1");
        SDUser user  = (SDUser)session.getAttribute(Const.SESSION_USER);
        List<PageData> lol = sdFileService.selectByStatus(pd);
        String Msg = "";
        DiskFileItemFactory factory = new DiskFileItemFactory();
        // Set factory constraints
        factory.setSizeThreshold(4096); // 设置缓冲区大小，这里是4kb
//        factory.setRepository(eFiles);// 设置缓冲区目录
        ServletFileUpload upload = new ServletFileUpload(factory);
        // Set overall request size constraint
        upload.setSizeMax(uploadFileMaxSize); // 设置最大文件尺寸，这里是10M
        String realpath = request.getSession().getServletContext().getRealPath(filePath);
        List<FileItem> items = upload.parseRequest(request);// 得到所有的文件
        Iterator<FileItem> i = items.iterator();
        while (i.hasNext()) {
            FileItem fi = (FileItem) i.next();
            String fileName = fi.getName();
            if (fileName != null) {
                File fullFile = new File(new String(fi.getName().getBytes(), "GBK")); // 解决文件名乱码问题
                if (!new File(realpath).exists()) {
                    new File(realpath).mkdirs();
                }
                String[] typechoose = fileName.split("\\.");
                int ichoose = typechoose.length;
                String type = ichoose > 1 ? typechoose[ichoose - 1] : "";
                Date date = new Date();
                if ((type.toLowerCase().equals("doc")
                        || type.toLowerCase().equals("pdf")
                        || type.toLowerCase().equals("xlsx")) && fi.getSize() <= uploadFileMaxSize) {
                    SimpleDateFormat smat = new SimpleDateFormat("yyyyMMddHHmmss");
//                    String newfilname = smat.format(new Date()) + "." + type;
                    File savedFile = new File(realpath, fullFile.getName());
                    fi.write(savedFile);
                    Msg = "1";
                    pd.put("file_name", fileName);
                    pd.put("ISENABLED", "1");
                    pd.put("file_path", realpath);
                    pd.put("create_person", user);
                    pd.put("modify_person", user);
                    sdFileService.insert(pd);
                } else if(!(type.toLowerCase().equals("doc") || type.toLowerCase().equals("pdf") || type.toLowerCase().equals("xlsx"))){
                    Msg = "当前上传只支持doc、pdf、xlsx文件类型！";
                } else if(fi.getSize() > uploadFileMaxSize){
                    Msg = "您上传文件大于 "  + uploadFileMaxSize / 1024 / 1024 + "M ！";
                }
            }
        }
        j.setObj(items);
        j.setMsg(Msg);
        super.writeJson(j, response);
    }
}
