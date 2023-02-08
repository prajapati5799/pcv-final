<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$city_array = [];
$user_array = [];

include(__DIR__ . '/wp-load.php');

define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

global $wpdb;

$new_districts = array(
    array(
        'state_id' => 40,
        'city' => "Nicobar",
        'o_city' => "Nicobar Islands"
    ),
    array(
        'state_id' => 40,
        'city' => "North and Middle Andaman",
        'o_city' => "North and Middle Andaman"
    ),
    array(
        'state_id' => 40,
        'city' => "South Andaman",
        'o_city' => "South Andaman"
    ),

    array(
        'state_id' => 40,
        'city' => "South Andaman",
        'o_city' => "South Andaman"
    ),

    array(
        'state_id' => 41,
        'city' => "Anantapur",
        'o_city' => "Anantapur",
    ),
    array(
        'state_id' => 41,
        'city' => "Chittoor",
        'o_city' => "Chittoor",
    ),
    array(
        'state_id' => 41,
        'city' => "Cuddapah",
        'o_city' => "Cuddapah",
    ),
    array(
        'state_id' => 41,
        'city' => "East Godavari",
        'o_city' => "East Godavari",
    ),
    array(
        'state_id' => 41,
        'city' => "Guntur",
        'o_city' => "Guntur",
    ),
    array(
        'state_id' => 41,
        'city' => "Krishna",
        'o_city' => "Krishna",
    ),
    array(
        'state_id' => 41,
        'city' => "Kurnool",
        'o_city' => "Kurnool",
    ),
    array(
        'state_id' => 41,
        'city' => "Nellore",
        'o_city' => "Nellore",
    ),
    array(
        'state_id' => 41,
        'city' => "Prakasam",
        'o_city' => "Prakasam",
    ),
    array(
        'state_id' => 41,
        'city' => "Srikakulam",
        'o_city' => "Srikakulam",
    ),
    array(
        'state_id' => 41,
        'city' => "Vishakapatnam",
        'o_city' => "Visakhapatnam",
    ),
    array(
        'state_id' => 41,
        'city' => "Vizianagaram",
        'o_city' => "Vizianagaram",
    ),
    array(
        'state_id' => 41,
        'city' => "West Godavari",
        'o_city' => "West Godavari",
    ),

    array(
        'state_id' => 42,
        'city' => "Chandigarh",
        'o_city' => "Chandigarh",
    ),

    array(
        'state_id' => 43,
        'city' => "Dadra and Nagar Haveli",
        'o_city' => "Dadra and Nagar Haveli",
    ),

    array(
        'state_id' => 44,
        'city' => "Daman",
        'o_city' => "Daman",
    ),
    array(
        'state_id' => 44,
        'city' => "Diu",
        'o_city' => "Diu",
    ),

    array(
        'state_id' => 45,
        'city' => "Central",
        'o_city' => "Central",
    ),
    array(
        'state_id' => 45,
        'city' => "East",
        'o_city' => "East",
    ),
    array(
        'state_id' => 45,
        'city' => "New Delhi",
        'o_city' => "New Delhi",
    ),
    array(
        'state_id' => 45,
        'city' => "North",
        'o_city' => "North",
    ),
    array(
        'state_id' => 45,
        'city' => "North East",
        'o_city' => "North East",
    ),
    array(
        'state_id' => 45,
        'city' => "North West",
        'o_city' => "North West",
    ),
    array(
        'state_id' => 45,
        'city' => "Shahdara",
        'o_city' => "Shahdara",
    ),
    array(
        'state_id' => 45,
        'city' => "South",
        'o_city' => "South",
    ),
    array(
        'state_id' => 45,
        'city' => "South East",
        'o_city' => "South East",
    ),
    array(
        'state_id' => 45,
        'city' => "South West",
        'o_city' => "South West",
    ),
    array(
        'state_id' => 45,
        'city' => "West",
        'o_city' => "West",
    ),

    array(
        'state_id' => 46,
        'city' => "North Goa",
        'o_city' => "North Goa",
    ),
    array(
        'state_id' => 46,
        'city' => "South Goa",
        'o_city' => "South Goa",
    ),

    array(
        'state_id' => 47,
        'city' => "Ahmedabad",
        'o_city' => "Ahmadabad",
    ),
    array(
        'state_id' => 47,
        'city' => "Amreli",
        'o_city' => "Amreli",
    ),
    array(
        'state_id' => 47,
        'city' => "Anand",
        'o_city' => "Anand",
    ),
    array(
        'state_id' => 47,
        'city' => "Aravalli",
        'o_city' => "Aravalli",
    ),
    array(
        'state_id' => 47,
        'city' => "Banas Kantha",
        'o_city' => "Banas Kantha",
    ),
    array(
        'state_id' => 47,
        'city' => "Bharuch",
        'o_city' => "Bharuch",
    ),
    array(
        'state_id' => 47,
        'city' => "Bhavnagar",
        'o_city' => "Bhavnagar",
    ),
    array(
        'state_id' => 47,
        'city' => "Botad",
        'o_city' => "Botad",
    ),
    array(
        'state_id' => 47,
        'city' => "Chhotaudepur",
        'o_city' => "Chhota Udaipur",
    ),
    array(
        'state_id' => 47,
        'city' => "Dahod",
        'o_city' => "Dahod",
    ),
    array(
        'state_id' => 47,
        'city' => "Devbhumi Dwarka",
        'o_city' => "Devbhumi Dwarka",
    ),
    array(
        'state_id' => 47,
        'city' => "Gandhinagar",
        'o_city' => "Gandhinagar",
    ),
    array(
        'state_id' => 47,
        'city' => "Gir Somnath",
        'o_city' => "Gir Somnath",
    ),
    array(
        'state_id' => 47,
        'city' => "Jamnagar",
        'o_city' => "Jamnagar",
    ),
    array(
        'state_id' => 47,
        'city' => "Junagadh",
        'o_city' => "Junagadh",
    ),
    array(
        'state_id' => 47,
        'city' => "Kachchh",
        'o_city' => "Kachchh",
    ),
    array(
        'state_id' => 47,
        'city' => "Kheda",
        'o_city' => "Kheda",
    ),
    array(
        'state_id' => 47,
        'city' => "Mahesana",
        'o_city' => "Mahesana",
    ),
    array(
        'state_id' => 47,
        'city' => "Mahisagar",
        'o_city' => "Mahisagar",
    ),
    array(
        'state_id' => 47,
        'city' => "Morbi",
        'o_city' => "Morbi",
    ),
    array(
        'state_id' => 47,
        'city' => "Narmada",
        'o_city' => "Narmada",
    ),
    array(
        'state_id' => 47,
        'city' => "Navsari",
        'o_city' => "Navsari",
    ),
    array(
        'state_id' => 47,
        'city' => "Panch Mahals",
        'o_city' => "Panch Mahals",
    ),
    array(
        'state_id' => 47,
        'city' => "Patan",
        'o_city' => "Patan",
    ),
    array(
        'state_id' => 47,
        'city' => "Porbandar",
        'o_city' => "Porbandar",
    ),
    array(
        'state_id' => 47,
        'city' => "Rajkot",
        'o_city' => "Rajkot",
    ),
    array(
        'state_id' => 47,
        'city' => "Sabar Kantha",
        'o_city' => "Sabar Kantha",
    ),
    array(
        'state_id' => 47,
        'city' => "Surat",
        'o_city' => "Surat",
    ),
    array(
        'state_id' => 47,
        'city' => "Surendranagar",
        'o_city' => "Surendranagar",
    ),
    array(
        'state_id' => 47,
        'city' => "Tapi",
        'o_city' => "Tapi",
    ),
    array(
        'state_id' => 47,
        'city' => "The Dangs",
        'o_city' => "The Dangs",
    ),
    array(
        'state_id' => 47,
        'city' => "Vadodara",
        'o_city' => "Vadodara",
    ),
    array(
        'state_id' => 47,
        'city' => "Valsad",
        'o_city' => "Valsad",
    ),

    array(
        'state_id' => 48,
        'city' => "Ambala",
        'o_city' => "Ambala",
    ),
    array(
        'state_id' => 48,
        'city' => "Bhiwani",
        'o_city' => "Bhiwani",
    ),
    array(
        'state_id' => 48,
        'city' => "Charkhi Dadri",
        'o_city' => "Charkhi Dadri",
    ),
    array(
        'state_id' => 48,
        'city' => "Faridabad",
        'o_city' => "Faridabad",
    ),
    array(
        'state_id' => 48,
        'city' => "Fatehabad",
        'o_city' => "Fatehabad",
    ),
    array(
        'state_id' => 48,
        'city' => "Gurugram",
        'o_city' => "Gurugram",
    ),
    array(
        'state_id' => 48,
        'city' => "Hisar",
        'o_city' => "Hisar",
    ),
    array(
        'state_id' => 48,
        'city' => "Jhajjar",
        'o_city' => "Jhajjar",
    ),
    array(
        'state_id' => 48,
        'city' => "Jind",
        'o_city' => "Jind",
    ),
    array(
        'state_id' => 48,
        'city' => "Kaithal",
        'o_city' => "Kaithal",
    ),
    array(
        'state_id' => 48,
        'city' => "Karnal",
        'o_city' => "Karnal",
    ),
    array(
        'state_id' => 48,
        'city' => "Kurukshetra",
        'o_city' => "Kurukshetra",
    ),
    array(
        'state_id' => 48,
        'city' => "Mahendragarh",
        'o_city' => "Mahendragarh",
    ),
    array(
        'state_id' => 48,
        'city' => "Mewat",
        'o_city' => "Mewat",
    ),
    array(
        'state_id' => 48,
        'city' => "Palwal",
        'o_city' => "Palwal",
    ),
    array(
        'state_id' => 48,
        'city' => "Panchkula",
        'o_city' => "Panchkula",
    ),
    array(
        'state_id' => 48,
        'city' => "Panipat",
        'o_city' => "Panipat",
    ),
    array(
        'state_id' => 48,
        'city' => "Rewari",
        'o_city' => "Rewari",
    ),
    array(
        'state_id' => 48,
        'city' => "Rohtak",
        'o_city' => "Rohtak",
    ),
    array(
        'state_id' => 48,
        'city' => "Sirsa",
        'o_city' => "Sirsa",
    ),
    array(
        'state_id' => 48,
        'city' => "Sonipat",
        'o_city' => "Sonipat",
    ),
    array(
        'state_id' => 48,
        'city' => "Yamunanagar",
        'o_city' => "Yamunanagar",
    ),

    array(
        'state_id' => 49,
        'city' => "Bagalkote",
        'o_city' => "Bagalkot",
    ),    
    array(
        'state_id' => 49,
        'city' => "Bangalore Rural",
        'o_city' => "Bangalore Rural",
    ),    
    array(
        'state_id' => 49,
        'city' => "Bangalore Urban",
        'o_city' => "Bangalore",
    ),    
    array(
        'state_id' => 49,
        'city' => "Belgaum",
        'o_city' => "Belgaum",
    ),    
    array(
        'state_id' => 49,
        'city' => "Bellary",
        'o_city' => "Bellary",
    ),    
    array(
        'state_id' => 49,
        'city' => "Bidar",
        'o_city' => "Bidar",
    ),    
    array(
        'state_id' => 49,
        'city' => "Bijapur",
        'o_city' => "Bijapur",
    ),    
    array(
        'state_id' => 49,
        'city' => "Chamrajnagar",
        'o_city' => "Chamrajnagar",
    ),    
    array(
        'state_id' => 49,
        'city' => "Chikkaballapur",
        'o_city' => "Chikballapura",
    ),    
    array(
        'state_id' => 49,
        'city' => "Chikmagalur",
        'o_city' => "Chikmagalur",
    ),    
    array(
        'state_id' => 49,
        'city' => "Chitradurga",
        'o_city' => "Chitradurga",
    ),    
    array(
        'state_id' => 49,
        'city' => "Dakshina Kannada",
        'o_city' => "Dakshina Kannada",
    ),    
    array(
        'state_id' => 49,
        'city' => "Davanagere",
        'o_city' => "Davanagere",
    ),    
    array(
        'state_id' => 49,
        'city' => "Dharwad",
        'o_city' => "Dharwad",
    ),    
    array(
        'state_id' => 49,
        'city' => "Gadag",
        'o_city' => "Gadag",
    ),    
    array(
        'state_id' => 49,
        'city' => "Gulbarga",
        'o_city' => "Gulbarga",
    ),    
    array(
        'state_id' => 49,
        'city' => "Hassan",
        'o_city' => "Hassan",
    ),    
    array(
        'state_id' => 49,
        'city' => "Haveri",
        'o_city' => "Haveri",
    ),    
    array(
        'state_id' => 49,
        'city' => "Kodagu",
        'o_city' => "Kodagu",
    ),    
    array(
        'state_id' => 49,
        'city' => "Kolar",
        'o_city' => "Kolar",
    ),    
    array(
        'state_id' => 49,
        'city' => "Koppal",
        'o_city' => "Koppal",
    ),    
    array(
        'state_id' => 49,
        'city' => "Mandya",
        'o_city' => "Mandya",
    ),    
    array(
        'state_id' => 49,
        'city' => "Mysore",
        'o_city' => "Mysore",
    ),    
    array(
        'state_id' => 49,
        'city' => "Raichur",
        'o_city' => "Raichur",
    ),    
    array(
        'state_id' => 49,
        'city' => "Ramanagar",
        'o_city' => "Ramanagar",
    ),    
    array(
        'state_id' => 49,
        'city' => "Shimoga",
        'o_city' => "Shimoga",
    ),    
    array(
        'state_id' => 49,
        'city' => "Tumkur",
        'o_city' => "Tumkur",
    ),    
    array(
        'state_id' => 49,
        'city' => "Udupi",
        'o_city' => "Udupi",
    ),    
    array(
        'state_id' => 49,
        'city' => "Uttara Kannada",
        'o_city' => "Uttara Kannada",
    ),    
    array(
        'state_id' => 49,
        'city' => "Yadgir",
        'o_city' => "Yadgir",
    ),

    array(
        'state_id' => 50,
        'city' => "Alappuzha",
        'o_city' => "Alappuzha",
    ),
    array(
        'state_id' => 50,
        'city' => "Ernakulam",
        'o_city' => "Ernakulam",
    ),
    array(
        'state_id' => 50,
        'city' => "Idukki",
        'o_city' => "Idukki",
    ),
    array(
        'state_id' => 50,
        'city' => "Kozhikkode",
        'o_city' => "Kozhikode",
    ),
    array(
        'state_id' => 50,
        'city' => "Kannur",
        'o_city' => "Kannur",
    ),
    array(
        'state_id' => 50,
        'city' => "Kasaragod",
        'o_city' => "Kasaragod",
    ),
    array(
        'state_id' => 50,
        'city' => "Kollam",
        'o_city' => "Kollam",
    ),
    array(
        'state_id' => 50,
        'city' => "Kottayam",
        'o_city' => "Kottayam",
    ),
    array(
        'state_id' => 50,
        'city' => "Malappuram",
        'o_city' => "Malappuram",
    ),
    array(
        'state_id' => 50,
        'city' => "Palakkad",
        'o_city' => "Palakkad",
    ),
    array(
        'state_id' => 50,
        'city' => "Pathanamthitta",
        'o_city' => "Pathanamthitta",
    ),
    array(
        'state_id' => 50,
        'city' => "Thiruvananthapuram",
        'o_city' => "Thiruvananthapuram",
    ),
    array(
        'state_id' => 50,
        'city' => "Thrissur",
        'o_city' => "Thrissur",
    ),
    array(
        'state_id' => 50,
        'city' => "Wayanad",
        'o_city' => "Wayanad",
    ),

    array(
        'state_id' => 51,
        'city' => "Lakshadweep",
        'o_city' => "Lakshadweep",
    ),

    array(
        'state_id' => 52,
        'city' => "Ahmadnagar",
        'o_city' => "Ahmadnagar",
    ),
    array(
        'state_id' => 52,
        'city' => "Akola",
        'o_city' => "Akola",
    ),
    array(
        'state_id' => 52,
        'city' => "Amravati",
        'o_city' => "Amravati",
    ),
    array(
        'state_id' => 52,
        'city' => "Aurangabad",
        'o_city' => "Aurangabad",
    ),
    array(
        'state_id' => 52,
        'city' => "Bhandara",
        'o_city' => "Bhandara",
    ),
    array(
        'state_id' => 52,
        'city' => "Bid",
        'o_city' => "Bid",
    ),
    array(
        'state_id' => 52,
        'city' => "Brihan Mumbai",
        'o_city' => "Mumbai Suburban",
    ),
    array(
        'state_id' => 52,
        'city' => "Buldana",
        'o_city' => "Buldana",
    ),
    array(
        'state_id' => 52,
        'city' => "Chandrapur",
        'o_city' => "Chandrapur",
    ),
    array(
        'state_id' => 52,
        'city' => "Dhule",
        'o_city' => "Dhule",
    ),
    array(
        'state_id' => 52,
        'city' => "Gadchiroli",
        'o_city' => "Garhchiroli",
    ),
    array(
        'state_id' => 52,
        'city' => "Gondiya",
        'o_city' => "Gondiya",
    ),
    array(
        'state_id' => 52,
        'city' => "Hingoli",
        'o_city' => "Hingoli",
    ),
    array(
        'state_id' => 52,
        'city' => "Jalgaon",
        'o_city' => "Jalgaon",
    ),
    array(
        'state_id' => 52,
        'city' => "Jalna",
        'o_city' => "Jalna",
    ),
    array(
        'state_id' => 52,
        'city' => "Kolhapur",
        'o_city' => "Kolhapur",
    ),
    array(
        'state_id' => 52,
        'city' => "Latur",
        'o_city' => "Latur",
    ),
    array(
        'state_id' => 52,
        'city' => "Nagpur",
        'o_city' => "Nagpur",
    ),
    array(
        'state_id' => 52,
        'city' => "Nanded",
        'o_city' => "Nanded",
    ),
    array(
        'state_id' => 52,
        'city' => "Nandurbar",
        'o_city' => "Nandurbar",
    ),
    array(
        'state_id' => 52,
        'city' => "Nashik",
        'o_city' => "Nashik",
    ),
    array(
        'state_id' => 52,
        'city' => "Osmanabad",
        'o_city' => "Osmanabad",
    ),
    array(
        'state_id' => 52,
        'city' => "Palghar",
        'o_city' => "Palghar",
    ),
    array(
        'state_id' => 52,
        'city' => "Parbhani",
        'o_city' => "Parbhani",
    ),
    array(
        'state_id' => 52,
        'city' => "Pune",
        'o_city' => "Pune",
    ),
    array(
        'state_id' => 52,
        'city' => "Raigarh",
        'o_city' => "Raigarh",
    ),
    array(
        'state_id' => 52,
        'city' => "Ratnagiri",
        'o_city' => "Ratnagiri",
    ),
    array(
        'state_id' => 52,
        'city' => "Sangli",
        'o_city' => "Sangli",
    ),
    array(
        'state_id' => 52,
        'city' => "Satara",
        'o_city' => "Satara",
    ),
    array(
        'state_id' => 52,
        'city' => "Sindhudurg",
        'o_city' => "Sindhudurg",
    ),
    array(
        'state_id' => 52,
        'city' => "Solapur",
        'o_city' => "Solapur",
    ),
    array(
        'state_id' => 52,
        'city' => "Thane",
        'o_city' => "Thane",
    ),
    array(
        'state_id' => 52,
        'city' => "Wardha",
        'o_city' => "Wardha",
    ),
    array(
        'state_id' => 52,
        'city' => "Washim",
        'o_city' => "Washim",
    ),
    array(
        'state_id' => 52,
        'city' => "Yavatmal",
        'o_city' => "Yavatmal",
    ),

    array(
        'state_id' => 53,
        'city' => "Karaikal",
        'o_city' => "Karaikal",
    ),
    array(
        'state_id' => 53,
        'city' => "Mahe",
        'o_city' => "Mahe",
    ),
    array(
        'state_id' => 53,
        'city' => "Pondicherry",
        'o_city' => "Puducherry",
    ),
    array(
        'state_id' => 53,
        'city' => "Yanam",
        'o_city' => "Yanam",
    ),

    array(
        'state_id' => 54,
        'city' => "Amritsar",
        'o_city' => "Amritsar",
    ),
    array(
        'state_id' => 54,
        'city' => "Barnala",
        'o_city' => "Barnala",
    ),
    array(
        'state_id' => 54,
        'city' => "Bathinda",
        'o_city' => "Bathinda",
    ),
    array(
        'state_id' => 54,
        'city' => "Faridkot",
        'o_city' => "Faridkot",
    ),
    array(
        'state_id' => 54,
        'city' => "Fatehgarh Sahib",
        'o_city' => "Fatehgarh Sahib",
    ),
    array(
        'state_id' => 54,
        'city' => "Fazilka",
        'o_city' => "Fazilka",
    ),
    array(
        'state_id' => 54,
        'city' => "Firozpur",
        'o_city' => "Firozpur",
    ),
    array(
        'state_id' => 54,
        'city' => "Gurdaspur",
        'o_city' => "Gurdaspur",
    ),
    array(
        'state_id' => 54,
        'city' => "Hoshiarpur",
        'o_city' => "Hoshiarpur",
    ),
    array(
        'state_id' => 54,
        'city' => "Jalandhar",
        'o_city' => "Jalandhar",
    ),
    array(
        'state_id' => 54,
        'city' => "Kapurthala",
        'o_city' => "Kapurthala",
    ),
    array(
        'state_id' => 54,
        'city' => "Ludhiana",
        'o_city' => "Ludhiana",
    ),
    array(
        'state_id' => 54,
        'city' => "Mansa",
        'o_city' => "Mansa",
    ),
    array(
        'state_id' => 54,
        'city' => "Moga",
        'o_city' => "Moga",
    ),
    array(
        'state_id' => 54,
        'city' => "Mohali SAS Nagar",
        'o_city' => "Sahibzada Ajit Singh Nagar",
    ),
    array(
        'state_id' => 54,
        'city' => "Muktsar",
        'o_city' => "Muktsar",
    ),
    array(
        'state_id' => 54,
        'city' => "Nawanshahr",
        'o_city' => "Nawanshahr",
    ),
    array(
        'state_id' => 54,
        'city' => "Pathankot",
        'o_city' => "Pathankot",
    ),
    array(
        'state_id' => 54,
        'city' => "Patiala",
        'o_city' => "Patiala",
    ),
    array(
        'state_id' => 54,
        'city' => "Rupnagar",
        'o_city' => "Rupnagar",
    ),
    array(
        'state_id' => 54,
        'city' => "Sangrur",
        'o_city' => "Sangrur",
    ),
    array(
        'state_id' => 54,
        'city' => "Tarn Taran",
        'o_city' => "Tarn Taran",
    ),

    array(
        'state_id' => 55,
        'city' => "Ariyalur",
        'o_city' => "Ariyalur",
    ),
    array(
        'state_id' => 55,
        'city' => "Chennai",
        'o_city' => "Chennai",
    ),
    array(
        'state_id' => 55,
        'city' => "Coimbatore",
        'o_city' => "Coimbatore",
    ),
    array(
        'state_id' => 55,
        'city' => "Cuddalore",
        'o_city' => "Cuddalore",
    ),
    array(
        'state_id' => 55,
        'city' => "Dharmapuri",
        'o_city' => "Dharmapuri",
    ),
    array(
        'state_id' => 55,
        'city' => "Dindigul",
        'o_city' => "Dindigul",
    ),
    array(
        'state_id' => 55,
        'city' => "Erode",
        'o_city' => "Erode",
    ),
    array(
        'state_id' => 55,
        'city' => "Kancheepuram",
        'o_city' => "Kancheepuram",
    ),
    array(
        'state_id' => 55,
        'city' => "Kanniyakumari",
        'o_city' => "Kanniyakumari",
    ),
    array(
        'state_id' => 55,
        'city' => "Karur",
        'o_city' => "Karur",
    ),
    array(
        'state_id' => 55,
        'city' => "Krishnagiri",
        'o_city' => "Krishnagiri",
    ),
    array(
        'state_id' => 55,
        'city' => "Madurai",
        'o_city' => "Madurai",
    ),
    array(
        'state_id' => 55,
        'city' => "Nagapattinam",
        'o_city' => "Nagappattinam",
    ),
    array(
        'state_id' => 55,
        'city' => "Namakkal",
        'o_city' => "Namakkal",
    ),
    array(
        'state_id' => 55,
        'city' => "Nilgiris",
        'o_city' => "The Nilgiris",
    ),
    array(
        'state_id' => 55,
        'city' => "Perambalur",
        'o_city' => "Perambalur",
    ),
    array(
        'state_id' => 55,
        'city' => "Pudukkottai",
        'o_city' => "Pudukkottai",
    ),
    array(
        'state_id' => 55,
        'city' => "Ramanathapuram",
        'o_city' => "Ramanathapuram",
    ),
    array(
        'state_id' => 55,
        'city' => "Salem",
        'o_city' => "Salem",
    ),
    array(
        'state_id' => 55,
        'city' => "Sivaganga",
        'o_city' => "Sivaganga",
    ),
    array(
        'state_id' => 55,
        'city' => "Thanjavur",
        'o_city' => "Thanjavur",
    ),
    array(
        'state_id' => 55,
        'city' => "Theni",
        'o_city' => "Theni",
    ),
    array(
        'state_id' => 55,
        'city' => "Thiruvallur",
        'o_city' => "Thiruvallur",
    ),
    array(
        'state_id' => 55,
        'city' => "Thiruvarur",
        'o_city' => "Thiruvarur",
    ),
    array(
        'state_id' => 55,
        'city' => "Tiruchirappalli",
        'o_city' => "Tiruchirappalli",
    ),
    array(
        'state_id' => 55,
        'city' => "Tirunelveli",
        'o_city' => "Tirunelveli",
    ),
    array(
        'state_id' => 55,
        'city' => "Tirupur",
        'o_city' => "Tiruppur",
    ),
    array(
        'state_id' => 55,
        'city' => "Tiruvanamalai",
        'o_city' => "Tiruvannamalai",
    ),
    array(
        'state_id' => 55,
        'city' => "Toothukudi",
        'o_city' => "Thoothukkudi",
    ),
    array(
        'state_id' => 55,
        'city' => "Vellore",
        'o_city' => "Vellore",
    ),
    array(
        'state_id' => 55,
        'city' => "Viluppuram",
        'o_city' => "Viluppuram",
    ),
    array(
        'state_id' => 55,
        'city' => "Virudhunagar",
        'o_city' => "Virudunagar",
    ),

    array(
        'state_id' => 56,
        'city' => "Adilabad",
        'o_city' => "Adilabad",
    ),
    array(
        'state_id' => 56,
        'city' => "Bhadradri Kothagudem",
        'o_city' => "Bhadradri Kothagudem",
    ),
    array(
        'state_id' => 56,
        'city' => "Hyderabad",
        'o_city' => "Hyderabad",
    ),
    array(
        'state_id' => 56,
        'city' => "Jagtial",
        'o_city' => "Jagtial",
    ),
    array(
        'state_id' => 56,
        'city' => "Jangaon",
        'o_city' => "Jangaon",
    ),
    array(
        'state_id' => 56,
        'city' => "Jayashankar Bhupalpally",
        'o_city' => "Jayashankar Bhupalpally",
    ),
    array(
        'state_id' => 56,
        'city' => "Jogulamba Gadwal",
        'o_city' => "Jogulamba Gadwal",
    ),
    array(
        'state_id' => 56,
        'city' => "Kamareddy",
        'o_city' => "Kamareddy",
    ),
    array(
        'state_id' => 56,
        'city' => "Komaram Bheem",
        'o_city' => "Komaram Bheem",
    ),
    array(
        'state_id' => 56,
        'city' => "Karim Nagar",
        'o_city' => "Karim Nagar",
    ),
    array(
        'state_id' => 56,
        'city' => "Khammam",
        'o_city' => "Khammam",
    ),
    array(
        'state_id' => 56,
        'city' => "Mahabubabad",
        'o_city' => "Mahabubabad",
    ),
    array(
        'state_id' => 56,
        'city' => "Mancherial",
        'o_city' => "Mancherial",
    ),
    array(
        'state_id' => 56,
        'city' => "Medchal Malkajgiri",
        'o_city' => "Medchal Malkajgiri",
    ),
    array(
        'state_id' => 56,
        'city' => "Mahbubnagar",
        'o_city' => "Mahbubnagar",
    ),
    array(
        'state_id' => 56,
        'city' => "Medak",
        'o_city' => "Medak",
    ),
    array(
        'state_id' => 56,
        'city' => "Nagarkurnool",
        'o_city' => "Nagarkurnool",
    ),
    array(
        'state_id' => 56,
        'city' => "Nirmal",
        'o_city' => "Nirmal",
    ),
    array(
        'state_id' => 56,
        'city' => "Nalgonda",
        'o_city' => "Nalgonda",
    ),
    array(
        'state_id' => 56,
        'city' => "Nizamabad",
        'o_city' => "Nizamabad",
    ),
    array(
        'state_id' => 56,
        'city' => "Peddapalli",
        'o_city' => "Peddapalli",
    ),
    array(
        'state_id' => 56,
        'city' => "Rajanna Sircilla",
        'o_city' => "Rajanna Sircilla",
    ),
    array(
        'state_id' => 56,
        'city' => "Ranga Reddy",
        'o_city' => "Ranga Reddy",
    ),
    array(
        'state_id' => 56,
        'city' => "Sangareddy",
        'o_city' => "Sangareddy",
    ),
    array(
        'state_id' => 56,
        'city' => "Siddipet",
        'o_city' => "Siddipet",
    ),
    array(
        'state_id' => 56,
        'city' => "Suryapet",
        'o_city' => "Suryapet",
    ),
    array(
        'state_id' => 56,
        'city' => "Vikarabad",
        'o_city' => "Vikarabad",
    ),
    array(
        'state_id' => 56,
        'city' => "Wanaparthy",
        'o_city' => "Wanaparthy",
    ),
    array(
        'state_id' => 56,
        'city' => "Warangal Rural",
        'o_city' => "Warangal",
    ),
    array(
        'state_id' => 56,
        'city' => "Warangal Urban",
        'o_city' => "Warangal Urban",
    ),
    array(
        'state_id' => 56,
        'city' => "Yadadri Bhongir",
        'o_city' => "Yadadri Bhongir",
    ),

    array(
        'state_id' => 57,
        'city' => "Alipurduar",
        'o_city' => "Alipurduar",
    ),
    array(
        'state_id' => 57,
        'city' => "Bankura",
        'o_city' => "Bankura",
    ),
    array(
        'state_id' => 57,
        'city' => "Birbhum",
        'o_city' => "Birbhum",
    ),
    array(
        'state_id' => 57,
        'city' => "Dakshin Dinajpur",
        'o_city' => "Dakshin Dinajpur",
    ),
    array(
        'state_id' => 57,
        'city' => "Darjiling",
        'o_city' => "Darjiling",
    ),
    array(
        'state_id' => 57,
        'city' => "Haora",
        'o_city' => "Haora",
    ),
    array(
        'state_id' => 57,
        'city' => "Hugli",
        'o_city' => "Hugli",
    ),
    array(
        'state_id' => 57,
        'city' => "Jalpaiguri",
        'o_city' => "Jalpaiguri",
    ),
    array(
        'state_id' => 57,
        'city' => "Jhargram",
        'o_city' => "Jhargram",
    ),
    array(
        'state_id' => 57,
        'city' => "Kalimpong",
        'o_city' => "Kalimpong",
    ),
    array(
        'state_id' => 57,
        'city' => "Koch Bihar",
        'o_city' => "Koch Bihar",
    ),
    array(
        'state_id' => 57,
        'city' => "Kolkata",
        'o_city' => "Kolkata",
    ),
    array(
        'state_id' => 57,
        'city' => "Maldah",
        'o_city' => "Maldah",
    ),
    array(
        'state_id' => 57,
        'city' => "Murshidabad",
        'o_city' => "Murshidabad",
    ),
    array(
        'state_id' => 57,
        'city' => "Nadia",
        'o_city' => "Nadia",
    ),
    array(
        'state_id' => 57,
        'city' => "North Twenty Four Parganas",
        'o_city' => "North 24 Parganas",
    ),
    array(
        'state_id' => 57,
        'city' => "Paschim Barddhaman",
        'o_city' => "Barddhaman",
    ),
    array(
        'state_id' => 57,
        'city' => "Paschim Medinipur",
        'o_city' => "Pashchim Medinipur",
    ),
    array(
        'state_id' => 57,
        'city' => "Purba Barddhaman",
        'o_city' => "Purba Barddhaman",
    ),
    array(
        'state_id' => 57,
        'city' => "Purba Medinipur",
        'o_city' => "Purba Medinipur",
    ),
    array(
        'state_id' => 57,
        'city' => "Puruliya",
        'o_city' => "Puruliya",
    ),
    array(
        'state_id' => 57,
        'city' => "South Twenty Four Parganas",
        'o_city' => "South 24 Parganas",
    ),
    array(
        'state_id' => 57,
        'city' => "Uttar Dinajpur",
        'o_city' => "Uttar Dinajpur",
    ),
);




