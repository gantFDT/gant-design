import React, { useCallback, useState, useEffect } from 'react';
import { EditableInput, Sketch } from 'react-color/lib/components/common';
import Chrome from 'react-color/lib/Chrome';
import { ConfigConsumer } from '@gantd/config-provider';
import { hex2hsl } from '@util-g';
import { presetPalettes } from '@ant-design/colors';
import SubPicker from './subpicker';
import './index.less';

const primaryColors = Object.entries(presetPalettes)
  .map(([key,value])=>{
    const primary = value.primary;
    delete value.primary;
    return {
      id:key,
      primary,
      children:value
    }
  });

const validColorText = _ => {
  let reg = /^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
  return reg.test(_);
}

const fillText = _ => {
  _.includes('#')&&(_ = _.slice(1));
  _ = _.toUpperCase();
  if(validColorText(_)){
    if(_.length===3){
      return _.replace(/^([0-9a-fA-f])([0-9a-fA-f])([0-9a-fA-f]$)/,'$1$1$2$2$3$3');
    }
    return `${_}`;
  }
  return _.replace('#','');
}

const inputStyles = {
  input:{
    width: 100,
    fontSize: 14,
    color: '#666',
    border: 'none',
    outline: 'none',
    height: 24,
    boxShadow: 'inset 0 0 0 1px #F0F0F0',
    boxSizing: 'content-box',
    borderRadius: '0 4px 4px 0',
    float: 'left',
    paddingLeft: 8,
  },
  disabled: {
    color: '#999',
    backgroundColor: 'rgba(125,125,125,0.05)',
    cursor: 'not-allowed'
  }
};

function ColorPicker(props) {
  const {
    value,
    onChange,
    prefixCls: customizePrefixCls,
    width = 'auto',
    edit = true,
    disabled = false,
    placement = 'top'
  } = props;

  const [visibleStatus, setVisibleStatus] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState('');

  const modifyColor = useCallback((color) => {
    setCurrentColor(color);
    onChange && onChange(color);
  },[])

  const inputColor = useCallback((color) => {
    modifyColor(`#${fillText(color)}`);
  },[])

  useEffect(() => {
    if(!value){
      setCurrentColor('#ffffff');
    }else{
      setCurrentColor(value);
    }
  }, [value])

  const renderWithConfigConsumer = ({ getPrefixCls }) => {
    const showText = fillText(currentColor);
    const prefixCls = getPrefixCls('colorpicker', customizePrefixCls);
    const [h, s, l] = hex2hsl('#' + showText);
    return (
      !edit?(
        <div className={`${prefixCls}-onlypreview`} style={{backgroundColor:currentColor, width: width !== 'auto' ? width : 80}}>#{showText}</div>
      ):(
        <div className={`${prefixCls}-mainwrap`} style={{width}}>
          <div className={`${prefixCls}-preview`} style={{backgroundColor:currentColor, color: l < 0.8 ? '#fff' : '#000'}}>#{showText}</div>
          {
            primaryColors.map(({
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
                    <div className={`${prefixCls}-picker`} style={{bottom: placement === 'top' ? 40 : undefined}}>
                      <SubPicker
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
          <div style={{display:'flex', marginBottom: 3}}>
            <div
              onMouseEnter={()=>!disabled && setPickerVisible(true)}
              onMouseLeave={()=>setPickerVisible(false)}
              className={`${prefixCls}-inputlabel`}
              style={{ position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer' }}
            >
              <span>#</span>
              {
                pickerVisible && <div style={{position: 'absolute', bottom: -33, left: 0, zIndex: 9}} >
                  <Chrome
                    color={currentColor}
                    onChange={color => modifyColor(color.hex)}
                    disableAlpha
                  />
                </div>
              }
            </div>
            {
              disabled ? (
                <input type="text" value={ showText } disabled style={ {...inputStyles.input, ...inputStyles.disabled} }/>
              ) : (
                <EditableInput
                  label={ null }
                  style={ inputStyles }
                  value={ showText }
                  onChange={ inputColor }
                />
              )
            }
          </div>
        </div>
      )
    );
  }
  
  
  return (<ConfigConsumer>{renderWithConfigConsumer}</ConfigConsumer>)
}

export default ColorPicker;