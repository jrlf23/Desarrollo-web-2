import { useAppStore } from "../store/useAppStore";

export default function Notification() {
    const { notification } = useAppStore((state) => state);  // Obtener el objeto notification completo

    // Si no hay notificación, no se renderiza nada
    if (!notification) return null;

    // Desestructuramos message y type desde notification
    const { message, type } = notification;

    return (
        <div className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white ${type === "error" ? "bg-red-500" : "bg-green-500"}`}>
            {message}
        </div>
    );
}