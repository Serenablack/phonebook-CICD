const Notification = ({ alert, stat }) => {
  if (alert !== null)
    return (
      <div className={stat === "success" ? "success" : "error"}>{alert}</div>
    );
};
export default Notification;
