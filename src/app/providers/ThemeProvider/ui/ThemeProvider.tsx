import { ReactNode, useEffect, useMemo, useState } from 'react';

import { useJsonSettings } from '@/entities/User';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';

import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';

interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode;
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider = (props: ThemeProviderProps) => {
	const { initialTheme, children } = props;
	const { theme: defaultTheme } = useJsonSettings();
	const [isThemeInited, setThemeInited] = useState(false);
	const [theme, setTheme] = useState<Theme>(
		initialTheme || fallbackTheme || Theme.LIGHT,
	);

	useEffect(() => {
		if (!isThemeInited && defaultTheme) {
			setTheme(defaultTheme);
			setThemeInited(true);
		}
	}, [defaultTheme, isThemeInited]);

	useEffect(() => {
		document.body.className = theme;
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
	}, [theme]);

	const defaultProps = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme],
	);

	useEffect(() => {
		document.body.classList.add(theme);

		return () => {
			document.body.classList.remove(theme);
		};
	}, [theme]);

	return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
