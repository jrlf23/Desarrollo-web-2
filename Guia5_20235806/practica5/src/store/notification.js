import { useAppStore } from "../store/useAppStore";

export default function notification() {
    const { notification } = useAppStore();

    if (!notification) return null;

    return (
        <div className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white 
            ${notification.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {notification.message}
        </div>
    );
}
