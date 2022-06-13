import React from 'react'
import {Container} from './styles'

interface UpdaloadProps{
  value:any
  onChange:any
  disabled:boolean
  accept:any
  id:string
  ref?:any
}
const UploadControl:React.FC<UpdaloadProps> = ({ children, value, onChange, disabled, accept, id,ref  }) => {
  return (
    <Container htmlFor={id}className="m-0 w-100">
      <input
        ref={ref}
        value={value}
        accept={accept}
        disabled={disabled}
        style={{ display: 'none' }}
        id={id}
        multiple
        type="file"
        onChange={disabled ? () => {} : onChange}
      />
      {children}
    </Container>
  );
};

export default UploadControl