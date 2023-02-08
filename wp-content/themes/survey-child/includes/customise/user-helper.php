<?php
defined( 'ABSPATH' ) || exit;

function get_current_user_roles(){
	$user_id 					= get_current_user_id();

	return get_user_roles($user_id);
}

function get_current_user_state_id(){
    $user_id                    = get_current_user_id();
    return get_user_state_id($user_id);
}

function get_current_user_state(){
    $user_id                    = get_current_user_id();

    return get_user_state($user_id);
}

function get_current_user_city_id(){
    $user_id                    = get_current_user_id();
    return get_user_city_id($user_id);
}

function get_current_user_city(){
    $user_id                    = get_current_user_id();

    return get_user_city($user_id);
}

function get_user_roles($user_id){
	$user_meta 					= get_userdata( $user_id );
	
	return $user_meta->roles;
}

function get_user_state_id($user_id){
    return get_user_meta($user_id, 'state', true);
}

function get_user_city_id($user_id){
    return get_user_meta($user_id, 'city', true);
}

function is_access_form( $form = '' ){
    
    if( !is_user_logged_in() ){
        wp_redirect(get_site_url());
        die();
    }

    $c_roles                    = get_current_user_roles();

    $redirect_to                = get_site_url();
    if( in_array(STATE_USER, $c_roles) && $form != STATE_FORM_NAME ){
        $redirect_to            = get_the_permalink(STATE_FORM);

        wp_redirect($redirect_to);
        die();
    } else if( in_array(DISTICT_USER, $c_roles) && $form != DISTICT_FORM_NAME ){
        $redirect_to            = get_the_permalink(DISTRICT_FORM);

        wp_redirect($redirect_to);
        die();
    }
}

function get_user_state($user_id){
    global $wpdb;

    $user_state_id              = get_user_meta($user_id, 'state', true);

    $state                      = $wpdb->get_row("SELECT * FROM " .STATE_TBL. " WHERE id = '" . $user_state_id . "'");

    if( isset($state) && !empty($state) ){
        return $state->state;
    }
    
    return "";
}

function get_user_city($user_id, $key = 'city'){
    global $wpdb;

    $user_city_id               = get_user_meta($user_id, 'city', true);

    $city                       = $wpdb->get_row("SELECT * FROM " .CITY_TBL. " WHERE id = '" . $user_city_id . "'");

    if( isset($city) && !empty($city) ){
        return $city->$key;
    }
    
    return "";
}

function get_state_by_id($state_id, $key = 'state'){
    global $wpdb;

    $state                      = $wpdb->get_row("SELECT * FROM " .STATE_TBL. " WHERE id = '" . $state_id . "'");

    if( isset($state) && !empty($state) ){
        return $state->$key;
    }
    
    return "";
}

function get_city_by_id($city_id, $key = 'city'){
    global $wpdb;

    $city                       = $wpdb->get_row("SELECT * FROM " .CITY_TBL. " WHERE id = '" . $city_id . "'");

    if( isset($city) && !empty($city) ){
        return $city->$key;
    }
    
    return "";
}

function get_parent_user_id_by_state($state_id){
	$args 						= array(
		'role' 					=> 'state_role',
	    'meta_query' 			=> array(

	        'relation' 			=> 'AND', // Could be OR, default is AND

            array(
                'key'     		=> 'state',
                'value'   		=> $state_id,
                 'compare' 		=> '='
            ),
            array(
                'key'     		=> 'city',
                'value'   		=> '0',
                 'compare' 		=> '='
            )
	    )
	);
	 
	$user_query = new WP_User_Query( $args );

	$getusers = $user_query->get_results();

	if ( ! empty($getusers) && isset($getusers[0]) ) {
	    return $getusers[0]->ID;
	}

	return 0;
}

function get_role_name_by_slug( $slug ){
	global $wp_roles;

	$role_name 			= "";
	$role_name 			= translate_user_role($wp_roles->roles[$slug]['name']);

	return $role_name;
}

