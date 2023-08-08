import { InputHTMLAttributes, FC } from "react";

import { FormInputLabel, FormInputBox, Group } from "./form-input.styles"

type FormInputProps = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...props }) => (
  <Group>
    <FormInputBox {...props} />

    {label && 
    (<FormInputLabel shrink={Boolean(props.value && typeof props.value === 'string' && props.value.length)}>
            {label}
    </FormInputLabel>)}

  </Group>
);
export default FormInput;
