export const downloadJson = (link: HTMLLinkElement, json: string) : boolean => {
    console.log("downloadJson", link, json);
    // if no tokens are present
    if (json === '[]') {
        return false;
    }
    // try to export
    try {
        link.href = `data:application/json;charset=utf-8,${encodeURIComponent(json)}`;
        // Programmatically trigger a click on the anchor element
        link.click();
        return true;
    } catch (error) {
        console.error('Export error: ', error);
        return false;
    }
}