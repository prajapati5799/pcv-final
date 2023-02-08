<?php

/**
 * Template Name: My Dashboard Inner
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

    echo '<div id="loader">';
    echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/loader.gif">';
    echo '</div>';

    echo '<div class="block-title">';
    echo '<h2>' . get_the_title() . '</h2>';
    echo '</div>';

    if (in_array(ADMIN, $c_roles)) {

        echo '<form name="analytics_form" id="analytics_form">';

        echo '<input type="hidden" name="action" value="action_get_analytics_data">';
        echo '<input type="hidden" name="export_type" value="">';
        wp_nonce_field('analytics-data', '_nonce');

        echo '<select class="analytics-fields" name="report_theme" id="report_theme">';
        echo '<option value="">Select Theme</option>';
        echo '<option value="profile" data-label="Profile">Profile</option>';
        echo '<option value="bi" data-label="Background Information">Background Information</option>';
        echo '<option value="ccvl" data-label="Cold Chain and Vaccine Logistics">Cold Chain and Vaccine Logistics</option>';
        echo '<option value="prs" data-label="Program Review & Supervision">Program Review & Supervision</option>';
        echo '<option value="ds" data-label="Disease Surveillance">Disease Surveillance</option>';
        echo '</select>';

        echo '<select class="analytics-fields" name="report_indicator" id="report_indicator"></select>';

        echo '<select class="analytics-fields" name="report_state" id="report_state"></select>';

        echo '<select class="analytics-fields" name="report_year" id="report_year"></select>';

        echo '<select class="analytics-fields" name="report_ch_district" id="report_ch_district"></select>';
        echo '</form>';

        echo '<br/>';
        //echo '<br/>';

        echo '<div id="comming_soon_div">';
        echo get_coming_soon_template();
        echo '</div>';

        echo '<div id="blank_image_div">';
        echo '<img src="' . get_field('dashboard_image') . '" />';
        echo '</div>';

        echo '<div id="analytics_div">';
        echo '<div class="analytics-charts">';

        echo '<div class="row">';

        echo '<div class="col-md-12">';
        echo '<h4 id="chart_title"></h4>';
        echo '</div>';

        echo '<div class="col-md-6">';
        echo '<div id="map_state_container"></div>';
        echo '<div id="map_district_container"></div>';
        echo '<div id="map_district_indicator">';
        echo '<button class="district_points" data-color="" data-text="text.text-1" data-path="path.path-1"><span>&nbsp;</span>1</button>';
        echo '<button class="district_points" data-color="" data-text="text.text-2" data-path="path.path-2"><span>&nbsp;</span>1</button>';
        echo '<button class="district_points" data-color="" data-text="text.text-3" data-path="path.path-3"><span>&nbsp;</span>1</button>';
        echo '<button class="district_points" data-color="" data-text="text.text-4" data-path="path.path-4"><span>&nbsp;</span>1</button>';
        echo '</div>';
        echo '</div>';

        echo '<div class="col-md-6">';
        echo '<div id="horizontal_container"></div>';
        echo '</div>';

        echo '<div class="col-md-6">';
        echo '<div id="another_horizontal_container"></div>';
        echo '</div>';

        echo '<div class="col-md-6">';
        echo '<div id="bubble_container"></div>';
        echo '</div>';

        echo '</div>';

        echo '<div class="row">';
        echo '<div class="col-md-6">';
        echo '<div id="profile_state_container"></div>';
        echo '</div>';
        echo '<div class="col-md-6">';
        echo '<div id="distrcit_cold_chain_container"></div>';
        echo '</div>';
        echo '</div>';

        echo '</div>';
        echo '</div>';
    } else if (in_array(STATE_USER, $c_roles)) {
        echo get_coming_soon_template();
    }

    echo '</div>';
    echo '</div>';

endwhile;

get_footer('dashboard');
