<?php
add_shortcode( 'USER_STATE', array( 'ThemeShortcodes', 'current_user_state_name') );
add_shortcode( 'USER_DISTRICT', array( 'ThemeShortcodes', 'current_user_district_name') );
add_shortcode( 'CTOOLTIPS', array( 'ThemeShortcodes', 'custom_tooltips_structure') );
add_shortcode( 'ASPIRATIONAL_DISTRICTS_COUNT_FIELDS', array( 'ThemeShortcodes', 'aspirational_districts_count_fields') );
add_shortcode( 'ASPIRATIONAL_DISTRICTS_FIELDS', array( 'ThemeShortcodes', 'aspirational_districts_fields') );
add_shortcode( 'DEMOGRAPHIC_DATA_FIELDS', array( 'ThemeShortcodes', 'demographic_data_fields') );
add_shortcode( 'STATE_IMMUNIZATION_COVERAGE_FIELDS', array( 'ThemeShortcodes', 'state_immunization_coverage_fields') );
add_shortcode( 'DETAILS_OF_COLD_CHAIN', array( 'ThemeShortcodes', 'details_of_cold_chain') );
add_shortcode( 'DATE', array( 'ThemeShortcodes', 'get_the_date') );
add_shortcode( 'NEX_BUTTON', array( 'ThemeShortcodes', 'nex_form_button') );
add_shortcode( 'NEX_DOWNLOAD_BUTTON', array( 'ThemeShortcodes', 'nex_form_download_button') );


