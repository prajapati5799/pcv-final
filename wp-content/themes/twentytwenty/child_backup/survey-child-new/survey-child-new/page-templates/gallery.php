<?php

/**
 * Template Name: Gallery
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
                  <h1>Gallery</h1>
                  <p>We document and disseminate various results, trainings, and resources from our research, programs, and projects.</p>
               </div>
            </div>
         </div>

         <div class="resourceslist-section gallerylist-section">
            <div class="container">
<!--                <div class="filter-row">
                  <div class="column filter-by">
                     <label>Filter By :</label>
                     <select class="select-menu">
                        <option>Image</option>
                        <option class="wonderplugin-gridgallery-tag" data-slug="cat1">Image 1</option>
                        <option class="wonderplugin-gridgallery-tag" data-slug="cat2">Image 2</option>
                        
                     </select>
                  </div>
                 
                     <div class="column short-by">
                     <label>Short By :</label>
                  </div>
                  </div> -->
               </div>
                <?php echo do_shortcode('[wonderplugin_gridgallery id=1]'); ?>
            </div>
         </div>
      
      </div>
   
    </div>
<?php
//get_sidebar();
    get_footer();
