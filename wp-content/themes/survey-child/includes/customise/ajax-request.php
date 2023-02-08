<?php
defined( 'ABSPATH' ) || exit;

class WPAjaxRequestClass
{
	Private $nopriv_nex_form_key;
    
    public function __construct(){

    	$this->nopriv_nex_form_key = 'nex_form_suyvey_data' . $_SERVER['REMOTE_ADDR'];
        
    	// Get cities from state_id
        add_action( 'wp_ajax_action_filter_city', array( $this, 'action_filter_city' ));
		add_action( 'wp_ajax_nopriv_action_filter_city', array( $this, 'action_filter_city' ));

		//  Save next form data on click of next button
		add_action( 'wp_ajax_save_nex_form_steps_data', array( $this, 'save_nex_form_steps_data' ));
		add_action( 'wp_ajax_nopriv_save_nex_form_steps_data', array( $this, 'save_nex_form_steps_data' ));

		//  Return saved next form data on click of next button
		add_action( 'wp_ajax_send_saved_nex_form_data', array( $this, 'send_saved_nex_form_data' ));
		add_action( 'wp_ajax_nopriv_send_saved_nex_form_data', array( $this, 'send_saved_nex_form_data' ));

		//  Removed saved next form data on click of next button
		add_action( 'wp_ajax_published_saved_nex_form_data', array( $this, 'published_saved_nex_form_data' ));
		add_action( 'wp_ajax_nopriv_published_saved_nex_form_data', array( $this, 'published_saved_nex_form_data' ));

		//  Send data for edit
		add_action( 'wp_ajax_send_edit_nex_form_data', array( $this, 'send_edit_nex_form_data' ));
		add_action( 'wp_ajax_nopriv_send_edit_nex_form_data', array( $this, 'send_edit_nex_form_data' ));

		//  Send data for edit
		add_action( 'wp_ajax_store_edit_nex_form_data', array( $this, 'store_edit_nex_form_data' ));
		add_action( 'wp_ajax_nopriv_store_edit_nex_form_data', array( $this, 'store_edit_nex_form_data' ));

		//  Send data for edit
		add_action( 'wp_ajax_action_upload_form_file', array( $this, 'action_upload_form_file' ));
    }

    public function action_filter_city(){
		$response                       = [];
	    $response['code']               = 0;
	    $response['data']               = '';
	    $response['msg']               	= '';

	    $state_id 						= sanitize_text_field($_REQUEST['state_id']);
	    $_nonce 						= sanitize_text_field($_REQUEST['_nonce']);

	    $city_html 						= "<option value=''>Select State</option>";

	    if ( ! wp_verify_nonce( $_nonce, 'state-nonce' ) ) {
		    $response['msg']            = __( 'Security check failed.', DOMAIN_NAME );
		} else {
		    
		    $cities 					= get_cities($state_id);

		    if( $cities && !empty($cities) ){
		    	foreach ( $cities as $city ) {
		    		$city_html 			.= '<option value="' . $city['id'] . '">' . $city['city'] . '</option>';
		    	}
		    }

		    $response['code']            = 1;
	    	$response['data']            = $city_html;
		}

	    wp_send_json( $response );
	    wp_die();
    }

    public function save_nex_form_steps_data(){
	    global $current_user;

	    $current_user 					= wp_get_current_user();

		$response                       = [];
	    $response['code']               = 0;
	    $response['data']               = '';
	    $response['msg']               	= '';

	    /*$form_data 						= json_encode($_REQUEST['data']);

	    if( $current_user && !empty($current_user) ){
	    	update_user_meta( $current_user->ID, 'nex_form_suyvey_data', $form_data );
	    } else {
	    	update_option( $this->nopriv_nex_form_key, $form_data );
	    }*/
	    $result = create_nex_form_data_temp_record($_REQUEST);

	    $response['code']            	= 1;
	    $response['data']            	= $_REQUEST['data'];
	    $response['row']            	= $result;
    	$response['msg']            	= __( 'Update successfully', DOMAIN_NAME );

	    wp_send_json( $response );
	    wp_die();
    }

