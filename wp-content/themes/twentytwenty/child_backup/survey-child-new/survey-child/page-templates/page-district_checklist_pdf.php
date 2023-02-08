<?php
/**
 * Template Name: District Checklist PDF
 *
 */

//is_access_form(STATE_FORM_NAME);

$form_id = isset($_REQUEST['record_id']) ? $_REQUEST['record_id'] : 0;

if( $form_id > 0 ){
    generate_district_form_pdf_by_record_id($form_id);
    die();
} else {
    wp_redirect(get_site_url());
    die();
}

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