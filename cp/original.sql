


BEGIN
DECLARE @P1 varchar(2);DECLARE @P2 varchar(6);DECLARE @P3 varchar(6);DECLARE @P4 varchar(3);DECLARE @P5 varchar(3);DECLARE @P6 varchar(8);DECLARE @P7 datetime;DECLARE @P8 varchar(7);DECLARE @P9 varchar(12);DECLARE @P10 varchar(1);DECLARE @P11 varchar(1);

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


        declare @company varchar(10)= @P1 ,@distributor varchar(10)= @P2 ,@town varchar(6)= @P3 ,@locality varchar(3)= @P4 ,
        @slocality varchar(3)= @P5 ,@pop varchar(10)= @P6, @date datetime= @P7 , @sku varchar(max) = @P8,@DOC_NO varchar(12)=@P9,@isTestPJP varchar(1)=@P10,@LoadToolOfTradeoFlag varchar(1)=@P11
        ,@DOCUMENT VARCHAR(2)='CM',@SUB_DOCUMENT VARCHAR(2)='01',@CASHMEMO_TYPE VARCHAR(2)='19',@VISIT_TYPE VARCHAR(2)='02',@SR_VISIT_TYPE VARCHAR(2)='88',@ISTEST_DT bit=0;

        SELECT @ISTEST_DT=value_comb FROM DISTRIBUTOR_ASSOCIATION WHERE COMPANY = @COMPANY AND DISTRIBUTOR = @DISTRIBUTOR AND 
        FIELD_COMB = 'TEST_DIST' AND VALUE_COMB = '1' 
        
        
        if OBJECT_ID('tempdb..#TEMP_POP_ATR') is not null
        drop table #TEMP_POP_ATR;
        
        if OBJECT_ID('tempdb..#finalschemes') is not null
        drop table #finalschemes;
        
        
        if OBJECT_ID('tempdb..#TEMP_SKU_ATR') is not null
        drop table #TEMP_SKU_ATR;
        
        
        if OBJECT_ID('tempdb..#TEMP_SCH_POP') is not null
        drop table #TEMP_SCH_POP;
        
        
        if OBJECT_ID('tempdb..#ps') is not null
        drop table #ps;
        
        if OBJECT_ID('tempdb..#TEMPSCHEME') is not null
        drop table #TEMPSCHEME;
        
        
        if OBJECT_ID('tempdb..#POP_PROGRAM_TYPES') is not null
        drop table #POP_PROGRAM_TYPES;
        
        
        
        SELECT P.COMPANY, P.DISTRIBUTOR, P.TOWN, P.LOCALITY, P.SLOCALITY, P.POP, SL.LSM, P.POPTYPE, se.master_channel, se.channel, se.sub_channel, se.element, ISNULL(PH.SUB_ELEMENT,P.SUB_ELEMENT) SUB_ELEMENT, ISNULL(PH.PRODUCT_RANK,P.COMPANY_RANK) COMPANY_RANK , P.RANK, T.DISTRICT, T.STRATA, T.PROVINCE
        , GT.GEOCODE GEO_CODE, GT.GEO1 GEO_LEVEL1, GT.GEO2 GEO_LEVEL2, GT.GEO3 GEO_LEVEL3
        , GT.GEO4 GEO_LEVEL4, GT.GEO5 GEO_LEVEL5, GT.GEO6 GEO_LEVEL6, GT.GEO7 GEO_LEVEL7, GT.GEO8 GEO_LEVEL8, GT.GEO9 GEO_LEVEL9,ISNULL(PH.PERFECT_STORE_LEVEL,P.PERFECT_STORE_LEVEL) PERFECT_STORE_LEVEL,DD.DIST_TYPE
        , '01' PARAMETER1 
        , P.AREATYPE PARAMETER3 
        , P.DISTRIBUTOR PARAMETER4 
        , GT.GEO1 PARAMETER5 
        , ISNULL(P.ASSET_SCHEME,0)ASSET_SCHEME
        , CAST('' AS VARCHAR(3)) A0, CAST('' AS VARCHAR(3)) A1, CAST('' AS VARCHAR(3)) A2
        , CAST('' AS VARCHAR(3)) A3, CAST('' AS VARCHAR(3)) A4, CAST('' AS VARCHAR(3)) A5
        , CAST('' AS VARCHAR(3)) A6, CAST('' AS VARCHAR(3)) A7, CAST('' AS VARCHAR(3)) A8, CAST('' AS VARCHAR(3)) A9
        INTO #TEMP_POP_ATR
        FROM 
            POP P 
        LEFT JOIN POP_HANDLER PH
        ON P.COMPANY=PH.COMPANY AND P.DISTRIBUTOR=PH.DISTRIBUTOR AND P.TOWN=PH.TOWN AND P.LOCALITY=PH.LOCALITY AND P.SLOCALITY=PH.SLOCALITY AND P.POP=PH.POP
        INNER JOIN 
            DISTRIBUTOR DD ON DD.COMPANY = P.COMPANY AND DD.DISTRIBUTOR = P.DISTRIBUTOR
        INNER JOIN 
            SUB_LOCALITY SL ON P.COMPANY = SL.COMPANY AND P.TOWN = SL.TOWN AND P.LOCALITY = SL.LOCALITY  AND P.SLOCALITY = SL.SLOCALITY 
        and p.company = @company and p.distributor = @distributor and p.town = @town and p.locality = @locality and p.SLOCALITY = @slocality and p.POP = @pop
        INNER JOIN 
            TOWN T ON P.COMPANY = T.COMPANY AND P.TOWN = T.TOWN
        left join 
            sub_element se on se.company = p.company and se.sub_element = p.sub_element
        LEFT JOIN 
            GEO_TABLE GT ON GT.COMPANY = T.COMPANY AND GT.GEOCODE = T.GEOCODE
        where p.company = @company and p.distributor = @distributor and p.town = @town and p.locality = @locality and p.SLOCALITY = @slocality and p.POP = @pop
        
        
        ALTER TABLE #TEMP_POP_ATR ADD PRIMARY KEY (COMPANY,DISTRIBUTOR,TOWN,LOCALITY,SLOCALITY,POP);
        
        UPDATE A SET 
        A.A0 = isnull(B.A0,''), A.A1 = isnull(B.A1,''), A.A2 = isnull(B.A2,''), A.A3 = isnull(B.A3,''), A.A4 = isnull(B.A4,'')
        , A.A5 = isnull(B.A5,''), A.A6 = isnull(B.A6,''), A.A7 = isnull(B.A7,''), A.A8 = isnull(B.A8,''), A.A9 = isnull(B.A9,'')
        FROM #TEMP_POP_ATR A INNER JOIN (
        SELECT COMPANY,DISTRIBUTOR,TOWN,LOCALITY,SLOCALITY,POP
        , [0] A0, [1] A1, [2] A2, [3] A3, [4] A4, [5] A5, [6] A6, [7] A7, [8] A8, [9] A9
        FROM (
        SELECT P.COMPANY , P.DISTRIBUTOR, P.TOWN, P.LOCALITY, P.SLOCALITY, P.POP
        , ROW_NUMBER() OVER(PARTITION BY P.COMPANY , P.DISTRIBUTOR, P.TOWN, P.LOCALITY, P.SLOCALITY, P.POP ORDER BY PA.ACCOUNT_TYPE) -1 RN
        , PA.ACCOUNT_TYPE 
        FROM POP P 
        LEFT JOIN POP_ACCOUNT PA 
        ON P.COMPANY = PA.COMPANY AND P.DISTRIBUTOR = PA.DISTRIBUTOR 
        AND P.TOWN = PA.TOWN AND PA.LOCALITY = P.LOCALITY AND PA.SLOCALITY = P.SLOCALITY AND PA.POP = P.POP
        where p.company=@company and p.distributor=@distributor and p.town=@town and p.locality=@locality and p.slocality=@slocality and p.pop=@pop
        ) UP PIVOT
        (
        MIN(ACCOUNT_TYPE) FOR RN IN ([0], [1], [2], [3], [4], [5], [6], [7], [8], [9])
        ) P
        ) B ON A.COMPANY = B.COMPANY AND A.DISTRIBUTOR = B.DISTRIBUTOR AND A.TOWN = B.TOWN AND A.LOCALITY = B.LOCALITY AND A.SLOCALITY = B.SLOCALITY AND A.POP = B.POP;
        
        
        
        SELECT distinct sc.SELL_CATEGORY , m.SALE_GROUP , s.COMPANY SKU_COMPANY, S.SKU, S.MASTER_SKU,S.PROD1,S.PROD2,S.PROD3,S.PROD4,S.PROD5,S.PROD6,S.PROD7,S.PROD8,S.PROD9 
        , S.GST_REGISTERED PARAMETER2 , b.BATCH
        INTO #TEMP_SKU_ATR
        FROM SKU S inner join batch b on b.company = s.company and b.sku = s.sku 
        inner join master_sku m on m.company = s.company and m.master_sku = s.master_Sku
        inner join sku_category sc on s.company = sc.company and sc.distributor=@distributor and s.sku =  sc.sku
        where s.COMPANY=@company and  s.sku in (select data from utvfsplit(@sku,','))

        
        OPTION (MAXRECURSION 0)
        ;
        
        ALTER TABLE #TEMP_SKU_ATR ADD PRIMARY KEY (SKU_COMPANY,SKU,batch,sell_category);
        
        
        
        SELECT IDENTITY(BIGINT, 1, 1) ID ,ISNULL(CAST('' AS VARCHAR(40)),'') MP_CODE
        , ISNULL(CAST('' AS VARCHAR(20)),'') SEQ_ID
        , COMPANY,CAST(NULL AS INT)CM_COUNT_SCHEME
        , CAST(NULL AS INT)CM_COUNT_DISCOUNT
        INTO #TEMP_SCH_POP
        FROM #TEMP_POP_ATR 
        WHERE 1= 2;
        
        
        ALTER TABLE #TEMP_SCH_POP ADD PRIMARY KEY (ID,MP_CODE,SEQ_ID);
        
        
        DECLARE @PQRY VARCHAR(MAX)='', @SQRY VARCHAR(MAX)='';
        
        
        SELECT IDENTITY(BIGINT, 1, 1) ID,
          'INSERT INTO #TEMP_SCH_POP (MP_CODE,SEQ_ID
        , COMPANY,CM_COUNT_SCHEME
        ) SELECT  '''+ PS.PBS_MP_CODE +''' MP_CODE, '''+PS.PBS_SEQID+''' SEQ_ID
        , '''+ PS.company +''' COMPANY
        , '''+ cast(isnull(PS.CM_COUNT,0) as varchar(12))+''' CM_COUNT_SCHEME
        where exists (select 1 
        FROM #TEMP_POP_ATR A INNER JOIN #TEMP_SKU_ATR B ON a.COMPANY = b.SKU_COMPANY WHERE '+
        + CASE PS.PBS_LEVEL 
                                        WHEN '1' THEN 'PROD1'
                                        WHEN '2' THEN 'PROD1+PROD2'
                                        WHEN '3' THEN 'PROD1+PROD2+PROD3'
                                        WHEN '4' THEN 'PROD1+PROD2+PROD3+PROD4'
                                        WHEN '5' THEN 'PROD1+PROD2+PROD3+PROD4+PROD5'
                                        WHEN '6' THEN 'PROD1+PROD2+PROD3+PROD4+PROD5+PROD6'
                                        WHEN '7' THEN 'PROD1+PROD2+PROD3+PROD4+PROD5+PROD6+PROD7'
                                        WHEN '8' THEN 'PROD1+PROD2+PROD3+PROD4+PROD5+PROD6+PROD7+PROD8'
                                        WHEN '9' THEN 'PROD1+PROD2+PROD3+PROD4+PROD5+PROD6+PROD7+PROD8+PROD9'
                                        WHEN 'S' THEN 'SKU'
                                        WHEN 'M' THEN 'MASTER_SKU'
                                        WHEN 'T' THEN ''''+PBS_CODE+''''
        /*END +  ' = ''' +PS.PBS_CODE + '''' + CASE ISNULL(MV.VARIABLE_VALUE,'') WHEN '' THEN '' ELSE ' AND ' + MV.VARIABLE_VALUE END  +')'   qry*/
        END +  ' = ''' +PS.PBS_CODE + '''' + CASE CAST(ISNULL(MV.VARIABLE_VALUE,'') AS VARCHAR(MAX)) WHEN '' THEN '' ELSE ' AND ' + CAST(MV.VARIABLE_VALUE AS VARCHAR(MAX)) END  +')' qry                  
        into #ps
        FROM PB_SETUP PS 
        LEFT JOIN MEMORY_VARIABLE MV 
        ON PS.COMPANY = MV.COMPANY AND PS.PBS_MP_CODE = MV.MAIN_PROCESS 
        AND PS.pbs_seqid = MV.SEQ_ID 
        AND MV.variable_name = 'WHERE_SUM'
        WHERE PS.COMPANY=@COMPANY AND
        @DATE BETWEEN PS.PBS_PERIOD_FR AND PS.PBS_PERIOD_TO AND PS.PBS_EXPIRE=0 AND PS.PBS_SCHEME_TYPE<>'O' AND PS.PBS_MP_CODE <> '666'
        AND ( 
                (PS.TEST_SCHEME IS NULL OR PS.TEST_SCHEME = 0 ) 
                OR 
                (PS.TEST_SCHEME = 1 AND @ISTEST_DT=1)
                OR 
                ('1' = @isTestPJP and ps.CREATED_AT='O')
            )
        
        AND (
                ISNULL(PS.ALLOCATION_HRKY,'')='' 
                OR 
                (ISNULL(PS.ALLOCATION_HRKY,'')<>'' AND EXISTS (SELECT 1 FROM SCHEME_ALLOCATION_ONSALE B WHERE PS.COMPANY=B.COMPANY AND PS.PBS_MP_CODE=B.MP_CODE AND PS.PBS_SEQID=B.SEQ_ID AND B.FIELD_COMB LIKE '%DISTRIBUTOR%' AND B.VALUE_COMB LIKE '%'+@distributor+'%' ))
            )
        
        AND (
                PBS_LEVEL <> 'S' 
                OR 
                ( PBS_LEVEL = 'S' AND EXISTS (SELECT 1 FROM #TEMP_SKU_ATR SA WHERE SA.SKU_COMPANY = PS.COMPANY AND SA.SKU = PS.PBS_CODE) ) 
            )
        
        and NOT EXISTS
                (SELECT 1 FROM DISTRIBUTOR_SCHEME B WHERE ps.COMPANY=B.COMPANY
                 AND ps.PBS_MP_CODE=B.PBS_MP_CODE AND ps.PBS_SEQID=B.PBS_SEQID 
                 AND B.DISTRIBUTOR=@DISTRIBUTOR AND B.PBS_EXPIRE_USER=1)
            AND 
            (
        (ISNULL(ps.POP_BASE_SCHEME,0)=1 AND EXISTS(SELECT 1 FROM SCHEME_POP A WHERE A.COMPANY=@COMPANY AND A.DISTRIBUTOR=@DISTRIBUTOR AND A.PBS_MP_CODE = ps.PBS_MP_CODE AND A.PBS_SEQID = ps.PBS_SEQID AND A.TOWN=@TOWN AND A.LOCALITY=@LOCALITY AND A.SLOCALITY=@SLOCALITY AND A.POP=@POP AND A.STATUS='I')) 
            OR 
            (isnull(Ps.POP_BASE_SCHEME,0)=0 AND NOT EXISTS(SELECT 1 FROM SCHEME_POP A WHERE A.COMPANY=@COMPANY AND A.DISTRIBUTOR=@DISTRIBUTOR and A.pbs_mp_code = ps.pbs_mp_code and A.PBS_SEQID = ps.PBS_SEQID AND A.TOWN=@TOWN AND A.LOCALITY=@LOCALITY AND A.SLOCALITY=@SLOCALITY AND A.POP=@POP AND A.STATUS='E'))                               
            ) 
        ; 
        
        
        
        ALTER TABLE #ps ADD PRIMARY KEY (ID);
        
        declare @id int =0;
        
        while exists (Select 1 from #ps )
        begin 
            set @id = @id + 1;
            select @pqry = qry from #ps where id = @id;
            EXEC (@PQRY);      
            delete from #ps where id = @id;
        
        end
        
        SELECT P.*,ST.SCHEME_INDEX,ST.SCHEME_FORMULA,A.CM_COUNT_SCHEME,CM_COUNT_DISCOUNT,ISNULL(B.ADJ_DOCUMENT,'CM')ADJ_DOCUMENT INTO #TEMPSCHEME FROM #TEMP_SCH_POP A
        INNER  JOIN PB_SETUP P ON A.COMPANY = P.COMPANY AND A.MP_CODE=P.PBS_MP_CODE AND  A.SEQ_ID =P.PBS_SEQID and ((@LoadToolOfTradeoFlag='0' and isnull(p.TOOL_OF_TRADE,0)<>1)or (@LoadToolOfTradeoFlag='1'))
        INNER  JOIN SCHEME_TYPE ST ON P.COMPANY = ST.COMPANY AND ST.SCHEME_TYPE = P.PBS_SCHEME_TYPE
        INNER JOIN DISCOUNT_TYPE B ON B.COMPANY=P.COMPANY AND B.DISCOUNT_TYPE=P.DISCOUNT_TYPE
        
        
        
        UPDATE P SET P.CM_COUNT_DISCOUNT = isnull(A.CM_COUNT,0)  FROM #TEMPSCHEME P
                            LEFT JOIN (
                            SELECT P.ID,P.MP_CODE , P.SEQ_ID ,P.COMPANY, count(1) CM_COUNT FROM #TEMP_SCH_POP P INNER JOIN  scheme_discount sd 
                            ON sd.company = p.company and sd.mp_code = p.mp_code AND sd.seq_id = p.seq_id and p.CM_COUNT_SCHEME > 0
                            INNER JOIN cashmemo cm ON sd.company = cm.company
                            AND sd.distributor = cm.distributor AND sd.document = cm.document AND sd.sub_document = cm.sub_document
                            AND sd.doc_no = cm.doc_no 
                            WHERE CM.COMPANY = @COMPANY AND  CM.DISTRIBUTOR=@DISTRIBUTOR AND CM.DOCUMENT = @DOCUMENT AND CM.SUB_DOCUMENT = @SUB_DOCUMENT AND CM.DOC_NO <> @DOC_NO
                            AND CM.TOWN =@TOWN AND CM.LOCALITY=@LOCALITY AND CM.SLOCALITY=@SLOCALITY AND CM.POP =@POP AND CM.VISIT_TYPE <> @SR_VISIT_TYPE  
                            AND NOT EXISTS (SELECT 1 FROM   CASHMEMO WHERE COMPANY = CM.COMPANY AND DISTRIBUTOR = CM.DISTRIBUTOR AND DOCUMENT=@DOCUMENT AND SUB_DOCUMENT <>@SUB_DOCUMENT 
                            AND REF_DOCUMENT = CM.DOCUMENT AND REF_SUB_DOCUMENT =CM.SUB_DOCUMENT AND REF_DOC_NO = CM.DOC_NO 
                            AND CASHMEMO_TYPE = @CASHMEMO_TYPE AND VISIT_TYPE=@VISIT_TYPE  ) GROUP BY P.ID,P.MP_CODE , P.SEQ_ID ,P.COMPANY )  A
                            ON P.PBS_MP_CODE = A.MP_CODE AND P.PBS_SEQID = A.SEQ_ID
                            
                            
                            
        UPDATE P SET P.CM_COUNT_DISCOUNT = ISNULL(P.CM_COUNT_DISCOUNT,0) + isnull(A.CM_COUNT,0)  FROM #TEMPSCHEME P
        LEFT JOIN (
        SELECT P.ID,P.MP_CODE , P.SEQ_ID ,P.COMPANY, COUNT(1) CM_COUNT FROM #TEMP_SCH_POP P INNER JOIN  SCHEME_SKU SD 
        ON SD.COMPANY = P.COMPANY AND SD.MP_CODE = P.MP_CODE AND SD.SEQ_ID = P.SEQ_ID and p.CM_COUNT_SCHEME > 0
        INNER JOIN CASHMEMO CM ON SD.COMPANY = CM.COMPANY
        AND SD.DISTRIBUTOR = CM.DISTRIBUTOR AND SD.DOCUMENT = CM.DOCUMENT AND SD.SUB_DOCUMENT = CM.SUB_DOCUMENT
        AND SD.DOC_NO = CM.DOC_NO 
        WHERE CM.COMPANY = @COMPANY AND  CM.DISTRIBUTOR=@DISTRIBUTOR AND CM.DOCUMENT = @DOCUMENT AND CM.SUB_DOCUMENT = @SUB_DOCUMENT AND CM.DOC_NO <> @DOC_NO
        AND CM.TOWN =@TOWN AND CM.LOCALITY=@LOCALITY AND CM.SLOCALITY=@SLOCALITY AND CM.POP =@POP AND CM.VISIT_TYPE <> @SR_VISIT_TYPE  
        AND NOT EXISTS (SELECT 1 FROM   CASHMEMO WHERE COMPANY = CM.COMPANY AND DISTRIBUTOR = CM.DISTRIBUTOR AND DOCUMENT=@DOCUMENT AND SUB_DOCUMENT <>@SUB_DOCUMENT 
        AND REF_DOCUMENT = CM.DOCUMENT AND REF_SUB_DOCUMENT =CM.SUB_DOCUMENT AND REF_DOC_NO = CM.DOC_NO 
        AND CASHMEMO_TYPE = @CASHMEMO_TYPE AND VISIT_TYPE=@VISIT_TYPE  ) GROUP BY P.ID,P.MP_CODE , P.SEQ_ID ,P.COMPANY )  A
        ON P.PBS_MP_CODE = A.MP_CODE AND P.PBS_SEQID = A.SEQ_ID
                            
                
        ;WITH VARIANT AS(
        SELECT A.COMPANY, A.PBS_MP_CODE,A.PBS_SEQID FROM #TEMPSCHEME A 
        INNER JOIN SCHEME_VARIANT  B ON A.COMPANY=B.COMPANY AND A.PBS_MP_CODE=B.MP_CODE  AND A.PBS_SEQID=B.SEQ_ID 
        GROUP BY A.COMPANY,A.PBS_MP_CODE,A.PBS_SEQID
        )
        
        SELECT @DISTRIBUTOR  DISTRIBUTOR,A.PBS_MP_CODE,A.PBS_SEQID,A.PBS_LEVEL,A.PBS_CODE,A.PBS_PERIOD_FR,A.PBS_PERIOD_TO,A.PBS_PROCEDURE,A.PBS_SCHEME_ID,A.PBS_SCHEME_TYPE,SCHEME_ON_UNIT,A.LPPC,A.SCHEME_FORMULA,A.COMPANY,A.ALLOCATION_ON,A.ALLOCATION_HRKY,A.TOOL_OF_TRADE,A.NPD_LAUNCH,A.SCHEME_INDEX,A.ADJ_DOCUMENT
        ,B.COMPANY VARIANT_BASED_SCHEME,A.TEST_SCHEME,A.CM_QUOTA_BASE_SCHEME,mvd.operator,mv.variable_value
        into #finalSchemes FROM  #TEMPSCHEME A
        LEFT JOIN VARIANT B ON A.COMPANY=B.COMPANY AND A.PBS_MP_CODE=B.PBS_MP_CODE  AND A.PBS_SEQID=B.PBS_SEQID 
        left join memory_variable mv on mv.company=a.company and mv.main_process=a.pbs_mp_code and mv.seq_id=a.pbs_Seqid and mv.variable_name='where_qpd_pt'
        left join memory_variable_detail mvd on mvd.company=a.company and mvd.main_process=a.pbs_mp_code and mvd.seq_id=a.pbs_Seqid and mvd.tablename='QPD_PROGRAM_TYPE'
        
        WHERE 
                    (
                             A.CM_COUNT_scheme = 0 or A.CM_COUNT_scheme is null                   
                             or  A.CM_COUNT_scheme > A.CM_COUNT_DISCOUNT
                )     
        ORDER BY A.SCHEME_INDEX, A.PBS_LEVEL, A.PBS_MP_CODE , A.PBS_SEQID;
        
        
        
        IF EXISTS(SELECT 1 FROM #FINALSCHEMES WHERE ISNULL(VARIABLE_VALUE,'')<>'')
        BEGIN
        
        TRUNCATE TABLE #TEMP_SCH_POP;
        TRUNCATE TABLE #ps;
        
        SELECT DISTINCT @COMPANY COMPANY,@DISTRIBUTOR DISTRIBUTOR,@TOWN TOWN,@LOCALITY LOCALITY,@SLOCALITY SLOCALITY,@POP POP,a.program_type INTO #POP_PROGRAM_TYPES FROM QPD_PROGRAM A 
        WHERE A.COMPANY=@COMPANY  AND A.STATUS='A' AND @DATE BETWEEN A.PERIOD_FROM AND A.PERIOD_TO 
        AND EXISTS (SELECT 1 FROM QPD_POP_ENROLMENT B WHERE A.COMPANY=B.COMPANY AND A.PROGRAM_ID=B.PROGRAM_ID AND B.DISTRIBUTOR=@DISTRIBUTOR AND B.TOWN=@TOWN AND B.LOCALITY=@LOCALITY AND B.SLOCALITY=@SLOCALITY 
        AND B.POP=@POP AND B.ENROLED=1)
        
        
        
        INSERT INTO #PS(QRY)
        SELECT 'INSERT INTO #TEMP_SCH_POP (MP_CODE,SEQ_ID,COMPANY) 
        SELECT  '''+ PS.PBS_MP_CODE +''' MP_CODE, '''+PS.PBS_SEQID+''' SEQ_ID, '''+ company +''' COMPANY
        where '+CASE WHEN operator='=' THEN' EXISTS ' ELSE ' not exists ' END+' (select 1 FROM #POP_PROGRAM_TYPES WHERE'+CASE WHEN operator='<>' THEN ' not ' else '' end+'( ' + CAST(variable_value AS VARCHAR(MAX))  +'))' qry                  
        FROM #finalSchemes PS 
        WHERE ISNULL(variable_value,'')<>''; 
        
        
        
        SET @id =0;
        
        WHILE EXISTS (SELECT 1 FROM #PS)
        BEGIN 
               SET @ID = @ID + 1;
               SELECT @PQRY = QRY FROM #PS WHERE ID = @ID;     
               exec (@PQRY);      
               DELETE FROM #PS WHERE ID = @ID;
        
        END
        
        
        select a.* from #finalSchemes a 
        where ((ISNULL(a.VARIABLE_VALUE,'')<>'' and exists (select 1 from #TEMP_SCH_POP b where a.COMPANY=b.COMPANY and a.pbs_mp_code=b.mp_code and a.pbs_seqid=b.seq_id))or(ISNULL(a.VARIABLE_VALUE,'')=''))
        
        END
        
        ELSE
        BEGIN
        
        SELECT * FROM #FINALSCHEMES
        
        END
        
        
        
END