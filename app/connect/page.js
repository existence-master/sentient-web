"use client"

import { signIn, useSession, getProviders } from "next-auth/react"


const Connect = () => {
    const { data: session } = useSession()
    
    return (
        <section>
            <div> Hello </div>
            {session && session.user.name}
        </section>
    )
}

export default Connect