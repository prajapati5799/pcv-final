<?php
defined( 'ABSPATH' ) || exit;

//Bitld district query and return results
function get_district_form_results($state_id = ''){
    global $wpdb;

    if( empty($state_id) ){
        $state_id = get_current_user_state_id();
    }
    
	$district_query     = 'SELECT * FROM '.NEX_FORM_TEMP_ENTRY_TBL.' WHERE user_id IN (SELECT DISTINCT ID FROM '. USER_TBL . ' as u LEFT JOIN '. USERMETA_TBL . ' as u1 ON u1.user_id = u.ID LEFT JOIN '. USERMETA_TBL . ' as u2 ON u2.user_id = u.ID WHERE (u1.meta_key = "state" AND u1.meta_value = "' . $state_id . '" ) AND (u2.meta_key = "city" AND u2.meta_value > "0" ) ORDER BY Id DESC) AND nex_form_id = "' . DISTRICT_FORM_ID . '" AND record_id > "0" AND is_published = "1" ORDER BY Id DESC';

    $district_query     = 'SELECT * FROM '.NEX_FORM_TEMP_ENTRY_TBL.' WHERE user_id IN (SELECT DISTINCT ID FROM '. USER_TBL . ' as u LEFT JOIN '. USERMETA_TBL . ' as u1 ON u1.user_id = u.ID LEFT JOIN '. USERMETA_TBL . ' as u2 ON u2.user_id = u.ID WHERE (u1.meta_key = "state" AND u1.meta_value = "' . $state_id . '" ) AND (u2.meta_key = "city" AND u2.meta_value > "0" ) ORDER BY Id DESC) AND nex_form_id = "' . DISTRICT_FORM_ID . '" ORDER BY Id DESC';
            
    $getDistrictFormData   = $wpdb->get_results($district_query, ARRAY_A);

    return $getDistrictFormData;
}

//Total number of district in a state
function get_total_district_in_state( $stateID ){
	global $wpdb;
	$total_district_count = 0;
    
	$total_district_count = $wpdb->get_row("SELECT COUNT(id) as total_district_count FROM " .CITY_TBL . " WHERE states_id = '" . $stateID . "'", ARRAY_A);

    if( $total_district_count['total_district_count'] > 0 ){
        return $total_district_count['total_district_count'];
    }
    return 0;
}

//Get formdata value by key
function get_district_field_value_by_key( $getDistrictFormData, $data_key, $stateID ) {
    
    global $wpdb;

    //$cuserID            = get_current_user_id();

    // $district_query     = 'SELECT * FROM '.NEX_FORM_TEMP_ENTRY_TBL.' WHERE user_id IN (SELECT DISTINCT ID FROM '. USER_TBL . ' as u LEFT JOIN '. USERMETA_TBL . ' as u1 ON u1.user_id = u.ID LEFT JOIN '. USERMETA_TBL . ' as u2 ON u2.user_id = u.ID WHERE (u1.meta_key = "state" AND u1.meta_value = "' . $stateID . '" ) AND (u2.meta_key = "city" AND u2.meta_value > "0" ) ORDER BY Id DESC) AND nex_form_id > "0" AND record_id > "0" AND is_published = "1" ORDER BY Id DESC';
            
    // $getDistrictFormData   = $wpdb->get_results($district_query, ARRAY_A);
    
    $data                   = 0;

    if( $getDistrictFormData && !empty($getDistrictFormData) ){

        foreach( $getDistrictFormData as $district_key => $district ){
            
            $formData       = json_decode( $district['form_data'] );

            

            if( $data_key == "total_population_of_district" ){

                $get_field_val      = find_through_array( 'total_population_of_district_input', $formData );

                if( empty($get_field_val) ){
                    $get_field_val  = find_through_array( $data_key, $formData );
                }
                
            } else if( $data_key == "total_no_of_infants" ){

                $get_field_val      = find_through_array( 'total_no_of_infants_input', $formData );

                if( empty($get_field_val) ){
                    $get_field_val  = find_through_array( $data_key, $formData );
                }
                
            } else {
                $get_field_val      = find_through_array( $data_key, $formData );
            }

            $data           = $data + $get_field_val;
        }       
    }

    if( $data > 0 ){

        $total_district     = get_total_district_in_state($stateID);

        if( $data_key == "total_no_of_anms_in_the_district_regular_sanctioned" ){
            $percentage = ( $data * 100 ) / $total_district;
            return number_format((float)$percentage, 2, '.', '') . "%";
        } else if( $data_key == "total_no_of_anms_in_the_district_regular_currently_posted" ){
            $percentage = ( $data * 100 ) / $total_district;
            return number_format((float)$percentage, 2, '.', '') . "%";
        } else if( $data_key == "total_no_of_anms_in_the_district_contractual_sanctioned" ){
            $percentage = ( $data * 100 ) / $total_district;
            return number_format((float)$percentage, 2, '.', '') . "%";
        } else if( $data_key == "total_no_of_anms_in_the_district_contractual_currently_posted" ){
            $percentage = ( $data * 100 ) / $total_district;
            return number_format((float)$percentage, 2, '.', '') . "%";
        } else if( $data_key == "total_no_of_sub_centers_with_two_anms_input" ){
            $percentage = ( $data * 100 ) / $total_district;
            return number_format((float)$percentage, 2, '.', '') . "%";
        }
    }

    return $data;
}

