use xz;
create table xz_news(
    id int primary key auto_increment,
    title varchar(128),
    ctime datetime,
    img_url varchar(255),
    point int
);

insert into xz_news values(null,"...1",now(),"http://127.0.0.1:3003/img/banner1.png",0);
insert into xz_news values(null,"...1",now(),"http://127.0.0.1:3003/img/banner1.png",0);
insert into xz_news values(null,"...1",now(),"http://127.0.0.1:3003/img/banner1.png",0);
insert into xz_news values(null,"...1",now(),"http://127.0.0.1:3003/img/banner1.png",0);
insert into xz_news values(null,"...1",now(),"http://127.0.0.1:3003/img/banner1.png",0);
insert into xz_news values(null,"...1",now(),"http://127.0.0.1:3003/img/banner1.png",0);
insert into xz_news values(null,"...1",now(),"http://127.0.0.1:3003/img/banner1.png",0);

