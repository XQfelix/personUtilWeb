<template>
  <div style="margin: 0 8px">
    <h1 style="padding:5px 0px;">PostChild</h1>
    <Divider />
    <div>
      <Select v-model="methodSelect" @on-change="methodChange" style="width:80px">
        <Option v-for="item in methodList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Input v-model="urlValue" style="width: 50%" />
      <Button type="primary" @click="send">Send</Button>
    </div>
    <Tabs style="margin-top:20px">
      <TabPane label="Headers">
        <Row :gutter="3" style="margin-bottom: 6px; font-weight: 700">
          <Col span="8">KEY</Col>
          <Col span="8">VALUE</Col>
          <Col span="8">DESCRIPTION</Col>
        </Row>
        <div v-for="(d,index) in inputArr" :key="index" :name="index">
          <Row :gutter="3" style="margin-bottom: 3px">
            <Col span="8">
              <AutoComplete
                v-model="d.key"
                :data="autoCample"
                :filter-method="filterMethod"
                placeholder="输入对应的参数名"
              ></AutoComplete>
            </Col>
            <Col span="8">
              <AutoComplete
                v-model="d.value"
                :data="autoCample"
                :filter-method="filterMethod"
                placeholder="输入对应的参数值"
              ></AutoComplete>
            </Col>
            <Col span="7">
              <Input v-model="d.description"  placeholder="描述"/>
            </Col>
            <Col span="1">
              <Button id="header" shape="circle" @click="remove(index)"><Icon type="md-remove" /></Button>
            </Col>
          </Row>
        </div>
        <Button size="small" id="header" @click="add" type="primary"><Icon type="md-add" /></Button>
      </TabPane>
      <TabPane label="Body">
        <RadioGroup style="margin-bottom: 5px" v-model="bodyType">
          <Tooltip content="敬请期待" placement="bottom-end">
            <Badge >
              <Radio disabled label="form-data"></Radio>
            </Badge>
          </Tooltip>
          <Tooltip content="敬请期待" placement="bottom-end">
            <Badge >
              <Radio disabled label="x-www-form-urlencoded"></Radio>
            </Badge>
          </Tooltip>
          <Tooltip content="需要使用单引号  {'hello':'world'}" placement="bottom-end">
            <Badge dot>
              <Radio label="raw"></Radio>
            </Badge>
          </Tooltip>
        </RadioGroup>
        <div v-if="bodyType != 'raw'">
          <div v-for="(d,index) in paramValueArr" :key="index" :name="index">
            <Row :gutter="3" style="margin-bottom: 3px">
              <Col span="8">
                <Input v-model="d.key" />
              </Col>
              <Col span="8">
                <Input v-model="d.value" />
              </Col>
              <Col span="8">
                <Input v-model="d.description" />
              </Col>
            </Row>
          </div>
          <Button id="param" @click="add" type="primary">Add</Button>
        </div>
        <Input v-else v-model="bodyValue" type="textarea" :rows="8" placeholder="输入要传递的参数..." />
      </TabPane>
    </Tabs>
    <Divider />
    <h3 style="padding:5px 0px;">Response</h3>
    <div style="position: relative; top: -25px; left: 110px">
      <Badge
        v-if="code.toString().substring(0,1) === '2'"
        status="success"
        :text="code.toString()"
      />
      <Badge
        v-else-if="code.toString().substring(0,1) === '4'"
        status="error"
        :text="code.toString()"
      />
      <Badge
        v-else-if="code.toString().substring(0,1) === '5'"
        status="warning"
        :text="code.toString()"
      />
      <Badge v-else status="default" />
    </div>
    <Card dis-hover style="height: 360px">{{responseData}}</Card>
  </div>
</template>
<script>
export default {
  name: "postchild",
  data() {
    return {
      inputValueArr: [],
      inputArr: [{ key: "", value: "", description: "" }],
      paramValueArr: [{ key: "大的", value: "", description: "" }],
      urlValue: "http://",
      bodyValue: "",
      responseData: "",
      code: "",
      methodSelect: "post",
      bodyType: "raw",
      autoCample: [
        "Content-Type",
        "token",
        "application/json",
        "form-data",
        "x-www-form-urlencoded"
      ],
      methodList: [
        {
          value: "get",
          label: "GET"
        },
        {
          value: "post",
          label: "POST"
        },
        {
          value: "put",
          label: "PUT"
        },
        {
          value: "head",
          label: "HEAD"
        },
        {
          value: "options",
          label: "OPTIONS"
        },
        {
          value: "delete",
          label: "DELETE"
        },
        {
          value: "patch",
          label: "PATCH"
        }
      ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "KEY",
          key: "key"
        },
        {
          title: "VALUE",
          key: "value"
        },
        {
          title: "DESCRIPTION",
          key: "description"
        }
      ]
    };
  },
  methods: {
    send() {
      let headers = {};
      if (this.inputArr.length > 0) {
        this.inputArr.forEach(function(item) {
          if (item.key != "") {
            headers[item.key] = item.value;
          }
        });
      }
      let param;
      if (this.bodyType === "raw") {
        param = this.bodyValue;
      }
      this.request
        .request(this.methodSelect, this.urlValue, headers, param)
        .then(res => {
          this.code = res.status;
          this.responseData = res.data;
        });
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    add(e) {
      if (e.currentTarget.id === "header") {
        this.inputArr.push({ key: "", value: "", description: "" });
      } else {
        this.paramValueArr.push({ key: "", value: "", description: "" });
      }
    },
    remove(e){
      this.inputArr.splice(e, 1);
    },
    methodChange(item) {
      this.methodSelect = item;
    },
    filterMethod(value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    }
  }
};
</script>

