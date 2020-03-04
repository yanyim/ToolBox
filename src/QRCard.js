import React, { Component } from 'react';
import QRCode from "qrcode.react";
import { Modal, message } from 'antd';



function _fixType(type) {
  type = type.toLowerCase().replace(/jpg/i, 'jpeg');
  var r = type.match(/png|jpeg|bmp|gif/)[0];
  return 'image/' + r;
};

function saveFile(id, filename) {
  const canvas = document.getElementById(id);
  let imgData = canvas.toDataURL('png');
  imgData = imgData.replace(_fixType('png'), 'image/octet-stream');

  const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  save_link.href = imgData;
  save_link.download = filename;

  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  save_link.dispatchEvent(event);
};


class QrCard extends Component {

  componentDidMount() {
    const { size, name, code, onCancel } = this.props;

    console.info(code)

    setTimeout(() => {
      saveFile(`${name}_${size}`, `${name}_${size}.png`);
      message.success(code);
      onCancel();
    }, 500)

  }

  render() {
    const { size, code, onCancel, top = 320, left=20, name } = this.props;
    return (
      <Modal
        title={null}
        visible
        style={{ top, left }}
        //  width =  {10}
        onCancel={onCancel}
        footer={null}
      >
        <QRCode
          id={`${name}_${size}`}
          style={{
            margin: 'auto',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex:100,
          }}
          value={code}
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
        />
      </Modal>

    );
  }
}

export default QrCard;
