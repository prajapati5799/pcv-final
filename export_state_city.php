<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include(__DIR__ . '/wp-load.php');


function ExportPCVState(){
    global $wpdb;

    header("Pragma: public");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    header("Cache-Control: private", false);
    header("content-type:application/csv;charset=UTF-8");
    header("Content-Disposition: attachment; filename=\"state-".date("Y-m-d-H-I-s").".csv\";" );
    header("Content-Transfer-Encoding: base64");


    $records = $wpdb->get_results( "SELECT state.id as state_tbl_id, state.state, pcv.* FROM " .STATE_TBL. " as state LEFT JOIN " . PCV_TBL . " as pcv ON pcv.states_id = state.id GROUP By pcv.states_id" );

    
    ob_start();

    $df = fopen("php://output", 'w');
    fputcsv($df, array(
        'State', 
        'Infant Population (<1 year, 2019-2020)', 
        'Estimated mid-year population as on 1st October, 2019', 
        'Aspirational Districts', 
        'HMIS - Penta-1 Coverage', 
        'HMIS - Penta-3 Coverage', 
        'HMIS - MR-1 Coverage (HMIS)', 
        'HMIS - Dropout (Penta-1 to Penta-3)', 
        'HMIS - Dropout (Penta-3 to MR-1)', 
        'HMIS - % of sessions held out of sessions planned', 
        'NFHS-4 - DPT-3 Coverage (%) (NFHS-4)', 
        'NFHS-4 - Measles Vaccine Coverage (%)(NFHS-4)'
    ));

    if( $records && !empty($records) ){
        foreach ($records as $data) {
        
            $content_row = array(
                $data->state,
                $data->total_infant_population,
                $data->total_mid_year_population,
                $data->total_aspirational_districts,
                $data->total_hmis_penta_1,
                $data->total_hmis_penta_3,
                $data->total_hmis_mr_1_coverage,
                $data->total_hmis_dropout_p_1_3,
                $data->total_hmis_dropout_p_3_mr,
                $data->total_hmis_sessions_held,
                $data->total_nfhs_4_dpt_3_coverage,
                $data->total_nfhs_4_measles_vaccine_coverage,
            );

            fputcsv($df, $content_row);

        //die();
        }
    }
    fclose($df);
    echo ob_get_clean();
    exit;
}
ExportPCVState();

