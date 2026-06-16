// Composable de configuración global: idioma y tema
// El estado es compartido entre todos los componentes (useState de Nuxt)

export type Lang = 'es' | 'en';
export type Theme = 'light' | 'dark';

export function useSettings() {
  const lang = useState<Lang>('lang', () => 'es');
  const theme = useState<Theme>('theme', () => 'light');

  /** Alterna entre español e inglés */
  function toggleLang() {
    lang.value = lang.value === 'es' ? 'en' : 'es';
  }

  /** Alterna entre tema claro y oscuro y lo aplica al <html> */
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    if (process.client) {
      document.documentElement.classList.toggle('dark', theme.value === 'dark');
      localStorage.setItem('ferremat-theme', theme.value);
    }
  }

  /** Inicializa el tema desde localStorage (llamar en el layout) */
  function initTheme() {
    if (process.client) {
      const saved = localStorage.getItem('ferremat-theme') as Theme | null;
      if (saved) {
        theme.value = saved;
        document.documentElement.classList.toggle('dark', saved === 'dark');
      }
    }
  }

  return { lang, theme, toggleLang, toggleTheme, initTheme };
}
