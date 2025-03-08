<?php

namespace App\Module\ElasticSearch;

use App\Module\Base;
use Illuminate\Support\Facades\Log;

/**
 * Elasticsearch键值存储
 *
 * Class ElasticSearchKeyValue
 * @package App\Module\ElasticSearch
 */
class ElasticSearchKeyValue extends ElasticSearchBase
{
    const indexName = 'key_value_store';

    /**
     * 构造函数
     * @return ElasticSearchBase
     * @throws \Elastic\Elasticsearch\Exception\ConfigException
     */
    public function __construct()
    {
        return parent::__construct(self::indexName());
    }

    /** ******************************************************************************************************** */
    /** *********************************** 键值存储方法 ******************************************************** */
    /** ******************************************************************************************************** */

    /**
     * 创建键值存储索引
     * @return array
     */
    public static function generateIndex()
    {
        try {
            $es = new self();

            // 如果索引已存在，则直接返回
            if ($es->indexExists()) {
                return ['acknowledged' => true, 'message' => '索引已存在'];
            }

            // 定义映射
            $mappings = [
                'properties' => [
                    'key' => ['type' => 'keyword'],
                    'value' => ['type' => 'text', 'fields' => ['keyword' => ['type' => 'keyword']]],
                    'created_at' => ['type' => 'integer'],
                    'updated_at' => ['type' => 'integer']
                ]
            ];

            // 索引设置
            $settings = [
                'number_of_shards' => 1,
                'number_of_replicas' => 1,
                'refresh_interval' => '1s'
            ];

            return $es->createIndex($settings, $mappings);
        } catch (\Exception $e) {
            Log::error('创建键值存储索引失败: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * 保存键值对
     * @param string $key 键名
     * @param mixed $value 键值
     * @param string $namespace 命名空间，用于区分不同的键值存储场景
     * @return array
     */
    public static function save($key, $value, $namespace = 'default')
    {
        try {
            // 确保索引存在
            self::generateIndex();

            $es = new self();

            // 生成文档ID
            $docId = "{$namespace}:{$key}";

            // 准备文档数据
            $document = [
                'key' => $key,
                'value' => is_array($value) ? json_encode($value, JSON_UNESCAPED_UNICODE) : $value,
                'namespace' => $namespace,
                'created_at' => time(),
                'updated_at' => time()
            ];

            // 索引文档
            $result = $es->indexDocument($document, $docId);

            // 刷新索引以确保立即可见
            $es->refreshIndex();

            return $result;
        } catch (\Exception $e) {
            Log::error('保存键值对失败: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * 获取键值
     * @param string $key 键名
     * @param mixed $default 默认值，当键不存在时返回
     * @param string $namespace 命名空间，用于区分不同的键值存储场景
     * @return mixed
     */
    public static function get($key, $default = null, $namespace = 'default')
    {
        try {
            $es = new self();

            // 如果索引不存在，直接返回默认值
            if (!$es->indexExists()) {
                return $default;
            }

            // 生成文档ID
            $docId = "{$namespace}:{$key}";

            // 查询参数
            $params = [
                'index' => self::indexName(),
                'id' => $docId
            ];

            try {
                // 获取文档
                $response = $es->client->get($params)->asArray();

                // 获取值
                $value = $response['_source']['value'] ?? $default;

                // 如果值是JSON字符串，尝试解码
                if (is_string($value) && $decoded = json_decode($value, true)) {
                    if (json_last_error() === JSON_ERROR_NONE) {
                        return $decoded;
                    }
                }

                return $value;
            } catch (\Exception $e) {
                // 文档不存在或其他错误，返回默认值
                return $default;
            }
        } catch (\Exception $e) {
            Log::error('获取键值对失败: ' . $e->getMessage());
            return $default;
        }
    }

    /**
     * 获取键值，返回数组
     * @param string $key 键名
     * @param array $default 默认值，当键不存在时返回
     * @param string $namespace 命名空间，用于区分不同的键值存储场景
     * @return array
     */
    public static function getArray($key, $default = [], $namespace = 'default')
    {
        return Base::string2array(self::get($key, $default, $namespace));
    }

    /**
     * 删除键值对
     * @param string $key 键名
     * @param string $namespace 命名空间
     * @return array
     */
    public static function delete($key, $namespace = 'default')
    {
        try {
            $es = new self();

            // 如果索引不存在，直接返回成功
            if (!$es->indexExists()) {
                return ['result' => 'not_found'];
            }

            // 生成文档ID
            $docId = "{$namespace}:{$key}";

            // 删除文档
            $result = $es->deleteDocument($docId);

            // 刷新索引以确保立即生效
            $es->refreshIndex();

            return $result;
        } catch (\Exception $e) {
            Log::error('删除键值对失败: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }
}
