<?php
/**
 * ATHIRA CRACKERS & ADHIRA PYROTECH - CPANEL DATABASE CONFIGURATION
 * 
 * Instructions for cPanel Web Hosting:
 * 1. Log into your cPanel account.
 * 2. Create a MySQL database (e.g., yourcpanel_athiradb) & MySQL user with ALL PRIVILEGES.
 * 3. Update the credentials below, or configure them directly inside the Admin Panel under Settings -> Database.
 */

if (!defined('DB_HOST')) define('DB_HOST', 'localhost');
if (!defined('DB_NAME')) define('DB_NAME', 'athira_crackers_db');
if (!defined('DB_USER')) define('DB_USER', 'root');
if (!defined('DB_PASS')) define('DB_PASS', '');
if (!defined('DB_CHARSET')) define('DB_CHARSET', 'utf8mb4');
