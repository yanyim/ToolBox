import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css'
import QRCode from "qrcode.react";
import _ from 'lodash'
import { Card, Form, Input, Button, Row, Col, Modal } from 'antd';
import list from './shanghai.json';
import OpenQr from "./OpenQR";
import { DownloadOutlined, ExpandOutlined } from '@ant-design/icons'
import QrCard from "./QRCard";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const cardStyle = {
  padding: '0 20px',
  marginTop: '20px'
};

const size = 200;


function App() {

  const [url, setUrl] = useState('http://zwdt.sh.gov.cn/smzy/gbm/qiye?');
  const [download, setDownload] = useState(null);

  return (
    <div className="App" style={{ padding: 20 }}>
      <Row>
        <Col span={24} style={cardStyle}>
          <Card>
            <OpenQr/>
          </Card>
        </Col>
        <Col span={24} style={cardStyle}>
          <Card>
            <Form
              layout={"inline"}
              onFinish={({ url }) => {
                setUrl(url);
              }}
              initialValues={{
                url,
              }}
            >
              <Form.Item label="二维码前缀" name="url">
                <Input style={{ width: 400 }}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  重新生成
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={async () => {
                  const items = _.map(list, (val, name) => {
                    return [name, val];
                  });
                  for (let i = 0; i < items.length; i++) {
                    const sizes = [1280, 860, 430, 280];
                    const [name, code] = items[i];
                    for (let j = 0; j < sizes.length; j++) {
                      await new Promise((resolve) => {
                        setTimeout(() => {
                          const size = sizes[j];
                          setDownload({
                            name, size, code: url + code, onCancel: () => {
                              setDownload(null);
                            }
                          });
                          resolve();
                        }, 2000);
                      })
                    }
                  }
                }}>
                  疯狂模式
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

      </Row>
      <Row>
        {_.map(list, (code, name) => <Col key={name} span={6} style={{ padding: 20 }}>
            <Card
              title={name}
              actions={[
                <div>
                  <Button icon={<DownloadOutlined/>} onClick={() => {
                    setDownload({ size: 1280, name, code: url + code });
                  }}>1280px</Button>,
                  <Button icon={<DownloadOutlined/>} onClick={() => {
                    setDownload({ size: 860, name, code: url + code });
                  }}>860px</Button>,
                  <Button icon={<DownloadOutlined/>} onClick={() => {
                    setDownload({ size: 430, name, code: url + code });
                  }}>430px</Button>
                  <Button icon={<DownloadOutlined/>} onClick={() => {
                    setDownload({ size: 280, name, code: url + code });
                  }}>280px</Button>
                </div>
              ]}>
              <div style={{
                height: 220,
                position: 'relative'
              }}>

                {url ? <QRCode
                  id={code}
                  style={{
                    margin: 'auto',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
                  value={`${url}${code}`}
                  size={size}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="Q"
                  includeMargin={false}
                  renderAs={"canvas"}
                  imageSettings={{
                    src: `/logo.png`,
                    x: null,
                    y: null,
                    height: size / 6,
                    width: size / 6,
                    excavate: true,
                  }}
                /> : <ExpandOutlined style={{ fontSize: 200 }}/>}
              </div>

            </Card>
          </Col>
        )
        }
      </Row>
      {
        download && <QrCard {...download} onCancel={() => {
          setDownload(null);
        }}/>

      }

    </div>
  );
}

export default App;
