-- CREATE EXTENSION "uuid-ossp";
-- CREATE DATABASE NODE-MENTORING
-- \c NODE-MENTORING

CREATE TABLE if not exists users (
    id uuid DEFAULT uuid_generate_v4(),
    login VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    age SMALLINT NOT NULL,
    isDeleted BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

insert into users (id, login, password, age, isDeleted) 
    values ('OOylLck-TMenzWN3Ct3Ch', 'peter', 'asdQWE123', 27, FALSE);
insert into users (id, login, password, age, isDeleted) 
    values ('8oE3FOX7z3342iVoZcu_W', 'lajos', 'asdQWE123', 30, FALSE);
insert into users (id, login, password, age, isDeleted) 
    values ('_s9VFB7VDVGptdCZ5RYNs', 'karcsi', 'asdQWE123', 40, FALSE);
