

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
            {/* <input
                type='text'
                placeholder={placeholder}
                onChange ={onChange}
                variant={variant}
                onKeyDown={onKeyDown}
            //   onChange={(e) => setText(e.target.value)}
            /> */}
        </div>
    )
}

export default FormBox