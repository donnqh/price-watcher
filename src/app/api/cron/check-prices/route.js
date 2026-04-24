import { sendPriceDropAlert } from "@/lib/email";
import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@supabase/supabase-js";
import { Currency } from "lucide-react";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "Prcie check endpoint is working, use POST to trigger",
    });
}

// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
//cron secret code for accessing this function
export async function POST(request) {
    try {
        const authHeader = request.headers.get("authorization");
        const cronSecret = process.env.CRON_SECRET;

        if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const {
            data: products,
            error: productsError
        } = await supabase
        .from("products")
        .select("*");

        if (productsError) throw productsError;
        console.log(`Found ${products.length} products to check`);

        const results = {
            total: products.length,
            updated: 0,
            failed: 0,
            priceChanges: 0,
            alertsSent: 0,
        };

        for (const product of products) {
            try {
                const productData = await scrapeProduct(product.url);

                if (!productData.currentPrice) {
                    results.failed++;
                    continue;
                }

                const newPrice = parseFloat(productData.currentPrice);
                const oldPrice = parseFloat(product.current_price);

                await supabase.from("products").update({
                    current_price: newPrice,
                    currency: productData.currencyCode || product.currency,
                    name: productData.productName || product.name,
                    image_url: productData.productImageUrl || product.image_url,
                    updated_at: new Date().toISOString(),
                }).eq("id", product.id);

                //console.log("FROM EMAIL:", process.env.RESEND_FROM_EMAIL);

                if (oldPrice !== newPrice) {
                    await supabase.from("price_history").insert({
                        product_id: product.id,
                        price: newPrice,
                        currency: productData.currencyCode || product.currency,
                    });

                    results.priceChanges++;

                    if (newPrice < oldPrice) {
                        //send alert 
                        const {
                            data: { user },
                        } = await supabase.auth.admin.getUserById(product.user_id);

                        if (user?.email) {
                            //send email to
                            const emailResult = await sendPriceDropAlert(
                                user.email,
                                product,
                                oldPrice,
                                newPrice
                            );

                            if (emailResult.success) {
                                results.alertsSent++;
                            }
                        }
                    }
                }

                results.updated++;
            }

            catch (error) {
                console.error(`Error processing product ${product.id}:`, error);
                results.failed++;
            }
        }

        return NextResponse.json({
            success: true,
            message: "Price check completed",
            results,
        });
    } 
    catch (error) {
        console.error("Cron job error", error);
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        });
    }
}

// curl -X POST http://localhost:3000/api/cron/check-prices -H "Authorization: Bearer acd4d516c3e78cb40ac0a19cce05c34476c4171dbc7333dda3a7519fe9b42f63"


// curl -X POST https://don-price-watcher.vercel.app/api/cron/check-prices -H "Authorization: Bearer acd4d516c3e78cb40ac0a19cce05c34476c4171dbc7333dda3a7519fe9b42f63"

