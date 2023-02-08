<?php

/**
 * Template Name: Homepage
 *
 */
get_header();
?>

<body class="home">
  <div id="wrapper">
    <div class="banner">
      <div class="bannertext home-digit">
      <h2 class="bannertext"> <?php echo get_field('total_doses_description'); ?></h2>
        <?php echo do_shortcode('[total_doses]'); ?>
      </div>
      <div class="banner-slider slider">
        <?php
        $slider = get_field('banner_slider');
        echo do_shortcode($slider); ?>
      </div>
    </div>
    <div id="content">
      <a class="go-down" href="javascript:void(0);"><img src="wp-content/uploads/2022/05/arrowdown.svg"></a>
      <div class="grid-section active1" id="grid-section">
        <div class="container">
          <div class="row">
            <?php
            if (have_rows('grid_section')) {
              while (have_rows('grid_section')) {
                the_row();
                $grid_section_image = get_sub_field('grid_section_image');
                $grid_section_number = get_sub_field('grid_section_number');
                $grid_section_text = get_sub_field('grid_section_text');
            ?>
                <div class="col-md-4 col-sm-6">
                  <div class="item">
                    <div class="icon">
                      <img src="<?php echo $grid_section_image; ?>" alt="">
                    </div>
                    <h2 class="counter"><?php echo $grid_section_number; ?></h2>
                    <p><?php echo $grid_section_text; ?></p>
                  </div>
                </div>
            <?php
              }
            }
            ?>
          </div>
        </div>
      </div>

      <div class="about-section" id="about">
        <div class="container">
          <div class="heading text-center">
            <h2><?php echo get_field('about_title'); ?></h2>
            <h2><?php //echo get_field('about_sub_title'); ?></h2>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="image-col">
                <img src="<?php echo get_field('about_image'); ?>" alt="">
              </div>
            </div>
            <div class="col-md-6">
              <div class="content-col">
                <?php echo get_field('about_details'); ?>
          <a href="<?php echo home_url('about-us'); ?>" class="readmore-btn"><?php echo get_field('about_read_more_button'); ?>Read More</a>
      </div>
            </div>
            <div class="col-md-12">
            <?php echo get_field('about_details_2'); ?>
        
        </div>
          </div>
        </div>
      </div>
      <div class="resources-section" id="resources">
        <div class="container">
          <div class="tabs-right">
            <div class="heading">
              <h2><?php echo get_field('resources_heading'); ?></h2>
              
            </div>
            <!-- <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#image">Photos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#video">Video</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#document">Document</a>
              </li>
            </ul> -->
          </div>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="image">
              <div class="image-row">
                <div class="row">
          
        <?php
        $featured_posts = get_field('document_resource_copy');
        if( $featured_posts ): ?>
          <?php foreach( $featured_posts as $post ): ?>
            <div class="col-md-4 col-sm-6">
              <div class="item">
                <div class="image">
                <?php echo get_the_post_thumbnail($post,'full'); ?>
                </div>
                <div class="content">
<!--                <img src="<?php //echo get_field('resources_icon'); ?>" alt=""> -->
                <p><?php the_title(); ?></p>
                </div>
              </div>
              </div>
          <?php
            // Setup this post for WP functions (variable must be named $post).
            setup_postdata($post); ?>
