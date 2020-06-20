export const formatNumber = (num: number, locale: string = 'de-DE'): string => {
    return new Intl.NumberFormat(locale).format(num)
}