//Get map data value by key
function get_district_map_data_by_key( $getDistrictFormData, $data_key, $stateID ) {
    global $wpdb;
    
    $map_data               = [];
    $data                   = 0;

    if( $getDistrictFormData && !empty($getDistrictFormData) ){

        foreach( $getDistrictFormData as $district_key => $district ){
            
            $formData       = json_decode( $district['form_data'] );

            if( $data_key == "are_you_posted_as_a_regular_dio" ){

                $get_field_val_o    = find_through_array( $data_key, $formData );
                if( $get_field_val_o == "Yes" ){
                    $get_field_val  = 1;
                }
                
            } else if( $data_key == "total_population_of_district" ){

                $get_field_val      = find_through_array( 'total_population_of_district_input', $formData );

                if( empty($get_field_val) ){
                    $get_field_val  = find_through_array( $data_key, $formData );
                }
                
            } else if( $data_key == "total_no_of_infants" ){

                $get_field_val      = find_through_array( 'total_no_of_infants_input', $formData );

                if( empty($get_field_val) ){
                    $get_field_val  = find_through_array( $data_key, $formData );
                }
                
            } else {
                $get_field_val      = find_through_array( $data_key, $formData );
            }

            $data                   = $data + $get_field_val;
        }       
    }

    if( $data > 0 ){

        $total_district     = get_total_district_in_state($stateID);

        if( $data_key == "total_no_of_anms_in_the_district_regular_sanctioned" ){
            $percentage = ( $data * 100 ) / $total_district;
            return number_format((float)$percentage, 2, '.', '') . "%";
        }
    }

    if( $data >= 0 && $data <= 25 ){
        $map_data['range1'][] = [$map_index_key, $data, $stateID];
    } else if( $data >= 26 && $data <= 50 ){
        $map_data['range2'][] = [$map_index_key, $data, $stateID];
    } else if( $data >= 51 && $data <= 75 ){
        $map_data['range3'][] = [$map_index_key, $data, $stateID];
    } else if( $data >= 76 ){
        $map_data['range4'][] = [$map_index_key, $data, $stateID];
    }

    return $map_data;
}

