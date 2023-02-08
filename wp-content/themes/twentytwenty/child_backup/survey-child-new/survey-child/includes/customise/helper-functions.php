<?php
defined( 'ABSPATH' ) || exit;

function pre( $arr = [] ){
    echo '<pre>';
    print_r( $arr );
    echo '</pre>';
}

function theme_define( $name, $value ) {
    if ( ! defined( $name ) ) {

        if( is_array( $value ) )
            $value = serialize( $value );
        
        define( $name, $value );
    }
}

// write_log('Testing');
if (!function_exists('write_log')) {

    function write_log($log) {
        if (true === WP_DEBUG) {
            if (is_array($log) || is_object($log)) {
                @error_log(print_r($log, true));
            } else {
                @error_log($log);
            }
        }
    }

}

function theme_string_replace( $mail_content = "", $tokens = array(), $patterns = '' ){
    $pattern = '##%s##';

    if( !empty( $patterns ) && $patterns == 'p' ){
        $pattern = '%%s%';
    }
    
    $map = array();

    foreach( $tokens as $var_key => $actual_value ){
        $map[ sprintf( $pattern, $var_key ) ] = $actual_value;
    }

    $mail_message = strtr( $mail_content, $map );

    return $mail_message;
}

function theme_sanitize_username( $email ) {
    $username = $email;

    $parts = explode( "@", $email );
    if ( count( $parts ) == 2 ) {
        $username = $parts[0];
    }

    return $username;
}

function theme_character_limit( $string, $limit = 150, $ext = '...' ){
    $new_string = strip_tags( $string );

    if( strlen( strip_tags( $string ) ) > $limit ){
        $new_string = substr( strip_tags( $string ), 0, $limit ) . $ext;
    }else{
        $new_string = strip_tags( $string );
    }
    return $new_string;
}

function theme_update_user_meta( $user_id, $arr = [] ){

    if( !empty( $arr ) && count( $arr ) > 0 ){

        foreach( $arr as $user_key => $user_value ) {
            update_user_meta( $user_id, $user_key, $user_value );
        }
    }
}

function theme_search_from_array( $array, $key, $value ) {
   foreach ( $array as $arr_key => $arr_val ) {
       if ( $arr_val[$key] === $value) {
           return $arr_key;
       }
   }
   return null;
}

function theme_get_post_id_by_meta_key_value( $meta_key, $meta_value ){
    global $wpdb;

    $meta_post_id = 0;

    $meta_query = "SELECT * FROM `".$wpdb->postmeta."` WHERE meta_key='" . $meta_key . "' AND meta_value='".esc_sql( $meta_value )."' ORDER BY `meta_id` DESC";

    $meta = $wpdb->get_row( $meta_query );

    if ( !empty( $meta ) && is_object( $meta ) ) {
        $meta_post_id = $meta->post_id;
    }

    return $meta_post_id;
}

function get_taxonomy_img_url( $term_id ){
    $url = "";

    if (function_exists('z_taxonomy_image_url')) {
        $url = z_taxonomy_image_url( $term_id );
    }

    return $url;
}

function theme_upload_file( $uploaded_file ) {
    
    // required
    //require_once( ABSPATH . "/wp-load.php" ); // WP should already be loaded
    require_once( ABSPATH . "/wp-admin/includes/media.php" ); // video functions
    require_once( ABSPATH . "/wp-admin/includes/file.php" );
    require_once( ABSPATH . "/wp-admin/includes/image.php" );
     
     
    // required for wp_handle_upload() to upload the file
    $upload_overrides = array( 'test_form' => false );
    
    
    // upload
    $file = wp_handle_upload( $uploaded_file, $upload_overrides );
    
    
    // bail ealry if upload failed
    if( isset($file['error']) ) {
        
        return $file['error'];
        
    }
    
    
    // vars
    $url = $file['url'];
    $type = $file['type'];
    $file = $file['file'];
    $filename = basename($file);
    

    // Construct the object array
    $object = array(
        'post_title' => $filename,
        'post_mime_type' => $type,
        'guid' => $url
    );

    // Save the data
    $id = wp_insert_attachment($object, $file);

    // Add the meta-data
    wp_update_attachment_metadata( $id, wp_generate_attachment_metadata( $id, $file ) );
    
    /** This action is documented in wp-admin/custom-header.php */
    do_action( 'wp_create_file_in_uploads', $file, $id ); // For replication
    
    // return new ID
    return $id;
    
}

function theme_get_media_url_by_id( $media_id, $size = [] ) {
    $media_arr = wp_get_attachment_image_src( $media_id, $size );
    return isset( $media_arr[0] ) ? $media_arr[0] : "";
}

function theme_script_redirect( $url ){
    return $redirect = '<script>window.location = "' . $url . '";</script>';
}

function theme_mask_password( $text, $length_unmasked = 0 ) {
    $length = strlen( $text );
    $length_unmasked = absint( $length_unmasked );

    if ( 0 == $length_unmasked ) {
        if ( 9 < $length ) {
            $length_unmasked = 7;
        } elseif ( 3 < $length ) {
            $length_unmasked = 5;
        } else {
            $length_unmasked = $length;
        }
    }

    $text = substr( $text, 0 - $length_unmasked );
    $text = str_pad( $text, $length, '*', STR_PAD_LEFT );
    return $text;
}

function theme_mask_phone( $text = '', $length_masked = 0 ) {

    if( empty( $text ) )
        return "";
    
    if( $length_masked == 0 ){
        $length_masked = 4;
    }

    $make_masked_string = substr( $text, 3, 4 );

    $replace_string = "";
    for ( $s = 0; $s < strlen( $make_masked_string ); $s++ ) { 
        $replace_string .= "*";
    }

    $masked_string = str_replace( $make_masked_string, $replace_string, $text );

    return $masked_string;
}

function get_full_url()
{
    // get $_SERVER
    $request = new ThemeRequest();
    $server = $request->get('SERVER');
    
    // Check protocol
    $page_url = 'http';
    if(isset($server['HTTPS']) and $server['HTTPS'] == 'on') $page_url .= 's';
    
    // Get domain
    $site_domain = (isset($server['HTTP_HOST']) and trim($server['HTTP_HOST']) != '') ? $server['HTTP_HOST'] : $server['SERVER_NAME'];
    
    $page_url .= '://';
    $page_url .= $site_domain.$server['REQUEST_URI'];
    
    // Return full URL
    return $page_url;
}

function remove_qs_var($key, $url = '')
{
    if(trim($url) == '') $url = get_full_url();
    
    $url = preg_replace('/(.*)(\?|&)'.$key.'=[^&]+?(&)(.*)/i', '$1$2$4', $url .'&');
    $url = substr($url, 0, -1);
    
    return $url;
}

function add_qs_var($key, $value, $url = '')
{
    if(trim($url) == '') $url = get_full_url();
    
    $url = preg_replace('/(.*)(\?|&)'.$key.'=[^&]+?(&)(.*)/i', '$1$2$4', $url.'&');
    $url = substr($url, 0, -1);
    
    if(strpos($url, '?') === false)
        return $url.'?'.$key.'='.$value;
    else
        return $url.'&'.$key.'='.$value;
}

function add_qs_vars($vars, $url = '')
{
    if(trim($url) == '') $url = get_full_url();
    
    foreach($vars as $key=>$value) $url = add_qs_var($key, $value, $url);
    return $url;
}

function get_domain($url = NULL)
{
    // Get current URL
    if(is_null($url)) $url = get_full_url();
    
    $url = str_replace('http://', '', $url);
    $url = str_replace('https://', '', $url);
    $url = str_replace('ftp://', '', $url);
    $url = str_replace('svn://', '', $url);
    $url = str_replace('www.', '', $url);
    
    $ex = explode('/', $url);
    $ex2 = explode('?', $ex[0]);
    
    return $ex2[0];
}

