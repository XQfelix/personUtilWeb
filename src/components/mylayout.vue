<style>
body {
  height: 100%;
}
.layout {
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 200px;
  height: 30px;
  /* background: url(bgimage.gif) no-repeat fixed top; */
  border-radius: 3px;
  float: left;
  position: relative;
  top: 0px;
  left: -8px;
  font-size: 30px;
  color: #efefef;
}
.layout-nav {
  width: 50px;
  margin: 0 auto;
  margin-right: 10px;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">Utils</div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Tooltip content="退出并关闭后台进程" theme="light" placement="left-end">
                <Poptip
                  style="color: #000"
                  confirm
                  word-wrap
                  title=""
                  @on-ok="ok"
                  @on-cancel="cancel"
                >
                <Icon size="20" type="md-power" style="margin-top: 22px; color: #dcdee2" />
                </Poptip>
              </Tooltip>
            </MenuItem>
            <!-- <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>Item 2
            </MenuItem>-->
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu
            @on-select="childTag"
            theme="dark"
            width="auto"
            :open-names="['1']"
            style="height: 100%; overflow: auto"
          >
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>测试工具
              </template>
              <MenuItem name="filelist">文件列表</MenuItem>
              <MenuItem name="dblist">数据库源</MenuItem>
              <MenuItem name="dbselect">数据查询</MenuItem>
              <MenuItem name="postchild">PostChild</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>数据集成
              </template>
              <MenuItem name="httpserver">HttpServer</MenuItem>
              <MenuItem name="socketserver">SocketServer</MenuItem>
              <MenuItem name="webservice">WebService</MenuItem>
              <MenuItem name="websocketserver">WebSocketServer</MenuItem>
              <MenuItem name="javascript">JavaScript</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-briefcase" />工具集合
              </template>
              <MenuItem name="encryptutil">加密/解密</MenuItem>
              <MenuItem name="3-4">Time Util</MenuItem>
              <MenuItem name="3-5">Redis</MenuItem>
              <MenuItem name="3-6">Memecache</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="md-cog" />数据输出
              </template>
              <MenuItem name="out">新增输出</MenuItem>
              <MenuItem name="monitor">监控界面</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '8px'}">
          <Content class="tt" :style="{height: '880px'}">
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    childTag(e) {
      if (this.$route.name != e) {
        this.$Loading.start();
        this.$router.push({
          path: "/" + e
        });
        this.$Loading.finish();
      }
    },
    ok() {
      this.$Message.info("You click ok");
    },
    cancel() {
      this.$Message.info("You click cancel");
    }
  }
};
</script>
