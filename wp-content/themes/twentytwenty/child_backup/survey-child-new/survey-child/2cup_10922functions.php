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

// custome meta box
add_action( 'init', 'wpb_custom_new_menu' );

 add_meta_box( 'my-meta-box-id', 'Select language', 'cd_meta_box_cb', 'post', 'normal', 'high' ); 

 add_action( 'add_meta_boxes', 'cd_meta_box_add' );
function cd_meta_box_add()
{
    add_meta_box( 'my-meta-box-id', 'Select language', 'cd_meta_box_cb', 'post', 'normal', 'high' );
}





function cd_meta_box_cb( $post )
{
  
$values = get_post_custom( $post->ID );
$text = isset( $values['my_meta_box_text'] ) ? esc_attr( $values['my_meta_box_text'][0] ) : '' ;
$selected = isset( $values['my_meta_box_select'] ) ? esc_attr( $values['my_meta_box_select'][0] ) : '' ;
$check = isset( $values['my_meta_box_check'] ) ? esc_attr( $values['my_meta_box_check'][0] ) : '' ;
// echo $post->ID;exit;
// echo "<pre>";
// $field_id_value = get_post_meta(852);
// print_r($field_id_value);exit;
// print_r(get_post_meta($post->ID, 'select_language_meta_box_english',false));exit;
    ?>
  <p>
    <ul>
        <li><input type="checkbox" id="english" name="select_language_meta_box_english" <?php if (get_post_meta($post->ID, 'select_language_meta_box_english',false)[0] == 'on') { echo 'checked="checked"'; }  ?>  />
        <label for="my_meta_box_check">English</label></li>

        <li><input type="checkbox" id="hindi" name="select_language_meta_box_hindi" <?php if (get_post_meta($post->ID, 'select_language_meta_box_hindi',false)[0] == 'on') { echo 'checked="checked"'; }  ?> />
        <label for="my_meta_box_check">Hindi</label></li>

        <li><input type="checkbox" id="telugu" name="select_language_meta_box_telug" <?php if (get_post_meta($post->ID, 'select_language_meta_box_telug',false)[0] == 'on') { echo 'checked="checked"'; }  ?> />
        <label for="my_meta_box_check">Bengali</label></li>

        <li><input type="checkbox" id="gujarati" name="select_language_meta_box_gujarati" <?php if (get_post_meta($post->ID, 'select_language_meta_box_gujarati',false)[0] == 'on') { echo 'checked="checked"'; }  ?> />
        <label for="my_meta_box_check">Gujarati</label></li>
        
        <li><input type="checkbox" id="kannada" name="select_language_meta_box_kannada" <?php if (get_post_meta($post->ID, 'select_language_meta_box_kannada',false)[0] == 'on') { echo 'checked="checked"'; }  ?> />
        <label for="my_meta_box_check">Kannada</label></li>

        <li><input type="checkbox" id="assamese" name="select_language_meta_box_assamese" <?php if (get_post_meta($post->ID, 'select_language_meta_box_assamese',false)[0] == 'on') { echo 'checked="checked"'; }  ?>  />
        <label for="my_meta_box_check">Assamese</label></li>

        <li><input type="checkbox" id="malayalam" name="select_language_meta_box_malayalam" <?php if (get_post_meta($post->ID, 'select_language_meta_box_malayalam',false)[0] == 'on') { echo 'checked="checked"'; }  ?> />
        <label for="my_meta_box_check">Malayalam</label></li>

        <li><input type="checkbox" id="marathi" name="select_language_meta_box_marathi" <?php if (get_post_meta($post->ID, 'select_language_meta_box_marathi',false)[0] == 'on') { echo 'checked="checked"'; }  ?> />
        <label for="my_meta_box_check">Marathi</label></li>

        <li><input type="checkbox" id="odia" name="select_language_meta_box_odia" <?php if (get_post_meta($post->ID, 'select_language_meta_box_odia',false)[0] == 'on') { echo 'checked="checked"'; }  ?>  />
        <label for="my_meta_box_check">Odia</label></li>

        <li><input type="checkbox" id="punjabi" name="select_language_meta_box_punjabi" <?php if (get_post_meta($post->ID, 'select_language_meta_box_punjabi',false)[0] == 'on') { echo 'checked="checked"'; }  ?> />
        <label for="my_meta_box_check">Punjabi</label></li>
        
        <li><input type="checkbox" id="tamil" name="select_language_meta_box_tamil" <?php if (get_post_meta($post->ID, 'select_language_meta_box_tamil',false)[0] == 'on') { echo 'checked="checked"'; }  ?> />
        <label for="my_meta_box_check">Tamil</label></li>

        <li><input type="checkbox" id="urdu" name="select_language_meta_box_urdu" <?php if (get_post_meta($post->ID, 'select_language_meta_box_urdu',false)[0] == 'on') { echo 'checked="checked"'; }  ?> />
        <label for="my_meta_box_check">Urdu</label></li>
</ul>
    </p>
    <?php        
}