function get_latlong_from_address( $address ){

    $return                 = [];
    $return['code']         = 0;
    $return['lat']          = 0;
    $return['long']         = 0;
    $return['msg']          = '';

    $address                = urlencode( $address );

    $google_url             = "https://maps.googleapis.com/maps/api/geocode/json?address=".$address.'&key='.MAP_API;
    $data_science_kit_url   = 'http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address='.$address;


    // Get Latitide and Longitude by First URL
    $JSON = wp_remote_retrieve_body(
        wp_remote_get(
            $google_url, 
            array(
                'body' => null,
                'timeout' => '10',
                'redirection' => '10',
            )
        )
    );

    $data = json_decode( $JSON, true );
    
    $location_point = isset( $data['results'][0] ) ? $data['results'][0]['geometry']['location'] : array();
    if( (isset($location_point['lat']) and $location_point['lat']) and (isset($location_point['lng']) and $location_point['lng']) ){
        $return['code'] = 1;
        $return['lat'] = $location_point['lat'];
        $return['long'] = $location_point['lng'];

        return $return;
    } else {
        $return['msg'] = "Google API : " . isset( $data['error_message'] ) && !empty( $data['error_message'] ) ? $data['error_message'] : "";
    }


    $JSON = wp_remote_retrieve_body(
        wp_remote_get(
            $data_science_kit_url, 
            array(
                'body' => null,
                'timeout' => '10',
                'redirection' => '10',
            )
        )
    );

    $data = json_decode( $JSON, true );

    $location_point = isset( $data['results'][0] ) ? $data['results'][0]['geometry']['location'] : array();
    if( (isset($location_point['lat']) and $location_point['lat']) and (isset($location_point['lng']) and $location_point['lng']) ){
        $return['code'] = 1;
        $return['lat'] = $location_point['lat'];
        $return['long'] = $location_point['lng'];
    }

    return $return;
}

function theme_generate_random_string($length = 20) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function theme_date_diff( $start_date, $end_date ){

    $start_date = new DateTime( $start_date );
    $end_date   = new DateTime( $end_date );
    $Interval = $start_date->diff( $end_date );

    return $Interval;
}

function theme_change_date_format( $date, $old_formate = 'j M Y', $new_formate = 'Y-m-d' ){
    //$date = DateTime::createFromFormat('D M d H:i:s T Y', 'Wed Dec 12 15:10:12 +0000 2018');

    if( empty($date) ){
        return "";
    }
    
    $date = DateTime::createFromFormat( $old_formate, $date );
    return $date->format( $new_formate );
}

function theme_time_ago( $timestamp ){
  
    //date_default_timezone_set("Asia/Kolkata");         
    $time_ago        = strtotime( $timestamp );
    $current_time    = time();
    $time_difference = $current_time - $time_ago;
    $seconds         = $time_difference;

    $minutes = round($seconds / 60); // value 60 is seconds  
    $hours   = round($seconds / 3600); //value 3600 is 60 minutes * 60 sec  
    $days    = round($seconds / 86400); //86400 = 24 * 60 * 60;  
    $weeks   = round($seconds / 604800); // 7*24*60*60;  
    $months  = round($seconds / 2629440); //((365+365+365+365+366)/5/12)*24*60*60  
    $years   = round($seconds / 31553280); //(365+365+365+365+366)/5 * 24 * 60 * 60

    if ($seconds <= 60){
        return "Just Now";
    } else if ($minutes <= 60){
        
        if ($minutes == 1){
            return "one minute ago";
        } else {
            return "$minutes minutes ago";
        }

    } else if ($hours <= 24){
        
        if ($hours == 1){
            return "an hour ago";
        } else {
            return "$hours hrs ago";
        }

    } else if ($days <= 7){

        if ($days == 1){
            return "yesterday";
        } else {
            return "$days days ago";
        }

    } else if ($weeks <= 4.3){

        if ($weeks == 1){
            return "a week ago";
        } else {
            return "$weeks weeks ago";
        }

    } else if ($months <= 12){

        if ($months == 1){
            return "a month ago";
        } else {
            return "$months months ago";
        }

    } else {

        if ($years == 1){
            return "one year ago";
        } else {
            return "$years years ago";
        }
    }
}

/*Plugins related functions*/
if ( is_plugin_active( 'contact-form-7/wp-contact-form-7.php' ) ) {
    function get_site_secret_key_from_cf7(){
        $keys = [];
        $sitekey = $secret = '';

        $arr_keys = WPCF7::get_option( 'recaptcha' );

        if( !empty( $arr_keys ) ){
            $sitekeys = array_keys( $arr_keys );
            $sitekey = $sitekeys[0];

            $sitekeys_arr = (array) $arr_keys;

            if ( isset( $sitekeys_arr[$sitekey] ) ) {
                $secret = $sitekeys_arr[$sitekey];
            }
        }

        $keys['sitekey'] = $sitekey;
        $keys['secret'] = $secret;

        return $keys;
    }
}

function get_ip_address(){
    $ipaddress = '';

    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';

    return $ipaddress;
}

function get_user_agent(){
    return $_SERVER['HTTP_USER_AGENT'];
}

function theme_simple_crypt( $string, $action = 'e' ) {
    $secret_key = 'QWERTYUIOPPOIUYTREWQ';
    $secret_iv = 'ASDFGHJKLLKJHGFDSAAS';
    $output = false;
    $encrypt_method = "AES-256-CBC";
    $key = hash( 'sha256', $secret_key );
    $iv = substr( hash( 'sha256', $secret_iv ), 0, 16 );
 
    if( $action == 'e' ) {
        $output = base64_encode( openssl_encrypt( $string, $encrypt_method, $key, 0, $iv ) );
    }
    else if( $action == 'd' ){
        $output = openssl_decrypt( base64_decode( $string ), $encrypt_method, $key, 0, $iv );
    }
 
    return $output;
}

function is_ajax(){
    return (defined('DOING_AJAX') && DOING_AJAX);
}

function objectToArray($object) { 
    if(!is_object( $object ) && !is_array( $object ))
    { 
        return $object; 
    } 
    if(is_object($object) ) 
    { 
        $object = get_object_vars( $object ); 
    } 
    return array_map('objectToArray', $object ); 
}

function formate_labels($field_label = '') { 
    $field_label1 = str_replace(',', '-', $field_label);
	$data_name = str_replace(', ', '-', $field_label1);

    return $data_name;
}

function formate_values($field_value = '') { 
    $field_value = objectToArray($field_value);

    if(is_array($field_value)){
        $field_value = @implode("|", $field_value);
    }

    $field_value1 = str_replace(',', '|', $field_value);
    $field_value2 = str_replace(', ', '|', $field_value1);
    $field_value3 = str_replace("[BREAK]", " ", $field_value2);
    $field_value4 = str_replace("'", "", $field_value3);
    $field_value4 = str_replace("&#39;", "", $field_value3);
    $return_field_value = trim($field_value4);

    return $return_field_value;
}

function unsubmit_nex_forms(){
	global $wpdb;

    $record_id                          = isset($_REQUEST['record_id']) ? $_REQUEST['record_id'] : 0;
    $user_id                            = isset($_REQUEST['user_id']) ? $_REQUEST['user_id'] : 0;
    $action                             = isset($_REQUEST['action']) ? $_REQUEST['action'] : "";
    $_nonce                             = isset($_REQUEST['_nonce']) ? $_REQUEST['_nonce'] : "";

    if( is_admin() && $action == "unsubmit" && !empty($record_id) && !empty($user_id) ){

        if( !wp_verify_nonce($_nonce, 'checklist-unsubmit') ){
            echo "Nonce verification is failed";
            die();
        }
        
        //Set status as 0
        $updates_query 				= "UPDATE " . NEX_FORM_TEMP_ENTRY_TBL . " SET is_published = '0', state_status = '0', record_id = '0', updated_at = '".date("Y-m-d H:i:s")."' WHERE record_id = '".$record_id."' AND user_id = '" . $user_id . "'";
		$wpdb->query($updates_query);

        // Delete entry from master tbl
        $wpdb->query("DELETE FROM " . NEX_FORM_ENTRY_TBL . " WHERE Id = '".$record_id."' AND user_Id = '" . $user_id . "'");

        $request_url                    = get_full_url();

        $new_request_url                = remove_qs_var( 'record_id', $request_url );
        $new_request_url                = remove_qs_var( 'user_id', $new_request_url );
        $new_request_url                = remove_qs_var( 'action', $new_request_url );
        $new_request_url                = remove_qs_var( '_nonce', $new_request_url );

        wp_redirect($new_request_url);
        die();
    }
}
add_action('init', 'unsubmit_nex_forms');

function calculate_percentage( $total, $val ){
    $return_val = '0';

    $return_val = ( $val * 100 ) / $total;
    $return_val = number_format((float)$return_val, 2, '.', '');

    return floatval($return_val);
}

function find_through_array( $search_key, $lists ){
    $return_val = '';

    $lists = objectToArray($lists);

    if ( !is_array($lists) ) return $return_val;

    foreach ( $lists as $key => $item ) {
        if ($item['name'] == $search_key) {
            $return_val = $item['val'];
        } elseif ( is_array($item['name']) ) {
            $return_val = find_through_array($search_key, $item['name']);
        }
    }
    return $return_val;
}

