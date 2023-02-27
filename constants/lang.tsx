import strings from './lang.json';

type Strings = typeof strings;
type Language = {
	en: string;
};
type LanguageKey = keyof Language;
export const t = (key: string) => {
	const language: LanguageKey = 'en';
	return (strings as any)[language][key];
};
