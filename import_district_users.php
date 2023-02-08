<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include(__DIR__ . '/wp-load.php');


function createDistrictUser(){
    global $wpdb;

    $records = $wpdb->get_results( "SELECT * FROM " . CITY_TBL ." WHERE countries_id='4'" );

    foreach ($records as $value) {
        
        $city      = strtolower(str_replace(' ','',$value->city));
        $un        = $city;
        $pass      = $city."@prompt";
        $email     = $city."@prompt.com";
        $city_id   = $value->id;
        $state_id  = $value->states_id;

        $user      = get_users(array(
            'meta_key'      => 'state',
            'meta_value'    => $state_id
        ));

        foreach ($user as $value) {
            $uid   = $value->ID;
        }

        $is_exists = get_user_by( 'login', $un );

        $user_id    = 0;

        if( $is_exists && !empty($is_exists) && isset($is_exists->ID) && $is_exists->ID > 0 ){
            $user_id = $is_exists->ID;
        } else {
            $create_user = wp_create_user( $un, $pass, $email );

            if( !is_wp_error( $create_user ) ){
                $user_id = $create_user;
            }
        }

        if( !empty($user_id) && $user_id > 0 ){
            update_user_meta( $user_id, 'state', $state_id );
            update_user_meta( $user_id, 'city', $city_id );

            if($uid){
                update_user_meta( $user_id, 'parent_id', $uid );
            }
            
            $user   = new WP_User($user_id);
            $user->set_role( DISTICT_USER );
        }

        //die();
    }
    
}
createDistrictUser();

function checkDistrictUser(){
    global $wpdb;

    $city_user = [];

    $records = $wpdb->get_results( "SELECT * FROM " . CITY_TBL ." WHERE countries_id='4'" );

    foreach ($records as $value) {
        
        $city      = strtolower(str_replace(' ','',$value->city));
        $un        = $city;
        $pass      = $city."@prompt";
        $email     = $city."@prompt.com";
        $city_id   = $value->id;
        $state_id  = $value->states_id;

        $meta_user_id = 0;

        $meta_query = "SELECT * FROM `".$wpdb->usermeta."` WHERE meta_key='city' AND meta_value='".esc_sql( $city_id )."' ORDER BY `umeta_id` DESC";

        $meta = $wpdb->get_row( $meta_query );

        if ( !empty( $meta ) && is_object( $meta ) ) {
            $meta_user_id = $meta->user_id;
        }

        $city_user[$city_id] = $meta_user_id;
        //die();
    }

    echo count($city_user);
    pre($city_user);
    die();
}

//checkDistrictUser();
?>