function get_states($country_id = 4){
	global $wpdb;

	return $wpdb->get_results("SELECT * FROM " .STATE_TBL. " WHERE countries_id = '" . $country_id . "'", ARRAY_A);
}

function get_cities($state_id){
	global $wpdb;

	return $wpdb->get_results("SELECT * FROM " .CITY_TBL. " WHERE states_id = '" . $state_id . "'", ARRAY_A);
}

function get_state_by_city($city_id){
	global $wpdb;

	$state = $wpdb->get_row("SELECT states_id FROM " .CITY_TBL. " WHERE id = '" . $city_id . "'");

	if( $state && !empty($state) ){
		return $state->states_id;
	}

	return 0;
}

function get_state_field($user_state_id = ''){
	$state_field = '';
	
	$state_field .= '<tr>';
        $state_field .= '<th>';
            $state_field .= '<label for="state">' . __( 'State', DOMAIN_NAME ) . '</label>';
        $state_field .= '</th>';
        $state_field .= '<td>';
            $state_field .= '<select name="state" id="state">';
            	$state_field .= '<option value="">Select State</option>';
            	
            	$states = get_states();
            	if( $states && !empty($states) ){
            		foreach ($states as $state) {
            			$state_field .= '<option value="' . $state['id'] . '" '. selected($state['id'], $user_state_id, false) .'>' . $state['state'] . '</option>';
            		}
            	}
            	
            $state_field .= '</select>';
        $state_field .= '</td>';
    $state_field .= '</tr>';

    return $state_field;
}

function get_city_field($state_id = '', $user_city_id = ''){
	$city_field = '';
	
	$city_field .= '<tr>';
        $city_field .= '<th>';
            $city_field .= '<label for="city">' . __( 'City', DOMAIN_NAME ) . '</label>';
        $city_field .= '</th>';
        $city_field .= '<td>';
            $city_field .= '<select name="city" id="city">';
            	$city_field .= '<option value="">Select City</option>';

            	if( !empty($state_id) ){
            		$cities = get_cities($state_id);
                	if( $cities && !empty($cities) ){
                		foreach ($cities as $city) {
                			$city_field .= '<option value="' . $city['id'] . '" '. selected($city['id'], $user_city_id, false) .'>' . $city['city'] . '</option>';
                		}
                	}	
            	}
            	
            $city_field .= '</select>';
        $city_field .= '</td>';
    $city_field .= '</tr>';

    return $city_field;
}

function get_state_postal_code_by_user_id($user_id){
    global $wpdb;

    $state_id               = get_user_state_id($user_id);

    $state_tbl_row          = $wpdb->get_row("SELECT * FROM ".STATE_TBL." WHERE id = '" . $state_id . "'", ARRAY_A);

    if( $state_tbl_row && !empty($state_tbl_row) ){
        return $state_tbl_row['postal_code'];
    }
}

function get_state_properties_by_postal_code($postal_code, $key = ''){
    global $wpdb;

    if( empty($postal_code) ){
        return "";
    }

    $map_json               = file_get_contents( get_theme_file_uri('/includes/lib/map-india.json') );
    $map_json_arr           = json_decode($map_json, true);
    $map_json_arr           = $map_json_arr['features'];

    //$map_json_arrkey        = array_search($postal_code, array_column($map_json_arr, 'hc-a2'));
    $map_json_arrkey        = search_through_array($postal_code, $map_json_arr);

    if( $map_json_arrkey !== false ){
        if( !empty($key) ){
            //return $map_json_arrkey;
            return isset($map_json_arrkey[0]['properties'][$key]) ? $map_json_arrkey[0]['properties'][$key] : '';
        } else {
            return isset($map_json_arrkey[0]['properties']) ? $map_json_arrkey[0]['properties'] : [];
        }
    }
}