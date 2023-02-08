<?php
defined( 'ABSPATH' ) || exit;

add_action( 'wp_ajax_action_get_analytics_data', 'action_get_analytics_data' );

function action_get_analytics_data(){
    $request_arr                    = get_request_analytics_array();

    $chart_reponse                  = get_charts_data($request_arr);

    wp_send_json($chart_reponse);
    die();
}

// Get charts Data for Districts and States
function get_charts_data($request){

    if( $request['report_theme'] == "profile" ){
        
        // if( $request['report_state'] != "all" ){
        //     $state_profile_data     = get_district_profile_table($request);
        // } else {
        //     $state_profile_data     = get_state_profile_table($request);
        // }
        $state_profile_data     = get_state_profile_table($request);

        return array(
            'state_profile'             => $state_profile_data,
        );
    } else if( $request['report_indicator'] == "ccvl__16_6__cold_chain_space_available" ){

        $state_profile_filter_data          = '';

        if( $request['cold_chain_district'] != 0 ){
            $state_profile_data             = get_district_cold_chain_space_table($request);
        } else {
            $get_state_profile_data         = get_state_cold_chain_space_table($request);

            $state_profile_data             = $get_state_profile_data['tbl'];
            $state_profile_filter_data      = $get_state_profile_data['filter'];
        }

        return array(
            'state_profile'             => $state_profile_data,
            'state_filter'              => $state_profile_filter_data,
        );
    } else if( $request['report_theme'] != "profile" && $request['report_state'] == "all" ){
        
        $state_data                     = get_state_anlytics_data($request);

        $chart_titles                   = get_indicator_title_for_state($request);

        $analytic_title                 = $chart_titles['analytic_title'];
        $chart_title                    = $chart_titles['chart_title'];
        $another_chart_title            = $chart_titles['another_chart_title'];

        return array(
            'state_map'                 => $state_data['map'],
            'state_horizontal'          => $state_data['horizontal'],
            'state_another_horizontal'  => $state_data['another_horizontal'],
            'state_bubble'              => $state_data['bubble'],
            'analytic_title'            => $analytic_title,
            'chart_title'               => $chart_title,
            'another_chart_title'       => $another_chart_title
        );
    } else if( $request['report_theme'] != "profile" && $request['report_state'] != "all" ){
        
        $state_data                     = get_district_anlytics_data($request);

        $chart_titles                   = get_indicator_title_for_district($request);

        $analytic_title                 = $chart_titles['analytic_title'];
        $chart_title                    = $chart_titles['chart_title'];
        $another_chart_title            = $chart_titles['another_chart_title'];

        return array(
            'district_map'              => $state_data['map'],
            'district_horizontal'       => $state_data['horizontal'],
            'district_another_horizontal'  => $state_data['another_horizontal'],
            'district_bubble'           => $state_data['bubble'],
            'analytic_title'            => $analytic_title,
            'chart_title'               => $chart_title,
            'another_chart_title'       => $another_chart_title
        );
    }
}

//Get state form data query
function get_state_form_data($state_id = 0){
	global $wpdb;

    if( $state_id == 0 ){
        $state_form_query   = "SELECT * FROM ".NEX_FORM_TEMP_ENTRY_TBL." WHERE nex_form_id = '" . STATE_FORM_ID . "'";
    } else {
        $state_form_query   = "SELECT * FROM ".NEX_FORM_TEMP_ENTRY_TBL." WHERE nex_form_id = '" . STATE_FORM_ID . "' AND user_id IN(SELECT ID FROM " . USER_TBL . " as u INNER JOIN " . USERMETA_TBL . " as um ON ( u.ID = um.user_id ) WHERE ( um.meta_key = 'state' AND um.meta_value = '". $state_id ."' ))";
    }
    
    return $wpdb->get_results($state_form_query, ARRAY_A);
}

//Get district form data query
function get_district_form_data($state_id){
	global $wpdb;

    $district_form_query   = "SELECT * FROM ".NEX_FORM_TEMP_ENTRY_TBL." WHERE nex_form_id = '" . DISTRICT_FORM_ID . "' AND user_id IN(SELECT ID FROM " . USER_TBL . " as u INNER JOIN " . USERMETA_TBL . " as um ON ( u.ID = um.user_id ) WHERE ( um.meta_key = 'state' AND um.meta_value = '". $state_id ."' ))";
    return $wpdb->get_results($district_form_query, ARRAY_A);
}

//Total number of district in a state
function get_total_district_func($state_id = 0){
	global $wpdb;

    if( $state_id > 0 ){
        $district_qry = "SELECT COUNT(id) as total_district_count FROM " .CITY_TBL . " WHERE states_id = '" . $state_id . "'";
    } else {
        $district_qry = "SELECT COUNT(id) as total_district_count FROM " .CITY_TBL;
    }
    
	$total_district_count = $wpdb->get_row($district_qry , ARRAY_A);

    if( $total_district_count['total_district_count'] > 0 ){
        return $total_district_count['total_district_count'];
    }
    return 0;
}

//Get form data value by key for profile
function get_field_value_by_key( $field, $state_id = 0 ) {
    global $wpdb;
    $total_district      = get_total_district_func();
    $getFormData        = get_state_form_data($state_id);
    
    $values     = [];
    $valueArr   = [];

    if( $getFormData ){
        foreach( $getFormData as $key => $value ) {

            $state_db_data          = json_decode( $value['form_data'] );
            
            if( $field == 'total_population_of_state' ){
                $final_val              = find_through_array('total_population_of_state_text', $state_db_data);
                if( empty($final_val) ){
                    $final_val          = find_through_array('total_population_of_state', $state_db_data);
                }
                $values[]               = $final_val;
            } else if ( $field == 'total_no_of_infants' ){
                $final_val              = find_through_array('total_no_of_infants_text', $state_db_data);
                if( empty($final_val) ){
                    $final_val          = find_through_array('total_no_of_infants', $state_db_data);
                }
                $values[]               = $final_val;
            } else if( $field == 'names_of_the_identified_aspirational_districts_in_the_state[]' ){
                $final_val              = find_through_array('names_of_the_identified_aspirational_districts_in_the_state[]', $state_db_data);
                if(!empty($final_val)){
                    $valueArr           = array_merge( $valueArr, $final_val );
                }

                $values[]               = count( $valueArr );

            } else {
                $final_val              = find_through_array($field, $state_db_data);
                $values[]               = $final_val;
            }

        }

        // if( $field == 'names_of_the_identified_aspirational_districts_in_the_state[]' ){
        //     $selectedDistrict = count( $valueArr );
        //     if( $selectedDistrict > 0 ){
        //         return calculate_percentage($total_district, $selectedDistrict)."%";
        //     }
        //     return "0%";
        // } else {
        //     return array_sum( $values );
        // }

        return array_sum( $values );
        
    } else {
        return '-';
    }
}

