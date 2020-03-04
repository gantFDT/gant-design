import React, { CSSProperties } from 'react';
import { Swatch } from 'react-color/lib/components/common';

const styles: {[clsName: string]: CSSProperties} = {
  card: {
    border: '0 solid rgba(0,0,0,0.25)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
    borderRadius: '3px',
    position: 'relative',
  },
  body: {
    padding: '3px 0 0 3px',
  },
  triangle: {
    width: '0px',
    height: '0px',
    borderStyle: 'solid',
    borderWidth: '0 9px 10px 9px',
    borderColor: 'transparent transparent #fff transparent',
    position: 'absolute',
    top: '-10px',
    left: '7px'
  },
  triangleShadow: {
    width: '0px',
    height: '0px',
    borderStyle: 'solid',
    borderWidth: '0 9px 10px 9px',
    borderColor: 'transparent transparent rgba(0,0,0,.1) transparent',
    position: 'absolute',
    top: '-11px',
    left: '7px'
  },
  swatch: {
    width: '26px',
    height: '26px',
    float: 'left',
    borderRadius: '3px',
    margin: '0 3px 3px 0',
  },
  clear: {
    clear: 'both',
  },
}

const SubPicker = props => {
  const {
    onChange,
    width = 148,
    colors = ['#1890FF'],
    placement,
    prefixCls
  } = props;
  
  const handleChange = (color, ev) => {
		ev.stopPropagation();
    onChange&&onChange(color);
  }

  return (
    <div style={{...styles.card, width }} className={`${prefixCls}-subpicker`}>
      <div style={ placement === 'top' ? {
        ...styles.triangleShadow,
        borderWidth: '10px 9px 0 9px',
        borderColor: 'rgba(0,0,0,.1) transparent transparent transparent',
        bottom: '-11px',
        top: undefined
      } : styles.triangleShadow } />
      <div style={ placement === 'top' ? {
        ...styles.triangle,
        borderWidth: '10px 9px 0 9px',
        borderColor: '#fff transparent transparent transparent',
        bottom: '-10px',
        top: undefined
      } : styles.triangle} />

      <div style={ styles.body }>
        { colors.map((c, i) => {
          return (
            <Swatch
              key={ i }
              color={ c }
              hex={ c }
              style={ styles.swatch }
              onClick={ handleChange }
              focusStyle={{
                boxShadow: `0 0 4px ${ c }`,
              }}
            />
          )
        }) }
        <div style={ styles.clear } />
      </div>
    </div>
  )
}

export default SubPicker;