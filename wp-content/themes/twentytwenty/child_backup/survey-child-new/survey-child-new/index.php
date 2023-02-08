<?php

/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package survey
 */

get_header();

$category_slug = '';
?>

<main id="primary" class="site-main">
	<div id="content" <?php post_class(); ?>>
		<div class="inner-banner">
			<div class="container">
				<div class="innerbaqnner-content">
					<h1><?php echo get_field('resources_title', 'option'); ?></h1>
					<p><?php echo get_field('resources_desc', 'option'); ?></p>
				</div>
			</div>
		</div>
		<div class="resourceslist-section">
			<div class="container">
				<div class="filter-row">
					<div class="column filter-by">
						<label>Filter By :</label>
						<select class="select-menu res-filter">
							<?php
							$categories = get_categories();
							foreach ($categories as $category) {
								$category_slug = $category->slug;
								$category_name = $category->name;
								$selected_option = '';
								if ($_COOKIE["cat-name"] == $category->slug) {
									$selected_option = 'selected';
								}


								echo '<option ' . $selected_option . ' value="' . $category->slug . '">' . $category_name . '</option>';
							}
							?>
						</select>
					</div>
					<div class="column short-by">
						<label>Sort By :</label>
						<select class="dropdown-class" name="sort-posts" id="sortbox">
							<option value="DESC">Newest</option>
							<option value="ASC">Oldest</option>
						</select>
					</div>
				</div>
				<div class="row">
					<?php
					$category_name = 'resources';

					if ($_COOKIE['cat-name']) {
						$category_name = $_COOKIE['cat-name'];
					} else {
						$category_name = '<span class="dflt"></span>';
					}

					
					$sort_name = 'ASC';
					if(!empty($_COOKIE['sorting'])){
						$sort_name = $_COOKIE['sorting'];
					}
					$temp = $wp_query;
					$wp_query = null;
					$wp_query = new WP_Query();


					$wp_query->query('&paged=' . $paged . '&category_name=' . $category_name . '&orderby=date&order=' . $sort_name);	
					
					
					while ($wp_query->have_posts()) {
						$wp_query->the_post();
						get_template_part('template-parts/content', get_post_type());
					}
					?>
				</div>
				<div class="pagination-row">
					<ul class="pagination">
						<?php do_pagination(); ?>
					</ul>
				</div>
			</div>
		</div>
	</div>
</main><!-- #main -->
<?php
//get_sidebar();
get_footer();
