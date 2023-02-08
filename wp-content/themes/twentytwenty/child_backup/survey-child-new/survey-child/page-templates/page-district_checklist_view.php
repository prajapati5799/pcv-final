<?php
/**
 * Template Name: District Checklist View
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
?>
<script type="text/javascript">
    var record_id = <?php echo isset($_GET['record_id']) ? $_GET['record_id'] : 0?>;
    var nex_form_id = <?php echo isset($_GET['nex_form_id']) ? $_GET['nex_form_id'] : 0?>;
    var user_id = <?php echo isset($_GET['user_id']) ? $_GET['user_id'] : 0?>;
</script>
<?php
get_footer();