
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";
import ThemeSync from "@/components/providers/ThemeSync";
export function Providers({children}){
    const [queryClient]=useState(
        ()=>
            new QueryClient({
                defaultOptions:{
                    queries:{
                        staleTime: 30 * 1000,
                        retry: 1,
                    },
                },
            })
    );
    return(
        <QueryClientProvider client={queryClient}>
           <ThemeSync/>
            {children}
            <Toaster position="top-right" richColors/>
        </QueryClientProvider>
    );
}