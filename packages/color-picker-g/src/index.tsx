import React, { useCallback, useState, useEffect } from 'react';
import { CustomPicker } from 'react-color';
import { EditableInput } from 'react-color/lib/components/common';
import Chrome from './chrome';
import SubPicker from './subpicker';
import { PrimaryColors, fillText } from './utils';

const inputStyles = {
  input:{
    width: 60,
    fontSize: 13,
    border: 'none',
    outline: 'none',
    height: '100%',
    backgroundColor: 'transparent',
  }
};

function ColorPicker(props) {
  const {
    rgb,
    hsl,
    hsv,
    hex,
    onChange,
    prefixCls: customizePrefixCls = 'gant',
    width = 'auto',
    edit = true,
    disabled = false,
    placement = 'top'
  } = props;

  const [visibleStatus, setVisibleStatus] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState('');

  const modifyColor = useCallback((color) => {
    if (disabled) return;
    setCurrentColor(color);
    onChange && onChange(color);
  },[disabled])

  const inputColor = useCallback((color) => {
    modifyColor(`#${fillText(color)}`);
  },[])

  useEffect(() => {
    if(!hex){
      setCurrentColor('#ffffff');
    }else{
      setCurrentColor(hex);
    }
  }, [hex])


  const showText = fillText(currentColor);
  const prefixCls = customizePrefixCls + '-color-picker';
  const { l } = hsl;

  return (
    !edit?(
      <div className={`${prefixCls}-onlypreview`} style={{backgroundColor:currentColor, width: width !== 'auto' ? width : 80}}>#{showText}</div>
    ):(
      <div className={`${prefixCls}-mainwrap`} style={{width}}>
        <div className={`${prefixCls}-preview`}
          onMouseEnter={()=>!disabled && setPickerVisible(true)}
          onMouseLeave={()=>!disabled && setPickerVisible(false)}
          style={{backgroundColor:currentColor, color: l < 0.8 ? '#fff' : '#000'}}>
          {
            disabled ? <div className={`${prefixCls}-preview-text`}>#{showText}</div> :
            <>
              <div
                className={`${prefixCls}-inputlabel`}
                style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
              >
                <span>#</span>
                {
                  pickerVisible && <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      zIndex: 99,
                      ...placement === 'top' ?
                      { top: -172, paddingBottom: 10 } :
                      { bottom: -172, paddingTop: 10 }
                    }}
                  >
                    <Chrome
                      prefixCls={prefixCls}
                      color={currentColor}
                      placement={placement}
                      onChange={color => modifyColor(color.hex)}
                    />
                  </div>
                }
              </div>
              <EditableInput
                label={ null }
                style={ inputStyles }
                value={ showText }
                onChange={ inputColor }
              />
            </>
          }
        </div>
        {
          PrimaryColors.map(({
            id,
            primary,
            children
          })=>{
            return (
              <div
                className={`${prefixCls}-itemwrap`}
                key={id}
                onMouseEnter={()=>setVisibleStatus(id)}
                onMouseLeave={()=>setVisibleStatus('')}
                onClick={()=>modifyColor(primary)}
              >
                <div
                  className={`${prefixCls}-mainitem`}
                  style={{
                    backgroundColor:primary, 
                    cursor: disabled ? 'not-allowed' : 'pointer'
                  }}
                ></div>
                {!disabled && visibleStatus===id && (
                  <div className={`${prefixCls}-picker`} style={placement === 'top' ? { bottom: 29, paddingBottom: 10 } : { top: 27, paddingTop: 10 }}>
                    <SubPicker
                      prefixCls={prefixCls}
                      placement={placement}
                      color={currentColor}
                      colors={children}
                      onChange={modifyColor}
                    />
                  </div>
                )}
              </div>
            )
          })
        }
      </div>
    )
  );
}

const WithWrap = CustomPicker(ColorPicker);

export default (props) => {
  const { value, onChange, ...restProps } = props;
  const handlerChange = (color) => {
    onChange && onChange(color.hex)
  }
  return <WithWrap {...restProps} onChange={handlerChange} color={value}/>
};