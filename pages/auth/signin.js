/* eslint-disable @next/next/no-img-element */
import {
  getProviders,
  signIn,
  getCsrfToken,
  getSession,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { Router, useRouter } from 'next/router';
import { Connection, SystemProgram, PublicKey, VersionedTransaction, LAMPORTS_PER_SOL,sendAndConfirmTransaction, clusterApiUrl ,TransactionMessage, Transaction, Keypair, recentBlockhash, signAndSendTransaction} from '@solana/web3.js';
const bs58 = require('bs58');


let phantom;
let connection;

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
        const response = await phantom.connect();
        console.log(response.publicKey.toString());
        //router.push('/');
      }else{
        console.log('Phantom wallet is not installed');
      }
    }
    } catch (error) {
      console.log(error);
    }
  }

  const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;
  
      if (provider?.isPhantom) {
        return provider;
      }
    }
  };

  const transtaction = async () => {
      const provider = getProvider();

      const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
      let blockhashObj = await connection.getLatestBlockhash();

      const TransactionInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey('9rbf2rjf1CySrEZhMtooF9z9GkdjKk9gxygBAAC7fAZx'),
        toPubkey: new PublicKey('GoeCHuxBNm8Z9Mk18ri3oUXddjXvYvQWeay3KJTDNtSi'),
        lamports: 1,
      });
      
      const transaction = new Transaction({
        recentBlockhash: blockhashObj,
        feePayer: new PublicKey('9rbf2rjf1CySrEZhMtooF9z9GkdjKk9gxygBAAC7fAZx'),
      }).add(TransactionInstruction);

      console.log(bs58.encode(Uint8Array.from(transaction)));
      const { signature } = await provider.request({
          method: "signAndSendTransaction",
          params: {
              message: bs58.encode(Uint8Array.from(transaction)),
          },
      });
  }

  const loginWithPhantom = async () => {
    try {
      const message = 'Para evitar que alguien se haga pasar por ti, necesitamos que firmes este mensaje';
      const encodeMessage = new TextEncoder().encode(message);
      const signedMessage = await phantom.request({
        method: 'signMessage',
        params: {
          message: encodeMessage,
          display: 'UTF-8',
        },});
      if(signedMessage.signature) {
        window.localStorage.setItem('signature', signedMessage.signature);
        //router.push('/');
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
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                  {errorMessage && (
                    <div className="mt-3 text-sm text-red-600">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <button
                      onClick={() => transtaction()}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Inicia sesión con Phantom
                    </button>
                  </div>
              </div>
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
