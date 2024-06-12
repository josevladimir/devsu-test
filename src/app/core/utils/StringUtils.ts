export const normalizeToSearch = (text: string): string => {
    return text.trim()
               .toLowerCase()
               .replaceAll('á','a')
               .replaceAll('é','e')
               .replaceAll('í','i')
               .replaceAll('ó','o')
               .replaceAll('ú','u');
}