function search_through_array( $search, array $lists ){
    try{
        foreach ($lists as $key => $value) {
            if( is_array($value) ){
                array_walk_recursive( $value, function($v, $k) use($search ,$key, $value, &$val){
                    //if(strpos($v, $search) !== false )  $val[$key]=$value;
                    if($v == $search)  $val[$key]=$value;
                });
            } else {
                //if(strpos($value, $search) !== false )  $val[$key]=$value;
                if($value == $search)  $val[$key]=$value;
            }

        }
        return array_values($val);

    } catch (Exception $e) {
        return false;
    }
}

function sort_array( array $lists, $key = 'name', $sort = SORT_ASC, $sort_by = SORT_STRING ){
    $array = objectToArray($lists);

    array_multisort( array_column( $array, $key ), $sort, $sort_by, $array );

    return $array;
}

function get_all_states_arr(){
    global $wpdb;

    $state_response = [];

    $allStateQuery      = 'SELECT * FROM '. STATE_TBL . ' ORDER BY state ASC';
    $allStates          = $wpdb->get_results($allStateQuery, ARRAY_A);

    if( $allStates && !empty($allStates) ){
        foreach( $allStates as $state_arr ){
            $state_response[] = [
                'id'                => $state_arr['id'],
                'state'             => $state_arr['state'],
                'value'             => $state_arr['state'],
                'postal_code'       => $state_arr['postal_code'],
            ];
        }
    }

    return $state_response;
}

function get_state_name_from_postal_code($postal_code, $return_key = 'state'){
    $sur_states = get_all_states_arr();

    $search_arr = search_through_array($postal_code, $sur_states);
    return isset($search_arr[0][$return_key]) ? $search_arr[0][$return_key] : '';
}

function get_coming_soon_template(){
    $coming_soon = '<div class="dashborad-date-search">';
        $coming_soon .= '<div class="dd-row">';
            
            $coming_soon .= '<div class="dd-item">';
                $coming_soon .= '<div class="date-boxes">';
                    $coming_soon .= '<div class="date-col">';
                        $coming_soon .= 'Coming Soon';
                    $coming_soon .= '</div>';
                $coming_soon .= '</div>';
            $coming_soon .= '</div>';

        $coming_soon .= '</div>';
    $coming_soon .= '</div>';

    return $coming_soon;
}

function get_dashboard_pie_chart_settings(){
    return array(
        "labels" => array(
            "Draft",
            "Submitted",
            // "Pending",
            // "Under Review",
            // "Reviewed by State and Submitted"
        ),
        "backgroundColor" => array(
            "rgba(226,149,120,0.3)",
            "rgba(139,195,74,0.3)",
            // "rgba(245,124,0,0.3)",
            // "rgba(131,197,190,0.3)",
            // "rgba(25,118,210,0.3)"
        ),
        "hoverBackgroundColor" => array(
            "#e29578",
            "#8BC34A",
            // "#F57C00",
            // "#83c5be",
            // "#1976D2"
        ),
        "borderColor" => array(
            "#fff",
            "#fff",
            // "#fff",
            // "#fff",
            // "#fff"
        )
    );
}

function get_chunk_map_array($min, $max, $chunks = 4){
    $step = 1;
    if( strlen($max) == 4 ){
        $step = 100;
    } else if( strlen($max) == 5 ){
        $step = 1000;
    } else if( strlen($max) == 6 ){
        $step = 10000;
    } else if( strlen($max) == 7 ){
        $step = 100000;
    } else if( strlen($max) == 8 ){
        $step = 100000;
    }

    $range_number = range( $min, $max, $step);
    //$range_number = range( $min, $max );

    $whole_elements=count($range_number);
    $group1 = round($whole_elements / $chunks);

    $chunks_array = array_chunk($range_number, $group1);

    if( count($chunks_array) < $chunks ){
        //$max = $max + 1;
        $max = $max + $step;
        return get_chunk_map_array($min, $max, $chunks);
    }

    return $chunks_array;
}

function split_min_max_values($min, $max, $parts = 4) {
    // $dataCollection[] = $min;
    // $diff = ($max - $min) / $parts;
    // $convert = $min + $diff;

    // for ($i = 1; $i < $parts; $i++) {
    //     $dataCollection[] = (strpos($convert, '.') !== false) ? number_format((float)$convert, 2, '.', '') : $convert;
    //     $convert += $diff;
    // }
    // $dataCollection[] = $max;
    
    // return $dataCollection;

    $diff = ($max - $min) / $parts;
    $minmum = $min + $diff;

    $dataCollection[] = $minmum;

    for ($i = 1; $i < $parts; $i++) {
        $dataCollection[] = $minmum + $diff;
        $minmum = $minmum + $diff;
    }

    return $dataCollection;
}

function get_profile_export_csv_btn() {
    return '<button class="export_button" name="export_csv_profile" id="export_csv_profile">Export CSV</button>';
}

function get_request_analytics_array() {
    $report_theme                   = isset($_REQUEST['report_theme']) ? $_REQUEST['report_theme'] : "";
    $report_indicator               = isset($_REQUEST['report_indicator']) ? $_REQUEST['report_indicator'] : "";
    $report_state                   = isset($_REQUEST['report_state']) ? $_REQUEST['report_state'] : "all";
    $report_year                    = isset($_REQUEST['report_year']) ? $_REQUEST['report_year'] : "";
    $cold_chain_district            = isset($_REQUEST['cold_chain_district']) ? $_REQUEST['cold_chain_district'] : 0;
    $export_type                    = isset($_REQUEST['export_type']) ? $_REQUEST['export_type'] : "";

    $state_arr                      = get_states();

    $district_arr                   = [];
    if( $report_state != "all" ){
        $district_arr               = get_cities($report_state);
    }

    $request_arr                    = [
        'report_theme'              => $report_theme,
        'report_indicator'          => $report_indicator,
        'report_state'              => $report_state,
        'report_year'               => $report_year,
        'cold_chain_district'       => $cold_chain_district,
        'export_type'               => $export_type,
        'state_arr'                 => $state_arr,
        'district_arr'              => $district_arr,
    ];

    return $request_arr;
}

function download_analytic_csv_file(){
    $request_arr                    = get_request_analytics_array();

    $export_type                    = $request_arr['export_type'];
    $report_state                   = $request_arr['report_state'];


    if( !empty($export_type) ){
        $state_profile_data             = get_state_profile_table($request_arr, true);

        $file_name                      = "analytic-profile-" . current_time('timestamp') . ".csv";
        $fp                             = fopen('php://output', 'w');

        if( $report_state == "all" ){
            $csv_header                 = implode(',', array_values($state_profile_data['label']))."\n";
            $csv_value_data             = implode(',', array_values($state_profile_data['value']));
        } else {
            $csv_header                 = "State,".implode(',', array_values($state_profile_data['label']))."\n";
            $csv_value_data             = get_state_by_id($report_state).",".implode(',', array_values($state_profile_data['value']));
        }

        $analytic_csv                   = fopen('php://output', 'w');

        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $file_name . '"');
        header('Pragma: no-cache');
        header('Expires: 0');
        print $csv_header;
        print $csv_value_data;
        die;
    }
}
add_action('init', 'download_analytic_csv_file');

