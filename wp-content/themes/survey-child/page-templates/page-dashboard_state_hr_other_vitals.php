<?php

/**
 * Template Name: My Dashboard State HR & Other vitals
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
        echo '<th>Total no. of blocks in the districts</th>';
        echo '<td>';
        echo get_district_field_value_by_key($getDistrictFormData, "no_of_blocks_in_the_district", $c_state_id);
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>No. of Planning units (Urban & rural)</th>';
        echo '<td>';
        echo get_district_field_value_by_key($getDistrictFormData, "no_of_planning_units_rural__urban_in_the_district_as_per_polio_sias", $c_state_id);
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>Total no. of sub-centres in the district</th>';
        echo '<td>';
        echo get_district_field_value_by_key($getDistrictFormData, "total_number_of_sub_centers_in_the_district", $c_state_id);
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>% of vacant ANM positions- Regular (Sanctioned) </th>';
        echo '<td>';
        echo get_district_field_value_by_key($getDistrictFormData, "total_no_of_anms_in_the_district_regular_sanctioned", $c_state_id);
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>% of vacant ANM positions- Regular (Currently posted) </th>';
        echo '<td>';
        echo get_district_field_value_by_key($getDistrictFormData, "total_no_of_anms_in_the_district_regular_currently_posted", $c_state_id);
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>% of vacant ANM positions- Contractual (Sanctioned) </th>';
        echo '<td>';
        echo get_district_field_value_by_key($getDistrictFormData, "total_no_of_anms_in_the_district_contractual_sanctioned", $c_state_id);
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>% of vacant ANM positions- Contractual (Currently posted) </th>';
        echo '<td>';
        echo get_district_field_value_by_key($getDistrictFormData, "total_no_of_anms_in_the_district_contractual_currently_posted", $c_state_id);
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>% of sub centres with 2 ANMs</th>';
        echo '<td>';
        echo get_district_field_value_by_key($getDistrictFormData, "total_no_of_sub_centers_with_two_anms_input", $c_state_id);
        echo '</td>';
        echo '</tr>';

        $currently_asha_place_2_16 = get_district_field_value_by_key($getDistrictFormData, "total_no_of_ashas_in_the_district_currently_ashas_in_place", $c_state_id);

        $total_asha_place_2_16 = get_district_field_value_by_key($getDistrictFormData, "total_no_of_ashas_in_the_district_total_expected_asha_positions", $c_state_id);
        echo '<tr>';
        echo '<th>% of vacant ASHA positions</th>';
        echo '<td>';
        echo calculate_percentage($total_asha_place_2_16, $currently_asha_place_2_16) . '%';
        echo '</td>';
        echo '</tr>';

        $currently_awws_place_2_18 = get_district_field_value_by_key($getDistrictFormData, "total_no_of_awws_in_the_district_currently_awws_in_place", $c_state_id);

        $total_awws_place_2_18 = get_district_field_value_by_key($getDistrictFormData, "total_no_of_awws_in_the_district_total_expected_aww_positions", $c_state_id);
        echo '<tr>';
        echo '<th>% of vacant AWW positions</th>';
        echo '<td>';
        echo calculate_percentage($total_awws_place_2_18, $currently_awws_place_2_18) . '%';
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>% of sessions in District</th>';
        echo '<td>';
        echo get_district_field_value_by_key($getDistrictFormData, "ssessions_planned_in_awc_in_the_district_per_month_average_total_sessions_planned_in_district_per_month", $c_state_id) . '%';
        echo '</td>';
        echo '</tr>';

        echo '<tr>';
        echo '<th>% of sessions in AWC</th>';
        echo '<td>';
        echo get_district_field_value_by_key($getDistrictFormData, "ssessions_planned_in_awc_in_the_district_per_month_average_total_sessions_planned_at_awc_per_month_in_district", $c_state_id) . '%';
        echo '</td>';
        echo '</tr>';

        echo '</tbody>';
        echo '</table>';
        echo '</div>';
        echo '</div>';
        echo '</div>';
        echo '</div>';

        // Start Maps
        echo '<div class="accordian-filter">';
        echo '<a href="javascript:void(0);" class="collapse-btn">Collapse All</a>';
        echo '<a href="javascript:void(0);" class="expand-btn">Expand All</a>';
        echo '</div>';

        echo '<div class="accordian-wrapper">';

        // % of districts with regular DIO  - Map charts
        echo '<div class="accordian-item">';
        echo '<div class="accordian-head">';
        echo '<h3>% of districts with regular DIO</h3>';
        echo '</div>';

        echo '<div class="accordian-content">';
        // $per_of_dist_dio_container_map_data = get_highchart_map_data( array(
        //     'title'     => '% of districts with regular DIO',
        //     'container' => 'per_of_dist_dio_container',
        //     'data'      => get_district_map_data_by_key( $getDistrictFormData, 'are_you_posted_as_a_regular_dio', $c_state_id )
        // ) );
        // echo '<div id="per_of_dist_dio_container"></div>';
        // echo '<script>var per_of_dist_dio_container_map = ' . json_encode($per_of_dist_dio_container_map_data) . ';</script>';
        echo '</div>';
        echo '</div>';

        echo '</div>';
    }

    echo '</div>';
    echo '</div>';

endwhile;

get_footer('dashboard');
