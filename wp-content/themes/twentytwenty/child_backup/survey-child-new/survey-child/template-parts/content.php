<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package survey
 */

?>
			
				<div class="col-md-4 col-sm-6">
					<div class="card-wrapper">
                        <div class="card-image">
                           <a href="<?php esc_url( get_permalink() ); ?>"><?php survey_post_thumbnail(); ?></a>
                        </div>
                        <div class="card-content equal-height">
                           <h6>
                              <a href="<?php esc_url( get_permalink() ); ?>">
                                 <?php echo wp_kses_post( get_the_title() ); ?>
                              </a>
                           </h6>
                           <p>
                              <?php  
// 							   echo wp_trim_words( get_the_content(), 20); 
							   ?>
                           </p>
                           <?php 
                           if(get_field('pdf_file')){
                              echo '<a href="'.get_field("pdf_file").'" target="_blank" class="readmore-btn">Read More</a>';
                           }else{ ?>
                              <a href="<?php echo get_permalink(); ?>" class="readmore-btn">Read More</a>
                           <?php } ?>
                          
                        </div>
                     </div>
                  </div>
               
		

	
