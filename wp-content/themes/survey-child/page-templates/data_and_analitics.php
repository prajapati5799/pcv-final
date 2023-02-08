<?php

/**
 * Template Name: data and analitics
 *
 */
get_header();

?>
<div id="wrapper">
   <div id="content">
   <div class="inner-banner">
            <div class="container">
               <div class="innerbaqnner-content">
                  <h1><?php echo get_field('data_and_analytic_title'); ?></h1>
                  <p><?php echo get_field('data_and_analytic_description'); ?></p>
               </div>
            </div>
         </div>
    <div class="grid-section">
         <div class="container">
         <div class="innerbaqnner-content">
                  
               </div>
            <div class="row">

               <?php
               if (have_rows('analitics')) {
                  while (have_rows('analitics')) {
                     the_row();
                     $analitics_image = get_sub_field('analitics_image');
                     $analitics_text_desc = get_sub_field('analitics_text_desc');
                     $anlalitics_link = get_sub_field('anlalitics_link');

               ?>
                     <div class="col-md-6 col-sm-6">
                     <div class="card-image">
                     <img src="<?php echo $analitics_image; ?>">
                  
                        <div class="item">
                           <a href="<?php echo $anlalitics_link; ?>" target="_blank">
                              <p><?php echo $analitics_text_desc; ?></p>
                           </a>
                           </div>
                        </div>
                     </div>
               <?php
                  }
               }
               ?>
            </div>
         </div>
      </div>
   </div>
</div>
<?php
//get_sidebar();
get_footer();
