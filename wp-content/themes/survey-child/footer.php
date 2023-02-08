<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package survey
 */

?>

<!-- <footer class="footer">
		        <div class="container">
		            <div class="row">
		               <div class="col-sm-12">
		               		<?php
                           if (get_field('footer_text', 'option')) {
                              echo '<p>' . get_field('footer_text', 'option') . '</p>';
                           }

                           if (get_field('copyright_text', 'option')) {
                              echo '<p>' . get_field('copyright_text', 'option') . '</p>';
                           }
                           ?>
		               </div>  
		            </div>
		        </div>
		    </footer> -->
<footer class="footer">

   <div class="container">
      <!-- <div class="footer-one">
               <div class="row">
                  <div class="col-lg-4 col-md-4">
                     <div class="footer-col">
                        <h5>Newsletter</h5>
                        <p>
                           Enter your email and we’ll send you some samples of our favorite classes.  With specialists from all over the world – all under one roof – yoo...
                        </p>
                        <div class="newsletter">

							   <?php //echo do_shortcode('[contact-form-7 id="629" title="Subcribe"]') 
                        ?>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-4 col-md-4">
                  </div>
                  <div class="col-lg-4 col-md-4">
                     <div class="footer-col">
                        <h5>Explore</h5>
                        <div class="footer-nav">
                           <ul>
                              <li><a href="#">Link 1</a></li>
                              <li><a href="#">Link 2</a></li>
                              <li><a href="#">Link 3</a></li>
                              <li><a href="#">Link 4</a></li>
                           </ul>
                           <ul>
                              <li><a href="#">Link 5</a></li>
                              <li><a href="#">Link 6</a></li>
                              <li><a href="#">Link 7</a></li>
                              <li><a href="#">Link 8</a></li>
                           </ul>
                        </div>
                     </div>
                  </div>
                 
               </div>
            </div> -->
      <div class="footer-last">
         <p><?php //echo get_field('copyright','option'); 
            ?></p>
      </div>
   </div>
</footer>

</div>

<?php wp_footer(); ?>

</body>

</html>