if( !class_exists('ThemeShortcodes') ){
	class ThemeShortcodes{
    
	    public function __construct(){
	    }

		public function current_user_state_name($atts){
			$field_val 					= false;

			$current_uri                = $_SERVER['REQUEST_URI'];

			$current_uri_param 			= parse_url($current_uri);
			parse_str( $current_uri_param['query'], $params );

			if( isset($params["user_id"]) ){
			    $user_id 				= $params["user_id"];
			} else {
			    $user_id 				= get_current_user_id();
			}

			return get_user_state($user_id);
		}

		public function current_user_district_name($atts){
			$field_val 					= false;

			$current_uri                = $_SERVER['REQUEST_URI'];

			$current_uri_param 			= parse_url($current_uri);
			parse_str( $current_uri_param['query'], $params );

			if( isset($params["user_id"]) ){
			    $user_id 				= $params["user_id"];
			} else {
			    $user_id 				= get_current_user_id();
			}
			
			return get_user_city($user_id);
		}

		public function custom_tooltips_structure( $atts, $content = null ){
			$values = shortcode_atts(
				array(
	        		'title' => '',
	    		),
	    	$atts);

	    	$tooltips_icon = '<span class="info-icon">';
		        $tooltips_icon .= '<i class="fa fa-info"></i>';
		    $tooltips_icon .= '</span>';

			$tooltips = '';
			$tooltips .= '<div class="title-with-icon">';
			    
			    if( $values['title'] && !empty($values['title']) ){
			    	$tooltips .= '<h5 title="Click here for more information">' . $values['title'] . $tooltips_icon . '</h5>';
			    } else {
			    	$tooltips .= '<h5>' . $tooltips_icon . '</h5>';
			    }

			    $tooltips .= '<div class="custom-modal">';
			        $tooltips .= '<div class="modal-wrap">';
			            $tooltips .= '<span class="modal-close"></span>';
			            $tooltips .= '<div class="modal-content">';
			            	if( $content == "CONTIDITIONAL_INFORMATION" ){
			            		$tooltips .= 'If data is different please fill <strong>"other"</strong> box';
			            	} else {
			            		$tooltips .= $content;
			            	}
			            $tooltips .= '</div>';
			        $tooltips .= '</div>';
			    $tooltips .= '</div>';
			$tooltips .= '</div>';

			return $tooltips;
		}

		public function aspirational_districts_count_fields($atts){
		    global $wpdb;

			$field_val 					= "";

			// $c_state_id 				= get_current_user_state_id();
			// $c_city_id 					= get_current_user_city_id();
			// $c_roles                    = get_current_user_roles();

			$user_data 					= self::get_current_user_data_for_shortcode();
			$c_state_id 				= $user_data['c_state_id'];
			$c_city_id 					= $user_data['c_city_id'];
			$c_roles                    = $user_data['c_roles'];

			$attr 						= [];
		    $attr['name'] 				= 'number_of_niti_aayog_aspirational_districts_identified_in_the_state';
		    $attr['disabled'] 			= true;

			$chk_html 					= '';
			$field_val 					= 0;

			/*// Create field for "state" user
		    if( in_array(STATE_USER, $c_roles) ){
		        
		        $pcv_tbl_result 		= $wpdb->get_results("SELECT pcv.*, city.id as city_id, city.city FROM " .PCV_TBL. " as pcv LEFT JOIN " . CITY_TBL . " as city ON pcv.cities_id = city.id WHERE pcv.states_id = '" . $c_state_id . "'");

		        if( $pcv_tbl_result && !empty($pcv_tbl_result) ){

		        	$field_val_count 				= 0;

		        	foreach ( $pcv_tbl_result as $district ) {
		        		if( $district->aspirational_districts == "Yes" ){
				    		$field_val_count 			= $field_val_count + 1;
				    	}
		        	}

		        	$field_val 							= $field_val_count;

		        }


		    // Create field for "district" user
		    } else if( in_array(DISTICT_USER, $c_roles) ){

		    	$field_val_count 			= 0;

		        $pcv_tbl_row 				= $wpdb->get_row("SELECT * FROM " .PCV_TBL. " WHERE states_id = '" . $c_state_id . "' AND cities_id = '" . $c_city_id . "'");

		        if( $pcv_tbl_row && !empty($pcv_tbl_row) ){
		        	if( $pcv_tbl_row->aspirational_districts == "Yes" ){
			    		$field_val_count 	= 1;
			    	}

			    	$field_val 				= $field_val_count;
		        }
		    }*/

		    $field_val 						= "";
			
			$chk_html 						.= nex_form_textbox($attr['name'], $field_val, ['numbers_only' => true]);

			return $chk_html;
		}

		public function aspirational_districts_fields($atts){
		    global $wpdb;

			$field_val 					= false;

			$user_data 					= self::get_current_user_data_for_shortcode();
			$c_state_id 				= $user_data['c_state_id'];
			$c_city_id 					= $user_data['c_city_id'];
			$c_roles                    = $user_data['c_roles'];

			$field_attributes 						= [];
		    $field_attributes['disabled'] 			= false;
		    $field_attributes['checked'] 			= false;
		    $field_attributes['is_col'] 			= false;
		    $field_attributes['col_val'] 			= 0;
		    //$field_attributes['uri'] 				= $c_roles;

			$chk_html 					= '';

	    	$saved_field_data 				= '';
	    	$get_saved_data 				= get_saved_nex_form_data();
    		$saved_data 					= $get_saved_data['form_data'];

	    	$saved_field_data 				= '';
        	$found_key 						= false;

			// Create field for "state" user
		    if( in_array(STATE_USER, $c_roles) ){
        	
	        	if( !empty($saved_data) ){
		    		
		    		$found_saved_key 			= array_search('names_of_the_identified_aspirational_districts_in_the_state[]', array_column($saved_data, 'name'));

		    		if( $found_key !== false ){
						$saved_field_data 		= $saved_data[$found_key]['val'];
					}
		    	}

		        /*$pcv_tbl_result 		= $wpdb->get_results("SELECT pcv.*, city.id as city_id, city.city FROM " .PCV_TBL. " as pcv LEFT JOIN " . CITY_TBL . " as city ON pcv.cities_id = city.id WHERE pcv.states_id = '" . $c_state_id . "'");*/
		        $pcv_tbl_result 		= $wpdb->get_results("SELECT * FROM " . CITY_TBL . " WHERE states_id = '" . $c_state_id . "'");

		        if( $pcv_tbl_result && !empty($pcv_tbl_result) ){

		        	

		        	$chk_html 					.= nex_form_checkbox_wrapper_start();

		        	foreach ( $pcv_tbl_result as $district ) {

		        		if( empty($district->city) ){
		        			continue;
		        		}
		        		
		        		$field_val 				= false;
		        		// Check aspirational val if Yes then checkbox is selected
		        		// and if is no then not selected
		        		/*if( $district->aspirational_districts == "Yes" ){
				    		$field_val 			= true;
				    	}*/

				    	if( !empty($saved_field_data) ){

				    		if( is_array($saved_field_data) && in_array( $district->city, $saved_field_data ) ){
				    			$field_val 		= true;
				    		} else if( trim(strtolower($district->city)) == trim(strtolower($saved_field_data)) ){
				    			$field_val 		= true;
				    		}
				    	}

				    	$field_attributes['is_col'] 		= true;
				    	$field_attributes['col_val'] 		= 4;
				    	$field_attributes['checked'] 		= $field_val;

				    	// Create checkbox for aspirational
				    	$chk_html .= nex_form_checkbox('names_of_the_identified_aspirational_districts_in_the_state[]', $district->city, $field_attributes);
		        	}

		        	$chk_html 					.= nex_form_checkbox_wrapper_end();

		        } else {
		        	
		        	$chk_html 					.= nex_form_radio_wrapper_start();

		        	// If record not found the it will appears as radio with "Yes" and "No"
		        	// By default selected is "No"
		        	$chk_html .= nex_form_radio('names_of_the_identified_aspirational_districts_in_the_state', 'Yes', $field_attributes);	

		        	$field_attributes['checked'] = true;
		        	$chk_html .= nex_form_radio('names_of_the_identified_aspirational_districts_in_the_state', 'No', $field_attributes);

		        	$chk_html 					.= nex_form_checkbox_wrapper_end();

		        }

		        return $chk_html;


		    // Create field for "district" user
		    } else if( in_array(DISTICT_USER, $c_roles) ){
        	
	        	if( !empty($saved_data) ){
		    		
		    		$found_saved_key 			= array_search('names_of_the_identified_aspirational_districts_in_the_state', array_column($saved_data, 'name'));

		    		if( $found_key !== false ){
						$saved_field_data 		= $saved_data[$found_key]['val'];
					}
		    	}

		    	$chk_html 					.= nex_form_radio_wrapper_start();

		        $pcv_tbl_row 				= $wpdb->get_row("SELECT * FROM " .PCV_TBL. " WHERE states_id = '" . $c_state_id . "' AND cities_id = '" . $c_city_id . "'");

		        if( $pcv_tbl_row && !empty($pcv_tbl_row) ){
		        	if( $pcv_tbl_row->aspirational_districts == "Yes" ){
			    		$field_val 			= true;
			    	}
		        }

		    	if( !empty($saved_field_data) ){

		    		if( trim(strtolower($saved_field_data)) == "no" ){
		    			$field_val 		= false;
		    		} else if( trim(strtolower($saved_field_data)) == "yes" ){
		    			$field_val 		= true;
		    		}
		    	}

		        // Create radio field for "district" user
		        $field_attributes['checked'] 		= ($field_val ? true : false);
		        $chk_html .= nex_form_radio('names_of_the_identified_aspirational_districts_in_the_state', 'Yes', $field_attributes);	

	        	$field_attributes['checked'] 		= (!$field_val ? true : false);
	        	$chk_html .= nex_form_radio('names_of_the_identified_aspirational_districts_in_the_state', 'No', $field_attributes);

	        	$chk_html 					.= nex_form_checkbox_wrapper_end();
		    
		        return $chk_html;
		    }

		    // Create field for other role
		    // If record not found the it will appears as radio with "Yes" and "No"
        	// By default selected is "No"
        	
        	if( !empty($saved_data) ){
	    		
	    		$found_saved_key 			= array_search('names_of_the_identified_aspirational_districts_in_the_state', array_column($saved_data, 'name'));

	    		if( $found_key !== false ){
					$saved_field_data 		= $saved_data[$found_key]['val'];
				}
	    	}

	    	if( !empty($saved_field_data) ){

	    		if( trim(strtolower($saved_field_data)) == "no" ){
	    			$field_val 		= false;
	    		} else if( trim(strtolower($saved_field_data)) == "yes" ){
	    			$field_val 		= true;
	    		}
	    	}

        	$chk_html 					.= nex_form_radio_wrapper_start();
        	$field_attributes['checked'] 		= ($field_val ? true : false);
        	$chk_html .= nex_form_radio('names_of_the_identified_aspirational_districts_in_the_state', 'Yes', $field_attributes);	

        	$field_attributes['checked'] 		= (!$field_val ? true : false);
        	$chk_html .= nex_form_radio('names_of_the_identified_aspirational_districts_in_the_state', 'No', $field_attributes);
			
			$chk_html 					.= nex_form_checkbox_wrapper_end();

			return $chk_html;
		}

		public function demographic_data_fields($atts){
		    global $wpdb;

		    $attr 						= shortcode_atts(array(
	        	'name' 					=> 'total_population_of_state',
	    	),$atts);

			$field_val 					= "";
			// $c_state_id 				= get_current_user_state_id();
			// $c_city_id 					= get_current_user_city_id();
			// $c_roles                    = get_current_user_roles();

			$user_data 					= self::get_current_user_data_for_shortcode();
			$c_state_id 				= $user_data['c_state_id'];
			$c_city_id 					= $user_data['c_city_id'];
			$c_roles                    = $user_data['c_roles'];

			$text_field_html 			= '';

			// Create field for "state" user
		    if( in_array(STATE_USER, $c_roles) ){

		    	$sic_pcv_tbl_row 				= $wpdb->get_row("SELECT * FROM " .PCV_TBL. " WHERE states_id = '" . $c_state_id . "' LIMIT 0, 1");

		        if( $sic_pcv_tbl_row && !empty($sic_pcv_tbl_row) ){

		        	if( $attr['name'] == 'total_population_of_state' ){
		        		if( !empty($sic_pcv_tbl_row->total_mid_year_population) ){
				    		$field_val 			= $sic_pcv_tbl_row->total_mid_year_population;
				    	}
		        	} else if( $attr['name'] == 'total_no_of_infants' ){
		        		if( !empty($sic_pcv_tbl_row->total_infant_population) ){
				    		$field_val 			= $sic_pcv_tbl_row->total_infant_population;
				    	}
		        	}
		        	
		        }

		    // Create field for "district" user
		    } else if( in_array(DISTICT_USER, $c_roles) ){

		        $sic_pcv_tbl_row 				= $wpdb->get_row("SELECT * FROM " .PCV_TBL. " WHERE states_id = '" . $c_state_id . "' AND cities_id = '" . $c_city_id . "'");

		        if( $sic_pcv_tbl_row && !empty($sic_pcv_tbl_row) ){

			    	if( $attr['name'] == 'total_population_of_district' ){
		        		if( !empty($sic_pcv_tbl_row->mid_year_population) ){
				    		$field_val 			= $sic_pcv_tbl_row->mid_year_population;
				    	}
		        	} else if( $attr['name'] == 'total_no_of_infants' ){
		        		if( !empty($sic_pcv_tbl_row->infant_population) ){
				    		$field_val 			= $sic_pcv_tbl_row->infant_population;
				    	}
		        	}
		        }
		    }

		    // Create field for other role
        	$text_field_html 			.= nex_form_textbox($attr['name'], $field_val, ['readonly' => true]);

			return $text_field_html;
		}

		public function get_current_user_data_for_shortcode(){
			$current_uri                = $_SERVER['REQUEST_URI'];

			$current_uri_param 			= parse_url($current_uri);
			parse_str( $current_uri_param['query'], $params );

			if( isset($params["user_id"]) ){
			    $c_state_id 			= get_user_state_id($params["user_id"]);
				$c_city_id 				= get_user_city_id($params["user_id"]);
				$c_roles 				= get_user_roles($params["user_id"]);
			} else {
			    $c_state_id 			= get_current_user_state_id();
				$c_city_id 				= get_current_user_city_id();
				$c_roles 				= get_current_user_roles();
			}

			return array(
				'c_state_id' 			=> $c_state_id,
				'c_city_id' 			=> $c_city_id,
				'c_roles' 				=> $c_roles,
			);
		}

		// [STATE_IMMUNIZATION_COVERAGE_FIELDS name="penta1_hmis"]
		public function state_immunization_coverage_fields($atts){
		    global $wpdb;

		    $attr 						= shortcode_atts(array(
	        	'name' 					=> 'state_immunization_coverage_penta_1_dpt_1_hmis',
	    	),$atts);

			$field_val 					= "";

			// $c_state_id 				= get_current_user_state_id();
			// $c_city_id 					= get_current_user_city_id();
			// $c_roles                    = get_current_user_roles();
			$user_data 					= self::get_current_user_data_for_shortcode();
			$c_state_id 				= $user_data['c_state_id'];
			$c_city_id 					= $user_data['c_city_id'];
			$c_roles                    = $user_data['c_roles'];

			$text_field_html 			= '';

			// Create field for "state" user
		    if( in_array(STATE_USER, $c_roles) ){

		    	$sic_pcv_tbl_row 				= $wpdb->get_row("SELECT * FROM " .PCV_TBL. " WHERE states_id = '" . $c_state_id . "' LIMIT 0, 1");

		        if( $sic_pcv_tbl_row && !empty($sic_pcv_tbl_row) ){

		        	if( $attr['name'] == 'state_immunization_coverage_penta_1_dpt_1_hmis' ){
		        		if( !empty($sic_pcv_tbl_row->total_hmis_penta_1) ){
				    		$field_val 			= $sic_pcv_tbl_row->total_hmis_penta_1;
				    	}
		        	} else if( $attr['name'] == 'state_immunization_coverage_penta_3_dpt_3_hmis' ){
		        		if( !empty($sic_pcv_tbl_row->total_hmis_penta_3) ){
				    		$field_val 			= $sic_pcv_tbl_row->total_hmis_penta_3;
				    	}
		        	} else if( $attr['name'] == 'state_immunization_coverage_mr1_measles_hmis' ){
		        		if( !empty($sic_pcv_tbl_row->total_hmis_mr_1_coverage) ){
				    		$field_val 			= $sic_pcv_tbl_row->total_hmis_mr_1_coverage;
				    	}
		        	} else if( $attr['name'] == 'state_immunization_coverage_penta_3_dpt_3_nfhs4' ){
		        		if( !empty($sic_pcv_tbl_row->total_nfhs_4_dpt_3_coverage) ){
				    		$field_val 			= $sic_pcv_tbl_row->total_nfhs_4_dpt_3_coverage;
				    	}
		        	} else if( $attr['name'] == 'state_immunization_coverage_mr1_measles_nfhs4' ){
		        		if( !empty($sic_pcv_tbl_row->total_nfhs_4_measles_vaccine_coverage) ){
				    		$field_val 			= $sic_pcv_tbl_row->total_nfhs_4_measles_vaccine_coverage;
				    	}
		        	} else if( $attr['name'] == 'state_drop_out_rates_penta_1_dpt_1_hmis' ){
		        		if( !empty($sic_pcv_tbl_row->total_hmis_dropout_p_1_3) ){
				    		$field_val 			= $sic_pcv_tbl_row->total_hmis_dropout_p_1_3;
				    	}
		        	} else if( $attr['name'] == 'state_drop_out_rates_Penta_3_1_to_mr_1_hmis' ){
		        		if( !empty($sic_pcv_tbl_row->total_hmis_dropout_p_3_mr) ){
				    		$field_val 			= $sic_pcv_tbl_row->total_hmis_dropout_p_3_mr;
				    	}
		        	} else if( $attr['name'] == 'sessions_held_against_planned_as_per_hmis_during_2019_20' ){
		        		if( !empty($sic_pcv_tbl_row->total_hmis_sessions_held) ){
				    		$field_val 			= $sic_pcv_tbl_row->total_hmis_sessions_held;
				    	}
		        	}
		        	
		        }

		    // Create field for "district" user
		    } else if( in_array(DISTICT_USER, $c_roles) ){

		        $sic_pcv_tbl_row 				= $wpdb->get_row("SELECT * FROM " .PCV_TBL. " WHERE states_id = '" . $c_state_id . "' AND cities_id = '" . $c_city_id . "'");


		    	if( $attr['name'] == 'district_immunization_coverage_penta_1_dpt_1_hmis' ){
	        		if( $sic_pcv_tbl_row && !empty($sic_pcv_tbl_row) && !empty($sic_pcv_tbl_row->hmis_penta_1) ){
			    		$field_val 			= $sic_pcv_tbl_row->hmis_penta_1;
			    	}
	        	} else if( $attr['name'] == 'district_immunization_coverage_penta_3_dpt_3_hmis' ){
	        		if( $sic_pcv_tbl_row && !empty($sic_pcv_tbl_row) && !empty($sic_pcv_tbl_row->hmis_penta_3) ){
			    		$field_val 			= $sic_pcv_tbl_row->hmis_penta_3;
			    	}
	        	} else if( $attr['name'] == 'district_immunization_coverage_mr1_measles_hmis' ){
	        		if( $sic_pcv_tbl_row && !empty($sic_pcv_tbl_row) && !empty($sic_pcv_tbl_row->hmis_mr_1_coverage) ){
			    		$field_val 			= $sic_pcv_tbl_row->hmis_mr_1_coverage;
			    	}
	        	} else if( $attr['name'] == 'district_immunization_coverage_penta_3_dpt_3_nfhs4' ){

	        		$sic_pcv_district_tbl_row 		= $wpdb->get_row("SELECT * FROM " .PCV_DISTRICT_TBL. " WHERE states_id = '" . $c_state_id . "' AND cities_id = '" . $c_city_id . "'");
	        		
	        		if( $sic_pcv_district_tbl_row && !empty($sic_pcv_district_tbl_row) ){
	        			if( !empty($sic_pcv_district_tbl_row->dpt_nfhs_5) ){
				    		$field_val 			= $sic_pcv_district_tbl_row->dpt_nfhs_5;
				    	} else if( !empty($sic_pcv_district_tbl_row->dpt_nfhs_4) ){
				    		$field_val 			= $sic_pcv_district_tbl_row->dpt_nfhs_4;
				    	}
	        		}

	        	} else if( $attr['name'] == 'district_immunization_coverage_mr1_measles_nfhs4' ){

	        		$sic_pcv_district_tbl_row 		= $wpdb->get_row("SELECT * FROM " .PCV_DISTRICT_TBL. " WHERE states_id = '" . $c_state_id . "' AND cities_id = '" . $c_city_id . "'");
	        		
	        		if( $sic_pcv_district_tbl_row && !empty($sic_pcv_district_tbl_row) ){
	        			if( !empty($sic_pcv_district_tbl_row->mcv_nfhs_5) ){
				    		$field_val 			= $sic_pcv_district_tbl_row->mcv_nfhs_5;
				    	} else if( !empty($sic_pcv_district_tbl_row->mcv_nfhs_4) ){
				    		$field_val 			= $sic_pcv_district_tbl_row->mcv_nfhs_4;
				    	}
	        		}

	        	} else if( $attr['name'] == 'district_drop_out_rates_penta_1_dpt_1_hmis' ){
	        		if( $sic_pcv_tbl_row && !empty($sic_pcv_tbl_row) && !empty($sic_pcv_tbl_row->hmis_dropout_p_1_3) ){
			    		$field_val 			= $sic_pcv_tbl_row->hmis_dropout_p_1_3;
			    	}
	        	} else if( $attr['name'] == 'district_drop_out_rates_Penta_3_1_to_mr_1_hmis' ){
	        		if( $sic_pcv_tbl_row && !empty($sic_pcv_tbl_row) && !empty($sic_pcv_tbl_row->hmis_dropout_p_3_mr) ){
			    		$field_val 			= $sic_pcv_tbl_row->hmis_dropout_p_3_mr;
			    	}
	        	} else if( $attr['name'] == 'sessions_held_against_planned_as_per_hmis_during_2019_20' ){
	        		if( $sic_pcv_tbl_row && !empty($sic_pcv_tbl_row) && !empty($sic_pcv_tbl_row->hmis_sessions_held) ){
			    		$field_val 			= $sic_pcv_tbl_row->hmis_sessions_held;
			    	}
	        	}
		    }

		    // Create field for other role
        	$text_field_html 			.= nex_form_textbox($attr['name'], $field_val, ['readonly' => true]);

			return $text_field_html;
		}

		public function details_of_cold_chain($atts){
		    global $wpdb;

		    $attr 						= shortcode_atts(array(
	        	'col1' 					=> 'Name of district',
	        	'col2' 					=> 'Name of district stores',
	        	'col3' 					=> 'Total Population',
	        	'col4' 					=> 'Cold chain (+2 to +8 degree Celsius) space available (ILR)',
	        	'col5' 					=> 'Cold chain (-15 to   -25 degree Celsius) space available (D.F)',
	    	),$atts);

			$field_val 					= "";
			
			// $c_state_id 				= get_current_user_state_id();
			// $c_city_id 					= get_current_user_city_id();
			//$c_roles                    = get_current_user_roles();

			$user_data 					= self::get_current_user_data_for_shortcode();
			$c_state_id 				= $user_data['c_state_id'];
			$c_city_id 					= $user_data['c_city_id'];
			$c_roles                    = $user_data['c_roles'];

			$tbl_html 					= '';


			// Create Table head
			$tbl_head_id 				= nex_form_generate_id();
			
			$col_attributes 					= [];
			$col_attributes['id'] 				= $tbl_head_id;
			$col_attributes['class'] 			= 'col-xs-';
			$col_attributes['grid_width'] 		= 2;
			$col_attributes['col_num'] 			= 0;
			$col_attributes['is_head'] 			= true;
			$col_attributes['content'] 			= $attr['col1'];

			// Column 1
			$tbl_col_head 						= nex_form_cold_chain_col_structure($col_attributes);

			// Column 2
			$col_attributes['content'] 			= $attr['col2'];
			$col_attributes['grid_width'] 		= 4;
			$col_attributes['col_num'] 			= 1;
			$tbl_col_head 						.= nex_form_cold_chain_col_structure($col_attributes);

			// Column 3
			$col_attributes['content'] 			= $attr['col3'];
			$col_attributes['grid_width'] 		= 2;
			$col_attributes['col_num'] 			= 2;
			$tbl_col_head 						.= nex_form_cold_chain_col_structure($col_attributes);

			// Column 4
			$col_attributes['content'] 			= $attr['col4'];
			$col_attributes['col_num'] 			= 3;
			$tbl_col_head 						.= nex_form_cold_chain_col_structure($col_attributes);

			// Column 5
			$col_attributes['content'] 			= $attr['col5'];
			$col_attributes['col_num'] 			= 4;
			$tbl_col_head 						.= nex_form_cold_chain_col_structure($col_attributes);

			// Head defined
			$tbl_row_head 				= nex_form_cold_chain_row_structure($tbl_col_head, $tbl_head_id);

			// Body defined
			$tbl_row_body 				= '';

			// Create field for "state" user
		    if( in_array(STATE_USER, $c_roles) ){

		    	$get_cities 					= $wpdb->get_results("SELECT * FROM " .CITY_TBL. " WHERE states_id = '" . $c_state_id . "'");

		        if( $get_cities && !empty($get_cities) ){

		        	foreach ( $get_cities as $city_key => $city_arr ) {
		        		
		        		// Create Table body
						$tbl_body_id 						= nex_form_generate_id();
						
						// Default Attributes for cols
						$col_attributes 					= [];
						$col_attributes['id'] 				= $tbl_body_id;
						$col_attributes['class'] 			= 'col-xs-';
						$col_attributes['grid_width'] 		= 2;
						$col_attributes['col_num'] 			= 0;
						$col_attributes['content'] 			= '';

						// create text field
						$tbl_col_textfield1 = nex_form_textbox('name_of_district_' . $city_key, $city_arr->city, ['readonly' => true]);
						$tbl_col_textfield2 = nex_form_textbox('name_of_district_stores_' . $city_key, get_saved_nex_form_field_data('name_of_district_stores_' . $city_key));

						$tbl_col_textfield3 = nex_form_textbox('total_population_' . $city_key, get_saved_nex_form_field_data('total_population_' . $city_key), ['numbers_only' => true]);

						$tbl_col_textfield4 = nex_form_textbox('cold_chain_2_to_8_' . $city_key, get_saved_nex_form_field_data('cold_chain_2_to_8_' . $city_key), ['numbers_only' => true]);

						$tbl_col_textfield5 = nex_form_textbox('cold_chain_15_to_25_' . $city_key, get_saved_nex_form_field_data('cold_chain_15_to_25_' . $city_key), ['numbers_only' => true]);

						// create cols
						$col_attributes['content'] 			= $tbl_col_textfield1;
						$tbl_col_body 						= nex_form_cold_chain_col_structure($col_attributes);

						$col_attributes['content'] 			= $tbl_col_textfield2;
						$col_attributes['grid_width'] 		= 4;
						$col_attributes['col_num'] 			= 1;
						$tbl_col_body 						.= nex_form_cold_chain_col_structure($col_attributes);

						$col_attributes['content'] 			= $tbl_col_textfield3;
						$col_attributes['grid_width'] 		= 2;
						$col_attributes['col_num'] 			= 2;
						$tbl_col_body 						.= nex_form_cold_chain_col_structure($col_attributes);

						$col_attributes['content'] 			= $tbl_col_textfield4;
						$col_attributes['col_num'] 			= 3;
						$tbl_col_body 						.= nex_form_cold_chain_col_structure($col_attributes);

						$col_attributes['content'] 			= $tbl_col_textfield5;
						$col_attributes['col_num'] 			= 4;
						$tbl_col_body 						.= nex_form_cold_chain_col_structure($col_attributes);

						// Create Body
						$tbl_row_body .= nex_form_cold_chain_row_structure($tbl_col_body, $tbl_body_id);

		        	}
		        	
		        }

		    // Create field for "district" user
		    } else if( in_array(DISTICT_USER, $c_roles) ){

		        $get_city 				= $wpdb->get_row("SELECT * FROM " .CITY_TBL. " WHERE states_id = '" . $c_state_id . "' AND cities_id = '" . $c_city_id . "'");

		        if( $get_city && !empty($get_city) ){

			    	// Create Table body
					$tbl_body_id 						= nex_form_generate_id();
					
					// Default Attributes for cols
					$col_attributes 					= [];
					$col_attributes['id'] 				= $tbl_body_id;
					$col_attributes['class'] 			= 'col-xs-';
					$col_attributes['grid_width'] 		= 2;
					$col_attributes['col_num'] 			= 0;

					// create text field
					$tbl_col_textfield1 = nex_form_textbox('name_of_district_' . $city_key, $get_city->city, ['readonly' => true]);
					$tbl_col_textfield2 = nex_form_textbox('name_of_district_stores_' . $city_key, get_saved_nex_form_field_data('name_of_district_stores_' . $city_key));
					
					$tbl_col_textfield3 = nex_form_textbox('total_population_' . $city_key, get_saved_nex_form_field_data('total_population_' . $city_key));
					
					$tbl_col_textfield4 = nex_form_textbox('cold_chain_2_to_8_' . $city_key, get_saved_nex_form_field_data('cold_chain_2_to_8_' . $city_key));
					
					$tbl_col_textfield5 = nex_form_textbox('cold_chain_15_to_25_' . $city_key, get_saved_nex_form_field_data('cold_chain_15_to_25_' . $city_key));
					

					// create cols
					$col_attributes['content'] 			= $tbl_col_textfield1;
					$tbl_col_body 						= nex_form_cold_chain_col_structure($col_attributes);

					$col_attributes['content'] 			= $tbl_col_textfield2;
					$col_attributes['grid_width'] 		= 4;
					$col_attributes['col_num'] 			= 1;
					$tbl_col_body 						.= nex_form_cold_chain_col_structure($col_attributes);

					$col_attributes['content'] 			= $tbl_col_textfield3;
					$col_attributes['grid_width'] 		= 2;
					$col_attributes['col_num'] 			= 2;
					$tbl_col_body 						.= nex_form_cold_chain_col_structure($col_attributes);

					$col_attributes['content'] 			= $tbl_col_textfield4;
					$col_attributes['col_num'] 			= 3;
					$tbl_col_body 						.= nex_form_cold_chain_col_structure($col_attributes);

					$col_attributes['content'] 			= $tbl_col_textfield5;
					$col_attributes['col_num'] 			= 4;
					$tbl_col_body 						.= nex_form_cold_chain_col_structure($col_attributes);

					// Create Body
					$tbl_row_body .= nex_form_cold_chain_row_structure($tbl_col_body, $tbl_body_id);
		        }
		    }

		    // Create table
        	$tbl_html 			.= $tbl_row_head . $tbl_row_body;

			return $tbl_html;
		}

		public function get_the_date($atts){
			$attr 						= shortcode_atts(array(
	        	'date' 					=> date("Y-m-d"),
	        	'formate' 				=> "d/m/Y",
	    	),$atts);

			return theme_change_date_format($attr['date'], "Y-m-d", $attr['formate'] );
		}

		public function nex_form_button($atts){
			$attr 						= shortcode_atts(array(
	        	'class' 				=> 'nex-save-step',
	        	'id' 					=> "nex-save-step",
	        	'title' 				=> "Save",
	        	'align' 				=> "align_right",
	    	),$atts);

			return '<div class="submit-button the_submit button_fields common_fields preset_fields special_fields selection_fields ' . $attr['align'] . '"><button type="button" class="svg_ready the_input_element btn btn-default ' . $attr['class'] . '" id="' . $attr['id'] . '" data-ga="">' . $attr['title'] . '</button></div>';
		}

		public function nex_form_download_button($atts){
			$attr 						= shortcode_atts(array(
	        	'class' 				=> 'nex-download-btn',
	        	'id' 					=> "nex-download-btn",
	        	'title' 				=> "Download",
	        	'align' 				=> "align_center",
	    	),$atts);

			return '<div class="submit-button the_submit button_fields common_fields preset_fields special_fields selection_fields ' . $attr['align'] . '"><a href="#" class="svg_ready the_input_element btn btn-default ' . $attr['class'] . '" id="' . $attr['id'] . '" data-ga="">' . $attr['title'] . '</a></div>';
		}
	}	
}

