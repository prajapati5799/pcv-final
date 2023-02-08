<?php
defined( 'ABSPATH' ) || exit;

function get_total_state_submitted_entries(){
	global $wpdb;

	$total_count = 0;

	$get_total_sumitted_state = $wpdb->get_row("SELECT COUNT(Id) as total_sumitted_state FROM ".NEX_FORM_ENTRY_TBL." WHERE nex_forms_Id = '" . STATE_FORM_ID . "' AND publish = '1'", ARRAY_A);

	if( $get_total_sumitted_state['total_sumitted_state'] > 0 ){
		$total_count = $get_total_sumitted_state['total_sumitted_state'];
	}

	return $total_count;
}

function get_total_state_pending_entries(){
	global $wpdb;

	$total_user_count = 0;

	/*$get_total_pending_state = $wpdb->get_row("SELECT COUNT(Id) as total_pending_state FROM " .NEX_FORM_TEMP_ENTRY_TBL . " WHERE nex_form_id = '" . STATE_FORM_ID . "' AND is_published = '0' AND user_id NOT IN(SELECT sur_users.ID FROM sur_users INNER JOIN sur_usermeta ON ( sur_users.ID = sur_usermeta.user_id ) WHERE ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".ADMIN."\"%' ) AND ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".AUTHOR."\"%' ) AND ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".CONTRIBUTOR."\"%' ) AND ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".EDITOR."\"%' ) AND ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".SUBSCRIBER."\"%' ) AND ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".STATE_SUPER_USER."\"%' ) ORDER BY user_login ASC)", ARRAY_A);*/

	$get_total_pending_state = $wpdb->get_row("SELECT COUNT(ID) as total_user FROM sur_users INNER JOIN sur_usermeta ON ( sur_users.ID = sur_usermeta.user_id ) WHERE ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".STATE_USER."\"%' )", ARRAY_A);

	if( $get_total_pending_state['total_user'] > 0 ){
		$total_user_count = $get_total_pending_state['total_user'];
	}

	$total_count = $total_user_count - get_total_state_submitted_entries();

	return $total_count;
}

function get_total_district_submitted_entries(){
	global $wpdb;

	$total_count = 0;

	$get_total_sumitted_district = $wpdb->get_row("SELECT COUNT(Id) as total_sumitted_district FROM ".NEX_FORM_ENTRY_TBL." WHERE nex_forms_Id = '" . DISTRICT_FORM_ID . "' AND publish = '1'", ARRAY_A);

	if( $get_total_sumitted_district['total_sumitted_district'] > 0 ){
		$total_count = $get_total_sumitted_district['total_sumitted_district'];
	}

	return $total_count;
}

function get_total_district_draft_entries(){
	global $wpdb;

	$total_user_count = 0;

	/*$get_total_pending_district = $wpdb->get_row("SELECT COUNT(Id) as total_pending_district FROM " .NEX_FORM_TEMP_ENTRY_TBL . " WHERE nex_form_id = '" . DISTRICT_FORM_ID . "' AND is_published = '0' AND user_id NOT IN(SELECT sur_users.ID FROM sur_users INNER JOIN sur_usermeta ON ( sur_users.ID = sur_usermeta.user_id ) WHERE ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".ADMIN."\"%' ) AND ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".AUTHOR."\"%' ) AND ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".CONTRIBUTOR."\"%' ) AND ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".EDITOR."\"%' ) AND ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".SUBSCRIBER."\"%' ) AND ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".STATE_SUPER_USER."\"%' ) ORDER BY user_login ASC)", ARRAY_A);*/

	$get_total_pending_district = $wpdb->get_row("SELECT COUNT(ID) as total_user FROM sur_users INNER JOIN sur_usermeta ON ( sur_users.ID = sur_usermeta.user_id ) WHERE ( sur_usermeta.meta_key = 'sur_capabilities' AND sur_usermeta.meta_value LIKE '%\"".DISTICT_USER."\"%' )", ARRAY_A);

	if( $get_total_pending_district['total_user'] > 0 ){
		$total_user_count = $get_total_pending_district['total_user'];
	}

	$total_count = $total_user_count - get_total_district_submitted_entries();

	return $total_count;
}

function get_total_district_pending_entries(){
	global $wpdb;

	$total_user_count = 0;

	$get_total_pending_district = $wpdb->get_row("SELECT COUNT(id) as total_pending_district FROM " .NEX_FORM_TEMP_ENTRY_TBL . " WHERE nex_form_id = '" . DISTRICT_FORM_ID . "' AND is_published = '1' AND state_status = '0' AND record_id > '0' AND user_id > '0'", ARRAY_A);

	if( $get_total_pending_district['total_pending_district'] > 0 ){
		$total_user_count = $get_total_pending_district['total_pending_district'];
	}

	return $total_user_count;
}

function get_total_district_under_review_entries(){
	global $wpdb;

	$total_user_count = 0;

	$get_total_under_review_district = $wpdb->get_row("SELECT COUNT(id) as total_under_review_district FROM " .NEX_FORM_TEMP_ENTRY_TBL . " WHERE nex_form_id = '" . DISTRICT_FORM_ID . "' AND is_published = '1' AND state_status = '1' AND record_id > '0' AND user_id > '0'", ARRAY_A);

	if( $get_total_under_review_district['total_under_review_district'] > 0 ){
		$total_user_count = $get_total_under_review_district['total_under_review_district'];
	}

	return $total_user_count;
}

