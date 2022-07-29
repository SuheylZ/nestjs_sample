
if NOT EXISTS(OBJECT_ID(psid))
BEGIN
  create sequence psid AS INT  start with 1 CYCLE CaCHE 2000
END


-- select Next value for psid
-- drop sequence psid
-- go
