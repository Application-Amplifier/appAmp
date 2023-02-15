"use client"
import { SessionProvider } from "next-auth/react";

//basically this allows other things to use session info such as logged in, so now our app has acess 
//to Nextauth

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
        {children} {/* Our entire app -> has access to NextAuth */}
    </SessionProvider>
  )
}