import { Modal, Input, Tabs, message, Button } from "antd";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onLogin: (username: string, token: string) => void;
};

export const AuthModal: React.FC<Props> = ({ open, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (data.error) {
      message.error(data.error);
    } else {
      message.success(data.message);
    }
  };

  const login = async () => {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (data.error) {
      message.error(data.error);
    } else {
      message.success("Вы вошли");
      onLogin(data.username, data.token);
      onClose();
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Авторизация">
      <Tabs
        items={[
          {
            key: "login",
            label: "Вход",
            children: (
              <>
                <Input placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <Input.Password placeholder="Пароль" onChange={e => setPassword(e.target.value)} style={{ marginTop: 8 }} />
                <Button type="primary" onClick={login} style={{ marginTop: 12 }}>Войти</Button>
              </>
            )
          },
          {
            key: "register",
            label: "Регистрация",
            children: (
              <>
                <Input placeholder="Username" onChange={e => setUsername(e.target.value)} />
                <Input placeholder="Email" onChange={e => setEmail(e.target.value)} style={{ marginTop: 8 }} />
                <Input.Password placeholder="Пароль" onChange={e => setPassword(e.target.value)} style={{ marginTop: 8 }} />
                <Button type="primary" onClick={register} style={{ marginTop: 12 }}>Зарегистрироваться</Button>
              </>
            )
          }
        ]}
      />
    </Modal>
  );
};
