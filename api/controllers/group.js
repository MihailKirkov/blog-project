export const getUserGroups = (req, res) => {
    const q = "SELECT * FROM groups g JOIN users u ON g.user_id=u.id"
}