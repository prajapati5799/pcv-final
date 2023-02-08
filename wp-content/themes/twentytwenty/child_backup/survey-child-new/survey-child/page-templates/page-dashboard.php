<?php
/**
 * Template Name: My Dashboard
 *
 */
get_header();

    while ( have_posts() ) :
        the_post();

        echo '<section class="main-section">';
            echo '<div class="dashboard-data-list">';
                echo '<div class="container">';

                    echo '<header class="entry-header">';
                        the_title( '<h1 class="entry-title">', '</h1>' );
                    echo '</header>';

                    the_content();

                    global $wpdb;
                    $pre_sql        = "";
                    $c_roles        = get_current_user_roles();
                    $c_user_id      = get_current_user_id();
                    $c_state_id     = get_current_user_state_id();
                    $c_city_id      = get_current_user_city_id();

                    $edit_link_target = ' target="__blank"';
                    $view_link_target = ' target="__blank"';
                    $pdf_link_target = ' target="__blank"';


                    $no_record_found = '<tr>';
                        $no_record_found .= '<td colspan="3" class="align-center">';
                            $no_record_found .= 'No record found!';
                        $no_record_found .= '</td>';
                    $no_record_found .= '</tr>';


                    if( in_array(STATE_USER, $c_roles) ){

                        $state_dashboard = true;

                        $c_city_arr                       = $wpdb->get_row("SELECT * FROM " .STATE_TBL. " WHERE id = '" . $c_state_id . "'", ARRAY_A);
                        
                        if( $c_city_arr && !empty($c_city_arr) ){

                            if( isset($c_city_arr['postal_code']) && !empty($c_city_arr['postal_code']) ){
                                if( in_array($c_city_arr['postal_code'], get_new_states()) ){
                                    $state_dashboard = false;
                                }
                            }

                        }

                        if( $state_dashboard ){

                            echo '<div class="form-filters">';
                                echo '<div class="report_box_main common_box_main">';
                                    echo '<div class="report_box common_box">';
                                        echo '<div class="inner_common_box draft_box">';
                                            echo '<p>' . get_total_district_draft_entries_by_state($c_state_id) . '</p>';
                                            echo '<p>'.__('Draft','nex-forms').'</p>';
                                        echo '</div>';
                                    echo '</div>';

                                    echo '<div class="report_box common_box">';
                                        echo '<div class="inner_common_box completed_box">';
                                            echo '<p>' . get_total_district_submitted_entries_by_state($c_state_id) . '</p>';
                                            echo '<p>'.__('Submitted','nex-forms').'</p>';
                                        echo '</div>';
                                    echo '</div>';

                                    echo '<div class="report_box common_box">';
                                        echo '<div class="inner_common_box pending_box">';
                                            echo '<p>' . get_total_district_pending_entries_by_state($c_state_id) . '</p>';
                                            echo '<p>'.__('Pending','nex-forms').'</p>';
                                        echo '</div>';
                                    echo '</div>';

                                    echo '<div class="report_box common_box">';
                                        echo '<div class="inner_common_box under_review_box">';
                                            echo '<p>' . get_total_district_under_review_entries_by_state($c_state_id) . '</p>';
                                            echo '<p>'.__('Under Review','nex-forms').'</p>';
                                        echo '</div>';
                                    echo '</div>';

                                    echo '<div class="report_box common_box">';
                                        echo '<div class="inner_common_box reviwed_box">';
                                            echo '<p>' . get_total_district_reviewed_entries_by_state($c_state_id) . '</p>';
                                            echo '<p>'.__('Reviewd by State and Submitted','nex-forms').'</p>';
                                        echo '</div>';
                                    echo '</div>';
                                echo '</div>';
                            echo '</div>';

                            echo '<div class="form-filters">';
                                echo '<table>';
                                    echo '<tbody>';
                                        echo '<tr>';
                                            echo '<td>District Submission date:</td>';
                                            echo '<td><input class="form-control"  name="min" id="min" type="text" placeholder="From Date"></td>';
                                            echo '<td><input class="form-control"  name="max" id="max" type="text" placeholder="To Date"></td>';
                                        echo '</tr>';
                                        echo '<tr>';
                                            echo '<td>Final Submission date:</td>';
                                            echo '<td><input class="form-control"  name="fmin" id="fmin" type="text" placeholder="From Date"></td>';
                                            echo '<td><input class="form-control"  name="fmax" id="fmax" type="text" placeholder="To Date"></td>';
                                        echo '</tr>';

                                        echo '<tr>';
                                            echo '<td colspan="2">';
                                                echo '<button  id="districtSearch" type="button" class="btn btn-sm btn-success form-control"><i class="fa fa-search">Search</i>
                                                </button>';
                                            echo '</td>';
                                        echo '</tr>';

                                        echo '<tr>';
                                            echo '<td colspan="2"><form id="download_state_csv" name="download_state_csv" method="POST">
                                                        <input type="hidden" name="username" class="fusername">
                                                        <input type="hidden" name="dst_sub_from" class="dst_sub_from">
                                                        <input type="hidden" name="dst_sub_to" class="dst_sub_to">
                                                        <input type="hidden" name="final_sub_from" class="final_sub_from">
                                                        <input type="hidden" name="final_sub_to" class="final_sub_to">
                                                        <input type="hidden" name="fstate" class="fstate" value="' . get_user_state($c_user_id) . '">
                                                        <input type="submit" class="btn btn-sm btn-success form-control" value="Export state CSV" name="state_csv_download">
                                                    </form>';
                                            echo '<form id="download_city_csv" name="download_city_csv" method="POST">
                                                        <input type="hidden" name="username" class="fusername">
                                                        <input type="hidden" name="dst_sub_from" class="dst_sub_from">
                                                        <input type="hidden" name="dst_sub_to" class="dst_sub_to">
                                                        <input type="hidden" name="final_sub_from" class="final_sub_from">
                                                        <input type="hidden" name="final_sub_to" class="final_sub_to">
                                                        <input type="hidden" name="fstate" class="fstate" value="' . get_user_state($c_user_id) . '">
                                                        <input type="submit" class="btn btn-sm btn-success form-control" value="Export district CSV" name="district_csv_download">
                                                    </form></td>';
                                        echo '</tr>';

                                    echo '</tbody>';
                                echo '</table>';
                            echo '</div>';

                            echo '<div class="dashboard-block">';
                                echo '<div class="table-responsive">';
                                    echo '<table class="table dashboard-table" id="state_datatable">';

                                        echo '<thead>';
                                            echo '<tr>';
                                                echo '<th>State</th>';
                                                echo '<th>District</th>';
                                                echo '<th>District Submitted Date</th>';
                                                echo '<th>Final Submitted Date</th>';
                                                echo '<th>District Status</th>';
                                                echo '<th>Final Status</th>';
                                                echo '<th class="action"></th>';
                                                echo '<th class="action"></th>';
                                                echo '<th class="action"></th>';
                                                echo '<th>DSD</th>';
                                                echo '<th>FSD</th>';
                                            echo '</tr>';
                                        echo '</thead>';

                                        // ===================================================================
                                        // State form accorndig to state
                                        // ===================================================================
                                        /*$user_dis_pre_sql    = $wpdb->prepare('SELECT ID FROM '. USER_TBL . ' as u LEFT JOIN '. USERMETA_TBL . ' as u1 ON u1.user_id = u.ID LEFT JOIN '. USERMETA_TBL . ' as u2 ON u2.user_id = u.ID WHERE (u1.meta_key = "state" AND u1.meta_value = "' . $c_state_id . '") AND (u2.meta_key = "city" AND u2.meta_value = "0") ORDER BY ID DESC');

                                        $state_users          = $wpdb->get_row($user_dis_pre_sql, ARRAY_A);

                                        $state_user_ids       = 0;
                                        if( $state_users && !empty($state_users) ){
                                            $state_user_ids        = $state_users['ID'];
                                        }

                                        $pre_state_sql        = $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE user_id = "' . $state_user_ids . '"');
                                        $state_form           = $wpdb->get_row($pre_state_sql, ARRAY_A);*/

                                        $state      = get_user_state($c_user_id);
                                        $c_user_data = wp_get_current_user();

                                        if( $c_user_data && !empty($c_user_data) && $c_user_data->ID > 0 ){

                                            $pre_sql    = $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE user_id = "' . $c_user_id . '" ORDER BY id DESC');

                                            $results    = $wpdb->get_row($pre_sql, ARRAY_A);

                                            $edit_form_link = get_the_permalink(STATE_FORM);
                                            
                                            echo '<tr>';
                                                echo '<td>';
                                                    echo '<span>' . $state . '</span>';
                                                echo '</td>';
                                                echo '<td>';
                                                    echo '<span>-</span>';
                                                echo '</td>';

                                                if( $results && !empty($results) && $results['is_published'] == "1" ){

                                                    $edit_form_link = get_the_permalink(EDIT_STATE_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                                    $view_form_link = get_the_permalink(VIEW_STATE_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                                    $pdf_form_link = get_the_permalink(PDF_STATE_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                                    echo '<td>';
                                                        echo '<span>' . theme_change_date_format($results['created_at'], "Y-m-d H:i:s", "d M, Y") . '</span>';
                                                    echo '</td>';
                                                    echo '<td>';
                                                        echo '<span>-</span>';
                                                    echo '</td>';
                                                    echo '<td>';
                                                        echo '<span>Completed</span>';
                                                    echo '</td>';
                                                    echo '<td>-</td>';
                                                    echo '<td>-</td>';
                                                    echo '<td class="action">';
                                                        echo '<a href="' . $view_form_link . '" ' . $view_link_target . '><i class="fa fa-eye"></i> View</a>';
                                                    echo '</td>';
                                                    echo '<td class="action">';
                                                        echo '<a href="' . $pdf_form_link . '" ' . $pdf_link_target . '><i class="fa fa-download"></i> Download</a>';
                                                    echo '</td>';
                                                    echo '<td>' . $results['created_at'] . '</td>';
                                                    echo '<td>-</td>';
                                                } else {
                                                    echo '<td>-</td>';
                                                    echo '<td>-</td>';
                                                    echo '<td>Draft</td>';
                                                    echo '<td>-</td>';
                                                    echo '<td class="action"><a href="' . $edit_form_link . '" ' . $edit_link_target . '><i class="fa fa-edit"></i> Edit</a></td>';
                                                    echo '<td class="action">-</td>';
                                                    echo '<td class="action">-</td>';
                                                    echo '<td>-</td>';
                                                    echo '<td>-</td>';
                                                }
                                                
                                            echo '</tr>';
                                            
                                        }

                                        
                                        // ===================================================================
                                        // All District form accorndig to state
                                        // ===================================================================
                                        $user_pre_sql    = $wpdb->prepare('SELECT ID FROM '. USER_TBL . ' as u LEFT JOIN '. USERMETA_TBL . ' as u1 ON u1.user_id = u.ID LEFT JOIN '. USERMETA_TBL . ' as u2 ON u2.user_id = u.ID WHERE (u1.meta_key = "state" AND u1.meta_value = "' . $c_state_id . '") AND (u2.meta_key = "city" AND u2.meta_value > "0") ORDER BY Id DESC');

                                        $users          = $wpdb->get_results($user_pre_sql, ARRAY_A);

                                        if( $users && !empty($users) ){
                                            foreach ( $users as $u_key => $u_id ) {

                                                $pre_sql    = $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE user_id = ' . $u_id['ID'] . ' ORDER BY Id DESC');

                                                $results    = $wpdb->get_row($pre_sql, ARRAY_A);
                                                
                                                echo '<tr>';
                                                    echo '<td>';
                                                        echo '<span>' . $state . '</span>';
                                                    echo '</td>';
                                                    echo '<td>';
                                                        echo '<span>' . get_user_city($u_id['ID']) . '</span>';
                                                    echo '</td>';

                                                    if( $results && !empty($results) && $results['is_published'] == "1" ){

                                                        $edit_form_link = get_the_permalink(EDIT_DISTRICT_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                                        $view_form_link = get_the_permalink(VIEW_DISTRICT_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                                        $pdf_form_link = get_the_permalink(PDF_DISTRICT_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                                        echo '<td>';
                                                            echo '<span>' . theme_change_date_format($results['created_at'], "Y-m-d H:i:s", "d M, Y") . '</span>';
                                                        echo '</td>';

                                                        $edit_form_link_tag = '<a href="' . $edit_form_link . '" ' . $edit_link_target . '><i class="fa fa-edit"></i> Edit</a>';
                                                        $state_status = 'Pending';
                                                        $state_date = '-';
                                                        $state_o_date = '-';

                                                        if( $results['state_status'] == '2' ){
                                                            $state_date = theme_change_date_format($results['updated_at'], "Y-m-d H:i:s", "d M, Y");
                                                            $state_o_date = $results['updated_at'];
                                                            $edit_form_link_tag = 'Reviewed by State and Submitted';
                                                            $state_status = 'Reviewed by State and Submitted';
                                                        } else if( $results['state_status'] == '1' ){
                                                            $state_status = 'Under Review';
                                                        }

                                                        echo '<td>';
                                                            echo '<span>' . $state_date . '</span>';
                                                        echo '</td>';
                                                        echo '<td>';
                                                            echo '<span>Completed</span>';
                                                        echo '</td>';
                                                        echo '<td>';
                                                            echo '<span>' . $state_status . '</span>';
                                                        echo '</td>';
                                                        echo '<td class="action">';
                                                            echo $edit_form_link_tag;
                                                        echo '</td>';
                                                        echo '<td class="action">';
                                                            echo '<a href="' . $view_form_link . '" ' . $view_link_target . '><i class="fa fa-eye"></i> View</a>';
                                                        echo '</td>';
                                                        echo '<td class="action">';
                                                            echo '<a href="' . $pdf_form_link . '" ' . $pdf_link_target . '><i class="fa fa-download"></i> Download</a>';
                                                        echo '</td>';
                                                        echo '<td>' . $results['created_at'] . '</td>';
                                                        echo '<td>' . $state_o_date . '</td>';
                                                    } else {
                                                        echo '<td>-</td>';
                                                        echo '<td>-</td>';
                                                        echo '<td>Draft</td>';
                                                        echo '<td>-</td>';
                                                        echo '<td class="action">-</td>';
                                                        echo '<td class="action">-</td>';
                                                        echo '<td class="action">-</td>';
                                                        echo '<td>-</td>';
                                                        echo '<td>-</td>';
                                                    }

                                                echo '</tr>';

                                            }
                                        }
                                        
                                    echo '</table>';

                                echo '</div>';
                            echo '</div>';
                            
                        } else {

                            $c_user_data = wp_get_current_user();
    
                            echo '<div class="dashboard-block">';
                                echo '<div class="table-responsive">';
                                    echo '<table class="table dashboard-table">';
    
                                        if( $c_user_data && !empty($c_user_data) && $c_user_data->ID > 0 ){
    
                                            $pre_sql    = $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE user_id = "' . $c_user_id . '" AND nex_form_id > 0');
    
                                            $results    = $wpdb->get_row($pre_sql, ARRAY_A);
    
                                            $edit_form_link = get_the_permalink(STATE_FORM);
                                            
                                            echo '<tr>';

                                                echo '<td class="action">' . get_user_state($c_user_id) . '</td>';
    
                                                if( $results && !empty($results) && $results['is_published'] == '1' ){
    
                                                    $view_form_link = get_the_permalink(VIEW_STATE_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];
    
                                                    $pdf_form_link = get_the_permalink(PDF_STATE_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];
    
                                                    echo '<td>';
                                                        echo '<b>Submitted Date:</b>';
                                                        echo '<span>' . theme_change_date_format($results['created_at'], "Y-m-d H:i:s", "d M, Y") . '</span>';
                                                    echo '</td>';
                                                    echo '<td class="action">-</td>';
                                                    echo '<td class="action">';
                                                        echo '<a href="' . $view_form_link . '" ' . $view_link_target . '><i class="fa fa-eye"></i> View</a>';
                                                    echo '</td>';
                                                    echo '<td class="action">';
                                                        echo '<a href="' . $pdf_form_link . '" ' . $pdf_link_target . '><i class="fa fa-download"></i> Download</a>';
                                                    echo '</td>';
                                                } else {
                                                    echo '<td class="action">';
                                                        echo '<a href="' . $edit_form_link . '" ' . $edit_link_target . '><i class="fa fa-edit"></i> Edit</a>';
                                                    echo '</td>';
                                                    echo '<td class="action">-</td>';
                                                    echo '<td class="action">-</td>';
                                                }
                                                
                                            echo '</tr>';
                                            
                                        } else {
                                            echo $no_record_found;
                                        }
                                        
                                    echo '</table>';
    
                                echo '</div>';
                            echo '</div>';

                        }
                        
                    } else if( in_array(DISTICT_USER, $c_roles) ){

                        $c_user_data = wp_get_current_user();

                        echo '<div class="dashboard-block">';
                            echo '<div class="table-responsive">';
                                echo '<table class="table dashboard-table">';

                                    if( $c_user_data && !empty($c_user_data) && $c_user_data->ID > 0 ){

                                        $pre_sql    = $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE user_id = "' . $c_user_id . '" AND nex_form_id > 0');

                                        $results    = $wpdb->get_row($pre_sql, ARRAY_A);

                                        $edit_form_link = get_the_permalink(DISTRICT_FORM);
                                        
                                        echo '<tr>';

                                            if( $results && !empty($results) && $results['is_published'] == '1' ){

                                                $view_form_link = get_the_permalink(VIEW_DISTRICT_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                                $pdf_form_link = get_the_permalink(PDF_DISTRICT_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                                echo '<td>';
                                                    echo '<b>Submitted Date:</b>';
                                                    echo '<span>' . theme_change_date_format($results['created_at'], "Y-m-d H:i:s", "d M, Y") . '</span>';
                                                echo '</td>';
                                                echo '<td class="action">-</td>';
                                                echo '<td class="action">';
                                                    echo '<a href="' . $view_form_link . '" ' . $view_link_target . '><i class="fa fa-eye"></i> View</a>';
                                                echo '</td>';
                                                echo '<td class="action">';
                                                    echo '<a href="' . $pdf_form_link . '" ' . $pdf_link_target . '><i class="fa fa-download"></i> Download</a>';
                                                echo '</td>';
                                            } else {
                                                echo '<td class="action">' . get_user_city($c_user_id) . '</td>';
                                                echo '<td class="action">';
                                                    echo '<a href="' . $edit_form_link . '" ' . $edit_link_target . '><i class="fa fa-edit"></i> Edit</a>';
                                                echo '</td>';
                                                echo '<td class="action">-</td>';
                                                echo '<td class="action">-</td>';
                                            }
                                            
                                        echo '</tr>';
                                        
                                    } else {
                                        echo $no_record_found;
                                    }
                                    
                                echo '</table>';

                            echo '</div>';
                        echo '</div>';

                    }

                echo '</div>';
            echo '</div>';
        echo '</section>';

    endwhile;

get_sidebar();
get_footer();