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
      <Col v-for="(db,index) in dbList" :key="index" :name="index" :md="12" :lg="6">
        <Card>
          <p slot="title">{{db.dbtype}} - {{db.dbusername}}</p>
          <p>类型: {{db.dbtype}}</p>
          <Tooltip max-width="400" :content="db.dburl">
            <p>地址: {{db.dburl.substring(0, 15)}}...</p>
          </Tooltip>
          <p>用户名: {{db.dbusername}}</p>
          <p>创建时间: {{db.dbcreatetime}}</p>
          <div class="dblist-btn">
            <Button @click="db.flag = true" size="small" type="primary">配置</Button>
            <Button @click="dbtest(db)" size="small" type="primary">测试</Button>
            <Button @click="dbdelete(index)" size="small" type="error">删除</Button>
          </div>
        </Card>
        <Modal title="配置详情" v-model="db.flag" :mask-closable="false" @on-ok="dbupdate(db, index)">
          <div style="margin-top: 10px">
            类&nbsp;&nbsp;&nbsp; 型:
            <Select v-model="db.dbtype" size="small" style="width:436px">
              <Option
                v-for="item in typeList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div style="margin-top: 10px">
            地&nbsp;&nbsp;&nbsp; 址:
            <Input style="width: 436px;" v-model="db.dburl" size="small" />
          </div>
          <div style="margin-top: 10px">
            用户名:
            <Input style="width: 436px;" v-model="db.dbusername" size="small" />
          </div>
          <div style="margin-top: 10px">
            密&nbsp;&nbsp;&nbsp; 码:
            <Input
              v-model="db.dbpassword"
              size="small"
              type="password"
              password
              style="width: 436px;"
            />
          </div>
        </Modal>
      </Col>
      <Col :md="12" :lg="6">
        <Card style="height: 203px; text-align:center; cursor:pointer">
          <Tooltip content="单击添加数据源" placement="right-end">
            <Icon
              @click="add.flag = true"
              type="ios-add"
              size="200"
              style="margin-top: -16px; color: #eeeeee; width: 100%"
            />
          </Tooltip>
          <Modal title="配置详情" v-model="add.flag" :mask-closable="false" @on-ok="addok(add)">
            <div style="margin-top: 10px">
              类&nbsp;&nbsp;&nbsp; 型:
              <Select @on-change="typeChange" v-model="add.dbtype" size="small" style="width:436px">
                <Option
                  v-for="item in typeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin-top: 10px">
              地&nbsp;&nbsp;&nbsp; 址:
              <Input style="width: 436px;" v-model="add.dburl" size="small" />
            </div>
            <div style="margin-top: 10px">
              用户名:
              <Input style="width: 436px;" v-model="add.dbusername" size="small" />
            </div>
            <div style="margin-top: 10px">
              密&nbsp;&nbsp;&nbsp; 码:
              <Input
                v-model="add.dbpassword"
                size="small"
                type="password"
                password
                style="width: 436px;"
              />
            </div>
          </Modal>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal8: false,
      defaultType: "MYSQL",
      typeList: [
        {
          value: "MySQL",
          label: "MySQL"
        },
        {
          value: "Oracle",
          label: "Oracle"
        },
        {
          value: "SqlServer",
          label: "SqlServer"
        },
        {
          value: "PostGre",
          label: "PostGre"
        },
        {
          value: "Sybase",
          label: "Sybase"
        },
        {
          value: "MongoDB",
          label: "MongoDB"
        },
        {
          value: "Redis",
          label: "Redis"
        }
      ],
      add: {
        dbtype: "MySQL",
        dburl:
          "jdbc:mysql://0.0.0.0:3306/database?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2b8",
        dbusername: "",
        dbpassword: "",
        dbcreatetime: "2019-12-30 12:12:12",
        flag: false
      },
      dbList: [
        {
          dbtype: "MySQL",
          dburl: "127.0.0.1:330",
          dbusername: "root",
          dbpassword: "root",
          dbcreatetime: "2019-12-30 12:12:12",
          flag: false
        }
      ]
    };
  },
  methods: {
    // 新增数据源
    addok(add) {
      this.request
        .request("post", this.baseUrl + "/person/dblist/add", "", add)
        .then(res => {
          this.dbList.push(add);
          this.$Message["success"]({
            background: true,
            content: "添加成功!"
          });
        });
      this.add = {
        dbtype: "MySQL",
        dburl: "",
        dbusername: "",
        dbpassword: "",
        dbcreatetime: "2019-12-30 12:12:12",
        flag: false
      };
    },
    typeChange(value) {
      let val = value.toUpperCase();
      switch (val) {
        case "MYSQL":
          this.add.dburl =
            "jdbc:mysql://0.0.0.0:3306/database?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2b8";
          break;
        case "ORACLE":
          this.add.dburl = "jdbc:oracle:thin:@host:port:SID";
          break;
        case "SQLSERVER":
          this.add.dburl =
            "jdbc:jtds:sqlserver://0.0.0.0:1433;DatabaseName=database";
          break;
        case "POSTGRE":
          this.add.dburl = "jdbc:postgresql://0.0.0.0:5432/database";
          break;
        case "SYBASE":
          this.add.dburl = "jdbc:jtds:sybase://0.0.0.0:5001/database";
          break;
        case "REDIS":
          this.add.dburl = "ip:port";
          break;
        case "MONGODB":
          this.add.dburl = "ip:port";
          break;
        default:
          break;
      }
    },
    dbtest(db) {
      this.$Loading.start();
      if (this.dbList.length > 0) {
        this.request
          .request(
            "post",
            this.baseUrl + "/person/dblist/connect",
            "",
            db
          )
          .then(res => {
            this.$Loading.finish();
            if (res.status != 200) {
              this.$Message["error"]({
                background: true,
                content: res.data.message
              });
            } else {
              this.$Message["success"]({
                background: true,
                content: "连接成功!"
              });
            }
          });
      } else {
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
            this.dbList = res.data;
          }
        });
    },
    // 删除某个数据源
    dbdelete(index) {
      this.request
        .request(
          "get",
          this.baseUrl + "/person/dblist/delete?dbindex=" + index,
          "",
          ""
        )
        .then(res => {
          this.dbList.splice(index, 1);
          this.$Message["success"]({
            background: true,
            content: "删除成功!"
          });
        });
    },
    // 更新单个数据源
    dbupdate(db, index) {
      this.request
        .request(
          "post",
          this.baseUrl + "/person/dblist/update/" + index,
          "",
          db
        )
        .then(res => {
          this.dbList[index] = db;
          this.$Message["success"]({
            background: true,
            content: "更新成功!"
          });
        });
    }
  },
  mounted() {
    this.getAlldbs();
  }
};
</script>