function get_state_profile_table($request, $is_arr = false){
    $state_id = $request['report_state'];
    if( $state_id == "all" ){
        $state_id = 0;
    }

    // Labels
    $total_population_of_state_label              = ($state_id > 0) ? "Total population of state" : "Total population of states";
    $total_no_of_infants_label                    = "Total no. of Infants";
    $total_no_of_districts_in_the_state_label     = ($state_id > 0) ? "Total districts in the state" : "Total districts in the states";
    $total_no_of_blocks_in_the_state_label        = ($state_id > 0) ? "Total no. of blocks in the state" : "Total no. of blocks in the states";
    $total_no_of_sub_centres_in_the_state_label   = ($state_id > 0) ? "Total no. of sub-centres in the state" : "Total no. of sub-centres in the states";
    $names_of_the_identified_aspirational_districts_in_the_state_label = "No. of aspirational districts";

    // Values
    $total_population_of_state              = get_field_value_by_key( "total_population_of_state", $state_id );
    $total_no_of_infants                    = get_field_value_by_key( "total_no_of_infants", $state_id );
    $total_no_of_districts_in_the_state     = get_field_value_by_key( "total_no_of_districts_in_the_state", $state_id );
    $total_no_of_blocks_in_the_state        = get_field_value_by_key( "total_no_of_blocks_in_the_state", $state_id );
    $total_no_of_sub_centres_in_the_state   = get_field_value_by_key( "total_no_of_sub-centres_in_the_state", $state_id );
    $names_of_the_identified_aspirational_districts_in_the_state = get_field_value_by_key( "names_of_the_identified_aspirational_districts_in_the_state[]", $state_id );

    if( $is_arr ){
        return array(
            'label' => array(
                'total_population_of_state'             => $total_population_of_state_label,
                'total_no_of_infants'                   => $total_no_of_infants_label,
                'total_no_of_districts_in_the_state'    => $total_no_of_districts_in_the_state_label,
                'total_no_of_blocks_in_the_state'       => $total_no_of_blocks_in_the_state_label,
                'total_no_of_sub_centres_in_the_state'  => $total_no_of_sub_centres_in_the_state_label,
                'names_of_the_identified_aspirational_districts_in_the_state' => $names_of_the_identified_aspirational_districts_in_the_state_label,    
            ),
            'value' => array(
                'total_population_of_state'             => $total_population_of_state,
                'total_no_of_infants'                   => $total_no_of_infants,
                'total_no_of_districts_in_the_state'    => $total_no_of_districts_in_the_state,
                'total_no_of_blocks_in_the_state'       => $total_no_of_blocks_in_the_state,
                'total_no_of_sub_centres_in_the_state'  => $total_no_of_sub_centres_in_the_state,
                'names_of_the_identified_aspirational_districts_in_the_state' => $names_of_the_identified_aspirational_districts_in_the_state,
            )
        );
    } else {

        $tbl = get_profile_export_csv_btn();
        $tbl .= '<table class="' . get_table_class() . '">';
            $tbl .= '<tbody>';

                $tbl .= '<tr class="active">';
                    $tbl .= '<th>' . $total_population_of_state_label . '</th>';
                    $tbl .= '<td>';
                        $tbl .= $total_population_of_state;
                    $tbl .= '</td>';
                $tbl .= '</tr>';

                $tbl .= '<tr>';
                $tbl .= '<th>' . $total_no_of_infants_label . '</th>';
                    $tbl .= '<td>';
                        $tbl .= $total_no_of_infants;
                    $tbl .= '</td>';
                $tbl .= '</tr>';

                $tbl .=  '<tr class="active">';
                $tbl .= '<th>' . $total_no_of_districts_in_the_state_label . '</th>';
                    $tbl .=  '<td>';
                        $tbl .= $total_no_of_districts_in_the_state;
                    $tbl .=  '</td>';
                $tbl .=  '</tr>';

                $tbl .=  '<tr>';
                    $tbl .= '<th>' . $total_no_of_blocks_in_the_state_label . '</th>';
                    $tbl .=  '<td>';
                        $tbl .= $total_no_of_blocks_in_the_state;
                    $tbl .=  '</td>';
                $tbl .=  '</tr>';

                $tbl .=  '<tr class="active">';
                    $tbl .= '<th>' . $total_no_of_sub_centres_in_the_state_label . '</th>';
                    $tbl .=  '<td>';
                        $tbl .= $total_no_of_sub_centres_in_the_state;
                    $tbl .=  '</td>';
                $tbl .=  '</tr>';

                $tbl .=  '<tr>';
                    $tbl .= '<th>' . $names_of_the_identified_aspirational_districts_in_the_state_label . '</th>';
                    $tbl .=  '<td>';
                        $tbl .= $names_of_the_identified_aspirational_districts_in_the_state;
                    $tbl .=  '</td>';
                $tbl .=  '</tr>';

                // $tbl .=  '<tr>';
                //     $tbl .=  '<th>How many districts do not have DIO/ designated MO in position?</th>';
                //     $tbl .=  '<td>';
                //         $tbl .=  get_field_value_by_key( "how_many_districts_do_not_have_dio_designated_mo_in_position", $state_id );
                //     $tbl .=  '</td>';
                // $tbl .=  '</tr>';
                
                // $tbl .= '<tr>';
                //     $tbl .= '<th>Cold chain sickness rate at the state level as per NCCMIS during Field</th>';
                //     $tbl .= '<td>';
                //         $tbl .= get_field_value_by_key( "cold_chain_sickness_rate_at_the_state_level_as_per_nccmis_during_input_field", $state_id );
                //     $tbl .= '</td>';
                // $tbl .= '</tr>';

            $tbl .= '</tbody>';
        $tbl .= '</table>';

        return $tbl;
    }
}
//Get form data value by key for profile
function get_adistrict_field_value_by_key( $field, $getFormData = [] ) {
    global $wpdb;
    
    $values     = [];
    $valueArr   = [];

    if( $getFormData ){
        foreach( $getFormData as $key => $value ) {

            $state_db_data          = json_decode( $value['form_data'] );
            
            if( $field == 'total_population_of_district' ){
                $final_val              = find_through_array('total_population_of_district_input', $state_db_data);
                if( empty($final_val) ){
                    $final_val          = find_through_array('total_population_of_district', $state_db_data);
                }
                $values[]               = $final_val;
            } else if ( $field == 'total_no_of_infants' ){
                $final_val              = find_through_array('total_no_of_infants_input', $state_db_data);
                if( empty($final_val) ){
                    $final_val          = find_through_array('total_no_of_infants', $state_db_data);
                }
                $values[]               = $final_val;
            } else if( $field == 'names_of_the_identified_aspirational_districts_in_the_state[]' ){
                $final_val              = find_through_array('names_of_the_identified_aspirational_districts_in_the_state[]', $state_db_data);
                if(!empty($final_val)){
                    $valueArr               = array_merge( $valueArr, $final_val );
                }             
                //pre($valueArr);
            } else {
                $final_val              = find_through_array($field, $state_db_data);
                $values[]               = $final_val;
            }

        }

        if( $field == 'names_of_the_identified_aspirational_districts_in_the_state[]' ){
            $selectedDistrict = count( $valueArr );
            if( $selectedDistrict > 0 ){
                return calculate_percentage($total_district, $selectedDistrict)."%";
            }
            return "0%";
        } else {
            return array_sum( $values );
        }            
        
    } else {
        return '-';
    }
}

