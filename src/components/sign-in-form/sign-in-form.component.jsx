import { useState, useContext } from 'react';
import FormInput  from '../form-input/form-input.component';
import Button from '../button/button.component';
import { UserContext } from '../contexts/user.context';
import { 
        createUserDocumentFromAuth, 
        signInAuthEmailandPassword,
        signInWithGooglePopup 
      } from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';


const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert('A field is missing, please fill out all fields.');
      return;
    }

    try {
      const { user } = await signInAuthEmailandPassword(email, password);
      setCurrentUser(user);
      
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
          console.log(error);
      }
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]:value});

  };

  return (
    <div className='sign-up-container'>
      <h2>Already Have an Account?</h2>
      <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
          <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />

          <div className='buttons-container'>
            <Button type='submit'>Sign In</Button>
            <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
          </div>
        </form>
    </div>
  );
};

export default SignInForm;