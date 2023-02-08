<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include(__DIR__ . '/wp-load.php');


function createStateUser(){
    global $wpdb;

    $records = $wpdb->get_results( "SELECT * FROM " . STATE_TBL ." WHERE countries_id='4' ORDER BY id ASC LIMIT 14, 30" );

    //print_r($records);
    foreach ($records as $value) {
        $state     = strtolower(str_replace(' ','',$value->state));
        $un        = $state;
        $pass      = $state."@prompt";
        $email     = $state."@prompt.com";
        $state_id  = $value->id;

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
            update_user_meta( $user_id, 'city', 0 );
            update_user_meta( $user_id, 'parent_id', 0 );

            $user               = new WP_User($user_id);
            $user->set_role( STATE_USER );
        }
        //die();
    }
}

createStateUser();
?>