function get_district_profile_table($request){

    $state_id         = $request['report_state'];
    $district_data    = get_district_form_data($state_id);

    $tbl = get_profile_export_csv_btn();
    $tbl .= '<table class="' . get_table_class() . '">';
        $tbl .= '<tbody>';

            $tbl .= '<tr class="active">';
                $tbl .= '<th>Total population of district</th>';
                $tbl .= '<td>';
                    $tbl .= get_adistrict_field_value_by_key( "total_population_of_district", $district_data );
                $tbl .= '</td>';
            $tbl .= '</tr>';

            $tbl .= '<tr>';
                $tbl .= '<th>Total no. of Infants</th>';
                $tbl .= '<td>';
                    $tbl .= get_adistrict_field_value_by_key( "total_no_of_infants", $district_data );
                $tbl .= '</td>';
            $tbl .= '</tr>';

            $tbl .=  '<tr class="active">';
                $tbl .=  '<th>Total districts in the state</th>';
                $tbl .=  '<td>';
                    $tbl .=  get_field_value_by_key( "total_no_of_districts_in_the_state", $state_id );
                $tbl .=  '</td>';
            $tbl .=  '</tr>';

            $tbl .=  '<tr>';
                $tbl .=  '<th>Total no. of blocks in the district</th>';
                $tbl .=  '<td>';
                    $tbl .=  get_adistrict_field_value_by_key( "no_of_blocks_in_the_district", $district_data );
                $tbl .=  '</td>';
            $tbl .=  '</tr>';

            $tbl .=  '<tr class="active">';
                $tbl .=  '<th>Total no. of sub-centres in the district</th>';
                $tbl .=  '<td>';
                    $tbl .=  get_adistrict_field_value_by_key( "total_number_of_sub_centers_in_the_district", $district_data );
                $tbl .=  '</td>';
            $tbl .=  '</tr>';

            // Remaining
            $tbl .=  '<tr>';
                $tbl .=  '<th>No. of aspirational districts</th>';
                $tbl .=  '<td>';
                    $tbl .=  get_adistrict_field_value_by_key( "names_of_the_identified_aspirational_districts_in_the_state[]", $district_data );
                $tbl .=  '</td>';
            $tbl .=  '</tr>';
            
            // Remaining
            // $tbl .=  '<tr>';
            //     $tbl .=  '<th>How many districts do not have DIO/ designated MO in position?</th>';
            //     $tbl .=  '<td>';
            //         $tbl .=  get_adistrict_field_value_by_key( "how_many_districts_do_not_have_dio_designated_mo_in_position", $district_data );
            //     $tbl .=  '</td>';
            // $tbl .=  '</tr>';
            
            // Remaining
            // $tbl .= '<tr>';
            //     $tbl .= '<th>Cold chain sickness rate at the state level as per NCCMIS during Field</th>';
            //     $tbl .= '<td>';
            //         $tbl .= get_adistrict_field_value_by_key( "cold_chain_sickness_rate_at_the_state_level_as_per_nccmis_during_input_field", $district_data );
            //     $tbl .= '</td>';
            // $tbl .= '</tr>';

        $tbl .= '</tbody>';
    $tbl .= '</table>';

    return $tbl;
}

