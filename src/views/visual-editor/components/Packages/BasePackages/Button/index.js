export default {
  "key": "Button",
  "name": "按钮组件",
  "props": {
    "type": {
      "label": "按钮类型",
      "default": "default",
      "type": "select",
      "enum":  {
        "default":  "默认按钮",
        "primary":  "主要按钮",
        "success":   "成功按钮",
        "warning":  "警告按钮",
        "danger":   "危险按钮",
        "info":   "信息按钮",
        "text":  "文本按钮"
      }
    },
    "size": {
      "label": "按钮尺寸",
      "default": "default",
      "type": "select",
      "enum":  {
        "default": "默认尺寸",
        "small": "小尺寸",
        "large": "大尺寸"
      }

    },
    "disabled": {
      "label": "是否禁用",
      "default": false,
      "type": "switch"
    },
    "text": {
      "label": "按钮文字",
      "default": "按钮文字",
      "type": "input"
    }

  },
  "styles": {
  }
}
