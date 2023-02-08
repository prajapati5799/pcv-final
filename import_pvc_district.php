<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include(__DIR__ . '/wp-load.php');

define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

/** Include PHPExcel_IOFactory */
require_once get_stylesheet_directory() . '/includes/lib/excel/PHPExcel/IOFactory.php';

/**
 *  Import Excel file into Database
 */
class PVCExcelImport
{
	private $objPHPExcel;
	private $excel_file;
	private $excel_row;
	private $excel_col;
	private $tbl_keys;
	
	public function __construct(){
		$this->excel_file 					= $this->get_excel_file('district.xlsx');

		// Define static total cols
		$this->excel_col 					= 13;

		$this->tbl_keys 					= [
			'states_id',
			'cities_id',
			'dpt_nfhs_5',
			'dpt_nfhs_4',
			'mcv_nfhs_5',
			'mcv_nfhs_4',
		];
	}

	private function get_excel_file($filename){

		// get file path array
		$wp_path_array 						= wp_upload_dir();

		// get upload file path
		$wp_upload_file_path 				= $wp_path_array['basedir'];

		return $wp_upload_file_path . '/' . $filename;
	}

	private function is_file_exists(){

		if ( file_exists($this->excel_file) ) {
			//exit("File doesn't exists." . EOL);
			return true;
		}

		return false;
	}

	private function read_excel_file(){

		if ( !$this->is_file_exists() ) {
			exit( "File doesn't exists." . EOL );
		}

		try {
		    // Load $inputFileName to a Spreadsheet Object
		    $this->objPHPExcel 					= PHPExcel_IOFactory::load( $this->excel_file );
		    
		} catch( Exception $e ) {
		    die( 'Error loading file: '.$e->getMessage() );
		}
	}

	public function import_excel_file(){
		global $wpdb;

		// Load excel file
		$this->read_excel_file();

		foreach ($this->objPHPExcel->getWorksheetIterator() as $worksheet) {

			$values = '';

	    	// Find total rows
	    	$this->excel_row 							= $worksheet->getHighestRow();
	    	$this->excel_row 							= 94;

	    	$state_id 									= 0;
	    	$city_id 									= 0;
	   		$dpt_nfhs_5 								= 0.00;
	   		$dpt_nfhs_4 								= 0.00;
	   		$mcv_nfhs_5 								= 0.00;
	   		$mcv_nfhs_4 								= 0.00;

	   		$insert_values 								= '';


	    	for( $data_row = 3; $data_row <= $this->excel_row; $data_row++ )
		   	{

		   		// for( $data_col = 0; $data_col <= $this->excel_col; $data_col++ )
		   		// {
		   		// 	echo $worksheet->getCellByColumnAndRow($data_col, $data_row)->getValue() . "<br/>";
		   		// }

		   		$state 										= $this->get_col_val($worksheet, 0, $data_row);
		   		$districts 									= $this->get_col_val($worksheet, 1, $data_row);

		   		/*echo $state."<br/>";
		   		echo $districts."<br/>";
		   		die();*/

		   		$state_id 									= $this->get_state_id_by_name($state);
		   		$city_id 									= $this->get_city_id_by_name($districts, $state_id);

		   		/*echo $state_id."<br/>";
		   		echo $city_id;
		   		die();*/

		   		$dpt_nfhs_5 								= $this->get_col_val($worksheet, 2, $data_row);
		   		$dpt_nfhs_4 								= $this->get_col_val($worksheet, 3, $data_row);
		   		$mcv_nfhs_5 								= $this->get_col_val($worksheet, 4, $data_row);
		   		$mcv_nfhs_4 								= $this->get_col_val($worksheet, 5, $data_row);
		   		

				$excel_array_value = [
					'states_id' => $state_id,
					'cities_id' => $city_id,
					'dpt_nfhs_5' => $dpt_nfhs_5,
					'dpt_nfhs_4' => $dpt_nfhs_4,
					'mcv_nfhs_5' => $mcv_nfhs_5,
					'mcv_nfhs_4' => $mcv_nfhs_4,
				];

				//$exists_id 					= false;
				$exists_id 					= $this->is_exists($state_id, $city_id);


				if( !$exists_id ){
					
					$insert_values 			.= '(';

					foreach ( $this->tbl_keys as $db_key_index => $db_key ) {
						$insert_values 		.= '"' . $excel_array_value[$db_key] . '",';
					}

					$insert_values 			= rtrim($insert_values, ",");

					$insert_values 			.= '),';

				} else {

					// Update data
					$update_values 			= "";
					foreach ( $this->tbl_keys as $db_key_index => $db_key ) {
						$update_values 		.= "`" . $db_key . "` = '" . $excel_array_value[$db_key] . "',";
					}

					$update_values 			= rtrim($update_values, ",");

					$wpdb->query( "UPDATE " . PCV_DISTRICT_TBL . " SET  " . $update_values . " WHERE id = '" . $exists_id . "'" );
				}
		   	}

		   	$insert_values 								= rtrim($insert_values, ",");

		   	if( !empty( $insert_values ) ){

		   		$insert_query 							= "INSERT INTO " . PCV_DISTRICT_TBL . " (";
		   		foreach ( $this->tbl_keys as $db_insert_key ) {
					$insert_query 						.= "`" . $db_insert_key . "`,";
				}

				$insert_query 							= rtrim( $insert_query, "," );

				$insert_query 							.= ") VALUES " . $insert_values;

				$wpdb->query($insert_query);
				die();
		   	}
		}
	}