function get_ranges_for_charts($request_arr, $data){

    $data_key               = $request_arr['report_indicator'];
    $is_percentage          = $request_arr['is_percentage'];

    $title_postfix          = "";
    if( $is_percentage ){
        $title_postfix      = "%";
    }

    if( 
        $data_key == "bi__3_2__pd1_hims" || 
        $data_key == "bi__3_2__pd3_hmis" || 
        $data_key == "bi__3_2__pd3_nfhs" || 
        $data_key == "bi__3_2__mr1_hmis" || 
        $data_key == "bi__3_2__mr1_nfhs"
    ){
        $range1_title       = "<50" . $title_postfix;
        $range2_title       = "50-70" . $title_postfix;
        $range3_title       = "70-90" . $title_postfix;
        $range4_title       = ">=90" . $title_postfix;

        $range1_val         = 50;
        $range2_val         = 70;
        $range3_val         = 90;
        $range4_val         = 90;

    } else if( 
        $data_key == "bi__3_3__drop_p1" || 
        $data_key == "bi__3_3__drop_mr1"
    ){
        $range1_title       = "<5" . $title_postfix;
        $range2_title       = "5-10" . $title_postfix;
        $range3_title       = "10-20" . $title_postfix;
        $range4_title       = ">=20" . $title_postfix;

        $range1_val         = 5;
        $range2_val         = 10;
        $range3_val         = 20;
        $range4_val         = 20;

    } else if( 
        $data_key == "bi__4_3__sessions_planned"
    ){
        $range1_title       = "<85" . $title_postfix;
        $range2_title       = "85-90" . $title_postfix;
        $range3_title       = "90-95" . $title_postfix;
        $range4_title       = ">95" . $title_postfix;

        $range1_val         = 85;
        $range2_val         = 90;
        $range3_val         = 95;
        $range4_val         = 95;

    } else if( 
        $data_key == "ccvl__16_1__cold_chain_points"
    ){
        $range1_title       = "<1" . $title_postfix;
        $range2_title       = "1-2" . $title_postfix;
        $range3_title       = "2-3" . $title_postfix;
        $range4_title       = ">=3" . $title_postfix;

        $range1_val         = 1;
        $range2_val         = 2;
        $range3_val         = 3;
        $range4_val         = 3;

    } else if( 
        $data_key == "ccvl__16_2__cold_chain_handlers"
    ){
        $range1_title       = "<0.5" . $title_postfix;
        $range2_title       = "0.5-1" . $title_postfix;
        $range3_title       = "1-2" . $title_postfix;
        $range4_title       = ">=2" . $title_postfix;

        $range1_val         = 0.5;
        $range2_val         = 1;
        $range3_val         = 2;
        $range4_val         = 2;

    } else if( 
        $data_key == "ccvl__16_3__evin"
    ){
        $range1_title       = "<90" . $title_postfix;
        $range2_title       = "90-95" . $title_postfix;
        $range3_title       = "95-100" . $title_postfix;
        $range4_title       = ">100" . $title_postfix;

        $range1_val         = 90;
        $range2_val         = 95;
        $range3_val         = 100;
        $range4_val         = 100;

    } else if( 
        $data_key == "ccvl__16_4__ccp_evin"
    ){
        $range1_title       = "<90" . $title_postfix;
        $range2_title       = "90-95" . $title_postfix;
        $range3_title       = "95-100" . $title_postfix;
        $range4_title       = ">100" . $title_postfix;

        $range1_val         = 90;
        $range2_val         = 95;
        $range3_val         = 100;
        $range4_val         = 100;

    } else if( 
        $data_key == "ds__15_1__reported_any_case" || 
        $data_key == "ds__15_2__afp_cases" || 
        $data_key == "ds__15_3__reported_outbreaks"
    ){
        $range1_title       = "<5" . $title_postfix;
        $range2_title       = "5-10" . $title_postfix;
        $range3_title       = "10-20" . $title_postfix;
        $range4_title       = ">=20" . $title_postfix;

        $range1_val         = 5;
        $range2_val         = 10;
        $range3_val         = 20;
        $range4_val         = 20;

    } else {

        $numbers            = array_column($data, 'val');

        $min = floor(min($numbers));
        if( $min == "-0" ){
            $min = 0;
        }

        $max = ceil(max($numbers));
        if( $max == "-0" ){
            $max = 0;
        }

        $split_min_max      = split_min_max_values($min, $max);

        $range1_val         = isset($split_min_max[0]) ? $split_min_max[0] : 25;
        $range2_val         = isset($split_min_max[1]) ? $split_min_max[1] : 50;
        $range3_val         = isset($split_min_max[2]) ? $split_min_max[2] : 75;
        $range4_val         = isset($split_min_max[3]) ? $split_min_max[3] : 75;

        $range1_title       = "<" . $range1_val . $title_postfix;
        $range2_title       = $range1_val . "-" . $range2_val . $title_postfix;
        $range3_title       = $range2_val . "-" . $range3_val . $title_postfix;
        $range4_title       = ">" . $range3_val . $title_postfix;
    }

    $group1_data = array_filter($data, function ($value) use ($range1_val) {
        return ($value["val"] < $range1_val);
    });
    
    $group2_data = array_filter($data, function ($value) use ($range1_val, $range2_val) {
        return ($value["val"] >= $range1_val && $value["val"] <= $range2_val);
    });

    if( 
        $data_key == "bi__3_2__pd1_hims" || 
        $data_key == "bi__3_2__pd3_hmis" || 
        $data_key == "bi__3_2__pd3_nfhs" || 
        $data_key == "bi__3_2__mr1_hmis" || 
        $data_key == "bi__3_2__mr1_nfhs" || 
        $data_key == "bi__3_3__drop_p1" || 
        $data_key == "bi__3_3__drop_mr1" || 
        $data_key == "ccvl__16_2__cold_chain_handlers" || 
        $data_key == "ccvl__16_1__cold_chain_points"
    ){
    
        $group3_data = array_filter($data, function ($value) use ($range2_val, $range3_val) {
            return ($value["val"] > $range2_val && $value["val"] < $range3_val);
        });
        
        $group4_data = array_filter($data, function ($value) use ($range3_val, $range4_val) {
            return ($value["val"] >= $range3_val);
        });
    } else {
    
        $group3_data = array_filter($data, function ($value) use ($range2_val, $range3_val) {
            return ($value["val"] > $range2_val && $value["val"] <= $range3_val);
        });
        
        $group4_data = array_filter($data, function ($value) use ($range3_val, $range4_val) {
            return ($value["val"] > $range3_val);
        });
        
    }

    $group1_final_data = [];
    if($group1_data && !empty($group1_data)){
        foreach($group1_data as $group1_key => $group1_row){
            $group1_final_data[$group1_key] = [$group1_row['name'], $group1_row['val']];
        }
    }

    $group2_final_data = [];
    if($group2_data && !empty($group2_data)){
        foreach($group2_data as $group2_key => $group2_row){
            $group2_final_data[$group2_key] = [$group2_row['name'], $group2_row['val']];
        }
    }

    $group3_final_data = [];
    if($group3_data && !empty($group3_data)){
        foreach($group3_data as $group3_key => $group3_row){
            $group3_final_data[$group3_key] = [$group3_row['name'], $group3_row['val']];
        }
    }

    $group4_final_data = [];
    if($group4_data && !empty($group4_data)){
        foreach($group4_data as $group4_key => $group4_row){
            $group4_final_data[$group4_key] = [$group4_row['name'], $group4_row['val']];
        }
    }

    return array(
        'range1_title' => $range1_title,
        'range2_title' => $range2_title,
        'range3_title' => $range3_title,
        'range4_title' => $range4_title,

        'group1_data' => $group1_data,
        'group2_data' => $group2_data,
        'group3_data' => $group3_data,
        'group4_data' => $group4_data,

        'range1_data' => $group1_final_data,
        'range2_data' => $group2_final_data,
        'range3_data' => $group3_final_data,
        'range4_data' => $group4_final_data,
    );
}

