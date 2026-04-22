"use client"
import "../styles/productCard.css";

import { deleteProduct } from "@/app/auth/callback/actions";
import { useState } from "react"
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Badge from "./ui/badge.jsx";
import Button from "./ui/button.jsx";
import { ChevronUp, ChevronDown, TrendingDown, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import PriceChart from "./priceChart.jsx";

export default function ProductCard({ product }) {

    const [showChart, setShowChart] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const result = async function handleDelete() {
        if (!confirm ("Remove this product from tracking?"))
            return;

        setDeleting(true);
        await deleteProduct(product.id);

        if (result.error) {
            toast.error(result.error);
        }

        else {
            toast.success(result.message || "Product deleted successfully!");
        }

        setDeleting(false);
    }

    return (
        <div>
            <Card className="card"> 
                <CardHeader className="cardHeader">
                    <div className="cardHeaderDiv">
                        {product.image_url && (
                            <img
                                className="productImg"
                                src={product.image_url}
                                alt={product.name}
                            />
                        )}

                        <div className="productNameDiv">
                            <h3 className="productName">
                                {product.name}
                            </h3>

                            <div className="currencyDiv">
                                <span className="currency">
                                    {product.currency} {product.current_price}
                                </span>

                                <Badge variant="secondary" className="badge">
                                    <TrendingDown className="trendingDown" />
                                    Tracking
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="cardContentDiv">
                        <Button onClick = {() => setShowChart(!showChart)}
                                className="buttonOutline buttonSm gap1">
                            {showChart ? (
                                <>
                                    <ChevronUp className="chevron" />
                                    Hide Chart
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="chevron" />
                                    Show Chart
                                </>
                            )}
                        </Button>

                        <Link 
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button buttonOutline buttonSm gap1"
                        >
                            <ExternalLink className="iconSm" />
                            View Product
                        </Link>

                        <Button className="deleteButton buttonSm buttonOutline"
                                onClick = {result}
                                disabled={deleting}
                        >
                            <Trash2 className="deleteIcon"/>
                            Remove
                        </Button>
                    </div>
                </CardContent>

                {showChart && (
                    <CardFooter className="footer">
                        <PriceChart productId={product.id}/>
                    </CardFooter>
                )}

            </Card>
        </div>
    )
}