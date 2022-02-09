create database newsBlog;
use newsBlog;
CREATE table LOAITINTUC(
	id bigint primary key auto_increment,
	loaibaiviet nvarchar(50),
    deleteitem bit
);
create table TINTUC(
	id bigint primary key auto_increment,
    idloai bigint,
    tenbaiviet nvarchar(50),
    hinhanh text,
    mieuta text,
	deleteitem bit,
	FOREIGN KEY (idloai) REFERENCES LOAITINTUC(id)
);

create table CHITIETTINTUC(
	id bigint primary key auto_increment,
    idBaiViet bigint,
    chitietbaiviet text,
    hinhanh text,
    deleteitem bit,
    FOREIGN KEY (idBaiViet) REFERENCES TINTUC(id)
);

create table USERADMIN(
	username nvarchar(50) primary key,
    password nvarchar(50)
);

create table NGUOIDUNG(
	username nvarchar(50) primary key,
    password varchar(50),
    ten nvarchar(50),
    diachi nvarchar(50),
    sdt double
);

create table BINHLUAN(
	id bigint primary key auto_increment,
    idBaiViet bigint,
    idNguoiDung nvarchar(50),
    binhLuan text,
    deleteitem bit,
    FOREIGN KEY (idBaiViet) REFERENCES TINTUC(id),
    FOREIGN KEY (idNguoiDung) REFERENCES NGUOIDUNG(username)
);

create table SLIDE(
	id bigint primary key auto_increment,
    img nvarchar(1000)
);
 -- những bảng có trường deleteitem BINHLUAN,LOAITINTUC,TINTUC,CHITIETTINTUC,NGUOIDUNG
 drop table slide 
alter table BINHLUAN 
	add deleteitem bit 
drop database newsBlog
use newsblog
SELECT tintuc.*,loaitintuc.loaibaiviet FROM tintuc,loaitintuc where tintuc.deleteitem = 1 and loaitintuc.id = tintuc.idloai
SELECT tintuc.id,tintuc.tenbaiviet,tintuc.hinhanh,tintuc.mieuta,loaitintuc.loaibaiviet 
FROM tintuc,loaitintuc where tintuc.deleteitem = 1 and loaitintuc.id == tintuc.idloai