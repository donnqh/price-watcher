
"use client"

import { useState } from "react";
import Button from "../components/ui/button.jsx";
import { AuthModal } from "./authModal";
import { LogOut } from "lucide-react";
import "../styles/logButton.css";
import { signOut } from "@/app/auth/callback/actions.js";

export default function AuthButton({ user }) {

    const [showAuthModal, setShowAuthModal] = useState(false);

    if (user) {
        return (
            <form action={signOut}>
                <Button type="submit" className="buttonGhost buttonSm signOutButton">
                    <LogOut className="iconSm"/>
                        Sign Out
                </Button>
            </form>
        )
    }

    return (
        <>
            <Button
                onClick={() => setShowAuthModal(true)}>
                Sign in
            </Button>

            <AuthModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />

        </>
    )
}