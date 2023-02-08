<?php
defined( 'ABSPATH' ) || exit;
/**
 *  Customise in contact form 7
 */
class CustomiseCF7
{
    
    public function __construct(){

        // Before sent email change recipient email address
        add_filter( 'wpcf7_mail_components',                [ $this, 'wpcf7_change_recipient_email' ] );

        // Before sent email change body HTML
        add_action( 'wpcf7_before_send_mail',               [ $this, 'wpcf7_before_send_mail_fun' ], 99 );

        // Save form data in encrypted
        add_filter( 'cfdb_form_data',                       [ $this, 'contact_form_filter' ] );

        // Display data in decrypted form
        add_filter( 'CF7_decrypt_data',                     [ $this, 'CF7_decrypt_data_func' ], 10, 3 );

        // Redirect after CF7 form submit
        add_action( 'wp_footer',                            [ $this, 'redirect_cf7' ] );

        // Add another validation rule : Word limit
        add_filter( 'wpcf7_messages',                       [ $this, 'wpcf7_word_limit_valid_msg' ], 10, 1 );

        // Add validation rule while form submit
        add_filter( 'wpcf7_validate_textarea',              [ $this, 'wpcf7_textarea_validation_rules' ], 10, 2 );
        add_filter( 'wpcf7_validate_textarea*',             [ $this, 'wpcf7_textarea_validation_rules' ], 10, 2 );

        // Hide error icon in backend
        add_action( 'admin_head',                           [ $this, 'cf7_errors_css' ] );
    }

    public function wpcf7_change_recipient_email( $args ) {
        
        /*if( !empty( $args['recipient'] ) ) {
            $args['recipient'] = str_replace( '%admin%', EMAIL_ID , $args['recipient'] );
            return $args;
        }*/

        return $args;
    }

    public function wpcf7_before_send_mail_fun( $form ) {

        $set_body = '';
        $properites = $form->get_properties();

        //Mail 1
        if( $properites['mail']['active'] == '1' ){
            $set_body .= get_mail_body_header();
            $set_body .= $properites['mail']['body'];
            $set_body .= get_mail_body_footer();
            $properites['mail']['body'] = $set_body;
        }

        //Mail 2
        if( $properites['mail_2']['active'] == '1' ){
            $set_body2 = '';
            $set_body2 .= get_mail_body_header();
            $set_body2 .= $properites['mail_2']['body'];
            $set_body2 .= get_mail_body_footer();    
            $properites['mail_2']['body'] = $set_body2;
        }
        
        $form->set_properties( $properites );
    }

    public function contact_form_filter( $formData ) {

        //Contact from
        /*if( $formData->posted_data['_wpcf7'] == 236 ){
            
            $acceptance = !empty( $formData->posted_data['acceptance'] ) ? "Yes" : "No";
            $post_id = !empty( $formData->posted_data['post_list'] ) ? $formData->posted_data['post_list'] : 0;
            $post_title = "";
            if( $post_id ) :
                $post_title = get_the_title( $post_id );
            endif;

            $formData->posted_data['full_name']         = theme_simple_crypt( $formData->posted_data['full_name'], 'e' );
            $formData->posted_data['email']      = theme_simple_crypt( $formData->posted_data['email'], 'e' );
            $formData->posted_data['telephone']        = theme_simple_crypt( $formData->posted_data['telephone'], 'e' );
            $formData->posted_data['post_list']      = theme_simple_crypt( $post_title , 'e' );
            $formData->posted_data['gdpr']      = theme_simple_crypt( $acceptance, 'e' );

            unset($formData->posted_data['acceptance']);
        }

        unset( $formData->posted_data['g-recaptcha-response'] );
        unset( $formData->posted_data['mc4wp_checkbox'] );

        return $formData;*/
    }

    public function CF7_decrypt_data_func( $cell, $aCol ) {
        
        if( $aCol != 'Submitted' && $aCol != 'Submitted From' ){
            $cell = theme_simple_crypt( $cell, 'd' );
        }

        return $cell;
    }

    public function redirect_cf7() {

        /*if( is_page( CONTACT_PAGE ) ) {
        ?>

            <script type="text/javascript">

                document.addEventListener( 'wpcf7mailsent', function( event ) {
                    location = '<?php echo get_the_permalink( THANK_YOU ); ?>';
                }, false );

            </script>
            
        <?php
        }*/
    }

    public function wpcf7_word_limit_valid_msg( $messages ){
    
        $new_messages = array(

            'invalid_too_long_word' => array(
                'description'
                    => __( "There is a field with input that is longer than the maximum allowed word length", 'contact-form-7' ),
                'default'
                    => __( "The field is too word long.", 'contact-form-7' ),
            ),

            'invalid_too_short_word' => array(
                'description'
                    => __( "There is a field with input that is shorter than the minimum allowed word length", 'contact-form-7' ),
                'default'
                    => __( "The field is too word short.", 'contact-form-7' ),
            )
        );

        return array_merge( $messages, $new_messages ) ; 
    }

    public function wpcf7_textarea_validation_rules( $result, $tag ) {
        $type = $tag->type;
        $name = $tag->name;

        $value = isset( $_POST[$name] ) ? (string) $_POST[$name] : '';

        if ( '' !== $value ) {
            $maxlength = $tag->get_option( 'maxword', 'int', true );
            $minlength = $tag->get_option( 'minword', 'int', true );

            if ( $maxlength and $minlength
            and $maxlength < $minlength ) {
                $maxlength = $minlength = null;
            }

            $code_units = count( explode( " ", $value ) );

            if ( $code_units > 0 ) {
                if ( $maxlength and $maxlength < $code_units ) {
                    $result->invalidate( $tag, wpcf7_get_message( 'invalid_too_long_word' ) );
                } elseif ( $minlength and $code_units < $minlength ) {
                    $result->invalidate( $tag, wpcf7_get_message( 'invalid_too_short_word' ) );
                }
            }
        }

        return $result;
    }

    public function cf7_errors_css() {
        echo '<style>
            .config-error {display: none !important;} 
            [data-config-field][aria-invalid="true"] {border-color: #ddd;}
            #contact-form-editor-tabs li a .icon-in-circle {display: none;}
        </style>';
    }   
}
new CustomiseCF7();
?>