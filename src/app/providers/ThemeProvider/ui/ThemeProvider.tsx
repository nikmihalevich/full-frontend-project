import { ReactNode, useEffect, useMemo, useState } from 'react';

import { useJsonSettings } from '@/entities/User';
import { Theme } from '@/shared/const/theme';

import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';

interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
	const { initialTheme, children } = props;
	const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings();
	const [isThemeInited, setThemeInited] = useState(false);
	const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

	useEffect(() => {
		if (!isThemeInited) {
			setTheme(defaultTheme);
			setThemeInited(true);
		}
	}, [defaultTheme, isThemeInited]);

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
