const NotificationsEmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <img 
                src="/images/no_notifications.png"
                alt="No notifications"
            />
            <p className="text-[#192540] text-base font-medium mt-4">You have no notifications yet.</p>
        </div>
    )
}

export default NotificationsEmptyState