function get_all_indicators(){
    return array(
        'bi' => array(
            // array(
            //     "name" => "Penta-1/DPT-1- (%) Coverage- HMIS 2019-20",
            //     "val" => "bi__3_2__pd1_hims"
            // ),
            // array(
            //     "name" => "Penta-1/DPT-1 Evaluated-NFHS4/NFHS5",
            //     "val" => "bi__3_2__pd1_nfhs"
            // ),
            // array(
            //     "name" => "Penta-1/DPT-1 Concurrent monitoring-2019-20",
            //     "val" => "bi__3_2__pd1_monitoring"
            // ),
            array(
                "name" => "Penta-3/DPT-3- (%) Coverage- HMIS 2019-20",
                "val" => "bi__3_2__pd3_hmis"
            ),
            array(
                "name" => "Penta-3/DPT-3 Evaluated-NFHS4/NFHS5",
                "val" => "bi__3_2__pd3_nfhs"
            ),
            // array(
            //     "name" => "Penta-3/DPT-3 Concurrent monitoring-2019-20",
            //     "val" => "bi__3_2__pd3_monitoring"
            // ),
            array(
                "name" => "MR-1- (%) Coverage- HMIS 2019-20",
                "val" => "bi__3_2__mr1_hmis"
            ),
            array(
                "name" => "MR-1 Evaluated-NFHS4/NFHS5",
                "val" => "bi__3_2__mr1_nfhs"
            ),
            // array(
            //     "name" => "MR-1 Concurrent monitoring-2019-20",
            //     "val" => "bi__3_2__mr1_monitoring"
            // ),
            array(
                "name" => "State drop out rate reported-HMIS for Penta-1 to Penta -3",
                "val" => "bi__3_3__drop_p1"
            ),
            array(
                "name" => "State drop out rate reported-HMIS for Penta-3 to MR 1",
                "val" => "bi__3_3__drop_mr1"
            ),
            // array(
            //     "name" => "% of districts that have submitted updated RI micro-plans to state/UT for 2020-21",
            //     "val" => "bi__4_1__micro_plan"
            // ),
            array(
                "name" => "% of sessions planned/Held-HMIS 2019-20",
                "val" => "bi__4_3__sessions_planned"
            ),
            // array(
            //     "name" => "% of DIOs that have not undergone orientation on immunization during 2019-20",
            //     "val" => "bi__6_2__immunization"
            // ),
            // array(
            //     "name" => "Vaccine wastage for Penta",
            //     "val" => "bi__8_1__vaccine_wastage"
            // )
        ),
        'ccvl' => array(
            // array(
            //     "name" => "% of vaccine van functional in state",
            //     "val" => "ccvl__9_2_1__vaccine_van"
            // ),
            // array(
            //     "name" => "% of vaccine van functional in district",
            //     "val" => "ccvl__9_2_2__vaccine_van"
            // ),
            // array(
            //     "name" => "Total no. of cold chain points in the state",
            //     "val" => "ccvl__16_1__cold_chain_points"
            // ),
            array(
                "name" => "Total no. of cold chain handlers per cold chain point in the state?",
                "val" => "ccvl__16_2__cold_chain_handlers"
            ),
            array(
                "name" => "% of districts with eVIN functional?",
                "val" => "ccvl__16_3__evin"
            ),
            array(
                "name" => "% of CCP with eVIN functional",
                "val" => "ccvl__16_4__ccp_evin"
            ),
            // array(
            //     "name" => "Cold chain sickness rate at the state level as per NCCMIS during field",
            //     "val" => "ccvl__16_8__ccs_nccmis"
            // ),
            array(
                "name" => "Details of cold chain space available",
                "val" => "ccvl__16_6__cold_chain_space_available"
            )
        ),
        'prs' => array(
            array(
                "name" => "Number of STFI meetings conducted in",
                "val" => "prs__11_4__stfi_meetings"
            ),
            array(
                "name" => "No. of state/UT-level immunization review meetings held with DIOs",
                "val" => "prs__11_7__meetings_held"
            ),
            array(
                "name" => "No of review meetings with cold chain handlers",
                "val" => "prs__11_10__meetings_cold_chain"
            ),
            array(
                "name" => "How many AEFI committee meetings held",
                "val" => "prs__12_4__aefi_committee_meetings"
            )
        ),
        'ds' => array(
            array(
                "name" => "% of districts that have not reported any case of diphtheria, tetanus or pertussis",
                "val" => "ds__15_1__reported_any_case"
            ),
            array(
                "name" => "% of silent districts from where no AFP cases have been reported",
                "val" => "ds__15_2__afp_cases"
            ),
            array(
                "name" => "% of districts reported Measles/Rubella/Mixed outbreaks",
                "val" => "ds__15_3__reported_outbreaks"
            )
        )
    );
}

function get_indicators_by_key($key){
    return get_all_indicators()[$key];
}

function get_indicators_dropdown_by_key($key){
    $indicator_arr = get_indicators_by_key($key);

    $dropdown = '<option value="">Select Indicator</option>';
    if( $indicator_arr && !empty($indicator_arr) ){
        foreach($indicator_arr as $indicator){
            $dropdown .= '<option value="' . $indicator['val'] . '" data-label="' . $indicator['name'] . '">' . $indicator['name'] . '</option>';
        }
    }

    return $dropdown;
}

function get_all_years_list(){
    return array(
        'bi__8_1__vaccine_wastage' => array(
            array(
                "name" => "2018-19",
                "val" => "2018-19"
            ),
            array(
                "name" => "2019-20",
                "val" => "2019-20"
            )
        ),
        'prs__11_4__stfi_meetings' => array(
            array(
                "name" => "2019-20",
                "val" => "2019-20"
            ),
            array(
                "name" => "2020-21",
                "val" => "2020-21"
            )
        ),
        'prs__11_7__meetings_held' => array(
            array(
                "name" => "2019-20",
                "val" => "2019-20"
            ),
            array(
                "name" => "2020-21",
                "val" => "2020-21"
            )
        ),
        'prs__11_10__meetings_cold_chain' => array(
            array(
                "name" => "2019-20",
                "val" => "2019-20"
            ),
            array(
                "name" => "2020-21",
                "val" => "2020-21"
            )
        ),
        'prs__12_4__aefi_committee_meetings' => array(
            array(
                "name" => "2019-20",
                "val" => "2019-20"
            ),
            array(
                "name" => "2020-21",
                "val" => "2020-21"
            )
        ),
        'ds__15_1__reported_any_case' => array(
            array(
                "name" => "2019-20",
                "val" => "2019-20"
            ),
            array(
                "name" => "2020-21",
                "val" => "2020-21"
            )
        ),
        'ds__15_2__afp_cases' => array(
            array(
                "name" => "2019-20",
                "val" => "2019-20"
            ),
            array(
                "name" => "2020-21",
                "val" => "2020-21"
            )
        ),
        'ds__15_3__reported_outbreaks' => array(
            array(
                "name" => "2019-20",
                "val" => "2019-20"
            ),
            array(
                "name" => "2020-21",
                "val" => "2020-21"
            )
        ),
    );
}

function get_years_by_key($key){
    return get_all_years_list()[$key];
}

function get_years_dropdown_by_key($key){
    $years_arr = get_years_by_key($key);

    $dropdown_year = '';
    if( $years_arr && !empty($years_arr) ){
        foreach($years_arr as $year){
            $dropdown_year .= '<option value="' . $year['val'] . '" data-label="' . $year['name'] . '">' . $year['name'] . '</option>';
        }
    }

    return $dropdown_year;
}

function get_report_state_dropdown($is_disabled = false){
    $state_html = '';

    $allStates = get_all_states_arr();
    if( $allStates ):
        foreach ( $allStates as $st ) {

            if( $is_disabled && in_array($st['postal_code'], get_new_states()) ){
                $state_html .= '<option value="'.$st['id'].'" data-label="'.$st['value'].'" disabled="disabled">'.$st['state'].'</option>';
            } else {
                $state_html .= '<option value="'.$st['id'].'" data-label="'.$st['value'].'">'.$st['state'].'</option>';
            }
            
        }
    endif;

    return $state_html;
}

