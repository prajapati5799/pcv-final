<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package survey
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<meta name="format-detection" content="telephone=no">

    <?php wp_head(); ?>
    <style>body {background: #F8F8F8; font-family: 'Source Sans Pro', sans-serif;}</style>
</head>

<body <?php body_class(); ?>>
	
	<?php wp_body_open(); ?>
	
	<div class="page-wrapper">

        <div class="header-top">
            <div class="mm-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div class="sidebar">
            
            <div class="sidebar-logo">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <?php if(get_field('header_logo_1', 'option')) :?>
                        <img src="<?php echo get_field('header_logo_1', 'option');?>" alt="<?php bloginfo( 'name' ); ?>"/>
                    <?php endif;?>

                    <?php if(get_field('header_logo_2', 'option')) :?>
                    <img src="<?php echo get_field('header_logo_2', 'option');?>" alt="<?php bloginfo( 'name' ); ?>" />
                    <?php endif;?>
                </a>
            </div>
            <div class="welcome-user">
                <a class="login-link" href="javascript:void(0);" style="margin-right:5px;">
                    <?php 
                    $current_user = wp_get_current_user();
                    echo "Welcome " . $current_user->user_login . ",";
                    ?>
                </a>
            </div>
            <div class="sidebar-content">
                <div class="sidebar-nav">
                    <?php
						$main_menu = array( 
                            'menu'              => '', 
                            'container'         => '', 
                            'container_class'   => '', 
                            'container_id'      => '', 
                            'menu_class'        => 'nav-links', 
                            'menu_id'           => 'dashboard-menu',
                            'items_wrap'        => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                            'theme_location'    => 'dashboard-menu',
                            'echo'            	=> false,
                            'walker'            => new My_Walker_Nav_Menu()
                        );

                        echo wp_nav_menu( $main_menu );
						?>
                </div>
            </div>
            <div class="logout-bottom">
                <a href="<?php echo get_site_url() . '?lrm_logout=1';?>"><img src="<?php echo get_stylesheet_directory_uri() . '/assets/images/icon-logout.svg';?>"/> <span>Logout</span></a>
            </div>
        </div>
