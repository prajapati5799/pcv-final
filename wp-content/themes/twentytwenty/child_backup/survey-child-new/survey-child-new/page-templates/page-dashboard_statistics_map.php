<?php
/**
 * Template Name: My Dashboard Statistic Map
 *
 */
dashboard_validation([ADMIN, STATE_USER]);
get_header('dashboard');

    while ( have_posts() ) :
        the_post();

        $c_roles        = get_current_user_roles();
        $c_user_id      = get_current_user_id();
        $c_state_id     = get_current_user_state_id();
        $c_city_id      = get_current_user_city_id();

        // $statistic_state_map_menu = [
        //     "title" => "% coverage of different antigens"
        // ];

        

        echo '<div class="content-blocks">';
            echo '<div class="dashboard-block">';
                
                echo '<div class="block-title">';
                    echo '<h2>' . get_the_title() . '</h2>';
                echo '</div>';

                if( in_array(ADMIN, $c_roles) ){

                    echo '<div class="map-with-sidebar">';
                        echo '<div class="map-sidebar">';
                            echo '<ul id="statistic_map_selection">';
                                    echo '<li><a href="#">% coverage of different antigens</a>';
                                        echo '<ul class="sub">';
                                            echo '<li><a href="#">Penta-1/DPT-1- (%) Coverage- HMIS 2019-2020</a></li>';
                                            echo '<li><a href="#">Penta-1/DPT-1 Concurrent monitoring-2019-2020</a></li>';
                                            echo '<li><a href="#">Penta-3/DPT-3- (%) Coverage- HMIS 2019-2020</a></li>';
                                            echo '<li><a href="#">Penta-3/DPT-3 Evaluated-NFHS-4</a></li>';
                                            echo '<li><a href="#">Penta-3/DPT-3 Concurrent monitoring-2019-2020</a></li>';
                                            echo '<li><a href="#">MR-1- (%) Coverage- HMIS 2019-2020</a></li>';
                                            echo '<li><a href="#">MR 1/ Measles Evaluated-NFHS-4</a></li>';
                                            echo '<li><a href="#">MR-1 Concurrent monitoring-2019-2020</a></li>';
                                            echo '<li><a href="#">State drop out rate reported-HMIS for Penta-1 to Penta -3</a></li>';
                                            echo '<li><a href="#">State drop out rate reported-HMIS for Penta-3 to MR 1</a></li>';
                                        echo '</ul>';
                                    echo '</li>';
                                    echo '<li><a href="#">RI Micro-planning status</a>';
                                        echo '<ul class="sub">';
                                            echo '<li><a href="#">% of districts that have submitted updated RI micro-plans to state/UT for 2020-21</a></li>';
                                            echo '<li><a href="#">% of sessions planned /Held-HMIS 2019-2020</a></li>';
                                        echo '</ul>';
                                    echo '</li>';
                                    echo '<li><a href="#">IMI/e-GSA</a>';
                                        echo '<ul class="sub">';
                                            echo '<li><a href="#">No. of Districts covered under IMI</a></li>';
                                        echo '</ul>';
                                    echo '</li>';
                                    echo '<li><a href="#">RI Training Status</a>';
                                        echo '<ul class="sub">';
                                            echo '<li><a href="#">% of MO trained on Mo Handbook</a></li>';
                                        echo '</ul>';
                                    echo '</li>';
                                    echo '<li><a href="#">Vaccine Coverage & Wastage</a>';
                                        echo '<ul class="sub">';
                                            echo '<li><a href="#">Vaccine wastage for Penta 2018-19</a></li>';
                                            echo '<li><a href="#">Vaccine wastage for Penta 2019-20</a></li>';
                                        echo '</ul>';
                                    echo '</li>';
                                    echo '<li><a href="#">Vaccine and Logistics Management</a>';
                                        echo '<ul class="sub">';
                                            echo '<li><a href="#">No. of vaccine vans available at state/UT level that are functional</a></li>';
                                            echo '<li><a href="#">No. of vaccine vans available in the districts</a></li>';
                                        echo '</ul>';
                                    echo '</li>';
                                    echo '<li><a href="#">Waste Management & Injection Safety</a>';
                                        echo '<ul class="sub">';
                                            echo '<li><a href="#">What is the mechanism of waste disposal system in districts?</a></li>';
                                        echo '</ul>';
                                    echo '</li>';
                                    echo '<li><a href="#">Surveillance</a>';
                                        echo '<ul class="sub">';
                                            echo '<li><a href="#">% of districts that have not reported any case of diphtheria, tetanus or pertussis 2019-20</a></li>';
                                            echo '<li><a href="#">% of districts that have not reported any case of diphtheria, tetanus or pertussis 2020-21</a></li>';
                                            echo '<li><a href="#">% of  silent districts from where no AFP cases have been reported? 2019-20</a></li>';
                                            echo '<li><a href="#">% of  silent districts from where no AFP cases have been reported? 2020-21</a></li>';
                                            echo '<li><a href="#">% of districts reported Measles/Rubella/Mixed outbreaks? 2019-20</a></li>';
                                            echo '<li><a href="#">% of districts reported Measles/Rubella/Mixed outbreaks? 2020-21</a></li>';
                                        echo '</ul>';
                                    echo '</li>';
                                    echo '<li><a href="#">Cold Chain Maintenance</a>';
                                        echo '<ul class="sub">';
                                            echo '<li><a href="#">% of CCP with eVIN functional</a></li>';
                                            echo '<li><a href="#">% of vacancy agaunst sanctioned position of ref mechanic - Sanctioned</a></li>';
                                            echo '<li><a href="#">% of vacancy agaunst sanctioned position of ref mechanic - Currently Posted</a></li>';
                                        echo '</ul>';
                                    echo '</li>';
                                echo '</ul>';
                            echo '</div>';
                            echo '<div class="map-graph-view">';
                                echo '<div id="container" style="height: 600px; min-width: 310px; max-width: 800px; margin: 0 auto"></div>';
                            echo '</div>';
                        echo '</div>';
                    echo '</div>';

                    // $statistic_state_map_menu = array(
                    //     array(
                    //         "title" => "% coverage of different antigens",
                    //         "sub_menu" => array(
                    //             array(
                    //                 "title" => "Penta-1/DPT-1- (%) Coverage- HMIS 2019-2020",
                    //                 "onclick" => "HMIS_2019-2020",
                    //             ),
                    //             array(
                    //                 "title" => "Penta-1/DPT-1 Concurrent monitoring-2019-2020",
                    //                 "onclick" => "HMIS_2019-2020",
                    //             ),
                    //         )
                    //     ),
                    //     array(
                    //         "title" => "% coverage of different antigens 1",
                    //         "sub_menu" => array(
                    //             array(
                    //                 "title" => "Penta-1/DPT-1- (%) Coverage- HMIS 2019-2020 1",
                    //                 "onclick" => "HMIS_2019-2020",
                    //             ),
                    //             array(
                    //                 "title" => "Penta-1/DPT-1 Concurrent monitoring-2019-2020 1",
                    //                 "onclick" => "HMIS_2019-2020",
                    //             ),
                    //         )
                    //     )
                    // );
            
                    // foreach($statistic_state_map_menu as $menu){
                    //     if( isset($menu['sub_menu']) && !empty($menu['sub_menu']) ){
                    //         foreach($menu['sub_menu'] as $sub_menu){
                    //         }
                    //     }
                    // }
                    // die;

                    // echo '<select name="statistic_map_selection" id="statistic_map_selection">';
                    //     echo '<option value="no_of_districts_that_have_submitted_updated_ri_micro-plans_to_state_for_2020_21">% of districts that have submitted updated RI micro-plans to state/UT for 2020-21</option>';
                    //     echo '<option value="sessions_held_against_planned_as_per_hmis_during_2019_20">% of sessions planned /Held-HMIS 2019-2020</option>';
                    // echo '</select>';

                    // echo '<div class="accordian-content">';
                    //     $no_of_ri_micro_to_state_2020_21_container_map_data = get_highchart_map_data( array(
                    //         'title'     => '% of districts that have submitted updated RI micro-plans to state/UT for 2020-21',
                    //         'container' => 'no_of_ri_micro_to_state_2020_21_container',
                    //         'data'      => get_state_map_data_by_key('no_of_districts_that_have_submitted_updated_ri_micro-plans_to_state_for_2020_21')
                    //     ) );
                    //     echo '<div id="statistic_map_container"></div>';
                    //     echo '<script>var statistic_map_settings = ' . json_encode($no_of_ri_micro_to_state_2020_21_container_map_data) . ';</script>';
                    // echo '</div>';

                } else if( in_array(STATE_USER, $c_roles) ){
                    $getDistrictFormData   = get_district_form_results();
                    echo get_coming_soon_template();
                }

            echo '</div>';
        echo '</div>';
    endwhile;

get_footer('dashboard');