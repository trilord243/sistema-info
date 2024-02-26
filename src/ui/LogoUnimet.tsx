import logoUnimet from "../assets/unimet-blanco.svg";

export default function LogoUnimet() {
    return (
        <div className="flex flex-shrink-0 items-center">
            <img
                className="block h-16 w-auto"
                src={logoUnimet}
                alt="Your Company"
            />
        </div>
    )
}
