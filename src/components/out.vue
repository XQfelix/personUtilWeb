<style scoped>
p {
  display: inline;
  font-weight: 600;
}
.col-custom {
  margin-bottom: 12px;
}
.editBtn button {
  margin-left: 30px;
}
</style>
<template>
  <div>
    <Card shadow>
      <p slot="title">新增OUT源</p>
      <Row>
        <Col class="col-custom" span="12">
          <p>组件名称: &nbsp;</p>
          <Input v-model="name" placeholder="Enter something..." style="width: 300px" />
        </Col>
        <Col class="col-custom" span="12">
          <p>队列名称: &nbsp;</p>
          <Input v-model="name" placeholder="Enter something..." style="width: 300px" />
        </Col>
        <Col class="col-custom" span="12">
          <p>消费模式: &nbsp;</p>
          <Select v-model="outModel" style="width:300px">
            <Option v-for="item in outList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col class="col-custom" span="12">
          <p>路由名称: &nbsp;</p>
          <Select v-model="outModel" style="width:300px">
            <Option v-for="item in outList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </Card>
    <Card class="editBtn" dis-hover>
      <p slot="title">脚本编辑:</p>
      <MyEditor
        :language="'javascript'"
        :codes="javascriptCodes"
        @onMounted="javascriptOnMounted"
        @onCodeChange="javascriptOnCodeChange"
      />
      <Dropdown slot="extra">
        <Button size="small" type="primary">
          函数
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button @click="handleTabsAdd" size="small" slot="extra" type="primary">测试</Button>
      <Button @click="handleTabsAdd" size="small" slot="extra" type="primary">保存</Button>
      <Button @click="handleTabsAdd" size="small" slot="extra" type="primary">启动</Button>
    </Card>
  </div>
</template>
<script>
import MyEditor from "./myEditor";

export default {
  components: {
    MyEditor
  },
  data() {
    return {
      outModel: "queue",
      sslFlag: true,
      current: 0,
      name: "Test",
      javascriptCodes: "function run(){\n\n}",
      outList: [{ label: "queue", value: "queue" }]
    };
  },
  methods: {
    change(status) {
      console.log(this.javascriptCodes);
    },
    javascriptOnMounted(edit) {
      this.jsEditor = edit;
      //   console.log(edit);
    },
    javascriptOnCodeChange(value, event) {
      this.javascriptCodes = value;
      // console.log(event);
    }
  }
};
</script>
