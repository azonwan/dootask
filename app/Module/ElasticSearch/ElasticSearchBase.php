<?php

namespace App\Module\ElasticSearch;

use Elastic\Elasticsearch\ClientBuilder;
use Elastic\Elasticsearch\Exception\MissingParameterException;
use Illuminate\Support\Facades\Log;

/**
 * Elasticsearch基础类
 *
 * Class ElasticSearchBase
 * @package App\Module\ElasticSearch
 */
class ElasticSearchBase
{
    /**
     * Elasticsearch客户端实例
     *
     * @var \Elastic\Elasticsearch\Client
     */
    protected $client;

    /**
     * 当前操作的索引名称
     *
     * @var string
     */
    protected $index;

    /**
     * 构造函数
     *
     * @param null $index 默认索引名称
     * @throws \Elastic\Elasticsearch\Exception\ConfigException
     */
    public function __construct($index = null)
    {
        $host = env('ELASTICSEARCH_HOST', 'es');
        $port = env('ELASTICSEARCH_PORT', '9200');
        $scheme = env('ELASTICSEARCH_SCHEME', 'http');
        $user = env('ELASTICSEARCH_USER', '');
        $pass = env('ELASTICSEARCH_PASS', '');
        $verifi = env('ELASTICSEARCH_VERIFI', false);
        $ca = env('ELASTICSEARCH_CA', '');
        $key = env('ELASTICSEARCH_KEY', '');
        $cert = env('ELASTICSEARCH_CERT', '');
        // 为8.x版本客户端配置连接
        $config = [
            'hosts' => ["{$scheme}://{$host}:{$port}"]
        ];

        // 如果设置了用户名和密码
        if (!empty($user)) {
            $config['basicAuthentication'] = [$user, $pass];
        }

        $config['SSLVerification'] = $verifi;
        if ($verifi) {
            $config['SSLCert'] = $cert;
            $config['CABundle'] = $ca;
            $config['SSLKey'] = $key;
        }
        // 8.x版本使用ClientBuilder::fromConfig创建客户端
        $this->client = ClientBuilder::fromConfig($config);

        if ($index) {
            $this->index = $index;
        }
    }

    /**
     * 设置索引名称
     *
     * @param string $index
     * @return $this
     */
    public function setIndex($index)
    {
        $this->index = $index;
        return $this;
    }

    /**
     * 检查索引是否存在
     *
     * @return bool
     * @throws \Exception
     */
    public function indexExists()
    {
        $params = ['index' => $this->index];
        return $this->client->indices()->exists($params)->asBool();
    }

    /**
     * 创建索引
     *
     * @param array $settings 索引设置
     * @param array $mappings 字段映射
     * @return array
     */
    public function createIndex($settings = [], $mappings = [])
    {
        $params = [
            'index' => $this->index
        ];

        $body = [];
        if (!empty($settings)) {
            $body['settings'] = $settings;
        }

        if (!empty($mappings)) {
            $body['mappings'] = $mappings;
        }

        if (!empty($body)) {
            $params['body'] = $body;
        }

        try {
            // 在8.x中，索引操作位于indices()命名空间
            return $this->client->indices()->create($params)->asArray();
        } catch (\Exception $e) {
            Log::error('创建Elasticsearch索引失败: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * 删除索引
     * @return array
     */
    public function deleteIndex()
    {
        try {
            $params = ['index' => $this->index];
            return $this->client->indices()->delete($params)->asArray();
        } catch (\Exception $e) {
            Log::error('删除Elasticsearch索引失败: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * 批量操作（批量添加/更新/删除文档）
     *
     * @param array $operations 批量操作的数据
     * @return array
     */
    public function bulk($operations)
    {
        try {
            // 在8.x中，批量操作API签名相同，但内部实现有所变化
            return $this->client->bulk($operations)->asArray();
        } catch (\Exception $e) {
            Log::error('批量操作失败: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * 索引单个文档
     *
     * @param array $document 文档数据
     * @param string $id 文档ID
     * @param string|null $routing 路由值，用于父子文档
     * @return array
     */
    public function indexDocument($document, $id, $routing = null)
    {
        $params = [
            'index' => $this->index,
            'id' => $id,
            'body' => $document
        ];

        if ($routing) {
            $params['routing'] = $routing;
        }

        try {
            return $this->client->index($params)->asArray();
        } catch (\Exception $e) {
            Log::error('索引文档失败: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * 删除文档
     *
     * @param string $id 文档ID
     * @param string|null $routing 路由值，用于父子文档
     * @return array
     */
    public function deleteDocument($id, $routing = null)
    {
        $params = [
            'index' => $this->index,
            'id' => $id
        ];

        if ($routing) {
            $params['routing'] = $routing;
        }

        try {
            return $this->client->delete($params)->asArray();
        } catch (MissingParameterException $e) {
            // 文档不存在时返回成功
            return ['result' => 'not_found', 'error' => $e->getMessage()];
        } catch (\Exception $e) {
            Log::error('删除文档失败: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * 刷新索引
     * @return array
     */
    public function refreshIndex()
    {
        $params = [
            'index' => $this->index
        ];

        try {
            return $this->client->indices()->refresh($params)->asArray();
        } catch (\Exception $e) {
            Log::error('刷新索引失败: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * 检查索引映射
     * @return array
     */
    public function checkIndexMapping()
    {
        try {
            return $this->client->indices()->getMapping(['index' => $this->index])->asArray();
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * 通用搜索方法
     *
     * @param array $query 搜索查询
     * @param int $from 起始位置
     * @param int $size 返回结果数量
     * @param array $sort 排序规则
     * @return array
     */
    public function search($query, $from = 0, $size = 10, $sort = [])
    {
        $params = [
            'index' => $this->index,
            'body' => [
                'query' => $query,
                'from' => $from,
                'size' => $size
            ]
        ];

        if (!empty($sort)) {
            $params['body']['sort'] = $sort;
        }

        try {
            return $this->client->search($params)->asArray();
        } catch (\Exception $e) {
            Log::error('搜索失败: ' . $e->getMessage());
            return ['error' => $e->getMessage(), 'hits' => ['total' => ['value' => 0], 'hits' => []]];
        }
    }

    /**
     * 索引名称
     */
    const indexName = 'default';

    /**
     * 获取索引名称
     * @param string $index 索引名称
     * @param string|null $prefix 索引前缀
     * @param string|null $subfix 索引后缀
     * @return string
     */
    public static function indexName($index = '', $prefix = '', $subfix = '')
    {
        $index = $index ?: static::indexName;
        $prefix = $prefix ?: env('ES_INDEX_PREFIX', '');
        $subfix = $subfix ?: env('ES_INDEX_SUFFIX', '');
        if ($prefix) {
            $index = rtrim($prefix, '_') . '_' . $index;
        }
        if ($subfix) {
            $index = $index . '_' . ltrim($subfix, '_');
        }
        return $index;
    }
}
