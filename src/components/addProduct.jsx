"use client";

import { useState } from "react";
import "../styles/addProudct.css";

import Input from "./ui/input.jsx";
import Button from "./ui/button.jsx";
import { AuthModal } from "./authModal";
import { Loader2 } from "lucide-react";
import { addProduct } from "@/app/auth/callback/actions";
import { toast } from "sonner";

export default function AddProduct({user}) {

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user) {
            setShowAuthModal(true);
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("url", url);

        const result = await addProduct(formData);

        if (result.error) {
            toast.error(result.error);
        }

        else {
            toast.success(result.message || "Product tracked successfully!");
            setUrl("");
        }

        setLoading(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="form">
                <div className="formDiv">
                    <Input 
                        className="input"
                        type="url" 
                        value={url}
                        onChange = {(e) => setUrl(e.target.value)}
                        placeholder="Paste product URL"
                        required
                        disabled={loading}
                    />

                    <Button 
                        className="buttonOrange" 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="loader" /> 
                                Adding...
                            </>
                        ) : (
                            "Track Price"
                        )}
                    </Button>
                </div>
            </form>

            {/* Auth Modal */}
            <AuthModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    )
}