// Get chart data for state
function get_state_anlytics_data($request_arr){
    global $wpdb;
    $state_form_results     = get_state_form_data();

    $total_district         = get_total_district_func();

    $data_key               = $request_arr['report_indicator'];
    $report_year            = $request_arr['report_year'];

    $request_arr['calculate_per_with_sum'] = [
        'ccvl__9_2_1__vaccine_van',
        'ccvl__9_2_2__vaccine_van',
        //'ccvl__16_4__ccp_evin'
    ];
    
    $map_data               = [];
    $horizontal_data        = [];
    $another_horizontal_data    = [];
    $is_percentage          = true;

    if( $state_form_results ){
        foreach( $state_form_results as $state_key => $state_data ) {

            if( empty($state_data['user_id']) || $state_data['user_id'] == 0 ){
                continue;
            }

            $postal_code            = get_state_postal_code_by_user_id($state_data['user_id']);
            $state_name             = get_user_state($state_data['user_id']);
            //$map_index_key          = get_state_properties_by_postal_code($postal_code, 'name');

            if( empty($postal_code) || empty($state_name) ){
                continue;
            }

            $map_index_key          = "in-" . strtolower($postal_code);

            $state_db_data          = json_decode( $state_data['form_data'], true );


            $final_val              = 0;
            $year_final_val         = 0;

            if( $data_key == "bi__3_2__pd1_hims" ){
                $final_val              = find_through_array('penta_1dpt_1_reported_text', $state_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('state_immunization_coverage_penta_1_dpt_1_hmis', $state_db_data);
                }

            } else if( $data_key == "bi__3_2__pd1_nfhs" ){
                $final_val              = $final_val;
            } else if( $data_key == "bi__3_2__pd1_monitoring" ){
                $final_val              = find_through_array('penta_1dpt_1_monitored_text', $state_db_data);
            } else if( $data_key == "bi__3_2__pd3_hmis" ){
                $final_val              = find_through_array('penta_3dpt_3_reported_text', $state_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('state_immunization_coverage_penta_3_dpt_3_hmis', $state_db_data);
                }
            } else if( $data_key == "bi__3_2__pd3_nfhs" ){
                $final_val              = find_through_array('penta_3dpt_3_evaluated_text', $state_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('state_immunization_coverage_penta_3_dpt_3_nfhs4', $state_db_data);
                }
            } else if( $data_key == "bi__3_2__pd3_monitoring" ){
                $final_val              = find_through_array('penta_3dpt_3_monitored_text', $state_db_data);
            } else if( $data_key == "bi__3_2__mr1_hmis" ){
                $final_val              = find_through_array('mr_1_measles_reported_text', $state_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('state_immunization_coverage_mr1_measles_hmis', $state_db_data);
                }
            } else if( $data_key == "bi__3_2__mr1_nfhs" ){
                $final_val              = find_through_array('mr_1_measles_evaluated_text', $state_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('state_immunization_coverage_mr1_measles_nfhs4', $state_db_data);
                }
            } else if( $data_key == "bi__3_2__mr1_monitoring" ){
                $final_val              = find_through_array('mr_1_measles_monitored_text', $state_db_data);
            } else if( $data_key == "bi__3_3__drop_p1" ){
                $final_val              = find_through_array('penta_1_to_penta_3_drop_out_rate_text', $state_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('state_drop_out_rates_penta_1_dpt_1_hmis', $state_db_data);
                }
            } else if( $data_key == "bi__3_3__drop_mr1" ){
                $final_val              = find_through_array('penta_3_1_to_mr_1_drop_out_rate_text', $state_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('state_drop_out_rates_Penta_3_1_to_mr_1_hmis', $state_db_data);
                }
            } else if( $data_key == "bi__4_1__micro_plan" ){
                $final_val              = find_through_array('no_of_districts_that_have_submitted_updated_ri_micro-plans_to_state_for_2020_21', $state_db_data);

                if( !empty($final_val) ){
                    $final_val = calculate_percentage($total_district, $final_val);
                }
            } else if( $data_key == "bi__4_3__sessions_planned" ){
                $final_val              = find_through_array('sessions_held_against_planned_as_per_hmis_during_2019_20_text', $state_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('sessions_held_against_planned_as_per_hmis_during_2019_20', $state_db_data);
                }
            } else if( $data_key == "bi__6_2__immunization" ){
                $final_val              = find_through_array('number_of_dios_that_have_not_undergone_orientation_on_immunization_during_2019_20', $state_db_data);

                if( !empty($final_val) ){
                    $final_val = calculate_percentage($total_district, $final_val);
                }
            } else if( $data_key == "bi__8_1__vaccine_wastage" ){

                if( !empty($report_year) && $report_year == "2019-20" ){
                    $final_val              = find_through_array('calculate_vaccine_wastage_for_penta_2019_20', $state_db_data);
                } else {
                    $final_val              = find_through_array('calculate_vaccine_wastage_for_penta_2018_19', $state_db_data);
                }

                // if( !empty($final_val) ){
                //     $final_val = calculate_percentage($total_district, $final_val);
                // }
            } else if( $data_key == "ccvl__9_2_1__vaccine_van" ){
                $final_val              = find_through_array('no_of_vaccine_vans_available_at_state_level_that_are_functional', $state_db_data);
            } else if( $data_key == "ccvl__9_2_2__vaccine_van" ){
                $final_val              = find_through_array('no_of_vaccine_vans_available_in_the_districts', $state_db_data);
            } else if( $data_key == "ccvl__16_1__cold_chain_points" ){
                $is_percentage          = false;
                
                $final_val_16_1         = find_through_array('total_no_of_cold_chain_points_in_the_state', $state_db_data);

                $final_val_3_1          = find_through_array('total_population_of_state_text', $state_db_data);
                if( empty($final_val_3_1) ){
                    $final_val_3_1      = find_through_array('total_population_of_state', $state_db_data);
                }

                $final_val              = ( $final_val_16_1 * 30000 ) / $final_val_3_1;
                $final_val              = floatval(number_format((float)$final_val, 2, '.', ''));

            } else if( $data_key == "ccvl__16_2__cold_chain_handlers" ){
                $is_percentage          = false;
                $final_val              = find_through_array('total_no_of_cold_chain_handlers_in_the_state', $state_db_data);
                $pre_final_val              = find_through_array('total_no_of_cold_chain_points_in_the_state', $state_db_data);

                if( !empty($final_val) ){
                    $final_val = ($final_val / $pre_final_val);
                    $final_val              = floatval(number_format((float)$final_val, 2, '.', ''));
                }
            } else if( $data_key == "ccvl__16_3__evin" ){

                $field_val              = find_through_array('total_no_of_districts_with_evin_functional', $state_db_data);

                $field_val_2_1          = find_through_array('total_no_of_districts_in_the_state', $state_db_data);

                if( !empty($field_val) ){
                    $final_val          = ( $field_val * 100 ) / $field_val_2_1;
                    $final_val          = floatval(number_format((float)$final_val, 2, '.', ''));
                }

            } else if( $data_key == "ccvl__16_4__ccp_evin" ){
                $final_val_16_4                 = find_through_array('total_no_of_cold_chain_points_with_evin_functional', $state_db_data);

                $pre_final_val_61_1             = find_through_array('total_no_of_cold_chain_points_in_the_state', $state_db_data);

                $final_val          = ( $final_val_16_4 * 100 ) / $pre_final_val_61_1;
                $final_val          = floatval(number_format((float)$final_val, 2, '.', ''));

            } else if( $data_key == "prs__11_4__stfi_meetings" ){
                $is_percentage          = false;

                $final_val              = find_through_array('number_of_stf_i_meetings_conducted_in_2019_20', $state_db_data);
                $year_final_val         = find_through_array('number_of_stf_i_meetings_conducted_in_2020_21', $state_db_data);

            } else if( $data_key == "prs__11_7__meetings_held" ){
                $is_percentage          = false;

                $final_val              = find_through_array('no_of_state_level_immunization_review_meetings_held_with_dios_2019_20', $state_db_data);
                $year_final_val         = find_through_array('no_of_state_level_immunization_review_meetings_held_with_dios_2020_21', $state_db_data);

            } else if( $data_key == "prs__11_10__meetings_cold_chain" ){
                $is_percentage          = false;

                $final_val              = find_through_array('how_many_review_meetings_have_been_held_with_cold_chain_handlers_in_the_state_in_2019-20', $state_db_data);

                $year_final_val         = find_through_array('how_many_review_meetings_have_been_held_with_cold_chain_handlers_in_the_state_in_2020-21_', $state_db_data);

            } else if( $data_key == "prs__12_4__aefi_committee_meetings" ){
                $is_percentage          = false;

                $final_val              = find_through_array('how_many_state_aefi_committee_meetings_were_held_during_2019_20', $state_db_data);
                $year_final_val         = find_through_array('how_many_state_aefi_committee_meetings_were_held_during_2020_21', $state_db_data);

            } else if( $data_key == "ds__15_1__reported_any_case" ){
                $is_percentage          = false;
                if( !empty($report_year) && $report_year == "2020-21" ){
                    $final_val              = find_through_array('number_of_districts_that_have_not_reported_any_case_of_diphtheria_tetanus_or_pertussis_2020_21', $state_db_data);
                } else {
                    $final_val              = find_through_array('number_of_districts_that_have_not_reported_any_case_of_diphtheria_tetanus_or_pertussis_2019_20', $state_db_data);
                }
            } else if( $data_key == "ds__15_2__afp_cases" ){
                $is_percentage          = false;
                if( !empty($report_year) && $report_year == "2020-21" ){
                    $final_val              = find_through_array('number_of_silent_districts_from_where_no_afp_cases_have_been_reported_2020_21', $state_db_data);
                } else {
                    $final_val              = find_through_array('number_of_silent_districts_from_where_no_afp_cases_have_been_reported_2019_20', $state_db_data);
                }
            } else if( $data_key == "ds__15_3__reported_outbreaks" ){
                $is_percentage          = false;
                if( !empty($report_year) && $report_year == "2020-21" ){
                    $final_val              = find_through_array('how_many_districts_reported_measlesrubellamixed_outbreaks_2020_21', $state_db_data);
                } else {
                    $final_val              = find_through_array('how_many_districts_reported_measlesrubellamixed_outbreaks_2019_20', $state_db_data);
                }
            } else if( $data_key == "ccvl__16_8__ccs_nccmis" ){
                $final_val              = find_through_array('cold_chain_sickness_rate_at_the_state_level_as_per_nccmis_during_input_field', $state_db_data);
            }
            
            
            else if( $data_key == "bi__3_2__pd1_monitoring1_per" ){
                $total_districts        = get_total_district_func();

                $field_val              = find_through_array('penta_1dpt_1_monitored_text', $state_db_data);
                if( !empty($field_val) ){
                    $final_val          = ( $field_val * 100 ) / $total_districts;
                }
                
                $final_val              = floatval(number_format((float)$final_val, 2, '.', ''));
            }

            if( trim($final_val) == '' || empty(trim($final_val)) ) {
                $final_val      = 0;
            }

            $final_val           = floatval($final_val);
            $year_final_val      = floatval($year_final_val);

            $map_data[] = [
                'name' => $map_index_key,
                'val' => $final_val,
            ];

            $horizontal_data[] = [
                'name' => $state_name,
                'val' => $final_val,
            ];

            $another_horizontal_data[] = [
                'name' => $state_name,
                'val' => $year_final_val,
            ];

            $bubble_data[] = [
                'name' => $state_name,
                'val' => $final_val,
            ];
        }
    }

    $request_arr['is_percentage']   = $is_percentage;

    return [
        'map' => get_state_map_range($request_arr, $map_data),
        'horizontal' => get_state_horizontal_range($request_arr, $horizontal_data),
        'another_horizontal' => get_state_horizontal_range($request_arr, $another_horizontal_data),
        'bubble' => get_state_bubble_range($request_arr, $bubble_data),
    ];
}

