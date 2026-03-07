import './globals.css'

export const metadata = {
  title: 'EXP — Design & Creative Agency',
  description: 'EXP is a design & creative agency based in Los Angeles, CA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
