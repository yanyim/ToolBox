import React, { useState } from 'react';
import { Button, Form, Input } from "antd";
import Axios from "axios";

function OpenQr(props) {
  const [openUrl, setOpenUrl] = useState('http://localhost:8000/#/openqr?');
  return (
    <Form
      layout={"inline"}
      onFinish={({ openUrl }) => {
        Axios.get('/uc/oauth2.0/authorize.do?zwdtsw_user_id=101@XY91310110MA1G8U1T2T')
          .then(({data}) => {
            window.open(`${openUrl}access_token=${data}`);
          });

        setOpenUrl(openUrl);
      }}
      initialValues={{
        openUrl,
      }}
    >
      <Form.Item label="OpenQR地址" name="openUrl">
        <Input style={{ width: 400 }}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          打开开放平台
        </Button>
      </Form.Item>
    </Form>
  );
}

export default OpenQr;
