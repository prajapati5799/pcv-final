<?php
defined( 'ABSPATH' ) || exit;

class ThemeRequest
{
    public function __construct(){}

    public static function get_method()
    {
        return strtoupper($_SERVER['REQUEST_METHOD']);
    }
    
    public static function getVar($name, $default = null, $hash = 'default')
    {
        // Ensure hash and type are uppercase
        $hash = strtoupper($hash);
        
        if($hash === 'METHOD')
        {
            $hash = strtoupper($_SERVER['REQUEST_METHOD']);
        }

        // Get the input hash
        switch($hash)
        {
            case 'GET':
                $input = &$_GET;
                break;
            case 'POST':
                $input = &$_POST;
                break;
            case 'FILES':
                $input = &$_FILES;
                break;
            case 'COOKIE':
                $input = &$_COOKIE;
                break;
            case 'ENV':
                $input = &$_ENV;
                break;
            case 'SERVER':
                $input = &$_SERVER;
                break;
            default:
                $input = &$_REQUEST;
                $hash = 'REQUEST';
                break;
        }

        $var = (isset($input[$name]) and !is_null($input[$name])) ? $input[$name] : $default;
        return $var;
    }

    public static function get($hash = 'default')
    {
        // Ensure hash and type are uppercase
        $hash = strtoupper($hash);

        if($hash === 'METHOD')
        {
            $hash = strtoupper($_SERVER['REQUEST_METHOD']);
        }

        switch($hash)
        {
            case 'GET':
                $input = $_GET;
                break;

            case 'POST':
                $input = $_POST;
                break;

            case 'FILES':
                $input = $_FILES;
                break;

            case 'COOKIE':
                $input = $_COOKIE;
                break;

            case 'ENV':
                $input = &$_ENV;
                break;

            case 'SERVER':
                $input = &$_SERVER;
                break;

            default:
                $input = $_REQUEST;
                break;
        }

        return $input;
    }

    public static function setVar($name, $value = null, $hash = 'method')
    {
        // Get the request hash value
        $hash = strtoupper($hash);
        if($hash === 'METHOD') $hash = strtoupper($_SERVER['REQUEST_METHOD']);

        $previous = array_key_exists($name, $_REQUEST) ? $_REQUEST[$name] : null;

        switch($hash)
        {
            case 'GET':
                $_GET[$name] = $value;
                $_REQUEST[$name] = $value;
                break;
            case 'POST':
                $_POST[$name] = $value;
                $_REQUEST[$name] = $value;
                break;
            case 'COOKIE':
                $_COOKIE[$name] = $value;
                $_REQUEST[$name] = $value;
                break;
            case 'FILES':
                $_FILES[$name] = $value;
                break;
            case 'ENV':
                $_ENV['name'] = $value;
                break;
            case 'SERVER':
                $_SERVER['name'] = $value;
                break;
        }
        
        return $previous;
    }
}
?>