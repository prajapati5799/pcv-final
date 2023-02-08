<?php
defined( 'ABSPATH' ) || exit;

class BackendUserMeta
{
    
    public function __construct(){
        add_action( 'user_new_form', array( $this, 'add_user_meta_fields' ) );
        add_action( 'user_register', array( $this, 'mktbn_user_register' ) );

        add_action( 'show_user_profile', array( $this, 'view_user_meta_fields' ) );
        add_action( 'edit_user_profile', array( $this, 'edit_user_meta_fields' ) );

        add_action( 'personal_options_update', array( $this, 'mktbn_user_register' ) );
        add_action( 'edit_user_profile_update', array( $this, 'mktbn_user_register' ) );

		add_action('admin_head', array( $this, 'load_jquery_for_users') );

		//add_filter( 'views_users', array( $this, 'modify_views_users'), 99 );
		//add_action( 'pre_user_query', array( $this, 'admin_users_filter' ), 99);
    }

    public function add_user_meta_fields($user) {

    	$c_user_id 					= get_current_user_id();
    	$c_user_roles 				= get_current_user_roles();

    	$c_user_state_id 			= get_user_meta($c_user_id, 'state', true);
    	$c_user_city_id 			= get_user_meta($c_user_id, 'city', true);

    	if( in_array(STATE_USER, $c_user_roles) ) {

			echo '<table class="form-table">';
				echo get_city_field($c_user_state_id);
			echo '</table>';
		
    	} else {

    		echo '<table class="form-table">';
				echo get_state_field();
				echo get_city_field();
			echo '</table>';
		}

        $this->user_meta_fields_script();
    }

    public function edit_user_meta_fields($user) {
    	$user_id 					= 0;
    	$user_state_id 				= "";
    	$user_city_id 				= "";
    	$user_roles 				= "";

    	if( is_object($user) && !empty($user->ID) ){
    		$user_id 				= $user->ID;
	    	$user_state_id 			= get_user_meta($user_id, 'state', true);
	    	$user_city_id 			= get_user_meta($user_id, 'city', true);
	    	$user_roles 			= get_user_roles($user_id);
    	}

    	$c_user_id 					= get_current_user_id();
    	$c_user_roles 				= get_current_user_roles();

    	$c_user_state_id 			= get_user_meta($c_user_id, 'state', true);
    	$c_user_city_id 			= get_user_meta($c_user_id, 'city', true);

    	/*if( in_array(STATE_USER, $user_roles) || in_array(STATE_SUPER_USER, $user_roles) ) {
			
			echo '<table class="form-table">';
				echo get_state_field($user_state_id);
			echo '</table>';

		} else if( in_array(DISTICT_USER, $user_roles) ) {
			
			echo '<table class="form-table">';
				echo get_city_field($user_state_id, $user_city_id);
			echo '</table>';

    	} else{

    		echo '<table class="form-table">';
				echo get_state_field($user_state_id);
				echo get_city_field($user_state_id, $user_city_id);
			echo '</table>';
    	
        }*/

        echo '<table class="form-table" id="edit-user-form-sc">';
			echo get_state_field($user_state_id);
			echo get_city_field($user_state_id, $user_city_id);
		echo '</table>';

        $this->user_meta_fields_script();
    }

    public function view_user_meta_fields($user) {

    	$c_user_id 					= get_current_user_id();
    	$c_user_roles 				= get_current_user_roles();

    	$c_user_state_id 			= get_user_meta($c_user_id, 'state', true);
    	$c_user_city_id 			= get_user_meta($c_user_id, 'city', true);

    	if( in_array(STATE_USER, $c_user_roles) || in_array(STATE_SUPER_USER, $c_user_roles) ) {
			
			echo '<table class="form-table">';
				echo get_state_field($c_user_state_id);
			echo '</table>';

		} else if( in_array(DISTICT_USER, $c_user_roles) ) {
			
			echo '<table class="form-table">';
				echo get_city_field($c_user_state_id, $c_user_city_id);
			echo '</table>';

		} else if( in_array(ADMIN, $c_user_roles) ) {

    	} else {

    		echo '<table class="form-table">';
				echo get_state_field($c_user_state_id);
				echo get_city_field($c_user_state_id, $c_user_city_id);
			echo '</table>';
    	
        }

        $this->user_meta_fields_script();
    }