$insert_values = '';
foreach( $new_districts as $new_district ){
    $states_id = $new_district['state_id'];

    //$district_id = insert_district($states_id, $new_district['city'], $new_district['o_city']);
    //createDistrictUser($new_district['city'], $states_id, $district_id);

    $insert_values 			.= '( 4, ' . $states_id . ', "' . $new_district['city'] . '", "' . $new_district['o_city'] . '" ),';
}

$insert_values 						    = rtrim($insert_values, ",");
$insert_query 							= "INSERT INTO " . CITY_TBL . " (`countries_id`,`states_id`,`city`,`original_city`";

$insert_query 							.= ") VALUES " . $insert_values;
//$wpdb->query($insert_query);

echo $insert_query;


function insert_district($states_id, $city_name = '', $o_city_name = ''){
    global $wpdb, $city_array;

    if( empty($city_name) )
        return 0;

    $city = $wpdb->get_row("SELECT id FROM " .CITY_TBL. " WHERE `states_id` = '".$states_id."' AND `city` LIKE '%" . $city_name . "%'");

    if( $city && !empty($city) ){
        
        $city_array[] = [
            'city' => $city_name,
            'id' => $city->id,
            'states_id' => $states_id,
            'is_exists' => true
        ];

        return $city->id;

    }
    
    $wpdb->insert( CITY_TBL, 
        array(
            'countries_id'          => 4,
            'states_id'       	    => $states_id,
            'city'       			=> $city_name,
            'original_city' 		=> $o_city_name
        ),
        array(
            '%d',
            '%d',
            '%s',
            '%s'
        ) 
    );

    $city_array[] = [
        'city' => $city_name,
        'id' => $wpdb->insert_id,
        'states_id' => $states_id,
        'is_exists' => false
    ];

    return $wpdb->insert_id;
}