add_action( 'save_post', 'cd_meta_box_save' );
function cd_meta_box_save( $post_id )
{

  // $st =  get_post_meta($post_id, 'select_language_meta_box_english',false);
  // print_r($st);exit;
  // echo $_POST['select_language_meta_box_english'];exit;
  // echo "<pre>";print_r($_POST);exit;
    // Bail if we're doing an auto save
    // if( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
     
    // // if our nonce isn't there, or we can't verify it, bail
    // if( !isset( $_POST['meta_box_nonce'] ) || !wp_verify_nonce( $_POST['meta_box_nonce'], 'my_meta_box_nonce' ) ) return;
     
    // if our current user can't edit this post, bail
    // if( !current_user_can( 'edit_post' ) ) return;
     
    // now we can actually save the data
    $allowed = array( 
        'a' => array( // on allow a tags
            'href' => array() // and those anchors can only have href attribute
        )
    );
     
    // Make sure your data is set before trying to save it
    if( isset( $_POST['my_meta_box_text'] ) )
        update_post_meta( $post_id, 'my_meta_box_text', wp_kses( $_POST['my_meta_box_text'], $allowed ) );
         
    if( isset( $_POST['my_meta_box_select'] ) )
        update_post_meta( $post_id, 'my_meta_box_select', esc_attr( $_POST['my_meta_box_select'] ) );
         
    // This is purely my personal preference for saving check-boxes
    $chk = isset( $_POST['select_language_meta_box_english'] )  ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_english', $chk );

    $chk = isset( $_POST['select_language_meta_box_hindi'] )  ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_hindi', $chk );

    $chk = isset( $_POST['select_language_meta_box_telug'] ) ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_telug', $chk );

    $chk = isset( $_POST['select_language_meta_box_bengali'] ) ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_bengali', $chk );

    $chk = isset( $_POST['select_language_meta_box_gujarati'] ) ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_gujarati', $chk );

    $chk = isset( $_POST['select_language_meta_box_kannada'] ) ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_kannada', $chk );

    $chk = isset( $_POST['select_language_meta_box_assamese'] )  ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_assamese', $chk );

    $chk = isset( $_POST['select_language_meta_box_malayalam'] )  ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_malayalam', $chk );

    $chk = isset( $_POST['select_language_meta_box_marathi'] ) ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_marathi', $chk );

    $chk = isset( $_POST['select_language_meta_box_odia'] ) ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_odia', $chk );

    $chk = isset( $_POST['select_language_meta_box_punjabi'] ) ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_punjabi', $chk );

    $chk = isset( $_POST['select_language_meta_box_tamil'] ) ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_tamil', $chk );

    $chk = isset( $_POST['select_language_meta_box_urdu'] ) ? 'on' : 'off';
    update_post_meta( $post_id, 'select_language_meta_box_urdu', $chk );
}