//Get line chart data value by key
function get_district_line_chart_data_by_key( $getDistrictFormData, $data_key, $stateID ) {
    global $wpdb;
    
    $map_data               = [];
    $data                   = 0;

    if( $getDistrictFormData && !empty($getDistrictFormData) ){

        foreach( $getDistrictFormData as $district_key => $district ){
            
            $user_state_name = get_user_city($district['user_id']);

            $formData       = json_decode( $district['form_data'], true );

            $final_val      = 0;

            if( $data_key == "district_immunization_coverage_penta_3_dpt_3_hmis" ){

                $reported_val1              = find_through_array('penta_3dpt_3_reported_text', $formData);
                if( empty($reported_val1) ){
                    $reported_val1          = find_through_array($data_key, $formData);
                }

                $evaluated_val1              = find_through_array('penta_3dpt_3_evaluated_text', $formData);
                if( empty($reported_val1) ){
                    $reported_val1          = find_through_array('district_immunization_coverage_penta_3_dpt_3_nfhs4', $formData);
                }

                $monitored_val1              = find_through_array('penta_3dpt_3_monitored_text', $formData);

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );

                $map_data['evaluated'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($evaluated_val1) ? floatval($evaluated_val1) : 0
                );

                $map_data['monitored'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($monitored_val1) ? floatval($monitored_val1) : 0
                );

            } else if( $data_key == "district_immunization_coverage_mr1_measles_hmis" ){

                $reported_val1              = find_through_array('mr_1_measles_reported_text', $formData);
                if( empty($reported_val1) ){
                    $reported_val1          = find_through_array($data_key, $formData);
                }

                $evaluated_val1              = find_through_array('mr_1_measles_evaluated_text', $formData);
                if( empty($reported_val1) ){
                    $reported_val1          = find_through_array('district_immunization_coverage_mr1_measles_nfhs4', $formData);
                }

                $monitored_val1              = find_through_array('mr_1_measles_monitored_text', $formData);

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );

                $map_data['evaluated'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($evaluated_val1) ? floatval($evaluated_val1) : 0
                );

                $map_data['monitored'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($monitored_val1) ? floatval($monitored_val1) : 0
                );

            } else if( $data_key == "district_drop_out_rates_penta_1_dpt_1_hmis" ){

                $reported_val1              = find_through_array('penta_1_to_penta_3_drop_out_rate_text', $formData);
                if( empty($reported_val1) ){
                    $reported_val1          = find_through_array($data_key, $formData);
                }

                $evaluated_val1              = find_through_array('penta_3_1_to_mr_1_drop_out_rate_text', $formData);
                if( empty($reported_val1) ){
                    $reported_val1          = find_through_array('district_drop_out_rates_Penta_3_1_to_mr_1_hmis', $formData);
                }

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );

                $map_data['evaluated'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($evaluated_val1) ? floatval($evaluated_val1) : 0
                );

            } else if( $data_key == "have_you_undergone_diomo_immunization_training_at_the_state_level_during_2019-20_or_2020-21" ){
                $reported_val1             = 0;
                $reported_val              = find_through_array('real_val__have_you_undergone_diomo_immunization_training_at_the_state_level_during_2019-20_or_2020-21', $formData);
                if( $reported_val == "Yes" ){
                    $reported_val1          = 1;
                }

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );

            } else if( $data_key == "have_you_been_trained_on_aefi_surveillance_during__2018-2019_or_2019-2020" ){
                $reported_val1             = 0;
                $reported_val              = find_through_array('real_val__have_you_been_trained_on_aefi_surveillance_during__2018-2019_or_2019-2020', $formData);
                if( $reported_val == "Yes" ){
                    $reported_val1          = 1;
                }

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );

            } else if( $data_key == "no_of_district‐level_immunization_review_meetings_held_with_mo_in‐charge_moics_2019_20" ){

                $reported_val1             = find_through_array($data_key, $formData);

                $evaluated_val1            = find_through_array('no_of_district‐level_immunization_review_meetings_held_with_mo_in‐charge_moics_2020_21', $formData);

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );

                $map_data['evaluated'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($evaluated_val1) ? floatval($evaluated_val1) : 0
                );

            } else if( $data_key == "how_many_review_meetings_have_been_held_with_cold_chain_handlers_in_the_district_during_2019-2020" ){

                $reported_val1             = find_through_array($data_key, $formData);

                $evaluated_val1            = find_through_array('how_many_review_meetings_have_been_held_with_cold_chain_handlers_in_the_district_during_2020-2021', $formData);

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );

                $map_data['evaluated'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($evaluated_val1) ? floatval($evaluated_val1) : 0
                );

            } else if( $data_key == "district‐level_cold_chain_review_meeting_conducted_with_refrigerator_mechanics_and_district_vaccine_store_keepers_during_2019-2020_attach_review_meeting_agenda_and_minutes" ){

                $reported_val1             = find_through_array($data_key, $formData);

                $evaluated_val1            = find_through_array('district‐level_cold_chain_review_meeting_conducted_with_refrigerator_mechanics_and_district_vaccine_store_keepers_during_2020-2021_attach_review_meeting_agenda_and_minutes', $formData);

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );

                $map_data['evaluated'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($evaluated_val1) ? floatval($evaluated_val1) : 0
                );

            } else if( $data_key == "how_many_district_aefi_committee_meetings_were_held_during_2019-2020" ){

                $reported_val1             = find_through_array($data_key, $formData);

                $evaluated_val1            = find_through_array('how_many_district_aefi_committee_meetings_were_held_during_2020-2021', $formData);

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );

                $map_data['evaluated'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($evaluated_val1) ? floatval($evaluated_val1) : 0
                );

            } else if( $data_key == "name_the_blocks_that_have_not_reported_any_case_of_diphtheria_tetanus_or_pertussis_2019_20" ){

                $reported_val1             = find_through_array($data_key, $formData);

                $evaluated_val1            = find_through_array('name_the_blocks_that_have_not_reported_any_case_of_diphtheria_tetanus_or_pertussis_2020_21', $formData);

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );

                $map_data['evaluated'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($evaluated_val1) ? floatval($evaluated_val1) : 0
                );

            } else if( $data_key == "no_of_silent_blocks_from_where_no_afp_cases_have_been_reported_2019_20" ){

                $reported_val1             = find_through_array($data_key, $formData);

                $evaluated_val1            = find_through_array('no_of_silent_blocks_from_where_no_afp_cases_have_been_reported_2020_21', $formData);

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );

                $map_data['evaluated'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($evaluated_val1) ? floatval($evaluated_val1) : 0
                );

            } else if( $data_key == "no_of_silent_blocks_from_where_no_measlesmr_cases_have_been_reported_2019_20" ){

                $reported_val1             = find_through_array($data_key, $formData);

                $evaluated_val1            = find_through_array('no_of_silent_blocks_from_where_no_measlesmr_cases_have_been_reported_2020_21', $formData);

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );

                $map_data['evaluated'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($evaluated_val1) ? floatval($evaluated_val1) : 0
                );

            } else {
                $reported_val1              = find_through_array($data_key, $formData);

                $map_data['reported'][] = array(
                    'name' => $user_state_name,
                    'district' => $user_state_name,
                    'val' => !empty($reported_val1) ? floatval($reported_val1) : 0
                );
            }
        }       
    }

    return $map_data;
}

