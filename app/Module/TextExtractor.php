<?php

namespace App\Module;

use Exception;
use PhpOffice\PhpWord\IOFactory as WordIOFactory;
use PhpOffice\PhpSpreadsheet\IOFactory as SpreadsheetIOFactory;
use PhpOffice\PhpPresentation\IOFactory as PresentationIOFactory;


class TextExtractor
{
    /**
     * 从文件中提取文本
     *
     * @param string $filePath 文件路径
     * @return string
     * @throws Exception
     */
    public function extractContent(string $filePath): string
    {
        if (!file_exists($filePath)) {
            throw new Exception("File does not exist: {$filePath}");
        }

        $fileExtension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));

        return match ($fileExtension) {
            // Word documents
            'docx' => $this->parseWordDocument($filePath),

            // Spreadsheet files
            'xlsx', 'xls', 'csv' => $this->parseSpreadsheet($filePath),

            // Presentation files
            'ppt', 'pptx' => $this->parsePresentation($filePath),

            // PDF files (requires additional library)
            'pdf' => $this->parsePdf($filePath),

            // RTF files
            'rtf' => $this->parseRtf($filePath),

            // Default case
            default => $this->parseOther($filePath),
        };
    }

    /**
     * Parse Word documents (.doc, .docx)
     */
    private function parseWordDocument(string $filePath): string
    {
        $phpWord = WordIOFactory::load($filePath);
        $text = '';

        // Extract text from each section
        foreach ($phpWord->getSections() as $section) {
            foreach ($section->getElements() as $element) {
                if (method_exists($element, 'getText')) {
                    $text .= $element->getText() . "\n";
                } elseif (method_exists($element, 'getElements')) {
                    foreach ($element->getElements() as $childElement) {
                        if (method_exists($childElement, 'getText')) {
                            $text .= $childElement->getText() . "\n";
                        }
                    }
                }
            }
        }

        return $text;
    }

    /**
     * Parse spreadsheet files (.xlsx, .xls, .csv)
     */
    private function parseSpreadsheet(string $filePath): string
    {
        $spreadsheet = SpreadsheetIOFactory::load($filePath);
        $text = '';

        // Extract text from all worksheets
        foreach ($spreadsheet->getWorksheetIterator() as $worksheet) {
            $text .= 'Worksheet: ' . $worksheet->getTitle() . "\n";

            foreach ($worksheet->getRowIterator() as $row) {
                $cellIterator = $row->getCellIterator();
                $cellIterator->setIterateOnlyExistingCells(false);
                $rowText = '';

                foreach ($cellIterator as $cell) {
                    $value = $cell->getValue();
                    if (!empty($value)) {
                        $rowText .= $value . "\t";
                    }
                }

                if (!empty(trim($rowText))) {
                    $text .= trim($rowText) . "\n";
                }
            }

            $text .= "\n";
        }

        return $text;
    }

    /**
     * Parse presentation files (.ppt, .pptx)
     * @throws Exception
     */
    private function parsePresentation(string $filePath): string
    {
        $presentation = PresentationIOFactory::load($filePath);
        $text = '';

        // Extract text from all slides
        foreach ($presentation->getAllSlides() as $slide) {
            foreach ($slide->getShapeCollection() as $shape) {
                if ($shape instanceof \PhpOffice\PhpPresentation\Shape\RichText) {
                    foreach ($shape->getParagraphs() as $paragraph) {
                        foreach ($paragraph->getRichTextElements() as $element) {
                            $text .= $element->getText();
                        }
                        $text .= "\n";
                    }
                }
            }
            $text .= "\n";
        }

        return $text;
    }

    /**
     * Parse PDF files (requires additional library like Smalot\PdfParser)
     * @throws Exception
     */
    private function parsePdf(string $filePath): string
    {
        // You'll need to install the Smalot PDF Parser: composer require smalot/pdfparser
        if (!class_exists('\Smalot\PdfParser\Parser')) {
            throw new \Exception("PDF Parser not available. Install with: composer require smalot/pdfparser");
        }

        $parser = new \Smalot\PdfParser\Parser();
        $pdf = $parser->parseFile($filePath);
        return $pdf->getText();
    }

    /**
     * Parse RTF files
     */
    private function parseRtf(string $filePath): string
    {
        // Simple RTF to text conversion
        $content = file_get_contents($filePath);

        // Remove RTF control words and groups
        $content = preg_replace('/\\\\([a-z]{1,32})(-?[0-9]{1,10})?[ ]?/i', '', $content);
        $content = preg_replace('/\\\\([^a-z]|[a-z]{33,})/i', '', $content);
        $content = preg_replace('/\{\*?\\\\[^{}]*\}/', '', $content);
        $content = preg_replace('/\{[\r\n]*\}/', '', $content);

        // Convert special characters
        $content = preg_replace('/\\\\\'([0-9a-f]{2})/i', '', $content);

        // Remove remaining curly braces
        $content = str_replace(['{', '}'], '', $content);

        return $content ?: '';
    }

    /**
     * Parse Other(text) files
     * @throws Exception
     */
    private function parseOther(string $filePath): string
    {
        $finfo = finfo_open(FILEINFO_MIME);
        $mimeType = finfo_file($finfo, $filePath);
        finfo_close($finfo);

        $isBinary = !str_contains($mimeType, 'text/')
            && !str_contains($mimeType, 'application/json')
            && !str_contains($mimeType, 'application/xml');

        if ($isBinary) {
            throw new Exception("Unable to read the text content of this type of file");
        }

        return file_get_contents($filePath);
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
    public static function extractFile($filePath, float|int $maxSize = 300 * 1024): array
    {
        if (!file_exists($filePath) || !is_file($filePath)) {
            return Base::retError("Failed to read contents of {$filePath}");
        }
        if (filesize($filePath) > $maxSize) {
            return Base::retError("File size exceeds " . Base::readableBytes($maxSize) . ", unable to display content");
        }
        try {
            $extractor = new self();
            return Base::retSuccess("success", $extractor->extractContent($filePath));
        } catch (Exception $e) {
            return Base::retError($e->getMessage());
        }
    }
}
