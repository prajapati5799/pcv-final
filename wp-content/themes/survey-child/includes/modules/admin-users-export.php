<?php
defined( 'ABSPATH' ) || exit;

class ExportUsers
{
    
    public function __construct(){
		add_action( 'load-users.php', array( $this, 'load' ) );
    }

    public function load() {
        add_action('restrict_manage_users', array($this, 'add_export_button') );
        //add_action('admin_head', array( $this, 'export_requested_users') );
        add_action( 'pre_user_query', array( $this, 'export_requested_users' ), 99);
    }

    public function add_export_button(){
        ?>
        &nbsp;&nbsp;
        <a href="<?php echo add_query_arg(
            array(
                'export' => 'csv'
            ), 
            admin_url('users.php?' . $_SERVER['QUERY_STRING'])
        ); ?>" name="export_user" id="export_user" class="button"><?php esc_html_e('Export', DOMAIN_NAME);?></a>
        &nbsp;&nbsp;        
        <?php
    }

    public function export_requested_users($query){
        global $wpdb;
        
        if( isset($_REQUEST['export']) ){
            
            header("Pragma: public");
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: private", false);
            header("content-type:application/csv;charset=UTF-8");
            header("Content-Disposition: attachment; filename=\"users-".date("Y-m-d-H-I-s").".csv\";" );
            header("Content-Transfer-Encoding: base64");

            $records = $wpdb->get_results("SELECT * " . $query->query_from . " " . $query->query_where . " " . $query->query_orderby);
            
            ob_start();

            $df = fopen("php://output", 'w');
            fputcsv($df, array('user_login', 'user_email', 'display_name', 'user_password', 'user_registered'));

            if( $records && !empty($records) ){
                foreach($records as $data){
                    $content_row = array(
                        $data->user_login,
                        $data->user_email,
                        $data->display_name,
                        $data->user_login . "@prompt",
                        $data->user_registered
                    );

                    fputcsv($df, $content_row);
                }
            }
            fclose($df);
            echo ob_get_clean();
            exit;
        }

    }
}
new ExportUsers();