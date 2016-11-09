package com.mtc.zljk.breed.action;

import com.mtc.zljk.breed.service.SDFileService;
import com.mtc.zljk.user.entity.SDUser;
import com.mtc.zljk.util.action.BaseAction;
import com.mtc.zljk.util.common.Const;
import com.mtc.zljk.util.common.Json;
import com.mtc.zljk.util.common.Page;
import com.mtc.zljk.util.common.PageData;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.StringEscapeUtils;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Seymour on 2016/11/2.
 */
@Controller
@RequestMapping("/breed")
public class BreedValueBook extends BaseAction {

    @Autowired
    private SDFileService sdFileService;

    ServletContext servletContext;

    private int uploadFileMaxSize = 10 * 1024 * 1024; //10M

    private String filePath = "/modules/file/upload/";

    private String downloadPath = "/modules/file/download/";

    private String[] needReplaceChar = {"[", "]", "{", "}"};

    @RequestMapping("/companyFileView")
    public ModelAndView missionRemindView(Page page, HttpSession session) throws Exception {
        ModelAndView mav = this.getModelAndView();
        PageData pd = new PageData();
        pd = this.getPageData();
        pd.put("ISENABLED", "1");
        List<PageData> lol = sdFileService.selectByStatus(pd);
        JSONArray a = new JSONArray();
        for (PageData task : lol) {
            String fileName = task.get("file_name").toString();
            fileName = fileName.replace("\\\\", "");
            task.put("file_name", fileName);
            a.put(task);
        }
        mav.addObject("files", a);
        mav.setViewName("modules/breed/companyFile");
        return mav;
    }

    @RequestMapping("/editFileUrl")
    public ModelAndView editFileUrl(Page page, HttpSession session) throws Exception {
        ModelAndView mav = this.getModelAndView();
        PageData pd = new PageData();
        pd = this.getPageData();
        mav.setViewName("modules/breed/editFile");
        return mav;
    }

    @RequestMapping("/newUpload")
    public
    @ResponseBody
    void upload(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "eFiles", required = false) MultipartFile file) {
        Json j = new Json();
        String realpath = request.getSession().getServletContext().getRealPath(filePath);
        String fileName = file.getOriginalFilename();
        File f = new File(realpath + "/" + fileName);
        String Msg = "";
        try {
            String[] typechoose = fileName.split("\\.");
            int ichoose = typechoose.length;
            String type = ichoose > 1 ? typechoose[ichoose - 1] : "";
            if ((type.toLowerCase().equals("docx")
                    || type.toLowerCase().equals("pdf")
                    || type.toLowerCase().equals("xlsx")) && file.getSize() <= uploadFileMaxSize) {
                SimpleDateFormat smat = new SimpleDateFormat("yyyyMMddHHmmss");
                FileUtils.copyInputStreamToFile(file.getInputStream(), f);
                Msg = "1";
                j.setSuccess(true);
            } else if(!(type.toLowerCase().equals("doc") || type.toLowerCase().equals("pdf") || type.toLowerCase().equals("xlsx"))){
                Msg = "当前上传只支持doc、pdf、xlsx文件类型！";
                j.setSuccess(false);
            } else if(file.getSize() > uploadFileMaxSize){
                Msg = "您上传文件大于 " + uploadFileMaxSize / 1024 / 1024 + "M ！";
                j.setSuccess(false);
            }
        } catch (IOException e) {
            e.printStackTrace();
            j.setMsg(e.getMessage());
            j.setSuccess(false);
        }
        j.setMsg(Msg);
        super.writeJson(j, response);
    }

    @RequestMapping("/saveTips")
    public void saveTips(HttpServletRequest request, HttpSession session, HttpServletResponse response) throws Exception {
        Json j = new Json();
        PageData pd = this.getPageData();
        SDUser user = (SDUser) session.getAttribute(Const.SESSION_USER);
        String realpath = request.getSession().getServletContext().getRealPath(filePath);
        String escapePath = StringUtils.replace(realpath, "\\", "\\\\");
        String fileName = pd.get("file_name").toString();
        String reName = fileName;
        if (!fileName.isEmpty()) {
            for (String s : needReplaceChar) {
                reName = StringUtils.replace(reName, s, "\\\\" + s);
            }
            pd.put("file_name", reName);
            pd.put("file_path", escapePath);
            pd.put("create_person", user.getId());
            pd.put("modify_person", user.getId());
            int i = sdFileService.insert(pd);
            List<PageData> lcd = sdFileService.selectByStatus(pd);
            j.setObj(lcd);
            j.setMsg("1");
            j.setSuccess(true);
        }else{
            j.setMsg("文件名为空！");
            j.setSuccess(false);
        }
        super.writeJson(j, response);
    }

    @RequestMapping("/deleteRecord")
    public void deleteRecord(HttpServletResponse response, HttpSession session) throws Exception {
        Json j = new Json();
        PageData pd = this.getPageData();
        SDUser user = (SDUser) session.getAttribute(Const.SESSION_USER);
        pd.put("user_id", user.getId());
        int i = sdFileService.updateStatus(pd);
        List<PageData> lcd = new ArrayList<>();
        if (i == 1) {
            PageData pageData = new PageData();
            pageData.put("ISENABLED", "1");
            lcd = sdFileService.selectByStatus(pageData);
            j.setSuccess(true);
            j.setObj(lcd);
            j.setMsg("1");
        } else {
            j.setSuccess(false);
            j.setMsg("删除失败！");
        }
        super.writeJson(j, response);
    }
    @RequestMapping("/download")
    public void download(HttpServletResponse response, HttpServletRequest request, HttpSession session) throws Exception{
        String path = request.getSession().getServletContext().getRealPath("/");
        String fileName = URLDecoder.decode(request.getParameter("fileName"), "UTF-8");
        String upFilePath =  path + filePath + fileName;
        String downFilePath = path + downloadPath + fileName;
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        OutputStream fos = null;
        InputStream fis = null;
        InputStream down = null;
        File uploadFile = new File(upFilePath);
        File downloadFile = new File(downFilePath);
        fis = new FileInputStream(uploadFile);
        bis = new BufferedInputStream(fis);
        response.reset();
        fos = response.getOutputStream();
        bos = new BufferedOutputStream(fos);
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Content-disposition","attachment; filename="+ URLEncoder.encode(uploadFile.getName(), "UTF-8"));
        FileCopyUtils.copy(fis, bos);//spring工具类直接流拷贝
        FileUtils.copyInputStreamToFile(fis, downloadFile);
        bos.flush();
        fis.close();
        bis.close();
        fos.close();
        bos.close();
    }
}
