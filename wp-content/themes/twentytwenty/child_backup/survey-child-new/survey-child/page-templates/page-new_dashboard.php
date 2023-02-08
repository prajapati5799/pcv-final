<?php
/**
 * Template Name: My Dashboard with Filters
 *
 */
dashboard_validation([ADMIN, STATE_USER, DISTICT_USER]);
get_header('dashboard');

    while ( have_posts() ) :
        the_post();

        echo '<div class="content-blocks">';

        $pre_sql        = "";
        $c_roles        = get_current_user_roles();
        $c_user_id      = get_current_user_id();
        $c_state_id     = get_current_user_state_id();
        $c_city_id      = get_current_user_city_id();

        $edit_link_target = ' target="__blank"';
        $view_link_target = ' target="__blank"';
        $pdf_link_target = ' target="__blank"';

        //echo '<div class="block-title"><h2>Dashboard</h2></div>';

        echo '<div class="block-title">';
            echo '<h2>' . get_the_title() . '</h2>';
        echo '</div>';

        

        if( in_array(ADMIN, $c_roles) ){

            echo '<div class="dashboard-block">';
                echo '<div class="row">';
                
                    echo '<div class="col-lg-7">';
                        $dashboard = new NEXForms_dashboard();
                        echo $dashboard->form_analytics();
                    echo '</div>';

                    $dp_draft = get_total_district_draft_entries();
                    $dp_submitted = get_total_district_submitted_entries();
                    $dp_pending = get_total_district_pending_entries();
                    $dp_under_review = get_total_district_under_review_entries();
                    $dp_reviewd = get_total_district_reviewed_entries();

                    $sp_draft = get_total_state_pending_entries();
                    $sp_submitted = get_total_state_submitted_entries();

                    echo '<div class="col-lg-5 dashboard-right-blk">';
                        echo '<div class="row stats">';
                            // echo '<div class="col-md-3 col-xs-4 col-lg-4">';
                            //     echo '<span class="big_txt">' . $dp_draft . '</span>';
                            //     echo '<label style="color:#e29578;">Draft</label> ';
                            // echo '</div>';
                            
                            // echo '<div class="col-md-3 col-xs-4 col-lg-4" >';
                            //     echo '<span class="big_txt">' . $dp_submitted . '</span>';
                            //     echo '<label style="color:#8BC34A;">Submitted</label> ';
                            // echo '</div>';
                            
                            // echo '<div class="col-md-3 col-xs-4 col-lg-4" >';
                            //     echo '<span class="big_txt">' . $dp_pending . '</span>';
                            //     echo '<label style="color:#F57C00;">Pending</label> ';
                            // echo '</div>';
                            
                            // echo '<div class="col-md-3 col-xs-4 col-lg-4" >';
                            //     echo '<span class="big_txt">' . $dp_under_review . '</span>';
                            //     echo '<label style="color:#83c5be;">Under Review</label> ';
                            // echo '</div>';
                            
                            // echo '<div class="col-md-3 col-xs-4 col-lg-8" >';
                            //     echo '<span class="big_txt">' . $dp_reviewd . '</span>';
                            //     echo '<label style="color:#1976D2;">Reviewed by State and Submitted</label>';
                            // echo '</div>';

                            echo '<div class="col-md-1 col-xs-4 col-lg-3">';
                                echo '<span class="big_txt">&nbsp;</span>';
                                echo '<label style="color:#e29578;">&nbsp;</label> ';
                            echo '</div>';

                            echo '<div class="col-md-4 col-xs-4 col-lg-4">';
                                echo '<span class="big_txt">' . $sp_draft . '</span>';
                                echo '<label style="color:#e29578;">Draft</label> ';
                            echo '</div>';
                            
                            echo '<div class="col-md-4 col-xs-4 col-lg-4" >';
                                echo '<span class="big_txt">' . $sp_submitted . '</span>';
                                echo '<label style="color:#8BC34A;">Submitted</label> ';
                            echo '</div>';

                            echo '<div class="col-md-2 col-xs-4 col-lg-1">';
                                echo '<span class="big_txt">&nbsp;</span>';
                                echo '<label style="color:#e29578;">&nbsp;</label> ';
                            echo '</div>';
                        
                        echo '</div>';

                        echo '<canvas id="chart_canvas1" height="136px" ></canvas>';
                        //echo '<script>var dashboard_pie_record = [' . $dp_draft . ', ' . $dp_submitted . ', ' . $dp_pending . ', ' . $dp_under_review . ', ' . $dp_reviewd . '];</script>';
                        echo '<script>var dashboard_pie_record = [' . $sp_draft . ', ' . $sp_submitted . '];</script>';
                    echo '</div>';

                echo '</div>';
            echo '</div>';


            $allStateQuery      = 'SELECT * FROM '. STATE_TBL . ' ORDER BY state ASC';
            $allStates          = $wpdb->get_results($allStateQuery, ARRAY_A);
        
            echo '<div class="dashborad-date-search">';
                echo '<div class="dd-row">';
                    echo '<div class="dd-item dd-item-left">';
                        echo '<h4>State</h4>';
                        echo '<div class="date-boxes">';
                            echo '<div class="date-col">';
                                 echo '<label>Select Your State</label>';
                                echo '<select class="form-control"  name="dashboard_state_filter" id="dashboard_state_filter">';
                                    echo '<option value=" ">State</option>';
                                    if( $allStates ):
                                        foreach ( $allStates as $st ) {
                                            echo '<option value="'.$st['state'].'">'.$st['state'].'</option>';
                                        }
                                    endif;
                                echo '</select>';
                            echo '</div>';
                        echo '</div>';
                    echo '</div>';
                    echo '<div class="dd-item dd-item-right">';
                        echo '<h4>District Submission Date</h4>';
                        echo '<div class="date-boxes">';
                            echo '<div class="date-col">';
                                echo '<label>From date</label>';
                                echo '<input type="text" class="dashboard-date" name="date-district-min" id="date-district-min" placeholder="dd/mm/yy">';
                            echo '</div>';
                            echo '<div class="date-col">';
                                echo '<label>To date</label>';
                                echo '<input type="text" class="dashboard-date" name="date-district-max" id="date-district-max" placeholder="dd/mm/yy">';
                            echo '</div>';
                        echo '</div>';
                    echo '</div>';
                    echo '<div class="dd-btn-col">';
                        echo '<button type="search" class="search-btn" id="dashboard-filter-btn">';
                            echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-search.svg">';
                            echo 'Search';
                        echo '</button>';
                        echo '<a class="advance-search-link" href="javascript:void(0)"><i class="fa fa-plus"></i> Advance Search</a>';
                    echo '</div>';  

                echo '</div>';

                echo '<div class="dd-row advance-dd-row">';
                    echo '<div class="dd-item dd-item-left">';
                        echo '<h4>Keyword</h4>';
                        echo '<div class="date-boxes">';
                            echo '<div class="date-col">';
                                //echo '<label>Search</label>';
                                echo '<input type="text" class="search-string dashboard-date" name="dashboard-search-string" id="dashboard-search-string" placeholder="">';
                            echo '</div>';
                        echo '</div>';
                    echo '</div>';

                    echo '<div class="dd-item dd-item-right">';
                        echo '<h4>Final Submission Date</h4>';
                        echo '<div class="date-boxes">';
                            echo '<div class="date-col">';
                                echo '<label>From date</label>';
                                echo '<input type="text" class="dashboard-date" name="date-final-min" id="date-final-min" placeholder="dd/mm/yy">';
                            echo '</div>';
                            echo '<div class="date-col">';
                                echo '<label>To date</label>';
                                echo '<input type="text" class="dashboard-date" name="date-final-max" id="date-final-max" placeholder="dd/mm/yy">';
                            echo '</div>';
                        echo '</div>';
                    echo '</div>';

                echo '</div>';

            echo '</div>';

            echo '<div class="dashborad-search-result">';

                echo '<div class="search-result-head">';

                    echo '<form id="download_state_csv" name="download_state_csv" method="POST">';
                        echo '<input type="hidden" name="username" class="fusername">';
                        echo '<input type="hidden" name="dst_sub_from" class="dst_sub_from">';
                        echo '<input type="hidden" name="dst_sub_to" class="dst_sub_to">';
                        echo '<input type="hidden" name="final_sub_from" class="final_sub_from">';
                        echo '<input type="hidden" name="final_sub_to" class="final_sub_to">';
                        echo '<input type="hidden" name="fstate" class="fstate">';
                        echo '<button type="submit" class="export-btn" name="state_csv_download">';
                            echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-export.svg">';
                            echo '<span>Export state CSV</span>';
                        echo '</button>';
                    echo '</form>';

                    echo '<form id="download_city_csv" name="download_city_csv" method="POST">';
                        echo '<input type="hidden" name="username" class="fusername">';
                        echo '<input type="hidden" name="dst_sub_from" class="dst_sub_from">';
                        echo '<input type="hidden" name="dst_sub_to" class="dst_sub_to">';
                        echo '<input type="hidden" name="final_sub_from" class="final_sub_from">';
                        echo '<input type="hidden" name="final_sub_to" class="final_sub_to">';
                        echo '<input type="hidden" name="fstate" class="fstate">';
                        echo '<button type="submit" class="export-btn" name="district_csv_download">';
                            echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-export.svg">';
                            echo '<span>Export district CSV</span>';
                        echo '</button>';
                    echo '</form>';
                    
                echo '</div>';

                echo '<div class="table-responsive search-result-content">';
                    echo '<table class="table dashboard-table" id="admin_dashboard_tbl">';

                        $user_pre_sql    = $wpdb->prepare("SELECT DISTINCT ID FROM " . USER_TBL . " as u LEFT JOIN ". USERMETA_TBL . " as u1 ON u1.user_id = u.ID LEFT JOIN ". USERMETA_TBL . " as u2 ON u2.user_id = u.ID WHERE (u1.meta_key = 'state' AND u1.meta_value > '0' ) AND ( u2.meta_key = 'sur_capabilities' AND u2.meta_value NOT LIKE '%\"".ADMIN."\"%' ) ORDER BY Id DESC");

                        $users          = $wpdb->get_results($user_pre_sql, ARRAY_A);

                        if( $users && !empty($users) ){

                            echo '<thead>';
                                echo '<tr>';
                                    echo '<th>State</th>';
                                    echo '<th>District</th>';
                                    echo '<th>District Date Submitted</th>';
                                    echo '<th>Final Date Submitted</th>';
                                    echo '<th>District Status</th>';
                                    echo '<th>Final Status</th>';
                                    echo '<th></th>';
                                    echo '<th></th>';
                                    echo '<th></th>';
                                echo '</tr>';
                            echo '</thead>';

                            foreach ( $users as $u_key => $u_id ) {

                                $userData = get_userdata( $u_id['ID'] );

                                $query = 'SELECT DISTINCT user_id,nex_form_id,record_id,form_data,files_data,is_published,state_status,created_at,updated_at FROM '.NEX_FORM_TEMP_ENTRY_TBL.' WHERE user_id = ' . $u_id['ID'] . ' AND nex_form_id > "0" ORDER BY id DESC';
                            
                                $pre_sql    = $wpdb->prepare( $query );

                                $results    = $wpdb->get_row($pre_sql, ARRAY_A);
                                
                                echo '<tr>';
                                    echo '<td>';                                 
                                        echo '<span>' . get_user_state($u_id['ID']) . '</span>';
                                    echo '</td>';

                                    echo '<td>';
                                        echo '<span>' . get_user_city($u_id['ID']) . '</span>';
                                    echo '</td>';

                                    if( $results && !empty($results) && $results['is_published'] == '1' ){

                                        $edit_form_link = get_the_permalink(EDIT_STATE_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                        $view_form_link = get_the_permalink(VIEW_STATE_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                        $pdf_form_link = get_the_permalink(PDF_STATE_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];
                                        
                                        $state_date = '-';
                                        $state_status = '-';

                                        // If form is dristrict
                                        if( $results['nex_form_id'] == DISTRICT_FORM_ID ){

                                            $edit_form_link = get_the_permalink(EDIT_DISTRICT_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];
                                        
                                            $view_form_link = get_the_permalink(VIEW_DISTRICT_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                            $pdf_form_link = get_the_permalink(PDF_DISTRICT_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];
                                            
                                            $state_date = '-';
                                            $state_status = 'Pending';

                                            if( $results['state_status'] == '2' ){
                                                $state_date = $results['updated_at'];
                                                $state_status = 'Reviewed by State and Submitted';
                                            } else if( $results['state_status'] == '1' ){
                                                $state_status = 'Under Review';
                                            }
                                        }

                                        echo '<td>';
                                            echo '<span>'.$results['created_at']. '</span>';
                                        echo '</td>';
                                        echo '<td>';
                                            echo '<span>' .$state_date. '</span>';
                                        echo '</td>';

                                        echo '<td><span>Completed</span></td>';
                                        echo '<td><span>' . $state_status . '</span></td>';

                                        echo '<td>';
                                            echo '<a href="' . $view_form_link . '" ' . $view_link_target . '><i class="fa fa-eye"></i> View</a>';
                                        echo '</td>';

                                        echo '<td>';
                                            echo '<a href="' . $edit_form_link . '" ' . $edit_link_target . '><i class="fa fa-pencil"></i> Edit</a>';
                                        echo '</td>';

                                        echo '<td>';
                                            echo '<a href="' . $pdf_form_link . '" ' . $pdf_link_target . '><i class="fa fa-download"></i> Download</a>';
                                        echo '</td>';

                                    } else {

                                        echo '<td>-</td>';
                                        echo '<td>-</td>';
                                        echo '<td>';
                                            echo '<span>Draft</span>';
                                        echo '</td>';
                                        echo '<td>';
                                            echo '<span>-</span>';
                                        echo '</td>';

                                        echo '<td>-</td>';
                                        echo '<td>-</td>';
                                        echo '<td>-</td>';
                                    }

                                    
                                echo '</tr>';
                                
                            }
                        }                                    
                    echo '</table>';

                echo '</div>';

            echo '</div>';

        } else if( in_array(STATE_USER, $c_roles) ){

            echo '<div class="dashboard-block">';
            
                echo '<div class="dashboard-statistics">';
                    echo '<div class="statistic-row">';
                        
                        echo '<div class="statistic-col">';
                            echo '<div class="statistic-box">';
                                echo '<h6>Draft</h6>';
                                echo '<div class="count-with-icon">';
                                    echo '<span>' . get_total_district_draft_entries_by_state($c_state_id) . '</span>';
                                    echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-draft.svg">';
                                echo '</div>';
                            echo '</div>';
                        echo '</div>';
                        
                        echo '<div class="statistic-col">';
                            echo '<div class="statistic-box">';
                                echo '<h6>Submitted</h6>';
                                echo '<div class="count-with-icon">';
                                    echo '<span>' . get_total_district_submitted_entries_by_state($c_state_id) . '</span>';
                                    echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-file.svg">';
                                echo '</div>';
                            echo '</div>';
                        echo '</div>';
                        
                        echo '<div class="statistic-col">';
                            echo '<div class="statistic-box">';
                                echo '<h6>Pending</h6>';
                                echo '<div class="count-with-icon">';
                                    echo '<span>' . get_total_district_pending_entries_by_state($c_state_id) . '</span>';
                                    echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-pending.svg">';
                                echo '</div>';
                            echo '</div>';
                        echo '</div>';
                        
                        echo '<div class="statistic-col">';
                            echo '<div class="statistic-box">';
                                echo '<h6>Under Review</h6>';
                                echo '<div class="count-with-icon">';
                                    echo '<span>' . get_total_district_under_review_entries_by_state($c_state_id) . '</span>';
                                    echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-review.svg">';
                                echo '</div>';
                            echo '</div>';
                        echo '</div>';
                        
                        echo '<div class="statistic-col">';
                            echo '<div class="statistic-box">';
                                echo '<h6>Reviewed by State and Submitted</h6>';
                                echo '<div class="count-with-icon">';
                                    echo '<span>' . get_total_district_reviewed_entries_by_state($c_state_id) . '</span>';
                                    echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-submited.svg">';
                                echo '</div>';
                            echo '</div>';
                        echo '</div>';

                    echo '</div>';
                echo '</div>';

            echo '</div>';
        
            echo '<div class="dashborad-date-search">';
                echo '<div class="dd-row">';
                    
                    echo '<div class="dd-item">';
                        echo '<h4>District Submission Date</h4>';
                        echo '<div class="date-boxes">';
                            echo '<div class="date-col">';
                                echo '<label>From date</label>';
                                echo '<input type="text" class="dashboard-date" name="date-district-min" id="date-district-min" placeholder="dd/mm/yy">';
                            echo '</div>';
                            echo '<div class="date-col">';
                                echo '<label>To date</label>';
                                echo '<input type="text" class="dashboard-date" name="date-district-max" id="date-district-max" placeholder="dd/mm/yy">';
                            echo '</div>';
                        echo '</div>';
                    echo '</div>';

                    echo '<div class="dd-item">';
                        echo '<h4>Final Submission Date</h4>';
                        echo '<div class="date-boxes">';
                            echo '<div class="date-col">';
                                echo '<label>From date</label>';
                                echo '<input type="text" class="dashboard-date" name="date-final-min" id="date-final-min" placeholder="dd/mm/yy">';
                            echo '</div>';
                            echo '<div class="date-col">';
                                echo '<label>To date</label>';
                                echo '<input type="text" class="dashboard-date" name="date-final-max" id="date-final-max" placeholder="dd/mm/yy">';
                            echo '</div>';
                        echo '</div>';
                    echo '</div>';

                    echo '<div class="dd-btn-col">';
                        echo '<button type="search" class="search-btn" id="dashboard-filter-btn">';
                            echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-search.svg">';
                            echo 'Search';
                        echo '</button>';
                    echo '</div>';

                echo '</div>';
            echo '</div>';

            echo '<div class="dashborad-search-result">';

                echo '<div class="search-result-head">';

                    echo '<form id="download_state_csv" name="download_state_csv" method="POST">';
                        echo '<input type="hidden" name="username" class="fusername">';
                        echo '<input type="hidden" name="dst_sub_from" class="dst_sub_from">';
                        echo '<input type="hidden" name="dst_sub_to" class="dst_sub_to">';
                        echo '<input type="hidden" name="final_sub_from" class="final_sub_from">';
                        echo '<input type="hidden" name="final_sub_to" class="final_sub_to">';
                        echo '<input type="hidden" name="fstate" class="fstate">';
                        echo '<button type="submit" class="export-btn" name="state_csv_download">';
                            echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-export.svg">';
                            echo '<span>Export state CSV</span>';
                        echo '</button>';
                    echo '</form>';

                    echo '<form id="download_city_csv" name="download_city_csv" method="POST">';
                        echo '<input type="hidden" name="username" class="fusername">';
                        echo '<input type="hidden" name="dst_sub_from" class="dst_sub_from">';
                        echo '<input type="hidden" name="dst_sub_to" class="dst_sub_to">';
                        echo '<input type="hidden" name="final_sub_from" class="final_sub_from">';
                        echo '<input type="hidden" name="final_sub_to" class="final_sub_to">';
                        echo '<input type="hidden" name="fstate" class="fstate">';
                        echo '<button type="submit" class="export-btn" name="district_csv_download">';
                            echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-export.svg">';
                            echo '<span>Export district CSV</span>';
                        echo '</button>';
                    echo '</form>';
                    
                echo '</div>';

                echo '<div class="table-responsive search-result-content">';
                    echo '<table class="table dashboard-table" id="state_dashboard_tbl">';

                        echo '<thead>';
                            echo '<tr>';
                                echo '<th>State</th>';
                                echo '<th>District</th>';
                                echo '<th><span>Date Submitted</span>District</th>';
                                echo '<th><span>Date Submitted</span>Final</th>';
                                echo '<th>District Status</th>';
                                echo '<th>Final Status</th>';
                                echo '<th></th>';
                                echo '<th></th>';
                                echo '<th></th>';
                                echo '<th></th>';
                                echo '<th></th>';
                            echo '</tr>';
                        echo '</thead>';

                        $state      = get_user_state($c_user_id);
                        $c_user_data = wp_get_current_user();

                        if( $c_user_data && !empty($c_user_data) && $c_user_data->ID > 0 ){

                            $pre_sql    = $wpdb->prepare('SELECT * FROM '. NEX_FORM_TEMP_ENTRY_TBL . ' WHERE user_id = "' . $c_user_id . '" ORDER BY id DESC');

                            $results    = $wpdb->get_row($pre_sql, ARRAY_A);

                            $edit_form_link = get_the_permalink(STATE_FORM);
                            
                            echo '<tr>';
                                echo '<td><span>' . $state . '</span></td>';
                                echo '<td><span>-</span></td>';

                                if( $results && !empty($results) && $results['is_published'] == "1" ){

                                    $edit_form_link = get_the_permalink(EDIT_STATE_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                    $view_form_link = get_the_permalink(VIEW_STATE_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                    $pdf_form_link = get_the_permalink(PDF_STATE_FORM) . "?record_id=" . $results['record_id'] . "&nex_form_id=" . $results['nex_form_id'] . "&user_id=" . $results['user_id'];

                                    echo '<td>';
                                        echo '<span>' . theme_change_date_format($results['created_at'], "Y-m-d H:i:s", "d M, Y") . '</span>';
                                    echo '</td>';
                                    echo '<td><span>-</span></td>';
                                    echo '<td>Completed</td>';
                                    echo '<td><span>-</span></td>';
                                    echo '<td><span>-</span></td>';
                                    echo '<td class="action">';
                                        echo '<a href="' . $view_form_link . '" ' . $view_link_target . '><i class="fa fa-eye"></i> View</a>';
                                    echo '</td>';
                                    echo '<td class="action">';
                                        echo '<a href="' . $pdf_form_link . '" ' . $pdf_link_target . '><i class="fa fa-download"></i> Download</a>';
                                    echo '</td>';
                                    echo '<td>' . $results['created_at'] . '</td>';
                                    echo '<td><span>-</span></td>';
                                } else {
                                    echo '<td><span>-</span></td>';
                                    echo '<td><span>-</span></td>';
                                    echo '<td>Draft</td>';
                                    echo '<td><span>-</span></td>';
                                    echo '<td class="action"><a href="' . $edit_form_link . '" ' . $edit_link_target . '><i class="fa fa-edit"></i> Edit</a></td>';
                                    echo '<td class="action">-</td>';
                                    echo '<td class="action">-</td>';
                                    echo '<td><span>-</span></td>';
                                    echo '<td><span>-</span></td>';
                                }
                                
                            echo '</tr>';
                            
                        }

                        // ===================================================================
                        // All District form accorndig to state
                        // ===================================================================
                        $user_pre_sql    = $wpdb->prepare('SELECT * FROM '. USER_TBL . ' as u LEFT JOIN '. USERMETA_TBL . ' as u1 ON u1.user_id = u.ID LEFT JOIN '. USERMETA_TBL . ' as u2 ON u2.user_id = u.ID WHERE (u1.meta_key = "state" AND u1.meta_value = "' . $c_state_id . '") AND (u2.meta_key = "city" AND u2.meta_value > "0") ORDER BY Id DESC');

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

                                        echo '<td><span>' . $state_date . '</span></td>';
                                        echo '<td><span>Completed</span></td>';
                                        echo '<td>';
                                            echo '<span>' . $state_status . '</span>';
                                        echo '</td>';
                                        echo '<td class="action">' . $edit_form_link_tag . '</td>';
                                        echo '<td class="action">';
                                            echo '<a href="' . $view_form_link . '" ' . $view_link_target . '><i class="fa fa-eye"></i> View</a>';
                                        echo '</td>';
                                        echo '<td class="action">';
                                            echo '<a href="' . $pdf_form_link . '" ' . $pdf_link_target . '><i class="fa fa-download"></i> Download</a>';
                                        echo '</td>';
                                        echo '<td>' . $results['created_at'] . '</td>';
                                        echo '<td>' . $state_o_date . '</td>';
                                    } else {
                                        echo '<td><span>-</span></td>';
                                        echo '<td><span>-</span></td>';
                                        echo '<td>Draft</td>';
                                        echo '<td><span>-</span></td>';
                                        echo '<td class="action">-</td>';
                                        echo '<td class="action">-</td>';
                                        echo '<td class="action">-</td>';
                                        echo '<td><span>-</span></td>';
                                        echo '<td><span>-</span></td>';
                                    }

                                echo '</tr>';

                            }
                        }

                    echo '</table>';

                echo '</div>';

            echo '</div>';

        } else if( in_array(DISTICT_USER, $c_roles) ){

            echo '<div class="dashborad-search-result">';

                echo '<div class="table-responsive search-result-content">';
                    echo '<table class="table dashboard-table" id="admin_dashboard_tbl">';

                        $c_user_data = wp_get_current_user();

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
                            echo '<tr>';
                                echo '<td colspan="3" class="align-center">';
                                    echo 'No record found!';
                                echo '</td>';
                            echo '</tr>';
                        }

                    echo '</table>';

                echo '</div>';

            echo '</div>';

        }

        echo '</div>';
    endwhile;

get_footer('dashboard');