function createDistrictUser($city, $state_id, $city_id){
    global $user_array;
        
    $city      = strtolower(str_replace(' ','',$city));
    $un        = $city;
    $pass      = $city."@prompt";
    $email     = $city."@prompt.com";

    $user      = get_users(array(
        'meta_key'      => 'state',
        'meta_value'    => $state_id
    ));

    foreach ($user as $value) {
        $uid   = $value->ID;
    }

    $is_exists = get_user_by( 'login', $un );

    $user_id    = 0;

    if( $is_exists && !empty($is_exists) && isset($is_exists->ID) && $is_exists->ID > 0 ){
        $user_id = $is_exists->ID;

        $user_array[] = [
            'id' => $user_id,
            'name' => $un,
            'is_exists' => true,
        ];

    } else {
        $create_user = wp_create_user( $un, $pass, $email );

        if( !is_wp_error( $create_user ) ){
            $user_id = $create_user;
        }

        $user_array[] = [
            'id' => $user_id,
            'name' => $un,
            'is_exists' => false,
        ];
    }

    if( !empty($user_id) && $user_id > 0 ){
        update_user_meta( $user_id, 'state', $state_id );
        update_user_meta( $user_id, 'city', $city_id );

        if($uid){
            update_user_meta( $user_id, 'parent_id', $uid );
        }
        
        $user   = new WP_User($user_id);
        $user->set_role( DISTICT_USER );
    }
}
?>