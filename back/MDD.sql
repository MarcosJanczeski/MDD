drop table if exists pc_referencial_sped;
create table pc_referencial_sped(
    id serial primary key,
    codigo varchar(19) not null,
    descricao varchar(260) not null,
    natureza char not null,
    destinacao text,
    categoria varchar(30)
);

create type natureza_pessoa as enum ('FÍSICA', 'JURÍDICA');

create table pessoas(
    id serial PRIMARY KEY,
    razao varchar(80) not null,
    fantasia varchar(80) not null,
    natureza natureza_pessoa,
    doc_m varchar(20),
    doc_e varchar(20),
    doc_f varchar(20)
);

create type natureza_conta as enum ('D', 'C');

create table ct1(
    id char PRIMARY KEY,
    conta varchar(20),
    natureza natureza_conta
);

create table ct2(
    ct1 char references ct1(id) not null,
    id smallint primary key,
    conta varchar(60)
);

create table ct3(
    ct2 smallint references ct2(id),
    id smallint primary key,
    conta varchar(70)
);

create table contas(
    ct3 smallint references ct3(id),
    id integer primary key,
    conta varchar(80) not null
);

CREATE TABLE lancamentos(
    id serial primary key,
    pessoa integer not null,
    doc character varying(20) NOT NULL,
    dt_venc date NOT NULL DEFAULT (now())::date,
    dt_real date,
    conta_d integer references contas(id),
    conta_c integer references contas(id),
    valor money NOT NULL,
    evento character varying(100)
);