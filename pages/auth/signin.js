/* eslint-disable @next/next/no-img-element */
import {
  getProviders,
  signIn,
  getCsrfToken,
  getSession,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { Router, useRouter } from 'next/router';
import * as solanaWeb3 from '@solana/web3.js';


let phantom;

const SignInPage = ({ providers, csrfToken, errorMessage }) => {
  const router = useRouter()
  

  useEffect(() => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;
  
      if (provider?.isPhantom) {
        console.log(provider);
        phantom = provider;
        checkWallet();
      }
    }
    
  }, []);


  const checkWallet = async () => {
    console.log('checking wallet');
  try {
    const {solana} = window;
    
    if (true) {
      
      if(solana.isPhantom) {
        console.log('Phantom wallet is installed');
        //const response = await solana.connect();
        const response = await phantom.connect();
        //const response = await phantom.disconnect();
        //const disconnect = await solana.disconnect();
        //console.log('disconnect', disconnect);
        
   
        console.log(response.publicKey.toString());
        router.push('/');
      }else{
        console.log('Phantom wallet is not installed');
      }
    }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className=" h-full min-h-full w-full flex justify-center items-center">
        <div className=" flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Iniciar Sesión
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




export async function getServerSideProps(context) {
  //getting providers and csfr token
  const providers = ''//await getProviders();
  const csrfToken = ''//await getCsrfToken(context);
  const session = ''//await getSession({ req: context.req });
  console.log(csrfToken);
  const { error } = context.query;
  let errorMessage = "";

  //if user is logged in, redirect to home
  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  /*if (error) {
    const errors = {
      Signin: "Try using a different email address",
      OAuthSignin: "Try using a different email address",
      OAuthCallback: "Try using a different email address",
      OAuthCreateAccount: "Try using a different email address",
      EmailCreateAccount: "Try using a different email address",
      Callback: "Try using a different email address",
      OAuthAccountNotLinked:
        "Try using a different email address or sign in with a different provider",
      EmailSignin: "Check your email for a link to reset your password",
      default: "A unknown and misterious error happened",
    };

    errorMessage = errors[error] || errors.default;
  }*/

  return {
    props: { errorMessage, providers, csrfToken },
  };
}

export default SignInPage;
