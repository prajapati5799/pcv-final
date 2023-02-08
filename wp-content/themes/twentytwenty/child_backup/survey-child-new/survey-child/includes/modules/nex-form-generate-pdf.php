<?php
defined( 'ABSPATH' ) || exit;

function generate_state_form_pdf_by_record_id( $record_id, $is_view = false ){
	global $wpdb;

  	// create new PDF document
  	require_once( get_stylesheet_directory() . '/includes/lib/tcpdf/examples/tcpdf_include.php');

  	if( !class_exists('TCPDF') ){
  		require_once( get_stylesheet_directory() . '/includes/lib/tcpdf/examples/config/tcpdf_config_alt.php');
  		require_once( get_stylesheet_directory() . '/includes/lib/tcpdf/tcpdf.php');
  	}

	$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

	// set document information
	$pdf->SetCreator(PDF_CREATOR);
	$pdf->SetAuthor(get_bloginfo());
	$pdf->SetTitle('State Checklist');
	$pdf->SetSubject('State Checklist');

	// set default monospaced font
	$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

	// set margins
	$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
	//$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
	//$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

	// set auto page breaks
	$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

	// set image scale factor
	$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

	// set some language-dependent strings (optional)
	if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
		require_once(dirname(__FILE__).'/lang/eng.php');
		$pdf->setLanguageArray($l);
	}

	// ---------------------------------------------------------

	// set font
	$pdf->SetFont('helvetica', 'B', 20);

	// add a page
	$pdf->AddPage();

	$pdf->Write(0, 'State Checklist', '', 0, 'L', true, 0, false, false, 0);

	$pdf->SetFont('helvetica', '', 8);

	// -----------------------------------------------------------------------------

	$formLabelArray = get_state_form_fields();
  	//$records = $wpdb->get_results( "SELECT * FROM " . NEX_FORM_ENTRY_TBL . " WHERE Id = '" . $record_id . "'");
  	$records = $wpdb->get_results( "SELECT * FROM " . NEX_FORM_TEMP_ENTRY_TBL . " WHERE record_id = '" . $record_id . "'");

	$output = '<table cellspacing="0" cellpadding="1" border="1">';
	    $output .= '<tr>';
	        $output .= '<td>Questions</td>';
	        $output .= '<td>Response</td>';
	    $output .= '</tr>';

		foreach($records as $data)
		{
			//$submission_date = theme_change_date_format( $data->date_time, "Y-m-d H:i:s", "Y-m-d H:i:s" );
			$submission_date = theme_change_date_format( $data->created_at, "Y-m-d H:i:s", "Y-m-d H:i:s" );

			$form_values = json_decode($data->form_data);

			$output .= '<tr>';
				$output.='<td>1.1 State name</td>';
				//$output.='<td>'.get_user_state($data->user_Id).'</td>';
				$output.='<td>'.get_user_state($data->user_id).'</td>';
			$output.='</tr>';

			foreach ($form_values as $data) {

				//if($data->val!=""){
					if (strpos($data->name, 'real_val__') !== false) {
						continue;
					}

					if ( empty($data->name) || $data->name == "math_result" || $data->name == "user_id" ) {
						continue;
					}

					$pdf_label = "";

					if (strpos($data->name, 'name_of_district_stores_') !== false) {
						$is_name_of_district_stores1 = strstr($data->name, 'name_of_district_stores_');
						$is_name_of_district_stores2 = strstr($data->name, 'name_of_district_stores_', true);

						if( !empty($is_name_of_district_stores1) && empty($is_name_of_district_stores2) ){
							$number_name_of_district_stores = str_replace("name_of_district_stores_", "", $data->name);
							if( is_numeric($number_name_of_district_stores) ){
								$pdf_label = "Name of district stores - " . ($number_name_of_district_stores + 1);
							}
						}

					}

					if (strpos($data->name, 'name_of_district_') !== false) {

						$is_name_of_district1 = strstr($data->name, 'name_of_district_');
						$is_name_of_district2 = strstr($data->name, 'name_of_district_', true);

						if( !empty($is_name_of_district1) && empty($is_name_of_district2) ){
							$number_name_of_district = str_replace("name_of_district_", "", $data->name);
							if( is_numeric($number_name_of_district) ){
								$pdf_label = "Name of district - " . ($number_name_of_district + 1);
							}
						}

					} else if (strpos($data->name, 'total_population_') !== false) {

						$is_total_population1 = strstr($data->name, 'total_population_');
						$is_total_population2 = strstr($data->name, 'total_population_', true);

						if( !empty($is_total_population1) && empty($is_total_population2) ){
							$number_total_population = str_replace("total_population_", "", $data->name);
							if( is_numeric($number_total_population) ){
								$pdf_label = "Total population - " . ($number_total_population + 1);
							}
						}

					} else if (strpos($data->name, 'cold_chain_2_to_8_') !== false) {

						$is_cold_chain_2_to_81 = strstr($data->name, 'cold_chain_2_to_8_');
						$is_cold_chain_2_to_82 = strstr($data->name, 'cold_chain_2_to_8_', true);

						if( !empty($is_cold_chain_2_to_81) && empty($is_cold_chain_2_to_82) ){
							$number_cold_chain_2_to_8 = str_replace("cold_chain_2_to_8_", "", $data->name);
							if( is_numeric($number_cold_chain_2_to_8) ){
								$pdf_label = "Cold chain 2 to 8 - " . ($number_cold_chain_2_to_8 + 1);
							}
						}
					}  else if (strpos($data->name, 'cold_chain_15_to_25_') !== false) {

						$is_cold_chain_15_to_251 = strstr($data->name, 'cold_chain_15_to_25_');
						$is_cold_chain_15_to_252 = strstr($data->name, 'cold_chain_15_to_25_', true);

						if( !empty($is_cold_chain_15_to_251) && empty($is_cold_chain_15_to_252) ){
							$number_cold_chain_15_to_25 = str_replace("cold_chain_15_to_25_", "", $data->name);
							if( is_numeric($number_cold_chain_15_to_25) ){
								$pdf_label = "Cold chain 15 to 25 - " . ($number_cold_chain_15_to_25 + 1);
							}
						}
					}

					if( empty($pdf_label) ){
						$pdf_label = $formLabelArray[$data->name];
					}

					// Field values
					$found_key = array_search('real_val__' . $data->name, array_column( $form_values, 'name'));

					$data_val = $data->val;
					if( $found_key ){
						$data_val = $form_values[$found_key]->val;
					}

					if(is_array($data_val)){
						$data_val = implode(",",$data_val);
					}

					$data_val = str_replace("[BREAK]", " ", $data_val);

					$output .= '<tr>';
						$output.='<td>'.$pdf_label.'</td>';
						$output.='<td>'.$data_val.'</td>';
					$output.='</tr>';
				//}
			}
			
			$output .= '<tr>';
				$output.='<td>Date of submission</td>';
				$output.='<td>'.$submission_date.'</td>';
			$output.='</tr>';
		}

  	$output .= '</table>';

	$pdf->writeHTML($output, true, false, false, false, '');

	// -----------------------------------------------------------------------------

	//Close and output PDF document
	if( $is_view ){
		$pdf->Output('state_checklist.pdf', 'I');	
	} else {
		$pdf->Output('state_checklist.pdf', 'D');	
	}
}

