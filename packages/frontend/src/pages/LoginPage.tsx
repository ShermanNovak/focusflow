import { Button, Form, Input } from "antd";

export default function LoginPage() {
  return (
    <Form>
      <Button>Login with Google</Button>
        <Form.Item name="email" label="Email">
            <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
            <Input />
        </Form.Item>
        <Button htmlType="submit">Login</Button>
    </Form>
  );
}
