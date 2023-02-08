<?php
/**
 * Template Name: FAQ
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
   <div class="container">
   <div id="content">
      <div class="inner-banner">
         <div class="container">
            <div class="innerbaqnner-content">
               <h1>FAQs</h1>
               <p>We document and disseminate various results, trainings, and resources from our research, programs, and projects.</p>
            </div>
         </div>
      </div>
      <div class="resourceslist-section">
         <div class="row">
            <div class="col-md-12">
				<div class="filter-row">
               <?php
               if (have_rows('faq_lang'))
               { ?>
               <div class="column filter-by">
                  <label>Filter By :</label>
                  <select class="select-menu select-lang">
                     <?php
                         while (have_rows('faq_lang'))
                         {
                             the_row();
                             $faq_lang = get_sub_field('language');
                     ?>
                     <option value="<?php echo strtolower($faq_lang); ?>"><?php echo $faq_lang; ?></option>
                     <?php
                         }
                     }
                     ?>
                  </select>
               </div>
            </div>
		 </div>
         </div>
         <div class="row faq-inner">
               <?php
               if (have_rows('faq_lang'))
               {
                  echo '<div class="col-md-12">';
                   while (have_rows('faq_lang'))
                   {
                       the_row();
                       $faq_lang = get_sub_field('language');
                       echo '<div class="'.strtolower($faq_lang).' faq_qna">';

                       if (have_rows('qna')):
                           echo '<div class="accordian-col">';
                           while (have_rows('qna')):
                               the_row();
                               $string =  get_sub_field('question');
                                $words =  8;
                                $add = '..';
                               ?>
                              
                              
                                 <div class="accordion-panel">
                                    <div class="accordion-panelheading">
                                       <h5 title="<?php echo $string; ?>" class="accordion-paneltitle"><?php echo wp_trim_words($string,$words,$add); ?></h5>
                                    </div>
                                    <div class="accordion-panelbody">
                                       <div class="panelbody-content">
                                          <?php echo the_sub_field('answers');; ?>
                                       </div>
                                    </div>
                                 </div>
                              
                              
                              <?php

                           endwhile;
                           echo '</div></div>';
                       endif;
               ?>
               <?php
                   }
                   echo '</div></div>';
               }
               ?>
            </div>
      </div>
   </div>
</div>
   <?php
//get_sidebar();
get_footer();

