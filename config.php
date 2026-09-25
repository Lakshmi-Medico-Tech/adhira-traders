<?php
/**
 * ==========================================================================
 * ADHIRA FIRE WORKS & PYROTECH — cPanel Database Configuration
 * ==========================================================================
 * 
 * If you want to use MySQL in cPanel:
 * 1. Create a MySQL database and user in your cPanel -> "MySQL Databases".
 * 2. Assign the user to the database with ALL PRIVILEGES.
 * 3. Enter your database credentials below.
 * 
 * NOTE: If you leave these blank, the system automatically uses secure
 * JSON file storage in data/db.json (which is 100% permanent on cPanel!).
 */

return [
    'db_host' => 'localhost',     // usually 'localhost' on cPanel
    'db_port' => '3306',          // standard MySQL port
    'db_name' => '',              // e.g. 'cpaneluser_adhira_db'
    'db_user' => '',              // e.g. 'cpaneluser_adhira_usr'
    'db_pass' => '',              // your MySQL user password
];
