<style  scoped>
p {
  display: inline;
  font-size: 1.1em;
  font-weight: 600;
}
</style>
<template>
  <div style="margin: 0 8px">
    <h1 style="padding:5px 0px;">数据查询</h1>
    <Divider />
    <div>
      <p>数据源:</p>
      <Select style="width:300px">
        <Option v-for="item in dbList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button @click="handleQuery" type="primary">执行</Button>
      <Divider />
      <Tabs type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane v-for="tab in tabs" :key="tab" :label="'新建查询' + tab">
          <Input
            v-if="tabs > 0"
            v-model="bodyValue"
            type="textarea"
            :rows="4"
            placeholder="输入要查询的sql..."
          />
        </TabPane>
        <Button @click="handleTabsAdd" size="small" slot="extra" type="primary">增加</Button>
      </Tabs>
      <Divider />
    </div>
    <Card dis-hover style="height: 500px" ></Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bodyValue: "",
      tabs: 1,
      dbList: [
        {
          value: "test",
          label: "test"
        },
        {
          value: "test1",
          label: "test1"
        },
        {
          value: "test2",
          label: "test2"
        },
        {
          value: "test3",
          label: "test3"
        }
      ]
    };
  },
  methods: {
    handleTabRemove(name) {
      this["tab" + name] = false;
      this.tabs--;
    },
    handleTabsAdd() {
      this.tabs++;
    },
    handleQuery() {
      this.$Loading.start();
    },
    
  }
};
</script>