<?php /* Template Name: Resources Filter */ ?>
<?php get_header(); ?>

<main id="primary" class="site-main">
    <div id="content" <?php post_class(); ?>>
      
        <div class="inner-banner">
            <div class="container" id="up">
                <div class="innerbaqnner-content">
                    <h1><?php echo get_field('resources_title', 'option'); ?></h1>
                    <p><?php echo get_field('resources_desc', 'option'); ?></p>

                </div>
            </div>
        </div>
        <!-- <div class="resourceslist-section " id="up"> -->
        <div class="resourceslist-section">
            <div class="container">
                <div class="filter-row">
                
                    <div class="column filter-by">
                        <label>Filter By :</label>
                        <select class="select-menu res-filter " id="data-category-filter-select">
                            <option value=''>All Resources</option>
                            <?php
                                $args = array(
                                    'orderby' => 'name',
                                    'order' => 'ASC',
                                    'parent' => 0
                                );

                            $categories = get_categories($args);

                            foreach ($categories as $category) {

                                $category_slug = $category->slug;
                                $category_name = $category->name;
                                $selected_option = '';

                                if ($_GET['cat-by'] == $category_slug) {
                                    $selected_option = 'selected';
                                }

                                echo '<option ' . $selected_option . ' value="' . $category->slug . '">' . $category_name . '</option>';
                            }

                            ?>
                        </select>
                    </div>
                    
                    <?php
                   
                    if($_GET['cat-by'] == 'video' || $_GET['cat-by'] == 'faqs') {
                    ?>
                    <?php
                        $get_cat = array();
                        
                        if($_GET['cat-by'] == 'video'){
                            $parent_slug = 'video';
                            $get_cat = get_term_children_drc($parent_slug);
                            
                        }
                        if($_GET['cat-by'] == 'faqs'){
                            $parent_slug = 'faqs';
                            $get_cat = get_term_children_drc($parent_slug);
                        }                       
                        //echo '<pre>'; print_r($get_cat); exit;
                    ?>
                    <div class="column language-by">
                        <label>Language By :</label>
                        <select class="select-menu" name="lang-posts" id="languagebox">
                        <option value="0">Select Language</option>
                            <?php
                            foreach($get_cat as $get_cat_list){
                                $sub_option = '';

                                if ($_GET['subcat-by'] == $get_cat_list->slug) {
                                    $sub_option = 'selected';
                                }
                                echo '<option  ' . $sub_option . ' value="'.$get_cat_list->slug.'">'.$get_cat_list->name.'</option>';
                            }
                            ?>
                        </select>
                    </div>
                    <?php } ?>

                    
                    <div class="column short-by">
                        <label>Sort By :</label>
                        <select class="select-menu filter-order-select" name="sort-posts" id="sortbox">
                            <?php $sortby = $_GET['sort-by']; ?>
                            <option value="desc" <?php echo ($sortby == "desc") ? "selected" : ""; ?>>Newest</option>
                            <option value="asc" <?php echo ($sortby == "asc") ? "selected" : ""; ?>>Oldest</option>
                        </select>
                    </div>

                </div>

                <div class="row">

                    <?php

                    $paged = get_query_var('paged') ? get_query_var('paged') : 1;
                    $order = '';
                    if ($sortby != '') {
                        $order = ($sortby == "desc") ? "DESC" : "ASC";;
                    }
                    $order_by = 'date';
                    $tax_query = [];

                    
                        $slug_name = $_GET['cat-by'];
                        $sub_name = $_GET['subcat-by'];

                      
                        if (!empty($_GET['cat-by'])) {
                            $tax_query[] = [
                                'taxonomy' => 'category',
                                'field' => 'slug',
                                'terms' => $slug_name,
                                'operator' => 'IN',
                            ];
                        }
                        if (!empty($_GET['subcat-by'])) {
                            $tax_query[] = [
                                'taxonomy' => 'category',
                                'field' => 'slug',
                                'terms' => $sub_name,
                                'operator' => 'IN',
                            ];
                        }
                        
                  
                    $wp_query     = new WP_Query(array(
                        'post_type'      => 'post',
                        'posts_per_page' => 9,
                        'post_status'     => 'publish',
                        'paged'          => $paged,
                        'order'          => $order,
                        'tax_query'      => $tax_query,
                    ));
					while ($wp_query->have_posts()) : $wp_query->the_post();
                        get_template_part('template-parts/content', get_post_type());
                    endwhile;

                    ?>

                </div>

                <div class="pagination-row">
                    <ul class="pagination">
                        <?php do_pagination(); ?>
                    </ul>
                </div>

            </div>
        </div>
        <!-- <div class="container">
            <?php //echo do_shortcode('[aiovg_search_form keyword="0" category="1"]'); ?>
            <?php //echo do_shortcode('[aiovg_videos]'); ?>
        </div> -->
    </div>
</main>


<script>
    function replaceUrlParam(url, paramName, paramValue) {
        var pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)')
        if (url.search(pattern) >= 0) {
            return url.replace(pattern, '$1' + paramValue + '$2');
        }
        return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue
    }

    jQuery(function() {

        $('#data-category-filter-select').on('change', function() {
            var category_slug = $(this).val();
            var lng = $('#languagebox').val();
            
            
            if (window.location.href.indexOf("?") < 0) {
                window.location.href = window.location.href + "?cat-by=" + category_slug;
                
            } else {
                //alert(1);
                var subpar = getParameterByName('subcat-by');
                var catby = getParameterByName('cat-by');
                if(subpar != 0){
               //alert(2);
                   var newu = replaceUrlParam(window.location.href, "cat-by", category_slug);
                    window.location.href = replaceUrlParam(newu, "subcat-by", 0)
                    
                }
                else{
                //alert(3);
                }
                
            }
            
        });

       function getParameterByName(name) {
                name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }


        //sub category filter

        $('#languagebox').on('change', function() {
            var term_id = $(this).val();           
            if (window.location.href.indexOf("?") < 0) {
                replaceUrlParam(window.location.href, "subcat-by", term_id)
                window.location.href = window.location.href + "&subcat-by=" + term_id;
                
                
            } else {
                window.location.href = replaceUrlParam(window.location.href, "subcat-by", term_id)
            }
            return false;
        });



        $('.filter-order-select').on('change', function() {
            var category_slug = $(this).val();
            if (window.location.href.indexOf("?") < 0) {               
                window.location.href = window.location.href + "?sort-by=" + category_slug;
            } else {
                
                window.location.href = replaceUrlParam(window.location.href, "sort-by", category_slug)
            }
            return false;
        });

    });
</script>
<?php get_footer(); ?>