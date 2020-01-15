<style scoped>
.ivu-card-bordered {
  margin-bottom: 16px;
}

.dblist-btn {
  margin-top: 10px;
}
</style>
<template>
  <div>
    <Row style="margin: 8px 0px" type="flex" :gutter="16">
      <Col span="6">
        <Card>
          <p slot="title">Jasypt加密</p>
          <Input v-model="value" placeholder="输入要加密的字符串..." />
          <Input
            style="margin-top: 10px"
            v-model="value"
            type="textarea"
            :rows="4"
            placeholder="加密结果..."
          />
          <div style="text-align: right" class="dblist-btn">
            <Button @click="dbmodify(index)" size="small" type="primary" style="margin-bottom: -5px">加密</Button>
            <Button @click="dbtest(index)" size="small" type="primary" style="margin-bottom: -5px">复制</Button>
          </div>
          <Input
            size="small"
            v-model="value"
            slot="extra"
            style="width: 100px"
            placeholder="公钥..."
          />
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">Jasypt解密</p>
          <Input v-model="value" placeholder="输入要解密的字符串..." />
          <Input
            style="margin-top: 10px"
            v-model="value"
            type="textarea"
            :rows="4"
            placeholder="解密结果..."
          />
          <div style="text-align: right" class="dblist-btn">
            <Button @click="dbmodify(index)" size="small" type="primary" style="margin-bottom: -5px">加密</Button>
            <Button @click="dbtest(index)" size="small" type="primary" style="margin-bottom: -5px">复制</Button>
          </div>
          <Input
            size="small"
            v-model="value"
            slot="extra"
            style="width: 100px"
            placeholder="公钥..."
          />
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">Md5计算</p>
          <Input v-model="value" placeholder="输入要计算的字符串..." />
          <Input
            style="margin-top: 10px"
            v-model="value"
            type="textarea"
            :rows="4"
            placeholder="计算结果..."
          />
          <div style="text-align: right" class="dblist-btn">
            <Button @click="dbmodify(index)" size="small" type="primary" style="margin-bottom: -5px">计算</Button>
            <Button @click="dbtest(index)" size="small" type="primary" style="margin-bottom: -5px">复制</Button>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">Base64计算</p>
          <Input v-model="value" placeholder="输入要计算的字符串..." />
          <Input
            style="margin-top: 10px"
            v-model="value"
            type="textarea"
            :rows="4"
            placeholder="计算结果..."
          />
          <div style="text-align: right" class="dblist-btn">
            <Button @click="dbmodify(index)" size="small" type="primary" style="margin-bottom: -5px">计算</Button>
            <Button @click="dbtest(index)" size="small" type="primary" style="margin-bottom: -5px">复制</Button>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">哈希/散列</p>
          <Input v-model="value" placeholder="输入要计算的字符串..." />
          <Input
            style="margin-top: 10px"
            v-model="value"
            type="textarea"
            :rows="4"
            placeholder="计算结果..."
          />
          <div style="text-align: right" class="dblist-btn">
            <Dropdown style="margin-left: 20px">
              <Button type="primary" size="small" style="margin-bottom: -5px">
                计算
                <Icon type="ios-arrow-down"></Icon>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem>驴打滚</DropdownItem>
                <DropdownItem>炸酱面</DropdownItem>
                <DropdownItem>冰糖葫芦</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button @click="dbtest(index)" size="small" type="primary" style="margin-bottom: -5px">复制</Button>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">时间戳 to 时间</p>现在:
          <p style="display: inline; color: #2d8cf0">&nbsp;{{timeStamp}}</p>
          <Input v-model="value" placeholder="输入要转换的时间戳..." />
          <Input
            style="margin-top: 10px"
            v-model="value"
            type="textarea"
            :rows="3"
            placeholder="转换结果..."
          />
          <div style="text-align: right" class="dblist-btn">
            <Button @click="dbmodify(index)" size="small" type="primary" style="margin-bottom: -5px">转换</Button>
            <Button @click="dbtest(index)" size="small" type="primary" style="margin-bottom: -5px">复制</Button>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">时间 to 时间戳</p>现在:
          <p style="display: inline; color: #2d8cf0">&nbsp;{{time}}</p>
          <Input v-model="value" placeholder="输入要转换的时间戳..." />
          <Input
            style="margin-top: 10px"
            v-model="value"
            type="textarea"
            :rows="3"
            placeholder="转换结果..."
          />
          <div style="text-align: right" class="dblist-btn">
            <Button @click="dbmodify(index)" size="small" type="primary" style="margin-bottom: -5px">转换</Button>
            <Button @click="dbtest(index)" size="small" type="primary" style="margin-bottom: -5px">复制</Button>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeStamp: new Date().getTime(),
      time: '',
      timer: "",
      dbList: [
        {
          dbtype: "MySQL",
          dburl: "127.0.0.1:3306",
          dbusername: "root",
          dbcreatetime: "2019-12-30 12:12:12"
        },
        {
          dbtype: "MySQL",
          dburl: "127.0.0.1:3306",
          dbusername: "root",
          dbcreatetime: "2019-12-30 12:12:12"
        },
        {
          dbtype: "MySQL",
          dburl: "127.0.0.1:3306",
          dbusername: "root",
          dbcreatetime: "2019-12-30 12:12:12"
        },
        {
          dbtype: "MySQL",
          dburl: "127.0.0.1:3306",
          dbusername: "root",
          dbcreatetime: "2019-12-30 12:12:12"
        },
        {
          dbtype: "MySQL",
          dburl: "127.0.0.1:3306",
          dbusername: "root",
          dbcreatetime: "2019-12-30 12:12:12"
        },
        {
          dbtype: "MySQL",
          dburl: "127.0.0.1:3306",
          dbusername: "root",
          dbcreatetime: "2019-12-30 12:12:12"
        }
      ]
    };
  },
  methods: {
    dbmodify(index) {
      alert(index);
    },
    dbtest(index) {},
    dbdelete(index) {},
    timeStampAdd() {
      var date = new Date();
      this.timeStamp = date.getTime();
      var year = date.getFullYear();
      var month = (date.getMonth() + 1) < 9 ? ('0'+(date.getMonth() + 1)) : (date.getMonth() + 1);
      var day = date.getDate() < 9 ? ('0'+date.getDate()) : date.getDate();
      var hour = date.getHours() < 9 ? ('0'+date.getHours()) : date.getHours();
      var minute = date.getMinutes() < 9 ? ('0'+date.getMinutes()) : date.getMinutes();
      var second = date.getSeconds() < 9 ? ('0'+date.getSeconds()) : date.getSeconds();
      this.time =
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
    }
  },
  mounted() {
    this.timer = setInterval(this.timeStampAdd, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>