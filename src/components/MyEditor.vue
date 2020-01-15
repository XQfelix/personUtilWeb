
<template>
  <div class="myEditor">
    <div id="container" ref="container" ></div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";

export default {
  props: {
    codes: {
      type: String,
      default: function() {
        return "function run(){\n\n}";
      }
    },
    language: {
      type: String,
      default: function() {
        return "javascript";
      }
    }
    // editorOptions: {
    //   type: Object,
    //   default: function() {
    //     return {
    //       selectOnLineNumbers: true,
    //       roundedSelection: false,
    //       readOnly: false, // 只读
    //       automaticLayout: true, //自动布局
    //       glyphMargin: true, //字形边缘
    //       useTabStops: false,
    //       fontSize: 28, //字体大小
    //       autoIndent: true //自动布局
    //       // quickSuggestionsDelay: 500,   //代码提示延时
    //     };
    //   }
    // }
  },
  mounted() {
    this.initEditor();
  },

  methods: {
    initEditor() {
      let self = this;
      // self.$refs.container.innerHTML = "";
      self.monacoEditor = monaco.editor.create(self.$refs.container, {
        value: self.codes,
        language: self.language,
        theme: "vs-dark"
        // editorOptions: self.editorOptions
      });
      self.$emit("onMounted", self.monacoEditor); //编辑器创建完成回调
      self.monacoEditor.onDidChangeModelContent(function(event) {
        //编辑器内容changge事件
        self.codesCopy = self.monacoEditor.getValue();
        self.$emit("onCodeChange", self.monacoEditor.getValue(), event);
      });
      //编辑器随窗口自适应
      // window.addEventListener("resize", initEditor());
    }
  }
};
</script>

<style scoped>
#container {
  height:630px; 
  width: 100%;
}
</style>