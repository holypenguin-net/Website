CREATE TABLE IF NOT EXISTS "User" (
    usr_ID_PK SERIAL NOT NULL PRIMARY KEY UNIQUE,
    usr_Nickname VARCHAR(32) NOT NULL UNIQUE,
    usr_Email VARCHAR(50) NOT NULL UNIQUE,
    usr_Password VARCHAR(60) NOT NULL,
    usr_Discord VARCHAR(20),
    usr_Admin BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS "GameName" (
    gmn_ID_PK SERIAL NOT NULL PRIMARY KEY UNIQUE,
    gmn_Name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS "GameType" (
    gmt_ID_PK SERIAL NOT NULL PRIMARY KEY UNIQUE,
    gmt_Type VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS "GameVersion" (
    gmv_ID_PK SERIAL NOT NULL PRIMARY KEY UNIQUE,
    gmv_Version VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Game" (
    gm_ID_PK SERIAL NOT NULL PRIMARY KEY UNIQUE,
    gmn_ID_FK INT NOT NULL,
    gmt_ID_FK INT NOT NULL,
    gmv_ID_FK INT NOT NULL,
    FOREIGN KEY(gmn_ID_FK) REFERENCES "GameName"(gmn_ID_PK) ON UPDATE CASCADE,
    FOREIGN KEY(gmt_ID_FK) REFERENCES "GameType"(gmt_ID_PK) ON UPDATE CASCADE,
    FOREIGN KEY(gmv_ID_FK) REFERENCES "GameVersion"(gmv_ID_PK) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Server" (
    srv_ID_PK SERIAL NOT NULL PRIMARY KEY UNIQUE,
    usr_ID_FK INT NOT NULL,
    gm_ID_FK INT NOT NULL,
    FOREIGN KEY(usr_ID_FK) REFERENCES "User"(usr_ID_PK) ON UPDATE CASCADE,
    FOREIGN KEY(gm_ID_FK) REFERENCES "Game"(gm_ID_PK) ON UPDATE CASCADE
);
