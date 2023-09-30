import '@styles/globals.css'

export const metadata = {
  title: 'Sentient',
  description: 'Your personal AI who feels human',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-black overflow-x-hidden">
        <div className="mt-10">
          {children}
        </div>
      </body>
    </html>
  )
}