    public function send_saved_nex_form_data(){
	    global $current_user;

	    $current_user 					= wp_get_current_user();

		$response                       = [];
	    $response['code']               = 0;
	    $response['data']               = [];
	    $response['msg']               	= '';
	    $response['is_reflact']         = false;

	    $form_data 						= [];

	    $get_saved_data 				= get_saved_nex_form_data();

    	$form_data 						= $get_saved_data['form_data'];

	    $data     						= [];
	    if( $form_data && !empty($form_data) ){
	    	$response['is_reflact']     = true;
	    	$data     					= $form_data;
	    }
	    

	    $response['code']            	= 1;
	    $response['data']               = $data;
	    $response['file_html_data']     = $get_saved_data['file_html_data'];
	    $response['row']            	= $_REQUEST;
    	$response['msg']            	= __( 'Send successfully', DOMAIN_NAME );

	    wp_send_json( $response );
	    wp_die();
    }

    public function published_saved_nex_form_data(){

    	create_nex_form_data_temp_record($_REQUEST, true);

	    $response['code']            	= 1;
    	$response['msg']            	= __( 'Published successfully', DOMAIN_NAME );

	    wp_send_json( $response );
	    wp_die();
    }

    public function send_edit_nex_form_data(){
	    global $current_user, $wpdb;

	    $current_user 					= wp_get_current_user();

		$response                       = [];
	    $response['code']               = 0;
	    $response['data']               = [];
	    $response['msg']               	= '';
	    $response['is_redirect']        = true;
	    $response['file_html_data']     = '';
	    $response['redirect_url']       = get_the_permalink(HOMEPAGE);

	    $form_data 						= [];

	    $nex_form_id 					= isset($_REQUEST['nex_form_id']) ? $_REQUEST['nex_form_id'] : 0;

	    if( $nex_form_id <= 0 ){
	    	$response['is_redirect']    = true;
	    	$response['msg'] 			= __( "Your requested form doesn't exists.", DOMAIN_NAME );
	    } else {
			$request_data 				= get_published_nex_form_data();
			$response['data'] 			= $request_data;
			$response['is_redirect']	= false;

			/*$c_roles        			= get_current_user_roles();
			if( in_array(STATE_USER, $c_roles) ){
				if( isset($request_data['state_status']) && $request_data['state_status'] == '2' ){
					$response['is_redirect']    = true;
					$response['data'] 			= [];
				}
			}*/
			
			$response['code'] 			= 1;
			$response['file_html_data'] = $request_data['file_html_data'];
			$response['msg'] 			= __( "Listed successfully", DOMAIN_NAME );
	    }

	    wp_send_json( $response );
	    wp_die();
    }

    public function store_edit_nex_form_data(){
	    global $current_user;

	    $current_user 					= wp_get_current_user();

		$response                       = [];
	    $response['code']               = 0;
	    $response['data']               = '';
	    $response['msg']               	= '';

	    $result 						= update_edit_nex_form_data($_REQUEST);

	    $response['code']            	= 1;
	    $response['data']            	= $_REQUEST['data'];
    	$response['msg']            	= __( 'Update successfully', DOMAIN_NAME );

	    wp_send_json( $response );
	    wp_die();
    }