// Get chart data for district
function get_district_anlytics_data($request_arr){
    global $wpdb;

    $state_id               = $request_arr['report_state'];

    $data_key               = $request_arr['report_indicator'];
    $report_year            = $request_arr['report_year'];

    $district_form_results  = get_district_form_data($state_id);
    $total_district         = get_total_district_func($state_id);

    $request_arr['calculate_per_with_sum'] = [
        'bi__4_1__micro_plan',
        'ccvl__9_2_1__vaccine_van',
        'ccvl__9_2_2__vaccine_van',
        //'ccvl__16_4__ccp_evin'
    ];
    
    $map_data               = [];
    $horizontal_data        = [];
    $another_horizontal_data    = [];
    $is_percentage          = true;

    if( $district_form_results ){
        foreach( $district_form_results as $district_key => $district_data ) {

            if( empty($district_data['user_id']) || $district_data['user_id'] == 0 ){
                continue;
            }

            $district_name          = get_user_city($district_data['user_id'], 'original_city');

            if( empty($district_name) ){
                continue;
            }

            $map_index_key          = strtolower($district_name);

            $district_db_data       = json_decode( $district_data['form_data'], true );


            $final_val              = 0;
            $year_final_val         = 0;

            if( $data_key == "bi__3_2__pd3_hmis" ){
                $final_val              = find_through_array('penta_3dpt_3_reported_text', $district_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('district_immunization_coverage_penta_3_dpt_3_hmis', $district_db_data);
                }
            } else if( $data_key == "bi__3_2__pd3_nfhs" ){
                $final_val              = find_through_array('penta_3dpt_3_evaluated_text', $district_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('district_immunization_coverage_penta_3_dpt_3_nfhs4', $district_db_data);
                }
            } else if( $data_key == "bi__3_2__pd3_monitoring" ){
                $final_val              = find_through_array('penta_3dpt_3_monitored_text', $district_db_data);
            } else if( $data_key == "bi__3_2__mr1_hmis" ){
                $final_val              = find_through_array('mr_1_measles_reported_text', $district_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('district_immunization_coverage_mr1_measles_hmis', $district_db_data);
                }
            } else if( $data_key == "bi__3_2__mr1_nfhs" ){
                $final_val              = find_through_array('mr_1_measles_evaluated_text', $district_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('district_immunization_coverage_mr1_measles_nfhs4', $district_db_data);
                }
            } else if( $data_key == "bi__3_2__mr1_monitoring" ){
                $final_val              = find_through_array('mr_1_measles_monitored_text', $district_db_data);
            } else if( $data_key == "bi__3_3__drop_p1" ){
                $final_val              = find_through_array('penta_1_to_penta_3_drop_out_rate_text', $district_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('district_drop_out_rates_penta_1_dpt_1_hmis', $district_db_data);
                }
            } else if( $data_key == "bi__3_3__drop_mr1" ){
                $final_val              = find_through_array('penta_3_1_to_mr_1_drop_out_rate_text', $district_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('district_drop_out_rates_Penta_3_1_to_mr_1_hmis', $district_db_data);
                }
            } else if( $data_key == "bi__4_1__micro_plan" ){
                $is_percentage          = false;
                $final_val              = find_through_array('no_of_districts_that_have_submitted_updated_ri_micro-plans_to_state_for_2020-21', $district_db_data);
            } else if( $data_key == "bi__4_3__sessions_planned" ){
                $final_val              = find_through_array('sessions_held_against_planned_as_per_hmis_during_19-20test', $district_db_data);

                if( empty($final_val) ){
                    $final_val          = find_through_array('sessions_held_against_planned_as_per_hmis_during_2019_20', $district_db_data);
                }
            } else if( $data_key == "bi__6_2__immunization" ){
                $is_percentage          = false;
                $final_val              = find_through_array('real_val__have_you_undergone_diomo_immunization_training_at_the_state_level_during_2019-20_or_2020-21', $district_db_data);

                if( !empty($final_val) && $final_val == "Yes" ){
                    $final_val = 1;
                }
            } else if( $data_key == "bi__8_1__vaccine_wastage" ){

                if( !empty($report_year) && $report_year == "2019-20" ){
                    $final_val              = find_through_array('calculate_vaccine_wastage_for_penta_2019_20', $district_db_data);
                } else {
                    $final_val              = find_through_array('calculate_vaccine_wastage_for_penta_2018_19', $district_db_data);
                }

                // if( !empty($final_val) ){
                //     $final_val = calculate_percentage($total_district, $final_val);
                // }
            } 
            
            // else if( $data_key == "ccvl__9_2_1__vaccine_van" ){
            //     $final_val              = find_through_array('no_of_vaccine_vans_available_at_state_level_that_are_functional', $district_db_data);
            // }
            
            else if( $data_key == "ccvl__16_1__cold_chain_points" ){
                $is_percentage          = false;
                $final_val_16_1         = find_through_array('total_no_of_cold_chain_points_in_the_district_current_situation', $district_db_data);

                $final_val_3_1          = find_through_array('total_population_of_district_input', $district_db_data);

                if( empty($final_val_3_1) ){
                    $final_val_3_1      = find_through_array('total_population_of_district', $district_db_data);
                }

                $final_val              = ($final_val_16_1 * 30000) / $final_val_3_1;
                $final_val              = floatval(number_format((float)$final_val, 2, '.', ''));

            } else if( $data_key == "ccvl__16_2__cold_chain_handlers" ){
                $is_percentage          = false;
                $final_val              = find_through_array('total_no_of_cold_chain_handlers_in_the_district_current_situation', $district_db_data);
                $pre_final_val          = find_through_array('total_no_of_cold_chain_points_in_the_district_current_situation', $district_db_data);

                if( !empty($final_val) ){
                    $final_val              = ($final_val / $pre_final_val);
                    $final_val              = floatval(number_format((float)$final_val, 2, '.', ''));
                }
            } else if( $data_key == "ccvl__16_3__evin" ){
                
                $field_val              = find_through_array('total_no_of_cold_chain_points_with_evin_functional', $district_db_data);

                $field_val_16_1         = find_through_array('total_no_of_cold_chain_points_in_the_district_current_situation', $district_db_data);

                if( !empty($field_val) ){
                    //$final_val              = ($field_val / $field_val_16_1) * 100;
                    $final_val              = ($field_val * 100) / $field_val_16_1;
                    $final_val              = floatval(number_format((float)$final_val, 2, '.', ''));
                }

            } else if( $data_key == "ccvl__16_4__ccp_evin" ){
                $final_val_16_1              = find_through_array('total_no_of_cold_chain_points_in_the_district_current_situation', $district_db_data);
                $total_val_16_3             = find_through_array('total_no_of_cold_chain_points_with_evin_functional', $district_db_data);

                $final_val              = ($total_val_16_3 * 100) / $final_val_16_1;
                $final_val              = floatval(number_format((float)$final_val, 2, '.', ''));
            } 
            else if( $data_key == "prs__11_4__stfi_meetings" ){
                $is_percentage          = false;
                $final_val              = find_through_array('how_many_dtfi_meetings_were_conducted_in_the_last_6_months', $district_db_data);
            } 
            else if( $data_key == "prs__11_7__meetings_held" ){
                $is_percentage          = false;

                $final_val              = find_through_array('no_of_district‐level_immunization_review_meetings_held_with_mo_in‐charge_moics_2019_20', $district_db_data);
                $year_final_val         = find_through_array('no_of_district‐level_immunization_review_meetings_held_with_mo_in‐charge_moics_2020_21', $district_db_data);
            } 
            else if( $data_key == "prs__11_10__meetings_cold_chain" ){
                $is_percentage          = false;

                $final_val              = find_through_array('how_many_review_meetings_have_been_held_with_cold_chain_handlers_in_the_district_during_2019-2020', $district_db_data);
                $year_final_val         = find_through_array('how_many_review_meetings_have_been_held_with_cold_chain_handlers_in_the_district_during_2020-2021', $district_db_data);
            } 
            else if( $data_key == "prs__12_4__aefi_committee_meetings" ){
                $is_percentage          = false;

                $final_val              = find_through_array('how_many_district_aefi_committee_meetings_were_held_during_2019-2020', $district_db_data);
                $year_final_val         = find_through_array('how_many_district_aefi_committee_meetings_were_held_during_2020-2021', $district_db_data);
            } 
            else if( $data_key == "ds__15_1__reported_any_case" ){
                $is_percentage          = false;
                if( !empty($report_year) && $report_year == "2020-21" ){
                    $final_val              = find_through_array('name_the_blocks_that_have_not_reported_any_case_of_diphtheria_tetanus_or_pertussis_2020_21', $district_db_data);
                } else {
                    $final_val              = find_through_array('name_the_blocks_that_have_not_reported_any_case_of_diphtheria_tetanus_or_pertussis_2019_20', $district_db_data);
                }
            } else if( $data_key == "ds__15_2__afp_cases" ){
                $is_percentage          = false;
                if( !empty($report_year) && $report_year == "2020-21" ){
                    $final_val              = find_through_array('no_of_silent_blocks_from_where_no_afp_cases_have_been_reported_2020_21', $district_db_data);
                } else {
                    $final_val              = find_through_array('no_of_silent_blocks_from_where_no_afp_cases_have_been_reported_2019_20', $district_db_data);
                }
            } else if( $data_key == "ds__15_3__reported_outbreaks" ){
                $is_percentage          = false;
                if( !empty($report_year) && $report_year == "2020-21" ){
                    $final_val              = find_through_array('how_many_blocks_reported_measlesrubellamixed_cases_2020_21', $district_db_data);
                } else {
                    $final_val              = find_through_array('how_many_blocks_reported_measlesrubellamixed_cases_2019_20', $district_db_data);
                }
            } else if( $data_key == "ccvl__16_8__ccs_nccmis" ){
                $final_val              = find_through_array('cold_chain_sickness_rate_at_the_state_level_as_per_nccmis_during_input_field', $state_db_data);
            }

            if( trim($final_val) == '' || empty(trim($final_val)) ) {
                $final_val      = 0;
            }

            $final_val           = floatval($final_val);
            $year_final_val      = floatval($year_final_val);

            $map_data[] = [
                'name' => $map_index_key,
                'val' => $final_val,
            ];

            $horizontal_data[] = [
                'name' => $district_name,
                'val' => $final_val,
            ];

            $another_horizontal_data[] = [
                'name' => $state_name,
                'val' => $year_final_val,
            ];

            $bubble_data[] = [
                'name' => $district_name,
                'val' => $final_val,
            ];
        }
    }

    $request_arr['is_percentage']   = $is_percentage;

    return [
        'map' => get_district_map_range($request_arr, $map_data),
        'horizontal' => get_district_horizontal_range($request_arr, $horizontal_data),
        'another_horizontal' => get_district_horizontal_range($request_arr, $another_horizontal_data),
        'bubble' => get_district_bubble_range($request_arr, $horizontal_data)
    ];
}

