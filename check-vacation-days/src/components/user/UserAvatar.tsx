import { Layout, Avatar, Tooltip, Popconfirm } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { AuthModal } from "../auth/AuthModal";

export const UserAvatar: React.FC<{
  onLogin: (username: string, token: string) => void;
  onLogout: () => void;
  user?: string;
}> = ({ onLogin, onLogout, user }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (user) {
      // ничего не открываем, можно показать Popconfirm для выхода
    } else {
      setOpen(true); // показываем модалку для входа
    }
  };

  return (
    <Layout style={{ background: "transparent", cursor: "pointer" }}>
      {user ? (
        <Popconfirm
          title="Выйти из аккаунта?"
          onConfirm={onLogout}
          okText="Да"
          cancelText="Нет"
        >
          <Tooltip title={`Привет, ${user}`}>
            <Avatar icon={<UserOutlined />} onClick={handleClick} />
          </Tooltip>
        </Popconfirm>
      ) : (
        <>
          <Tooltip title="Войти">
            <Avatar icon={<LoginOutlined />} onClick={handleClick} />
          </Tooltip>
          <AuthModal
            open={open}
            onClose={() => setOpen(false)}
            onLogin={onLogin}
          />
        </>
      )}
    </Layout>
  );
};
