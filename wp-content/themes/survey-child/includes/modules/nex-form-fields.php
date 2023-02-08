<?php
defined( 'ABSPATH' ) || exit;


function get_state_form_fields(){
	return $formLabelArray  =  array(
		"name_of_state_immunization_officer" => "1.2 Name of State Immunization Officer",
		"cd_phone_number" => "1.3 Contact Details | Phone number",
		"cd_email_address" => "1.3 Contact Details | Email address",
		"cd_address" => "1.3 Contact Details | Address",

		"total_no_of_districts_in_the_state" => "2.1. Total no. of districts in the state",
		"total_no_of_blocks_in_the_state" => "2.2. Total no. of blocks in the State",
		"total_no_of_sub-centres_in_the_state" => "2.3. Total no. of sub-centres in the State",
		"number_of_niti_aayog_aspirational_districts_identified_in_the_state" => "2.4. a) Number of NITI Aayog aspirational districts identified in the state?",
		"names_of_the_identified_aspirational_districts_in_the_state[]" => "2.4. b) Names of the identified aspirational districts in the state",
		"how_many_districts_do_not_have_dio_designated_mo_in_position" => "2.5. a) How many districts do not have DIO/ designated MO in position?",
		"names_of_districts_without_dio_designated_mo" =>"2.5. b) Names of districts without DIO/ designated MO",
		"how_many_districts_dios_do_not_have_computer_assistants" => "2.6. a) How many districts’ DIOs do not have Computer Assistants?",
		"name_of_districts_which_do_not_have_computer_assistants_for_dios" => "2.6. b) Name of districts which do not have computer assistants for DIOs?",

		"total_population_of_state"=>"3.1. Demographic data as mentioned in PIP 2020-21 | Total population of state",
		"total_population_of_state[]"=>"3.1. Demographic data as mentioned in PIP 2020-21 | Total population of state | Other",
		"total_population_of_state_text"=>"3.1. Demographic data as mentioned in PIP 2020-21 |Total population of state Other",
		"total_no_of_infants"=>"3.1. Demographic data as mentioned in PIP 2020-21 | Total no of infants",
		"total_no_of_infants[]"=>"3.1. Demographic data as mentioned in PIP 2020-21 | Total no of infants | Other",
		"total_no_of_infants_text"=>"3.1. Demographic data as mentioned in PIP 2020-21 | Total no of infants Other",
		"state_immunization_coverage_penta_1_dpt_1_hmis"=>"3.2. State immunization coverage | % Coverage | Reported (HMIS) 2019-20 | Penta 1/DPT 1",
		"penta_1dpt_1_reported[]"=>"3.2. State immunization coverage | % Coverage | Reported (HMIS) 2019-20 | Penta 1/DPT 1 | Other",
		"penta_1dpt_1_reported_text"=>"3.2. State immunization coverage | % Coverage | Reported (HMIS) 2019-20 | Penta 1/DPT 1 Other",
		"penta_1dpt_1_monitored_text"=>"3.2. State immunization coverage | % Coverage | Monitored* (Concurrent monitoring) 2019-20 | Penta 1/DPT 1",
		"penta_1dpt_1_remarks"=>"3.2. State immunization coverage | Remarks | Penta 1/DPT 1",

		"penta_1dpt_1_evaluated_text"=>"3.2. State immunization coverage | % Coverage | Evaluated (NFHS-4) | Penta 1/DPT 1",
		
		
		"state_immunization_coverage_penta_3_dpt_3_hmis"=>"3.2. State immunization coverage | % Coverage | Reported (HMIS) 2019-20 |Penta 3/ DPT 3",

		"penta_3dpt_3_reported[]"=>"3.2. State immunization coverage | % Coverage | Reported (HMIS) 2019-20 | Penta 3/ DPT 3 | Other",
		"penta_3dpt_3_reported_text"=>"3.2. State immunization coverage | % Coverage | Reported (HMIS) 2019-20 | Penta 3/ DPT 3 Other",

		"state_immunization_coverage_penta_3_dpt_3_nfhs4"=>"3.2. State immunization coverage | % Coverage | Evaluated (NFHS-4) | Penta 3/ DPT 3",
		"penta_3dpt_3_evaluated[]"=>"3.2. State immunization coverage | % Coverage | Evaluated (NFHS-4) | Penta 3/ DPT 3 | Other",
		"penta_3dpt_3_evaluated_text"=>"3.2. State immunization coverage | % Coverage | Evaluated (NFHS-4) | Penta 3/ DPT 3 Other",
		"penta_3dpt_3_monitored_text"=>"3.2. State immunization coverage | % Coverage | Monitored* (Concurrent monitoring) 2019-20 | Penta 3/ DPT 3",
		"penta_3dpt_3_remarks"=>"3.2. State immunization coverage | Remarks | Penta 3/DPT 3",

		"state_immunization_coverage_mr1_measles_hmis"=>"3.2. State immunization coverage | % Coverage | Reported (HMIS) 2019-20 |MR 1/ Measles",
		"mr_1_measles_reported[]"=>"3.2. State immunization coverage | % Coverage | Reported (HMIS) 2019-20 |MR 1/ Measles | Other",
		"mr_1_measles_reported_text"=>"3.2. State immunization coverage | % Coverage | Reported (HMIS) 2019-20 |MR 1/ Measles Other",
		"state_immunization_coverage_mr1_measles_nfhs4"=>"3.2. State immunization coverage | % Coverage | Evaluated (NFHS-4) | MR 1/ Measles",
		"mr_1_measles_evaluated[]"=>"3.2. State immunization coverage | % Coverage | Evaluated (NFHS-4) | MR 1/ Measles | Other",
		"mr_1_measles_evaluated_text"=>"3.2. State immunization coverage | % Coverage | Evaluated (NFHS-4) | MR 1/ Measles Other",
		"mr_1_measles_monitored_text"=>"3.2. State immunization coverage | % Coverage | Monitored* (Concurrent monitoring) 2019-20 | MR 1/ Measles",
		"mr_1_measles_remarks"=>"3.2. State immunization coverage | Remarks | MR 1/ Measles",

		"state_drop_out_rates_penta_1_dpt_1_hmis"=>"3.3. State drop-out rates 2019-20 | Drop-out rate (HMIS) | Penta-1 to Penta-3",
		"penta_1_to_penta_3_drop_out_rate[]"=>"3.3. State drop-out rates 2019-20 | Drop-out rate (HMIS) | Penta-1 to Penta-3 | Other",
		"penta_1_to_penta_3_drop_out_rate_text"=>"3.3. State drop-out rates 2019-20 | Drop-out rate (HMIS) | Penta-1 to Penta-3 Other",
		"penta_1_to_penta_3_drop_out_rate_remarks"=>"3.3. State drop-out rates 2019-20 | Remarks | Penta-1 to Penta-3",

		"state_drop_out_rates_Penta_3_1_to_mr_1_hmis"=>"3.3. State drop-out rates 2019-20 | Drop-out rate (HMIS) | Penta 3-1 to MR 1",
		"penta_3_1_to_mr_1_drop_out_rate[]"=>"3.3. State drop-out rates 2019-20 | Drop-out rate (HMIS) | Penta 3-1 to MR 1 | Other",
		"penta_3_1_to_mr_1_drop_out_rate_text"=>"3.3. State drop-out rates 2019-20 | Drop-out rate (HMIS) | Penta 3-1 to MR 1 Other",
		"penta_3_1_to_mr_1_drop_out_rate_remarks"=>"3.3. State drop-out rates 2019-20 | Remarks | Penta 3-1 to MR 1",
		"additional_commentsremarks_step2"=>"Additional comments/remarks",

		"no_of_districts_that_have_submitted_updated_ri_micro-plans_to_state_for_2020_21"=>"4.1 No. of districts that have submitted updated RI micro-plans to state for 2020-21",

		"names_of_districts_yet_to_submit_updated_micro_plan"=>"4.2 Names of districts yet to submit updated micro-plan",

		"sessions_held_against_planned_as_per_hmis_during_2019_20_others[]"=>"4.3 % sessions held against planned as per HMIS during 2019-20 | Other",
		"sessions_held_against_planned_as_per_hmis_during_2019_20"=>"4.3 % sessions held against planned as per HMIS during 2019-20",
		"sessions_held_against_planned_as_per_hmis_during_2019_20_text"=>"4.3 % sessions held against planned as per HMIS during 2019-20 Other",

		"total_number_of_hras_in_the_state_as_per_polio_programme_2020_21"=>"4.4 Total number of HRAs in the state as per polio programme (2020-21)",

		"number_of_districts_identified_for_intensified_mission_indradhanush_2021"=>"5.1 Number of districts identified for Intensified Mission Indradhanush (2021)",
		"number_of_sessions_planned_in_intensified_mission_indradhanush_2021"=>"5.2 Number of sessions planned in Intensified Mission Indradhanush (2021)",
		"how_many_districts_have_completed_inclusion_of_additional_sessions_identified_under_imi_in_routine_immunization_microplans"=>"5.3 How many districts have completed inclusion of additional sessions identified under IMI in routine immunization microplans?",

		"is_there_a_mechanism_in_place_at_the_state_level_to_train_and_orient_the_newly_posted_dios"=>"6.1 Is there a mechanism in place at the state level to train and orient the newly posted DIOs?",

		"number_of_dios_that_have_not_undergone_orientation_on_immunization_during_2019_20" => "6.2 Number of DIOs that have not undergone orientation on immunization during 2019-20",

		"name_of_districts_where_the_dio_is_not_trained_on_routine_immunization" => "6.3 Name of districts where the DIO is not trained on routine immunization",

		"has_the_state_organized_medical_officers_training_on_immunization_using_mo_handbook_during__2019-20"=>"6.4 Has the state organized medical officers’ training on immunization using MO Handbook during 2019-20",

		"no_of_training_sessions_batches_conducted"=>"No of training sessions batches conducted",
		"no_of_medical_officers_trained"=>"No of medical officers trained",
		"out_of"=>"Out of",

		"has_the_state_organized_two_day_health_workers_training_during_2019_20" => "6.5 Has the state organized two-day health workers’ training during 2019-20 ?",
		"number_of_anms_trained_in_2019_20"=>"Number of anms trained in 2019 20",
		"out_of_total"=>"Out of total",

		"recording_reporting_formats_and_registers_will_be_updated_and_printed_before_date" => "7.1 Provide timeline for updating and printing registers/formats (ANM tally sheets, due lists, RCH register) and MCP card containing PCV information before its introduction",

		"mcp_card_will_be_updated_and_printed_before"=>"MCP card will be updated and printed before date",

		"has_state_issued_any_instructions_to_districts_to_check_availability_of_one_tracking_bag_per_session_site_to_facilitate_tracking_by_anm_asha_and_aww"=>"7.2 Has state issued any instructions to districts to check availability of one tracking bag per session site to facilitate tracking by ANM, ASHA and AWW?",

		"coverage_monitoring_chart_is_cumulative_immunization_coverage_and_drop_out_information_in_the_form_of_coverage_monitoring_chart_being_used_for_program_monitoring_at_state_district_block_and_sub_center_levels-center_levels"=>"7.3 Coverage Monitoring Chart Is cumulative immunization coverage and drop out information in the form of coverage monitoring chart being used for program monitoring at state, district, block and sub-center levels?",

		"additional_commentsremarks_step7" => "Additional comments/remarks",

		"calculate_vaccine_wastage_for_penta_2018_19"=>"8.1 Based on the formula given below, calculate vaccine wastage for Penta 2018-19",

		"calculate_vaccine_wastage_for_penta_2019_20"=>"8.1 Based on the formula given below, calculate vaccine wastage for Penta 2019 20",

		"reported_highest_penta_wastage_during_2019_20_name_1"=>"8.2 Name two districts which reported highest Penta wastage during 2019-20 | Name of district 1",
		"reported_highest_penta_wastage_during_2019_20_name_2"=>"8.2 Name two districts which reported highest Penta wastage during 2019-20 | Name of district 2",
		"reported_highest_penta_wastage_during_2019_20_wastage_1"=>"8.2 Name two districts which reported highest Penta wastage during 2019-20 | % wastage 1",
		"reported_highest_penta_wastage_during_2019_20_wastage_2"=>"8.2 Name two districts which reported highest Penta wastage during 2019-20 | % wastage 2",

		"reported_least_penta_wastage_during_2019_20_name_1"=>"8.3 Names of two districts which reported the least Penta wastage during 2019-20 | Name of district 1",
		"reported_least_penta_wastage_during_2019_20_name_2"=>"8.3 Names of two districts which reported the least Penta wastage during 2019-20 | Name of district 2",
		"reported_least_penta_wastage_during_2019_20_wastage_1"=>"8.3 Names of two districts which reported the least Penta wastage during 2019-20 | % wastage 1",
		"reported_least_penta_wastage_during_2019_20_wastage_2"=>"8.3 Names of two districts which reported the least Penta wastage during 2019-20 | % wastage 2",

		"additional_commentsremarks_step8"=>"Additional comments/remarks",


		"what_formula_do_you_use_to_forecast_vaccine_requirements[]"=>"9.1 What formula do you use to forecast vaccine requirements? | Formula: Basis of projections",

		"what_formula_do_you_use_to_forecast_vaccine_requirements_others"=>"9.1 What formula do you use to forecast vaccine requirements? | Formula: Basis of projections Others",

		"no_of_vaccine_vans_at_state_level"=>"9.2 Vaccine vans provided to each district by the state",

		"no_of_vaccine_vans_available_at_state_level_that_are_functional"=>"9.2.1 No. of vaccine vans available at state level that are functional",

		"no_of_vaccine_vans_available_in_the_districts"=>"9.2.2 No. of vaccine vans available in the districts",

		"no_of_vaccine_vans_in_functional_condition_in_the_districts"=>"9.2.3 No. of vaccine vans in functional condition in the districts",

		"explain_vaccine_supply_mechanism_to_the_district_vaccine_store[]"=>"9.3 Explain vaccine supply mechanism to the district vaccine store",

		"has_there_been_shortagestock_out_of_the_following_vaccines_during_2018-19_rvv"=>"9.4 Has there been shortage/stock out of the following vaccines during 2018-19 | RVV",

		"has_there_been_shortagestock_out_of_the_following_vaccines_during_2018-19_pentavalent"=>"9.4 Has there been shortage/stock out of the following vaccines during 2018-19 | Pentavalent",

		"has_there_been_shortagestock_out_of_the_following_vaccines_during_2018-19_any_other_vaccine"=>"9.4 Has there been shortage/stock out of the following vaccines during 2018-19",

		"yes_has_there_been_shortagestock_out_of_the_following_vaccines_during_2018-19_any_other_vaccine"=>"9.4 Has there been shortage/stock out of the following vaccines during 2018-19 | Any other vaccine (please specify)",

		"did_you_find_any_vaccine_beyond_expiry_date_during_field"=>"9.5 Did you find any vaccine beyond expiry date during field monitoring 2019-20",

		"did_you_find_any_vaccine_beyond_expiry_date_during_field_name_of_vaccine_1"=>"Name of vaccine 1",

		"did_you_find_any_vaccine_beyond_expiry_date_during_field_observed_in_1"=>"Observed in for vaccine 1",

		"did_you_find_any_vaccine_beyond_expiry_date_during_field_reason_1"=>"Reason for vaccine 1",

		"did_you_find_any_vaccine_beyond_expiry_date_during_field_action_taken_1"=>"Action taken for vaccine 1",

		"did_you_find_any_vaccine_beyond_expiry_date_during_field_name_of_vaccine_2"=>"Name of vaccine 2",
		"did_you_find_any_vaccine_beyond_expiry_date_during_field_observed_in_2"=>"Observed in for vaccine 2",
		"did_you_find_any_vaccine_beyond_expiry_date_during_field_reason_2"=>"Reason for vaccine 2",
		"did_you_find_any_vaccine_beyond_expiry_date_during_field_action_taken_2"=>"Action taken for vaccine 2",

		"did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non-usable_stage_during_field"=>"9.6 Did you find any vaccine with vaccine vial monitor in non-usable stage during field monitoring 2019-20",
		

		"did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non-usable_stage_during_field_name_of_vaccine_1"=>"Name of vaccine 1",

		"did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non-usable_stage_during_field_observed_in_1"=>"Observed in for vaccine 1",

		"did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non_usable_stage_during_field_reason_1"=>"Reason for vaccine 1",

		"did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non_usable_stage_during_field_action_taken_1"=>"Action taken for vaccine 1",

		"did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non_usable_stage_during_field_name_of_vaccine_2"=>"Name of vaccine 2",

		"did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non-usable_stage_during_field_observed_in_2"=>"Observed in for vaccine 2",

		"did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non_usable_stage_during_field_reason_2"=>"Reason for vaccine 2",

		"did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non_usable_stage_during_field_action_taken_2"=>"Action taken for vaccine 2",

		"please_share_the_details_of_alternate_vaccine_delivery_avd_mechanism_working_in_the_state"=>"9.7 Please share the details of Alternate Vaccine Delivery (AVD) mechanism working in the state?",

		"additional_commentsremarks_step9" => "Additional comments/remarks",


		"what_is_the_mechanism_of_waste_disposal_system_in_districts"=>"10.1 What is the mechanism of waste disposal system in districts?",

		"what_is_the_mechanism_of_waste_disposal_system_in_districts_others"=>"10.1 What is the mechanism of waste disposal system in districts? others",

		"is_there_any_inventory_of_hub_cutters_at_the_state_level"=>"10.2 Is there any inventory of hub cutters at the state level?",
		"is_there_any_inventory_of_hub_cutters_at_the_state_level_numbers"=>"10.2 Inventory of hub cutters at the state level Number",
		"what_is_the_mechanism_for_replacement_of_hub_cutters_in_districts"=>"10.3 What is the mechanism for replacement of hub cutters in districts?",

		"additional_commentsremarks_step10"=>"Additional comments/remarks",

		"is_there_a_technical_routine_immunization_cell_at_the_state_level"=>"11.1 Is there a technical routine immunization cell at the state level?",
		"specify_no_of_technical_officersconsultants_supporting_the_cell"=>"Specify no of technical officersconsultants supporting the cell",

		"in_the_last_6_months_how_many_supervisory_visits_were_made_by_you_your_office_in_the_districts_for_immunization_activities"=>"11.2 In the last 6 months, how many supervisory visits were made by you/ your office in the districts for immunization activities?",

		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_name_of_district_1"=>"11.3 What were the main issues faced during the last two supervisory visits? | name of district 1",

		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_issues_1"=>"11.3 What were the main issues faced during the last two supervisory visits? | issues 1",
		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_action_taken_1"=>"11.3 What were the main issues faced during the last two supervisory visits? | action taken 1",

		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_name_of_district_2"=>"11.3 What were the main issues faced during the last two supervisory visits? | name of district 2",
		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_issues_2"=>"11.3 What were the main issues faced during the last two supervisory visits? | issues 2",

		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_action_taken_2"=>"11.3 What were the main issues faced during the last two supervisory visits? | action taken 2",

		"number_of_stf_i_meetings_conducted_in_2019_20"=>"11.4 Number of STF (I) meetings conducted in 2019-20 and 2020",
		"number_of_stf_i_meetings_conducted_in_2020_21"=>"11.4 Number of STF (I) meetings conducted in 2019-20 and 2021",

		"number_of_stf_i_meetings_conducted_in_2019_20_and_2020_21_date"=>"11.4 Number of STF (I) meetings conducted in 2019-20 and 2020-21 ? | Date of last STF(I) meeting held",

		"number_of_stf_i_meetings_conducted_in_2019_20_and_2020_21_file_upload"=>"11.4 Number of STF (I) meetings conducted in 2019-20 and 2020-21 ? | file upload",

		"number_and_names_of_districts_which_did_not_conduct_dtfi_meetings_as_per_norms_in_2019_20_number"=>"11.5 Number and names of districts which did not conduct DTF(I) meetings as per norms in 2019-20 Number",
		"number_and_names_of_districts_which_did_not_conduct_dtfi_meetings_as_per_norms_in_2019_20_names"=>"11.5 Number and names of districts which did not conduct DTF(I) meetings as per norms in 2019-20 Names",

		"no_of_dtf_i_meetings_attended_by_state_level_officials_2019_20"=>"11.6 No. of DTF (I) meetings attended by state-level officials. 2019 20",

		"no_of_dtf_i_meetings_attended_by_state_level_officials_2020_21"=>"11.6 No. of DTF (I) meetings attended by state-level officials. 2020 21",

		"no_of_state_level_immunization_review_meetings_held_with_dios_2019_20"=>"11.7 No. of state-level immunization review meetings held with DIOs 2019-20",

		"no_of_state_level_immunization_review_meetings_held_with_dios_2020_21"=>"11.7 No. of state-level immunization review meetings held with DIOs 2020-21",

		"date_of_last_state_level_review_meeting_held_date"=>"11.8 Date of last state-level review meeting held",

		"attach_meeting_agenda_minutes_and_list_of_participants_file_upload"=>"Attach meeting agenda, minutes and list of participants",

		"name_of__districts_whose_dio_that_did_not_attend_the_last_state_level_review_meeting_1"=>"11.9 Name of districts whose DIO that did not attend the last state-level review meeting 1",

		"name_of__districts_whose_dio_that_did_not_attend_the_last_state_level_review_meeting_2"=>"11.9 Name of districts whose DIO that did not attend the last state-level review meeting 2",

		"name_of__districts_whose_dio_that_did_not_attend_the_last_state_level_review_meeting_3"=>"11.9 Name of districts whose DIO that did not attend the last state-level review meeting 3",

		"name_of__districts_whose_dio_that_did_not_attend_the_last_state_level_review_meeting_4"=>"11.9 Name of districts whose DIO that did not attend the last state-level review meeting 4",
		"name_of__districts_whose_dio_that_did_not_attend_the_last_state_level_review_meeting_5"=>"11.9 Name of districts whose DIO that did not attend the last state-level review meeting 5",
		"name_of__districts_whose_dio_that_did_not_attend_the_last_state_level_review_meeting_6"=>"11.9 Name of districts whose DIO that did not attend the last state-level review meeting 6",

		"how_many_review_meetings_have_been_held_with_cold_chain_handlers_in_the_state_in_2020-21_"=>"11.10 How many review meetings have been held with cold chain handlers in the state in 2019-20?",
		"how_many_review_meetings_have_been_held_with_cold_chain_handlers_in_the_state_in_2019-20"=>"11.10 How many review meetings have been held with cold chain handlers in the state in 2020-21?",

		"when_was_the_last_state_level_cold_chain_review_meeting_conducted_with_cold_chain_handlers_date"=>"11.11 When was the last state-level cold chain review meeting conducted with cold chain handlers?",
		"when_was_the_last_state_level_cold_chain_review_meeting_conducted_with_cold_chain_handlers_file_upload"=>"11.11 When was the last state-level cold chain review meeting conducted with cold chain handlers?|file upload",

		"what_is_the_composition_of_the_state_aefi_committee_attach_list_of_members"=>"12.1 What is the composition of the state AEFI committee (Attach list of members)?",

		"has_the_state_shared_the_revised_aefi_guidelines_issued_in_2015_with_all_districts"=>"12.2 Has the state shared the revised AEFI guidelines issued in 2015 with all districts?",

		"has_the_state_conducted_aefi_workshops_on_the_revised_aefi_guidelines_issued_in_2015"=>"12.3 Has the state conducted AEFI workshops on the revised AEFI guidelines issued in 2015?",

		"how_many_state_aefi_committee_meetings_were_held_during_2019_20"=>"12.4 How many state AEFI committee meetings were held during 2019-20?",
		"how_many_state_aefi_committee_meetings_were_held_during_2020_21"=>"12.4 How many state AEFI committee meetings were held during 2020-21?",

		"attach_the_state_aefi_committee_meeting_agenda_minutes_list_of_participants_and_action_reports_of_the_last_meeting"=>"12.4 How many state AEFI committee meetings were held during 2019-20 and 2020-21? | file upload",
		
		"serious_severe_aefi_cases_2019_20"=>"12.5 Number of serious, severe AEFIs reported in relation to any vaccine in the last two years. | 2019-20 | Serious, severe AEFI cases",
		"serious_severe_aefi_cases_2020_21"=>"12.5 Number of serious, severe AEFIs reported in relation to any vaccine in the last two years. | 2020-21 | Serious, severe AEFI cases",

		"non_serious_aefi_cases_2019_20"=>"12.5 Number of serious, severe AEFIs reported in relation to any vaccine in the last two years. | 2019-20 | Non-serious AEFI cases",

		"non_serious_aefi_cases_2020_21"=>"12.5 Number of serious, severe AEFIs reported in relation to any vaccine in the last two years. | 2020-21 | Non-serious AEFI cases",

		"how_is_the_state_planning_to_intensify_aefi_surveillance_for_all_vaccines_in_districts_before_pcv_introduction"=>"12.6 How is the state planning to intensify AEFI surveillance for all vaccines in districts before PCV introduction?",

		"routine_immunization_sessions_held_inr_per_session"=>"13.1 Routine immunization sessions held INR per session",

		"routine_immunization_sessions_held_numbers_hmis"=>"13.1 Routine immunization sessions held | Numbers (HMIS)",
		"routine_immunization_sessions_held_fund_utilized_in_inr_pip"=>"13.1 Routine immunization sessions held | Fund utilized in INR (PIP)",

		"children_achieved_full_immunization_coverage_at_one_year_of_age_inr_per_session"=>"13.2 Children achieved full immunization coverage at one year of age INR per fully immunized child",
		"children_achieved_full_immunization_coverage_at_one_year_of_age_numbers_hmis" =>"13.2 Children achieved full immunization coverage at one year of age | Numbers (HMIS)",
		"children_achieved_full_immunization_coverage_at_one_year_of_age_fund_utilized_in_inr_pip"=>"13.2 Children achieved full immunization coverage at one year of age | Fund utilized in INR (PIP)",

		"children_achieved_complete_immunization_coverage_at_two_years_of_age_inr_per_session"=>"13.3 Children achieved complete immunization coverage at two years of age INR per completely immunized child",

		"children_achieved_complete_immunization_coverage_at_two_years_of_age_numbers_hmis"=>"13.3 Children achieved complete immunization coverage at two years of age | Numbers (HMIS)",
		"children_achieved_complete_immunization_coverage_at_two_years_of_age_fund_utilized_in_inr_pip"=>"13.3 Children achieved complete immunization coverage at two years of age | Fund utilized in INR (PIP)",

		"please_specify_your_plan_for_officially_launching_pcv_in_the_state"=>"14.1 Please specify your plan for officially launching PCV in the state/UT",

		"who_will_be_the_person_responsible_for_iec_activities_related_to_pcv_introduction_in_the_state_name"=>"14.2 Who will be the person responsible for IEC activities related to PCV introduction in the state/UT? | Name",
		"who_will_be_the_person_responsible_for_iec_activities_related_to_pcv_introduction_in_the_state_designation"=>"14.2 Who will be the person responsible for IEC activities related to PCV introduction in the state/UT? | Designation",
		"who_will_be_the_person_responsible_for_iec_activities_related_to_pcv_introduction_in_the_state_mobile_no"=>"14.2 Who will be the person responsible for IEC activities related to PCV introduction in the state/UT? | Mobile no",

		"does_the_stateut_have_contact_details_of_key_media_persons_print_and_electronic_who_cover_health_news"=>"14.3 Does the state/UT have contact details of key media persons (print and electronic) who cover health news?",
		"does_the_stateut_have_contact_details_of_key_media_persons_print_and_electronic_who_cover_health_news_yes"=>"14.3 Does the state/UT have contact details of key media persons (print and electronic) who cover health news? | If yes, attach the list with contact details",
		"does_the_stateut_have_contact_details_of_key_media_persons_print_and_electronic_who_cover_health_news_name"=>"14.3 Does the state/UT have contact details of key media persons (print and electronic) who cover health news? | If no, prepare a list with contact details | Name",
		"does_the_stateut_have_contact_details_of_key_media_persons_print_and_electronic_who_cover_health_news_designation"=>"14.3 Does the state/UT have contact details of key media persons (print and electronic) who cover health news? | If no, prepare a list with contact details | Designation",
		"does_the_stateut_have_contact_details_of_key_media_persons_print_and_electronic_who_cover_health_news_mobile_no"=>"14.3 Does the state/UT have contact details of key media persons (print and electronic) who cover health news? | If no, prepare a list with contact details | Mobile no",


		"number_of_districts_that_have_not_reported_any_case_of_diphtheria_tetanus_or_pertussis_2019_20"=>"15.1 Names of districts that have not reported any case of diphtheria, tetanus or pertussis? | 2019-20",
		"number_of_districts_that_have_not_reported_any_case_of_diphtheria_tetanus_or_pertussis_2020_21"=>"15.1 Names of districts that have not reported any case of diphtheria, tetanus or pertussis? 2020-21",

		"number_of_silent_districts_from_where_no_afp_cases_have_been_reported_2019_20"=>"15.2 Number of silent districts from where no AFP cases have been reported? 2019-20",
		"number_of_silent_districts_from_where_no_afp_cases_have_been_reported_2020_21"=>"15.2 Number of silent districts from where no AFP cases have been reported? 2020-21",

		"how_many_districts_reported_measlesrubellamixed_outbreaks_2019_20"=>"15.3 How many districts reported Measles/Rubella/Mixed outbreaks? 2019-20",
		"how_many_districts_reported_measlesrubellamixed_outbreaks_2020_21"=>"15.3 How many districts reported Measles/Rubella/Mixed outbreaks? 2020-21",

		"how_many_lab_confirmed_measles_cases_has_the_state_reported_2019_20"=>"15.4 How many lab-confirmed measles cases has the state reported? 2019-20",
		"how_many_lab_confirmed_measles_cases_has_the_state_reported_2020_21"=>"15.4 How many lab-confirmed measles cases has the state reported? 2020-21",

		"total_no_of_cold_chain_points_in_the_state"=>"16.1 Total no. of cold chain points in the state",

		"total_no_of_cold_chain_handlers_in_the_state"=>"16.2 Total no. of cold chain handlers in the state",

		"total_no_of_districts_with_evin_functional"=>"16.3 Total no. of districts with eVIN functional?",

		"total_no_of_cold_chain_points_with_evin_functional"=>"16.4 Total no. of cold chain points with eVIN functional ?",

		"did_the_state_conduct_training_of_district_cold_chain_handlers_on_revised_vcch_module"=>"16.5 Did the state conduct training of district cold chain handlers? | on revised vcch module",
		"did_the_state_conduct_training_of_district_cold_chain_handlers_evin"=>"16.5 Did the state conduct training of district cold chain handlers? | evin",

		"name_of_district_0"=>"Name of district - 1",
		"name_of_district_stores_0" => "Name of district stores - 1",
		"total_population_0"=>"Total population - 1",
		"cold_chain_2_to_8_0" => "Cold chain 2 to 8 - 1",
		"cold_chain_15_to_25_0"=>"Cold chain 15 to 25 - 1",

		"name_of_district_1"=>"Name of district - 2",
		"name_of_district_stores_1" => "Name of district stores - 2",
		"total_population_1"=>"Total population - 2",
		"cold_chain_2_to_8_1" => "Cold chain 2 to 8 - 2",
		"cold_chain_15_to_25_1"=>"Cold chain 15 to 25 - 2",

		"name_of_district_2"=>"Name of district - 3",
		"name_of_district_stores_2" => "Name of district stores - 3",
		"total_population_2"=>"Total population - 3",
		"cold_chain_2_to_8_2" => "Cold chain 2 to 8 - 3",
		"cold_chain_15_to_25_2"=>"Cold chain 15 to 25 - 3",

		"name_of_district_3"=>"Name of district - 4",
		"name_of_district_stores_3" => "Name of district stores - 4",
		"total_population_3"=>"Total population - 4",
		"cold_chain_2_to_8_3" => "Cold chain 2 to 8 - 4",
		"cold_chain_15_to_25_3"=>"Cold chain 15 to 25 - 4",

		"name_of_district_4"=>"Name of district - 5",
		"name_of_district_stores_4" => "Name of district stores - 5",
		"total_population_4"=>"Total population - 5",
		"cold_chain_2_to_8_4" => "Cold chain 2 to 8 - 5",
		"cold_chain_15_to_25_4"=>"Cold chain 15 to 25 - 5",

		"name_of_district_5"=>"Name of district - 6",
		"name_of_district_stores_5" => "Name of district stores - 6",
		"total_population_5"=>"Total population - 6",
		"cold_chain_2_to_8_5" => "Cold chain 2 to 8 - 6",
		"cold_chain_15_to_25_5"=>"Cold chain 15 to 25 - 6",

		"name_of_district_6"=>"Name of district - 7",
		"name_of_district_stores_6" => "Name of district stores - 7",
		"total_population_6"=>"Total population - 7",
		"cold_chain_2_to_8_6" => "Cold chain 2 to 8 - 7",
		"cold_chain_15_to_25_6"=>"Cold chain 15 to 25 - 7",

		"name_of_district_7"=>"Name of district - 8",
		"name_of_district_stores_7" => "Name of district stores - 8",
		"total_population_7"=>"Total population - 8",
		"cold_chain_2_to_8_7" => "Cold chain 2 to 8 - 8",
		"cold_chain_15_to_25_7"=>"Cold chain 15 to 25 - 8",

		"name_of_district_8"=>"Name of district - 9",
		"name_of_district_stores_8" => "Name of district stores - 9",
		"total_population_8"=>"Total population - 9",
		"cold_chain_2_to_8_8" => "Cold chain 2 to 8 - 9",
		"cold_chain_15_to_25_8"=>"Cold chain 15 to 25 - 9",

		"name_of_district_9"=>"Name of district - 10",
		"name_of_district_stores_9" => "Name of district stores - 10",
		"total_population_9"=>"Total population - 10",
		"cold_chain_2_to_8_9" => "Cold chain 2 to 8 - 10",
		"cold_chain_15_to_25_9"=>"Cold chain 15 to 25 - 10",

		"name_of_district_10"=>"Name of district - 11",
		"name_of_district_stores_10" => "Name of district stores - 11",
		"total_population_10"=>"Total population - 11",
		"cold_chain_2_to_8_10" => "Cold chain 2 to 8 - 11",
		"cold_chain_15_to_25_10"=>"Cold chain 15 to 25 - 11",

		"name_of_district_11"=>"Name of district - 12",
		"name_of_district_stores_11" => "Name of district stores - 12",
		"total_population_11"=>"Total population - 12",
		"cold_chain_2_to_8_11" => "Cold chain 2 to 8 - 12",
		"cold_chain_15_to_25_11"=>"Cold chain 15 to 25 - 12",

		"name_of_district_12"=>"Name of district - 13",
		"name_of_district_stores_12" => "Name of district stores - 13",
		"total_population_12"=>"Total population - 13",
		"cold_chain_2_to_8_12" => "Cold chain 2 to 8 - 13",
		"cold_chain_15_to_25_12"=>"Cold chain 15 to 25 - 13",

		"name_of_district_13"=>"Name of district - 14",
		"name_of_district_stores_13" => "Name of district stores - 14",
		"total_population_13"=>"Total population - 14",
		"cold_chain_2_to_8_13" => "Cold chain 2 to 8 - 14",
		"cold_chain_15_to_25_13"=>"Cold chain 15 to 25 - 14",

		"name_of_district_14"=>"Name of district - 15",
		"name_of_district_stores_14" => "Name of district stores - 15",
		"total_population_14"=>"Total population - 15",
		"cold_chain_2_to_8_14" => "Cold chain 2 to 8 - 15",
		"cold_chain_15_to_25_14"=>"Cold chain 15 to 25 - 15",

		"name_of_district_15"=>"Name of district - 16",
		"name_of_district_stores_15" => "Name of district stores - 16",
		"total_population_15"=>"Total population - 16",
		"cold_chain_2_to_8_15" => "Cold chain 2 to 8 - 16",
		"cold_chain_15_to_25_15"=>"Cold chain 15 to 25 - 16",

		"name_of_district_16"=>"Name of district 17",
		"name_of_district_stores_16" => "Name of district stores 17",
		"total_population_16"=>"Total population 17",
		"cold_chain_2_to_8_16" => "Cold chain 2 to 8 17",
		"cold_chain_15_to_25_16"=>"Cold chain 15 to 25 17",

		"name_of_district_17"=>"Name of district - 18",
		"name_of_district_stores_17" => "Name of district stores - 18",
		"total_population_17"=>"Total population - 18",
		"cold_chain_2_to_8_17" => "Cold chain 2 to 8 - 18",
		"cold_chain_15_to_25_17"=>"Cold chain 15 to 25 - 18",

		"name_of_district_18"=>"Name of district - 19",
		"name_of_district_stores_18" => "Name of district stores - 19",
		"total_population_18"=>"Total population - 19",
		"cold_chain_2_to_8_18" => "Cold chain 2 to 8 - 19",
		"cold_chain_15_to_25_18"=>"Cold chain 15 to 25 - 19",

		"name_of_district_19"=>"Name of district - 20",
		"name_of_district_stores_19" => "Name of district stores - 20",
		"total_population_19"=>"Total population - 20",
		"cold_chain_2_to_8_19" => "Cold chain 2 to 8 - 20",
		"cold_chain_15_to_25_19"=>"Cold chain 15 to 25 - 20",

		"name_of_district_20"=>"Name of district - 21",
		"name_of_district_stores_20" => "Name of district stores - 21",
		"total_population_20"=>"Total population - 21",
		"cold_chain_2_to_8_20" => "Cold chain 2 to 8 - 21",
		"cold_chain_15_to_25_20"=>"Cold chain 15 to 25 - 21",

		"name_of_district_21"=>"Name of district - 22",
		"name_of_district_stores_21" => "Name of district stores - 22",
		"total_population_21"=>"Total population - 22",
		"cold_chain_2_to_8_21" => "Cold chain 2 to 8 - 22",
		"cold_chain_15_to_25_21"=>"Cold chain 15 to 25 - 22",

		"name_of_district_22"=>"Name of district - 23",
		"name_of_district_stores_22" => "Name of district stores - 23",
		"total_population_22"=>"Total population - 23",
		"cold_chain_2_to_8_22" => "Cold chain 2 to 8 - 23",
		"cold_chain_15_to_25_22"=>"Cold chain 15 to 25 - 23",

		"name_of_district_23"=>"Name of district - 24",
		"name_of_district_stores_23" => "Name of district stores - 24",
		"total_population_23"=>"Total population - 24",
		"cold_chain_2_to_8_23" => "Cold chain 2 to 8 - 24",
		"cold_chain_15_to_25_23"=>"Cold chain 15 to 25 - 24",

		"name_of_district_24"=>"Name of district - 25",
		"name_of_district_stores_24" => "Name of district stores - 25",
		"total_population_24"=>"Total population - 25",
		"cold_chain_2_to_8_24" => "Cold chain 2 to 8 - 25",
		"cold_chain_15_to_25_24"=>"Cold chain 15 to 25 - 25",

		"name_of_district_25"=>"Name of district - 26",
		"name_of_district_stores_25" => "Name of district stores - 26",
		"total_population_25"=>"Total population - 26",
		"cold_chain_2_to_8_25" => "Cold chain 2 to 8 - 26",
		"cold_chain_15_to_25_25"=>"Cold chain 15 to 25 - 26",

		"name_of_district_26"=>"Name of district - 27",
		"name_of_district_stores_26" => "Name of district stores - 27",
		"total_population_26"=>"Total population - 27",
		"cold_chain_2_to_8_26" => "Cold chain 2 to 8 - 27",
		"cold_chain_15_to_25_26"=>"Cold chain 15 to 25 - 27",

		"name_of_district_27"=>"Name of district - 28",
		"name_of_district_stores_27" => "Name of district stores - 28",
		"total_population_27"=>"Total population - 28",
		"cold_chain_2_to_8_27" => "Cold chain 2 to 8 - 28",
		"cold_chain_15_to_25_27"=>"Cold chain 15 to 25 - 28",

		"name_of_district_28"=>"Name of district - 29",
		"name_of_district_stores_28" => "Name of district stores - 29",
		"total_population_28"=>"Total population - 29",
		"cold_chain_2_to_8_28" => "Cold chain 2 to 8 - 29",
		"cold_chain_15_to_25_28"=>"Cold chain 15 to 25 - 29",

		"name_of_district_29"=>"Name of district - 30",
		"name_of_district_stores_29" => "Name of district stores - 30",
		"total_population_29"=>"Total population - 30",
		"cold_chain_2_to_8_29" => "Cold chain 2 to 8 - 30",
		"cold_chain_15_to_25_29"=>"Cold chain 15 to 25 - 30",



		"number_of_districts_that_have_uploaded_data_related_to_all_cold_chain_points_in_nccmis"=>"16.7 Number of districts that have uploaded data related to all cold chain points in NCCMIS",

		"cold_chain_sickness_rate_at_the_state_level_as_per_nccmis_during"=>"16.8 Cold chain sickness rate at the state level as per NCCMIS during",

		"cold_chain_sickness_rate_at_the_state_level_as_per_nccmis_during_input_field"=>"16.8 Cold chain sickness rate at the state level as per NCCMIS during Field",

		"total_no_of_refrigerator_mechanicscold_chain_technicians_in_the_state_sanctioned"=>"16.9 Total no. of refrigerator mechanics/cold chain technicians in the state | sanctioned",

		"total_no_of_refrigerator_mechanicscold_chain_technicians_in_the_state_currently_posted"=>"16.9 Total no. of refrigerator mechanics/cold chain technicians in the state | currently posted",

		"names_of_districts_that_do_not_have_full_time_refrigerator_mechanics"=>"16.10 Names of districts that do not have full time refrigerator mechanics",

		"have_these_refrigerator_mechanics_in_the_state_been_technically_trained__in_the_last_3_years"=>"16.11 Have these refrigerator mechanics in the state been technically trained in the last 3 years?",

		"number_of_refrigerator_mechanics_in_the_state_that_do_not_have_tool_kits"=>"16.12 Number of refrigerator mechanics in the state that do not have tool kits?",

		"what_is_the_frequency_of_temperature_recording_at_the_svs"=>"16.13 What is the frequency of temperature recording at the SVS?",

		"what_is_the_frequency_of_temperature_recording_at_the_svs_others"=>"16.13 What is the frequency of temperature recording at the SVS? | others",

		"are_temperatures_monitored_and_recorded_on_weekends_and_holidays_at_svs"=>"16.14 Are temperatures monitored and recorded on weekends and holidays at SVS?",
		"are_temperatures_monitored_and_recorded_on_weekends_and_holidays_at_svs_other_specify"=>"16.14 Are temperatures monitored and recorded on weekends and holidays at SVS? | others",

		"has_there_been_any_report_from_districts_of_storing_other_drugsmaterials_in_the_ilr_or_dfs_along_with_vaccines_in_2019-20"=>"16.15 Has there been any report from districts of storing other drugs/materials in the ILR or DFs along with vaccines in 2019-20?",

		"has_there_been_any_report_from_districts_of_storing_other_drugsmaterials_in_the_ilr_or_dfs_along_with_vaccines_in_2019-20_specify_the_name_of_that_other_drug_or_material"=>"16.15 Has there been any report from districts of storing other drugs/materials in the ILR or DFs along with vaccines in 2019-20? |  specify the name of that other drug or material",

		"no_of_districts_that_have_undertaken_condemnation_of_irreparable_cold_chain_equipment_2019_20"=>"16.16 No. of districts that have undertaken condemnation of irreparable cold chain equipment | 2019-20 | Number",
		"no_of_districts_that_have_undertaken_condemnation_of_irreparable_cold_chain_equipment_2020_21"=>"16.16 No. of districts that have undertaken condemnation of irreparable cold chain equipment | 2020-21 | Number",





		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_state_cold_chain"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the State/UT? | cold chain",
		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_state_cold_chain_yes"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the State/UT? | cold chain | If yes, specify",

		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_state_iec_materialsmedia"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the State/UT? | IEC materials/media",

		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_state_iec_materialsmedia_yes"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the State/UT? | IEC materials/media | If yes, specify",

		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_state_training"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the State/UT? | Training",

		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_state_training_yes"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the State/UT? | Training | If yes, specify",

		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_state_covid_19_related"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the State/UT? | covid 19 related",

		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_state_covid_19_related_yes"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the State/UT? | covid 19 related | If yes, specify",

		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_state_other_specify"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the State/UT? | other specify",


		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_health_staff_and_officials_issues_and_challenges"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the state? | Issues and challenges | Health staff and officials (Medical Officers, Health workers and mobilizers)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_health_staff_and_officials_proposed_solutions"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the state? | Proposed solutions | Health staff and officials (Medical Officers, Health workers and mobilizers)",


		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_professional_societies_issues_and_challenges"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the state? | Issues and challenges | Professional societies(IMA, IAP, Medical Colleges)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_professional_societies_proposed_solutions"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the state? | Proposed solutions | Professional societies(IMA, IAP, Medical Colleges)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_communitypublic_issues_and_challenges"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the state? | Issues and challenges | Community / Public (e. g resistance, low awareness, fear of AEFI, religious beliefs, sociocultural factors etc.)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_communitypublic_proposed_solutions"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the state? | Proposed solutions | Community / Public (e. g resistance, low awareness, fear of AEFI, religious beliefs, sociocultural factors etc.)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_government_issues_and_challenges"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the state? | Issues and challenges | Government (e.g. Inter sectoral coordination, ICDS and PRI involvement etc.)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_government_proposed_solutions"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the state? | Proposed solutions | Government (e.g. Inter sectoral coordination, ICDS and PRI involvement etc.)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_media_print_electronic_and_social_media_issues_and_challenges"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the state? | Issues and challenges | Media (Print, electronic and social media)(e.g. Positive/ negative media coverage on health issues in last 1 year)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_media_print_electronic_and_social_media_proposed_solutions"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the state? | Proposed solutions | Media (Print, electronic and social media)(e.g. Positive/ negative media coverage on health issues in last 1 year)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_others_issues_and_challenges"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the state? | Issues and challenges | Others",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_others_proposed_solutions"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the state? | Proposed solutions | Others",

		"has_the_district_undertaken_some_innovative_initiatives_to_improve_routine_immunization_processes_and_outcomes_in_the_last_3_years"=>"17.3 Has the district undertaken some innovative initiatives to improve routine immunization processes and outcomes in last 3 years?",

		"has_the_state_undertaken_some_innovative_initiatives_to_improve_routine_immunization_processes_and_outcomes_in_the_last_3_years"=>"17.3 Has the state undertaken some innovative initiatives to improve routine immunization processes and outcomes in the last 3 years?",

		"has_the_state_undertaken_some_innovative_initiatives_to_improve_routine_immunization_processes_and_outcomes_in_the_last_3_years_briefly_mention_about_the_innovation"=>"17.3 Has the state undertaken some innovative initiatives to improve routine immunization processes and outcomes in the last 3 years? | briefly mention about the innovation",

		"has_the_state_undertaken_some_innovative_initiatives_to_improve_routine_immunization_processes_and_outcomes_in_the_last_3_years_when_was_it_started"=>"17.3 Has the state undertaken some innovative initiatives to improve routine immunization processes and outcomes in the last 3 years? | When was it started?",

		"has_the_state_undertaken_some_innovative_initiatives_to_improve_routine_immunization_processes_and_outcomes_in_the_last_3_years_what_was_the_outcome"=>"17.3 Has the state undertaken some innovative initiatives to improve routine immunization processes and outcomes in the last 3 years? | What was the outcome?",

		"has_the_state_undertaken_some_innovative_initiatives_to_improve_routine_immunization_processes_and_outcomes_in_the_last_3_years_attach_extra_sheets_if_required"=>"17.3 Has the state undertaken some innovative initiatives to improve routine immunization processes and outcomes in the last 3 years? | Attach extra sheets, if required",

		"what_technical_and_financial_support_do_you_expect_from_stategoipartners_for_pcv_introduction"=>"17.4 What technical and financial support do you expect from state/GoI/Partners for PCV introduction?",
		"additional_commentsremarks_step17"=>"Additional comments/remarks"
	);
}


