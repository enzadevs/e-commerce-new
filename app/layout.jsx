import './globals.css'
import TopProgressBar from 'components/Functions/TopProgressBar'

export const metadata = {
    title: 'Next JS',
    description: 'Next JS',
    name: 'viewport', 
    content:'width=device-width, initial-scale=1',
}

import {Inter} from 'next/font/google'

const globalFont = Inter({
    subsets: ['latin','cyrillic'],
    display: 'swap'
})

export default function RootLayout({children}){
    return(
        <html lang='en' className={globalFont.className} suppressHydrationWarning>
            <body className='bg-white flex flex-col min-h-screen'>
                <TopProgressBar/>
                {children}
            </body>
        </html>
    )
}