function ExportPCVDistrict(){
    global $wpdb;

    header("Pragma: public");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    header("Cache-Control: private", false);
    header("content-type:application/csv;charset=UTF-8");
    header("Content-Disposition: attachment; filename=\"district-".date("Y-m-d-H-I-s").".csv\";" );
    header("Content-Transfer-Encoding: base64");

    //"SELECT state.id as state_tbl_id, state.state, pcv.*, city.id as city_tbl_id, city.states_id as c_state_id, city.city FROM " .STATE_TBL. " as state LEFT JOIN " . CITY_TBL . " as city ON state.id = city.states_id LEFT JOIN " . PCV_TBL . " as pcv ON pcv.cities_id = city.id"

    /*echo  "SELECT state.id as state_tbl_id, state.state, pcv.*, city.id as city_tbl_id, city.states_id as c_state_id, city.city FROM " .STATE_TBL. " as state LEFT JOIN " . CITY_TBL . " as city ON state.id = city.states_id LEFT JOIN " . PCV_TBL . " as pcv ON pcv.cities_id = city.id";
    die();*/

    $records = $wpdb->get_results( "SELECT state.id as state_tbl_id, state.state, pcv.*, city.id as city_tbl_id, city.states_id as c_state_id, city.city FROM " .STATE_TBL. " as state LEFT JOIN " . CITY_TBL . " as city ON state.id = city.states_id LEFT JOIN " . PCV_TBL . " as pcv ON pcv.cities_id = city.id" );

    
    ob_start();

    $df = fopen("php://output", 'w');
    fputcsv($df, array(
        'State', 
        'District', 
        'Infant Population (<1 year, 2019-2020)', 
        'Estimated mid-year population as on 1st October, 2019', 
        'Aspirational Districts', 
        'HMIS - Penta-1 Coverage', 
        'HMIS - Penta-3 Coverage', 
        'HMIS - MR-1 Coverage (HMIS)', 
        'HMIS - Dropout (Penta-1 to Penta-3)', 
        'HMIS - Dropout (Penta-3 to MR-1)', 
        'HMIS - % of sessions held out of sessions planned', 
        'NFHS-4 - DPT-3 Coverage (%) (NFHS-4)', 
        'NFHS-4 - Measles Vaccine Coverage (%)(NFHS-4)'
    ));

    if( $records && !empty($records) ){
        foreach ($records as $data) {

            $sic_pcv_district_tbl_row       = $wpdb->get_row("SELECT * FROM " .PCV_DISTRICT_TBL. " WHERE states_id = '" . $data->state_tbl_id . "' AND cities_id = '" . $data->city_tbl_id . "'");

            $nfhs_4_dpt_3_coverage = "";
            $nfhs_4_measles_vaccine_coverage = "";

            if( $sic_pcv_district_tbl_row && !empty($sic_pcv_district_tbl_row) ){

                if( !empty($sic_pcv_district_tbl_row->dpt_nfhs_5) ){
                    $nfhs_4_dpt_3_coverage          = $sic_pcv_district_tbl_row->dpt_nfhs_5;
                } else if( !empty($sic_pcv_district_tbl_row->dpt_nfhs_4) ){
                    $nfhs_4_dpt_3_coverage          = $sic_pcv_district_tbl_row->dpt_nfhs_4;
                }

                if( !empty($sic_pcv_district_tbl_row->mcv_nfhs_5) ){
                    $nfhs_4_measles_vaccine_coverage          = $sic_pcv_district_tbl_row->mcv_nfhs_5;
                } else if( !empty($sic_pcv_district_tbl_row->mcv_nfhs_4) ){
                    $nfhs_4_measles_vaccine_coverage          = $sic_pcv_district_tbl_row->mcv_nfhs_4;
                }
            }

            $content_row = array(
                $data->state,
                $data->city,
                $data->infant_population,
                $data->mid_year_population,
                $data->aspirational_districts,
                $data->hmis_penta_1,
                $data->hmis_penta_3,
                $data->hmis_mr_1_coverage,
                $data->hmis_dropout_p_1_3,
                $data->hmis_dropout_p_3_mr,
                $data->hmis_sessions_held,
                $nfhs_4_dpt_3_coverage,
                $nfhs_4_measles_vaccine_coverage
            );

            fputcsv($df, $content_row);

        //die();
        }
    }
    fclose($df);
    echo ob_get_clean();
    exit;
    
}
//ExportPCVDistrict();

/*UPDATE `sur_pcv` SET `total_nfhs_4_dpt_3_coverage` = '81.7', `total_nfhs_4_measles_vaccine_coverage` = '82.8' WHERE `sur_pcv`.`states_id` = 2;

UPDATE `sur_pcv` SET `total_nfhs_4_dpt_3_coverage` = '81.4', `total_nfhs_4_measles_vaccine_coverage` = '76.6' WHERE `sur_pcv`.`states_id` = 13;

UPDATE `sur_pcv` SET `total_nfhs_4_dpt_3_coverage` = '73.1', `total_nfhs_4_measles_vaccine_coverage` = '72.5' WHERE `sur_pcv`.`states_id` = 14;

UPDATE `sur_pcv` SET `total_nfhs_4_dpt_3_coverage` = '80.7', `total_nfhs_4_measles_vaccine_coverage` = '80.9' WHERE `sur_pcv`.`states_id` = 15;

UPDATE `sur_pcv` SET `total_nfhs_4_dpt_3_coverage` = '71.5', `total_nfhs_4_measles_vaccine_coverage` = '73.8' WHERE `sur_pcv`.`states_id` = 16;

UPDATE `sur_pcv` SET `total_nfhs_4_dpt_3_coverage` = '91.4', `total_nfhs_4_measles_vaccine_coverage` = '90.5' WHERE `sur_pcv`.`states_id` = 20;

UPDATE `sur_pcv` SET `total_nfhs_4_dpt_3_coverage` = '85.9', `total_nfhs_4_measles_vaccine_coverage` = '86.3' WHERE `sur_pcv`.`states_id` = 22;

UPDATE `sur_pcv` SET `total_nfhs_4_dpt_3_coverage` = '92.8', `total_nfhs_4_measles_vaccine_coverage` = '91.7' WHERE `sur_pcv`.`states_id` = 8;

UPDATE `sur_pcv` SET `total_nfhs_4_dpt_3_coverage` = '95', `total_nfhs_4_measles_vaccine_coverage` = '92.9' WHERE `sur_pcv`.`states_id` = 39;*/
?>