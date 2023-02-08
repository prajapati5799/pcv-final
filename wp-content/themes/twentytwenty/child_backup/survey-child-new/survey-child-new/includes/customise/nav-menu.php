<?php
defined( 'ABSPATH' ) || exit;

/*===================== Remove Customise Menu from admin side ====================================*/
add_action( 'admin_menu', 'remove_admin_customise_menu', 999 );
function remove_admin_customise_menu() {
	global $submenu;

   	if ( isset( $submenu[ 'themes.php' ] ) ) {
        foreach ( $submenu[ 'themes.php' ] as $index => $menu_item ) {

            if ( in_array( 'hide-if-no-customize', $menu_item ) ) {
                unset( $submenu[ 'themes.php' ][ $index ] );
            }
        }
    }
    
    $customizer_url = add_query_arg( 
    	'return', 
    	urlencode( remove_query_arg( wp_removable_query_args(), wp_unslash( $_SERVER['REQUEST_URI'] ) ) ), 'customize.php' 
    );
	remove_submenu_page( 'themes.php', $customizer_url );
}


/*===================== Menu Customize ====================================*/
add_filter('wp_nav_menu_objects', 'add_first_and_last', 10, 2);
function add_first_and_last( $items, $args ) {
	global $wpdb, $post;
	
	$items[1]->classes[] = 'first-menu-item';
	$items[count($items)]->classes[] = 'last-menu-item';

	/*if( $args->theme_location == "main_menu" ){
		
		foreach ( $items as $item_menu_key => $item_menu ) {
			if( $item_menu->title == "For Organisations" ){
				$items[$item_menu_key]->classes[] = 'splash_organization_btn';
				break;
			}
		}

	} else if( $args->theme_location == "org_menu" ){
		
		foreach ( $items as $item_menu_key => $item_menu ) {
			if( $item_menu->title == "For Individual" ){
				$items[$item_menu_key]->classes[] = 'splash_individual_btn';
				break;
			}
		}

	}*/

	return $items;
}

/*===================== Add active class ====================================*/
add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);
function special_nav_class ( $classes, $item ) {

    if( in_array( 'current-menu-item', $classes ) ){
        $classes[] = 'active ';
    }
	
	if( in_array( 'menu-item-has-children', $classes ) ){
        $classes[] = 'sub-link ';
    }

    return $classes;
}

/*===================== Add submenu class in child menu ====================================*/
class My_Walker_Nav_Menu extends Walker_Nav_Menu {

	function start_lvl( &$output, $depth = 0, $args = Array() ) {
		$indent = str_repeat( "\t", $depth );
		$output .= "\n$indent<ul class=\"submenu\">\n";
	}
	
	/**
	 * Starts the element output.
	 *
	 * @since 3.0.0
	 * @since 4.4.0 The {@see 'nav_menu_item_args'} filter was added.
	 *
	 * @see Walker::start_el()
	 *
	 * @param string   $output Used to append additional content (passed by reference).
	 * @param WP_Post  $item   Menu item data object.
	 * @param int      $depth  Depth of menu item. Used for padding.
	 * @param stdClass $args   An object of wp_nav_menu() arguments.
	 * @param int      $id     Current item ID.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		//pre($item);
		if ( isset( $args->item_spacing ) && 'discard' === $args->item_spacing ) {
			$t = '';
			$n = '';
		} else {
			$t = "\t";
			$n = "\n";
		}
		$indent = ( $depth ) ? str_repeat( $t, $depth ) : '';

		$classes   = empty( $item->classes ) ? array() : (array) $item->classes;
		$classes[] = 'menu-item-' . $item->ID;

		/**
		 * Filters the arguments for a single nav menu item.
		 *
		 * @since 4.4.0
		 *
		 * @param stdClass $args  An object of wp_nav_menu() arguments.
		 * @param WP_Post  $item  Menu item data object.
		 * @param int      $depth Depth of menu item. Used for padding.
		 */
		$args = apply_filters( 'nav_menu_item_args', $args, $item, $depth );

