const Colors = {
  red_orange: '#FA2D00',
  mint_green: '#2FBA87',
  green_emerald: '#00FA9F',
  terracotta_black: '#A54B37',
  green_pine: '#3D7A64',
  toasted_coffee: '#633C34',
  placeholder: '#BDBDBD', 
} as const;

export type colorName = keyof typeof Colors;

export default Colors;

