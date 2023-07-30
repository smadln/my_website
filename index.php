<?php
$request_uri = $_SERVER['REQUEST_URI'];
if (preg_match('/\.html$/', $request_uri)) {
    header("Location: " . substr($request_uri, 0, -5), true, 301);
    exit();
}
// The rest of your PHP code goes here
?>