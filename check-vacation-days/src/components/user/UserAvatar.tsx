import { Layout, Avatar, Tooltip } from "antd";
import { LoginOutlined, UserOutlined} from "@ant-design/icons";
import { useState } from "react";
import { AuthModal } from "../auth/AuthModal";

export const UserAvatar: React.FC<{ onLogin: (u: string) => void; user?: string }> = ({ onLogin, user }) => {
  const [open, setOpen] = useState(false);

  return (
    <Layout style={{ background: "transparent", cursor: "pointer" }}>
      <Tooltip title="Login">
        <Avatar
          icon={user ? <UserOutlined /> : <LoginOutlined />}
          onClick={() => setOpen(true)}
        />
      </Tooltip>
      

      <AuthModal
        open={open}
        onClose={() => setOpen(false)}
        onLogin={onLogin}
      />
    </Layout>
  );
};
