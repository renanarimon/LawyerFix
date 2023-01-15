

const FormBox = ({label, placeholder ,onChange, variant, onKeyDown}) => {
    return (
        <div className='form-control'>
            <label>{label}</label>
            <textarea 
                class="form-control input" 
                aria-label="With textarea"  
                placeholder="תיאור" 
                id="discr08"
                variant={variant}>
            </textarea>
        </div>
    )
}

export default FormBox