	private function get_col_val($worksheet, $col, $row, $remove_special_char = false){
		$val = $worksheet->getCellByColumnAndRow($col, $row)->getValue();

		if( $val == "-" ){
			$val = str_replace( "-", "", $val );
		}

		if( $remove_special_char ){
			// if ( strpos($val, '%') !== false ) {
			// 	$val = str_replace( "%", "", $val );
			// 	return $val = $val * 100;
			// }
			$val 				= $worksheet->getCellByColumnAndRow($col, $row)->getFormattedValue();

			/*$val 				= str_replace( "%", "", $val );
			$val 				= str_replace( "#N/A", "", $val );*/

			if( empty($val) ){
				$val 			= 0.00;
			}

			return $val;
		}

		if( empty($val) ){
			$val 			= 0.00;
		}

		return $val;
	}

	private function is_exists($state_id, $city_id){
		global $wpdb;

		$pcv_data = $wpdb->get_row("SELECT id FROM " .PCV_DISTRICT_TBL. " WHERE `states_id` = '" . $state_id . "' AND `cities_id` = '" . $city_id . "'");

		if( $pcv_data && !empty($pcv_data) ){
			return $pcv_data->id;
		}

		return false;
	}

	private function get_state_id_by_name($state_name = ''){
		global $wpdb;

		if( empty($state_name) )
			return 0;

		$state = $wpdb->get_row("SELECT id FROM " .STATE_TBL. " WHERE `state` LIKE '%" . $state_name . "%'");

		if( $state && !empty($state) ){
			return $state->id;
		}

		//return $this->insert_state($state_name);
	}

	private function insert_state($state_name = ''){
		global $wpdb;

		if( empty($state_name) )
			return 0;

		
		$wpdb->insert( STATE_TBL, 
		    array(
				'countries_id'          => 4,
				'state'       			=> $state_name
		    ),
		    array(
				'%d',
				'%s'
		    ) 
		);

		return $wpdb->insert_id;
	}

	private function get_city_id_by_name($city_name = '', $state_id){
		global $wpdb;

		if( empty($city_name) )
			return 0;

		$city = $wpdb->get_row("SELECT id FROM " .CITY_TBL. " WHERE `states_id` = '".$state_id."' AND `city` LIKE '%" . $city_name . "%'");

		if( $city && !empty($city) ){
			return $city->id;
		}

		//return $this->insert_city($city_name, $state_id);
	}

	private function insert_city($city_name = '', $state_id){
		global $wpdb;

		if( empty($city_name) )
			return 0;

		
		$wpdb->insert( CITY_TBL, 
		    array(
				'countries_id'          => 4,
				'states_id'       		=> $state_id,
				'city'       			=> $city_name
		    ),
		    array(
				'%d',
				'%d',
				'%s'
		    ) 
		);

		return $wpdb->insert_id;
	}
}

$obj = new PVCExcelImport();
$obj->import_excel_file();
?>