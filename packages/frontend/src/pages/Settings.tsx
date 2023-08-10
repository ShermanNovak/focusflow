import PageTitle from "../components/PageTitle"

export default function Settings() {
    return (
        <div className="p-8">
            <PageTitle text="Settings" />
            <button className="bg-navbar-green h-24"></button>
            <button className="bg-pastel-orange h-24"></button>
            <button className="bg-pale-purple h-24"></button>
            <button className="bg-pale-yellow h-24"></button>
        </div>
    )
}