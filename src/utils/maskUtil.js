import MaskedInput from 'react-text-mask'

export function cpfMask(props){
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
      placeholderChar={'\u2000'}
      placeholder="xxx.xxx.xxx-xx"
    />
  );
}

export function cnpjMask(props){
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
      placeholderChar={'\u2000'}
      placeholder="xx.xxx.xxx/xxxx-xx"
    />
  );
}
