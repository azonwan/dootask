<?php

namespace App\Tasks;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

class ElasticSearchSyncTask extends AbstractTask
{
    public function __construct()
    {
        parent::__construct();
    }

    public function start()
    {
        // 30分钟执行一次
        $time = intval(Cache::get("ElasticSearchSyncTask:Time"));
        if (time() - $time < 1800) {
            return;
        }
        Cache::put("ElasticSearchSyncTask:Time", time(), Carbon::now()->addMinutes(10));
        // 判断参数
        @shell_exec("php /var/www/artisan elasticsearch:sync-dialog-user-msg --i");
    }

    public function end()
    {
    }
}
