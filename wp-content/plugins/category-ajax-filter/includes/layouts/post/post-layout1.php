<?php
include_once TC_CAF_PATH.'includes/query-variables.php';
if ( $qry->have_posts() ) : while ( $qry->have_posts() ) : $qry->the_post();
global $post;
?>
<article id="caf-post-layout1" class="caf-post-layout1 caf-col-md-<?php echo esc_attr($caf_desktop_col); ?> caf-col-md-tablet<?php echo esc_attr($caf_tablet_col); ?> caf-col-md-mobile<?php echo esc_attr($caf_mobile_col); ?> caf-mb-5 <?php echo esc_attr($caf_special_post_class); ?> <?php echo esc_attr($caf_post_animation); ?>" data-post-id="<?php echo esc_attr(get_the_id()); ?>">
<div class="manage-layout1">
<?php
	$caf_post_id=get_the_ID();
	$title= get_the_title();
	$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), $caf_image_size );
	$link=get_the_permalink();
 $caf_content=get_the_excerpt();
 $caf_content= preg_replace('#\[[^\]]+\]#', '',$caf_content);
 //$caf_content=wp_trim_words($caf_content,$c_length);
 $pcl='';
 if($caf_link_target=='popup') {$pcl='caf-popup'; $target='';}
 else {$target="target='".$caf_link_target."'"; }
	if($image[0]) {
	echo "<a href='".esc_url($link)."' $target class='$pcl' data-id='".$post->ID."'><span class='caf-featured-img-box' style='background:url(".esc_url($image[0]).")'></span></a>";
}
else{
$image=TC_CAF_URL.'assets/img/unnamed.jpg';
echo "<a href='".esc_url($link)."' $target class='$pcl' data-id='".$post->ID."'><span class='caf-featured-img-box' style='background:url(".esc_url($image).")'></span></a>";
}
 
echo "<div id='manage-post-area'>";
echo "<div class='caf-post-title'><a href='".esc_url($link)."' $target class='$pcl' data-id='".$post->ID."'><h2>".esc_attr($title)."</h2></a></div>";	
echo "<div class='caf-meta-content'>";
echo"<span class='author caf-col-md-4 caf-pl-0'><i class='fa fa-user' aria-hidden='true'></i> ".get_the_author()."</span>";
echo"<span class='date caf-col-md-6 caf-pl-0'><i class='fa fa-calendar' aria-hidden='true'></i> ".get_the_date('d, M Y ')."</span>";
echo"<span class='comment caf-col-md-3 caf-pl-0'><i class='fa fa-comment' aria-hidden='true'></i> ".get_comments_number()."</span>";
echo "</div>";
echo "<div class='caf-content'>".wp_kses_post($caf_content)."</div>";
if($caf_content) {
 $rd_more=esc_html('Read More');
echo "<div class='caf-content-read-more'><a class='caf-read-more $pcl' href='".esc_url($link)."' $target data-id='".$post->ID."'>".apply_filters('tc_caf_post_layout_read_more',$rd_more,$id)."</a></div>";
}
echo "</div>";
?>		
</div>
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
do_action("tc_caf_additional_css_layout1");
if(class_exists("TC_CAF_PRO")) {
 echo "<style>
".$target_div." #caf-post-layout1 .caf-content {font-family:".$caf_post_desc_font.";text-transform:".$caf_post_desc_transform.";font-size:".$caf_post_desc_font_size."px;}
</style>";
}
else {
echo "<style>
".$target_div." #caf-post-layout1 .caf-content {font-family:".$caf_post_font.";}
</style>";
}
$line_height=$caf_post_title_font_size+3;
echo "<style>
#caf-post-layout-container".$target_div.".post-layout1 {background-color: ".$caf_sec_bg_color.";font-family:".$caf_post_font.";}

".$target_div." #caf-post-layout1 .caf-post-title {background-color: ".$caf_post_primary_color.";}

".$target_div." #caf-post-layout1 .caf-post-title h2 {color: ".$caf_post_sec_color.";font-family:".$caf_post_font.";text-transform:".$caf_post_title_transform.";font-size:".$caf_post_title_font_size."px;font-weight:bold;line-height:".$line_height."px}

".$target_div." #caf-post-layout1 .caf-meta-content i {color:".$caf_post_sec_color2.";}

 ".$target_div." .caf-meta-content-cats li a {background-color: ".$caf_post_sec_color.";color:".$caf_post_sec_color2.";font-family:".$caf_post_font.";}

".$target_div." #caf-post-layout1 span.author,".$target_div." #caf-post-layout1 span.date,".$target_div." #caf-post-layout1 span.comment {
font-family:".$caf_post_font.";}

 ".$target_div." ul#caf-layout-pagination.post-layout1 li a {font-family:".$caf_post_font.";color: ".$caf_post_primary_color.";background-color:".$caf_post_sec_color."}
 
 ".$target_div." ul#caf-layout-pagination.post-layout1 li span.current { color: ".$caf_post_sec_color.";background-color: ".$caf_post_sec_color2.";font-family:".$caf_post_font.";}

".$target_div." .error-caf {background-color: ".$caf_post_primary_color."; color: ".$caf_post_sec_color.";font-family:".$caf_post_font.";font-size:".$caf_post_title_font_size."px;}

".$target_div." #caf-post-layout1 .caf-meta-content,".$target_div." #caf-post-layout1 .caf-content {color: ".$caf_post_sec_color2.";}

".$target_div." #caf-post-layout1 a.caf-read-more {font-family:".$caf_post_font.";border-color: ".$caf_post_primary_color."; color: ".$caf_post_primary_color.";background-color: ".$caf_post_sec_color.";}

".$target_div." #caf-post-layout1 a.caf-read-more:hover {background-color: ".$caf_post_primary_color.";}
".$target_div." .status i {color:".$caf_post_primary_color.";}
</style>";

