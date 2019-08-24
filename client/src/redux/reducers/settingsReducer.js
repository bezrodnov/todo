import { SET_THEME } from '../actions';

import green from '../../themes/green';
import dark from '../../themes/dark';
import light from '../../themes/light';

const { localStorage } = window;

const DEFAULT_THEME = (localStorage && localStorage.getItem('theme')) || 'green';

const THEMES = { green, dark, light };

const initialState = {
  theme: THEMES[DEFAULT_THEME],
  themeName: DEFAULT_THEME,
  themeNames: Object.keys(THEMES),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      localStorage && localStorage.setItem('theme', action.payload);
      return {
        ...state,
        theme: THEMES[action.payload],
        themeName: action.payload,
      };
    default:
      return state;
  }
};