function get_indicator_title_for_state($request_arr){

    $data_key               = $request_arr['report_indicator'];
    $report_year            = $request_arr['report_year'];

    $title1                 = "";
    $title2                 = "";

    $data_key1              = "";
    $data_key2              = "";

    if( 
        $data_key == "bi__8_1__vaccine_wastage" || 
        $data_key == "ds__15_1__reported_any_case" ||
        $data_key == "ds__15_2__afp_cases" ||
        $data_key == "ds__15_3__reported_outbreaks"
    ){

        if( empty($report_year) ){
            $report_year            = "2019-20";
            if( $data_key == "bi__8_1__vaccine_wastage" ){
                $report_year        = "2018-19";
            }
        }

        $data_key1              = $data_key . '_' . str_replace( "-", "_", $report_year );

    } else if( 
        $data_key == "prs__11_4__stfi_meetings" || 
        $data_key == "prs__11_7__meetings_held" || 
        $data_key == "prs__11_10__meetings_cold_chain" || 
        $data_key == "prs__12_4__aefi_committee_meetings"
    ){
        $data_key1              = $data_key . '_' . str_replace( "-", "_", "2019-20" );
        $data_key2              = $data_key . '_' . str_replace( "-", "_", "2020-21" );
    } else {
        $data_key1              = $data_key;
    }

    $state_indicator_titles     = array(
        "bi__3_2__pd1_hims" => "State Penta-1/DPT-1- (%) Coverage- HMIS 2019-20",
        //"bi__3_2__pd1_nfhs" => "Penta-1/DPT-1 Evaluated-NFHS4/NFHS5",
        //"bi__3_2__pd1_monitoring" => "Penta-1/DPT-1 Concurrent monitoring-2019-20",
        "bi__3_2__pd3_hmis" => "State Penta-3/DPT-3- (%) Coverage- HMIS 2019-20",
        "bi__3_2__pd3_nfhs" => "State Penta-3/DPT-3 Evaluated-NFHS4/NFHS5",
        //"bi__3_2__pd3_monitoring" => "Penta-3/DPT-3 Concurrent monitoring-2019-20",
        "bi__3_2__mr1_hmis" => "State MR-1- (%) Coverage- HMIS 2019-20",
        "bi__3_2__mr1_nfhs" => "State MR-1 Evaluated-NFHS4/NFHS5",
        //"bi__3_2__mr1_monitoring" => "MR-1 Concurrent monitoring-2019-20",
        "bi__3_3__drop_p1" => "State drop out rate reported-HMIS for Penta-1 to Penta -3",
        "bi__3_3__drop_mr1" => "State drop out rate reported-HMIS for Penta-3 to MR 1",
        "bi__4_1__micro_plan" => "% of districts that have submitted updated RI micro-plans to state/UT for 2020-21",
        "bi__4_3__sessions_planned" => "% of sessions planned/Held-HMIS 2019-20 at state level",
        //"bi__6_2__immunization" => "% of DIOs that have not undergone orientation on immunization during 2019-20",
        "bi__8_1__vaccine_wastage_2018_19" => "Vaccine wastage for Penta 2018-19 (State)",
        "bi__8_1__vaccine_wastage_2019_20" => "Vaccine wastage for Penta 2019-20 (State)",
        "ccvl__9_2_1__vaccine_van" => "% of vaccine van functional in state",
        "ccvl__9_2_2__vaccine_van" => "% of vaccine van functional in district",
        "ccvl__16_1__cold_chain_points" => "Total no. of cold chain points per 30,000 population in the state",
        "ccvl__16_2__cold_chain_handlers" => "Total no. of cold chain handlers per cold chain point in state",
        "ccvl__16_3__evin" => "% of districts with eVIN functional?",
        "ccvl__16_4__ccp_evin" => "% of CCP with eVIN functional",
        "ccvl__16_8__ccs_nccmis" => "Cold chain sickness rate at the state level as per NCCMIS during field",
        "ccvl__16_6__cold_chain_space_available" => "Details of cold chain space available",
        "prs__11_4__stfi_meetings_2019_20" => "Number of STFI meetings conducted 2019-20",
        "prs__11_4__stfi_meetings_2020_21" => "Number of STFI meetings conducted 2020-21",
        "prs__11_7__meetings_held_2019_20" => "No. of state/UT-level immunization review meetings held with DIOs 2019-20",
        "prs__11_7__meetings_held_2020_21" => "No. of state/UT-level immunization review meetings held with DIOs 2020-21",
        "prs__11_10__meetings_cold_chain_2019_20" => "No of review meetings with cold chain handlers 2019-20",
        "prs__11_10__meetings_cold_chain_2020_21" => "No of review meetings with cold chain handlers 2020-21",
        "prs__12_4__aefi_committee_meetings_2019_20" => "How many state/UT AEFI committee meetings were held 2019-20",
        "prs__12_4__aefi_committee_meetings_2020_21" => "How many state/UT AEFI committee meetings were held 2020-21",
        "ds__15_1__reported_any_case_2019_20" => "% of districts that have not reported any case of diphtheria, tetanus or pertussis 2019-20",
        "ds__15_1__reported_any_case_2020_21" => "% of districts that have not reported any case of diphtheria, tetanus or pertussis 2020-21",
        "ds__15_2__afp_cases_2019_20" => "% of silent districts from where no AFP cases have been reported 2019-20",
        "ds__15_2__afp_cases_2020_21" => "% of silent districts from where no AFP cases have been reported 2020-21",
        "ds__15_3__reported_outbreaks_2019_20" => "% of districts reported Measles/Rubella/Mixed outbreaks 2019-20",
        "ds__15_3__reported_outbreaks_2020_21" => "% of districts reported Measles/Rubella/Mixed outbreaks 2020-21",
    );

    $title1                     = isset($state_indicator_titles[$data_key1]) ? $state_indicator_titles[$data_key1] : "";
    $title2                     = isset($state_indicator_titles[$data_key2]) ? $state_indicator_titles[$data_key2] : "";

    $analytic_title             = $title1;
    if( 
        $data_key == "prs__11_4__stfi_meetings" || 
        $data_key == "prs__11_7__meetings_held" || 
        $data_key == "prs__11_10__meetings_cold_chain" || 
        $data_key == "prs__12_4__aefi_committee_meetings"
    ){
        $analytic_title         = str_replace( "2019-20", "", $title1 );
    }
    
    // if( $data_key == "prs__11_4__stfi_meetings" ){
    //     $analytic_title         = $analytic_title . " the last 6 months";
    // }

    return array(
        'analytic_title'                    => $analytic_title,
        'chart_title'                       => $title1,
        'another_chart_title'               => $title2,
    );
}

function get_indicator_title_for_district($request_arr){

    $data_key               = $request_arr['report_indicator'];
    $report_year            = $request_arr['report_year'];

    $title1                 = "";
    $title2                 = "";

    $data_key1              = "";
    $data_key2              = "";

    if( 
        $data_key == "bi__8_1__vaccine_wastage" || 
        $data_key == "ds__15_1__reported_any_case" ||
        $data_key == "ds__15_2__afp_cases" ||
        $data_key == "ds__15_3__reported_outbreaks"
    ){

        if( empty($report_year) ){
            $report_year            = "2019-20";
            if( $data_key == "bi__8_1__vaccine_wastage" ){
                $report_year        = "2018-19";
            }
        }
        
        $data_key1              = $data_key . '_' . str_replace( "-", "_", $report_year );
    } else if( 
        $data_key == "prs__11_7__meetings_held" || 
        $data_key == "prs__11_10__meetings_cold_chain" || 
        $data_key == "prs__12_4__aefi_committee_meetings"
    ){
        $data_key1              = $data_key . '_' . str_replace( "-", "_", "2019-20" );
        $data_key2              = $data_key . '_' . str_replace( "-", "_", "2020-21" );
    } else {
        $data_key1              = $data_key;
    }

    $state_indicator_titles = array(
        "bi__3_2__pd1_hims" => "District Penta-1/DPT-1- (%) Coverage- HMIS 2019-20",
        //"bi__3_2__pd1_nfhs" => "Penta-1/DPT-1 Evaluated-NFHS4/NFHS5",
        //"bi__3_2__pd1_monitoring" => "Penta-1/DPT-1 Concurrent monitoring-2019-20",
        "bi__3_2__pd3_hmis" => "District Penta-3/DPT-3- (%) Coverage- HMIS 2019-20",
        "bi__3_2__pd3_nfhs" => "District Penta-3/DPT-3 Evaluated-NFHS4/NFHS5",
        //"bi__3_2__pd3_monitoring" => "Penta-3/DPT-3 Concurrent monitoring-2019-20",
        "bi__3_2__mr1_hmis" => "District MR-1- (%) Coverage- HMIS 2019-20",
        "bi__3_2__mr1_nfhs" => "District MR-1 Evaluated-NFHS4/NFHS5",
        "bi__3_2__mr1_monitoring" => "District MR-1 Concurrent monitoring-2019-20",
        "bi__3_3__drop_p1" => "District Drop out reported- HMIS for Penta-1 to Penta -3",
        "bi__3_3__drop_mr1" => "District Drop out reported- HMIS for Penta-3 to MR 1",
        "bi__4_1__micro_plan" => "% of blocks that have submitted updated RI micro plans to the district for 2020-2021",
        "bi__4_3__sessions_planned" => "% of sessions planned/Held-HMIS 2019-20 at district level",
        //"bi__6_2__immunization" => "% of DIO/MO that have not undergone orientation on immunization during 2019-20",
        "bi__8_1__vaccine_wastage_2018_19" => "Vaccine wastage for Penta 2018-19 (District)",
        "bi__8_1__vaccine_wastage_2019_20" => "Vaccine wastage for Penta 2019-20 (District)",
        "ccvl__16_1__cold_chain_points" => "Total no. of cold chain points per 30,000 population in the district",
        "ccvl__16_2__cold_chain_handlers" => "Total no. of cold chain handlers per cold chain point in district",
        "ccvl__16_3__evin" => "% of CCPs with eVIN functional",
        "ccvl__16_4__ccp_evin" => "% of cold chain points in district with eVIN functional?",
        "ccvl__16_6__cold_chain_space_available" => "Details of cold chain space available",
        "ccvl__16_8__ccs_nccmis" => "Cold chain sickness rate at the state level as per NCCMIS during field",
        "prs__11_4__stfi_meetings" => "Number of DTFI meetings held in last 6 months (2020-21)",
        "prs__11_7__meetings_held_2019_20" => "No. of district-level immunization review meetings held with MO in‐charge 2019-20",
        "prs__11_7__meetings_held_2020_21" => "No. of district-level immunization review meetings held with MO in‐charge 2020-21",
        "prs__11_10__meetings_cold_chain_2019_20" => "No of review meetings have been held with cold chain handlers in the district 2019-20",
        "prs__11_10__meetings_cold_chain_2020_21" => "No of review meetings have been held with cold chain handlers in the district 2020-21",
        "prs__12_4__aefi_committee_meetings_2019_20" => "How many district AEFI committee meetings were held 2019-20",
        "prs__12_4__aefi_committee_meetings_2020_21" => "How many district AEFI committee meetings were held 2020-21",
        "ds__15_1__reported_any_case_2019_20" => "% of blocks  that have not reported any case of diphtheria, tetanus or pertussis 2019-20",
        "ds__15_1__reported_any_case_2020_21" => "% of blocks  that have not reported any case of diphtheria, tetanus or pertussis 2020-21",
        "ds__15_2__afp_cases_2019_20" => "% of silent blocks from where no AFP cases have been reported 2019-20",
        "ds__15_2__afp_cases_2020_21" => "% of silent blocks from where no AFP cases have been reported 2020-21",
        "ds__15_3__reported_outbreaks_2019_20" => "% of blocks which reported Measles/Rubella/Mixed cases 2019-20",
        "ds__15_3__reported_outbreaks_2020_21" => "% of blocks which reported Measles/Rubella/Mixed cases 2020-21",
    );

    $title1                     = isset($state_indicator_titles[$data_key1]) ? $state_indicator_titles[$data_key1] : "";
    $title2                     = isset($state_indicator_titles[$data_key2]) ? $state_indicator_titles[$data_key2] : "";

    $analytic_title             = $title1;
    if( 
        $data_key == "prs__11_7__meetings_held" || 
        $data_key == "prs__11_10__meetings_cold_chain" || 
        $data_key == "prs__12_4__aefi_committee_meetings"
    ){
        $analytic_title         = str_replace( "2019-20", "", $title1 );
    }

    return array(
        'analytic_title'                    => $analytic_title,
        'chart_title'                       => $title1,
        'another_chart_title'               => $title2,
    );
}

