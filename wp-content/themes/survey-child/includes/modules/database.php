<?php
defined( 'ABSPATH' ) || exit;

/*
*  Create tables for store countries, states and cities
*
*/

global $wpdb;

//delete_option('country_db_instance');
$country_db_instance 		= get_option('country_db_instance');

if( $country_db_instance ){
	return;
}

$charset_collate 			= $wpdb->get_charset_collate();

$countries_table_name 		= COUNTRY_TBL;
$states_table_name 			= STATE_TBL;
$cities_table_name 			= CITY_TBL;
$nex_form_temp_entry_table_name 			= NEX_FORM_TEMP_ENTRY_TBL;

$sql 						= "CREATE TABLE $countries_table_name (
	id mediumint(9) NOT NULL AUTO_INCREMENT,
	country varchar(255) DEFAULT '' NOT NULL,
	country_code varchar(50) DEFAULT '' NOT NULL,
	region varchar(255) DEFAULT '' NOT NULL,
	PRIMARY KEY  (id)
) $charset_collate;";


$sql 						.= "CREATE TABLE $states_table_name (
	id mediumint(9) NOT NULL AUTO_INCREMENT,
	countries_id mediumint(9) NOT NULL,
	state varchar(255) DEFAULT '' NOT NULL,
	PRIMARY KEY  (id)
) $charset_collate;";


$sql 						.= "CREATE TABLE $cities_table_name (
	id mediumint(9) NOT NULL AUTO_INCREMENT,
	countries_id mediumint(9) NOT NULL,
	states_id mediumint(9) NOT NULL,
	city varchar(255) DEFAULT '' NOT NULL,
	PRIMARY KEY  (id)
) $charset_collate;";


$sql 						.= "CREATE TABLE $nex_form_temp_entry_table_name (
	id mediumint(9) NOT NULL AUTO_INCREMENT,
	temp_id mediumint(9) DEFAULT '0' NOT NULL,
	nex_form_id mediumint(9) DEFAULT '0' NOT NULL,
	record_id mediumint(9) DEFAULT '0' NOT NULL,
	user_id mediumint(9) DEFAULT '0' NOT NULL,
	form_data longtext DEFAULT '',
	files_data longtext DEFAULT '',
	is_published enum('0','1') DEFAULT '0',
	created_at datetime DEFAULT NULL,
	updated_at timestamp DEFAULT NULL,
	PRIMARY KEY  (id)
) $charset_collate;";

require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

dbDelta( $sql );

update_option('country_db_instance', true);

/*
*  Insert record into store countries, states and cities tables
*
*/

/*
$db_country = [
	['Brazil', 'BR', 'South America'],
	['China', 'CN', 'Eastern Asia'],
	['France', 'FR', 'Western Europe'],
	['India', 'IN', 'Southern and Central Asia'],
	['USA', 'US', 'North America', 'North America']
];

$country_query = "INSERT INTO $countries_table_name (country, country_code, region) VALUES ";

foreach ( $db_country as $country ) {
    $country_query .= "('".$country[0]."', '".$country[1]."', '".$country[2]."'),";
}

$wpdb->query(trim($country_query, ","));*/
?>