    public function user_meta_fields_script() {
    	?>
		<script>
            jQuery( document ).ready( function($) {

            	$('select[name="state"]').parent().parent().hide();
                $('select[name="city"]').parent().parent().hide();
                $('select[name="ure_select_other_roles"]').parent().parent().parent().parent().hide();
                $('table[style*="display: none"]').prev().hide();

                $(document).on( 'change', '#state', function () {
                    var state_id = $( this ).val();
                    
                    $.ajax({
			            url         : '<?php echo THEME_AJAX_URL;?>',
			            type        : 'post',
			            data        : {
			                'action'      : 'action_filter_city',
			                'state_id'    : state_id,
			                '_nonce'      : '<?php echo wp_create_nonce( 'state-nonce' );?>'
			            },
			            success     : function( response ) {
			                $("#city").html(response.data);
			            }
			        });
                });

                $(document).on( 'change', 'select[name="role"]', function () {
                    var role_val = $( this ).val();
                    
                    if( role_val == '<?php echo STATE_USER;?>' || role_val == '<?php echo STATE_SUPER_USER;?>' ){
                    	$('select[name="state"]').parent().parent().show();
                    	$('select[name="city"]').parent().parent().hide();
                    } else if( role_val == '<?php echo DISTICT_USER;?>' ){
                    	$('select[name="state"]').parent().parent().show();
                    	$('select[name="city"]').parent().parent().show();
                    } else {
                    	$('select[name="state"]').parent().parent().hide();
                    	$('select[name="city"]').parent().parent().hide();
                    }
                });

                var edit_profile_role = $('select[name="role"]').val();

                if( edit_profile_role == '<?php echo STATE_USER;?>' || edit_profile_role == '<?php echo STATE_SUPER_USER;?>' ){
                	$('select[name="state"]').parent().parent().show();
                	$('select[name="city"]').parent().parent().hide();
                } else if( edit_profile_role == '<?php echo DISTICT_USER;?>' ){
                	$('select[name="state"]').parent().parent().show();
                	$('select[name="city"]').parent().parent().show();
                } else {
                	$('select[name="state"]').parent().parent().hide();
                	$('select[name="city"]').parent().parent().hide();
                }
            });
        </script>
		<?php
	}

    public function load_jquery_for_users() {

    	$c_user_id 					= get_current_user_id();
    	$c_user_roles 				= get_current_user_roles();

    	if( in_array(STATE_SUPER_USER, $c_user_roles) || in_array(STATE_USER, $c_user_roles) || in_array(DISTICT_USER, $c_user_roles) ) {
	    	?>
			<script>
	            jQuery( document ).ready( function($) {
	            	$('select[name="role"]').parent().parent().remove();
	            	$('select[name="ure_select_other_roles"]').parent().parent().parent().parent().remove();
	            });
	        </script>
			<?php
		}

        ?>
        <script>
            jQuery( document ).ready( function($) {
                $('#ure_grant_roles').remove();
                $('select[name="ure_add_role"]').prev().remove();
                $('select[name="ure_add_role"]').remove();
                $('#ure_add_role_submit').remove();
                $('select[name="ure_revoke_role"]').prev().remove();
                $('select[name="ure_revoke_role"]').remove();
                $('#ure_revoke_role_submit').remove();

                $('#ure_grant_roles_2').remove();
                $('select[name="ure_add_role_2"]').prev().remove();
                $('select[name="ure_add_role_2"]').remove();
                $('#ure_add_role_submit_2').remove();
                $('select[name="ure_revoke_role_2"]').prev().remove();
                $('select[name="ure_revoke_role_2"]').remove();
                $('#ure_revoke_role_submit_2').remove();
            });
        </script>
        <?php
	}

    public function mktbn_user_register( $user_id ){

        if ( !current_user_can( 'edit_user', $user_id ) )
            return FALSE;

        $user_meta 					= get_userdata( $user_id );

        $state_id 					= 0;
        if ( isset( $_POST['state'] ) ){
        	$state_id 				= sanitize_text_field($_POST['state']);

        	if( empty($state_id) ){
        		$state_id 			= 0;
        	}
        }

        $city_id 					= 0;
        if ( isset( $_POST['city'] ) ){
        	$city_id 				= sanitize_text_field($_POST['city']);

        	if( empty($city_id) ){
        		$city_id 			= 0;
        	}
        }

        update_user_meta( $user_id, 'state', $state_id );
        update_user_meta( $user_id, 'city', $city_id );
        update_user_meta( $user_id, 'parent_id', 0 );

        /*$user 						= new WP_User($user_id);

        if( $state_id > 0 && $city_id == 0 ){

			// Replace the current role with 'editor' role
			$user->set_role( STATE_USER );
        } else if( $state_id > 0 && $city_id > 0 ){
        	
			// Replace the current role with 'editor' role
			$user->set_role( DISTICT_USER );
			update_user_meta( $user_id, 'parent_id', get_parent_user_id_by_state($state_id) );
        }*/

        update_user_meta( $user_id, 'state', $state_id );
        update_user_meta( $user_id, 'city', $city_id );
    }