function nex_form_generate_id(){
	return rand(100000, 999999);
}

function nex_form_checkbox_wrapper_start(){
	$chk_wrapper = '<div class="input_holder radio-group">';
		$chk_wrapper .= '<div class="row">';
			$chk_wrapper .= '<div class="the-radios input_container error_message col-sm-12" id="the-radios" data-checked-color="alert-success" data-checked-class="fa-check" data-unchecked-class="" data-placement="bottom" data-content="Required" data-secondary-message="Minimum of {x} selections required" title="">';
				$chk_wrapper .= '<div class="input-inner">';

	return $chk_wrapper;
}

function nex_form_radio_wrapper_start(){
	$chk_wrapper = '<div class="input_holder radio-group">';
		$chk_wrapper .= '<div class="row">';
			$chk_wrapper .= '<div class="the-radios input_container error_message col-sm-12" id="the-radios" data-checked-color="" data-checked-class="fa-circle" data-unchecked-class="" data-placement="bottom" data-content="Required" title="">';
				$chk_wrapper .= '<div class="input-inner">';

	return $chk_wrapper;
}

function nex_form_checkbox_wrapper_end(){

	$chk_wrapper = '</div>';
	$chk_wrapper .= '</div>';
	$chk_wrapper .= '</div>';
	$chk_wrapper .= '</div>';

	return $chk_wrapper;
}