function get_range_default_title($range = 1){
    $ranges = array(
        '4' => "<25",
        '3' => "26-50",
        '2' => "51-75",
        '1' => ">76",
    );

    return $ranges[$range];
}

function get_range_default_color($range = 1){
    $ranges = array(
        '4' => "#c00000",
        '3' => "#ffc000",
        '2' => "#a9d18e",
        '1' => "#548235",
    );

    return $ranges[$range];
}

function get_h_line_range_default_color($range = 1){
    $ranges = array(
        '4' => "#c00000",
        '3' => "#ffc000",
        '2' => "#a9d18e",
        '1' => "#8ea9db",
    );

    return $ranges[$range];
}

function get_another_h_line_range_default_color($range = 1){
    $ranges = array(
        '4' => "#c00000",
        '3' => "#ffc000",
        '2' => "#a9d18e",
        '1' => "#2E75B5",
    );

    return $ranges[$range];
}

function get_state_map_range($request_arr, $data){
    $state_map_tooltip = array(
        'headerFormat' => '',
        'pointFormat' => ($request_arr['is_percentage']) ? '{point.name}: <b>{point.value}%</b>' : '{point.name}: <b>{point.value}</b>'
    );

    $default_data_arr = [];
    foreach( $request_arr['state_arr'] as $state_key => $state_val ){
        $postal_code = 'in-' . strtolower($state_val['postal_code']);
        $default_data_arr[$state_key] = [$postal_code, 0];
    }

    $default_response = array(
        'range4' => array(
            'title' => get_range_default_title(4),
            'data' => $default_data_arr
        ),
        'range3' => array(
            'title' => get_range_default_title(3),
            'data' => $default_data_arr
        ),
        'range2' => array(
            'title' => get_range_default_title(2),
            'data' => $default_data_arr
        ),
        'range1' => array(
            'title' => get_range_default_title(1),
            'data' => $default_data_arr
        ),
        'state_map_tooltip' => $state_map_tooltip,
        'min_point' => 0,
        'max_point' => 100
    );

    if( empty($data) ){
        return $default_response;
    }

    $data_key                   = $request_arr['report_indicator'];
    $calculate_per_with_sum     = $request_arr['calculate_per_with_sum'];

    if( in_array( $data_key, $calculate_per_with_sum ) ){
        
        $total_arr_sum  = array_sum(array_column($data, 'val'));
        
        $new_data       = [];
        if( $data && !empty($data) ){
            foreach($data as $modify_key => $modify_data){
                $new_data[$modify_key] = [
                    "name" => $modify_data['name'],
                    "val" => calculate_percentage($total_arr_sum, $modify_data['val']),
                    "o_val" => $modify_data['val']
                ];
            }

            $data = [];
            $data = $new_data;
        }
    }

    $results                    = get_ranges_for_charts($request_arr, $data);

    return array(
        'range4' => array(
            'title' => $results['range1_title'],
            'data' => array_values($results['range1_data'])
        ),
        'range3' => array(
            'title' => $results['range2_title'],
            'data' => array_values($results['range2_data'])
        ),
        'range2' => array(
            'title' => $results['range3_title'],
            'data' => array_values($results['range3_data'])
        ),
        'range1' => array(
            'title' => $results['range4_title'],
            'data' => array_values($results['range4_data'])
        ),
        'state_map_tooltip' => $state_map_tooltip,
        // 'min_point' => $min,
        // 'max_point' => $max,
    );

}

function get_state_horizontal_range($request_arr, $data){
    $horizontal_tooltip_pointFormat = ($request_arr['is_percentage']) ? '<b>{point.y}%</b>' : '<b>{point.y}</b>';

    $horizontal_xAxis_state_data = [];
    $default_data_arr = [];
    foreach( $request_arr['state_arr'] as $state_key => $state_val ){
        $horizontal_xAxis_state_data[$state_key] = $state_val['state'];
        $default_data_arr[$state_key] = 0;
    }

    array_multisort( $horizontal_xAxis_state_data, SORT_ASC, SORT_STRING, $horizontal_xAxis_state_data );

    $default_response = array(
        'data' => $default_data_arr,
        'horizontal_tooltip_pointFormat' => $horizontal_tooltip_pointFormat,
        'horizontal_xAxis_state_data' => $horizontal_xAxis_state_data,
        'horizontal_yAxis_min' => 0,
        'horizontal_yAxis_max' => 20
    );

    if( empty($data) ){
        return $default_response;
    }

    $data_key                   = $request_arr['report_indicator'];
    $calculate_per_with_sum     = $request_arr['calculate_per_with_sum'];

    if( in_array( $data_key, $calculate_per_with_sum ) ){
        
        $total_arr_sum  = array_sum(array_column($data, 'val'));
        
        $new_data       = [];
        if( $data && !empty($data) ){
            foreach($data as $modify_key => $modify_data){
                $new_data[$modify_key] = [
                    "name"          => $modify_data['name'],
                    "val"           => calculate_percentage($total_arr_sum, $modify_data['val']),
                    "o_val"         => $modify_data['val']
                ];
            }

            $data = [];
            $data = $new_data;
        }

    }

    // Sort by name
    //$sort_data = sort_array($data);

    // Sort by val
    $sort_data = sort_array( $data, 'val', SORT_DESC, SORT_NUMERIC );


    $final_data = array_column($sort_data, 'val');
    $horizontal_xAxis_state_data = array_column($sort_data, 'name');

    return array(
        'data' => $final_data,
        'horizontal_tooltip_pointFormat' => $horizontal_tooltip_pointFormat,
        'horizontal_xAxis_state_data' => $horizontal_xAxis_state_data,
        'horizontal_yAxis_min' => min($final_data),
        'horizontal_yAxis_max' => max($final_data)
    );

}

function get_state_bubble_range($request_arr, $data){
    $bubble_tooltip_pointFormat = ($request_arr['is_percentage']) ? '<b>{point.name}:</b>{point.x}%' : '<b>{point.name}:</b>{point.x}';
    $bubble_xAxis_min = 0;
    $bubble_yAxis_min = 0;

    $default_data_arr = [];
    foreach( $request_arr['state_arr'] as $state_key => $state_val ){
        $default_data_arr[$state_key] = [
            'x' => 0, 
            'y' => 0, 
            'z' => 0, 
            'name' => $state_val['state']
        ];
    }

    $default_response = array(
        'data' => sort_array($default_data_arr),
        'bubble_tooltip_pointFormat' => $bubble_tooltip_pointFormat,
        'bubble_xAxis_min' => $bubble_xAxis_min,
        'bubble_yAxis_min' => $bubble_yAxis_min
    );

    if( empty($data) ){
        return $default_response;
    }

    $data_key                   = $request_arr['report_indicator'];
    $calculate_per_with_sum     = $request_arr['calculate_per_with_sum'];

    if( in_array( $data_key, $calculate_per_with_sum ) ){
        
        $total_arr_sum  = array_sum(array_column($data, 'val'));
        
        $new_data       = [];
        if( $data && !empty($data) ){
            foreach($data as $modify_key => $modify_data){
                $new_data[$modify_key] = [
                    "name" => $modify_data['name'],
                    "val" => calculate_percentage($total_arr_sum, $modify_data['val']),
                    "o_val" => $modify_data['val']
                ];
            }

            $data = [];
            $data = $new_data;
        }

    }

    $sort_data = sort_array($data);

    $final_data         = [];
    if( $sort_data && !empty($sort_data) ){
        foreach($sort_data as $b_sorted){
            $final_data[] = [
                'x' => $b_sorted['val'],
                'y' => $b_sorted['val'],
                'z' => $b_sorted['val'],
                'name' => $b_sorted['name']
            ];
        }
    }

    $numbers = array_column($sort_data, 'val');
    $bubble_xAxis_min = floor(min($numbers));
    if( $bubble_xAxis_min == "-0" ){
        $bubble_xAxis_min = 0;
    }
    $bubble_yAxis_min = $bubble_xAxis_min;

    return array(
        'data' => $final_data,
        'bubble_tooltip_pointFormat' => $bubble_tooltip_pointFormat,
        'bubble_xAxis_min' => $bubble_xAxis_min,
        'bubble_yAxis_min' => $bubble_yAxis_min
    );
}

