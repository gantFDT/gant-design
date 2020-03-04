import {
  presetPalettes
} from '@ant-design/colors';

export const PrimaryColors = Object.entries(presetPalettes)
  .map(([key, value]) => {
    const primary = value.primary;
    delete value.primary;
    return {
      id: key,
      primary,
      children: value
    }
  });

export const validColorText = (_: string): boolean => {
  let reg = /^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
  return reg.test(_);
}
  
export const fillText = (_: string): string => {
  _.includes('#') && (_ = _.slice(1));
  _ = _.toUpperCase();
  if (validColorText(_)) {
    if (_.length === 3) {
      return _.replace(/^([0-9a-fA-f])([0-9a-fA-f])([0-9a-fA-f]$)/, '$1$1$2$2$3$3');
    }
    return `${_}`;
  }
  return _.replace('#', '');
}