function nex_form_parse_args($arg = []){

	$defaults 				= [
		'disabled' 			=> false,
		'readonly' 			=> false,
		'checked' 			=> false,
		'is_col' 			=> false,
		'col_val' 			=> 0,
	];

	return wp_parse_args($arg, $defaults);
}

function nex_form_checkbox($name, $value, $attributes = []){

	$attributes 			= nex_form_parse_args($attributes);

	$is_checked 			= $attributes['checked'];
	$is_disabled 			= $attributes['disabled'];
	$is_col 				= $attributes['is_col'];
	$col_val 				= $attributes['col_val'];

	$chk_id 				= $name . '_' . strtolower($value);

	$col_class 				= ($is_col) ? 'col-sm-' . $col_val : '';

	$chk_html = '<label class="checkbox-inline radio-inline auto_populate_checked ' . $col_class . ' ' . ($is_checked ? 'radio_selected' : '') . ' ' . ($is_disabled ? 'disabled' : '') . ' ' . $is_checked . '" for="' . $chk_id . '">';
		$chk_html .= '<span class="has-pretty-child">';
			$chk_html .= '<div class="clearfix prettycheckbox labelright blue has-pretty-child">';
				
				$chk_html .= '<input class="check the_input_element nex_form_auto_populate" type="checkbox" name="' . $name . '" id="' . $chk_id . '" value="' . $value . '" style="display: block;" autocomplete="enabled" ' . ($is_checked ? 'checked="checked"' : '') . '>';
				
				if( $is_checked ){
					$chk_html .= '<a class="checked ui-state-active" style="background: rgb(139, 195, 74);"></a>';
					$chk_html .= '<span style="color:rgb(255, 255, 255);" class="check-icon animated zoomInFast checked fa fa-check"></span>';
				} else {
					$chk_html .= '<a class="fa ui-state-default"></a>';
				}
			$chk_html .= '</div>';

			$chk_html .= '<span class="input-label check-label">' . $value . '</span>';

		$chk_html .= '</span>';
	$chk_html .= '</label>';

	return $chk_html;
}

