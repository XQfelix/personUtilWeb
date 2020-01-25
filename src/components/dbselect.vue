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
      <Select v-model="selectValue" style="width:300px">
        <Option v-for="item in dbList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button @click="handleQuery" type="primary">执行</Button>
      <Divider />
      <Tabs v-model="currentTab" type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane v-for="tab in tabs" :key="tab" :label="'新建查询' + tab">
          <Input
            v-if="tabs > 0"
            v-model="bodyValue[tab]"
            type="textarea"
            :rows="4"
            placeholder="输入要查询的sql..."
          />
        </TabPane>
        <Button @click="handleTabsAdd" size="small" slot="extra" type="primary">增加</Button>
      </Tabs>
      <Divider />
    </div>
    <div dis-hover style="height: 500px; overflow-y: scroll; overflow-x:hidden">
      <Table :loading="loading" :columns="tableThead" :data="retList"></Table>
    </div>
    <!-- <Card dis-hover style="height: 500px; overflow-y: scroll; overflow-x:hidden"></Card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      retList: [],
      currentTab: 0,
      bodyValue: [""],
      selectValue: "",
      tabs: 1,
      dbList: [],
      tableThead: [],
    };
  },
  methods: {
    handleTabRemove(name) {
      this["tab" + name] = false;
      this.tabs--;
      this.bodyValue.splice(name + 1, 1);
    },
    handleTabsAdd() {
      this.tabs++;
      this.currentTab = this.tabs - 1;
    },
    handleQuery() {
      this.$Loading.start();
      this.loading = true;
      if (this.dbList.length > 0) {
        let queryObj = {};
        let currentSql = this.bodyValue[this.currentTab + 1];
        this.dbList.forEach(ele => {
          let indefied = ele.dbtype + "-" + ele.dbusername;
          if (indefied == this.selectValue) {
            queryObj = ele;
            queryObj.dbsql = currentSql;
          }
        });
        this.request
          .request("post", this.baseUrl + "/person/dblist/crud", "", queryObj)
          .then(res => {
            this.$Loading.finish();
            if (res.status != 200) {
              this.loading = false;
              this.$Message["error"]({
                background: true,
                content: res.data.message
              });
            } else {
              let singleData = res.data[0];
              let tempTableHead = [];
              for (let item in singleData) {
                let obj = new Object();
                obj.title = item;
                obj.key = item;
                tempTableHead.push(obj);
              }
              this.tableThead = tempTableHead;
              this.retList = res.data;
              this.loading = false;
              this.$Message["success"]({
                background: true,
                content: "查询完成!"
              });
            }
          });
      } else {
        this.loading = false;
        this.$Loading.error();
        this.$Message["error"]({
          background: true,
          content: "检查配置!"
        });
      }
    },
    // 获取所有数据源
    getAlldbs() {
      this.request
        .request("get", this.baseUrl + "/person/dblist/getall", "", "")
        .then(res => {
          if (res.data.length > 0) {
            let retList = [];
            res.data.forEach(ele => {
              ele.label = ele.dbtype + "-" + ele.dbusername;
              ele.value = ele.dbtype + "-" + ele.dbusername;
            });
            this.dbList = res.data;
          }
        });
    },
  },
  mounted() {
    this.getAlldbs();
  }
};
</script>