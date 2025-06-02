import { Footer } from "./footer"
import { Navbar } from "./navbar"

const HomeLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="flex-1 bg-[#f3f4ef]">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default HomeLayout