function nex_form_radio($name, $value, $attributes = []){
	$attributes 			= nex_form_parse_args($attributes);

	$is_checked 			= $attributes['checked'];
	$is_disabled 			= $attributes['disabled'];
	$is_col 				= $attributes['is_col'];
	$col_val 				= $attributes['col_val'];

	$radio_id = $name . '_' . strtolower($value);

	$col_class 				= ($is_col) ? 'col-sm-' . $col_val : '';

	$radio_html = '<label class="radio-inline ' . $col_class . ' ' . ($is_checked ? 'radio_selected' : '') . ' ' . ($is_disabled ? 'disabled' : '') . ' ' . $is_checked . '" for="' . $radio_id . '">';
		$radio_html .= '<span class="has-pretty-child">';
			$radio_html .= '<div class="clearfix prettyradio labelright blue">';
				
				$radio_html .= '<input class="radio the_input_element nex_form_auto_populate" type="radio" name="' . $name . '" id="' . $radio_id . '" value="' . $value . '" style="display: block;" autocomplete="enabled" ' . ($is_checked ? 'checked="checked"' : '') . '>';
				
				if( $is_checked ){
					$radio_html .= '<a class="checked ui-state-active" style="background: rgb(139, 195, 74);"></a>';
					$radio_html .= '<span style="color:rgb(255, 255, 255);" class="check-icon animated zoomInFast checked fa fa-circle"></span>';
				} else {
					$radio_html .= '<a class="fa ui-state-default" style="background: rgba(255, 255, 255, 0.9);"></a>';
				}

			$radio_html .= '</div>';

			$radio_html .= '<span class="input-label radio-label">' . $value . '</span>';

		$radio_html .= '</span>';
	$radio_html .= '</label>';

	return $radio_html;
}

