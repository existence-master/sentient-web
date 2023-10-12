import Nav from "@components/Nav"
import { h1, button } from "@utils/styles"
import Image from "next/image"
import { signIn, signOut, useSession, getProviders, } from "next-auth/react"

const Enter = () => {
    const [providers, setProviders] = useState(null)
    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        setupProviders()
    }, [])

    return (
        <section className="h-screen w-screen">
            <Nav action={false} />
            <div className="h-[80%] p-[50px] flex items-center justify-center lg:gap-[100px] sm:gap-[75px] xs:gap-[50px]">
                <div className="w-[50%] flex items-center justify-center">
                    <h1 className={`${h1} text-left`}>
                        Enter into the future
                    </h1>
                </div>
                <div className="w-[50%] flex items-center justify-center">
                    <Image src="/" height={0} width={0} className="w-full" alt="Enter Blob" />
                    <Fragment>
                            {providers && 
                                Object.values(providers).map((provider) => (
                                    <button type="button" onClick={() => signIn(provider.id)} key={provider.name} className="black_btn">
                                    {`Login/Signup With ${provider.name}`} 
                                </button>
                                ))
                            }
                    </Fragment>
                    <button className={`${button} bg-white text-black`}>
                        
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Enter