function get_district_bubble_map_data_by_key( $getDistrictFormData, $data_key, $stateID ){
    global $wpdb;

    if( $getDistrictFormData && !empty($getDistrictFormData) ){

        foreach( $getDistrictFormData as $district_key => $district ){
            
            $user_state_name        = get_user_city($district['user_id']);

            $formData               = json_decode( $district['form_data'], true );

            $final_val              = 0;
            $final_val              = find_through_array($data_key, $district);
            $final_val              = floatval($final_val);
            

            if( $final_val >= 0 && $final_val <= 25 ){
                $map_data['range1'][] = [$user_state_name, $final_val];
            } else if( $final_val >= 26 && $final_val <= 50 ){
                $map_data['range2'][] = [$user_state_name, $final_val];
            } else if( $final_val >= 51 && $final_val <= 75 ){
                $map_data['range3'][] = [$user_state_name, $final_val];
            } else if( $final_val >= 76 ){
                $map_data['range4'][] = [$user_state_name, $final_val];
            }

        }
    }

    return $map_data;
}

function get_district_cold_chain_data_by_state( $c_state_id ){

    global $wpdb;
    //$c_state_id         = '512';
    $cuserID            = get_current_user_id();

    $total_district     = $wpdb->get_results("SELECT city FROM " .CITY_TBL . " WHERE states_id = '" . $c_state_id . "'", ARRAY_A);

    $getStateFormData   = $wpdb->get_row("SELECT form_data FROM ".NEX_FORM_TEMP_ENTRY_TBL." WHERE user_id = '" . $cuserID . "' AND is_published = '1'", ARRAY_A);
    
    $formDataArr        =  [];

    $formData           = json_decode( $getStateFormData['form_data'] );
    foreach ($formData as $value) {
        $formDataArr[$value->name] = $value->val;
    }
    
    $html .= '<thead>
                <th>Name of district</th>
                <th>Name of district stores</th>
                <th>Total Population</th>
                <th>Cold chain (+2 to +8 degree Celsius) space available (ILR)</th>
                <th>Cold chain (-15 to -25 degree Celsius) space available (D.F)</th>
            </thead>
            <tbody>';
    if($total_district ){
            foreach ($total_district as $key => $value) {
                
                $districtName           = $formDataArr['name_of_district_'.$key.''];
                $districtstore          = ($formDataArr['name_of_district_stores_'.$key.'']) ? $formDataArr['name_of_district_stores_'.$key.''] : '-';
                $districtpop            = ($formDataArr['total_population_'.$key.'']) ? $formDataArr['total_population_'.$key.''] : '-';
                $district2_8_deg        = ($formDataArr['cold_chain_2_to_8_'.$key.'']) ? $formDataArr['cold_chain_2_to_8_'.$key.''] : '-';
                $district15_25_deg      = ($formDataArr['cold_chain_15_to_25_'.$key.'']) ? $formDataArr['cold_chain_15_to_25_'.$key.''] : '-';

                if(!empty($districtName)){              
                    $html .= '<tr>
                            <td>'.$districtName.'</td>
                            <td>'.$districtstore.'</td>
                            <td>'.$districtpop.'</td>
                            <td>'.$district2_8_deg.'</td>
                            <td>'.$district15_25_deg.'</td>
                        </tr>';
                } else {
                    $html .= '<tr><td colspan="5" align="center">No data available!</td></tr>';
                }                   
            }
    } else {
        $html .= '<tr><td colspan="5" align="center">No data available!</td></tr>';
    }
    $html .= '</tbody>';
    return $html;
}

?>