function nex_form_textbox($name, $value, $attributes = []){

	$attributes 			= nex_form_parse_args($attributes);

	$is_checked 			= $attributes['checked'];
	$is_disabled 			= $attributes['disabled'];
	$is_readonly 			= $attributes['readonly'];
	$is_col 				= $attributes['is_col'];
	$col_val 				= $attributes['col_val'];
	$numbers_only 			= $attributes['numbers_only'];

	$textfield = '';

	if( $numbers_only ){
		$textfield .= '<div class="numbers_only">';
	}

	$textfield .= '<input type="text" name="' . $name . '" class="form-control error_message the_input_element aling_left align_left nex_form_auto_populate   ' . ($numbers_only_calss ? 'numbers_only' : '') . '" data-maxlength-color="label label-success" data-maxlength-position="bottom" data-maxlength-show="false" data-default-value="' . $value . '" data-onfocus-color="#66AFE9" data-drop-focus-swadow="1" data-placement="bottom" data-content="Required" data-secondary-message="" title="" placeholder="" id="' . $name . '" value="' . $value . '" ' . ($is_disabled ? 'disabled="disabled"' : '') . '  ' . ($is_readonly ? 'readonly' : '') . ' data-populate="' . $value . '">';

	if( $numbers_only ){
		$textfield .= '</div>';
	}

	return $textfield;
}

function nex_form_cold_chain_col_structure($attributes = []){

	$defaults 				= [
		'id' 				=> rand(100000, 999999),
		'class' 			=> 'col-xs-',
		'grid_width' 		=> 2,
		'col_num' 			=> 0,
		'is_head' 			=> false,
		'content' 			=> '',
	];

	$args 					= wp_parse_args($attributes, $defaults);

	$col_html = '<div class="grid_input_holder id-_' . $args['id'] . ' grid-target-4 ' . $args['class'] . $args['grid_width'] . '" data-grid-width="' . $args['grid_width'] . '" data-grid-num="' . $args['col_num'] . '">
		<div class="form_field all_fields html html_fields" data-settings=".s-html" data-settings-tabs="#input-settings, #animation-settings, #math-settings" style="margin-bottom: 15px;" id="_57535">';
		$col_html .= '<div class="row">';
			$col_html .= '<div class="col-sm-12" id="field_container">';
				$col_html .= '<div class="row">';
					$col_html .= '<div class="col-sm-12 input_container">';

					if( $args['is_head'] ) :
						$col_html .= '<input type="hidden" class="set_math_result" value="0" name="math_result" autocomplete="enabled">';
						$col_html .= '<div class="the_input_element" data-math-equation="" data-original-math-equation="" data-decimal-places="0">' . $args['content'] . '</div>';
						$col_html .= '<div style="clear:both;"></div>';
					else :
						$col_html .= $args['content'];
					endif;

				$col_html .= '</div>';
					$col_html .= '</div>';
				$col_html .= '</div>';
			$col_html .= '</div>';
		$col_html .= '</div>';
	$col_html .= '</div>';

	return $col_html;
}

function nex_form_cold_chain_row_structure($content, $id = ''){

	return '<div class="grid-system-4 is_grid" data-settings=".s-grid" data-settings-tabs="#input-settings, #animation-settings, #extra-settings" style="" id="_' . $id . '">
		<div class="row grid_row">
		' . $content . '
		</div>
	</div>';
}

function generate_nex_form_temp_id($user_id){
    global $current_user, $wpdb;

    $current_user 			= wp_get_current_user();

    $unique                 = false;
    $tested                 = [];

    do{

        $random             = rand(1, 99999999);

        if( in_array( $random, $tested ) ){
            continue;
        }

        $pre_sql 			= $wpdb->prepare('SELECT COUNT(id) as total FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE temp_id = "' . $random . '"');
		$results 			= $wpdb->get_row($pre_sql);
        
        $tested[]           = $random;

        if( $results->total == 0){
            $unique = true;
        }
    }
    while(!$unique);

    return $random;
}

