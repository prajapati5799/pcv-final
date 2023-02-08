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
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
    <meta name = "format-detection" content = "telephone=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
	<link rel="icon" href="<?php echo get_field('favicon','option'); ?>" sizes="32x32" />

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	
	<?php wp_body_open(); ?>
<header class="header test">
         <div class="container-fluid">
            <div class="header-row d-lg-flex">
               <div class="header-logo">
                  <div class="logo">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
                            <?php if(get_field('header_logo_1', 'option')) :?>
                                <img src="<?php echo get_field('header_logo_1', 'option');?>" class="main-logo" alt="<?php bloginfo( 'name' ); ?>"/>
                            <?php endif;?>

                            <?php if(get_field('header_logo_2', 'option')) :?>
                            <img src="<?php echo get_field('header_logo_2', 'option');?>" class="logo2" alt="<?php bloginfo( 'name' ); ?>" />
                            <?php endif;?>
                        </a>
                  </div>
                  <div class="m-menu">
                     <span></span>
                     <span></span>
                     <span></span>
                  </div>    
               </div>
               
				 <?php
               if(is_front_page()) {
               ?>

                <div class="header-navigation">
                  <div class="nav-wrapper">                     
                        <?php
                        $main_menu = array( 
                            'menu'              => '', 
                            'container'         => '', 
                            'container_class'   => '', 
                            'container_id'      => '', 
                            'menu_class'        => 'nav', 
                            'menu_id'           => 'survey',
                            'items_wrap'        => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                            'theme_location'    => 'home-page-menu',
                            'echo'              => false,
                            'walker'            => new My_Walker_Nav_Menu()
                        );

                        echo wp_nav_menu( $main_menu );
                        ?>
                  </div>
               </div>
            
            <?php } else { ?>

                  <div class="header-navigation">
                  <div class="nav-wrapper">                     
                        <?php
                        $main_menu = array( 
                            'menu'              => '', 
                            'container'         => '', 
                            'container_class'   => '', 
                            'container_id'      => '', 
                            'menu_class'        => 'nav', 
                            'menu_id'           => 'survey',
                            'items_wrap'        => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                            'theme_location'    => 'menu-1',
                            'echo'              => false,
                            'walker'            => new My_Walker_Nav_Menu()
                        );

                        echo wp_nav_menu( $main_menu );
                        ?>
                  </div>
               </div>


            <?php } ?>

				
				
            </div>
         </div>
        </header>