<?php
defined( 'ABSPATH' ) || exit;

include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

// Include libraries
require get_stylesheet_directory() . '/includes/lib/excel/PHPExcel.php';
require get_stylesheet_directory() . '/includes/modules/nex-form-fields.php';
require get_stylesheet_directory() . '/includes/modules/nex-form-generate-pdf.php';

require get_stylesheet_directory() . '/includes/plugins/acf.php';
require get_stylesheet_directory() . '/includes/customise/nav-menu.php';
require get_stylesheet_directory() . '/includes/customise/request.php';
require get_stylesheet_directory() . '/includes/customise/helper-functions.php';
require get_stylesheet_directory() . '/includes/customise/defined.php';
require get_stylesheet_directory() . '/includes/modules/class-cpt.php';
require get_stylesheet_directory() . '/includes/modules/database.php';
require get_stylesheet_directory() . '/includes/customise/user-helper.php';
require get_stylesheet_directory() . '/includes/customise/actions.php';
require get_stylesheet_directory() . '/includes/customise/shortcode.php';
require get_stylesheet_directory() . '/includes/customise/ajax-request.php';
require get_stylesheet_directory() . '/includes/modules/admin-users.php';
require get_stylesheet_directory() . '/includes/customise/customise.php';
require get_stylesheet_directory() . '/includes/modules/nex-form-functions.php';
require get_stylesheet_directory() . '/includes/customise/custom-post-types.php';
require get_stylesheet_directory() . '/includes/customise/email-functions.php';

// Export user in CSV for admin
require get_stylesheet_directory() . '/includes/modules/admin-users-export.php';

require get_stylesheet_directory() . '/includes/modules/nex-generate-district-csv.php';
require get_stylesheet_directory() . '/includes/modules/nex-generate-state-csv.php';

// Dashboard scripts
require get_stylesheet_directory() . '/includes/modules/dashboard-admin.php';
require get_stylesheet_directory() . '/includes/modules/dashboard-state.php';
require get_stylesheet_directory() . '/includes/modules/dashboard-district.php';


if ( is_plugin_active( 'nex-forms/main.php' ) ) {
    require get_stylesheet_directory() . '/includes/plugins/nex-forms.php';
}

if ( is_plugin_active( 'contact-form-7/wp-contact-form-7.php' ) ) {
    require get_stylesheet_directory() . '/includes/plugins/contact-form.php';
}
?>