import React from "react";
import { signInWithGoogle } from "../../firebase";

const SignIn = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-semibold">Welcome to Akshaya</h1>
            <button 
                onClick={signInWithGoogle} 
                className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Sign In with Google
            </button>
        </div>
    );
};

export default SignIn;
