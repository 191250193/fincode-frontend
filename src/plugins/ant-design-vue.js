import Vue from 'vue'
import {
  Tooltip,
  Button,
  Pagination,
  message,
  Layout,
  Input,
  Radio,
  Table,
  Icon,
  FormModel,
  Dropdown,
  Menu,
  Row,
  Col,
  AutoComplete,
  Select,
  Card,
  Descriptions,
  Tag,
  Spin,
  Form,
  InputNumber,
  Checkbox,
  Divider,
  Timeline,
  Statistic,
  Popover
} from 'ant-design-vue'

/**
 * 按需引入组件
 */
Vue.component(Layout.name, Layout)
Vue.component(Layout.Header.name, Layout.Header)
Vue.component(Layout.Content.name, Layout.Content)
Vue.component(Layout.Sider.name, Layout.Sider)
Vue.component(Input.name, Input)
Vue.component(Input.Search.name, Input.Search)
Vue.component(Button.name, Button)
Vue.component(Pagination.name, Pagination)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Radio.Group.name, Radio.Group)
Vue.component(Radio.Button.name, Radio.Button)
Vue.component(Table.name, Table)
Vue.component(Table.Column.name, Table.Column)
Vue.component(Icon.name, Icon)
Vue.component(Table.name, Table)
Vue.component(FormModel.name, FormModel)
Vue.component(FormModel.Item.name, FormModel.Item)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(AutoComplete.name, AutoComplete)
Vue.component(Select.name, Select)
Vue.component(Card.name, Card)
Vue.component(Descriptions.name, Descriptions)
Vue.component(Descriptions.Item.name, Descriptions.Item)
Vue.component(Tag.name, Tag)
Vue.component(Spin.name, Spin)
Vue.component(Form.name, Form)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Divider.name, Divider)
Vue.component(Timeline.name, Timeline)
Vue.component(Timeline.Item.name, Timeline.Item)
Vue.component(Statistic.name, Statistic)
Vue.component(Popover.name, Popover)
Vue.component(Tooltip.name, Tooltip)
/**
 * 引入全局方法
 */
Vue.prototype.$message = message
