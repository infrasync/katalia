import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/Auth';
import Header from '@/components/Header';

export default function Login() {
  const [isDisabled, setDisabled] = useState(false);

  const { register, getValues, handleSubmit, errors } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Get signUp function from the auth context
  const { signIn } = useAuth();

  const history = useHistory();
  const [isError, setError] = useState(null);

  async function onSubmit(e) {
    setDisabled(true);
    // Get email and password input values
    const email = getValues('email');
    const password = getValues('password');

    // Calls `signIn` function from the context
    const { error: errorSignIn } = await signIn({ email, password });

    if (errorSignIn) {
      setError(errorSignIn.message);
      toast.error(errorSignIn.message);
      setDisabled(false);
      console.log(errorSignIn.message);
    } else {
      // Redirect user to Dashboard
      history.push('/dashboard');
    }
  }

  return (
    <main>
      <Header />
      <section className='layout md:w-2/4 p-16 space-y-6 flex flex-col items-center justify-center'>
        {isError && (
          <div className='flex flex-col items-center space-y-3'>
            <p className='md:text-xl text-lg font-dm font-bold text-red-500'>
              {isError}
            </p>
            <Link to='/forget-password'>
              <p className='md:text-lg font-secondary text-white  rounded-lg font-extrabold px-2 py-1 bg-yellow-600 hover:bg-yellow-500'>
                Forget Password?
              </p>
            </Link>
          </div>
        )}{' '}
        <p className='font-dm md:text-lg'>
          Forget Password?{' '}
          <Link to='/forget-password' className='font-bold text-dark'>
            Forget
          </Link>
        </p>
        <form className='flex flex-col space-y-4 w-full'>
          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='email'
              className='font-bold text-dark font-secondary text-lg md:text-xl'
            >
              Email
            </label>
            <input
              id='email'
              type='email'
              {...register('email', {
                required: 'Email required',
              })}
              className={
                'font-dm' +
                (errors?.email &&
                  'border border-red-500 bg-red-100' + 'font-secondary')
              }
            />
            {errors?.email && errors?.code.email == 'required' ? (
              <p tw='text-red-500 text-sm'>🚨 Cant be empty!</p>
            ) : null}
          </div>
          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='password'
              className='font-bold text-dark text-lg md:text-xl font-secondary'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              {...register('password', {
                required: 'Password required',
              })}
              className={errors?.password && 'border border-red-500 bg-red-100'}
            />
            {errors?.password && errors?.password.type == 'required' ? (
              <p tw='text-red-500 text-sm'>🚨 Cant be empty!</p>
            ) : null}
          </div>
          <br />

          <button
            type='submit'
            className='disabled px-4 py-2 font-bold text-white bg-gradient-to-r from-green-400 via-yellow-400 to-pink-400 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed font-dm text-lg md:text-xl'
            disabled={isDisabled}
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </button>
        </form>
        <p className='font-dm md:text-lg'>
          Don't have an account?{' '}
          <Link to='/signup' className='font-bold text-dark'>
            Sign Up
          </Link>
        </p>
      </section>
      <Toaster />
    </main>
  );
}