    public function action_upload_form_file(){
	    global $current_user, $wpdb;

	    $current_user 					= wp_get_current_user();

		$response                       = [];
	    $response['code']               = 0;
	    $response['data']               = '';
		$response['msg']               	= '';

		$nex_form_id 					= isset($_REQUEST['nex_form_id']) ? $_REQUEST['nex_form_id'] : 0;
		$user_id 						= isset($_REQUEST['user_id']) ? $_REQUEST['user_id'] : 0;
		$temp_id 						= get_nex_form_temp_id($user_id);
		
		$files_val 						= [];
		$error 							= [];
		$file_array 					= [];
		$html 							= '';

		if( isset($_FILES) ){
			foreach( $_FILES as $key => $file ){

				$uploadedfile = $_FILES[$key];
				$upload_overrides = array( 'test_form' => false );
				$movefile = wp_handle_upload( $uploadedfile, $upload_overrides );

				if ( $movefile ){

					if($movefile['file']){

						$insert_file_array[$uploadedfile['name']] = array(
							'name' 		=> $uploadedfile['name'],
							'type' 		=> $uploadedfile['type'],
							'size' 		=> $uploadedfile['size'],
							'location' 	=> $movefile['file'],
							'url' 		=> $movefile['url'],
							'key' 		=> $key,
						);
						$file_array[] = array(
							'name' 		=> $key,
							'type' 		=> $uploadedfile['type'],
							'val' 		=> $movefile['url']
						);	
						$set_file_name = str_replace(ABSPATH,'',$movefile['file']);
						$set_file_name = str_replace(ABSPATH,'',$movefile['file']);
						$files_val[$key] = get_option('siteurl').'/'.$set_file_name;
					}

				} else {
					$error[] = "Possible file upload attack!\n".$movefile['error'];
				}

			}

			if( !empty($files_val) ){
				$pre_sql 						= $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE nex_form_id = "' . $nex_form_id . '" AND user_id = "' . $user_id . '" ORDER BY id DESC');
				$results 						= $wpdb->get_row($pre_sql);

				if( $results && !empty($results) ){

					$record_id 					= $results->record_id;

					// For files data
					$files_data 					= [];
					if( $results->files_data != "[]" && !empty($results->files_data) ){
						$files_data 				= json_decode($results->files_data, true);
					}
					
					// For form data
					$new_temp_files 			= [];
					$new_temp_files_for_file 	= [];
					$form_array 				= json_decode($results->form_data, true);

					foreach ( $files_val as $rfd_key => $rfd_value ) {
						
						// Find key from form data
						$found_key 						= false;
						$found_key 						= array_search($rfd_key, array_column($form_array, 'name'));

						if( $found_key !== false ){
							$form_array[$found_key]['val'] = $rfd_value;
						} else {
							$new_temp_files[] 			= [
								"name" 					=> $rfd_key,
								"val" 					=> $rfd_value,
								"type" 					=> 'file',
							];
						}

						// Find key from files data
						$found_file_key 				= false;
						$found_file_key 				= array_search($rfd_key, array_column($files_data, 'name'));

						if( $found_file_key !== false ){
							$files_data[$found_file_key]['val'] = $rfd_value;
						} else {
							$new_temp_files_for_file[] 			= [
								"name" 					=> $rfd_key,
								"val" 					=> $rfd_value,
								"type" 					=> 'file',
							];
						}
					}

					// Merger files data with form data
					if( !empty($new_temp_files) ){
						$form_array = array_merge($form_array, $new_temp_files);
					}

					// Merger files data with files data
					if( !empty($new_temp_files_for_file) ){
						$files_data = array_merge($files_data, $new_temp_files_for_file);
					}

					//$en_form_array = json_encode($form_array, JSON_UNESCAPED_UNICODE);
					$en_form_array 				= set_data_array($form_array);
					$files_data 				= set_data_array($files_data);

					$updates_query 				= "UPDATE " . NEX_FORM_TEMP_ENTRY_TBL . " SET form_data = '".$en_form_array."', files_data = '".$files_data."' WHERE id = '".$results->id."'";
					$wpdb->query($updates_query);

					// Update record on main tbl
					if( $record_id > 0 ){
						$pre_main_sql 						= $wpdb->prepare('SELECT * FROM '. NEX_FORM_ENTRY_TBL . ' WHERE Id = "' . $record_id . '" ORDER BY Id DESC');
						$main_results 						= $wpdb->get_row($pre_main_sql);

						if( $main_results && !empty($main_results) ){
							$main_form_array 				= json_decode($main_results->form_data, true);

							$new_files 						= [];

							foreach ( $files_val as $rfdo_key => $rfdo_value ) {
						
								$foundo_key 				= false;
								$foundo_key 				= array_search($rfdo_key, array_column($main_form_array, 'field_name'));
		
								if( $foundo_key !== false ){
									$main_form_array[$foundo_key]['field_value'] = $rfdo_value;
								} else {
									$new_files[] 				= [
										"field_name" 			=> $rfdo_key,
										"field_value" 			=> $rfdo_value
									];
								}
							}

							if( !empty($new_files) ){
								$main_form_array = array_merge($main_form_array, $new_files);
							}

							$en_main_form_array 				= set_data_array($main_form_array);

							$updates_main_query 				= "UPDATE " . NEX_FORM_ENTRY_TBL . " SET form_data = '".$en_main_form_array."' WHERE Id = '".$record_id."'";
							$wpdb->query($updates_main_query);
						}
					}
				}
			}
		}

		$pre_file_sql 					= $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE nex_form_id = "' . $nex_form_id . '" AND user_id = "' . $user_id . '" ORDER BY id DESC');
		$file_results 					= $wpdb->get_row($pre_file_sql);

		if( $file_results && !empty($file_results) ){
			$htmlfile_array 			= json_decode($file_results->files_data, true);
			$html 						.= get_files_html_from_array($htmlfile_array);
		}
		
	    $response['code']            	= 1;
		$response['msg']            	= $error;
		$response['data']            	= $files_val;
		$response['file_array']         = $file_array;
		$response['html']            	= $html;

	    wp_send_json( $response );
	    wp_die();
    }
}
new WPAjaxRequestClass();