		/**
		 * Filters the CSS classes applied to a menu item's list item element.
		 *
		 * @since 3.0.0
		 * @since 4.1.0 The `$depth` parameter was added.
		 *
		 * @param string[] $classes Array of the CSS classes that are applied to the menu item's `<li>` element.
		 * @param WP_Post  $item    The current menu item.
		 * @param stdClass $args    An object of wp_nav_menu() arguments.
		 * @param int      $depth   Depth of menu item. Used for padding.
		 */
		$class_names = implode( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
		$class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

		/**
		 * Filters the ID applied to a menu item's list item element.
		 *
		 * @since 3.0.1
		 * @since 4.1.0 The `$depth` parameter was added.
		 *
		 * @param string   $menu_id The ID that is applied to the menu item's `<li>` element.
		 * @param WP_Post  $item    The current menu item.
		 * @param stdClass $args    An object of wp_nav_menu() arguments.
		 * @param int      $depth   Depth of menu item. Used for padding.
		 */
		$id = apply_filters( 'nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth );
		$id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

		$output .= $indent . '<li' . $id . $class_names . ' data-depth="' . $depth . '">';

		$atts           = array();
		$atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
		$atts['target'] = ! empty( $item->target ) ? $item->target : '';
		if ( '_blank' === $item->target && empty( $item->xfn ) ) {
			$atts['rel'] = 'noopener';
		} else {
			$atts['rel'] = $item->xfn;
		}
		$atts['href']         = ! empty( $item->url ) ? $item->url : '';
		$atts['aria-current'] = $item->current ? 'page' : '';

		/**
		 * Filters the HTML attributes applied to a menu item's anchor element.
		 *
		 * @since 3.6.0
		 * @since 4.1.0 The `$depth` parameter was added.
		 *
		 * @param array $atts {
		 *     The HTML attributes applied to the menu item's `<a>` element, empty strings are ignored.
		 *
		 *     @type string $title        Title attribute.
		 *     @type string $target       Target attribute.
		 *     @type string $rel          The rel attribute.
		 *     @type string $href         The href attribute.
		 *     @type string $aria_current The aria-current attribute.
		 * }
		 * @param WP_Post  $item  The current menu item.
		 * @param stdClass $args  An object of wp_nav_menu() arguments.
		 * @param int      $depth Depth of menu item. Used for padding.
		 */
		$atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

		$attributes = '';
		foreach ( $atts as $attr => $value ) {
			if ( is_scalar( $value ) && '' !== $value && false !== $value ) {
				$value       = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
				$attributes .= ' ' . $attr . '="' . $value . '"';
			}
		}

		/** This filter is documented in wp-includes/post-template.php */
		$title = apply_filters( 'the_title', $item->title, $item->ID );

		/**
		 * Filters a menu item's title.
		 *
		 * @since 4.4.0
		 *
		 * @param string   $title The menu item's title.
		 * @param WP_Post  $item  The current menu item.
		 * @param stdClass $args  An object of wp_nav_menu() arguments.
		 * @param int      $depth Depth of menu item. Used for padding.
		 */
		$title = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );

		$item_output  = $args->before;
		$item_output .= '<a' . $attributes . '>';

		if( $args->menu->slug == 'dashboard-menu' && $depth == 0 ){
			if( function_exists('get_field') ){
				$menu_icon = get_field('icon', $item->ID);
				if( $menu_icon ){
					$item_output .= '<img src="' . $menu_icon . '">';
				}
			}
		}

		if( $args->menu->slug == 'dashboard-menu' && $depth == 0 ){
			$item_output .= $args->link_before . '<span>' . $title . '</span>' . $args->link_after;;
			
		} else {
			$item_output .= $args->link_before . $title . $args->link_after;
		}
		
		$item_output .= '</a>';
		$item_output .= $args->after;

		/**
		 * Filters a menu item's starting output.
		 *
		 * The menu item's starting output only includes `$args->before`, the opening `<a>`,
		 * the menu item's title, the closing `</a>`, and `$args->after`. Currently, there is
		 * no filter for modifying the opening and closing `<li>` for a menu item.
		 *
		 * @since 3.0.0
		 *
		 * @param string   $item_output The menu item's starting HTML output.
		 * @param WP_Post  $item        Menu item data object.
		 * @param int      $depth       Depth of menu item. Used for padding.
		 * @param stdClass $args        An object of wp_nav_menu() arguments.
		 */
		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}

}

/*===================== Register nav menu ====================================*/
register_nav_menus( 
    array(
    	'dashboard-menu' => __( 'Dashboard Menu', DOMAIN_NAME),
    )
);

/*===================== Modify nav menu ====================================*/
/*function nav_replace_wpse_189788( $item_output, $item, $depth, $args ) {
 //var_dump($item_output, $item);
	if( $args->theme_location != 'main_menu' ){
		return $item_output;
	}

	if ( $item->menu_order == $args->menu->count ) {
		$item_output .= '<li class="moblie-nav menu-item menu-item-type-custom menu-item-object-custom last-menu-item">';
		if ( is_user_logged_in() ) { 
			$item_output .= '<a href="' . wp_logout_url( LOGGEDOUT_REDIRECT ) . '">' . get_field( 'logout_menu_label', 'option' ) . '</a>';
	    }else{
	    	$item_output .= '<a href="JavaScript:Void(0)" data-toggle="modal" data-target="#myModal">' . get_field( 'login_menu_label', 'option' ) . '</a>';
	    }
	    $item_output .= '</li>';
	}

	return $item_output;
 }
 add_filter('walker_nav_menu_start_el','nav_replace_wpse_189788',10,4);*/


/*===================== Hide admin bar exclude Admin & Editor ====================================*/
/*function my_function_admin_bar($content) {
	return ( current_user_can( 'administrator' ) || current_user_can( 'editor' ) ) ? $content : false;
}
add_filter( 'show_admin_bar' , 'my_function_admin_bar');*/
?>