-- GEDCOM INSERT statements

INSERT INTO persons(id,sex,birth_date_raw,death_date_raw) VALUES('@I1@','M','2 Oct 1822','from 1900 to 1905');
INSERT INTO person_names(person_id,name_text) VALUES('@I1@','Robert Eugene /Williams/');
INSERT INTO persons(id,sex,birth_date_raw,death_date_raw) VALUES('@I2@','F','BEF 1828','');
INSERT INTO person_names(person_id,name_text) VALUES('@I2@','Mary Ann /Wilson/');
INSERT INTO persons(id,sex,birth_date_raw,death_date_raw) VALUES('@I3@','M','16 Mar 1864','');
INSERT INTO person_names(person_id,name_text) VALUES('@I3@','Joe /Williams/');
INSERT INTO families(id,husband_id,wife_id,marriage_date_raw,divorce_date_raw) VALUES('@F1@','@I1@','@I2@','Dec 1859','');
INSERT INTO family_members(family_id,person_id,role) VALUES('@F1@','@I3@','CHILD');
INSERT INTO families(id,husband_id,wife_id,marriage_date_raw,divorce_date_raw) VALUES('@F2@','@I1@','','','');
INSERT INTO family_members(family_id,person_id,role) VALUES('@F2@','@I3@','CHILD');
