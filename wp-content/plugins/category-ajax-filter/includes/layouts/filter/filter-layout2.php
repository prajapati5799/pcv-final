<?php
if(class_exists("TC_CAF_PRO")) {
 $caf_filter_search='off';
if(get_post_meta($id,'caf_filter_search')) {
$caf_filter_search=get_post_meta($id,'caf_filter_search',true);
}
if(get_post_meta($id,'caf_filter_search_layout')) {
$caf_filter_search_layout=get_post_meta($id,'caf_filter_search_layout',true);
}
if($caf_filter_search=="on") {
 $flsr=$caf_filter_search_layout." srch-on";
} 
 else {
$flsr='';
 }
 $trm=array();
 foreach($terms_sel as $term) {
    if( strpos($term, '___') !== false ) {
     $ln=strpos($term,"___");
     $tx=substr($term,0,$ln);
     $trm[]=substr($term,$ln+3); 
   }
    }
 $terms_sel_tax=$terms_sel;
 $terms_sel=$trm;
}
else {
 $flsr='';
}
?>
<div id="caf-filter-layout2" class='caf-filter-layout data-target-div<?php echo esc_attr($b)." ".$flsr; ?>'>
<div class="selectcont caf-filter-container">
<?php
	if($terms_sel) {
  
  if(class_exists("TC_CAF_PRO")) {
  $trm1=implode(',',$terms_sel_tax);
 }
  else {
  $trm1=implode(',',$terms_sel);
  }

	echo '<div class="selectcont">
	<ul class="dropdown">
    <li class="init" value="1000"><span>';
		
	echo apply_filters('tc_caf_add_custom_span_before_filter',array($caf_filter,'tc_caf_add_custom_span_before_filter'),$id);
	echo'</span><span class=
    "result">';
	echo apply_filters('tc_caf_add_custom_list_before_filter',array($caf_filter,'tc_caf_add_custom_list_before_filter'),$id);	
	echo'</span><span class="arrow-down"><i class="fa fa-angle-down" aria-hidden="true"></i></span><span class="arrow-up" style="display: none;"><i class="fa fa-angle-up" aria-hidden="true"></i></span><ul>';
	echo '<li><a href="#" data-id="'.esc_attr($trm1).'" data-main-id="flt" class="caf-mb-3 active dfl" data-target-div="data-target-div'.esc_attr($b).'">';
	echo apply_filters('tc_caf_add_custom_list_before_filter','tc_caf_add_custom_list_before_filter',$id);	
	echo'</a></li>';
    $terms_sel=apply_filters('tc_caf_filter_order_by',$terms_sel,$id);	   
foreach ($terms_sel as $term) {
$term_data=get_term($term);
if($term_data) {
  if(class_exists("TC_CAF_PRO")) {
  $data_id=esc_attr($term_data->taxonomy)."___".esc_attr($term_data->term_id);
 }
 else {
  $data_id=esc_attr($term_data->term_id);
 }
echo "<li class='caf-mb-3'><a href='#' data-id='".$data_id."' data-main-id='flt' data-target-div='data-target-div".esc_attr($b)."'>".esc_html($term_data->name)."</a></li>";	
}	
}
echo '</ul></li>';
  
  echo'</ul>';
  
do_action("caf_after_filter_layout",$id,$b);
echo'</div>'; 	
}
?>
</ul>
</div>
</div>
<?php
echo "<style>
.data-target-div".$b." #caf-filter-layout2 .selectcont,.data-target-div".$b." #caf-filter-layout2 li,.data-target-div".$b." #caf-filter-layout2,.data-target-div".$b." #caf-filter-layout2 li ul li a  {font-family:".$caf_filter_font."}
.data-target-div".$b." #caf-filter-layout2 ul.dropdown li a {color: ".$caf_filter_sec_color.";}
.data-target-div".$b." #caf-filter-layout2 ul.dropdown li span {color: ".$caf_filter_primary_color.";}
.data-target-div".$b." #caf-filter-layout2 ul.dropdown li a.active {background-color: ".$caf_filter_sec_color2.";color: ".$caf_filter_primary_color.";}

.data-target-div".$b." .manage-caf-search-icon i {background-color: ".$caf_filter_sec_color.";color: ".$caf_filter_primary_color.";text-transform:".$caf_filter_transform.";font-size:".$caf_filter_font_size."px;}
.data-target-div".$b." #caf-filter-layout1 li a.active {background-color: ".$caf_filter_sec_color2.";color: ".$caf_filter_sec_color.";}

.data-target-div".$b." .search-layout2 input#caf-search-sub,.data-target-div".$b." .search-layout1 input#caf-search-sub {background-color: ".$caf_filter_sec_color.";color: ".$caf_filter_primary_color.";text-transform:".$caf_filter_transform.";font-size:".$caf_filter_font_size."px;}

.data-target-div".$b." .search-layout2 input#caf-search-input {font-size:".$caf_filter_font_size."px;text-transform:".$caf_filter_transform.";}
.data-target-div".$b." .search-layout1 input#caf-search-input {font-size:".$caf_filter_font_size."px;text-transform:".$caf_filter_transform.";}
</style>";
?>