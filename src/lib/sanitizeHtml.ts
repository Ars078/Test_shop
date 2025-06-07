import sanitizeHtml from 'sanitize-html';

export function sanitize(input: string): string {
    return sanitizeHtml(input, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3']),
        allowedAttributes: {
            a: ['href', 'name', 'target'],
            img: ['src', 'alt'],
            '*': ['style', 'class']
        }
    });
}
