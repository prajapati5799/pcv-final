<?php
include_once TC_CAF_PATH.'includes/query-variables.php';
if ( $qry->have_posts() ) : while ( $qry->have_posts() ) : $qry->the_post();
global $post;
?>
<article id="caf-post-layout4" class="caf-post-layout4 caf-col-md-12 caf-col-md-tablet12 caf-col-md-mobile12 caf-mb-10 <?php echo esc_attr($caf_special_post_class); ?> <?php echo esc_attr($caf_post_animation); ?>" data-post-id="<?php echo esc_attr(get_the_id()); ?>">
<?php
$caf_post_id=get_the_ID();
$title= get_the_title();
$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), $caf_image_size );
$link=get_the_permalink();
 $caf_content=get_the_excerpt();
 $caf_content= preg_replace('#\[[^\]]+\]#', '',$caf_content);
if($image[0]) {
echo "<a href='".esc_url($link)."' target='".esc_attr($caf_link_target)."' class='caf-f-img'><div class='caf-featured-img-box' style='background:url(".esc_url($image[0])."
)'></div></a>";
}
else{
$image=TC_CAF_URL.'assets/img/unnamed.jpg';
echo "<a href='".esc_url($link)."' target='".esc_attr($caf_link_target)."' class='caf-f-img'><div class='caf-featured-img-box' style='background:url(".esc_url($image)."
)'></div>
</a>";
}
echo "<div id='manage-post-area'>";
echo "<a href='".esc_url($link)."' target='".esc_attr($caf_link_target)."'><div class='caf-post-title'><h2>".esc_html($title)."</h2></div></a>";
echo "<div class='caf-meta-content-cats'>";
	echo "<ul class='caf-mb-0'>";
 //var_dump($tax);
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
echo "<div class='caf-content'>".wp_kses_post($caf_content)."</div>";	
if($caf_content) {
 $rd_more=esc_html('Read More');
echo "<div class='caf-content-read-more'><a class='caf-read-more' href='".esc_url($link)."' target='".esc_attr($caf_link_target)."'>".apply_filters('tc_caf_post_layout_read_more',$rd_more,$id)."</a></div>";
}	
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
if(class_exists("TC_CAF_PRO")) {
echo "<style>
".$target_div." #caf-post-layout4 .caf-content {color: ".$caf_post_sec_color2.";font-family:".$caf_post_desc_font.";text-transform:".$caf_post_desc_transform.";font-size:".$caf_post_desc_font_size."px; }
</style>";
}
else
{
 echo "<style>
 ".$target_div." .caf-meta-content, ".$target_div." .caf-content {color: ".$caf_post_sec_color2.";font-family:".$caf_post_font.";}
</style>";
}


echo "<style>
#caf-post-layout-container".$target_div.".post-layout4 {background-color: ".$caf_sec_bg_color." !important;}

".$target_div." #caf-post-layout4 .caf-post-title h2 {color: ".$caf_post_primary_color.";font-family:".$caf_post_font.";text-transform:".$caf_post_title_transform.";font-size:".$caf_post_title_font_size."px;}

".$target_div." #caf-post-layout4 .caf-meta-content-cats li a {color: ".$caf_post_sec_color.";font-family:".$caf_post_font.";}

".$target_div." ul#caf-layout-pagination.post-layout4 li a{background-color: ".$caf_post_primary_color.";color: ".$caf_post_sec_color.";font-family:".$caf_post_font.";}

".$target_div." ul#caf-layout-pagination.post-layout4 span.page-numbers.current {font-family:".$caf_post_font.";color: ".$caf_post_sec_color2.";background-color:".$caf_post_sec_color.";}



".$target_div." #caf-post-layout4 span.author,".$target_div." #caf-post-layout4 span.date,".$target_div." #caf-post-layout4 span.comment {
font-family:".$caf_post_font.";}

".$target_div." #caf-post-layout4 a.caf-read-more {border-color: ".$caf_post_primary_color."; color: ".$caf_post_sec_color."; }

".$target_div." #caf-post-layout4 a.caf-read-more:hover {background-color: ".$caf_post_sec_color.";color: ".$caf_post_primary_color.";}

".$target_div." .error-caf{background-color: ".$caf_post_primary_color."; color: ".$caf_post_sec_color.";font-size:".$caf_post_title_font_size."px;font-family:".$caf_post_font.";}
".$target_div." .status i {color:".$caf_post_primary_color.";}
</style>";