export const createNotificationSlice = (set) => ({
    notification: null,

    setNotification: (message, type = "success") => {
        set({ notification: { message, type } });

        setTimeout(() => {
            set({ notification: null });
        }, 3000);
    }
});