import {GroupContainer , FormInputContainer , FormInputLabel} from './form-input.styles.jsx';



const FormInput = ({ label, ...otherprops }) => {
    return (
        <GroupContainer>
            <FormInputContainer {...otherprops} />
            {label ? (
                <FormInputLabel
                    className={otherprops.value.length ? 'shrink' : ''}
                >
                    {label}
                </FormInputLabel>
            ) : null}
        </GroupContainer>
    );
};

export default FormInput;