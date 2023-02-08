<?php
include_once TC_CAF_PATH.'includes/query-variables.php';
if ( $qry->have_posts() ) : while ( $qry->have_posts() ) : $qry->the_post();
global $post;
$caf_post_id=get_the_ID();
if(is_array($tax)) {
 $cats=array();
  foreach($tax as $tx) {
   $cats[]=get_the_terms($caf_post_id,$tx);
  }
 }
 else {
	$cats=get_the_terms($caf_post_id,$tax);
 }
//var_dump($cats);
if(isset($cats)) {
 if(class_exists("TC_CAF_PRO")) {
 $cats_class=$cats[0][0]->name;
 }
 else {
  $cats_class=$cats[0]->name;
 }
 $cats_class = str_replace(' ', '_', $cats_class);
 $cats_class="tp_".$cats_class;
} else {$cats_class='';}
//$cats_class='';
?>
<article id="caf-post-layout3" class="caf-post-layout1 caf-col-md-<?php echo esc_attr($caf_desktop_col); ?> caf-col-md-tablet<?php echo esc_attr($caf_tablet_col); ?> caf-col-md-mobile<?php echo esc_attr($caf_mobile_col); ?> caf-mb-5 <?php echo esc_attr($caf_special_post_class); ?> <?php echo esc_attr($caf_post_animation); ?> <?php echo $cats_class; ?> " data-post-id="<?php echo esc_attr(get_the_id()); ?>">
<?php 
$caf_post_id=get_the_ID();
$title= get_the_title();
$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), $caf_image_size );
$link=get_the_permalink();
 $caf_content=get_the_excerpt();
 $caf_content= preg_replace('#\[[^\]]+\]#', '',$caf_content);
if($image[0]) {
echo "<a href='".esc_url($link)."' target='".esc_attr($caf_link_target)."'><div class='caf-featured-img-box' style='background:url(".esc_attr($image[0]).")'></div></a>";
}
else{
$image=TC_CAF_URL.'assets/img/unnamed.jpg';
echo "<a href='".esc_url($link)."' target='".esc_attr($caf_link_target)."'><div class='caf-featured-img-box' style='background:url(".esc_url($image)."
)'></div></a>";
}	
echo "<div id='manage-post-area'>";	
echo "<div class='caf-meta-content-cats'>";
echo "<ul class='caf-mb-0'>";
  foreach ($cats as $index=>$cat) {
		if($index<3) {
   if(class_exists("TC_CAF_PRO")) {
    if(isset($cat[0])) {
    $clink=get_category_link($cat[0]->term_id);
	echo "<li><a href='".esc_url($clink)."' target='_blank'>".esc_html($cat[0]->name)."</a></li>";
   }
   }
   else {
	$clink=get_category_link($cat->term_id);
	echo "<li><a href='".esc_url($clink)."' target='_blank'>".esc_html($cat->name)."</a></li>";
		}
  }
  }
echo "</ul>";
echo "</div>";
echo "<div class='caf-post-title'><h2><a href='".get_the_permalink()."'>".esc_html($title)."</a></h2></div>";
echo "<div class='caf-meta-content'>";
echo"<b><span class='author caf-pl-0'>By ".get_the_author()." - </span></b>";
echo"<span class='date caf-pl-0'>".get_the_date('M, d Y ')."</span>";
echo "</div>";
echo "</div>";
?>	
</article>
<?php
endwhile;

/**** Pagination*****/

if(isset($_POST["params"]["load_more"])) {
 //do something
}
else {
$caf_pagination->caf_ajax_pager($qry,$page,$caf_post_layout,$caf_pagi_type,$filter_id);
}
$response = [
                'status'=> 200,
                'found' => $qry->found_posts,
	            'message'=>'ok'
            ];
 wp_reset_postdata();
 else :
echo "<div class='error-of-empty-result error-caf'>".esc_html($caf_empty_res)."</div>";	
//$empty_res.='<div class="empty-response">No Posts Found.</div>';
//echo $empty_res;
 $response = [

                'status'  => 201,
                'message' => 'No posts found',
	            'content' =>'' ,
            ];
 endif;
 echo "<style>
 ".$target_div." .error-caf {font-family:".$caf_post_font.";background-color: ".$caf_post_sec_color."; color: ".$caf_post_primary_color.";font-size:".$caf_post_title_font_size."px;}
 ".$target_div." #caf-post-layout3 .caf-post-title h2 a {font-family:".$caf_post_font.";text-transform:".$caf_post_title_transform.";font-size:".$caf_post_title_font_size."px;}
  ".$target_div." #caf-post-layout3 .caf-meta-content-cats li a {font-family:".$caf_post_font.";}
  ".$target_div." #caf-post-layout3 span.author, ".$target_div." #caf-post-layout3 span.date, ".$target_div." #caf-post-layout3 span.comment {font-family:".$caf_post_font.";}
  ".$target_div." #caf-post-layout3 .caf-content, ".$target_div." #caf-post-layout3 a.caf-read-more, ".$target_div." ul#caf-layout-pagination.post-layout3 li a {font-family:".$caf_post_font.";background-color: ".$caf_post_sec_color2.";color:".$caf_post_sec_color.";}
  ".$target_div." ul#caf-layout-pagination.post-layout3 span.page-numbers.current {font-family:".$caf_post_font.";color: ".$caf_post_sec_color2.";background-color:".$caf_post_sec_color.";}
 #caf-post-layout-container".$target_div.".post-layout3 {background-color: ".$caf_sec_bg_color.";}
 ".$target_div." #caf-post-layout3 .caf-post-title h2 a:hover, ".$target_div." #caf-post-layout3 span.date {color: ".$caf_post_primary_color.";}
 ".$target_div." #caf-post-layout3 .caf-post-title h2 a,  ".$target_div." #caf-post-layout3 .caf-meta-content-cats li a {color: ".$caf_post_sec_color.";}
 ".$target_div." #caf-post-layout3 .caf-meta-content-cats li a {background-color: ".$caf_post_primary_color.";}
 ".$target_div." .caf-meta-content{color: ".$caf_post_sec_color2.";}
 ".$target_div." .status i {color:".$caf_post_primary_color.";}
 </style>";