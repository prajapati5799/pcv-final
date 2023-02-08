<?php

/**
 * Template Name: About
 *
 */
get_header();

?>
<div id="content">
        
         <div class="inner-banner">
            <div class="container">
               <div class="innerbaqnner-content">
                  <h1><?php echo get_field('about_title'); ?></h1>
                  <p><?php echo get_field('about_des'); ?></p>
               </div>
            </div>
         </div>
 
         <div class="about-section">
            <div class="container">
               <div class="row">
                  <div class="col-md-6">
                     <div class="video-frame">
                        <div class="img">
<!--                            <div class="play-btn"><div class="icon"><img src="<?php //echo get_field('about_icon'); ?>"></div></div> -->
                           <img src="<?php echo get_field('about_resource_image'); ?>" alt="">
                        </div>
                        <?php //echo get_field('about_video'); ?>
                        <div class="video-main">

                           <div id="platformVideo" controls poster="<?php echo get_field('about_resource_image'); ?>">
                             <?php echo get_field('about_video'); ?>
                           </div>
                        </div>
                        
                     </div>
                  </div>
                  <div class="col-md-6">
                     <div class="content-col">
                        <?php echo get_field('about_info'); ?>
                     </div>
                  </div>
               </div>
               <?php echo get_field('about_info1'); ?>
            </div>
         </div>

         <!-- <div class="news-listsection light-orangebg">
            <div class="container">
               <div class="heading text-center">
                  <h5><?php //echo get_field('latest_news'); ?></h5>
                  <h2><?php //echo get_field('latest_news_title'); ?></h2>
               </div>
               <div class="row">
                   <?php
                //   if( have_rows('latest_news_image') ){
                //     while( have_rows('latest_news_image') ) { the_row();
                //       $latest_news_image = get_sub_field('latest_news_image');
                //       $news_headding = get_sub_field('news_headding');
                //       $news_info = get_sub_field('news_info');
                //       $news_repeater_button = get_sub_field('news_repeater_button');
                      ?>
                  <div class="col-md-6">
                     <div class="item">
                        <div class="image">
                           <a href="#"><img src="<?php //echo $latest_news_image; ?>" alt=""></a>
                        </div>
                        <div class="content">
                           <h4><a href="#"><?php //echo $news_headding; ?></a></h4>
                           <p><?php //echo $news_info; ?></p>
                           <a href="<?php //echo $news_repeater_button; ?>" class="read-more">Learn more</a>
                        </div>
                     </div>
                  </div>
                  <?php
                      //}
                 // }
                  ?>
               </div>
            </div>
         </div> -->
      
      </div>
<?php
//get_sidebar();
    get_footer();
