import React from 'react';
import { Fieldset, FormRow, SubmitButton } from '../../_common/components/forms.jsx';

const LostPassword = () => (
    <div className='static_full'>
        <h1>{it.L('Password reset')}</h1>
        <p id='password_reset_description'>{it.L('To reset your password, enter the email address you used to create your account into the field below and click \'Reset password\'.')}</p>

        <form id='frm_lost_password'>
            <Fieldset>
                <FormRow type='text' id='email' label={it.L('Email address')} attributes={{ autoComplete: 'off', maxLength: '50' }} />
                <SubmitButton type='submit' msg_id='form_error' text={it.L('Reset Password')} />
            </Fieldset>
        </form>

        <p>{it.L('If you don’t receive the email within the next few minutes, please check your junk/spam folder.')}</p>
    </div>
);

export default LostPassword;
