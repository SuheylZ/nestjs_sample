/*
*   Solution to the PnG Query
*/


-- create index idx_distributor_association on DISTRIBUTOR_ASSOCIATION ( Company, distributor, field_comb) INCLUDE (value_comb)
-- create index idx_pop_cd on POP (Pop, Company, Distributor) INCLUDE (company_rank,rank, perfect_store_level,  ASSET_SCHEME )
-- create index idx_pop_loc on Pop(Town, Locality, SLocality, Pop) INCLUDE (Areatype, sub_element, Poptype )
-- create index idx_sublocality on Sub_locality (Company, Town , Locality, SLocality)
-- create index idx_geo_table on geo_table (company, geocode) INCLUDE (geo1, geo2, geo3, geo4, geo5, geo6, geo7, geo8,  geo9)

/*
*  Tier 2
*/

create index idx_distributor_association on DISTRIBUTOR_ASSOCIATION ( Company, distributor, field_comb) INCLUDE (value_comb)
create index idx_pop_cd on POP (Pop, Company, Distributor, town, locality, slocality) INCLUDE (sub_element, Areatype, Poptype, company_rank,rank, perfect_store_level, ASSET_SCHEME )
create index idx_pop_loc on Pop(Town, Locality, SLocality, Pop) INCLUDE (Areatype, sub_element, Poptype )
create index idx_sublocality on Sub_locality (Company, Town , Locality, SLocality) INCLUDE (LSM)
create index idx_geo_table on geo_table (company, geocode) INCLUDE (geo1, geo2, geo3, geo4, geo5, geo6, geo7, geo8,  geo9)
create index idx_sub_element on sub_element (company, sub_element) include (master_channel, channel, sub_channel, element)
create index idx_town on town (company, town) INCLUDE (district, strata, province)
create index idx_distributor on distributor (company, distributor, dist_type)
create index idx_pop_handler on pop_handler (company, distributor, town, locality, slocality, pop) INCLUDE (sub_element, product_rank, perfect_store_level)
create index idx_pop_account on POP_ACCOUNT (company, distributor, town, locality, slocality, pop)
create index idx_sku_1 on sku (company) include (sku, master_sku, prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, GST_REGISTERED)
create index idx_memory_variable on memory_variable (variable_name, main_process, seq_id, company) include (variable_value)
create index idx_cashmemo on cashmemo (Company, Distributor) INCLUDE (Document, sub_document, ref_document, ref_sub_document, ref_doc_no, doc_no, cashmemo_type, visit_type)
create index idx_scheme_variant on SCHEME_VARIANT (company, mp_code, seq_id)

create index idx_pb_setup_1 on PB_SETUP (Company, pbs_mp_code, pbs_seqid) INCLUDE (tool_of_trade, pbs_scheme_type, DISCOUNT_TYPE, pbs_period_fr, pbs_period_to, PBS_EXPIRE, pbs_level, pbs_code, ALLOCATION_HRKY, CM_COUNT, POP_BASE_SCHEME)

create nonclustered index idx_scheme_type_1 on scheme_type(company, scheme_type) INCLUDE (scheme_index, SCHEME_FORMULA)

