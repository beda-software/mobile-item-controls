import {
    DocumentDisplayNode,
    DocumentFieldNode,
    DocumentGroupNode,
    DocumentNode,
    questionnaireResponseToDocument,
    QuestionnaireResponseToDocumentParams,
} from './utils';

export function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Visual tokens consumed by the default renderers (and their generated
 * stylesheet). Override any subset via `DocumentHtmlConfig.tokens` to restyle
 * without changing markup.
 */
export interface DocumentHtmlTokens {
    fontFamily: string;
    textColor: string;
    labelColor: string;
    titleFontSize: string;
    groupHeadingFontSize: string;
    labelFontSize: string;
    valueFontSize: string;
    pageMargin: string;
    /** Left indent (px) added per nesting depth to group headings. */
    groupIndent: number;
}

export const defaultDocumentHtmlTokens: DocumentHtmlTokens = {
    fontFamily: '-apple-system, "SF Pro Text", "SF Pro", "Helvetica Neue", Arial, sans-serif',
    textColor: '#16191c',
    labelColor: '#16191c',
    titleFontSize: '16px',
    groupHeadingFontSize: '16px',
    labelFontSize: '16px',
    valueFontSize: '16px',
    pageMargin: '24px',
    groupIndent: 12,
};

/** Shared context handed to every render callback. */
export interface DocumentHtmlRenderArgs {
    tokens: DocumentHtmlTokens;
    emptyText: string;
    /** Recursively render a list of nodes at the given depth (for group overrides). */
    renderNodes: (nodes: DocumentNode[], depth: number) => string;
}

export interface DocumentHtmlConfig {
    /** Document heading; omitted → no title block. */
    title?: string;
    /** Placeholder for an enabled field with no answer. */
    emptyText?: string;
    /** Style-token overrides (merged over `defaultDocumentHtmlTokens`). */
    tokens?: Partial<DocumentHtmlTokens>;
    /** Override the markup for a leaf field. Responsible for its own escaping. */
    renderField?: (node: DocumentFieldNode, args: DocumentHtmlRenderArgs) => string;
    /** Override the markup for a display item. */
    renderDisplay?: (node: DocumentDisplayNode, args: DocumentHtmlRenderArgs) => string;
    /** Override the markup for a group (children already rendered to `childrenHtml`). */
    renderGroup?: (
        node: DocumentGroupNode,
        depth: number,
        childrenHtml: string,
        args: DocumentHtmlRenderArgs,
    ) => string;
    /** Override the outer document shell (html/head/body + stylesheet). */
    renderDocument?: (args: { title?: string; body: string; styleTag: string; tokens: DocumentHtmlTokens }) => string;
}

function defaultStyleTag(tokens: DocumentHtmlTokens): string {
    return `<style>
            @page { margin: ${tokens.pageMargin}; }
            body { font-family: ${tokens.fontFamily}; color: ${tokens.textColor}; font-size: 16px; line-height: 24px; }
            .doc-title { font-size: ${tokens.titleFontSize}; font-weight: 700; line-height: 24px; margin: 0 0 24px; padding: 0 0 16px; border-bottom: 1px solid rgba(22, 25, 28, 0.1); }
            .doc-group { margin: 0 0 24px; page-break-inside: avoid; }
            .doc-group-heading { font-size: ${tokens.groupHeadingFontSize}; font-weight: 600; line-height: 24px; margin: 0 0 8px; }
            .doc-row { margin: 0 0 24px; page-break-inside: avoid; }
            .doc-label { font-size: ${tokens.labelFontSize}; font-weight: 600; color: ${tokens.labelColor}; line-height: 24px; margin: 0 0 8px; }
            .doc-value { font-size: ${tokens.valueFontSize}; font-weight: 400; line-height: 24px; white-space: pre-wrap; }
        </style>`;
}

function defaultRenderField(node: DocumentFieldNode, { emptyText }: DocumentHtmlRenderArgs): string {
    const label = node.text ? `<div class="doc-label">${escapeHtml(node.text)}</div>` : '';
    const value = node.value || emptyText;
    return `<div class="doc-row">${label}<div class="doc-value">${escapeHtml(value)}</div></div>`;
}

function defaultRenderDisplay(node: DocumentDisplayNode): string {
    const label = node.text ? `<div class="doc-label">${escapeHtml(node.text)}</div>` : '';
    return `<div class="doc-row">${label}</div>`;
}

function defaultRenderGroup(
    node: DocumentGroupNode,
    depth: number,
    childrenHtml: string,
    { tokens }: DocumentHtmlRenderArgs,
): string {
    const heading = node.text
        ? `<div class="doc-group-heading" style="margin-left:${depth * tokens.groupIndent}px">${escapeHtml(
              node.text,
          )}</div>`
        : '';
    return `<div class="doc-group">${heading}${childrenHtml}</div>`;
}

function defaultRenderDocument({
    title,
    body,
    styleTag,
}: {
    title?: string;
    body: string;
    styleTag: string;
    tokens: DocumentHtmlTokens;
}): string {
    const titleBlock = title ? `<h1 class="doc-title">${escapeHtml(title)}</h1>` : '';
    return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        ${styleTag}
    </head>
    <body>
        ${titleBlock}
        ${body}
    </body>
</html>`;
}

/**
 * Render a document tree to an HTML string. Ships with a basic default look that
 * is configurable from outside two ways: `tokens` restyle the default markup, and
 * `render*` callbacks replace any node's markup entirely.
 */
export function documentToHtml(nodes: DocumentNode[], config: DocumentHtmlConfig = {}): string {
    const tokens: DocumentHtmlTokens = { ...defaultDocumentHtmlTokens, ...config.tokens };
    const emptyText = config.emptyText ?? 'Not provided';
    const renderField = config.renderField ?? defaultRenderField;
    const renderDisplay = config.renderDisplay ?? defaultRenderDisplay;
    const renderGroup = config.renderGroup ?? defaultRenderGroup;
    const renderDocument = config.renderDocument ?? defaultRenderDocument;

    const renderNodes = (list: DocumentNode[], depth: number): string => {
        const args: DocumentHtmlRenderArgs = { tokens, emptyText, renderNodes };
        return list
            .map((node) => {
                if (node.kind === 'group') {
                    return renderGroup(node, depth, renderNodes(node.children, depth + 1), args);
                }
                if (node.kind === 'display') {
                    return renderDisplay(node, args);
                }
                return renderField(node, args);
            })
            .join('');
    };

    return renderDocument({
        title: config.title,
        body: renderNodes(nodes, 0),
        styleTag: defaultStyleTag(tokens),
        tokens,
    });
}

export interface QuestionnaireResponseToHtmlParams extends QuestionnaireResponseToDocumentParams {
    /** HTML rendering options (title, tokens, callbacks). */
    html?: DocumentHtmlConfig;
}

/**
 * Convenience: extract the document tree and render it to HTML in one call.
 * Equivalent to `documentToHtml(questionnaireResponseToDocument(params), params.html)`.
 */
export function questionnaireResponseToHtml({ html, ...documentParams }: QuestionnaireResponseToHtmlParams): string {
    return documentToHtml(questionnaireResponseToDocument(documentParams), html);
}
