export function formatURL(url: string) {
    return url.replace(/\s/g, "-").toLowerCase();
}