import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import coffeeStoreData from "../../data/coffee-stores.json"
import Head from 'next/head'
import styles from "../../styles/coffee-store.module.css"
import Image from 'next/image'
import cls from 'classnames'
import { fetchCoffeeStores } from '../../lib/coffee-stores'


export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    
    console.log(params)
    const coffeeStores = await fetchCoffeeStores()
    const findCoffeeStoreById =  coffeeStores.find(coffeeStore => {
        return coffeeStore.fsq_id.toString() === params.id
    })
    return {
        props: {
            coffeeStore: findCoffeeStoreById? findCoffeeStoreById:{}

        }
    }
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores()
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.fsq_id.toString()
            }
        }
    })

    return {
        paths: paths,
        fallback: true,
    }

}


const CoffeeStore = (props) => {
    console.log("cs", props)
    const router = useRouter()
    console.log(router)

    if (router.isFallback) {
        return <div>Loading ...</div>
    }

    const { formatted_address, imgUrl, name, locality } = props.coffeeStore.location

   const handleUpvoteButton = () =>{
        console.log('handle upvote ')
    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>
                    {name}
                </title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                             Back to home
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                    <h1 className={styles.name}>{props.coffeeStore.name}</h1>
                    </div>
                    <Image src={imgUrl||"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} width={200} height={300} className={styles.storeImg} alt={name} />
                </div>
                <div className={cls("glass",styles.col2)}>
                <div className={styles.iconWrapper}>
                        <Image src = "/static/icons/places.svg" width={24} height={24} />
                    <p className={styles.text}>{formatted_address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src = "/static/icons/nearme.svg" width={24} height={24} />
                    <p className={styles.text}>{locality}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src = "/static/icons/stars.svg" width={24} height={24} />
                    <p className={styles.text}>{1}</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Upvote</button>
                   
                </div>
            </div>



        </div>
    )
}

export default CoffeeStore