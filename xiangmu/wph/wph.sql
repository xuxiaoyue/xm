#设置客户端连接的编码
SET NAMES UTF8;
#丢弃数据库，如果存在
drop database  if exists wph;
#创建数据库wph
create database wph charset=UTF8;
#用数据库wph
use wph;
#创建数据表w_user
create table w_user(
  wid int primary key ,
  user_name varchar(32),
  wpwd varchar(32),
  email varchar(64),
  phone varchar(11),
  gender varchar(2),
  startTime varchar(10)

);
insert into w_user values(1,"ll",111111,"240829683@qq.com",13518291346,"女","2017-06-11");
