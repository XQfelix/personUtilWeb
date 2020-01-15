<template>
  <div>
    <Row :gutter="16">
      <Col span="8">
        <Card>
          <p slot="title">资源监控</p>
          <ve-pie height="300px" width="500px" :data="pieData" :settings="pieSettings"></ve-pie>
        </Card>
      </Col>
      <Col span="8">
        <Card>
          <p slot="title">模块统计</p>
          <ve-histogram :settings="histogramSetting" :colors="colorhistogra" height="300px" width="500px" :data="histogramData" :legend-visible="false"></ve-histogram>
        </Card>
      </Col>
      <Col span="8">
        <Card>
          <p slot="title">接入速率</p>
          <ve-line height="300px" :judge-width="true" :settings="lineSettings" :data="lineData" :legend-visible="false"></ve-line>
              <p style="color:#19D4AE;" slot="extra">总计: {{inSumStr}}</p>
        </Card>
      </Col>
    </Row>
    <Card style="margin-top: 16px">
      <p slot="title">接入监控</p>
      <Collapse accordion>
        <Panel v-for="singleRun in runList" :name="singleRun.id" :key="singleRun.id">
          <div style="font-weight: 600; display: inline;">接入组件: &nbsp;&nbsp;</div>{{singleRun.id}}
          <Badge style="float: right; margin-right: 30px" status="success" text="Health" />
          <div style="color:#19D4AE; display: inline; float: right;margin-right: 70px">最新心跳:  {{heart}}</div>
          
          <div slot="content">
            <div style="color:#19D4AE; display: inline; font-weight: 600">最新心跳:  2020-10-20 12:12:21</div>
            <div style="display: inline; float: right; margin-right: 6px">
              <Button @click="handleTabsAdd" size="small" type="primary" ghost>停止</Button>
              <Button @click="handleTabsAdd" size="small" type="primary" ghost>启动</Button>
              <Button @click="handleTabsAdd" size="small" type="primary" ghost>编辑</Button>
            </div>
          </div>
        </Panel>
      </Collapse>
    </Card>

    <Divider />
    <Row :gutter="16">
      <Col span="8">
        <Card>
          <p slot="title">消费统计</p>
          <ve-pie height="300px" width="500px" :data="pieData" :settings="pieSettings"></ve-pie>
        </Card>
      </Col>
      <Col span="16">
        <Card>
          <p slot="title">消费速率</p>
          <ve-line :settings="lineSettings" :colors="colorLine" height="300px" :judge-width="true" :data="lineData" :legend-visible="false"></ve-line>
        </Card>
      </Col>
    </Row>

    <Card style="margin-top: 16px">
      <p slot="title">消费监控</p>
      <Collapse accordion>
        <Panel v-for="singleRun in runList" :name="singleRun.id" :key="singleRun.id">
           <div style="font-weight: 600; display: inline;">消费组件: &nbsp;&nbsp;</div>{{singleRun.id}}
          <Badge style="float: right; margin-right: 6px" status="success" text="Health" />
           <div style="color:#19D4AE; display: inline; float: right;margin-right: 70px">最新心跳:  {{heart}}</div>
          <div slot="content">
           asdf
            <div style="display: inline; float: right; margin-right: 6px">
              <Button @click="handleTabsAdd" size="small" type="primary" ghost>日志</Button>
              <Button @click="handleTabsAdd" size="small" type="primary" ghost>停止</Button>
              <Button @click="handleTabsAdd" size="small" type="primary" ghost>启动</Button>
              <Button @click="handleTabsAdd" size="small" type="primary" ghost>编辑</Button>
            </div>
          </div>
        </Panel>
      </Collapse>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      heart: "",
      colorLine: ["#FFB980"],
      colorhistogra: ["#5AB1EF"],
      timer: "",
      inSum: 0,
      inSumStr: "",
      runList: [
        { id: "1" },
        { id: "123" },
        { id: "12" },
        { id: "234" },
        { id: "124" },
        { id: "34" }
      ],
      histogramData: {
        columns: ["类别", "数量"],
        rows: [
          { 类别: "http", 数量: 5 },
          { 类别: "socket", 数量: 1 },
          { 类别: "javascript", 数量: 2 },
          { 类别: "webservice", 数量: 3 },
          { 类别: "websocket", 数量: 1 }
        ]
      },
      pieSettings: {
        roseType: "radius"
      },
      lineSettings: {
        labelMap: {
          'inrate': '当前速率',
          'Order': '下单用户'
        },
        area: true
      },
      histogramSetting:{
        label: { show: true, position: "top" },
      },
      lineData: {
        xAxisType: "time",
        columns: ["time", "inrate"],
        rows: [
          { time: "", inrate: 0, outrate: 0 },
          // { time: "09:00", inrate: 3530, outrate: 3230 },
          // { time: "11:00", inrate: 2923, outrate: 2623 },
          // { time: "12:00", inrate: 1723, outrate: 1423 },
          // { time: "13:00", inrate: 3792, outrate: 3492 },
          // { time: "15:00", inrate: 4593, outrate: 4293 },
          // { time: "16:00", inrate: 1393, outrate: 1093 },
          // { time: "17:00", inrate: 3530, outrate: 3230 },
          // { time: "18:00", inrate: 2923, outrate: 2623 },
          // { time: "19:00", inrate: 1723, outrate: 1423 },
          // { time: "20:00", inrate: 3792, outrate: 3492 },
          // { time: "21:00", inrate: 4593, outrate: 4293 }
        ]
      },
      pieData: {
        columns: ["类别", "数量"],
        rows: [
          { 类别: "硬盘占用", 数量: 1 },
          { 类别: "CPU占用", 数量: 2 },
          { 类别: "内存占用", 数量: 5 }
        ]
      }
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
      this.$Loading.config({
        height: 3
      });
      this.$Loading.start();
    },
    test() {
      var date = new Date();
      var year = date.getFullYear();
      var month = (date.getMonth() + 1) < 9 ? ('0'+(date.getMonth() + 1)) : (date.getMonth() + 1);
      var day = date.getDate() < 9 ? ('0'+date.getDate()) : date.getDate();
      var hour = date.getHours() < 9 ? ('0'+date.getHours()) : date.getHours();
      var minute = date.getMinutes() < 9 ? ('0'+date.getMinutes()) : date.getMinutes();
      var second = date.getSeconds() < 9 ? ('0'+date.getSeconds()) : date.getSeconds();
      let time = hour + ":" + minute + ":" + second;
      this.heart =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      let inrate = Math.random()*1000;
      let outrate = Math.random()*1000;
      let aa = {"time": time, "inrate":inrate, "outrate": outrate};
      if(this.lineData.rows.length>20){
        this.lineData.rows.splice(0, 1);
      }

      this.inSum += Math.round(inrate);
      if(this.inSum<1000){
        this.inSumStr = this.inSum;
      }else if(this.inSum>1000 && this.inSum<100000){
        this.inSumStr = (this.inSum / 1000).toFixed(2) + "K";
      }else if(this.inSum>=100000 && this.inSum<10000000){
        this.inSumStr = (this.inSum / 100000).toFixed(2) + "M";
      }else if(this.inSum>10000000){
        this.inSumStr = (this.inSum / 10000000).toFixed(2) + "B";
      }
      this.lineData.rows.push(aa);
    }
  },
  
  mounted() {
   this.timer = setInterval(this.test, 3000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
