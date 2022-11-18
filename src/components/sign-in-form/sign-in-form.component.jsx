import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput  from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';


const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;


  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert('A field is missing, please fill out all fields.');
      return;
    }

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          alert('Unsuccessful');
      }
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]:value});

  };

  return (
    <SignInContainer>
      <h2>Already Have an Account?</h2>
      <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput 
            label='Email'
            type='email'
            required 
            onChange={handleChange} 
            name='email' 
            value={email}
          />
          <FormInput
            label='Password'
            type='password'
            required
            onChange={handleChange}
            name='password'
            value={password}
          />

          <ButtonsContainer>
            <Button type='submit'> 
              Sign In
            </Button>
            <Button 
              type='button' 
              buttonType={ BUTTON_TYPE_CLASSES.google } 
              onClick={signInWithGoogle}>
                Google Sign In
            </Button>
          </ButtonsContainer>
        </form>
    </SignInContainer>
  );
};

export default SignInForm;