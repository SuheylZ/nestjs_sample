
/*
DECLARE 
  @P1 varchar(2),  @P2 varchar(6), @P3 varchar(6), @P4 varchar(3),
  @P5 varchar(3),  @P6 varchar(8), @P7 datetime, @P8 varchar(7), @P9 varchar(12),
  @P10 varchar(1), @P11 varchar(1);

SET @P1='01';
SET @P2='021314';
SET @P3='000369';
SET @P4='032';
SET @P5='002';
SET @P6='00011816';
SET @P7='2022-06-24T00:00:00.000Z';
SET @P8='1780288';
SET @P9='';
SET @P10='0';
SET @P11='1';

EXEC dbo.calculateSchemes @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10, @P11
*/

EXEC dbo.calculateSchemes '01','021314','000369','032','002','00011816','20220624','1780288','','0','1'
EXEC dbo.calculateSchemes '01','021314','000369','035','002','00011892','20220721','1761076','','0','1'

EXEC dbo.calculateSchemes '01','021314','000369','035','002','00011892','20220721','1780412','','0','1'

EXEC dbo.calculateSchemes '01','021314','000369','035','002','00011892','20220721','1760967','','0','1'
EXEC dbo.calculateSchemes '01','021314','000369','022','006','00011790','20220721','1770720','','0','1'
EXEC dbo.calculateSchemes '01','021314','000369','022','006','00011790','20220721','1782522','','0','1'