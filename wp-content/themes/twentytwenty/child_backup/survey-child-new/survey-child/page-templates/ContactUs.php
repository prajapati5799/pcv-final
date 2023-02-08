<?php

/**
 * Template Name: Contact Us
 *
 */
get_header();

?>
<body class="home">

    <div id="wrapper">

        

      <div class="banner">
		  <div class="banner-slider slider">
			  <?php 
			  $slider = get_field('banner_slider');
			  echo do_shortcode($slider); ?>
		  </div>
      </div>
      
    <div id="content">
         
         <div class="inner-banner">
            <div class="container">
               <div class="innerbaqnner-content">
                  <h1>Contact Us</h1>
                  <p>In case of any queries please reach out to 
					  <a href="<?php echo get_field('contact_email'); ?>"><?php echo get_field('contact_email'); ?></a>
					  
				   </p>
               </div>
            </div>
         </div>
<div class="about-section">
            <div class="container">
               <div class="row">
<!--                  <?php echo do_shortcode('[contact-form-7 id="515" title="Contact form 1"]'); ?> -->
            </div>
         </div>
         
              
              
<?php
//get_sidebar();
    get_footer();
