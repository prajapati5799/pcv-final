<?php
if( isset($_POST['state_csv_download']) )
{
	$username 				= isset($_REQUEST['username']) ? sanitize_text_field($_REQUEST['username']) : "";
	$fstate 				= isset($_REQUEST['fstate']) ? sanitize_text_field($_REQUEST['fstate']) : "";

	$dst_sub_from 			= (isset($_REQUEST['dst_sub_from']) && !empty($_REQUEST['dst_sub_from'])) ? theme_change_date_format( sanitize_text_field($_REQUEST['dst_sub_from']), "d/m/Y", "Y-m-d" ) : "";
	
	$dst_sub_to 			= (isset($_REQUEST['dst_sub_to']) && !empty($_REQUEST['dst_sub_to'])) ? theme_change_date_format( sanitize_text_field($_REQUEST['dst_sub_to']), "d/m/Y", "Y-m-d" ) : "";

	$final_sub_from 		= (isset($_REQUEST['final_sub_from']) && !empty($_REQUEST['final_sub_from'])) ? theme_change_date_format( sanitize_text_field($_REQUEST['final_sub_from']), "d/m/Y", "Y-m-d" ) : "";
	$final_sub_to 			= (isset($_REQUEST['final_sub_to']) && !empty($_REQUEST['final_sub_to'])) ? theme_change_date_format( sanitize_text_field($_REQUEST['final_sub_to']), "d/m/Y", "Y-m-d" ) : "";
	

	global $wpdb; 

	$csv_value_data = "";
	$fp = fopen('php://output', 'w');

	$stateFields 	= get_state_form_fields();

	
	$usermeta_query = '';

	if( !empty($fstate) ){

		$usermeta_query = ' (u1.meta_key = "state" AND u1.meta_value > "0" ) ';

		$state = $wpdb->get_row("SELECT id FROM " .STATE_TBL. " WHERE `state` LIKE '%" . $fstate . "%'");

		if( $state && !empty($state) ){
			$usermeta_query = ' (u1.meta_key = "state" AND u1.meta_value = "' . $state->id . '" ) ';
		}
	}

	if( !empty($username) ){
		if( !empty($usermeta_query) ){
			$usermeta_query .= " AND (u.user_login LIKE '%" . $username . "%') ";	
		} else {
			$usermeta_query .= " (u.user_login LIKE '%" . $username . "%') ";
		}
	}

	if( empty($usermeta_query) ){
		$usermeta_query = ' (u1.meta_key = "state" AND u1.meta_value > "0" ) ';
	}

	$usermeta_query .= ' AND (u2.meta_key = "city" AND u2.meta_value = "0" ) ';

	$user_pre_sql    = $wpdb->prepare('SELECT DISTINCT ID FROM '. USER_TBL . ' as u LEFT JOIN '. USERMETA_TBL . ' as u1 ON u1.user_id = u.ID LEFT JOIN '. USERMETA_TBL . ' as u2 ON u2.user_id = u.ID WHERE ' . $usermeta_query . ' ORDER BY Id DESC');
	
	$users          = $wpdb->get_results($user_pre_sql, ARRAY_A);
	$user_ids       = [];
    if( $users && !empty($users) ){
        foreach ( $users as $u_key => $u_id ) {
            $user_ids[] = $u_id['ID'];
        }
    }

	if($user_ids) {

		$i = 1;

		$dst_submission_query = '';

		if( !empty($dst_sub_from) && !empty($dst_sub_to) ){
			$dst_submission_query = ' AND ( created_at >= CAST("' . $dst_sub_from . '" AS DATE) AND created_at <= CAST("' . $dst_sub_to . '" AS DATE) ) ';
		} else if( !empty($dst_sub_from) && empty($dst_sub_to) ){
			$dst_submission_query = ' AND ( created_at >= CAST("' . $dst_sub_from . '" AS DATE) ) ';
		} else if( empty($dst_sub_from) && !empty($dst_sub_to) ){
			$dst_submission_query = ' AND ( created_at <= CAST("' . $dst_sub_to . '" AS DATE) ) ';
		}


		$final_dst_submission_query = '';

		if( !empty($final_sub_from) && !empty($final_sub_to) ){
			$final_dst_submission_query = ' AND ( updated_at >= CAST("' . $final_sub_from . '" AS DATE) AND updated_at <= CAST("' . $final_sub_to . '" AS DATE) ) ';
		} else if( !empty($final_sub_from) && empty($final_sub_to) ){
			$final_dst_submission_query = ' AND ( updated_at >= CAST("' . $final_sub_from . '" AS DATE) ) ';
		} else if( empty($final_sub_from) && !empty($final_sub_to) ){
			$final_dst_submission_query = ' AND ( updated_at <= CAST("' . $final_sub_to . '" AS DATE) ) ';
		}


	    $query = 'SELECT user_id,nex_form_id,record_id,form_data,files_data,is_published,created_at,updated_at FROM '.NEX_FORM_TEMP_ENTRY_TBL.' WHERE user_id IN (' . implode(",", $user_ids) . ') AND nex_form_id > "0" AND is_published = "1" ' . $dst_submission_query . $final_dst_submission_query . ' ORDER BY Id DESC';

	    $pre_sql    = $wpdb->prepare( $query );
	    $results    = $wpdb->get_results($pre_sql, ARRAY_A);

	    $csv_key_value_k = $stateFields;
	    $csv_key_value_v = $stateFields;
	    

	    if( $results && !empty($results) ){

			array_walk($csv_key_value_v, function(&$a, $b) { 
				$a = ""; 
			});

	    	foreach ($csv_key_value_k as $key => &$value) {
	    		$value = str_replace(',', '', $value);
	    	}

	    	$csv_value_data .= "State,".implode(',', $csv_key_value_k)."\n";

	    	foreach ($results as $result) {

	        	$form_values = json_decode($result['form_data']);

	        	if(!empty($form_values)){

	        		$csv_current_key = "";
	        		$csv_current_value = get_user_state($result['user_id']).",";

	        		foreach ($form_values as $data) {

						if (strpos($data->name, 'real_val__') !== false) {
							continue;
						}

						if ( empty($data->name) || $data->name == "math_result" || $data->name == "user_id" ) {
							continue;
						}


						// Values
	        			$field_value = $data->val;

	        			if( isset($data->type) && ($data->type == "radio" || $data->type == "checkbox") ){

	        				$found_key = array_search('real_val__' . $data->name, array_column( $form_values, 'name'));
							if( $found_key ){
								$field_value = $form_values[$found_key]->val;
							} 
							// else {
							// 	$field_value = "";
							// }
	        			}

						$field_value = formate_values($field_value);

						if(isset($csv_key_value_v[$data->name])) {
							$csv_key_value_v[$data->name] = $field_value;
						}
					}

					$csv_value_data .= get_user_state($result['user_id']).",".implode(',', $csv_key_value_v);
					$csv_value_data .= "  \n";
	        	}
			}
	    }
	}

	$file = "state";
	$filename = $file."_".date("Y-m-d_H-i",time());

	header("Content-type: application/vnd.ms-excel");
	header("Content-disposition: csv" . date("Y-m-d") . ".csv");
	header( "Content-disposition: filename=".$filename.".csv");

	print $csv_value_data;
	exit;
}
?>