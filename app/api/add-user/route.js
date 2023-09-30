import EarlyAdopter from "@models/earlyAdopter";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { email } = await req.json()
    try {
        await connectToDB()
        const earlyAdopter = new EarlyAdopter({
            email: email
        })
        await earlyAdopter.save()

        return new Response(JSON.stringify(earlyAdopter), {status: 201})
    }
    catch (error) {
        let errorMessage = ""
        if (error.name == "ValidationError") {
            errorMessage = error.message.split(":")[2].trim()
        }
        else {
            errorMessage = "You have already joined the waitlist"
        }
        return new Response(errorMessage, { status: 401 })

    }
}