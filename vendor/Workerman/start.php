<?php
ini_set('display_errors', 'on');
use Workerman\Worker;

if(strpos(strtolower(PHP_OS), 'win') === 0)
{
    exit("start.php not support windows, please use start_for_win.bat\n");
}

if(!extension_loaded('pcntl'))
{
    exit("Please install pcntl extension. See http://doc3.workerman.net/appendices/install-extension.html\n");
}

if(!extension_loaded('posix'))
{
    exit("Please install posix extension. See http://doc3.workerman.net/appendices/install-extension.html\n");
}

define('GLOBAL_START', 1);

require_once __DIR__ . '/../autoload.php';

foreach(glob(__DIR__.'/Applications/start*.php') as $start_file)
{
    require_once $start_file;
}
Worker::runAll();
