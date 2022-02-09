module.exports = app => {
  const tintuc = require("../controllers/tintucController.js");
  const loaiTinTuc = require("../controllers/loaiTinController.js");
  const binhluan = require("../controllers/binhluanController.js");
  const cttintuc = require("../controllers/chitiettintucController.js");
  const nguoidung = require("../controllers/nguoidungController.js");
  const slide = require("../controllers/slideController.js");
  const user = require("../controllers/useradminController.js");
  // API cho phần admin
  app.post("/admin/tintuc/ins", tintuc.create);
  app.get("/admin/tintuc/findall", tintuc.findAll);
  
  app.get("/admin/tintuc/all", tintuc.findAllJson);
  app.get("/admin/tintuc/findone/:tintucID", tintuc.findOne);
  app.get("/admin/tintuc/find/:tintucID", tintuc.findOneJson);
  app.put("/admin/tintuc/update/:tintucID", tintuc.update);
  app.delete("/admin/tintuc/delone/:tintucID", tintuc.delete);
  app.delete("/admin/tintuc/delmany", tintuc.deleteMany);


  app.post("/admin/loaitintuc/ins", loaiTinTuc.create);
  app.get("/admin/loaitintuc/findall", loaiTinTuc.findAll);
  app.get("/admin/loaitintuc/all", loaiTinTuc.findAllJson);
  app.get("/admin/loaitintuc/findone/:loaiTinTucID", loaiTinTuc.findOne);
  app.get("/admin/loaitintuc/find/:loaiTinTucID", loaiTinTuc.findOneJson);
  app.put("/admin/loaitintuc/update/:loaiTinTucID", loaiTinTuc.update);
  app.delete("/admin/loaitintuc/delone/:loaiTinTucID", loaiTinTuc.delete);
  app.delete("/admin/loaiTinTuc/delmany", loaiTinTuc.deleteMany);

  app.post("/admin/cttintuc/ins", cttintuc.create);
  app.get("/admin/cttintuc/findall", cttintuc.findAll);
  app.get("/admin/cttintuc/all", cttintuc.findAllJson);
  app.get("/admin/cttintuc/findone/:cttintucID", cttintuc.findOne);
  app.get("/admin/cttintuc/find/:cttintucID", cttintuc.findOneJson);
  app.put("/admin/cttintuc/update/:cttintucID", cttintuc.update);
  app.delete("/admin/cttintuc/delone/:cttintucID", cttintuc.delete);
  app.delete("/admin/cttintuc/delmany", cttintuc.deleteMany);

  app.get("/admin/nguoidung/findall", nguoidung.findAll);
  app.get("/admin/nguoidung/findone/:nguoidungID", nguoidung.findOne);
  app.delete("/admin/nguoidung/delone/:nguoidungID", nguoidung.delete);

  app.post("/admin/slide/ins", slide.create);
  app.get("/admin/slide/findall", slide.findAll);
  app.get("/admin/slide/findone/:slideId", slide.findOne);
  app.get("/admin/slide/find/:slideId", slide.findOneJson);
  app.put("/admin/slide/update/:slideId", slide.update);
  app.delete("/admin/slide/delone/:slideId", slide.delete);
  app.delete("/admin/slide/delmany", slide.deleteMany);


  app.post("/admin/user/ins", user.create);
  app.get("/admin/user/findall", user.findAll);
  app.get("/admin/user/findone/:userId", user.findOne);
  app.put("/admin/user/update/:userId", user.update);
  app.delete("/admin/user/delone/:userId", user.delete);
  app.delete("/admin/user/delmany", user.deleteMany);
  app.post("/user/login", user.login);
  app.post("/user/logout", user.logout);
  app.get("/admin/comments/findbyid/:baivietID", binhluan.getBinhLuanWithIdBaiViet);
  app.get("/admin/comments/findbyuser/:username", binhluan.getBinhLuanAndBaiVietByUser);

  // API cho phần user
  app.put("/nguoidung/update/:nguoidungID", nguoidung.update);
  app.post("/nguoidung/ins", nguoidung.create);
  app.post("/nguoidung/login", nguoidung.login);
  app.post("/nguoidung/logout", nguoidung.logout);
  app.get("/loaitt/findall", loaiTinTuc.findAllJson);
  app.get("/loaitintuc/:tintucID", tintuc.getTinTucByLoaiTin);
  app.get("/tintuc/findall", tintuc.findAll);
  app.get("/tintuc/fournews", tintuc.findFour);
  app.get("/slide/getthree", slide.getThreeSlide);
  app.get("/tintuc/findone/:tintucID", tintuc.findOneJson);

  app.post("/binhluan/ins", binhluan.create);
  //app.get("/binhluan/findall", binhluan.findAll);
  //app.get("/binhluan/findone/:binhLuanID", binhluan.findOne);
  app.put("/binhluan/update/:binhLuanID", binhluan.update);
  app.delete("/binhluan/delone/:binhLuanID", binhluan.delete);
  app.get("/binhluan/findbyuser", binhluan.getBinhLuanByUserLogin);
  app.get("/comments/findwithidbai/:baivietID", binhluan.getBinhLuanWithIdBaiViet);

  //API giao diện
  app.get('/', (req, res) => {
    res.render('home');
  });
  app.get('/news/:ID', (req, res) => {
    res.render('newsList');
  });
  app.get('/newsdetails/:id', (req, res) => {
    res.render('newsDetails');
  });
  app.get('/login', (req, res) => {
    res.render('login',{layout: ''});
  });
  app.get('/register', (req, res) => {
    res.render('register',{layout: ''});
  });
  app.get('/admin/index', (req, res) => {
    res.render('admin/index',{layout: 'mainadmin'});
  });

  app.get('/admin/news', (req, res) => {
    res.render('admin/listItem',{layout: 'mainadmin'});
  });
  app.get('/admin/insnew', (req, res) => {
    res.render('admin/insUpNews',{layout: 'mainadmin'});
  });
  app.get('/admin/new/:id', (req, res) => {
    res.render('admin/insUpNews',{layout: 'mainadmin'});
  });


  app.get('/admin/types', (req, res) => {
    res.render('admin/listItem',{layout: 'mainadmin'});
  });
  app.get('/admin/instype', (req, res) => {
    res.render('admin/insUpType',{layout: 'mainadmin'});
  });
  app.get('/admin/type/:id', (req, res) => {
    res.render('admin/insUpType',{layout: 'mainadmin'});
  });

  app.get('/admin/details', (req, res) => {
    res.render('admin/listItem',{layout: 'mainadmin'});
  });
  app.get('/admin/insdetails', (req, res) => {
    res.render('admin/inUpCTTinTuc',{layout: 'mainadmin'});
  });
  app.get('/admin/details/:id', (req, res) => {
    res.render('admin/inUpCTTinTuc',{layout: 'mainadmin'});
  });


  app.get('/admin/slides', (req, res) => {
    res.render('admin/listItem',{layout: 'mainadmin'});
  });
  app.get('/admin/insslide', (req, res) => {
    res.render('admin/insUpSlide',{layout: 'mainadmin'});
  });
  app.get('/admin/upslide/:id', (req, res) => {
    res.render('admin/insUpSlide',{layout: 'mainadmin'});
  });


  app.get('/admin', (req, res) => {
    res.render('admin/login',{layout: ''});
  });
  app.get('/admin/insregister', (req, res) => {
    res.render('admin/register',{layout: ''});
  });
  app.get('/admin/user', (req, res) => {
    res.render('admin/listItem',{layout: 'mainadmin'});
  });

  app.get('/admin/customer', (req, res) => {
    res.render('admin/listItem',{layout: 'mainadmin'});
  });

  app.get('/401', (req, res) => {
    res.render('401',{layout: ''});
  });
  app.get('/500', (req, res) => {
    res.render('500',{layout: ''});
  });
  app.get('/404', (req, res) => {
    res.render('404',{layout: ''});
  });

};