<!--            <li>
              <a href="<?php //the_permalink(); ?>"><?php //the_title(); ?></a>
            </li> -->
          <?php endforeach; ?>
          <?php 
          // Reset the global post object so that the rest of the page works correctly.
          wp_reset_postdata(); ?>
        <?php endif; ?> 
          
          
          
                  
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="video">
              <div class="image-row">
                <div class="row">
                  <?php
                  if (have_rows('video_resources')) {
                    while (have_rows('video_resources')) {
                      the_row();
                      $resources_video = get_sub_field('resources_video');
                      $video_resources_intro = get_sub_field('video_resources_intro');
                  ?>
                      <div class="col-md-4 col-sm-6">
                        <div class="item">
                          <div class="image">
                            <img src="<?php echo $resources_video; ?>" alt="">
                          </div>
                          <div class="content">
                            <img src="<?php echo get_field('resources_icon'); ?>" alt="">
                            <p><?php echo $video_resources_intro; ?></p>
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

<div class="tab-pane fade" id="document">
              <div class="image-row">
                
              </div>
            </div>
            <div class="btn-row">
              <a href="<?php echo home_url('resources'); ?>" class="readmore-btn">Read More</a>
            </div>
          </div>
        </div>
      </div>

      <div class="gallery-section" id="gallery">
        <div class="container">
          <div class="gallery-block">
            <div class="tabs-right">
              <div class="heading">
                <h2>Photo Gallery</h2>
                
              </div>
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" data-toggle="tab" href="<?php echo site_url('gallery'); ?>">Photos</a>
                </li>
                <li class="nav-item">
                  <!--                   <a class="nav-link" data-toggle="tab" href="#videos">Video</a> -->
                </li>
              </ul>
            </div>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="images">
                <div class="image-row">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="row">
                        <div class="small-row">
                          <?php
                          if (have_rows('photo_gallery__small')) {
                            while (have_rows('photo_gallery__small')) {
                              the_row();
                              $photo_gallery__image = get_sub_field('photo_gallery__image');
                          ?>
                              <div class="small-image">
                                <img src="<?php echo $photo_gallery__image; ?>" alt="">
                              </div>
                          <?php
                            }
                          }
                          ?>
                        </div>
                        <div class="large-row">
                          <div class="row-hr">
                            <?php
                            if (have_rows('image_gallary_row')) {
                              while (have_rows('image_gallary_row')) {
                                the_row();
                                $image_gallary_row_small = get_sub_field('image_gallary_row_small');
                            ?>
                                <div class="small-image">
                                  <img src="<?php echo $image_gallary_row_small; ?>" alt="">
                                </div>
                            <?php
                              }
                            }
                            ?>
                          </div>
                          <div class="row-hr">
                            <div class="large-image">
                              <img src="<?php echo get_field('large_gallary_image'); ?>" alt="">
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
 <div class="col-lg-6">
                      <div class="row">
                        <div class="small-row">
                          <?php
                          if (have_rows('image_gallary_row1')) {
                            while (have_rows('image_gallary_row1')) {
                              the_row();
                              $image_gallary_row_small1 = get_sub_field('image_gallary_row_small1');
                          ?>
                              <div class="small-image">
                                <img src="<?php echo $image_gallary_row_small1; ?>" alt="">
                              </div>
                          <?php
                            }
                          }
                          ?>
                        </div>
                        <div class="large-row">
                          <div class="row-hr">
                            <div class="large-image">
                              <img src="<?php echo get_field('large_gallary_image1'); ?>" alt="">
                            </div>
                          </div>
                          <div class="row-hr">
                            <?php
                            if (have_rows('image_gallary_last_large')) {
                              while (have_rows('image_gallary_last_large')) {
                                the_row();
                                $image_gallary_row_large_image = get_sub_field('image_gallary_row_large_image');
                            ?>
                                <div class="small-image">
                                  <img src="<?php echo $image_gallary_row_large_image; ?>" alt="">
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
                </div>
              </div>
              <div class="tab-pane fade" id="videos">
                <div class="image-row">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="row">
                        <div class="small-row">
                          <?php
                          if (have_rows('video_section')) {
                            while (have_rows('video_section')) {
                              the_row();
                              $video_section1 = get_sub_field('video_section1');
                          ?>
                              <div class="small-image">
                                <img src="<?php echo $video_section1; ?>" alt="">
                              </div>
                          <?php
                            }
                          }
                          ?>
                        </div>
                        <div class="large-row">
                          <div class="row-hr">
                            <?php
                            if (have_rows('video_section_right')) {
                              while (have_rows('video_section_right')) {
                                the_row();
                                $video_section_small = get_sub_field('video_section_small');
                            ?>
                                <div class="small-image">
                                  <img src="<?php echo $video_section_small; ?>" alt="">
                                </div>
                            <?php
                              }
                            }
                            ?>
                          </div>
                          <div class="row-hr">
                            <div class="large-image">
                              <img src="<?php echo get_field('video_section_large'); ?>" alt="">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-row">
                <a href="<?php echo site_url('gallery'); ?>" class="readmore-btn">View All</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="faq-block" id="faq">
        <div class="container">
          <div class="heading text-center">
            <h2><?php echo get_field('faq'); ?></h2>
            <h2><?php //echo get_field('faq_title'); ?></h2>
          </div>
          <div class="faq-section" id="faq">
            <div class="row">
              <div class="col-md-6">
                <?php
                if (have_rows('faq_repeater')) {
                  while (have_rows('faq_repeater')) {
                    the_row();
          $string =  get_sub_field('faq_repeater_quection');
                    $words =  8;
                    $add = '..';
                    $faq_repeater_quection = get_sub_field('faq_repeater_quection');
                    $faq_repeater_answers = get_sub_field('faq_repeater_answers');
                ?>
                    <div class="accordian-col">
                      <div class="accordion-panel">
                        <div class="accordion-panelheading">
                        <h5 title="<?php echo $string; ?>" class="accordion-paneltitle">
                            <?php echo wp_trim_words($faq_repeater_quection,$words,$add); ?>
                          </h5>
                        </div>
                        <div class="accordion-panelbody">
                          <div class="panelbody-content">
                            <?php echo $faq_repeater_answers; ?>
                          </div>
                        </div>
                      </div>
                    </div>
                <?php
                  }
                }
                ?>
              </div>
              <div class="col-md-6">
                <?php
                if (have_rows('faq_repeater_right')) {
                  while (have_rows('faq_repeater_right')) {
                    the_row();
          $string =  get_sub_field('faq_repeater_quection');
                    $words =  8;
                    $add = '..';
                    $faq_repeater_quection_right = get_sub_field('faq_repeater_quection_right');
                    $faq_repeater_answers_right = get_sub_field('faq_repeater_answers_right');
                ?>
                    <div class="accordian-col">
                      <div class="accordion-panel">
                        <div class="accordion-panelheading">
                        <h5 title="<?php echo $string; ?>" class="accordion-paneltitle">
                            <?php echo wp_trim_words($faq_repeater_quection_right,$words,$add); ?>
                          </h5>
                        </div>
                        <div class="accordion-panelbody">
                          <div class="panelbody-content">
                            <?php echo $faq_repeater_answers_right; ?>
                          </div>
                        </div>
                      </div>
                    </div>
                <?php
                  }
                }
                ?>
              </div>

            </div>
            <div class="btn-row">
              <a href="<?php echo site_url('faq'); ?>" class="readmore-btn">View All</a>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="news-section" id="news">
        <div class="container">
          <div class="heading text-center">
            <h2><?php //echo get_field('news_title'); ?></h2>
            <h2><?php //echo get_field('news_sub_title_'); ?></h2>
          </div>
          <div class="news-slider slider">
            <?php
            // if (have_rows('news_repeater')) {
            //   while (have_rows('news_repeater')) {
            //     the_row();
            //     $news_image = get_sub_field('news_image');
            //     $news_content = get_sub_field('news_content');
            //     $news_date = get_sub_field('news_date');
            //     $news_button = get_sub_field('news_button');
            ?>
                <div class="item">
                  <div class="image">
                    <a href="#"><img src="<?php //echo $news_image; ?>" alt=""></a>
                  </div>
                  <div class="content">
                    <h4><a href="#"><?php //echo $news_content; ?></a></h4>
                    <div class="date"><?php //echo $news_date; ?></div>
                    <a href="<?php// echo $news_button; ?>" class="read-more">Read More</a>
                  </div>
                </div>
            <?php
             // }
            //}
            ?>
          </div>
        </div>
      </div> -->

    </div>
  </div>
  </div>
  <!-- <div class="arrowup"><a class="up" href="#"><img src="wp-content/uploads/2022/05/arrowdown.svg"></img></a></div> -->
  <?php
  //get_sidebar();
  get_footer();

