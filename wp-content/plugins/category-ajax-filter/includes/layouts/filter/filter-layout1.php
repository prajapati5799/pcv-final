<?php
if(class_exists("TC_CAF_PRO")) {
if(get_post_meta($id,'caf_filter_search')) {
$caf_filter_search=get_post_meta($id,'caf_filter_search',true);
}
if(get_post_meta($id,'caf_filter_search_layout')) {
$caf_filter_search_layout=get_post_meta($id,'caf_filter_search_layout',true);
}
if(get_post_meta($id,'caf_default_term')) {
$caf_default_term=get_post_meta($id,'caf_default_term',true);
}
 
if($caf_filter_search=="on") {
 $flsr=$caf_filter_search_layout." srch-on";
} 
 else {
$flsr='';
 }
 $cl='';
 if($caf_default_term=="all") {
  $cl='active';
 }
 //var_dump($terms_sel);
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
 	$caf_default_term='';

}
?>
<div id="caf-filter-layout1" class='caf-filter-layout data-target-div<?php echo esc_attr($b)." ".$flsr;?>'>
<ul class="caf-filter-container caf-filter-layout1">
<?php
if($terms_sel) {
 //echo $id;
$total_terms=count($terms_sel);
 $total_terms_1=$total_terms-1;
 
$terms_sel=apply_filters('tc_caf_filter_order_by',$terms_sel,$id);
 if(class_exists("TC_CAF_PRO")) {
  $trm1=implode(',',$terms_sel_tax);
 }
  else {
  $trm1=implode(',',$terms_sel);
  }
$all_text="All";
$all_text=apply_filters('tc_caf_filter_all_text',$all_text,$id);
 if(!class_exists("TC_CAF_PRO")) {
  $cl='active';
 }
echo '<li class="caf-mb-4"><a href="#" data-id="'.esc_attr($trm1).'" data-main-id="flt" class="'.$cl.'" data-target-div="data-target-div'.esc_attr($b).'">'.$all_text.'</a></li>';
foreach ($terms_sel as $key=>$term) {
$term_data=get_term($term);
if($term_data) {
 if(class_exists("TC_CAF_PRO"))
 {
  if($caf_filter_more_btn=="on") {
 $more_link_val=$caf_filter_more_val;
if($key==$more_link_val) {
   echo "<li class='caf-mb-4 more'><span>+More</span><ul>";
    }
 }
 if($caf_default_term==$term_data->taxonomy."___".$term_data->term_id) {$cl='active';} else {$cl='';} 
 }
 else {
  $cl='';
 }
 if(class_exists("TC_CAF_PRO")) {
  $data_id=esc_attr($term_data->taxonomy)."___".esc_attr($term_data->term_id);
 }
 else {
  $data_id=esc_attr($term_data->term_id);
 }
echo "<li class='caf-mb-4'><a href='#' data-id='".$data_id."' data-main-id='flt' data-target-div='data-target-div".esc_attr($b)."' class='".$cl."'>".esc_html($term_data->name)."</a></li>";
 if(class_exists("TC_CAF_PRO"))
 {
  if($caf_filter_more_btn=="on") {
   
  if($key==$total_terms_1) {
     echo "</ul></li>";
    }
  }
 }
}	
}
}	
  do_action("caf_after_filter_layout",$id,$b); 
?>
</ul>
 <?php 
 //do_action("caf_after_filter_layout",$id,$b); 
 ?>
 
</div>
<?php
echo "<style>
 .data-target-div".$b." #caf-filter-layout1 li a,.data-target-div".$b." #caf-filter-layout1 li.more span {background-color: ".$caf_filter_sec_color.";color: ".$caf_filter_primary_color.";text-transform:".$caf_filter_transform.";font-family:".$caf_filter_font.";font-size:".$caf_filter_font_size."px;}
 .data-target-div".$b." .manage-caf-search-icon i {background-color: ".$caf_filter_sec_color.";color: ".$caf_filter_primary_color.";text-transform:".$caf_filter_transform.";font-size:".$caf_filter_font_size."px;}
.data-target-div".$b." #caf-filter-layout1 li a.active {background-color: ".$caf_filter_sec_color2.";color: ".$caf_filter_sec_color.";}

.data-target-div".$b." .search-layout2 input#caf-search-sub,.data-target-div".$b." .search-layout1 input#caf-search-sub {background-color: ".$caf_filter_sec_color.";color: ".$caf_filter_primary_color.";text-transform:".$caf_filter_transform.";font-size:".$caf_filter_font_size."px;}

.data-target-div".$b." .search-layout2 input#caf-search-input {font-size:".$caf_filter_font_size."px;text-transform:".$caf_filter_transform.";}
.data-target-div".$b." .search-layout1 input#caf-search-input {font-size:".$caf_filter_font_size."px;text-transform:".$caf_filter_transform.";}</style>";
?>