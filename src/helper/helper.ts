/*
	Locale in formatNumber function is 'de-DE' because in my opinion this one is the best.
*/
export const formatNumber = (num: number, locale: string = 'de-DE'): string => {
  return new Intl.NumberFormat(locale).format(num);
};
