<?php
/**
 * Template Name: District Checklist
 *
 */
get_header();

    while ( have_posts() ) :
        the_post();

        echo '<section class="main-section">';
            echo '<div class="state-checklist-form">';
                echo '<div class="container">';

                    echo '<header class="entry-header">';
                        the_title( '<h1 class="entry-title">', '</h1>' );
                    echo '</header>';

                    the_content();

                echo '</div>';
            echo '</div>';
        echo '</section>';

    endwhile;

get_sidebar();
get_footer();