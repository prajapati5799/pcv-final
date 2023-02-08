<?php

/**
 * Template Name: My Dashboard Background
 *
 */
dashboard_validation([ADMIN, STATE_USER]);
get_header('dashboard');

while (have_posts()) :
    the_post();

    $c_roles        = get_current_user_roles();
    $c_user_id      = get_current_user_id();
    $c_state_id     = get_current_user_state_id();
    $c_city_id      = get_current_user_city_id();

    echo '<div class="content-blocks">';
    echo '<div class="dashboard-block">';

    echo '<div class="block-title">';
    echo '<h2>' . get_the_title() . '</h2>';
    echo '</div>';

    if (in_array(ADMIN, $c_roles)) {

        echo '<div class="row">';
        echo '<div class="col-lg-6">';
        echo '<div class="dashborad-search-result">';
        echo '<div class="search-result-content">';
        echo '<table>';
        echo '<tbody>';

        echo '<tr>';
        echo '<th>Total districts in the state</th>';
        echo '<td>';
        echo get_field_value_by_key("total_no_of_districts_in_the_state");
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>No. of  aspirational districts under MI-Egsa</th>';
        echo '<td>';
        echo get_field_value_by_key("names_of_the_identified_aspirational_districts_in_the_state[]");
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>Total no. of blocks in the state</th>';
        echo '<td>';
        echo get_field_value_by_key("total_no_of_blocks_in_the_state");
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>Total no. of sub-centres in the state</th>';
        echo '<td>';
        echo get_field_value_by_key("total_no_of_sub");
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>No of districts without DIO</th>';
        echo '<td>';
        echo get_field_value_by_key("names_of_districts_without_dio_designated_mo");
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>No of districts without computer assistant</th>';
        echo '<td>';
        echo get_field_value_by_key("how_many_districts_dios_do_not_have_computer_assistants");
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>Total population of states</th>';
        echo '<td>';
        echo get_field_value_by_key("total_population_of_state");
        echo '</td>';
        echo '</tr>';
        echo '<tr>';
        echo '<th>Total no. of Infants</th>';
        echo '<td>';
        echo get_field_value_by_key("total_no_of_infants");
        echo '</td>';
        echo '</tr>';
        echo '</tbody>';
        echo '</table>';
        echo '</div>';
        echo '</div>';
        echo '</div>';
        echo '</div>';
    } else if (in_array(STATE_USER, $c_roles)) {
        $getDistrictFormData   = get_district_form_results();

        echo '<div class="row">';
        echo '<div class="col-lg-6">';
        echo '<div class="dashborad-search-result">';
        echo '<div class="search-result-content">';
        echo '<table>';
        echo '<tbody>';
        echo '<tr>';
        echo '<th>Total population of district-2018-2019</th>';
        echo '<td>';
        echo get_district_field_value_by_key($getDistrictFormData, "total_population_of_district", $c_state_id);
        echo '</td>';
        echo '</tr>';
        echo '<tr>';
        echo '<th>Total no. of Infants</th>';
        echo '<td>';
        echo get_district_field_value_by_key($getDistrictFormData, "total_no_of_infants", $c_state_id);
        echo '</td>';
        echo '</tr>';
        echo '</tbody>';
        echo '</table>';
        echo '</div>';
        echo '</div>';
        echo '</div>';
        echo '</div>';

        // Penta-1/DPT-1 - Line charts
        echo '<div class="dashborad-charts">';
        echo '<div class="row">';

        $district_immunization_coverage_penta_3_dpt_3_hmis_all_data             = get_district_line_chart_data_by_key($getDistrictFormData, 'district_immunization_coverage_penta_3_dpt_3_hmis', $c_state_id);

        $district_immunization_coverage_penta_3_dpt_3_hmis_data                 = [];
        $district_immunization_coverage_penta_3_dpt_3_hmis_data['reported']     = array_column(sort_array($district_immunization_coverage_penta_3_dpt_3_hmis_all_data['reported']), 'val');
        $district_immunization_coverage_penta_3_dpt_3_hmis_data['evaluated']    = array_column(sort_array($district_immunization_coverage_penta_3_dpt_3_hmis_all_data['evaluated']), 'val');
        $district_immunization_coverage_penta_3_dpt_3_hmis_data['monitored']    = array_column(sort_array($district_immunization_coverage_penta_3_dpt_3_hmis_all_data['monitored']), 'val');
        $district_immunization_coverage_penta_3_dpt_3_hmis_data['keys']         = array_column(sort_array($district_immunization_coverage_penta_3_dpt_3_hmis_all_data['monitored']), 'district');

        echo '<div class="col-md-12">';
        echo '<div class="dashborad-search-result">';
        echo '<div id="district_immunization_coverage_penta_3_dpt_3_hmis_container"></div>';
        echo '<script>var district_immunization_coverage_penta_3_dpt_3_hmis_chart = ' . json_encode(
            get_highchart_line_data(
                array(
                    'container' => 'district_immunization_coverage_penta_3_dpt_3_hmis_container',
                    'title_text' => '% coverage of different antigens(Penta 3/ DPT 3)',
                    'yAxis_title' => 'Penta 3/ DPT 3(%)',
                    'series_name1' => 'Penta 3/ DPT 3- (%) Coverage- HMIS 2019-20',
                    'series_name2' => 'Penta 3/ DPT 3 Evaluated-NFHS-4',
                    'series_name3' => 'Penta 3/ DPT 3 Concurrent monitoring-2019-20',
                    'data'      => $district_immunization_coverage_penta_3_dpt_3_hmis_data
                )
            )
        ) . ';</script>';
        echo '</div>';
        echo '</div>';

        echo '</div>';
        echo '</div>';

        // MR 1/ Measles - Line charts
        echo '<div class="dashborad-charts">';
        echo '<div class="row">';

        $district_immunization_coverage_mr1_measles_hmis_all_data             = get_district_line_chart_data_by_key($getDistrictFormData, 'district_immunization_coverage_mr1_measles_hmis', $c_state_id);

        $district_immunization_coverage_mr1_measles_hmis_data                 = [];
        $district_immunization_coverage_mr1_measles_hmis_data['reported']     = array_column(sort_array($district_immunization_coverage_mr1_measles_hmis_all_data['reported']), 'val');
        $district_immunization_coverage_mr1_measles_hmis_data['evaluated']    = array_column(sort_array($district_immunization_coverage_mr1_measles_hmis_all_data['evaluated']), 'val');
        $district_immunization_coverage_mr1_measles_hmis_data['monitored']    = array_column(sort_array($district_immunization_coverage_mr1_measles_hmis_all_data['monitored']), 'val');
        $district_immunization_coverage_mr1_measles_hmis_data['keys']         = array_column(sort_array($district_immunization_coverage_mr1_measles_hmis_all_data['monitored']), 'district');

        echo '<div class="col-md-12">';
        echo '<div class="dashborad-search-result">';
        echo '<div id="district_immunization_coverage_mr1_measles_hmis_container"></div>';
        echo '<script>var district_immunization_coverage_mr1_measles_hmis_chart = ' . json_encode(
            get_highchart_line_data(
                array(
                    'container' => 'district_immunization_coverage_mr1_measles_hmis_container',
                    'title_text' => '% coverage of different antigens(MR 1/ Measles)',
                    'yAxis_title' => 'MR 1/ Measles(%)',
                    'series_name1' => 'MR 1/ Measles- (%) Coverage- HMIS 2019-20',
                    'series_name2' => 'MR 1/ Measles Evaluated-NFHS-4',
                    'series_name3' => 'MR 1/ Measles Concurrent monitoring-2019-20',
                    'data'      => $district_immunization_coverage_mr1_measles_hmis_data
                )
            )
        ) . ';</script>';
        echo '</div>';
        echo '</div>';

        echo '</div>';
        echo '</div>';

        // District drop‐out rates - Line charts
        echo '<div class="dashborad-charts">';
        echo '<div class="row">';

        $district_drop_out_rates_penta_1_dpt_1_hmis_all_data             = get_district_line_chart_data_by_key($getDistrictFormData, 'district_drop_out_rates_penta_1_dpt_1_hmis', $c_state_id);

        $district_drop_out_rates_penta_1_dpt_1_hmis_data                 = [];
        $district_drop_out_rates_penta_1_dpt_1_hmis_data['reported']     = array_column(sort_array($district_drop_out_rates_penta_1_dpt_1_hmis_all_data['reported']), 'val');
        $district_drop_out_rates_penta_1_dpt_1_hmis_data['evaluated']    = array_column(sort_array($district_drop_out_rates_penta_1_dpt_1_hmis_all_data['evaluated']), 'val');
        $district_drop_out_rates_penta_1_dpt_1_hmis_data['keys']         = array_column(sort_array($district_drop_out_rates_penta_1_dpt_1_hmis_all_data['reported']), 'district');

        echo '<div class="col-md-12">';
        echo '<div class="dashborad-search-result">';
        echo '<div id="district_drop_out_rates_penta_1_dpt_1_hmis_container"></div>';
        echo '<script>var district_drop_out_rates_penta_1_dpt_1_hmis_chart = ' . json_encode(
            get_highchart_line_data(
                array(
                    'container' => 'district_drop_out_rates_penta_1_dpt_1_hmis_container',
                    'title_text' => 'District drop out rate reported-HMIS 2019-20',
                    'yAxis_title' => 'MR 1/ Measles(%)',
                    'series_name1' => 'Penta‐1 to Penta‐3',
                    'series_name2' => 'Penta 3‐1 to MR‐1',
                    'data'      => $district_drop_out_rates_penta_1_dpt_1_hmis_data
                )
            )
        ) . ';</script>';
        echo '</div>';
        echo '</div>';

        echo '</div>';
        echo '</div>';

        // <div class="search-result-content">
        //         <table>
        //             '.get_district_cold_chain_data_by_state( $c_state_id ).'
        //         </table>
        //     </div>
    }

    echo '</div>';
    echo '</div>';
endwhile;

get_footer('dashboard');
