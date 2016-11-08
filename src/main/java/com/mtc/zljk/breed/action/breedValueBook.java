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
import java.util.ArrayList;
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

    /*@RequestMapping("/saveAttach")
    public String saveAttach(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
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
                if ((type.toLowerCase().equals("docx")
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
                    pd.put("create_person", user.getId());
                    pd.put("modify_person", user.getId());
                    sdFileService.insert(pd);
                } else if(!(type.toLowerCase().equals("doc") || type.toLowerCase().equals("pdf") || type.toLowerCase().equals("xlsx"))){
                    Msg = "当前上传只支持doc、pdf、xlsx文件类型！";
                } else if(fi.getSize() > uploadFileMaxSize){
                    Msg = "您上传文件大于 " + uploadFileMaxSize / 1024 / 1024 + "M ！";
                }
            }
        }
        j.setObj(items);
        j.setMsg(Msg);
        super.writeJson(j, response);
        return "fileuploaddone";
    }*/

    @RequestMapping("/newUpload")
    public
    @ResponseBody
    String upload(HttpServletRequest request, @RequestParam(value = "eFiles", required = false) MultipartFile file) {
        String realpath = request.getSession().getServletContext().getRealPath(filePath);
        String fileName = file.getOriginalFilename();
        File f = new File(realpath + "/" + fileName);
        try {
            FileUtils.copyInputStreamToFile(file.getInputStream(), f);
        } catch (IOException e) {
            e.printStackTrace();
            return e.getMessage();
        }
        return "fileuploaddone";
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
        }else{
            j.setMsg("文件名为空！");
            j.setSuccess(false);
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

        String path = servletContext.getRealPath("/");
        String fileName = request.getParameter("fileName");
        String filePath =  path + "modules/file/download/" + fileName;

        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        OutputStream fos = null;
        InputStream fis = null;
        File uploadFile = new File(filePath);
        fis = new FileInputStream(uploadFile);
        bis = new BufferedInputStream(fis);
        response.reset();
        fos = response.getOutputStream();
        bos = new BufferedOutputStream(fos);
        response.setContentType("text/plain");
        response.setHeader("Content-disposition","attachment; filename="+uploadFile.getName());
        FileCopyUtils.copy(fis, bos);//spring工具类直接流拷贝
        bos.flush();
        fis.close();
        bis.close();
        fos.close();
        bos.close();
    }
}
