<?php
defined( 'ABSPATH' ) || exit;

$create_cpt_arr 								= [];
$create_taxonomy_arr 							= [];
$create_status_arr 								= [];

/*
//==================================================================================================
//=========================================== Potfolio
//==================================================================================================
$portfolio_cpt 									= [];
$portfolio_cpt['label'] 						= __( "Portfolios", DOMAIN_NAME );
$portfolio_cpt['description'] 					= __( "Post Type Description", DOMAIN_NAME );
$portfolio_cpt['labels'] 						= [
	'name' 								=> __( "Portfolios", DOMAIN_NAME ),
	'singular_name' 					=> __( "Portfolio", DOMAIN_NAME ),
	'menu_name' 						=> __( "Portfolio", DOMAIN_NAME ),
	'name_admin_bar' 					=> __( "Post Type", DOMAIN_NAME ),
];
$portfolio_cpt['supports'] 						= array( 'title' );
$portfolio_cpt['hierarchical'] 					= false;
$portfolio_cpt['public']                		= true;
$portfolio_cpt['show_ui']               		= true;
$portfolio_cpt['show_in_menu']          		= true;
$portfolio_cpt['menu_position']         		= 5;
$portfolio_cpt['menu_icon']             		= 'dashicons-palmtree';
$portfolio_cpt['show_in_admin_bar']     		= true;
$portfolio_cpt['show_in_nav_menus']     		= true;
$portfolio_cpt['can_export']            		= true;
$portfolio_cpt['has_archive']           		= true;
$portfolio_cpt['exclude_from_search']   		= false;
$portfolio_cpt['publicly_queryable']    		= true;
$portfolio_cpt['capability_type']       		= 'page';
$create_cpt_arr['portfolio'] 					= $portfolio_cpt;


//==================================================================================================
//=========================================== Review
//==================================================================================================
$review_cpt 									= [];
$review_cpt['label'] 							= __( "Reviews", DOMAIN_NAME );
$review_cpt['description'] 						= __( "Post Type Description", DOMAIN_NAME );
$review_cpt['labels'] 							= [
	'name' 								=> __( "Reviews", DOMAIN_NAME ),
	'singular_name' 					=> __( "Review", DOMAIN_NAME ),
	'menu_name' 						=> __( "Review", DOMAIN_NAME ),
	'name_admin_bar' 					=> __( "Post Type", DOMAIN_NAME ),
];
$review_cpt['supports'] 						= array( 'title' );
$review_cpt['hierarchical'] 					= false;
$review_cpt['public']                			= true;
$review_cpt['show_ui']               			= true;
$review_cpt['show_in_menu']          			= true;
$review_cpt['menu_position']         			= 5;
$review_cpt['menu_icon']             			= 'dashicons-palmtree';
$review_cpt['show_in_admin_bar']     			= true;
$review_cpt['show_in_nav_menus']     			= true;
$review_cpt['can_export']            			= true;
$review_cpt['has_archive']           			= true;
$review_cpt['exclude_from_search']   			= false;
$review_cpt['publicly_queryable']    			= true;
$review_cpt['capability_type']       			= 'page';
$create_cpt_arr['review'] 						= $review_cpt;



//==================================================================================================
//=========================================== Potfolio Category
//==================================================================================================
$portfolio_tax 									= [];
$portfolio_tax['hierarchical'] 					= true;
$portfolio_tax["label"] 						= __( "Portfolio Category", DOMAIN_NAME );
$portfolio_tax["labels"] 						= [
	'name' 								=> __( "Portfolio Categories", DOMAIN_NAME ),
	'singular_name' 					=> __( "Portfolio Category", DOMAIN_NAME ),
];
$portfolio_tax['show_ui'] 						= true;
$portfolio_tax['show_admin_column'] 			= true;
$portfolio_tax['query_var'] 					= true;
$portfolio_tax["show_in_menu"] 					= true;
$portfolio_tax["show_in_nav_menus"] 			= true;
$portfolio_tax["rewrite"] 						= array( 'slug' => 'portfolio-category', 'with_front' => true, );
$portfolio_tax["post_slugs"] 					= array( 'portfolio' );
$create_taxonomy_arr['portfolio-category'] 		= $portfolio_tax;


//==================================================================================================
//=========================================== Review Status
//==================================================================================================
$review_status 									= [];
$review_status["label"] 						= __( "Review", DOMAIN_NAME );
$review_status['public'] 						= true;
$review_status['_builtin'] 						= false;
$review_status['exclude_from_search'] 			= false;
$review_status['show_in_admin_all_list']    	= true;
$review_status['show_in_admin_status_list'] 	= true;
$review_status['show_in_metabox_dropdown']  	= true;
$review_status['show_in_inline_dropdown']   	= true;
$review_status['post_type']                 	= array( 'post', 'portfolio' );
$review_status['label_count']               	= _n_noop( 'Review <span class="count">(%s)</span>', 'Review <span class="count">(%s)</span>', DOMAIN_NAME );
$create_status_arr['review'] 					= $review_status;


//==================================================================================================
//=========================================== Reject Status
//==================================================================================================
$reject_status 									= [];
$reject_status["label"] 						= __( "Reject", DOMAIN_NAME );
$reject_status['public'] 						= true;
$reject_status['_builtin'] 						= false;
$reject_status['exclude_from_search'] 			= false;
$reject_status['show_in_admin_all_list']    	= true;
$reject_status['show_in_admin_status_list'] 	= true;
$reject_status['show_in_metabox_dropdown']  	= true;
$reject_status['show_in_inline_dropdown']   	= true;
$reject_status['post_type']                 	= array( 'post', 'portfolio' );
$reject_status['label_count']               	= _n_noop( 'Reject <span class="count">(%s)</span>', 'Reject <span class="count">(%s)</span>', DOMAIN_NAME );
$create_status_arr['reject'] 					= $reject_status;



$cpt_obj = new CreateCPT( $create_cpt_arr, $create_taxonomy_arr, $create_status_arr );
*/
?>