function get_total_district_reviewed_entries(){
	global $wpdb;

	$total_user_count = 0;

	$get_total_reviewed_district = $wpdb->get_row("SELECT COUNT(id) as total_reviewed_district FROM " .NEX_FORM_TEMP_ENTRY_TBL . " WHERE nex_form_id = '" . DISTRICT_FORM_ID . "' AND is_published = '1' AND state_status = '2' AND record_id > '0' AND user_id > '0'", ARRAY_A);

	if( $get_total_reviewed_district['total_reviewed_district'] > 0 ){
		$total_user_count = $get_total_reviewed_district['total_reviewed_district'];
	}

	return $total_user_count;
}




function get_total_district_submitted_entries_by_state($state_id){
	global $wpdb;

	$total_count = 0;

	$get_total_sumitted = $wpdb->get_row("SELECT COUNT(Id) as total_submitted FROM " .NEX_FORM_ENTRY_TBL . " WHERE publish = '1' AND user_Id IN(SELECT sur_users.ID FROM sur_users INNER JOIN sur_usermeta ON ( sur_users.ID = sur_usermeta.user_id ) WHERE ( sur_usermeta.meta_key = 'state' AND sur_usermeta.meta_value = '". $state_id ."' ) )", ARRAY_A);

	if( $get_total_sumitted['total_submitted'] > 0 ){
		$total_count = $get_total_sumitted['total_submitted'];
	}

	return $total_count;
}

function get_total_district_draft_entries_by_state($state_id){
	global $wpdb;

	$total_user_count = 0;

	$get_total_pending = $wpdb->get_row("SELECT COUNT(ID) as total_users FROM sur_users INNER JOIN sur_usermeta ON ( sur_users.ID = sur_usermeta.user_id ) WHERE ( sur_usermeta.meta_key = 'state' AND sur_usermeta.meta_value = '". $state_id ."' )", ARRAY_A);

	if( $get_total_pending['total_users'] > 0 ){
		$total_user_count = $get_total_pending['total_users'];
	}

	$total_count = $total_user_count - get_total_district_submitted_entries_by_state($state_id);

	return $total_count;
}

function get_total_district_pending_entries_by_state($state_id){
	global $wpdb;

	$total_user_count = 0;

	$get_total_pending_district = $wpdb->get_row("SELECT COUNT(id) as total_pending_district FROM " .NEX_FORM_TEMP_ENTRY_TBL . " WHERE nex_form_id = '" . DISTRICT_FORM_ID . "' AND is_published = '1' AND state_status = '0' AND record_id > '0' AND user_id IN(SELECT ID as total_users FROM sur_users INNER JOIN sur_usermeta ON ( sur_users.ID = sur_usermeta.user_id ) WHERE ( sur_usermeta.meta_key = 'state' AND sur_usermeta.meta_value = '". $state_id ."' ))", ARRAY_A);

	if( $get_total_pending_district['total_pending_district'] > 0 ){
		$total_user_count = $get_total_pending_district['total_pending_district'];
	}

	return $total_user_count;
}

function get_total_district_under_review_entries_by_state($state_id){
	global $wpdb;

	$total_user_count = 0;

	$get_total_under_review_district = $wpdb->get_row("SELECT COUNT(id) as total_under_review_district FROM " .NEX_FORM_TEMP_ENTRY_TBL . " WHERE nex_form_id = '" . DISTRICT_FORM_ID . "' AND is_published = '1' AND state_status = '1' AND record_id > '0' AND user_id IN(SELECT ID as total_users FROM sur_users INNER JOIN sur_usermeta ON ( sur_users.ID = sur_usermeta.user_id ) WHERE ( sur_usermeta.meta_key = 'state' AND sur_usermeta.meta_value = '". $state_id ."' ))", ARRAY_A);

	if( $get_total_under_review_district['total_under_review_district'] > 0 ){
		$total_user_count = $get_total_under_review_district['total_under_review_district'];
	}

	return $total_user_count;
}

function get_total_district_reviewed_entries_by_state($state_id){
	global $wpdb;

	$total_user_count = 0;

	$get_total_reviewed_district = $wpdb->get_row("SELECT COUNT(id) as total_reviewed_district FROM " .NEX_FORM_TEMP_ENTRY_TBL . " WHERE nex_form_id = '" . DISTRICT_FORM_ID . "' AND is_published = '1' AND state_status = '2' AND record_id > '0' AND user_id IN(SELECT ID as total_users FROM sur_users INNER JOIN sur_usermeta ON ( sur_users.ID = sur_usermeta.user_id ) WHERE ( sur_usermeta.meta_key = 'state' AND sur_usermeta.meta_value = '". $state_id ."' ))", ARRAY_A);

	if( $get_total_reviewed_district['total_reviewed_district'] > 0 ){
		$total_user_count = $get_total_reviewed_district['total_reviewed_district'];
	}

	return $total_user_count;
}