// Get state cold chain space table
function get_state_cold_chain_space_table($request){
    global $wpdb;

    $state_id           = $request['report_state'];

    $state_name         = get_state_by_id($state_id);

    $getFormData        = get_state_form_data($state_id);

    $ch_district        = '<option value="">Choose district</option>';

    $tbl = '<table class="' . get_table_class() . '">';
        $tbl .= '<thead>';
            $tbl .=  '<tr>';
                $tbl .=  '<th colspan="5" style="text-align:center;">' . $state_name . '<span style="font-weight:normal;"> - Details of cold chain space available </span></th>';
            $tbl .=  '</tr>';

            $tbl .=  '<tr>';
                $tbl .=  '<th>Name of district</th>';
                $tbl .=  '<th>Name of district stores</th>';
                $tbl .=  '<th>Total Population</th>';
                $tbl .=  '<th>Cold chain (+2 to +8 degree Celsius) space available (ILR)</th>';
                $tbl .=  '<th>Cold chain (-15 to -25 degree Celsius) space available (D.F)</th>';
            $tbl .=  '</tr>';
        $tbl .= '</thead>';

        $tbl .= '<tbody>';

        if( $getFormData ){
            foreach( $getFormData as $key => $value ) {
    
                $state_db_data          = json_decode( $value['form_data'] );

                for( $st = 0; $st <= 50; $st++ ){

                    $name_of_district = $name_of_district_stores = $total_population = $cold_chain_2_to_8 = $cold_chain_15_to_25 = "";
    
                    $name_of_district = find_through_array( "name_of_district_" . $st, $state_db_data );
                    $name_of_district_stores = find_through_array( "name_of_district_stores_" . $st, $state_db_data );
                    $total_population = find_through_array( "total_population_" . $st, $state_db_data );
                    $cold_chain_2_to_8 = find_through_array( "cold_chain_2_to_8_" . $st, $state_db_data );
                    $cold_chain_15_to_25 = find_through_array( "cold_chain_15_to_25_" . $st, $state_db_data );
    
                    if( empty($name_of_district) && empty($name_of_district_stores) && empty($total_population) && empty($cold_chain_2_to_8) && empty($cold_chain_15_to_25) ){
                        continue;
                    }

                    $city_id = 0;
                    $city_by_name = $wpdb->get_row("SELECT * FROM " .CITY_TBL. " WHERE city = '" . $name_of_district . "'", ARRAY_A);

                    if( $city_by_name && !empty($city_by_name) ){
                        $city_id =  $city_by_name['id'];
                    }

                    $tr_class = '';
                    if( !($st & 1) ){
                        $tr_class = 'active';
                    }
    
                    $tbl .=  '<tr data-filter="' . $st . '" class="filter' . $st . ' ' . $tr_class .  '">';
                        // if( $city_id != 0 ){
                        //     $tbl .=  '<td><a href="javascript:void(0);" class="district_cold_chain" data-id="' . $city_id . '">' . $name_of_district . '</a></td>';
                        // } else {
                        //     $tbl .=  '<td>' . $name_of_district . '</td>';
                        // }
                        
                        $tbl .=  '<td>' . $name_of_district . '</td>';
                        $tbl .=  '<td>' . $name_of_district_stores . '</td>';
                        $tbl .=  '<td>' . $total_population . '</td>';
                        $tbl .=  '<td>' . $cold_chain_2_to_8 . '</td>';
                        $tbl .=  '<td>' . $cold_chain_15_to_25 . '</td>';
                    $tbl .=  '</tr>';


                    $ch_district .= '<option value="' . $city_id . '">' . $name_of_district . '</option>';
                    //$ch_district .= '<option value="' . $st . '">' . $name_of_district . '</option>';
    
                }

            }
        }

        $tbl .= '</tbody>';
    $tbl .= '</table>';

    //return $tbl;
    return array(
        'tbl'           => $tbl,
        'filter'        => $ch_district
    );
}

