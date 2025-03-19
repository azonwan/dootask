<?php

namespace App\Module;

use Exception;
use PhpOffice\PhpWord\IOFactory;
use Smalot\PdfParser\Parser;

class TextExtractor
{
    /**
     * 从文件中提取文本
     *
     * @param string $filePath 文件路径
     * @return string
     * @throws Exception
     */
    public function extractText(string $filePath): string
    {
        if (!file_exists($filePath)) {
            throw new Exception("File does not exist: {$filePath}");
        }

        $fileExtension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));

        return match($fileExtension) {
            'pdf'   => $this->extractFromPDF($filePath),
            'docx'  => $this->extractFromDOCX($filePath),
            'ipynb' => $this->extractFromIPYNB($filePath),
            default => $this->extractFromOtherFile($filePath),
        };
    }

    /**
     * 从PDF文件中提取文本
     *
     * @param string $filePath
     * @return string
     * @throws Exception
     */
    protected function extractFromPDF(string $filePath): string
    {
        try {
            $parser = new Parser();
            $pdf = $parser->parseFile($filePath);

            return $pdf->getText();
        } catch (Exception $e) {
            throw new Exception("PDF text extraction failed: " . $e->getMessage());
        }
    }

    /**
     * 从DOCX文件中提取文本
     *
     * @param string $filePath
     * @return string
     * @throws Exception
     */
    protected function extractFromDOCX(string $filePath): string
    {
        $phpWord = IOFactory::load($filePath);
        $text = '';

        foreach ($phpWord->getSections() as $section) {
            foreach ($section->getElements() as $element) {
                if (method_exists($element, 'getText')) {
                    $text .= $element->getText() . "\n";
                }
            }
        }

        return $text;
    }

    /**
     * 从Jupyter Notebook文件中提取文本
     *
     * @param string $filePath
     * @return string
     * @throws Exception
     */
    protected function extractFromIPYNB(string $filePath): string
    {
        $content = file_get_contents($filePath);
        $notebook = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("IPYNB file parsing failed: " . json_last_error_msg());
        }

        $extractedText = '';

        foreach ($notebook['cells'] ?? [] as $cell) {
            if (in_array($cell['cell_type'] ?? '', ['markdown', 'code']) && isset($cell['source'])) {
                $source = $cell['source'];
                $extractedText .= is_array($source)
                    ? implode("\n", $source)
                    : $source;
                $extractedText .= "\n";
            }
        }

        return $extractedText;
    }

    /**
     * 从其他类型文件中提取文本
     *
     * @param string $filePath
     * @return string
     * @throws Exception
     */
    protected function extractFromOtherFile(string $filePath): string
    {
        if ($this->isBinaryFile($filePath)) {
            throw new Exception("Unable to read the text content of this type of file");
        }

        return file_get_contents($filePath);
    }

    /**
     * 检查文件是否为二进制文件
     *
     * @param string $filePath
     * @return bool
     */
    protected function isBinaryFile(string $filePath): bool
    {
        $finfo = finfo_open(FILEINFO_MIME);
        $mimeType = finfo_file($finfo, $filePath);
        finfo_close($finfo);

        return !str_contains($mimeType, 'text/')
            && !str_contains($mimeType, 'application/json')
            && !str_contains($mimeType, 'application/xml');
    }

    /** ********************************************************************* */
    /** ********************************************************************* */
    /** ********************************************************************* */

    /**
     * 获取文件内容
     * @param $filePath
     * @param float|int $maxSize 最大文件大小，单位字节，默认300KB
     * @return array
     */
    public static function getFileContent($filePath, float|int $maxSize = 300 * 1024)
    {
        if (!file_exists($filePath) || !is_file($filePath)) {
            return Base::retError("Failed to read contents of {$filePath}");
        }
        if (filesize($filePath) > $maxSize) {
            return Base::retError("File size exceeds " . Base::readableBytes($maxSize) . ", unable to display content");
        }
        try {
            $extractor = new self();
            return Base::retSuccess("success", $extractor->extractText($filePath));
        } catch (Exception $e) {
            return Base::retError($e->getMessage());
        }
    }
}