function generate_district_form_pdf_by_record_id( $record_id, $is_view = false ){
	global $wpdb;

  	// create new PDF document
  	require_once( get_stylesheet_directory() . '/includes/lib/tcpdf/examples/tcpdf_include.php');

  	if( !class_exists('TCPDF') ){
  		require_once( get_stylesheet_directory() . '/includes/lib/tcpdf/examples/config/tcpdf_config_alt.php');
  		require_once( get_stylesheet_directory() . '/includes/lib/tcpdf/tcpdf.php');
  	}

	$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

	// set document information
	$pdf->SetCreator(PDF_CREATOR);
	$pdf->SetAuthor(get_bloginfo());
	$pdf->SetTitle('District Checklist');
	$pdf->SetSubject('District Checklist');

	// set default monospaced font
	$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

	// set margins
	$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
	//$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
	//$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

	// set auto page breaks
	$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

	// set image scale factor
	$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

	// set some language-dependent strings (optional)
	if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
		require_once(dirname(__FILE__).'/lang/eng.php');
		$pdf->setLanguageArray($l);
	}

	// ---------------------------------------------------------

	// set font
	$pdf->SetFont('helvetica', 'B', 20);

	// add a page
	$pdf->AddPage();

	$pdf->Write(0, 'District Checklist', '', 0, 'L', true, 0, false, false, 0);

	$pdf->SetFont('helvetica', '', 8);

	// -----------------------------------------------------------------------------

	$formLabelArray = get_district_form_fields();
  	//$records = $wpdb->get_results( "SELECT * FROM " . NEX_FORM_ENTRY_TBL . " WHERE Id = '" . $record_id . "'");
  	$records = $wpdb->get_results( "SELECT * FROM " . NEX_FORM_TEMP_ENTRY_TBL . " WHERE record_id = '" . $record_id . "'");

	$output = '<table cellspacing="0" cellpadding="1" border="1">';
	    $output .= '<tr>';
	        $output .= '<td>Questions</td>';
	        $output .= '<td>Response</td>';
	    $output .= '</tr>';

		foreach($records as $data)
		{
			//$submission_date = theme_change_date_format( $data->date_time, "Y-m-d H:i:s", "Y-m-d H:i:s" );
			$submission_date = theme_change_date_format( $data->created_at, "Y-m-d H:i:s", "Y-m-d H:i:s" );

			$form_values = json_decode($data->form_data);

			$output .= '<tr>';
				$output.='<td>1.1 State name</td>';
				//$output.='<td>'.get_user_state($data->user_Id).'</td>';
				$output.='<td>'.get_user_state($data->user_id).'</td>';
			$output.='</tr>';

			$output .= '<tr>';
				$output.='<td>1.2 District name</td>';
				//$output.='<td>'.get_user_city($data->user_Id).'</td>';
				$output.='<td>'.get_user_city($data->user_id).'</td>';
			$output.='</tr>';

			foreach ($form_values as $data) {

				if (strpos($data->name, 'real_val__') !== false) {
					continue;
				}

				if ( empty($data->name) || $data->name == "math_result" || $data->name == "user_id" ) {
					continue;
				}

				//echo $data->name. "<br/>";
				if ( $data->name == "commontable_aligntop" ) {

					if( $data->val && !empty($data->val) ){
						foreach ( $data->val as $rp_key => $pr_value) {

							if( $pr_value->details_of_cold_chain_space_available_name_of_block && !empty($pr_value->details_of_cold_chain_space_available_name_of_block) ){
								$output .= '<tr>';
									$output.='<td>Name of block ' . $rp_key . '</td>';
									$output.='<td>'.$pr_value->details_of_cold_chain_space_available_name_of_block.'</td>';
								$output.='</tr>';
							}

							if( $pr_value->details_of_cold_chain_space_available_name_of_cold_chain_store && !empty($pr_value->details_of_cold_chain_space_available_name_of_cold_chain_store) ){
								$output .= '<tr>';
									$output.='<td>Name of cold chain store ' . $rp_key . '</td>';
									$output.='<td>'.$pr_value->details_of_cold_chain_space_available_name_of_cold_chain_store.'</td>';
								$output.='</tr>';
							}

							if( $pr_value->details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area && !empty($pr_value->details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area) ){
								$output .= '<tr>';
									$output.='<td>Total Population of the catchment area ' . $rp_key . '</td>';
									$output.='<td>'.$pr_value->details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area.'</td>';
								$output.='</tr>';
							}

							if( $pr_value->details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available && !empty($pr_value->details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available) ){
								$output .= '<tr>';
									$output.='<td>Cold chain (+2 to +8 degree Celsius) space available (L) ' . $rp_key . '</td>';
									$output.='<td>'.$pr_value->details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available.'</td>';
								$output.='</tr>';
							}

							$pr_value = objectToArray($pr_value);
							if( $pr_value['details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available'] ){
								$output .= '<tr>';
									$output.='<td>Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) ' . $rp_key . '</td>';
									$output.='<td>'.$pr_value['details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available'].'</td>';
								$output.='</tr>';
							}
							
						}
					}

				} else if ( strpos($data->name, 'commontable_aligntop') !== false ) {

					if( strpos($data->name, 'details_of_cold_chain_space_available_name_of_block') !== false ){

						$number_doccsanob = str_replace( "commontable_aligntop[", "", $data->name );
						$number_doccsanob = str_replace( "][details_of_cold_chain_space_available_name_of_block]", "", $number_doccsanob );
						$output .= '<tr>';
							$output.='<td>Name of block ' . $number_doccsanob . '</td>';
							$output.='<td>'.$data->val.'</td>';
						$output.='</tr>';

					} else if( strpos($data->name, 'details_of_cold_chain_space_available_name_of_cold_chain_store') !== false ){

						$number_doccsanoccs = str_replace( "commontable_aligntop[", "", $data->name );
						$number_doccsanoccs = str_replace( "][details_of_cold_chain_space_available_name_of_cold_chain_store]", "", $number_doccsanoccs );
						$output .= '<tr>';
							$output.='<td>Name of cold chain store ' . $number_doccsanoccs . '</td>';
							$output.='<td>'.$data->val.'</td>';
						$output.='</tr>';

					} else if( strpos($data->name, 'details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area') !== false ){

						$number_doccsatpotca = str_replace( "commontable_aligntop[", "", $data->name );
						$number_doccsatpotca = str_replace( "][details_of_cold_chain_space_available_total_populatuion_of_the_catchment_area]", "", $number_doccsatpotca );
						$output .= '<tr>';
							$output.='<td>Total Population of the catchment area ' . $number_doccsatpotca . '</td>';
							$output.='<td>'.$data->val.'</td>';
						$output.='</tr>';

					} else if( strpos($data->name, 'details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available') !== false ){

						$number_doccsaccsal = str_replace( "commontable_aligntop[", "", $data->name );
						$number_doccsaccsal = str_replace( "][details_of_cold_chain_space_available_cold_chain_2_to_8_degree_celsius_space_available]", "", $number_doccsaccsal );
						$output .= '<tr>';
							$output.='<td>Cold chain (+2 to +8 degree Celsius) space available (L) ' . $number_doccsaccsal . '</td>';
							$output.='<td>'.$data->val.'</td>';
						$output.='</tr>';

					} else if( strpos($data->name, 'details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available') !== false ){

						$number_doccsaccsal15 = str_replace( "commontable_aligntop[", "", $data->name );
						$number_doccsaccsal15 = str_replace( "][details_of_cold_chain_space_available_cold_chain_-15_to_-25_degree_celsius_space_available]", "", $number_doccsaccsal15 );
						$output .= '<tr>';
							$output.='<td>Cold chain (‐15 to ‐ 25 degree Celsius) space available (L) ' . $number_doccsaccsal15 . '</td>';
							$output.='<td>'.$data->val.'</td>';
						$output.='</tr>';
					}

				} else {

					//if($data->val !=""){

						if($formLabelArray[$data->name]!="" && $data->val != "Other"){

							$found_key = array_search('real_val__' . $data->name, array_column( $form_values, 'field_name'));

							$data_val = $data->val;
							if( $found_key ){
								$data_val = $form_values[$found_key]->field_value;
							}

							if(is_array($data_val)){
								$data_val = implode(",",$data_val);
							}
		
							$data_val = str_replace("[BREAK]", " ", $data_val);

							$output .= '<tr>';
								$output.='<td>'.$formLabelArray[$data->name].'</td>';
								$output.='<td>'.$data_val.'</td>';
							$output.='</tr>';
						}	
					//}
				}
			}
			
			$output .= '<tr>';
				$output.='<td>Date of submission</td>';
				$output.='<td>'.$submission_date.'</td>';
			$output.='</tr>';
		}

  	$output .= '</table>';	

	$pdf->writeHTML($output, true, false, false, false, '');

	// -----------------------------------------------------------------------------

	//Close and output PDF document
	if( $is_view ){
		$pdf->Output('district_checklist.pdf', 'I');	
	} else {
		$pdf->Output('district_checklist.pdf', 'D');	
	}
}
