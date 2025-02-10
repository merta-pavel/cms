import React from 'react';
import SignInButton from '@/components/server/SignInButton';
import Link from 'next/link';
import SignOutButtonClient from "@/components/server/SignOutButton";

const SignInPage = () => {
    return (
        <div className="container">
            <header className="header">
                <h1 className="title">Přihlásit se</h1>
                <SignInButton />
                <SignOutButtonClient />
            </header>
            <main>
                <Link href="/">
                    <button className="btn btn-primary">Na hlavní stránku</button>
                </Link>
            </main>
        </div>
    );
}

export default SignInPage;