function get_district_form_fields(){
	return $formLabelArray  =  array(
		"name_of_district_immunization_officer" => "1.3 Name of District Immunization Officer",
		"cd_phone_number" => "1.4 Contact Details | Phone number",
		"cd_email_address"=> "1.4 Contact Details | Email address",
		"cd_address" => "1.4 Contact Details | Address",


		"are_you_posted_as_a_regular_dio" => "2.1. Are you posted as a regular DIO?",

		"besides_immunization_are_you_responsible_for_other_programmes"=>"2.2. Besides immunization, are you responsible for other programmes?",

		"is_your_district_identified_for_intensified__mission_indradhanush_imi_in_2021"=>"2.3. Is your district identified for Intensified Mission Indradhanush (IMI) in 2021",
		"do_you_have_a_computer_assistant_posted_under_nhm"=>"2.4. Is your district identified as an NITI Aayog aspirational district ?",
		"do_you_have_a_computer_assistant_posted_under_nhm"=>"2.5 Do you have a computer assistant posted under NHM ?",
		"do_you_have_a_computer_assistant_posted_under_nhm_in_case_of_vacancy_indicate_the_time_since_vacant"=>"2.5 Do you have a computer assistant posted under NHM ? | No",

		"no_of_blocks_in_the_district"=>"2.6. No. of blocks in the district",
		"no_of_planning_units_rural__urban_in_the_district_as_per_polio_sias"=>"2.7. No. of planning units (rural & urban) in the district as per polio SIAs",
		"no_of_polio_eprp_identified_high_risk_blocks_in_the_district"=>"2.8. No. of polio EPRP identified high‐risk blocks in the district",
		"total_number_of_sub_centers_in_the_district"=>"2.9. Total number of sub‐centers in the district",
		"total_no_of_mos_in_the_district_allopathy_regular_sanctioned"=>"2.10. Total no. of MOs in the district | Allopathy | Sanctioned | Regular",
		"total_no_of_mos_in_the_district_allopathy_regular_currently_posted"=>"2.10. Total no. of MOs in the district | Allopathy | Currently posted | Regular",

		"total_no_of_mos_in_the_district_ayush_regular_sanctioned"=>"2.10. Total no. of MOs in the district | AYUSH | Sanctioned |Regular",
		"total_no_of_mos_in_the_district_ayush_regular_currently_posted"=>"2.10. Total no. of MOs in the district | AYUSH | Currently posted | Regular",
		"total_no_of_mos_in_the_district_allopathy_contractual_sanctioned"=>"2.10. Total no. of MOs in the district | Allopathy | Sanctioned | Contractual",
		"total_no_of_mos_in_the_district_allopathy_contractual_currently_posted"=>"2.10. Total no. of MOs in the district | Allopathy | Currently posted | Contractual",
		"total_no_of_mos_in_the_district_ayush_contractual_sanctioned"=>"2.10. Total no. of MOs in the district | Allopathy | Sanctioned | Contractual",
		"total_no_of_mos_in_the_district_ayush_contractual_currently_posted"=>"2.10. Total no. of MOs in the district | Allopathy | Currently posted | Contractual",
		"names_of_two_blocks_with_the_highest_vacant_mo_positions_one"=>"2.11. Names of two blocks with the highest vacant MO positions",
		"names_of_two_blocks_with_the_highest_vacant_mo_positions_two"=>"2.11. Names of two blocks with the highest vacant MO positions",
		"total_no_of_anms_in_the_district_regular_sanctioned"=>"2.12. Total no. of ANMs in the district | Regular | Sanctioned",
		"total_no_of_anms_in_the_district_regular_currently_posted"=>"2.12. Total no. of ANMs in the district | Regular | Currently posted",
		"total_no_of_anms_in_the_district_contractual_sanctioned"=>"2.12. Total no. of ANMs in the district | Contractual | Sanctioned",
		"total_no_of_anms_in_the_district_contractual_currently_posted"=>"2.12. Total no. of ANMs in the district | Contractual | Currently posted",
		"names_of_two_blocks_with_the_highest_vacant_anm_positions_input_1"=>"2.13. Names of two blocks with the highest vacant ANM positions.",
		"names_of_two_blocks_with_the_highest_vacant_anm_positions_input_2"=>"2.13. Names of two blocks with the highest vacant ANM positions.",
		"total_no_of_sub_centers_with_two_anms_input"=>"2.14. Total no. of sub‐centers with two ANMs",

		"total_no_of_sub_centers_with_two_anms_input"=>"2.14. Total no. of sub‐centers with two ANMs",

		"clearly_demarcate_areas_between_two_anms"=>"2.15. Has the district issued any guidelines/letters directing all sub‐centers with two ANMs on the following | a) Clearly demarcate areas between two ANMs",
		"conduct_estimation_of_beneficiaries"=>"2.15. Has the district issued any guidelines/letters directing all sub‐centers with two ANMs on the following | b) Conduct estimation of beneficiaries",

		"prepare_independent_ri_micro‐plan_for_their_demarcated_areas"=>"2.15. Has the district issued any guidelines/letters directing all sub‐centers with two ANMs on the following | c) Prepare independent RI micro‐plan for their demarcated areas",
		"have_individual_registers_for_data_reporting_and_performance_recording_in_their_demarcated_areas"=>"2.15. Has the district issued any guidelines/letters directing all sub‐centers with two ANMs on the following | d) Have individual registers for data reporting and performance recording in their demarcated areas",
		"have_individual_registers_for_data_reporting_and_performance_recording_in_their_demarcated_areas_yes" => "2.15. Has the district issued any guidelines/letters directing all sub‐centers with two ANMs on the following | d) Have individual registers for data reporting and performance recording in their demarcated areas | If yes, attach a copy of the guidelines.",

		"total_no_of_ashas_in_the_district_currently_ashas_in_place"=>"2.16. Total no. of ASHAs in the district | Currently ASHAs in place",
		"total_no_of_ashas_in_the_district_total_expected_asha_positions"=>"2.16. Total no. of ASHAs in the district | Total expected ASHA positions",
		"total_no_of_ashas_in_the_district_currently_ashas_in_place"=>"2.16. Total no. of ASHAs in the district | Currently ASHAs in place",
		"total_no_of_ashas_in_the_district_total_expected_asha_positions"=>"2.16. Total no. of ASHAs in the district | Total expected ASHA positions",
		"names_of_two_blocks_with_the_highest_vacant_asha_positions_name_of_block_input_1"=>"2.17. Names of two blocks with the highest vacant ASHA positions | Name of block 1",
		"names_of_two_blocks_with_the_highest_vacant_asha_positions_expected_input_1"=>"2.17. Names of two blocks with the highest vacant ASHA positions | Sanctioned 1",
		"names_of_two_blocks_with_the_highest_vacant_asha_positions_currently_posted_input_1"=>"2.17. Names of two blocks with the highest vacant ASHA positions | Existing No 1",
		"names_of_two_blocks_with_the_highest_vacant_asha_positions_name_of_block_input_2"=>"2.17. Names of two blocks with the highest vacant ASHA positions | Name of block 2",
		"names_of_two_blocks_with_the_highest_vacant_asha_positions_expected_input_2"=>"2.17. Names of two blocks with the highest vacant ASHA positions | Sanctioned 2",
		"names_of_two_blocks_with_the_highest_vacant_asha_positions_currently_posted_input_2"=>"2.17. Names of two blocks with the highest vacant ASHA positions | Existing No 2",
		"total_no_of_awws_in_the_district_currently_awws_in_place"=>"2.18. Total no. of AWWs in the district | Currently AWWs in place",
		"total_no_of_awws_in_the_district_total_expected_aww_positions"=>"2.18. Total no. of AWWs in the district | Total expected AWW positions",
		"ssessions_planned_in_awc_in_the_district_per_month_average_total_sessions_planned_in_district_per_month"=>"2.19. Ssessions planned in AWC in the district per month (average) | Total sessions planned in district per month",
		"ssessions_planned_in_awc_in_the_district_per_month_average_total_sessions_planned_at_awc_per_month_in_district"=>"2.19. Ssessions planned in AWC in the district per month (average) | Total sessions planned at AWC per month in district",

		"total_no_of_link_workers_besides_asha_and_aww_identified_for_mobilization_of_ri_beneficiaries_in_the_district"=>"2.20. Total no. of link workers, besides ASHA and AWW, identified for mobilization of RI beneficiaries in the district",

		"was_urban_immunization_part_of_district_pip_2020‐21"=>"2.21. Was urban immunization part of district PIP 2020‐21",

		"number_of_urban_areas_identified_for_support_under_nhm"=>"2.22. Number of urban areas identified for support under NHM",
		"number_of_urban_areas_with_designated_nodal_person_for_immunization"=>"2.23. Number of urban areas with designated nodal person for immunization.",
		"urban_infrastructure_developed_under_nhm_sanctioned_urban_chc"=>"2.24. Urban infrastructure developed under NHM | Sanctioned | Urban CHC",

		"urban_infrastructure_developed_under_nhm_functional_urban_chc"=>"2.24. Urban infrastructure developed under NHM | Functional | Urban CHC",

		"urban_infrastructure_developed_under_nhm_sanctioned_urban_phc"=>"2.24. Urban infrastructure developed under NHM | Sanctioned | Urban PHC",

		"urban_infrastructure_developed_under_nhm_functional_urban_phc"=>"2.24. Urban infrastructure developed under NHM | Functional | Urban PHC",

		"urban_infrastructure_developed_under_nhm_sanctioned_medical_officer"=>"2.25. Urban human resource under NHM | Sanctioned | Medical officer",

		"urban_infrastructure_developed_under_nhm_functional_medical_officer"=>"2.25. Urban human resource under NHM | Functional | Medical officer",

		"urban_infrastructure_developed_under_nhm_sanctioned_anm"=>"2.25. Urban human resource under NHM | Sanctioned | ANM",
		"urban_infrastructure_developed_under_nhm_functional_anm"=>"2.25. Urban human resource under NHM | Functional | ANM",
		"urban_infrastructure_developed_under_nhm_sanctioned_urban_asha"=>"2.25. Urban human resource under NHM | Sanctioned | Urban ASHA",
		"urban_infrastructure_developed_under_nhm_functional_urban_asha"=>"2.25. Urban human resource under NHM | Functional | Urban ASHA",
		"additional_commentsremarks_step2"=>"Additional comments/remarks",

		"total_population_of_district"=>"3.1. Demographic data | Total population of district",
		"total_population_of_district[]"=>"3.1. Demographic data | Total population of district | Others",
		"total_population_of_district_input"=>"3.1. Demographic data | Total population of district | Others",
		"total_no_of_infants" => "3.1. Demographic data | Total no. of infants",
		"total_no_of_infants[]" => "3.1. Demographic data | Total no. of infants | Others",
		"total_no_of_infants_input" => "3.1. Demographic data | Total no. of infants Others",

		

		"penta_3dpt_3_reported[]"=>"3.2. District Immunization coverage | % Coverage | Reported (HMIS) 2019-20 | Penta 1/DPT 1 | Other",
		"penta_1dpt_1_reported_text"=>"3.2. District Immunization coverage | % Coverage | Reported (HMIS) 2019-20 | Penta 1/DPT 1 | Other",

		"penta_1dpt_1_monitored_text"=>"3.2. District Immunization coverage | % Coverage | Monitored* (Concurrent monitoring) 2019-20 | Penta 1/DPT 1",

		"penta_1dpt_1_remarks"=>"3.2. District Immunization coverage | Remarks | Penta 1/DPT 1",

		"penta_1dpt_1_evaluated_text"=>"3.2. District Immunization coverage | % Coverage | Evaluated (NFHS-4) | Penta 1/DPT 1",
			
		
			
		"district_immunization_coverage_penta_3_dpt_3_hmis"=>"3.2. District Immunization coverage | % Coverage | Reported (HMIS) 2019-20 | Penta 3/ DPT 3",
		"penta_3dpt_3_reported_text"=>"3.2. District Immunization coverage | % Coverage | Reported (HMIS) 2019-20 | Penta 3/ DPT 3 | Other",
		
		"district_immunization_coverage_penta_3_dpt_3_nfhs4"=>"3.2. District Immunization coverage | % Coverage | Evaluated (NFHS-4) | Penta 3/ DPT 3",
		"penta_3dpt_3_evaluated_text"=>"3.2. District Immunization coverage | % Coverage | Evaluated (NFHS-4) | Penta 3/ DPT 3 | Other",
		"penta_3dpt_3_evaluated[]"=>"3.2. District Immunization coverage | % Coverage | Evaluated (NFHS-4) | Penta 3/ DPT 3 | Other",
		"penta_3dpt_3_monitored_text"=>"3.2. District Immunization coverage | % Coverage | Monitored* (Concurrent monitoring) 2019-20 | Penta 3/ DPT 3",
		"penta_3dpt_3_remarks"=>"3.2. District Immunization coverage | Remarks | Penta 3/DPT 3",

		"district_immunization_coverage_mr1_measles_hmis"=>"3.2. District Immunization coverage | % Coverage | Reported (HMIS) 2019-20 |MR 1/ Measles",
		"mr_1_measles_reported[]"=>"3.2. District Immunization coverage | % Coverage | Reported (HMIS) 2019-20 |MR 1/ Measles | Other",
		"mr_1_measles_reported_text"=>"3.2. District Immunization coverage | % Coverage | Reported (HMIS) 2019-20 |MR 1/ Measles | Other",
		"district_immunization_coverage_mr1_measles_nfhs4"=>"3.2. District Immunization coverage | % Coverage | Evaluated (NFHS-4) | MR 1/ Measles",
		"mr_1_measles_evaluated[]"=>"3.2. District Immunization coverage | % Coverage | Evaluated (NFHS-4) | MR 1/ Measles | Other",
		"mr_1_measles_evaluated_text"=>"3.2. District Immunization coverage | % Coverage | Evaluated (NFHS-4) | MR 1/ Measles | Other",
		"mr_1_measles_monitored_text"=>"3.2. District Immunization coverage | % Coverage | Monitored* (Concurrent monitoring) 2019-20 | MR 1/ Measles",
		"mr_1_measles_remarks"=>"3.2. District Immunization coverage | Remarks | MR 1/ Measles",
		
		"district_drop_out_rates_penta_1_dpt_1_hmis"=>"3.3. District drop‐out rates 2019-20 | Drop-out rate (HMIS) | Penta‐1 to Penta‐3",
		"penta_1_to_penta_3_drop_out_rate[]"=>"3.3. District drop‐out rates 2019-20 | Drop-out rate (HMIS) | Penta‐1 to Penta‐3 | Other",
		"penta_1_to_penta_3_drop_out_rate_text"=>"3.3. District drop‐out rates 2019-20 | Drop-out rate (HMIS) | Penta‐1 to Penta‐3 | Other",
		"penta_1_to_penta_3_drop_out_rate_remarks"=>"3.3. District drop‐out rates 2019-20 | Remarks | Penta‐1 to Penta‐3",
		"district_drop_out_rates_Penta_3_1_to_mr_1_hmis"=>"3.3. District drop‐out rates 2019-20 | Drop-out rate (HMIS) | Penta 3‐1 to MR‐1 | Other",
		"penta_3_1_to_mr_1_drop_out_rate[]"=>"3.3. District drop‐out rates 2019-20 | Drop-out rate (HMIS) | Penta 3‐1 to MR‐1 | Others",
		"penta_3_1_to_mr_1_drop_out_rate_text"=>"3.3. District drop‐out rates 2019-20 | Drop-out rate (HMIS) | Penta 3‐1 to MR‐1 | Others",
		"penta_3_1_to_mr_1_drop_out_rate_remarks"=>"3.3. District drop‐out rates 2019-20 | Remarks | Penta 3‐1 to MR‐1",
		"additional_commentsremarks_step3"=>"Additional Comments/remarks",

		"no_of_districts_that_have_submitted_updated_ri_micro-plans_to_state_for_2020-21"=>"4.1 No. of blocks that have submitted updated RI micro‐plans to the district for 2020-2021 ??",

		"total_no_of_sub‐_centers_in_district"=>"4.2 Status of estimation of beneficiaries by sub‐centers in 2020-2021? | Total no. of sub‐ centers in district",
		"total_no_of_sub‐centers_completed_beneficiaryestimation_through_headcount"=>"4.2 Status of estimation of beneficiaries by sub‐centers in 2020-2021? | Total no. of sub‐centers completed beneficiary estimation through headcount",
		"sessions_held_against_planned_as_per_hmis_during_2019_20"=>"4.3 % sessions held against planned as per HMIS during 2019-2020?",
		"sessions_held_against_planned_as_per_hmis_during_19-20[]"=>"4.3 % sessions held against planned as per HMIS during 2019-2020? | Other",
		"sessions_held_against_planned_as_per_hmis_during_19-20test"=>"4.3 % sessions held against planned as per HMIS during 2019-2020? | Other",
		"total_number_of_hras_in_the_state_as_per_polio_programme_2020_21"=>"4.4 Total number of HRAs in the district as per polio program 2020-2021",

		"additional_commentsremarks_step4"=>"Additional Comments/remarks",

		"how_many_rounds_of_imi_have_been_conducted_in_the_district_since_2015"=>"5.1 How many rounds of IMI have been conducted in the district (since 2015)?",
		
		"how_many_sessions_were_already_included_in_routine_immunization_microplan_before_start_of_most_recent_phase_of_imi"=>"5.2 How many sessions were already included in routine immunization microplan before start of most recent phase of IMI?",
		"how_many_additional_sessions_were_planned_under_the_most_recent_phase_of_imi"=>"5.3 How many additional sessions were planned under the most recent phase of IMI?",
		"how_many_sessions_have_been_incorporated_into_ri_micro‐plan_after_imi_"=>"5.4 How many sessions have been incorporated into RI micro‐plan after IMI ?",

		"since_how_long_you_dio_have_been_posted_in_this_district"=>"6.1 Since how long you (DIO) have been posted in this district?",

		"have_you_undergone_diomo_immunization_training_at_the_state_level_during_2019-20_or_2020-21"=>"6.2 Have you undergone DIO/MO immunization training at the state level during 2019-20 or 2020-21?",

		"no__have_you_undergone_diomo_immunization_training_at_the_state_level_during_2019-20_or_2020-21"=>"If no, the reason",

		"have_you_been_trained_on_aefi_surveillance_during__2018-2019_or_2019-2020"=>"6.3 Have you been trained on AEFI surveillance during 2018-2019 or 2019-2020?",


		"has_the_district_organized_three‐day_medical_officers’_training_on_immunization_using_mo_handbook_during_2019-2020"=>"6.4 Has the district organized three‐day medical officers’ training on immunization using MO Handbook during 2019-2020?",
		"if_yes_no_of_training_sessions_batches_conducted"=>"no. of training sessions (batches) conducted",
		"if_yes_indicate_the_numberof_mos_trained_during_the_training"=>"Indicate the number of MOs trained during the training",

		"has_the_district_organized_two‐day_health_workers’_training_during_2019-2020"=>"6.5 Has the district organized two‐day health workers’ training during 2019-2020?",
		"if_yes_indicate_the_number_of_health_workers_trained_2019-2020"=>"indicate the number of health workers trained 2019-2020",
		"additional_commentsremarks"=>"Additional comments/remarks",

		"recording_reporting_formats_and_registers_will_be_updated_and_printed_before_date"=>"7.1 Provide timeline for updating and printing registers/formats (ANM tally sheets, due lists, RCH register) and MCP card containing PCV information before its introduction | a) Recording, reporting formats and registers will be updated and printed before date",

		"mcp_card_will_be_updated_and_printed_before"=>"7.1 Provide timeline for updating and printing registers/formats (ANM tally sheets, due lists, RCH register) and MCP card containing PCV information before its introduction | b) MCP card will be updated and printed before date",
		"has_the_district_issued_any_instructions_to_blocks_to_check_availability_of_one_tracking_bag_per_session_site_to_facilitate_tracking_by_anm_asha_and_aww"=>"7.2 Has the district issued any instructions to blocks to check availability of one tracking bag per session site to facilitate tracking by ANM, ASHA and AWW?",

		"coverage_monitoring_chart__is_cumulative_immunization_coverage_and_drop_out_information_in_the_form_of_coverage_monitoring_chart_being_used_for_programme_monitoring_at_district_block_and_sub‐center_levels" => "7.3 Coverage Monitoring Chart Is cumulative immunization coverage and drop out information in the form of coverage monitoring chart being used for programme monitoring at district, block and sub‐center levels?",

		"additional_commentsremarks_step7"=>"Additional comments/remarks",

		"calculate_vaccine_wastage_for_penta_2018_19"=>"8.1 Based on the formula given below, calculate vaccine wastage for Penta | 2018-19",
		"calculate_vaccine_wastage_for_penta_2019_20"=>"8.1 Based on the formula given below, calculate vaccine wastage for Penta | 2019-20",
		"reported_highest_penta_wastage_during_2019_20_name_1"=>"8.2 Names of two blocks which reported the highest % of Penta wastage in 2019-2020 | Name of block 1",
		"reported_highest_penta_wastage_during_2019_20_wastage_1"=>"8.2 Names of two blocks which reported the highest % of Penta wastage in 2019-2020 | % wastage 1",
		"reported_highest_penta_wastage_during_2019_20_name_2"=>"8.2 Names of two blocks which reported the highest % of Penta wastage in 2019-2020 | Name of block 2 ",
		"reported_highest_penta_wastage_during_2019_20_wastage_2"=>"8.2 Names of two blocks which reported the highest % of Penta wastage in 2019-2020 | % wastage 2",

		"reported_least_penta_wastage_during_2019_20_name_1"=>"8.3 Names of two blocks which reported the least % of Penta wastage in 2019-2020 | Name of block 1",

		"reported_least_penta_wastage_during_2019_20_wastage_1"=>"8.3 Names of two blocks which reported the least % of Penta wastage in 2019-2020 | % wastage 1",

		"reported_least_penta_wastage_during_2019_20_name_2"=>"8.3 Names of two blocks which reported the least % of Penta wastage in 2019-2020 | Name of block 1",

		"reported_least_penta_wastage_during_2019_20_wastage_2"=>"8.3 Names of two blocks which reported the least % of Penta wastage in 2019-2020 | % wastage 1",

		"additional_commentsremarks_step8" =>"Additional comments/remarks",
		"what_formula_do_you_use_to_forecast_vaccine_requirements"=>"9.1 What formula do you use to forecast vaccine requirements?",
		"what_formula_do_you_use_to_forecast_vaccine_requirements[]"=>"9.1 What formula do you use to forecast vaccine requirements? | Others",
		"what_formula_do_you_use_to_forecast_vaccine_requirements_others"=>"9.1 What formula do you use to forecast vaccine requirements? | Others",
		"explain_the_vaccine_supply_mechanism_in_the_district"=>"9.2 Explain the vaccine supply mechanism in the district.",
		"explain_the_vaccine_supply_mechanism_in_the_district_other"=>"9.2 Explain the vaccine supply mechanism in the district. | Any other, please explain",
		'explain_the_vaccine_supply_mechanism_in_the_district[]'=>"9.2 Explain the vaccine supply mechanism in the district.",

		"has_there_been_stock_out_of_the_following_vaccines_during_2019‐20_rvv"=>"9.3 Has there been stock out of the following vaccines during 2019‐20? | RVV",
		"has_there_been_stock_out_of_the_following_vaccines_during_2019‐20_pentavalent"=>"9.3 Has there been stock out of the following vaccines during 2019‐20? | Pentavalent",
		"has_there_been_stock_out_of_the_following_vaccines_during_2019‐20_any_other_vaccine"=>"9.3 Has there been stock out of the following vaccines during 2019‐20?",
		"has_there_been_stock_out_of_the_following_vaccines_during_2019_20_other"=>"9.3 Has there been stock out of the following vaccines during 2019‐20? | Any other vaccine (please specify)",

		"1_did_you_find_any_vaccine_beyond_expiry_date_during_field_name_of_vaccine_"=>"9.4 Did you find any vaccine beyond expiry date during monitoring 2019-2020?",
		"did_you_find_any_vaccine_beyond_expiry_date_during_monitoring_2019-2020"=>"9.4 Did you find any vaccine beyond expiry date during monitoring 2019-2020?",
		"1_did_you_find_any_vaccine_beyond_expiry_date_during_field_name_of_vaccine_"=>"9.4 Did you find any vaccine beyond expiry date during monitoring 2019-2020? | Name of vaccine",
		"1_did_you_find_any_vaccine_beyond_expiry_date_during_field_observed_in[]"=>"9.4 Did you find any vaccine beyond expiry date during monitoring 2019-2020? | Observed in",
		"1_did_you_find_any_vaccine_beyond_expiry_date_during_field_reason"=>"9.4 Did you find any vaccine beyond expiry date during monitoring 2019-2020? | Reason",
		"_1_did_you_find_any_vaccine_beyond_expiry_date_during_field_action_taken"=>"9.4 Did you find any vaccine beyond expiry date during monitoring 2019-2020? | Action taken",

		"2_did_you_find_any_vaccine_beyond_expiry_date_during_field_name_of_vaccine"=>"9.4 Did you find any vaccine beyond expiry date during monitoring 2019-2020? | Name of vaccine",
		"2_did_you_find_any_vaccine_beyond_expiry_date_during_field_observed_in[]"=>"9.4 Did you find any vaccine beyond expiry date during monitoring 2019-2020? | Observed in",
		"2_did_you_find_any_vaccine_beyond_expiry_date_during_field_reason"=>"9.4 Did you find any vaccine beyond expiry date during monitoring 2019-2020? | Reason",
		"2_did_you_find_any_vaccine_beyond_expiry_date_during_field_action_taken"=>"9.4 Did you find any vaccine beyond expiry date during monitoring 2019-2020? | Action taken",

		"did_you_find_any_vaccine_with_vaccine_vial_monitor_vvm_in_non‐usable_stage_during_monitoring_2019-2020"=>"9.5 Did you find any vaccine with vaccine vial monitor (VVM) in non‐usable stage during monitoring 2019-2020?",

		"1_did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non-usable_stage_during_field_name_of_vaccine"=>"9.5 Did you find any vaccine with vaccine vial monitor (VVM) in non‐usable stage during monitoring 2019-2020? | Name of vaccine",

		"1_did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non-usable_stage_during_field_observed_in[]"=>"9.5 Did you find any vaccine with vaccine vial monitor (VVM) in non‐usable stage during monitoring 2019-2020? | Observed in",

		"1_did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non-usable_stage_during_field_reason"=>"9.5 Did you find any vaccine with vaccine vial monitor (VVM) in non‐usable stage during monitoring 2019-2020? | Reason",

		"1_did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non-usable_stage_during_field_action_taken" => "9.5 Did you find any vaccine with vaccine vial monitor (VVM) in non‐usable stage during monitoring 2019-2020? | Action taken",

		"2_did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non-usable_stage_during_field_observed_in[]"=>"9.5 Did you find any vaccine with vaccine vial monitor (VVM) in non‐usable stage during monitoring 2019-2020? | Name of vaccine",
		"2_did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non-usable_stage_during_field_observed_in"=>"9.5 Did you find any vaccine with vaccine vial monitor (VVM) in non‐usable stage during monitoring 2019-2020? | Observed in",

		"2_did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non-usable_stage_during_field_reason"=>"9.5 Did you find any vaccine with vaccine vial monitor (VVM) in non‐usable stage during monitoring 2019-2020? | Reason",

		"2_did_you_find_any_vaccine_with_vaccine_vial_monitor_in_non-usable_stage_during_field_action_taken" => "9.5 Did you find any vaccine with vaccine vial monitor (VVM) in non‐usable stage during monitoring 2019-2020? | Action taken",
		"please_share_the_details_of_alternate_vaccine_delivery_avd_mechanism_working_in_the_state"=>"9.6 Please share the details of Alternate Vaccine Delivery (AVD) mechanism working in the state?",
		"additional_commentsremarks_step9"=>"Additional comments/remarks",

		"what_is_the_mechanism_of_waste_disposal_system_in_blockscold_chain_point"=>"10.1 What is the mechanism of waste disposal system in blocks/cold chain point?",
		"what_is_the_mechanism_of_waste_disposal_system_in_blockscold_chain_point[]"=>"10.1 What is the mechanism of waste disposal system in blocks/cold chain point?",
		"what_is_the_mechanism_of_waste_disposal_system_in_blockscold_chain_point_others" => "10.1 What is the mechanism of waste disposal system in blocks/cold chain point?",
		"is_there_any_inventory_of_hub_cutters_at_the_district_level_store"=>"10.2 Is there any inventory of hub cutters at the district level store?",
		"is_there_any_inventory_of_hub_cutters_at_the_district_level_store_yes"=>"10.2 Is there any inventory of hub cutters at the district level store? | yes  provide numbers",
		"what_is_the_mechanism_for_replacement_of_hub_cutters_in_blocks"=>"10.3 What is the mechanism for replacement of hub cutters in blocks?",
		"additional_commentsremarks_step10"=>"Additional comments/remarks",
		"in_the_last_6_months_how_many_supervisory_visits_were_made_by_youyour_office_in_the_blocks_for_immunization_activities"=>"11.1 In the last 6 months, how many supervisory visits were made by you/your office in the blocks for immunization activities?",

		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_name_of_district_1"=>"11.2 What were the main issues faced during the last two supervisory visits? | Name of block 1",
		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_issues_1"=>"11.2 What were the main issues faced during the last two supervisory visits? | Issues 1",
		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_action_taken_1"=>"11.2 What were the main issues faced during the last two supervisory visits? | Action taken 1",

		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_name_of_district_2"=>"11.2 What were the main issues faced during the last two supervisory visits? | Name of block 2",
		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_issues_2"=>"11.2 What were the main issues faced during the last two supervisory visits? | Issues 2",
		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_action_taken_2"=>"11.2 What were the main issues faced during the last two supervisory visits? | Action taken 2",

		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_name_of_district_3"=>"11.2 What were the main issues faced during the last two supervisory visits? | Name of block 3",
		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_issues_3"=>"11.2 What were the main issues faced during the last two supervisory visits? | Issues 3",
		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_action_taken_3"=>"11.2 What were the main issues faced during the last two supervisory visits? | Action taken 3",

		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_name_of_district_4"=>"11.2 What were the main issues faced during the last two supervisory visits? | Name of block 4",
		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_issues_4"=>"11.2 What were the main issues faced during the last two supervisory visits? | Issues 4",
		"what_were_the_main_issues_faced_during_the_last_two_supervisory_visits_action_taken_4"=>"11.2 What were the main issues faced during the last two supervisory visits? | Action taken 4",
		"radio_buttonswere_these_observations_documented_after_your_supervisory_visits"=>"11.3 (a) Were these observations documented after your supervisory visits?",
		"were_these_observations_shared_with_block_medical_officers"=>"11.3 (b) Were these observations shared with block medical officers?",
		"how_many_immunization_sessions_monitored_by_govt_officials_and_partners_2019_20"=>"11.4 How many immunization sessions monitored by govt. officials and partners? | 2019-20",
		"how_many_immunization_sessions_monitored_by_govt_officials_and_partners_2020_21"=>"11.4 How many immunization sessions monitored by govt. officials and partners? | 2020-21",
		"has_the_district_designated_nodal_officer_for_urban_immunization_activities"=>"11.5 Has the district designated nodal officer for urban immunization activities?",
		"how_many_dtfi_meetings_were_conducted_in_the_last_6_months"=>"11.6 How many DTF(I) meetings were conducted in the last 6 months?",
		"last_dtfi_meeting_held_attach_minutes_"=>"11.6 How many DTF(I) meetings were conducted in the last 6 months? | Attached minutes",
		"has_any_state‐level_official_attended_the_dtfi_meeting_in_your_district"=>"11.7 Has any state‐level official attended the DTF(I) meeting in your district?",

		"no_of_district‐level_immunization_review_meetings_held_with_mo_in‐charge_moics_2019_20"=>"11.8 No. of district‐level immunization review meetings held with MO in‐charge (MOICs)? | 2019-20",
		"no_of_district‐level_immunization_review_meetings_held_with_mo_in‐charge_moics_2020_21"=>"11.8 No. of district‐level immunization review meetings held with MO in‐charge (MOICs)? | 2020-21",
		"date_of_last_state_level_review_meeting_held_date"=>"11.9 Date of the last district‐level review meeting held",
		"attach_meeting_agenda_minutes_and_list_of_participants_file_upload"=>"Attach the review meeting agenda and minutes",
		"moics_that_did_not_attend_the_last_district‐_level_review_meeting_bo_attended_against_total_moics"=>"11.11 MOICs that did not attend the last district‐ level review meeting Formula | No. attended against total MOICs (for example, 20/30)",
		"moics_that_did_not_attend_the_last_district‐_level_review_meeting__of_moics_did_not_attend_meeting"=>"11.11 MOICs that did not attend the last district‐ level review meeting Formula | % of MOICs that did NOT attend the meeting (Refer to formula)",
		"moics_that_did_not_attend_the_last_district‐_level_review_meeting_name_of_blocks_from_where_moics_did_not_attend_meeting"=>"11.11 MOICs that did not attend the last district‐ level review meeting Formula | Names of blocks from where MOICs did not attend the meeting",

		"how_many_review_meetings_have_been_held_with_cold_chain_handlers_in_the_district_during_2019-2020"=>"11.12 How many review meetings have been held with cold chain handlers in the district during 2019-2020?",
		"how_many_review_meetings_have_been_held_with_cold_chain_handlers_in_the_district_during_2020-2021"=>"11.12 How many review meetings have been held with cold chain handlers in the district during 2020-2021?",

		"district‐level_cold_chain_review_meeting_conducted_with_refrigerator_mechanics_and_district_vaccine_store_keepers_during_2019-2020_attach_review_meeting_agenda_and_minutes"=>"11.13 District‐level cold chain review meeting conducted with refrigerator mechanics and district vaccine store keepers during 2019-2020",
		"district‐level_cold_chain_review_meeting_conducted_with_refrigerator_mechanics_and_district_vaccine_store_keepers_during_2020-2021_attach_review_meeting_agenda_and_minutes"=>"11.13 District‐level cold chain review meeting conducted with refrigerator mechanics and district vaccine store keepers during 2020-2021",

		"district‐level_cold_chain_review_meeting_conducted_with_refrigerator_mechanics_and_district_vaccine_store_keepers_during_2019-2020_amp_2020-2021_attach_review_meeting_agenda_and_minutes"=>"11.13 District‐level cold chain review meeting conducted with refrigerator mechanics and district vaccine store keepers during 2019-2020 & 2020-2021 | Attach review meeting agenda and minutes",

		"if_yes_district‐level_cold_chain_review_meeting_conducted_with_refrigerator_mechanics_and_district_vaccine_store_keepers_during_2019-2020_amp_2020-2021_attach_review_meeting_agenda_and_minutes"=>"11.13 District‐level cold chain review meeting conducted with refrigerator mechanics and district vaccine store keepers during 2019-2020 & 2020-2021 | Attach review meeting agenda",

		"did_the_district_send_its_vaccine_and_cold_chain_handler_andor_vaccine_store_keeper_for_any_review_meeting_at_state_level_in__2019-2020"=>"11.14 Did the district send its vaccine and cold chain handler and/or vaccine store keeper for any review meeting at state level in 2019-2020?",
		"if_yes_did_the_district_send_its_vaccine_and_cold_chain_handler_andor_vaccine_store_keeper_for_any_review_meeting_at_state_level_in__2019-2020"=>"11.14 Did the district send its vaccine and cold chain handler and/or vaccine store keeper for any review meeting at state level in 2019-2020? | provide details of meeting held and date (dd/mm/yyyy)",

		"is_the_district_aefi_committee_in_place"=>"12.1 Is the district AEFI committee in place?",
		"have_you_dio_been_trained_on_the_revised_aefi_guidelines_issued_in_2015"=>"12.2 Have you (DIO) been trained on the revised AEFI guidelines issued in 2015?",
		"has_dio_trained_hisher_block_medical_officers_on_the_revised_aefi_guidelines_issued_in_2015"=>"12.2.1 Has DIO trained his/her block medical officers on the revised AEFI guidelines issued in 2015?",
		"attach_list_of_members_and_tors_of_district_aefi_committee"=>"12.1 Is the district AEFI committee in place? | Attach list of members and ToRs of district AEFI committee",
		"number_of_blocks_in_which_trainings_of_all_mos_completed_on_aefi_guidelines_2015"=>"12.3 Number of blocks in which trainings of all MOs completed on AEFI guidelines 2015",
		"number_of_blocksplanning_units_which_are_maintaining_aefi_register"=>"12.4 Number of blocks/planning units which are maintaining AEFI register",

		"how_many_district_aefi_committee_meetings_were_held_during_2019-2020"=>"12.5 How many district AEFI committee meetings were held during 2019-2020?",
		"how_many_district_aefi_committee_meetings_were_held_during_2020-2021"=>"12.5 How many district AEFI committee meetings were held during 2020-2021?",

		"how_many_district_aefi_committee_meetings_were_held_during__2019-2020__2020-2021_attachment"=>"Attach the last district AEFI committee meeting agenda, minutes, list of participants and action reports",

		"serious_severe_aefi_cases_2019_20"=>"12.6 No. of serious, severe or non‐serious AEFI events reported in relation to any vaccine in the last two years. | 2019-20 | Serious, severe AEFI cases",
		"serious_severe_aefi_cases_2020_21"=>"12.6 No. of serious, severe or non‐serious AEFI events reported in relation to any vaccine in the last two years. | 22020-21 | Serious, severe AEFI cases",
		"non_serious_aefi_cases_2019_20"=>"12.6 No. of serious, severe or non‐serious AEFI events reported in relation to any vaccine in the last two years. | 2019-20 | Non-serious AEFI cases",
		"non_serious_aefi_cases_2020_21"=>"12.6 No. of serious, severe or non‐serious AEFI events reported in relation to any vaccine in the last two years. | 2020-21 | Non-serious AEFI cases",
		"how_is_the_district_planning_to_intensify_aefi_surveillance_for_all_vaccines_in_blocks_before_pcvintroduction"=>"12.7 How is the district planning to intensify AEFI surveillance for all vaccines in blocks before PCVintroduction?",
		"routine_immunization_sessions_held_numbers_hmis"=>"13.1 Routine immunization sessions held | Numbers (HMIS)",
		"routine_immunization_sessions_held_fund_utilized_in_inr_pip"=>"13.1 Routine immunization sessions held | Fund utilized in INR (PIP in Part C)",
		"routine_immunization_sessions_held_inr_per_session"=>"13.1 Routine immunization sessions held Norm: @ INR per session",
		"children_achieved_full_immunization_coverage_at_one_year_of_age_numbers_hmis"=>"13.2 Children achieved full immunization coverage at one year of age | Numbers (HMIS)",

		"children_achieved_full_immunization_coverage_at_one_year_of_age_fund_utilized_in_inr_pip"=>"13.2 Children achieved full immunization coverage at one year of age | Fund utilized in INR (PIP in Part C)",
		"children_achieved_full_immunization_coverage_at_one_year_of_age_inr_per_session"=>"13.2 Children achieved full immunization coverage at one year of age Norm: @ INR per fully immunized child",
		"children_achieved_complete_immunization_coverage_at_two_years_of_age_numbers_hmis"=>"13.3 Children achieved complete immunization coverage at two years of age | Numbers (HMIS)",
		"children_achieved_complete_immunization_coverage_at_two_years_of_age_fund_utilized_in_inr_pip"=>"13.3 Children achieved complete immunization coverage at two years of age | Fund utilized in INR (PIP in Part C)",
		"children_achieved_complete_immunization_coverage_at_two_years_of_age_inr_per_session"=>"13.3 Children achieved complete immunization coverage at two years of age Norm: @ INR per completely immunized child",

		"please_specify_your_plan_for_officially_launching_pcv_in_the_district"=>"14.1 Please specify your plan for officially launching PCV in the district.",

		"who_will_be_the_person_responsible_for_iec_activities_related_to_pcv_introduction_in_the_district_name"=>"14.2 Who will be the person responsible for IEC activities related to PCV introduction in the district? | Name",

		"who_will_be_the_person_responsible_for_iec_activities_related_to_pcv_introduction_in_the_district_designation" =>"14.2 Who will be the person responsible for IEC activities related to PCV introduction in the district? | Designation",
		"who_will_be_the_person_responsible_for_iec_activities_related_to_pcv_introduction_in_the_district_mobile_no"=>"14.2 Who will be the person responsible for IEC activities related to PCV introduction in the district? | Mobile no",

		"has_the_district_identified_any_resource_for_funding_the_launch_of_pcv"=>"14.3 Has the district identified any resource for funding the launch of PCV?",

		"if_yes_does_the_district_have_contact_details_of_key_media_persons_print_and_electronic_who_cover_health_news_if_yes_attech_list_with_contact_detail"=>"14.4 Does the district have contact details of key media persons (print and electronic) who cover health news? | If yes, attach the list with contact details",
		"does_the_district_have_contact_details_of_key_media_persons_print_and_electronic_who_cover_health_news"=>"14.4 Does the district have contact details of key media persons (print and electronic) who cover health news?",

		"additional_commentsremarks_step14"=>"Additional comments/remarks",

		"name_the_blocks_that_have_not_reported_any_case_of_diphtheria_tetanus_or_pertussis_2019_20"=>"15.1 Name the blocks that have NOT reported any case of diphtheria, tetanus or pertussis? | 2019-20",
		"name_the_blocks_that_have_not_reported_any_case_of_diphtheria_tetanus_or_pertussis_2020_21"=>"15.1 Name the blocks that have NOT reported any case of diphtheria, tetanus or pertussis? | 2020-21",
		"no_of_silent_blocks_from_where_no_afp_cases_have_been_reported_2019_20"=>"15.2 No. of silent blocks from where no AFP cases have been reported | 2019-20",

		"no_of_silent_blocks_from_where_no_afp_cases_have_been_reported_2020_21"=>"15.2 No. of silent blocks from where no AFP cases have been reported. | 2020-21",

		"how_many_blocks_reported_measlesrubellamixed_cases_2019_20"=>"15.3 How many blocks reported Measles/Rubella/Mixed cases? | 2019-20",

		"how_many_blocks_reported_measlesrubellamixed_cases_2020_21"=>"15.3 How many blocks reported Measles/Rubella/Mixed cases? | 2020-21",
		"no_of_silent_blocks_from_where_no_measlesmr_cases_have_been_reported_2019_20"=>"15.4 No. of silent blocks from where no Measles/MR cases have been reported. | 2019-20",
		"no_of_silent_blocks_from_where_no_measlesmr_cases_have_been_reported_2020_21"=>"15.4 No. of silent blocks from where no Measles/MR cases have been reported. | 2020-21",
		"how_many_lab‐confirmed_measles_cases_has_the_district_reported_2019_20"=>"15.5 How many lab‐confirmed measles cases has the district reported? | 2019-20",
		"how_many_lab‐confirmed_measles_cases_has_the_district_reported_2020_21"=>"15.5 How many lab‐confirmed measles cases has the district reported? | 2020-21",
		"additional_commentsremarks_step15"=>"Additional comments/remarks",


		"total_no_of_cold_chain_points_in_the_district_current_situation"=>"16.1 Total no. of cold chain points in the district (current situation)",
		"total_no_of_cold_chain_handlers_in_the_district_current_situation"=>"16.2 Total no. of cold chain handlers in the district (current situation)",
		
		"total_no_of_cold_chain_points_with_evin_functional"=>"16.3 Total no. of cold chain points with eVIN functional?",

		"was_the_district_vaccine_store_keeper_trained_at_state_level_during_these_workshops_on_revised_vcch_module"=>"16.4 Was the district vaccine store keeper trained at state level during these workshops? | On revised VCCH module",

		"was_the_district_vaccine_store_keeper_trained_at_state_level_during_these_workshops_evin"=>"16.4 Was the district vaccine store keeper trained at state level during these workshops? | eVIN",


		"how_many_cold_chain_handlers_per_vaccine_storage_point_were_trained_during_these_workshops_on_revised_vcch_module"=>"16.5 How many cold chain handlers per vaccine storage point were trained during these workshops? | On revised VCCH module",
		"how_many_cold_chain_handlers_per_vaccine_storage_point_were_trained_during_these_workshops_evin"=>"16.5 How many cold chain handlers per vaccine storage point were trained during these workshops? | eVIN",


		"has_the_process_to_update_stock_registers_to_incorporate_pcv_been_initiated"=>"16.6 Has the process to update stock registers to incorporate PCV been initiated?",
		"no_has_the_process_to_update_stock_registers_to_incorporate_pcv_been_initiated"=>"16.6 If no, mention expected date when stock registers will be updated to document PCV stock",

		"commontable_aligntop[1][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block",
		"commontable_aligntop[1][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store",
		"commontable_aligntop[1][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area",
		"commontable_aligntop[1][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L)",
		"commontable_aligntop[1][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L)",

		"commontable_aligntop[2][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 2",
		"commontable_aligntop[2][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 2",
		"commontable_aligntop[2][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 2",
		"commontable_aligntop[2][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 2",
		"commontable_aligntop[2][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 2",

		"commontable_aligntop[3][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 3",
		"commontable_aligntop[3][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 3",
		"commontable_aligntop[3][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 3",
		"commontable_aligntop[3][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 3",
		"commontable_aligntop[3][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 3",

		"commontable_aligntop[4][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 4",
		"commontable_aligntop[4][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 4",
		"commontable_aligntop[4][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 4",
		"commontable_aligntop[4][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 4",
		"commontable_aligntop[4][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 4",

		"commontable_aligntop[5][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 5",
		"commontable_aligntop[5][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 5",
		"commontable_aligntop[5][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 5",
		"commontable_aligntop[5][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 5",
		"commontable_aligntop[5][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 5",

		"commontable_aligntop[6][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 6",
		"commontable_aligntop[6][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 6",
		"commontable_aligntop[6][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 6",
		"commontable_aligntop[6][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 6",
		"commontable_aligntop[6][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 6",

		"commontable_aligntop[7][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 7",
		"commontable_aligntop[7][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 7",
		"commontable_aligntop[7][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 7",
		"commontable_aligntop[7][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 7",
		"commontable_aligntop[7][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 7",

		"commontable_aligntop[8][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 8",
		"commontable_aligntop[8][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 8",
		"commontable_aligntop[8][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 8",
		"commontable_aligntop[8][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 8",
		"commontable_aligntop[8][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 8",

		"commontable_aligntop[9][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 9",
		"commontable_aligntop[9][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 9",
		"commontable_aligntop[9][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 9",
		"commontable_aligntop[9][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 9",
		"commontable_aligntop[9][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 9",

		"commontable_aligntop[10][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 10",
		"commontable_aligntop[10][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 10",
		"commontable_aligntop[10][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 10",
		"commontable_aligntop[10][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 10",
		"commontable_aligntop[10][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 10",

		"commontable_aligntop[11][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 11",
		"commontable_aligntop[11][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 11",
		"commontable_aligntop[11][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 11",
		"commontable_aligntop[11][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 11",
		"commontable_aligntop[11][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 11",

		"commontable_aligntop[12][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 12",
		"commontable_aligntop[12][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 12",
		"commontable_aligntop[12][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 12",
		"commontable_aligntop[12][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 12",
		"commontable_aligntop[12][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 12",

		"commontable_aligntop[13][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 13",
		"commontable_aligntop[13][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 13",
		"commontable_aligntop[13][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 13",
		"commontable_aligntop[13][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 13",
		"commontable_aligntop[13][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 13",

		"commontable_aligntop[14][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 14",
		"commontable_aligntop[14][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 14",
		"commontable_aligntop[14][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 14",
		"commontable_aligntop[14][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 14",
		"commontable_aligntop[14][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 14",

		"commontable_aligntop[15][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 15",
		"commontable_aligntop[15][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 15",
		"commontable_aligntop[15][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 15",
		"commontable_aligntop[15][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 15",
		"commontable_aligntop[15][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 15",

		"commontable_aligntop[16][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 16",
		"commontable_aligntop[16][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 16",
		"commontable_aligntop[16][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 16",
		"commontable_aligntop[16][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 16",
		"commontable_aligntop[16][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 16",

		"commontable_aligntop[17][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 17",
		"commontable_aligntop[17][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 17",
		"commontable_aligntop[17][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 17",
		"commontable_aligntop[17][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 17",
		"commontable_aligntop[17][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 17",

		"commontable_aligntop[18][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 18",
		"commontable_aligntop[18][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 18",
		"commontable_aligntop[18][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 18",
		"commontable_aligntop[18][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 18",
		"commontable_aligntop[18][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 18",

		"commontable_aligntop[19][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 19",
		"commontable_aligntop[19][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 19",
		"commontable_aligntop[19][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 19",
		"commontable_aligntop[19][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 19",
		"commontable_aligntop[19][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 19",

		"commontable_aligntop[20][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 20",
		"commontable_aligntop[20][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 20",
		"commontable_aligntop[20][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 20",
		"commontable_aligntop[20][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 20",
		"commontable_aligntop[20][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 20",

		"commontable_aligntop[21][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 21",
		"commontable_aligntop[21][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 21",
		"commontable_aligntop[21][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 21",
		"commontable_aligntop[21][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 21",
		"commontable_aligntop[21][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 21",

		"commontable_aligntop[22][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 22",
		"commontable_aligntop[22][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 22",
		"commontable_aligntop[22][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 22",
		"commontable_aligntop[22][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 22",
		"commontable_aligntop[22][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 22",

		"commontable_aligntop[23][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 23",
		"commontable_aligntop[23][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 23",
		"commontable_aligntop[23][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 23",
		"commontable_aligntop[23][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 23",
		"commontable_aligntop[23][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 23",

		"commontable_aligntop[24][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 24",
		"commontable_aligntop[24][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 24",
		"commontable_aligntop[24][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 24",
		"commontable_aligntop[24][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 24",
		"commontable_aligntop[24][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 24",

		"commontable_aligntop[25][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 25",
		"commontable_aligntop[25][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 25",
		"commontable_aligntop[25][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 25",
		"commontable_aligntop[25][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 25",
		"commontable_aligntop[25][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 25",

		"commontable_aligntop[26][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 26",
		"commontable_aligntop[26][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 26",
		"commontable_aligntop[26][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 26",
		"commontable_aligntop[26][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 26",
		"commontable_aligntop[26][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 26",

		"commontable_aligntop[27][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 27",
		"commontable_aligntop[27][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 27",
		"commontable_aligntop[27][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 27",
		"commontable_aligntop[27][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 27",
		"commontable_aligntop[27][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 27",

		"commontable_aligntop[28][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 28",
		"commontable_aligntop[28][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 28",
		"commontable_aligntop[28][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 28",
		"commontable_aligntop[28][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 28",
		"commontable_aligntop[28][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 28",

		"commontable_aligntop[29][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 29",
		"commontable_aligntop[29][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 29",
		"commontable_aligntop[29][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 29",
		"commontable_aligntop[29][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 29",
		"commontable_aligntop[29][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 29",

		"commontable_aligntop[30][details_of_cold_chain_space_available_name_of_block]"=>"16.7 Name of block 30",
		"commontable_aligntop[30][details_of_cold_chain_space_available_name_of_cold_chain_store]"=>"16.7 Name of cold chain store 30",
		"commontable_aligntop[30][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]"=>"16.7 Total Population of the catchment area 30",
		"commontable_aligntop[30][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]"=>"16.7 Cold chain (+2 to +8 degree Celsius) space available (L) 30",
		"commontable_aligntop[30][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]"=>"16.7 Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) 30",



		"total_no_of_refrigerator_mechanics_cold_chain_technicians_currently_positioned_in_the_district_sanctioned"=>"16.8 Total no. of refrigerator mechanics/ cold chain technicians currently positioned in the district | Sanctioned",
		"total_no_of_refrigerator_mechanics_cold_chain_technicians_currently_positioned_in_the_district_currently_posted"=>"16.8 Total no. of refrigerator mechanics/ cold chain technicians currently positioned in the district | Currently Posted",

		"has_the_refrigerator_mechanic_been_technically_trained_by_goi_in_the_last_3_years"=>"16.9 Has the refrigerator mechanic been technically trained by GoI in the last 3 years?",
		
		"does_the_refrigerator_mechanic_has_a_tool_kit"=>"16.10 Does the refrigerator mechanic has a tool kit?",

		"is_there_a_mechanism_in_place_that_ensures_preventive_maintenance_visit_by_refrigerator_mechanic_to_all_cold_chain_points_in_a_block"=>"16.11 Preventive maintenance visit ‐ Reach every ILR/DF",
		"is_there_a_mechanism_in_place_that_ensures_preventive_maintenance_visit_by_refrigerator_mechanic_to_all_cold_chain_points_in_a_block_guidline"=>"16.11 Attach guidelines related to preventive maintenance, if any",
		"yes_is_there_a_mechanism_in_place_that_ensures_preventive_maintenance_visit_by_refrigerator_mechanic_to_all_cold_chain_points_in_a_block"=>"16.11 If yes, what is the frequency of visit to each cold chain point (irrespective of complaint)",

		"how_many_freezers_and_refrigerators_ilrdfs_do_not_have_functional_thermometers_ilr"=>"16.12 How many freezers and refrigerators (ILR/DFs) do not have functional thermometers? | ILR",
		"how_many_freezers_and_refrigerators_ilrdfs_do_not_have_functional_thermometers_deep_freezer"=>"16.12 How many freezers and refrigerators (ILR/DFs) do not have functional thermometers? | Deep Freezer",

		"how_many_ilrs_and_dfs_in_blocks_are_working_without_stabilizers"=>"16.15 How many ILRs and DFs in blocks are working without stabilizers?",

		"how_many_ilrs_and_dfs_in_blocks_are_working_without_stabilizers_ilr"=>"16.13 How many ILRs and DFs in blocks are working without stabilizers? | ILR",
		"how_many_ilrs_and_dfs_in_blocks_are_working_without_stabilizers_deep_freezer"=>"16.13 How many ILRs and DFs in blocks are working without stabilizers? | Deep Freezer",

		"are_temperatures_monitored_and_recorded_on_weekends_and_holidays"=>"16.14 Are temperatures monitored and recorded on weekends and holidays?",

		"has_there_been_any_report_of_storing_other_drugsmaterials_in_the_ilr_or_dfs_along_with_vaccines_in__2019-2020"=>"16.15 Has there been any report of storing other drugs/materials in the ILR or DFs along with vaccines in 2019-2020?",
		"yes_has_there_been_any_report_of_storing_other_drugsmaterials_in_the_ilr_or_dfs_along_with_vaccines_in__2019-2020" => "16.15 If yes, specify the name of that other drug or material",

		"has_the_district_issued_any_clear_guidelines_mentioning_that_other_drugsmaterials_should_not_be_stored_in_the_ilr"=>"16.16 Has the district issued any clear guidelines mentioning that other drugs/materials should not be stored in the ILR?",


		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_district_cold_chain"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the district? | Cold chain",
		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_district_cold_chain_yes"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the district? | Cold chain | Yes",

		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_district_iec_materialsmedia"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the district? | IEC materials/media",
		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_district_iec_materialsmedia_yes"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the district? | IEC materials/media | Yes",

		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_district_training"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the district? | Training",
		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_district_training_yes"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the district? | Training | Yes",

		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_district_covid_19_related"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the district? | COVID-19 related",
		"what_are_the_programmatic_challenges_that_you_foresee_at_various_levels_for_pcv_introduction_in_the_district_other_specify"=>"17.1 Do you foresee programmatic challenges at various levels for PCV introduction in the district? | Other specify",


		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_health_staff_and_officials_issues_and_challenges"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the district? | Issues and challenges | Health staff and officials(Medical Officers, Health workers and mobilizers)",
		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_health_staff_and_officials_proposed_solutions"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the district? | Proposed solutions | Health staff and officials(Medical Officers, Health workers and mobilizers)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_professional_societies_issues_and_challenges"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the district? | Issues and challenges | Professional societies(IMA, IAP, Medical Colleges)",
		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_professional_societies_proposed_solutions"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the district? | Proposed solutions | Professional societies(IMA, IAP, Medical Colleges)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_communitypublic_issues_and_challenges"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the district? | Issues and challenges | Community / Public(e. g resistance, low awareness, fear of AEFI, religious beliefs, sociocultural factors etc.)",
		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_communitypublic_proposed_solutions"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the district? | Proposed solutions | Community / Public (e. g resistance, low awareness, fear of AEFI, religious beliefs, sociocultural factors etc.)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_government_issues_and_challenges"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the district? | Issues and challenges | Government(e.g. Inter sectoral coordination, ICDS and PRI involvement etc.)",
		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_government_proposed_solutions"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the district? | Proposed solutions | Government (e.g. Inter sectoral coordination, ICDS and PRI involvement etc.)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_media_print_electronic_and_social_media_issues_and_challenges"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the district? | Issues and challenges | Media (Print, electronic and social media)(e.g. Positive/ negative media coverage on health issues in last 1 year)",
		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_media_print_electronic_and_social_media_proposed_solutions"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the district? | Proposed solutions | Media (Print, electronic and social media) (e.g. Positive/ negative media coverage on health issues in last 1 year)",

		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_others_issues_and_challenges"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the district? | Issues and challenges | Others",
		"key_issues_that_you_foresee_at_various_levels_for_pcv_introduction_others_proposed_solutions"=>"17.2 What are the key issues that you foresee at various levels for PCV introduction in the district? | Others",

		"has_the_district_undertaken_some_innovative_initiatives_to_improve_routine_immunization_processes_and_outcomes_in_the_last_3_years"=>"17.3 Has the district undertaken some innovative initiatives to improve routine immunization processes and outcomes in last 3 years?",
		"has_the_district_undertaken_some_innovative_initiatives_to_improve_routine_immunization_processes_and_outcomes_in_the_last_3_years_briefly_mention_about_the_innovation"=>"17.3 Has the district undertaken some innovative initiatives to improve routine immunization processes and outcomes in last 3 years? | yes | briefly mention about the innovation",
		"has_the_district_undertaken_some_innovative_initiatives_to_improve_routine_immunization_processes_and_outcomes_in_the_last_3_years_when_was_it_started"=>"17.3 Has the district undertaken some innovative initiatives to improve routine immunization processes and outcomes in last 3 years? | yes | When was it started?",
		"has_the_district_undertaken_some_innovative_initiatives_to_improve_routine_immunization_processes_and_outcomes_in_the_last_3_years_what_was_the_outcome"=>"17.3 Has the district undertaken some innovative initiatives to improve routine immunization processes and outcomes in last 3 years? | yes | What was the outcome?",
		"has_the_district_undertaken_some_innovative_initiatives_to_improve_routine_immunization_processes_and_outcomes_in_the_last_3_years_attach_extra_sheets_if_required"=>"17.3 Has the district undertaken some innovative initiatives to improve routine immunization processes and outcomes in last 3 years? | yes | Attach extra sheets, if required",

		"what_technical_and_financial_support_do_you_expect_from_statepartners_for_pcv_introduction"=>"17.4 What technical and financial support do you expect from state/partners for PCV introduction?",

		"additional_commentsremarks_step17"=>"Additional comments/remarks"
	);
}
