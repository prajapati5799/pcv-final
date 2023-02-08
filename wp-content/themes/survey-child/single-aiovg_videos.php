<?php

/**

Template Name: * */ get_header();
?>

<div id="content">
   <div class="row">
      <div class="container">
         <div id="wrapper">
         <div class="row">
            <div class="col-md-12">
               <button id="back_btn" class="btn waves-effect waves-light back_button"  name="action">Back<i class="material-icons left"></i></button>
            </div>
         </div>
         <div class="row">
          
            <div class="col-md-12 resource-single">
               <h1 class="entry-header"><?php echo get_the_title(); ?></h1>
               <?php the_content(); ?>
            </div>
         </div>
      </div>
</div>
   </div>
</div>


<?php
//get_sidebar();
    get_footer();


