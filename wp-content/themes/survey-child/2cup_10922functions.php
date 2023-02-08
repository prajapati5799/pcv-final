<?php
if (!defined('ABSPATH')) exit;

require get_stylesheet_directory() . '/includes/includes.php';

function my_theme_enqueue_styles()
{

    $parent_style = 'survey';
}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');


function create_posttype()
{

    $supports = array(
        'title', // post title
        'editor', // post content
        'author', // post author
        'thumbnail', // featured images
        'excerpt', // post excerpt
        'custom-fields', // custom fields
        'comments', // post comments
        'revisions', // post revisions
        'post-formats', // post formats
    );
    $labels = array(
        'name' => _x('resource', 'plural'),
        'singular_name' => _x('resource', 'singular'),
        'menu_name' => _x('resource', 'admin menu'),
        'name_admin_bar' => _x('resource', 'admin bar'),
        'add_new' => _x('Add New', 'add new'),
        'add_new_item' => _('Add New resource'),
        'new_item' => ('New resource'),
        'edit_item' => ('Edit resource'),
        'view_item' => ('View resource'),
        'all_items' => ('All resource'),
        'search_items' => ('Search resource'),
        'not_found' => ('No resource found.'),
    );
    $args = array(
        'supports' => $supports,
        'labels' => $labels,
        'public' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'resource'),
        'has_archive' => true,
        'hierarchical' => false,
    );
    register_post_type('resource', $args);
    register_taxonomy(
        'porfolio_category',
        'resource',
        array(
            'hierarchical' => true, 'label' => 'Category', 'query_var' => true,
            'rewrite' => array('slug' => 'resource-category')
        )
    );
}
// Hooking up our function to theme setup
// add_action('init', 'create_posttype');

function register_custom_widget_area()
{
    register_sidebar(
        array(
            'id' => 'resource-area',
            'name' => 'Resources',
            'description' => esc_html__('A new widget area made for resources'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<div class="widget-title-holder"><h3 class="widget-title" style="display:none;">',
            'after_title' => '</h3></div>'
        )
    );
}




add_action('widgets_init', 'register_custom_widget_area');

add_shortcode('total_doses', 'total_doses');



function total_doses()
{
  $totald = get_field('total_does');
  
  echo '<input type="hidden" value="'.$totald.'" id="t_doses">';
  
  $mynmb = str_split($totald);

  $length = count($mynmb);
  echo '<div class="digit-total ">';
  for ($index = 0; $index < $length; $index++) {
    echo '<span id="count'.$index.'">'.$mynmb[$index].'</span>';  
  }
  echo '</div>';

}
//TOTAL DOSES PVC ADMINISTERED
function do_pagination($the_query = null, $pages = '', $range = 4) {  
  global $paged, $wp_query;
  
  $showitems = ($range * 2)+1;
  $query     = (is_null($the_query)) ? $wp_query : $the_query;

  if(empty($paged)) $paged = 1;

  if($pages == '') {
    $pages = $query->max_num_pages;

    if(!$pages) {
      $pages = 1;
    }
  }   
  if(1 != $pages) {
    echo '<ul class="pagination">';
    if($paged > 2 && $paged > $range+1) {
      echo "<li class='pager-first first'><a href='".get_pagenum_link(1)."' class='arrow'>&laquo;</a></li>";
    }
    if($paged > 1) {
      echo "<li class='pager-previous'><a href='".get_pagenum_link($paged - 1)."' class='current'>&lsaquo;</a></li>";
    }

    for ($i=1; $i <= $pages; $i++) {
      if (1 != $pages &&( !($i >= $paged+$range+1 || $i <= $paged-$range-1) || $pages <= $showitems )) {
        echo ($paged == $i)? "<li class='pager-current current'><a href=\"\">".$i."</a></li>":"<li class='pager-item'><a href='".get_pagenum_link($i)."' >".$i."</a></li>";
      }
    }

    if ($paged < $pages) {
      echo "<li class='pager-next'><a href='".get_pagenum_link($paged + 1)."' class='arrow'>&rsaquo;</a>";
    }
    if ($paged < $pages-1 &&  $paged+$range-1 < $pages) {
      echo "<li class='pager-last last'><a href='".get_pagenum_link($pages)."' class='arrow'>&raquo;</a></li>";
    } 
    echo "</ul>\n";
  }
}

function wpb_custom_new_menu() {



  register_nav_menus(
    array(
      'home-page-menu' => __( 'Home page Menu' )      
    )
  );
}
