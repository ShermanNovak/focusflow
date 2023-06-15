import { Button, Form, Input } from "antd";

export default function SignUpPage() {
  return (
    <Form>
      <Button>Sign up with Google</Button>
        <Form.Item name="email" label="Email">
            <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
            <Input />
        </Form.Item>
        <Form.Item name="confirm_password" label="Confirm Password">
            <Input />
        </Form.Item>
        <Button htmlType="submit">Create Account</Button>
    </Form>
  );
}
