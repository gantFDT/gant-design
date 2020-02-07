import React from 'react'
import { Hue, Saturation, Checkboard, ColorWrap } from 'react-color/lib/components/common'

const Chrome = (props) => {
  const {
    width = 225,
    onChange,
    rgb,
    hsl,
    hsv,
    placement,
    className = '',
  } = props;

  const styles = {
    picker: {
      width,
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      borderRadius: '2px',
      boxShadow: '0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3)',
      boxSizing: 'initial',
      fontFamily: 'Menlo',
    },
    saturation: {
      width: '100%',
      paddingBottom: '55%',
      position: 'relative',
      borderRadius: '2px 2px 0 0',
      overflow: 'hidden',
    },
    Saturation: {
      radius: '2px 2px 0 0',
    },
    body: {
      padding: '16px 16px 12px',
    },
    controls: {
      display: 'flex',
    },
    color: {
      width: '22px',
    },
    swatch: {
      marginTop: '0px',
      width: '10px',
      height: '10px',
      borderRadius: '8px',
      position: 'relative',
      overflow: 'hidden',
    },
    active: {
      absolute: '0px 0px 0px 0px',
      borderRadius: '8px',
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.1)',
      background: `rgba(${ rgb.r }, ${ rgb.g }, ${ rgb.b }, ${ rgb.a })`,
      zIndex: '2',
    },
    toggles: {
      flex: '1',
    },
    hue: {
      height: '10px',
      position: 'relative',
      marginBottom: '0px',
    },
    Hue: {
      radius: '2px',
    },
    alpha: {
      height: '10px',
      position: 'relative',
    },
    Alpha: {
      radius: '2px',
    },
    triangle: {
      width: '0px',
      height: '0px',
      borderStyle: 'solid',
      borderWidth: '0 9px 10px 9px',
      borderColor: 'transparent transparent #fff transparent',
      position: 'absolute',
      top: '0',
      left: '33px'
    },
    triangleShadow: {
      width: '0px',
      height: '0px',
      borderStyle: 'solid',
      borderWidth: '0 9px 10px 9px',
      borderColor: 'transparent transparent rgba(0,0,0,.1) transparent',
      position: 'absolute',
      top: '-1px',
      left: '33px'
    },
  }

  return (
    <div style={{...styles.picker, flexDirection: placement === 'top' ? 'column' : 'column-reverse'}} className={ `chrome-picker ${ className }` }>

      <div style={ placement === 'top' ? {
        ...styles.triangleShadow,
        borderWidth: '10px 9px 0 9px',
        borderColor: 'rgba(0,0,0,.1) transparent transparent transparent',
        bottom: '-1px',
        top: undefined
      } : styles.triangleShadow } />

      <div style={ placement === 'top' ? {
        ...styles.triangle,
        borderWidth: '10px 9px 0 9px',
        borderColor: '#fff transparent transparent transparent',
        bottom: '0px',
        top: undefined
      } : styles.triangle} />

      <div style={ styles.saturation }>
        <Saturation
          style={ styles.Saturation }
          hsl={ hsl }
          hsv={ hsv }
          pointer={() => <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '6px',
              boxShadow: 'inset 0 0 0 1px #fff',
              transform: 'translate(-6px, -6px)',
            }}
          />}
          onChange={ onChange }
        />
      </div>
      <div style={ styles.body }>
        <div style={ styles.controls } className="flexbox-fix">
          <div style={ styles.color }>
            <div style={ styles.swatch }>
              <div style={ styles.active } />
              <Checkboard />
            </div>
          </div>
          <div style={ styles.toggles }>
            <div style={ styles.hue }>
              <Hue
                style={ styles.Hue }
                hsl={ hsl }
                pointer={
                  () => <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '6px',
                      transform: 'translate(-6px, -1px)',
                      backgroundColor: 'rgb(248, 248, 248)',
                      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
                    }}
                  />
                }
                onChange={ onChange }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorWrap(Chrome);