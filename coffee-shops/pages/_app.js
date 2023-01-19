import '../styles/globals.css'
import CoffeeStore from './coffee-store/[id]'
import StoreProvider from "../hooks/context"


function MyApp({ Component, pageProps }) {
  return (<StoreProvider>
    <Component {...pageProps} />
    </StoreProvider>)
}

export default MyApp
