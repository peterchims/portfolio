// src/contexts/ThemeContext/colorScheme.ts

export interface ColorScheme {
  mode: 'light' | 'dark';
  primary: string;
  background: string;
  text: string;
  accent: string;
}

export const lightColors: ColorScheme = {
  mode: 'light',
  primary: '#003322',
  background: '#fafafa',
  text: '#1e1e1e',
  accent: '#8b5cf6',
};

export const darkColors: ColorScheme = {
  mode: 'dark',
  primary: '#001910',
  background: '#1e1e1e',
  text: '#ffffff',
  accent: '#8b5cf6',
};
