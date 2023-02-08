<?php
add_filter('lrm/redirect_url', array( 'ThemeActionFilters', 'add_redirect_url' ), 3);
add_filter( 'site_transient_update_plugins', array( 'ThemeActionFilters', 'disabled_update_plugin' ) );
add_filter('lrm/login_form/allow_show_pass', array( 'ThemeActionFilters', 'disabled_login_password' ) );

if( !class_exists('ThemeActionFilters') ){
	class ThemeActionFilters
	{
		public function add_redirect_url($redirect_to = '', $action = 'login', $user_ID = 0){
			if( $action == "login" ){
				
				$redirect_to 				= lrm_setting('redirects/login/action');

				if( $redirect_to == "redirect" ){
					$redirect_to 			= lrm_setting('redirects/login/redirect')['redirect_url']['default'];
				}
			}
			
			return $redirect_to;
		}

		public function disabled_update_plugin( $value ) {
		    if( isset( $value->response['ajax-login-and-registration-modal-popup/ajax-login-registration-modal-popup.php'] ) ) {        
		    	unset( $value->response['ajax-login-and-registration-modal-popup/ajax-login-registration-modal-popup.php'] );
		    }
		    return $value;
		}

		public function disabled_login_password($is_display){
			return false;
		}
	}
}
?>