// Get state cold chain space table
function get_district_cold_chain_space_table($request){
	global $wpdb;

    $state_id           = $request['report_state'];
    $city_id            = $request['cold_chain_district'];

    $city_name         = get_city_by_id($city_id);

    $district_form_query   = "SELECT * FROM ".NEX_FORM_TEMP_ENTRY_TBL." WHERE nex_form_id = '" . DISTRICT_FORM_ID . "' AND user_id IN(SELECT ID FROM " . USER_TBL . " as u INNER JOIN " . USERMETA_TBL . " as um ON ( u.ID = um.user_id ) INNER JOIN " . USERMETA_TBL . " as um1 ON ( u.ID = um1.user_id ) WHERE ( um.meta_key = 'state' AND um.meta_value = '". $state_id ."' ) AND ( um1.meta_key = 'city' AND um1.meta_value = '". $city_id ."' ))";

    $district_data    =  $wpdb->get_results($district_form_query, ARRAY_A);

    $tbl = '<table class="' . get_table_class() . '">';
        $tbl .= '<tbody>';

        $tbl .=  '<tr>';
            $tbl .=  '<th colspan="5" style="text-align:center;">' . $city_name . '<span style="font-weight:normal;"> - Details of cold chain space available </span></th>';
        $tbl .=  '</tr>';

        $tbl .=  '<tr>';
            $tbl .=  '<th>Name of district</th>';
            $tbl .=  '<th>Name of district stores</th>';
            $tbl .=  '<th>Total Population of the catchment area</th>';
            $tbl .=  '<th>Cold chain (+2 to +8 degree Celsius) space available (L)</th>';
            $tbl .=  '<th>Cold chain (‐15 to ‐ 25 degree Celsius) space available (L)</th>';
        $tbl .=  '</tr>';
        
        if( $district_data ){
            foreach( $district_data as $key => $value ) {
    
                $district_db_data          = json_decode( $value['form_data'] );

                for( $sd = 1; $sd <= 50; $sd++ ){

                    $name_of_district = $name_of_district_stores = $total_population = $cold_chain_2_to_8 = $cold_chain_15_to_25 = "";

                    $name_of_district = find_through_array( "commontable_aligntop[" . $sd . "][details_of_cold_chain_space_available_name_of_block]", $district_db_data );
                    $name_of_district_stores = find_through_array( "commontable_aligntop[" . $sd . "][details_of_cold_chain_space_available_name_of_cold_chain_store]", $district_db_data );
                    $total_population = find_through_array( "commontable_aligntop[" . $sd . "][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]", $district_db_data );
                    $cold_chain_2_to_8 = find_through_array( "commontable_aligntop[" . $sd . "][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]", $district_db_data );
                    $cold_chain_15_to_25 = find_through_array( "commontable_aligntop[" . $sd . "][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]", $district_db_data );

                    if( empty($name_of_district) && empty($name_of_district_stores) && empty($total_population) && empty($cold_chain_2_to_8) & empty($cold_chain_15_to_25) ){
                        continue;
                    }

                    $tr_class = '';
                    if( ($sd & 1) ){
                        $tr_class = 'active';
                    }

                    $tbl .=  '<tr class="' . $tr_class . '">';
                        $tbl .=  '<td>' . $name_of_district . '</td>';
                        $tbl .=  '<td>' . $name_of_district_stores . '</td>';
                        $tbl .=  '<td>' . $total_population . '</td>';
                        $tbl .=  '<td>' . $cold_chain_2_to_8 . '</td>';
                        $tbl .=  '<td>' . $cold_chain_15_to_25 . '</td>';
                    $tbl .=  '</tr>';

                }

            }
        }

        $tbl .= '</tbody>';
    $tbl .= '</table>';

    return $tbl;
}

function get_table_class($classes = []){
    $all_class          = "";

    if( !empty($classes) ){
        $all_class      .= implode(" ", $classes);
    }

    $all_class          .= " table table-bordered table-hover custom-tbl-bg";

    return $all_class;
}
?>