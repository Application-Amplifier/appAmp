import ProvidersWrapper from './ProvidersWrapper'


//basically just copy the old layout but change it slightly
//adding the import of the big providers wrapper and wrapping with that
//this allows us to use auth on all components as said in providers wrapper

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ProvidersWrapper>
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  )
}