function get_nex_form_temp_id($user_id){
    $temp_id = get_user_meta( $user_id, 'nex_form_temp_id', true );

	if( empty($temp_id) ){
		$temp_id = generate_nex_form_temp_id($user_id);
		update_user_meta( $user_id, 'nex_form_temp_id', $temp_id );
	}

	return $temp_id;
}

function create_nex_form_data_temp_record($request, $is_published = false){
    global $current_user, $wpdb;

    $nex_form_id 					= isset($request['nex_form_id']) ? $request['nex_form_id'] : 0;
    $c_user_id 						= $current_user->ID;
    $form_data 						= isset($request['data']) ? set_data_array($request['data']) : json_encode([]);
    $files_data 					= json_encode([]);
    $temp_id 						= get_nex_form_temp_id($c_user_id);



	write_log('<======================' . date("Y-m-d H:i:s") . '==============================> ');
	
	$log_array 						= array(
		'##ACTION##' 				=> "save_nex_form_steps_data",
		'##NF_ID##' 				=> $nex_form_id,
		'##U_ID##' 					=> $c_user_id,
		'##CU_ID##' 				=> $c_user_id,
		'##TEMP_ID##' 				=> $temp_id,
		'##REQUEST##' 				=> $request,
	);

	write_log($log_array);

    if( $c_user_id == 0 || $nex_form_id == 0 ){
    	return $request;
	}
	
	$query 							= "";

    $pre_sql 						= $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE user_id = "' . $current_user->ID . '" AND is_published = "0" ORDER BY id DESC');
	$results 						= $wpdb->get_row($pre_sql);

	if( $results && !empty($results) ){

		$published_qry = '';
		if( $is_published ){
			$published_qry = ", is_published = '1'";
		}

		$updates_query 				= "UPDATE " . NEX_FORM_TEMP_ENTRY_TBL . " SET nex_form_id = '".$nex_form_id."', form_data = '".$form_data."', updated_at = '".date("Y-m-d H:i:s")."'" . $published_qry . " WHERE id = '".$results->id."'";

		$wpdb->query($updates_query);
		write_log($updates_query);

		$wpdb->query("DELETE FROM " . NEX_FORM_TEMP_ENTRY_TBL . " WHERE `user_id` = '" . $form_user_id . "' AND id != '" . $results->id . "'");

		$query = $updates_query;
		
	} else {

		$insert_query 				= "INSERT INTO " . NEX_FORM_TEMP_ENTRY_TBL . " (temp_id, nex_form_id, user_id, form_data, files_data, created_at, updated_at) VALUES ('".$temp_id."', '".$nex_form_id."', '".$c_user_id."', '".$form_data."', '".$files_data."', '".date("Y-m-d H:i:s")."', '".date("Y-m-d H:i:s")."')";

		$wpdb->query($insert_query);
		write_log($insert_query);

		$query = $insert_query;
	}

	write_log('<======================' . date("Y-m-d H:i:s") . '==============================> ');

	return $form_data;
    // return [
	// 	'exist' => $results,
	// 	'query' => $query,
	// 	'data' => $form_data,
	// 	'nex_form_id' => $nex_form_id,
	// 	'c_user_id' => $c_user_id,
	// 	'temp_id' => $temp_id,
	// 	'request_data' => $request['data'],
	// ];
}

function final_nex_form_data_published_temp_tbl($records){
    global $current_user, $wpdb;

    $nex_form_id 					= isset($records['nex_form_id']) ? $records['nex_form_id'] : 0;
    $record_id 						= isset($records['record_id']) ? $records['record_id'] : 0;
    $user_id 						= isset($records['user_id']) ? $records['user_id'] : 0;
    $c_user_id 						= $current_user->ID;
    //$files_data 					= isset($records['file_data']) ? set_data_array($records['file_data']) : json_encode([]);
    $files_val 						= isset($records['files_val']) ? $records['files_val'] : [];
	$temp_id 						= get_nex_form_temp_id($user_id);
	$c_roles        				= get_current_user_roles();

    $pre_sql 						= $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE nex_form_id = "' . $nex_form_id . '" AND temp_id = "' . $temp_id . '" AND user_id = "' . $user_id . '" ORDER BY id DESC');
	$results 						= $wpdb->get_row($pre_sql);

	if( $results && !empty($results) ){

		$form_array = json_decode($results->form_data, true);
		$files_data = json_decode($results->files_data, true);

		if( !empty($files_data) ){

			foreach ( $files_data as $rfd_key => $rfd_value ) {
				
				$found_key 						= false;
				$found_key 						= array_search($rfd_value['name'], array_column($form_array, 'name'));

				if( $found_key !== false ){
					$form_array[$found_key]['val'] = $rfd_value['val'];
				}
			}
		}

		//$en_form_array = json_encode($form_array, JSON_UNESCAPED_UNICODE);
		$en_form_array = set_data_array($form_array);

		$state_status 		= $results->state_status;
		$created_at 		= $results->created_at;
		if( $user_id == $c_user_id ){
			$created_at 	= date("Y-m-d H:i:s");
			$state_status 	= 0;
		} else if( $user_id != $c_user_id && in_array(STATE_USER, $c_roles) ){
			$created_at 	= $results->created_at;
			$state_status 	= 2;
		}

		$updates_query 				= "UPDATE " . NEX_FORM_TEMP_ENTRY_TBL . " SET form_data = '".$en_form_array."', record_id = '".$record_id."', state_status = '".$state_status."', created_at = '".$created_at."', updated_at = '".date("Y-m-d H:i:s")."', is_published = '1' WHERE id = '".$results->id."'";

		$wpdb->query($updates_query);

		// Delete unwanted records
		$wpdb->query("DELETE FROM " . NEX_FORM_TEMP_ENTRY_TBL . " WHERE `user_id` = '" . $user_id . "' AND `id` != '".$results->id."' ");
	}

	return "";
}

function get_saved_nex_form_data(){
	global $current_user, $wpdb;

	$current_user 					= wp_get_current_user();

    $nex_form_id 					= isset($_REQUEST['nex_form_id']) ? $_REQUEST['nex_form_id'] : 0;
	$c_user_id 						= $current_user->ID;
    $form_data 						= [];
    $file_data 						= [];
	$temp_id 						= get_nex_form_temp_id($c_user_id);
	
	if( $nex_form_id > 0 ){
		$is_already_published_qry 	= $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE nex_form_id = "' . $nex_form_id . '" AND user_id = "' . $c_user_id . '" AND is_published = "1"');

		$is_already_published 		= $wpdb->get_row($is_already_published_qry);

		if( $is_already_published && !empty($is_already_published) ){

			if( $is_already_published && !empty($is_already_published) ){
				$form_data 					= json_decode($is_already_published->form_data, true);
				$file_data 					= json_decode($is_already_published->files_data, true);
			}

			// Delete unwanted records
			$wpdb->query("DELETE FROM " . NEX_FORM_TEMP_ENTRY_TBL . " WHERE `user_id` = '" . $user_id . "' AND `id` != '".$is_already_published->id."' ");

			return [
				'form_data' 				=> $form_data,
				'file_data' 				=> $file_data,
				'file_html_data' 			=> get_files_html_from_array($file_data),
				'query' 					=> $is_already_published_qry,
				'r' 						=> $current_user
			];
		}

	}

    if( $nex_form_id > 0 ){
    	$pre_sql_qry 				= 'SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE nex_form_id = "' . $nex_form_id . '" AND temp_id = "' . $temp_id . '" AND user_id = "' . $c_user_id . '" AND is_published = "0"';
    } else {
    	$pre_sql_qry 				= 'SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE user_id = "' . $c_user_id . '" AND temp_id = "' . $temp_id . '" AND is_published = "0" ORDER BY id DESC';
    }

	$pre_sql 						= $wpdb->prepare($pre_sql_qry);
	$results 						= $wpdb->get_row($pre_sql);

	if( $results && !empty($results) ){
		$form_data 					= json_decode($results->form_data, true);
		$file_data 					= json_decode($results->files_data, true);
	}

    return [
    	'form_data' 				=> $form_data,
		'file_data' 				=> $file_data,
		'file_html_data' 			=> get_files_html_from_array($file_data),
		'query' 					=> $pre_sql,
		'r' 						=> $current_user
    ];
}