function get_district_map_range($request_arr, $data){
    $district_map_tooltip = array(
        'pointFormat' => ($request_arr['is_percentage']) ? '%' : ''
    );

    $default_data_arr = [];
    foreach( $request_arr['district_arr'] as $district_key => $district_val ){
        $postal_code = strtolower($district_val['original_city']);
        $default_data_arr[$district_key] = [$postal_code, 0];
    }

    $default_response = array(
        'range4' => array(
            'title' => get_range_default_title(4),
            'data' => $default_data_arr
        ),
        'range3' => array(
            'title' => get_range_default_title(3),
            'data' => $default_data_arr
        ),
        'range2' => array(
            'title' => get_range_default_title(2),
            'data' => $default_data_arr
        ),
        'range1' => array(
            'title' => get_range_default_title(1),
            'data' => $default_data_arr
        ),
        'district_map_tooltip' => $district_map_tooltip,
        'min_point' => 0,
        'max_point' => 100
    );

    if( empty($data) ){
        return $default_response;
    }

    $data_key                   = $request_arr['report_indicator'];
    $calculate_per_with_sum     = $request_arr['calculate_per_with_sum'];

    if( in_array( $data_key, $calculate_per_with_sum ) ){
        
        $total_arr_sum  = array_sum(array_column($data, 'val'));
        
        $new_data       = [];
        if( $data && !empty($data) ){
            foreach($data as $modify_key => $modify_data){
                $new_data[$modify_key] = [
                    "name" => $modify_data['name'],
                    "val" => calculate_percentage($total_arr_sum, $modify_data['val']),
                    "o_val" => $modify_data['val']
                ];
            }

            $data = [];
            $data = $new_data;
        }
    }

    $results                    = get_ranges_for_charts($request_arr, $data);

    return array(
        'range4' => array(
            'title' => $results['range1_title'],
            'data' => array_values($results['range1_data'])
        ),
        'range3' => array(
            'title' => $results['range2_title'],
            'data' => array_values($results['range2_data'])
        ),
        'range2' => array(
            'title' => $results['range3_title'],
            'data' => array_values($results['range3_data'])
        ),
        'range1' => array(
            'title' => $results['range4_title'],
            'data' => array_values($results['range4_data'])
        ),
        'district_map_tooltip' => $district_map_tooltip,
        'data' => $data,
        // 'min_point' => $min,
        // 'max_point' => $max,
    );
}

function get_district_horizontal_range($request_arr, $data){
    $horizontal_tooltip_pointFormat = ($request_arr['is_percentage']) ? '<b>{point.y}%</b>' : '<b>{point.y}</b>';

    $horizontal_xAxis_district_data = [];
    $default_data_arr = [];
    foreach( $request_arr['district_arr'] as $district_key => $district_val ){
        $horizontal_xAxis_district_data[$state_key] = $district_val['original_city'];
        $default_data_arr[$district_key] = 0;
    }

    array_multisort( $horizontal_xAxis_district_data, SORT_ASC, SORT_STRING, $horizontal_xAxis_district_data );

    $default_response = array(
        'data' => $default_data_arr,
        'horizontal_tooltip_pointFormat' => $horizontal_tooltip_pointFormat,
        'horizontal_xAxis_district_data' => $horizontal_xAxis_district_data,
        'horizontal_yAxis_min' => 0,
        'horizontal_yAxis_max' => 20
    );

    if( empty($data) ){
        return $default_response;
    }

    $data_key                   = $request_arr['report_indicator'];
    $calculate_per_with_sum     = $request_arr['calculate_per_with_sum'];

    if( in_array( $data_key, $calculate_per_with_sum ) ){
        
        $total_arr_sum  = array_sum(array_column($data, 'val'));
        
        $new_data       = [];
        if( $data && !empty($data) ){
            foreach($data as $modify_key => $modify_data){
                $new_data[$modify_key] = [
                    "name" => $modify_data['name'],
                    "val" => calculate_percentage($total_arr_sum, $modify_data['val']),
                    "o_val" => $modify_data['val']
                ];
            }

            $data = [];
            $data = $new_data;
        }

    }

    // Sort by name
    //$sort_data = sort_array($data);

    // Sort by val
    $sort_data = sort_array( $data, 'val', SORT_DESC, SORT_NUMERIC );


    $final_data = array_column($sort_data, 'val');
    $horizontal_xAxis_district_data = array_column($sort_data, 'name');

    return array(
        'data' => $final_data,
        'horizontal_tooltip_pointFormat' => $horizontal_tooltip_pointFormat,
        'horizontal_xAxis_district_data' => $horizontal_xAxis_district_data,
        'horizontal_yAxis_min' => min($final_data),
        'horizontal_yAxis_max' => max($final_data)
    );

}

function get_district_bubble_range($request_arr, $data){
    $bubble_tooltip_pointFormat = ($request_arr['is_percentage']) ? '<b>{point.name}:</b>{point.x}%' : '<b>{point.name}:</b>{point.x}';
    $bubble_xAxis_min = 0;
    $bubble_yAxis_min = 0;

    $default_data_arr = [];
    foreach( $request_arr['district_arr'] as $district_key => $district_val ){
        $default_data_arr[$district_key] = [
            'x' => 0, 
            'y' => 0, 
            'z' => 0, 
            'name' => $district_val['original_city']
        ];
    }

    $default_response = array(
        'data' => sort_array($default_data_arr),
        'bubble_tooltip_pointFormat' => $bubble_tooltip_pointFormat,
        'bubble_xAxis_min' => $bubble_xAxis_min,
        'bubble_yAxis_min' => $bubble_yAxis_min
    );

    if( empty($data) ){
        return $default_response;
    }

    $data_key                   = $request_arr['report_indicator'];
    $calculate_per_with_sum     = $request_arr['calculate_per_with_sum'];

    if( in_array( $data_key, $calculate_per_with_sum ) ){
        
        $total_arr_sum  = array_sum(array_column($data, 'val'));
        
        $new_data       = [];
        if( $data && !empty($data) ){
            foreach($data as $modify_key => $modify_data){
                $new_data[$modify_key] = [
                    "name" => $modify_data['name'],
                    "val" => calculate_percentage($total_arr_sum, $modify_data['val']),
                    "o_val" => $modify_data['val']
                ];
            }

            $data = [];
            $data = $new_data;
        }

    }

    $sort_data = sort_array($data);

    $final_data         = [];
    if( $sort_data && !empty($sort_data) ){
        foreach($sort_data as $b_sorted){
            $final_data[] = [
                'x' => $b_sorted['val'],
                'y' => $b_sorted['val'],
                'z' => $b_sorted['val'],
                'name' => $b_sorted['name']
            ];
        }
    }

    $numbers = array_column($sort_data, 'val');
    $bubble_xAxis_min = floor(min($numbers));
    if( $bubble_xAxis_min == "-0" ){
        $bubble_xAxis_min = 0;
    }
    $bubble_yAxis_min = $bubble_xAxis_min;

    return array(
        'data' => $final_data,
        'bubble_tooltip_pointFormat' => $bubble_tooltip_pointFormat,
        'bubble_xAxis_min' => $bubble_xAxis_min,
        'bubble_yAxis_min' => $bubble_yAxis_min
    );
}

function get_new_states(){
    return array('WB', 'TEL', 'TN', 'PB', 'PY', 'MH', 'LD', 'KL', 'KA', 'HR', 'GU', 'GA', 'DL', 'DA', 'DN', 'CH', 'AP', 'AN');
}
?>