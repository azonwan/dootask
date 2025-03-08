<?php

namespace App\Tasks;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

/**
 * 同步聊天数据到Elasticsearch
 */
class ElasticSearchSyncTask extends AbstractTask
{
    public function __construct()
    {
        parent::__construct();
    }

    public function start()
    {
        // 120分钟执行一次
        $time = intval(Cache::get("ElasticSearchSyncTask:Time"));
        if (time() - $time < 120 * 60) {
            return;
        }

        // 执行开始，120分钟后缓存标记失效
        Cache::put("ElasticSearchSyncTask:Time", time(), Carbon::now()->addMinutes(120));

        // 开始执行同步
        @shell_exec("php /var/www/artisan elasticsearch:sync-dialog-user-msg --i");

        // 执行完成，5分钟后缓存标记失效（5分钟任务可重复执行）
        Cache::put("ElasticSearchSyncTask:Time", time(), Carbon::now()->addMinutes(5));
    }

    public function end()
    {
    }
}