function get_saved_nex_form_field_data($key, $default_val = ''){
    $get_saved_data 				= get_saved_nex_form_data();

    $saved_data 					= $get_saved_data['form_data'];

	$saved_field_data 				= '';
	$found_key 						= false;

	if( !empty($saved_data) ){
		    		
		$found_saved_key 			= array_search($key, array_column($saved_data, 'name'));

		if( $found_key !== false ){
			$saved_field_data 		= $saved_data[$found_key]['val'];
		}
	}

	if( empty($saved_field_data) ){
		$saved_field_data 			= $default_val;
	}

    return $saved_field_data;
}

function get_published_nex_form_data(){
	global $current_user, $wpdb;

    $nex_form_id 					= isset($_REQUEST['nex_form_id']) ? $_REQUEST['nex_form_id'] : 0;
    $user_id 						= isset($_REQUEST['user_id']) ? $_REQUEST['user_id'] : 0;
    $record_id 						= isset($_REQUEST['record_id']) ? $_REQUEST['record_id'] : 0;
    $form_data 						= [];
    $file_data 						= [];
    $state_status 					= '0';
    
    $pre_sql 						= $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE nex_form_id = "' . $nex_form_id . '" AND record_id = "' . $record_id . '" AND user_id = "' . $user_id . '" AND is_published = "1"');
    
	$results 						= $wpdb->get_row($pre_sql);

	if( $results && !empty($results) ){
		$form_data 					= json_decode(stripslashes(html_entity_decode($results->form_data, true)));
		//$form_data 					= json_decode($results->form_data, true);
		$file_data 					= json_decode($results->files_data, true);
		$state_status 				= $results->state_status;

		// Delete unwanted records
		$wpdb->query("DELETE FROM " . NEX_FORM_TEMP_ENTRY_TBL . " WHERE `user_id` = '" . $user_id . "' AND `id` != '".$results->id."' ");
	}

    return [
    	'form_data' 				=> $form_data,
    	'file_data' 				=> $file_data,
		'state_status' 				=> $state_status,
		'file_html_data' 			=> get_files_html_from_array($file_data)
    ];
}

function update_edit_nex_form_data(){
	global $current_user, $wpdb;

    $nex_form_id 					= isset($_REQUEST['nex_form_id']) ? $_REQUEST['nex_form_id'] : 0;
    $user_id 						= isset($_REQUEST['user_id']) ? $_REQUEST['user_id'] : 0;
	$record_id 						= isset($_REQUEST['record_id']) ? $_REQUEST['record_id'] : 0;

	$c_user_id 						= $current_user->ID;
	$c_roles        				= get_current_user_roles();



	write_log('<======================' . date("Y-m-d H:i:s") . '==============================> ');
	
	$log_array 						= array(
		'##ACTION##' 				=> "store_edit_nex_form_data",
		'##NF_ID##' 				=> $nex_form_id,
		'##U_ID##' 					=> $user_id,
		'##CU_ID##' 				=> $c_user_id,
		'##TEMP_ID##' 				=> "",
		'##REQUEST##' 				=> $_REQUEST,
	);

	write_log($log_array);
	
	// $wpdb->query("DELETE FROM " . NEX_FORM_TEMP_ENTRY_TBL . " WHERE `user_id` = '" . $user_id . "' AND `nex_form_id` = '0'");
    // $wpdb->query("DELETE FROM " . NEX_FORM_TEMP_ENTRY_TBL . " WHERE `user_id` = '" . $user_id . "' AND `record_id` = '0'");

    $pre_sql 						= $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE nex_form_id = "' . $nex_form_id . '" AND record_id = "' . $record_id . '" AND user_id = "' . $user_id . '" AND is_published = "1"');
    
	$results 						= $wpdb->get_row($pre_sql);

	if( $results && !empty($results) ){

		$state_status = $results->state_status;
		if( $user_id != $c_user_id && in_array(STATE_USER, $c_roles) ){
			$state_status = 1;
		}

		$form_data 					= isset($_REQUEST['data']) ? set_data_array($_REQUEST['data']) : set_data_array($results->form_data);
    	//$file_data 					= $results->files_data;

    	$updates_query 				= "UPDATE " . NEX_FORM_TEMP_ENTRY_TBL . " SET form_data = '".$form_data."', updated_at = '".date("Y-m-d H:i:s")."', state_status = '".$state_status."' WHERE id = '".$results->id."'";
		$wpdb->query($updates_query);

		write_log($updates_query);

		// Delete unwanted records
		$wpdb->query("DELETE FROM " . NEX_FORM_TEMP_ENTRY_TBL . " WHERE `user_id` = '" . $user_id . "' AND `id` != '".$results->id."' ");
	}

	write_log('<======================' . date("Y-m-d H:i:s") . '==============================> ');
}

function set_data_array($array){
	$final_arr = [];

	$array = objectToArray($array);

	if( $array && !empty($array) ){
		foreach($array as $arr){

			$val = $arr['val'];

			$search_key = array_search('real_val__'.$arr['name'], array_column($array, 'name'));
			if( $search_key && isset($array[$search_key]['val'])){
				$val = $array[$search_key]['val'];
			}

			if(is_array($val)){
				$final_arr[] = array(
					'name' => $arr['name'],
					'type' => $arr['type'],
					'val' => str_replace('\\','',filter_var_array($val))
				);
			}else{
				$final_arr[] = array(
					'name' => $arr['name'],
					'type' => $arr['type'],
					'val' => filter_var(str_replace('\\','',$val),FILTER_SANITIZE_STRING)
				);
			}
			
		}
	}

	return json_encode($final_arr, JSON_UNESCAPED_UNICODE);
}

function get_files_html_from_array($htmlfile_array){

	$html = '';
	if( $htmlfile_array && !empty($htmlfile_array)  ){

		$htmlfile_array = objectToArray($htmlfile_array);

		$exists_key = [];
		foreach ( $htmlfile_array as $html_value ) {
			if( !in_array( $html_value['name'], $exists_key ) ){
				$exists_key[] = $html_value['name'];
				$html .= '<div id="file_'.$html_value['name'].'" style="display:none;">' .$html_value['val'] . '</div>';
			}
		}
	}

    return $html;
}
?>
