<?php
defined( 'ABSPATH' ) || exit;
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

global $wpdb;

$is_logged = false;
if ( is_user_logged_in() ) {
	$is_logged = true;
}

theme_define( 'THEME_AJAX_URL', admin_url('admin-ajax.php') );

theme_define( 'IS_LOGGED', $is_logged );

$expire  = time() + 10 * DAY_IN_SECONDS;
theme_define( 'COOKIE_EXPIRE', $expire );

$secure = ( 'https' === parse_url( wp_login_url(), PHP_URL_SCHEME ) );
theme_define( 'COOKIE_SECURE', $secure );

theme_define( 'DOMAIN_NAME', 'survey-child' );
theme_define( 'THEME_VERSION', time() );



// Role related
// Default
theme_define( 'ADMIN', "administrator" );
theme_define( 'AUTHOR', "author" );
theme_define( 'CONTRIBUTOR', "contributor" );
theme_define( 'EDITOR', "editor" );
theme_define( 'SUBSCRIBER', "subscriber" );

// Custom
theme_define( 'STATE_SUPER_USER', "state_super_admin" );
theme_define( 'STATE_USER', "state_role" );
theme_define( 'DISTICT_USER', "district_role" );


//Form slug
theme_define( 'STATE_FORM_NAME', "state" );
theme_define( 'DISTICT_FORM_NAME', "district" );


//Default Post Status
theme_define( 'POST_DRAFT', "draft" );
theme_define( 'POST_PENDING', "pending" );
theme_define( 'POST_PUBLISH', "publish" );


//Tables
theme_define( 'COUNTRY_TBL', $wpdb->prefix . "countries" );
theme_define( 'STATE_TBL', $wpdb->prefix . "states" );
theme_define( 'CITY_TBL', $wpdb->prefix . "cities" );
theme_define( 'PCV_TBL', $wpdb->prefix . "pcv" );
theme_define( 'PCV_DISTRICT_TBL', $wpdb->prefix . "pcv_district" );
theme_define( 'USER_TBL', $wpdb->prefix . "users" );
theme_define( 'USERMETA_TBL', $wpdb->prefix . "usermeta" );
theme_define( 'NEX_FORM_ENTRY_TBL', $wpdb->prefix . "wap_nex_forms_entries" );
theme_define( 'NEX_FORM_TEMP_ENTRY_TBL', $wpdb->prefix . "wap_nex_forms_temp_entries" );


//Forms
theme_define( 'STATE_FORM_ID', get_field('state_checklist_form_id', 'option') );
theme_define( 'DISTRICT_FORM_ID', get_field('district_checklist_form_id', 'option') );

//Pages
theme_define( 'HOMEPAGE', get_option( 'page_on_front' ) );

theme_define( 'STATE_FORM', get_field('state_checklist_page', 'option') );
theme_define( 'EDIT_STATE_FORM', get_field('state_checklist_edit_page', 'option') );
theme_define( 'VIEW_STATE_FORM', get_field('state_checklist_view_page', 'option') );
theme_define( 'PDF_STATE_FORM', get_field('state_checklist_pdf_page', 'option') );

theme_define( 'DISTRICT_FORM', get_field('district_checklist_page', 'option') );
theme_define( 'EDIT_DISTRICT_FORM', get_field('district_checklist_edit_page', 'option') );
theme_define( 'VIEW_DISTRICT_FORM', get_field('district_checklist_view_page', 'option') );
theme_define( 'PDF_DISTRICT_FORM', get_field('district_checklist_pdf_page', 'option') );

theme_define( 'ADMIN_MY_ACCOUNT_PAGE_ID',  get_field('admin_dashboard_page', 'option') );
theme_define( 'STATE_ADMIN_MY_ACCOUNT_PAGE_ID',  get_field('state_dashboard_page', 'option') );
theme_define( 'STATE_MY_ACCOUNT_PAGE_ID',  get_field('state_dashboard_page', 'option') );
theme_define( 'DISTRICT_MY_ACCOUNT_PAGE_ID',  get_field('district_dashboard_page', 'option') );

theme_define( 'ADMIN_MY_ACCOUNT_PAGE', get_the_permalink(ADMIN_MY_ACCOUNT_PAGE_ID) );
theme_define( 'STATE_ADMIN_MY_ACCOUNT_PAGE', get_the_permalink(STATE_ADMIN_MY_ACCOUNT_PAGE_ID) );
theme_define( 'STATE_MY_ACCOUNT_PAGE', get_the_permalink(STATE_MY_ACCOUNT_PAGE_ID) );
theme_define( 'DISTRICT_MY_ACCOUNT_PAGE', get_the_permalink(DISTRICT_MY_ACCOUNT_PAGE_ID) );

theme_define( 'BACKGROUND_INFORMATION_PID', get_field('background_information_page', 'option') );
theme_define( 'COLD_CHAIN_VACCINE_LOGISTIC_PID', get_field('cold_chain_and_vaccine_logistics_page', 'option') );
theme_define( 'PROGRAM_REVIEW_SUPERVISION_PID', get_field('program_review_supervision_page', 'option') );
theme_define( 'DISEASE_SURVEILLANCE_PID', get_field('disease_surveillance_page', 'option') );

$my_account_pages = array(
    ADMIN_MY_ACCOUNT_PAGE_ID,
    STATE_ADMIN_MY_ACCOUNT_PAGE_ID,
    STATE_MY_ACCOUNT_PAGE_ID,
    DISTRICT_MY_ACCOUNT_PAGE_ID,
    BACKGROUND_INFORMATION_PID,
    COLD_CHAIN_VACCINE_LOGISTIC_PID,
    PROGRAM_REVIEW_SUPERVISION_PID,
    DISEASE_SURVEILLANCE_PID
);
?>