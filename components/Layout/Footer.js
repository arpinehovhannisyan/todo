import Link from "next/link";

const Footer = () => {
    return (
        <div className=" h-40 flex justify-center items-center text-white bg-slate-900  fixed w-[1920px] bottom-0 mt-8">
            <div className=" flex gap-6">
                <Link href="home">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact"> Contact</Link>
            </div>
        </div>
    )
}
export default Footer;