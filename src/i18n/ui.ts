import SpainFlag from '@/components/Flags//Spain.astro';
import UnitedKingdom from '@/components/Flags//UnitedKingdom.astro';


// Add missing imports
export const LANGUAGES: Record<
	string,
	{ code: string; name: string; flag: typeof SpainFlag }
> = {
	en: {
		code: 'en',
		name: 'English',
		flag: UnitedKingdom,
	},
	es: {
		code: 'es',
		name: 'Español',
		flag: SpainFlag,
	},
};

export const defaultLang = 'es';
export const showDefaultLang = false;

export const ui = {
	es: {
		'nav.home': 'Inicio',
		'nav.cv': 'CV',
	},
	en: {
		'nav.inicio': 'HOME',
        'nav.cv': 'CV'
    }
} as const;

export const routes = {
	es: {
		
	},
	en: {
		
	},
};
