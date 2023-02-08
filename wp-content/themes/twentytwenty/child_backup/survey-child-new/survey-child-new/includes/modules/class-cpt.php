<?php
defined( 'ABSPATH' ) || exit;

/**
 *  Create Custom Post types
 	// https://www.ibenic.com/create-custom-wordpress-post-status/
 */
class CreateCPT
{
	Protected $cpts;
	Protected $taxonomy;
	Protected $status;
	
	function __construct( $request_cpt =[], $request_taxonomy = [], $request_status = [] ){

		$this->cpts 						= $request_cpt;
		$this->taxonomy 					= $request_taxonomy;
		$this->status 						= $request_status;

		add_action( 'init', 				[ $this, 'theme_register_cpt' ] );

		add_action( 'admin_footer', 		[ $this, 'display_post_statuses' ] );
		
	}

	public function theme_register_cpt(){

		if( $this->cpts && !empty( $this->cpts ) ){
			foreach ( $this->cpts as $cpt_slug => $cpt_args ) {

				// Register Post
				register_post_type( $cpt_slug, $cpt_args );
			}
		}

		if( $this->taxonomy && !empty( $this->taxonomy ) ){
			foreach ( $this->taxonomy as $taxonomy_slug => $taxonomy_args ) {

				// Assign to post
				$post_slugs = $taxonomy_args['post_slugs'];
				unset( $taxonomy_args['post_slugs'] );

				// Register Taxonomy
				register_taxonomy( $taxonomy_slug, $post_slugs, $taxonomy_args );
			}
		}

		if( $this->status && !empty( $this->status ) ){
			foreach ( $this->status as $status_slug => $status_args ) {

				// Register Post Status
				register_post_status( $status_slug, $status_args );
			}
		}

		flush_rewrite_rules();
	}

	public function display_post_statuses(){
	    global $post, $wp_post_statuses;

	    $post_wise_status 					= [];

	    if( $wp_post_statuses && !empty( $wp_post_statuses ) ){
	    	foreach ( $wp_post_statuses as $status ){

	    		if ( ! $status->_builtin && $status->post_type && !empty( $status->post_type ) ){

	    			// Match against the current posts status
	                $selected = selected( $post->post_status, $status->name, false );

	                // Build the options
	                $options = "<option{$selected} value='{$status->name}'>{$status->label}</option>";

	    			foreach ( $status->post_type as $post_type ) {
	    				$post_wise_status[$post_type][] = $options;
	    			}
	                
	            }
	    	}	
	    }

	    if( in_array( $post->post_type, array_keys( $post_wise_status ) ) ){

	    	$append_option = implode( "", $post_wise_status[$post->post_type] );
	    	?>
			<script>
				( function($){
					$(document).ready(function(){
						$('select#post_status').append( "<?php echo $append_option; ?>");
						$('select[name="_status"]').append( "<?php echo $append_option; ?>");
						//$('.misc-pub-section label').append( "<?php echo $append_option; ?>");
					});
				})( jQuery );
			</script>
			<?php
	    }
	}
}
?>