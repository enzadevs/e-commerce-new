import NextTopLoader from 'nextjs-toploader'

export default function TopProgressBar(){
    return(
        <NextTopLoader
            color='#00ff00'
            height={4}
            showSpinner={false}
        />
    )
}