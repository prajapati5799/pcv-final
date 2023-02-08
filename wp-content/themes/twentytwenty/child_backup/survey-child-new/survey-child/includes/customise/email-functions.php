<?php
defined( 'ABSPATH' ) || exit;

function get_mail_body_header(){

	//$email_header = get_field( 'header_section_group', 'option' );
	$email_header = "";

	return '<!DOCTYPE html>
			<html>
			<head>
			<title></title>
			<meta charset="utf-8">
			</head>
			<body style="margin: 0px; padding: 0px;">
			<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
				<tr>
			    	<td align="center" valign="middle" width="540">
			        	<!--[if (gte mso 9)|(IE)]>
			            <table align="center" border="0" cellspacing="0" cellpadding="0" width="540">
			            <tr>
			            <td align="center" valign="top" width="640">
			            <![endif]-->
						<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 540px; padding: 50px 0px;" class="wrapper">
							<tr>
								<td align="center" valign="top" style="padding: 29px 0px 0px;">
									<table cellpadding="0" cellspacing="0" width="100%">
										<tr>
											<td align="left" valign="top"><a href="' . get_site_url() . '"><img src="' . $email_header['email_logo'] . '" alt=""></a></td>
										</tr>	
									</table>
								</td>
							</tr>';
}

function get_mail_body_footer(){
	return '</table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
		</td>
        
	</tr>
</table>
</body>
</html>';
}

function get_mail_header(){

	$headers[] = 'Content-Type: text/html; charset=UTF-8';
    $headers[] = 'From:' . get_bloginfo( 'name' ).'<'.get_option('admin_email').'>';

    return $headers;

}

function theme_send_user_notification_for_password_changed( $tokens ){

	if( get_field( 'enable_change_password_email', 'option' ) ) :
		
	    // configuring email options
	    $to = $tokens['EMAIL'];

	    $subject = theme_string_replace( get_field( 'cp_subject', 'option' ), $tokens );

	    // using content type html for emails
	    $headers = get_mail_header();

	    $message = get_mail_body_header();
		if( get_field( 'cp_message_body', 'option' ) ){
			$message .= theme_string_replace( get_field( 'cp_message_body', 'option' ), $tokens );
		}
		$message .= get_mail_body_footer();

	    return wp_mail( $to, $subject, $message, $headers );

    endif;
}

function theme_send_email_verification_token( $usermeta, $tokens ){

	if( have_rows( 'new_user_register_email_template', 'option' ) ):
        while( have_rows( 'new_user_register_email_template', 'option' ) ): the_row();
            
			$to = $usermeta['email'];
            $subject = theme_string_replace( get_sub_field( 'user_activation_subject', 'option' ), $tokens );

            $user_headers = get_mail_header();

			$mail_content = get_mail_body_header();
			if( get_sub_field( 'user_activation_message', 'option' ) ){
				$mail_content .= theme_string_replace( get_sub_field( 'user_activation_message', 'option' ), $tokens );
			}
			$mail_content .= get_mail_body_footer();

			wp_mail( $to, $subject, $mail_content, $user_headers );
            
        endwhile;
    endif;
}

function theme_user_registration_mail( $usermeta, $tokens ) {

	if( have_rows( 'new_user_register_email_template', 'option' ) ):
        while( have_rows( 'new_user_register_email_template', 'option' ) ): the_row();
            
			$user_to = $usermeta['email'];
            $user_subject = theme_string_replace( get_sub_field( 'user_subject', 'option' ), $tokens );

            $user_headers = get_mail_header();

			$user_mail_content = get_mail_body_header();
			if( get_sub_field( 'user_message_body', 'option' ) ){
				$user_mail_content .= theme_string_replace( get_sub_field( 'user_message_body', 'option' ), $tokens );
			}
			$user_mail_content .= get_mail_body_footer();

			wp_mail( $user_to, $user_subject, $user_mail_content, $user_headers );
            
        endwhile;
    endif;

    if( have_rows( 'admin_email_template', 'option' ) ):
        while( have_rows( 'admin_email_template', 'option' ) ): the_row();
            
			$admin_to = get_sub_field( 'admin_to', 'option' );
            $admin_subject = theme_string_replace( get_sub_field( 'admin_subject', 'option' ), $tokens );

			$admin_headers = get_mail_header();

			$admin_mail_content = get_mail_body_header();
			if( get_sub_field( 'admin_message_body', 'option' ) ){
				$admin_mail_content .= theme_string_replace( get_sub_field( 'admin_message_body', 'option' ), $tokens );
			}
			$admin_mail_content .= get_mail_body_footer();

			wp_mail( $admin_to, $admin_subject, $admin_mail_content, $admin_headers );
            
        endwhile;
    endif;
}

function theme_send_reset_password_token( $userdata, $tokens ){
    // configuring email options
    $to = $userdata['email'];

    $subject = theme_string_replace( get_field( 'forgot_subject', 'option' ), $tokens );

    // using content type html for emails
    $headers = get_mail_header();

    $message = get_mail_body_header();
	if( get_field( 'forgot_message_body', 'option' ) ){
		$message .= theme_string_replace( get_field( 'forgot_message_body', 'option' ), $tokens );
	}
	$message .= get_mail_body_footer();

    return wp_mail( $to, $subject, $message, $headers );
}
?>