    public function modify_views_users($views){
    	global $wp_roles;

    	$c_user_id 					= get_current_user_id();
    	$c_user_roles 				= get_current_user_roles();

    	if( (in_array(STATE_USER, $c_user_roles) || in_array(DISTICT_USER, $c_user_roles)) ) {

	    	//pre($views);
	    	$views[ 'all' ] = sprintf(
	    		'<a href="%s"%s>'.__('All').' <span class="count">(%d)</span></a>',
				admin_url('users.php'),
				( $this->is_filter_active() ) ? ' class="current" aria-current="page"' : '',
				$this->get_user_total()
			);

			$views[ STATE_USER ] = sprintf(
	    		'<a href="%s"%s>'.get_role_name_by_slug(STATE_USER).' <span class="count">(%d)</span></a>',
				admin_url('users.php?role=state_role'),
				( $this->is_filter_active(STATE_USER) ) ? ' class="current" aria-current="page"' : '',
				$this->get_user_total(STATE_USER)
			);

			$views[ DISTICT_USER ] = sprintf(
	    		'<a href="%s"%s>'.get_role_name_by_slug(DISTICT_USER).' <span class="count">(%d)</span></a>',
				admin_url('users.php?role=district_role'),
				( $this->is_filter_active(DISTICT_USER) ) ? ' class="current" aria-current="page"' : '',
				$this->get_user_total(DISTICT_USER)
			);
	    }

		return $views;
    }

	public function get_user_total($role = 'all') {
		global $wpdb;

		$c_user_id 					= get_current_user_id();
    	$c_user_roles 				= get_current_user_roles();
    	$c_user_state_id 			= get_user_meta($c_user_id, 'state', true);
    	$c_user_city_id 			= get_user_meta($c_user_id, 'city', true);

    	if( $role == "state_role" ){
    		return (int) $wpdb->get_var(
				$wpdb->prepare( "
					SELECT COUNT( 1 ) FROM {$wpdb->users} INNER JOIN {$wpdb->usermeta} AS utfs ON ( {$wpdb->users}.ID = utfs.user_id ) INNER JOIN {$wpdb->usermeta} AS utfc ON ( {$wpdb->users}.ID = utfc.user_id ) INNER JOIN {$wpdb->usermeta} AS utfr ON ( {$wpdb->users}.ID = utfr.user_id ) WHERE 
					(utfs.meta_key = 'state' AND utfs.meta_value = '%d') AND (utfc.meta_key = 'city' AND utfc.meta_value = '%d') AND (utfr.meta_key = 'sur_capabilities' AND utfr.meta_value LIKE '%\"state_role\"%')",
					$c_user_state_id,
					0
				)
			);
    	} else if( $role == "district_role" ){
    		return (int) $wpdb->get_var(
				$wpdb->prepare( "
					SELECT COUNT( 1 ) FROM {$wpdb->users} INNER JOIN {$wpdb->usermeta} AS utfs ON ( {$wpdb->users}.ID = utfs.user_id ) INNER JOIN {$wpdb->usermeta} AS utfc ON ( {$wpdb->users}.ID = utfc.user_id ) INNER JOIN {$wpdb->usermeta} AS utfr ON ( {$wpdb->users}.ID = utfr.user_id ) WHERE 
					(utfs.meta_key = 'state' AND utfs.meta_value = '%d') AND (utfc.meta_key = 'city' AND utfc.meta_value > '%d') AND (utfr.meta_key = 'sur_capabilities' AND utfr.meta_value LIKE '%\"district_role\"%')",
					$c_user_state_id,
					0
				)
			);
    	}

		return (int) $wpdb->get_var(
			$wpdb->prepare( "
				SELECT COUNT( 1 )
				FROM {$wpdb->users} INNER JOIN {$wpdb->usermeta} as utfc ON {$wpdb->users}.ID=utfc.user_id
				WHERE (utfc.meta_key='state' AND utfc.meta_value='%d')
				",
				$c_user_state_id
			)
		);
	}

	public function is_filter_active($role = 'all') {

		if( isset($_GET['role']) && !empty($_GET['role']) ){
			if( $_GET['role'] == $role ){
				return true;
			}
		} else if( $role == 'all' ){
			return true;
		}

		return false;
	}

    public function admin_users_filter( $query ){
		global $pagenow, $wp_query;

		$c_user_id 					= get_current_user_id();
    	$c_user_roles 				= get_current_user_roles();
    	$c_user_state_id 			= get_user_meta($c_user_id, 'state', true);
    	$c_user_city_id 			= get_user_meta($c_user_id, 'city', true);

    	if( (in_array(STATE_USER, $c_user_roles) || in_array(DISTICT_USER, $c_user_roles)) ) {

		   global $wpdb;

		    $query->query_from 		.= " INNER JOIN {$wpdb->usermeta} AS mtf ON " . 
		        "{$wpdb->users}.ID=mtf.user_id ";

		    $query->query_where 	.= " AND ( (mtf.meta_key='parent_id' AND "."mtf.meta_value='$c_user_id') OR (mtf.meta_key='state' AND "."mtf.meta_value='$c_user_state_id') )";
		}
	}
}
new BackendUserMeta();