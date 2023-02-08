<?php
/**
 * Template Name: Login page
 *
 */
get_header();

    while ( have_posts() ) :
        the_post();

        echo '<div class="container">';
            echo '<div class="login-page">';
                the_content();
            echo '</div>';
        echo '</div>';

    endwhile;

get_sidebar();
get_footer();