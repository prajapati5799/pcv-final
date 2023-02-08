<?php
defined( 'ABSPATH' ) || exit;

/*===================== Plugin update false ====================================*/
function filter_plugin_updates( $value ) {
    
    //unset( $value->response['cf7-salesforce/cf7-salesforce.php'] );

    return $value;
}
add_filter( 'site_transient_update_plugins', 'filter_plugin_updates' );

/*===================== Hide admin bar for all users ====================================*/
add_filter( 'show_admin_bar', '__return_false' );


/*===================== Remove parent widget and add new widget ====================================*/
function themes_widgets_init() {

	unregister_sidebar( 'sidebar-1' );
    unregister_sidebar( 'sidebar-2' );
    unregister_sidebar( 'sidebar-3' );

	register_sidebar( array(
		'name'          => __( 'Newsletter', 'twentyseventeen' ),
		'id'            => 'newsletter',
		'description'   => __( 'Add widgets here to appear in your footer.', 'twentyseventeen' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h4 class="footer-title">',
		'after_title'   => '</h4>',
	) );
}
add_action( 'widgets_init', 'themes_widgets_init', 11 );


/*===================== Remove parent css/js and add new css/js ====================================*/
function child_theme_scripts() {

	wp_deregister_style( 'twentyseventeen-block-style' );
	wp_deregister_style( 'twentyseventeen-fonts' );
	wp_deregister_style( 'twentyseventeen-style' );
	wp_deregister_style( 'survey-style' );

	wp_deregister_script( 'twentyseventeen-skip-link-focus-fix' );
	wp_deregister_script( 'twentyseventeen-global' );
	wp_deregister_script( 'jquery-scrollto' );
	wp_deregister_script( 'html5' );

	//styles
	// $parent_style = 'survey';
	// wp_enqueue_style($parent_style, get_parent_theme_file_uri('style.css'));
// 	wp_enqueue_style('survey-child-bootstrap.min', get_stylesheet_directory_uri() . '/assets/css/bootstrap.min.css', array(), THEME_VERSION );
	if(is_page('analytics')){
		wp_enqueue_style('survey-child-bootstrap', get_stylesheet_directory_uri() . '/assets/css/bootstrap.css', array(), THEME_VERSION );

		}else{
		wp_enqueue_style('survey-child-bootstrap.min', get_stylesheet_directory_uri() . '/assets/css/bootstrap.min.css', array(), THEME_VERSION );
		}
	wp_enqueue_style('survey-child-fontawesome', get_stylesheet_directory_uri() . '/assets/css/fontawesome.css', array(), THEME_VERSION );
	wp_enqueue_style('survey-child-select2', get_stylesheet_directory_uri() . '/assets/css/select2.css', array(), THEME_VERSION);
	wp_enqueue_style('survey-slick', get_theme_file_uri('/assets/css/slick.css'), array(), THEME_VERSION);
	wp_enqueue_style('survey-docs', get_theme_file_uri('/assets/css/docs.css'), array(), THEME_VERSION);
	wp_enqueue_style('survey-child-docs1', get_stylesheet_directory_uri() . '/assets/css/docs1.css', array(), THEME_VERSION);
	wp_enqueue_style('survey-fontawesome5.8.1', plugins_url( 'nex-forms/public/css/fa5/css/all.min.css' ), array(), THEME_VERSION);
	wp_enqueue_style('survey-font-awesome', get_theme_file_uri('/assets/css/font-awesome.min.css'), array(), THEME_VERSION);
	wp_enqueue_style('survey-banner', get_theme_file_uri('/assets/css/theme.css'), array(), THEME_VERSION);
	wp_enqueue_style('survey-datatable', get_theme_file_uri('/assets/css/jquery.dataTables.min.css'), array(), THEME_VERSION);
	wp_enqueue_style('survey-datepicker', get_theme_file_uri('/assets/css/jquery-ui-1.10.0.custom.min.css'), array(), THEME_VERSION);
	wp_enqueue_style('survey-theme', get_theme_file_uri('/assets/css/survey.css'), array(), THEME_VERSION);
	
	// wp_enqueue_style('survey-child-nex-forms', get_stylesheet_directory_uri() . '/assets/css/nex-forms.css', array(), THEME_VERSION);
     wp_enqueue_style('survey-child-forms', get_stylesheet_directory_uri() . '/assets/css/admin-nex-forms.css', array(), THEME_VERSION);
    //wp_enqueue_style( 'survey-child', get_stylesheet_uri(), array(), null );

	wp_enqueue_style( 'survey-ie', get_theme_file_uri( '/assets/css/ie.css' ) );
	wp_style_add_data( 'survey-ie', 'conditional', 'IE 11' );

	wp_enqueue_script( 'html5', 'https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js' );
	wp_script_add_data( 'html5', 'conditional', 'lt IE 11' );

	wp_enqueue_script( 'respond', 'https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js' );
	wp_script_add_data( 'respond', 'conditional', 'lt IE 11' );
	// wp_enqueue_style('survey-bootstrap', get_theme_file_uri('/assets/css/bootstrap.css'), array(), THEME_VERSION);
	

    //scripts
    wp_enqueue_script('survey-jquery', get_theme_file_uri('/assets/js/jquery-1.12.4.min.js'), array('jquery'), THEME_VERSION, true);
    wp_enqueue_script('survey-bootstrap', get_theme_file_uri('/assets/js/bootstrap.js'), array('jquery'), THEME_VERSION, true);
    wp_enqueue_script('survey-matchHeight', get_theme_file_uri('/assets/js/jquery.matchHeight.js'), array('jquery'), THEME_VERSION, true);
    wp_enqueue_script('survey-slick', get_theme_file_uri('/assets/js/slick.js'), array('jquery'), THEME_VERSION, true);
    wp_enqueue_script('survey-datatable', get_theme_file_uri('/assets/js/jquery.dataTables.min.js'), array('jquery'), THEME_VERSION, true);
    wp_enqueue_script('survey-datepicker', get_theme_file_uri('/assets/js/jquery-ui.min.js'), array('jquery'), THEME_VERSION, true);    
    wp_enqueue_script('survey-theme', get_theme_file_uri('/assets/js/theme.js'), array('jquery'), THEME_VERSION, true);
    wp_enqueue_script('survey-child-select2', get_stylesheet_directory_uri() . '/assets/js/select2.js','','',true);
	// wp_enqueue_script('survey-child-nex-edit-forms', get_stylesheet_directory_uri() . '/assets/js/nex-edit-forms.js1','','',true);
	// wp_enqueue_script('survey-child-nex-view-forms', get_stylesheet_directory_uri() . '/assets/js/nex-view-forms1.js','','',true);
	wp_enqueue_script('survey-child-bootstrap', get_stylesheet_directory_uri() . '/assets/js/bootstrap.min.js');
	
	wp_enqueue_script('waypoints','https://cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.3/waypoints.min.js','','',true);
	wp_enqueue_script('counterup', get_stylesheet_directory_uri() . '/assets/js/jquery.counterup.min.js','','',true);
	 wp_enqueue_script('survey-custom', get_theme_file_uri('/assets/js/custom.js'), array('jquery'), THEME_VERSION, true);
	wp_enqueue_script( 'cookie-js', 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js', array(), THEME_VERSION, true );
	

    
    wp_localize_script(
		'survey-child-bootstrap', 
		'theme_js_vars', 
		array(
			'ajax_url' => THEME_AJAX_URL,
			'dashboard_pie_chart' => get_dashboard_pie_chart_settings(),
			'map_color1' => get_range_default_color(1),
			'map_color2' => get_range_default_color(2),
			'map_color3' => get_range_default_color(3),
			'map_color4' => get_range_default_color(4),
			'map_indicator1' => get_range_default_title(1),
			'map_indicator2' => get_range_default_title(2),
			'map_indicator3' => get_range_default_title(3),
			'map_indicator4' => get_range_default_title(4),
			'h_line_color1' => get_h_line_range_default_color(1),
			'h_line_color2' => get_h_line_range_default_color(2),
			'h_line_color3' => get_h_line_range_default_color(3),
			'h_line_color4' => get_h_line_range_default_color(4),
			'another_h_line_color1' => get_another_h_line_range_default_color(1),
			'another_h_line_color2' => get_another_h_line_range_default_color(2),
			'another_h_line_color3' => get_another_h_line_range_default_color(3),
			'another_h_line_color4' => get_another_h_line_range_default_color(4),
			'state_map_tooltip_pointFormat' => '{point.name}: <b>{point.value}%</b>',
			'horizontal_tooltip_pointFormat' => '<b>{point.y}</b>',
			'horizontal_xAxis_state_data' => array(
				'Arunachal Pradesh',
				'Assam',
				'Chhatisgarh',
				'Jammu and Kashmir',
				'Jharkhand',
				'Ladakh',
				'Manipur',
				'Meghalaya',
				'Mizoram',
				'Nagaland',
				'Odisha',
				'Sikkim',
				'Tripura',
				'Uttarakhand'
			),
			'bubble_tooltip_pointFormat' => '<b>{point.name}:</b>{point.x}',
			'indicator' => array(
				'bi' => get_indicators_dropdown_by_key('bi'),
				'ccvl' => get_indicators_dropdown_by_key('ccvl'),
				'prs' => get_indicators_dropdown_by_key('prs'),
				'ds' => get_indicators_dropdown_by_key('ds'),
			),
			'year' => array(
				'bi__8_1__vaccine_wastage' => get_years_dropdown_by_key('bi__8_1__vaccine_wastage'),
				'bi__8_1__vaccine_wastage_default' => get_all_years_list()['bi__8_1__vaccine_wastage'][0]['name'],
				'prs__11_4__stfi_meetings' => get_years_dropdown_by_key('prs__11_4__stfi_meetings'),
				'prs__11_4__stfi_meetings_default' => get_all_years_list()['prs__11_4__stfi_meetings'][0]['name'],
				'prs__11_7__meetings_held' => get_years_dropdown_by_key('prs__11_7__meetings_held'),
				'prs__11_7__meetings_held_default' => get_all_years_list()['prs__11_7__meetings_held'][0]['name'],
				'prs__11_10__meetings_cold_chain' => get_years_dropdown_by_key('prs__11_10__meetings_cold_chain'),
				'prs__11_10__meetings_cold_chain_default' => get_all_years_list()['prs__11_10__meetings_cold_chain'][0]['name'],
				'prs__12_4__aefi_committee_meetings' => get_years_dropdown_by_key('prs__12_4__aefi_committee_meetings'),
				'prs__12_4__aefi_committee_meetings_default' => get_all_years_list()['prs__12_4__aefi_committee_meetings'][0]['name'],
				'ds__15_1__reported_any_case' => get_years_dropdown_by_key('ds__15_1__reported_any_case'),
				'ds__15_1__reported_any_case_default' => get_all_years_list()['ds__15_1__reported_any_case'][0]['name'],
				'ds__15_2__afp_cases' => get_years_dropdown_by_key('ds__15_2__afp_cases'),
				'ds__15_2__afp_cases_default' => get_all_years_list()['ds__15_2__afp_cases'][0]['name'],
				'ds__15_3__reported_outbreaks' => get_years_dropdown_by_key('ds__15_3__reported_outbreaks'),
				'ds__15_3__reported_outbreaks_default' => get_all_years_list()['ds__15_3__reported_outbreaks'][0]['name'],
			),
			'state_dropdown' => get_report_state_dropdown(),
			'state_dropdown_with_disabled' => get_report_state_dropdown(true)
		)
	);
	

	
	
	 

}
add_action( 'wp_enqueue_scripts', 'child_theme_scripts', 5 );


/*===================== Add or remove css/js frontside side footer ====================================*/
function prefix_add_footer_styles(){
	wp_deregister_script( 'survey-navigation' );

	$c_role = get_current_user_roles();
	
	wp_enqueue_style('survey-nex-forms', get_theme_file_uri('/assets/css/nex-forms.css'), array(), THEME_VERSION);

	// Front forms Javascripts
	if( is_page(EDIT_STATE_FORM) || is_page(EDIT_DISTRICT_FORM) ) {
		wp_enqueue_script('survey-nex-forms', get_theme_file_uri('/assets/js/nex-edit-forms1.js'), array('jquery'), THEME_VERSION, true);
	} else if( is_page(VIEW_STATE_FORM) || is_page(VIEW_DISTRICT_FORM) ) {
		wp_enqueue_script('survey-nex-forms', get_theme_file_uri('/assets/js/nex-view-forms1.js'), array('jquery'), THEME_VERSION, true);
	} else if( is_page(STATE_FORM) || is_page(DISTRICT_FORM) ) {
		wp_enqueue_script('survey-nex-forms', get_theme_file_uri('/assets/js/nex-add-forms.js'), array('jquery'), THEME_VERSION, true);
	}

	// Front side Dashboard Javascripts
	if( in_array(ADMIN, $c_role) && is_page(ADMIN_MY_ACCOUNT_PAGE_ID) ){
		wp_enqueue_script('survey-admin-chartjs-dashboard', get_theme_file_uri('/assets/js/chart.min.js'), array('jquery'), THEME_VERSION, true);
		wp_enqueue_script('survey-admin-dashboard', get_theme_file_uri('/assets/js/admin-dashboard.js'), array('jquery'), THEME_VERSION, true);
	} else if( in_array(STATE_USER, $c_role) && is_page(STATE_MY_ACCOUNT_PAGE_ID) ){
		wp_enqueue_script('survey-state-dashboard', get_theme_file_uri('/assets/js/state-dashboard.js'), array('jquery'), THEME_VERSION, true);
	} else if( in_array(DISTICT_USER, $c_role) && is_page(DISTRICT_MY_ACCOUNT_PAGE_ID) ){
		wp_enqueue_script('survey-district-dashboard', get_theme_file_uri('/assets/js/district-dashboard.js'), array('jquery'), THEME_VERSION, true);
	}

	if( in_array(ADMIN, $c_role) && is_page(DISEASE_SURVEILLANCE_PID) ){
		
		wp_enqueue_script('survey-highmaps', 'https://code.highcharts.com/maps/highmaps.js', array('jquery'), THEME_VERSION, true);
		wp_enqueue_script('survey-highcharts-more', 'https://code.highcharts.com/highcharts-more.js', array('jquery'), THEME_VERSION, true);
		wp_enqueue_script('survey-highcharts-exporting', 'https://code.highcharts.com/maps/modules/exporting.js', array('jquery'), THEME_VERSION, true);
		//wp_enqueue_script('survey-highcharts-disputed', 'https://code.highcharts.com/mapdata/countries/in/custom/in-all-disputed.js', array('jquery'), THEME_VERSION, true);
		wp_enqueue_script('survey-highcharts-disputed', get_theme_file_uri('/assets/js/in-all-ladakhdisputed.js'), array('jquery'), THEME_VERSION, true);

		// District map
		wp_enqueue_script('survey-d3-v4', 'https://d3js.org/d3.v4.min.js', array('jquery'), THEME_VERSION, true);
		wp_enqueue_script('survey-d3-scale-chromatic', 'https://d3js.org/d3-scale-chromatic.v0.3.min.js', array('jquery'), THEME_VERSION, true);
		wp_enqueue_script('survey-d3-district-data', get_theme_file_uri('/assets/js/StateWiseDistrictData.js'), array('jquery'), THEME_VERSION, true);
		wp_enqueue_script('survey-d3-tip', get_theme_file_uri('/assets/js/d3-tip.js'), array('jquery'), THEME_VERSION, true);

		//wp_enqueue_script('survey-admin-dashboard', get_theme_file_uri('/assets/js/admin-analytics.js'), array('jquery'), THEME_VERSION, true);
		wp_enqueue_script('survey-admin-dashboard', get_theme_file_uri('/assets/js/admin-analytics-new.js'), array('jquery'), THEME_VERSION, true);
	}
}
add_action( 'get_footer', 'prefix_add_footer_styles' );

     
/*===================== Add or remove css/js admin side ====================================*/
function hkdc_admin_styles() {

	// wp_enqueue_style('survey-jqueryui-css', get_theme_file_uri('/assets/css/jquery-ui-1.10.0.custom.min.css'), array(), THEME_VERSION);

	wp_enqueue_style('survey-datatable-css', get_theme_file_uri('/assets/css/jquery.dataTables.min.css'), array(), THEME_VERSION);
}
add_action('admin_print_styles', 'hkdc_admin_styles',99);

function custom_admin_js() {

    $url1 = get_stylesheet_directory_uri() . '/assets/js/jquery-ui.min.js?ver=' . THEME_VERSION;
    $url2 = get_stylesheet_directory_uri() . '/assets/js/dashboard_filter.js?ver=' . THEME_VERSION;
    $url3 = get_stylesheet_directory_uri() . '/assets/js/jquery.dataTables.min.js?ver=' . THEME_VERSION; 
    
    echo '<script type="text/javascript" src="'. $url1 . '"></script>
    	  <script type="text/javascript" src="'. $url2 . '"></script>
    	  <script type="text/javascript" src="'. $url3 . '"></script>';
}
add_action('admin_footer', 'custom_admin_js');

// function load_admin_styles() {
// 	wp_enqueue_style('survey-admin-nex-forms', get_theme_file_uri('/assets/css/admin-nex-forms.css'), array(), THEME_VERSION);
// }
// add_action( 'admin_enqueue_scripts', 'load_admin_styles' );


/*===================== Allow Span tags in editor ====================================*/
function child_theme_editor($init) {
    $ext = 'span[id|name|class|style]';
    if ( isset( $init['extended_valid_elements'] ) ) {
        $init['extended_valid_elements'] .= ',' . $ext;
    } else {
        $init['extended_valid_elements'] = $ext;
    }
    return $init;
}
add_filter('tiny_mce_before_init', 'child_theme_editor' );


/*===================== Allow SVG file ====================================*/
function cc_mime_types( $mimes ) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter( 'upload_mimes', 'cc_mime_types' );


/*===================== Allow doc file for user to upload from front end ====================================*/
add_filter( 'wp_check_filetype_and_ext', 'file_and_ext_allow_for_user', 10, 4 );
function file_and_ext_allow_for_user( $types, $file, $filename, $mimes )
{
    if( false !== strpos( $filename, '.doc' ) )
    {
        $types['ext'] = 'doc';
        $types['type'] = 'application/msword';
    }
    return $types;
}


/*===================== init set for all intilize actions ====================================*/
add_action('init', 'theme_set_init_logic');
function theme_set_init_logic() { 
    global $wpdb;

	if( isset($_REQUEST['lrm_logout']) ){
		/*$action_url 				= lrm_setting('redirects/logout/action');

		if( $action_url == "redirect" ){
			$action_url 			= lrm_setting('redirects/logout/redirect')['redirect_url']['default'];
		}*/

		$action_url 				= get_site_url();
		
		wp_logout();
		wp_destroy_current_session();
		wp_clear_auth_cookie();
		wp_set_current_user(0);

		wp_redirect($action_url);
		die();
	}

	if( isset($_REQUEST['login-redirect']) ){
		
		$c_user_id 					= get_current_user_id();

		$c_user_state_id 			= get_user_meta($c_user_id, 'state', true);
    	$c_user_city_id 			= get_user_meta($c_user_id, 'city', true);

    	$c_roles 					= get_current_user_roles();

    	$redirect_to 				= get_site_url();

    	if( in_array(STATE_USER, $c_roles) ){
    		$redirect_to 			= get_the_permalink(STATE_FORM);
    	} else if( in_array(DISTICT_USER, $c_roles) ){
    		$redirect_to 			= get_the_permalink(DISTRICT_FORM);
    	} else if( in_array(STATE_SUPER_USER, $c_roles) ){
    		$redirect_to 			= get_the_permalink(MY_ACCOUNT_PAGE);
    	} else if( in_array(ADMIN, $c_roles) ){
    		$redirect_to 			= get_the_permalink(ADMIN_MY_ACCOUNT_PAGE_ID);
    	}

		wp_redirect($redirect_to);
		die();
	}
}

/*===================== Add custom text in category section ====================================*/
/*add_filter( 'admin_post_thumbnail_html', 'add_size_in_post_futured_img', 10, 3 );
function add_size_in_post_futured_img( $content, $post_ID, $thumbnail_id ){

	if( get_post_type() == "post" ){
		return  $content . '<br/><b>W1900 X H800 pixel</b>';	
	}
    
    return  $content;
}*/

/*===================== Custom redirect section ====================================*/
function dashboard_validation( $roles ){

	if( !is_user_logged_in() ){
		wp_redirect(get_site_url());
		die();
	}

	$c_roles        = get_current_user_roles();

	$is_redirect = true;
	foreach( $roles as $role ){
		if( in_array( $role, $c_roles ) ){
			$is_redirect = false;
			break;
		}
	}

	if( $is_redirect ){
		wp_redirect(get_site_url());
		die();
	}
}

/*===================== Redirect Intilize ====================================*/
add_action( 'template_redirect', 'theme_redirect_pages' );
function theme_redirect_pages() {
    global $wpdb;

    if( is_page(STATE_FORM) ){

    	if( !is_user_logged_in() ){
	        wp_redirect(get_site_url());
	        die();
	    }

    	$c_user_id 					= get_current_user_id();
    	$c_roles 					= get_current_user_roles();

    	if( in_array(STATE_USER, $c_roles) ){
	    	
	    	$pre_sql 				= $wpdb->prepare('SELECT * FROM '. NEX_FORM_ENTRY_TBL . ' WHERE nex_forms_Id = "' . STATE_FORM_ID . '" AND user_Id = "' . $c_user_id . '" AND publish = "1"');
			$results 				= $wpdb->get_row($pre_sql);

			if( $results && !empty($results) ){
				wp_redirect(STATE_MY_ACCOUNT_PAGE);
				die();
			}

		} else if( in_array(DISTICT_USER, $c_roles) ){
			wp_redirect(get_the_permalink(DISTRICT_FORM));
			die();
		}/* else if( in_array(STATE_SUPER_USER, $c_roles) ){
    		wp_redirect(STATE_ADMIN_MY_ACCOUNT_PAGE);
			die();
    	} */else if( in_array(ADMIN, $c_roles) ){
    		wp_redirect(ADMIN_MY_ACCOUNT_PAGE);
			die();
    	}

    } else if( is_page(DISTRICT_FORM) ){

    	if( !is_user_logged_in() ){
	        wp_redirect(get_site_url());
	        die();
	    }

    	$c_user_id 					= get_current_user_id();
    	$c_roles 					= get_current_user_roles();

		if( in_array(STATE_USER, $c_roles) ){
	    	wp_redirect(get_the_permalink(STATE_FORM));
			die();
		} else if( in_array(DISTICT_USER, $c_roles) ){
			
			$pre_sql 				= $wpdb->prepare('SELECT * FROM '. NEX_FORM_ENTRY_TBL . ' WHERE nex_forms_Id = "' . DISTRICT_FORM_ID . '" AND user_Id = "' . $c_user_id . '" AND publish = "1"');
			$results 				= $wpdb->get_row($pre_sql);

			if( $results && !empty($results) ){
				wp_redirect(DISTRICT_MY_ACCOUNT_PAGE);
				die();
			}

		} /*else if( in_array(STATE_SUPER_USER, $c_roles) ){
    		wp_redirect(STATE_ADMIN_MY_ACCOUNT_PAGE);
			die();
    	}*/ else if( in_array(ADMIN, $c_roles) ){
    		wp_redirect(ADMIN_MY_ACCOUNT_PAGE);
			die();
    	}

    } else if( is_page(EDIT_STATE_FORM) || is_page(VIEW_STATE_FORM) || is_page(PDF_STATE_FORM) || is_page(EDIT_DISTRICT_FORM) || is_page(VIEW_DISTRICT_FORM) || is_page(PDF_DISTRICT_FORM) ){

    	if( !is_user_logged_in() ){
	        wp_redirect(get_site_url());
	        die();
	    }

    	$c_user_id 					= get_current_user_id();
    	$c_roles 					= get_current_user_roles();

	    if( is_page(EDIT_STATE_FORM) ){ 

	    	if( !in_array(STATE_USER, $c_roles) && !in_array(ADMIN, $c_roles) ){
	    		wp_redirect(get_site_url());
	        	die();
	    	}
	    } else if( is_page(EDIT_DISTRICT_FORM) ){

	    	if( !in_array(STATE_USER, $c_roles) && !in_array(ADMIN, $c_roles) ){
	    		wp_redirect(get_site_url());
	        	die();
	    	}
	    }

    } 
	// else if( is_page(ADMIN_MY_ACCOUNT_PAGE_ID) || is_page(STATE_ADMIN_MY_ACCOUNT_PAGE_ID) || is_page(STATE_MY_ACCOUNT_PAGE_ID) || is_page(DISTRICT_MY_ACCOUNT_PAGE_ID) ){

    // 	if( !is_user_logged_in() ){
	//         wp_redirect(get_site_url());
	//         die();
	//     }

    // 	$c_user_id 					= get_current_user_id();
    // 	$c_roles 					= get_current_user_roles();

	//     if( in_array(ADMIN, $c_roles) ){
    // 		wp_redirect(ADMIN_MY_ACCOUNT_PAGE);
    //     	die();
    // 	}
    // }
}

/*===================== Add class in body ====================================*/
add_filter( 'body_class', 'my_dashboard_body_class');
function my_dashboard_body_class( $classes ) {
	global $my_account_pages;

	if( $my_account_pages && !empty($my_account_pages) ){

		$my_account_pages = array_unique($my_account_pages);

		foreach( $my_account_pages as $page_id ){
			if( !empty($page_id) && is_page($page_id) ){
				$classes[] = "my-dashboard-body-class";
			}
		}
	}
 
    return $classes; 
}
?>