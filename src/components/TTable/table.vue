<template>
	<div >
    <Row class="" justify="space-around" v-if="showForm">
      <Col>
      <!-- display:inline-block; -->
      <div style="display:inline-block;width:80%">
          <Form label-position="right" :label-width="dataOpton.Number" v-show="searchData.length > 0 || btnGroup.length > 0" @submit.native.prevent >
              <div class="psearchCon">
                <div  v-for="(item,index) in searchData"  :key="'form'+index" >
                  <FormItem :label="(item.seala ? (item.seala == '空' ? '' : item.seala) : item.title+':')" v-if="item.type == '' || item.type == 'number'" class="searchItem">
                    <Input v-model="item.value"  :style="{width: item.seaW ? item.seaW+'px' : '190px'}" :placeholder="item.pla"> </Input>
                  </FormItem>
                  <FormItem :label="(item.seala ? (item.seala == '空' ? '' : item.seala) : item.title+':')" v-else-if="item.type == 'time'"  class="searchItem">
                    <Date-picker type="daterange" v-model="item.value" :style="{width: item.seaW ? item.seaW+'px' : '190px'}" :placeholder="item.pla ||'选择日期'"  placement="bottom-end"  ></Date-picker>
                  </FormItem>
                    
                  <FormItem :label="(item.seala ? (item.seala == '空' ? '' : item.seala) : item.title+':')" v-else-if="item.type == 'select'  || item.type == 'switch'" class="searchItem" >
                      <i-select v-model="item.value" :style="{width: item.seaW ? item.seaW+'px' : '190px'}" filterable>
                          <i-option v-for="(i,index) in item.selectOPtion" :key="'select'+index" :value="i.value">{{i.label}}</i-option>
                      </i-select>
                  </FormItem>
                </div>
                  <FormItem   class="" >
                      <Button type="primary" style="width: 90px;" @click="searchCode"  v-if="searchData.length > 0" >搜索</Button>
                  </FormItem>
                   <FormItem   v-if="dataOpton.autoCol">
                     <Button type="primary" icon="navicon-round"   style="" @click="showList">自定义隐藏列</Button>
                    </FormItem>
                    <FormItem   class=""  v-for="(item, index) in btnGroup"  :key="index">
                      <i-button  :type="item.bgcolor" @click.stop="activeAction(item.type,index,item.url,item.actionName)" :icon="item.icon " :key="'btn'+index" ref="info" key=index  style="margin-right: 3px;"><a :id="item.type" style="width:0px;height:0px;"></a>{{item.title}}</i-button>
                    </FormItem>
              </div>
          </Form>
        </div>
        <!-- <template>
          <div class="btnGroup" style="display:inline-block;">
            
            <i-button v-for="(item, index) in btnGroup"   :type="item.bgcolor" @click.stop="activeAction(item.type,index,item.url,item.actionName)" :icon="item.icon " :key="index" ref="info" key=index  style="margin-right: 3px;margin-top:40px;"><a :id="item.type" style="width:0px;height:0px;"></a>{{item.title}}</i-button>
          </div>
        </template> -->
        
        <Modal  v-model="list" title="自定义隐藏列" @on-ok="changeTableColumns">
          <Checkbox-group v-model="tableColumnsChecked" v-if="showForm">
            <Checkbox  v-for="(item,index) of checkboxGroup" :label="item.label" :key="index">{{item.title}}</Checkbox>
          </Checkbox-group>
        </Modal>
        <div style="margin:15px 10px" id="tableCon">
          <Table  size="small" :height="tableHeight" :data="this.tableData2" stripe :columns="columns" @sortMethod="sortMethod" @on-sort-change="changeSort"  @on-selection-change="getSelect" ref="goodsTable" border></Table>
          <div style="margin: 10px;overflow: hidden" v-if="!dataOpton.hiddenPage">
            <div style="float: right;">
              <Page :total="parseInt(getList.count)" placement="top" :page-size-opts="getList.page_size_opts" :current="getList.page" show-elevator :pageSize="getList.pageSize" show-sizer show-total @on-page-size-change="changeSize"  @on-change="changePage"></Page>
            </div>
          </div>
        </div>
        <Modal v-model="searchList" title="搜索" width="70%" @on-ok="searchCode"  @on-cancel="cancelMOdal">
            <Form label-position="right" :label-width="80" >
              <div class="searchCon">
                <div  v-for="(item,index) in searchData"  :key="index" >
                  <FormItem :label="item.title+':'" v-if="item.type == '' || item.type == 'number'" class="searchItem">
                    <Input v-model="item.value" style="width: 190px">
                        <Select v-model="item.range" slot="prepend" style="width: 70px" v-if="item.type =='number' " >
                            <Option value=">">大于</Option>
                            <Option value="=">等于</Option>
                            <Option value="<">小于</Option>
                        </Select>
                        <span slot="prepend" v-else>等于</span>
                    </Input>
                  </FormItem>
                  <FormItem :label="item.title+':'" v-else-if="item.type == 'time'"  class="searchItem">
                  <Date-picker type="daterange" v-model="item.value" style="width: 190px;"  placement="bottom-end" placeholder="选择日期" ></Date-picker>
                  </FormItem>
                    
                  <FormItem :label="item.title+':'" v-else-if="item.type == 'select'  || item.type == 'switch'" class="searchItem" >
                      <i-select v-model="item.value" style="width: 190px" filterable>
                          <i-option v-for="(i,index) in item.selectOPtion" :key="index" :value="i.value">{{i.label}}</i-option>
                      </i-select>
                  </FormItem>
                </div>
              </div>
          </Form>
        </Modal>
        
         <Modal v-model="showImport"  title="导入" width="400px" @on-ok="doImport"  @on-cancel="cancelMOdal" >
           <uploadFile></uploadFile>
         </Modal>

         <Modal
            v-model="showDel"
            @on-ok="handDel"
            @on-cancel="cancel"
            :styles="{top: top+'px'}"
            >
            <p>请确定是否删除</p>
        </Modal>

        <customAdd v-if="showAddEditModal" ref="customAdd"  :params="params" @changeModal="changeModal"  @add_edit_suc="add_edit_suc"></customAdd>
      </Col>
    </Row>
	</div>
</template>
<script>
import ykp from "../assets/js/ykp";
import util from "../assets/js/util";
import hm from "../assets/js/hm";
import customAdd from "./custom_add";
import uploadFile from "./upload/upload";
import table2excel from "@/assets/js/table2excel";
import otherurl from "@/api/otherurl.js";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      list: false, //模态框显示隐藏
      tableData2: [], //存放table表格的数据
      tableColumns2: [],
      tableColumnsChecked: [],
      ColumnList: [], //对比数据  方便对数据排序显示
      btnGroup: [], //顶部按钮存放地址
      selectArr: [], //列表选中的item
      searchList: false, //搜索model展示隐藏
      tableHeight: "", //存放table的高度
      optionData: {
        columns: []
      },
      searchData: [], //搜索存放地址
      checkboxGroup: [], //自定义列表存放地址
      columns: [],
      getList: {   //pafe参数
        pageSize:10,
        limit: 10,
        page: 1,
        filter: "",
        order: "",
        count: 0,
        page_size_opts:[10,20,50,100]
      },
      showForm: false,
      roleArr: [],
      showImport: false,
      showAddEditModal: false,
      promises: [],
      filter:{},  //普通搜索 条件
      defaultFilter:{}, //默认搜索条件，
      showDel:false,  //显示删除modal
      removeInfo:{},
      top:0
    };
  },

  props: {
    //列表的参数
    dataOpton: {
      type: Object,
      default: function() {
        return {
          url: "",
          columns: [],
          toolEvent: [],
          topBtnGroup: [],
          autoCol: true,
          primary: "",
          tab: false
        };
      }
    },
    //添加编辑的参数
    params: {
      default: function() {
        return {
          formList: [],
          infoUrl: ""
        };
      }
    }
  },
  components: {
    customAdd,
    uploadFile
  },
  computed: {
    ...mapState(["orderList"])
  },
  methods: {
    ...mapMutations([]),
    cancel(){
      this.showDel = false;
    },
    showList() {
      this.list = !this.list;
    },

    //添加成功  刷新列表
    add_edit_suc(state) {
      this.reload();
      this.showAddEditModal = state;
    },

    changeModal(state) {
      this.showAddEditModal = state;
    },

    add_edit(type, id) {
      if (type == 1) {
        this.showAddEditModal = true;
        this.params.showModel = true;
        this.params.id = "";
        this.params.title = "添加";
      } else if (type == 2) {
        this.showAddEditModal = true;
        this.params.showModel = true;
        this.params.id = id;
        this.params.title = "编辑";
      }
    },

    //渲染顶部按钮
    topBtnGroup(topBtnGroup) {
      for (var i in topBtnGroup) {
        this.btnGroup.push({
          title: topBtnGroup[i].name,
          bgcolor: topBtnGroup[i].bgcolor || "success",
          type: topBtnGroup[i].type,
          url: topBtnGroup[i].url,
          icon: topBtnGroup[i].icon || "",
          actionName: topBtnGroup[i].actionName || ""
        });
      }
      if(this.dataOpton.reload){
        this.btnGroup.push({
          title: "刷新",
          bgcolor: "success",
          type: "reload",
          url: this.optionData.url,
          icon: "loop"
          
        });
      }
      
    },

    //顶部点击事件
    activeAction(type, index, url, actionName) {
      switch (type) {
        case "add":
          this.$emit("add");
          this.$router.push(url);
          break;
        case "plDel":
          this.plDel(url);
          break;
        case "export":
          this.export(url, this.btnGroup[index].exportName || "商品列表");
          break;
        case "import":
          this.import(url);
          break;
        case "search":
          this.search(url);
          break;
        case "reload":
          this.reload(url);
          break;
        case "other":
          this.add_edit(1); //1 为添加   2为编辑
          break;
        case "import":
          this.import(); //1 为添加   2为编辑
          break;
        default:
          //自定义事件  传给父组件
          this.$emit(actionName);
          break;
      }
    },

    plDel(url) {
      if (this.selectArr.length == 0) {
        this.$Message.error("请选择后再操作");
        return false;
      }
      this.$emit("deleteList", this.selectArr);
      let id = [];
      this.selectArr.forEach((item, index, key) => {
        id.push(item[this.dataOpton.primary]);
      });
      let ids = "";
      ids = this.dataOpton.primary + " in(" + id.join(",") + ")";
      this.delGroup(ids, url);
      this.selectArr = []; //防止重复删除
    },
    import() {
      // console.log("导入");
    },
    export(url, name) {
      // table2excel.transform(this.$refs.goodsTable, 'export', '测试');
      this.$refs.goodsTable.exportCsv({
        filename: name,
        columns: this.columns.filter(
          (col, index) => index < this.columns.length - 1 && index > 0
        ),
        data: this.tableData2.filter((data, index) => index < 9 && index > 0)
      });
      this.$Message.success("导出成功");
    },
    //搜索
    search() {
      this.searchList = !this.searchList;
    },
    /**
     * 页面重载
     */
    reload(url) {
      //this.dataOpton.getList.filter
      this.getList = {
        limit: 10,
        page: 1,
        filter: JSON.parse(JSON.stringify(this.defaultFilter)),
        order: "",
        count: 0
      };
      this.dataOpton.columns.forEach(item => {
        if (item.sortable) {
          item.sortable = "0";
        }
      });

      this.dataOpton.columns.forEach(item => {
        if (item.sortable == "0") {
          item.sortable = true;
        }
      });

      // this.columns;

      this.getInitData(this.optionData.url, this.columns);
    },

    /**导入start */
    import() {
      this.showImport = !this.showImport;
    },
    doImport() {},

    /**导入end */

    //获取搜索条件
    searchCode() {
      let searchDateArr = {};
      let filter = {}; //[]
      let num = 0;
      this.searchData.forEach((item, index, key) => {
        /**
         * 分为   time  select  number 普通输入框
         */
        // if (item.search && item.value != "") {
        //   if (item.type == "time") {
        //     if (item.value[0] || item.value[1]) {
        //       filter.push(item.search + " = " + item.value);
        //     }
        //   } else if (item.type == "select") {
        //     filter.push(item.search + " = " + item.value);
        //   } else if (item.type == "number") {
        //     if (item.range == "") {
        //       filter.push(item.search + " like '%" + item.value + "%'");
        //     } else {
        //       filter.push(item.search + item.range + item.value);
        //     }
        //   } else {
        //     filter.push(item.search + " like '%" + item.value + "%'");
        //   }
        //   num += 1;
        // }
        if (item.search && item.value != "") {
          if(item.type == "time"){
             filter[item.search] =util.time.getTime(item.value[0],true)+","+util.time.getTime(item.value[1],true)
          }else{
            filter[item.search] = item.value;
          }
          
          num += 1;
        }
      });
      this.$emit("getSearch", this.searchData);
      if (num == 0) {
        filter = {};
        this.getList.filter = JSON.parse(JSON.stringify(this.defaultFilter));
        this.reload();
        // this.$Message.error("最少输入一个条件");
        return false;
      } else {
        //初始化搜索数据  value为空
        // this.clearSearchValue();
        let _filter = Object.assign(this.getList.filter,filter);   //合并
        this.getList.filter = _filter;
        this.getList.page = 1;
        // console.log( this.dataOpton)
        this.getInitData(this.optionData.url, this.dataOpton.columns);
        filter = {};
        
      }
      // filter =
      //   filter.join(" and ") +
      //   (this.dataOpton.getList.filter
      //     ? " and " + this.dataOpton.getList.filter
      //     : "");
      
      
    },

    cancelMOdal() {
      this.clearSearchValue();
    },

    clearSearchValue() {
      this.searchData.forEach((item, index) => {
        item.value = "";
        item.range = "";
      });
    },

    getSelect(data) {
      this.selectArr = data;
    },

    changePage(page) {
      //分页切换
      this.getList.page = page;
      this.getInitData(this.optionData.url, this.dataOpton.columns);
    },

    changeSort(col, key, order) {
      this.getList.order =
        col.key + " " + (col.order == "normal" ? "asc" : col.order);
      this.getInitData(this.optionData.url, this.dataOpton.columns);
    },

    sortMethod(a, b, type) {
      // console.log(a, b, type);
    },

    changeSize(pageSize) {
      //每页大小
      this.getList.limit = pageSize;
      this.getInitData(this.optionData.url, this.dataOpton.columns);
    },

    //改变选项卡的选中数量  从而改变隐藏显示列
    changeTableColumns() {
      let col = [];
      this.optionData.columns.forEach((item, index) => {
        if (item.key == "action" || item["type"] == "selection") {
          col.push(item);
        }
        for (let i in this.tableColumnsChecked) {
          if (item["key"] != "action" && item["type"] != "selection") {
            if (this.tableColumnsChecked[i] == item["key"]) {
              col.push(item);
            }
          }
        }
      });
      this.columns = col;
    },

    //编辑
    edit(index, url) {
      // console.log(this.tableData2[index]);
      this.$router.push({
        path: url,
        query: { id: this.tableData2[index][this.dataOpton.primary] }
      });
    },

    info(index, url) {
      let msg = "查看详情";
      this.$router.push({
        path: url,
        query: { id: this.tableData2[index][this.dataOpton.primary] }
      });
      // this.$Message.success(msg);
    },

    //删除
    remove(index, url,otherParam) {
      let id =  this.tableData2[index][this.dataOpton.primary];
        // this.dataOpton.primary +
        // "=" +
      let _otherPar = {};

      if(otherParam){
          for(var key in otherParam){
            _otherPar[key] = this.tableData2[index][key]
          }
      }
      otherParam ? this.delGroup(id, url,_otherPar) : this.delGroup(id, url);
      
    },

    getHeight() {
      var height = document.querySelector(".layout-content").offsetHeight;
      if (this.dataOpton.tab && this.dataOpton.reload && this.dataOpton.autoCol) {
        this.tableHeight = height - 240;
      }else if(this.dataOpton.tab && !this.dataOpton.reload && !this.dataOpton.autoCol){
        this.tableHeight = height - 190;
      } else {
        this.tableHeight = height - 170;
      }
    },

    //批量删除  或删除单个
    delGroup(params, url, otherParam) {
      const delGroup = []; //删除组的id集合
      let delDate = { id: params };
      delDate = otherParam ?  Object.assign(delDate,otherParam) : delDate;   //如果出现额外的参数时，   合并参数
     this.$ajaxPost(url, delDate).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
          this.$emit("delItem",res)
          this.getInitData(this.optionData.url, this.dataOpton.columns);
        } else {
          this.$Message.error("删除失败");
        }
      });
      // commit(type.DEL_GROUP);
    },
    /**
     * 还原
     */
    goBack(index, url) {
      this.$ajaxPost(url, {
        id: this.tableData2[index][this.dataOpton.primary]
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
        } else {
          this.$Message.error("删除失败");
        }
      });
    },

    /**
     * 初始化table列表
     *
     */
    handDel(){
      this.remove(this.removeInfo.index, this.removeInfo.url,this.removeInfo.otherParam);
    },
    initTable() {
      //初始化查询条件
      this.getList = {
        limit: this.dataOpton.getList.limit || 10,
        page: this.dataOpton.getList.page || 1,
        filter: this.dataOpton.getList.filter || "",
        order: this.dataOpton.getList.order || "",
        count: this.dataOpton.getList.count || 0
      };
      this.defaultFilter = JSON.parse(JSON.stringify(this.dataOpton.getList.filter))
      let cols = this.dataOpton.columns;
      this.getSearchList(cols); //遍历  搜索节点
      var renderArr = [];
      this.dataOpton.columns.forEach(item => {
        //默认超出隐藏
        item.ellipsis = item.ellipsis || true;
        if (item.key == "action") {
          //根据   操作按钮的数据 定宽
          item.width = this.dataOpton.toolEvent.length * 40 + 65;
          item.render = (h, params) => {
            renderArr = [];
            if (this.dataOpton.toolEvent) {
              this.dataOpton.toolEvent.forEach((item, index) => {
                if (item.type == "info") {
                  renderArr.push(
                    h(
                      "Button",
                      {
                        props: {
                          type: "success",
                          size: "small"
                        },
                        style: {
                          marginRight: "5px"
                        },
                        on: {
                          click: () => {
                            this.$emit(
                              "info",
                              params['row'][this.dataOpton.primary]
                            );
                            this.info(params.index, item.url);
                          }
                        }
                      },
                      item.title
                    )
                  );
                } else if (item.type == "edit") {
                  renderArr.push(
                    h(
                      "Button",
                      {
                        props: {
                          type:item.handStatus ?  hm.getHandType(params.row[item.handStatus.obj],item.handStatus.type) :  "primary",
                          size: "small"
                        },
                        style: {
                          marginRight: "5px"
                        },
                        on: {
                          click: () => {
                            //当编辑需要在当前页面处理时，返回事件
                            if (item.actionName && !item.handStatus) {
                              this.$emit(
                                item.actionName,
                                params["row"]
                              );
                            } else if (item.custom) {
                              this.add_edit(2,params["row"][this.dataOpton.primary]); //2为添加
                            } else if(item.handStatus){
                              this.$emit(item.actionName ? item.actionName : "edit", this.tableData2[params.index]);
                            } else {
                              this.edit(params.index, item.url);
                            }
                          }
                        }
                      },
                      item.handStatus ?  hm.getHandTitle(params.row[item.handStatus.obj],item.handStatus.title) : item.title
                    )
                  );
                } else if (item.type == "sp") {
                  renderArr.push(
                    h(
                      "Button",
                      {
                        props: {
                          type: "warning",
                          size: "small"
                        },
                        style: {
                          marginRight: "5px"
                        },
                        on: {
                          click: () => {
                            this.sp(params.index, item.url);
                          }
                        }
                      },
                      item.title
                    )
                  );
                } else if (item.type == "del") {
                  renderArr.push(
                    h(
                      "Button",
                      {
                        props: {
                          type: "primary",
                          size: "small"
                        },
                        style: {
                          marginRight: "5px"
                        },
                        on: {
                          click: () => {
                            this.removeInfo = {
                                index:params.index,
                                url: item.url,
                                otherParam:item.otherParam
                            }
                            if(item.msg){
                              this.showDel = true;
                            }else if(item.actionName){
                              this.$emit(item.actionName);
                            }else{
                              this.showDel = true;
                            }
                          }
                        }
                      },
                      item.title
                    )
                  );
                } else if (item.type == "href") {
                  renderArr.push(
                    h(
                      "a",
                      {
                        props: {
                          type: "button",
                          size: "small"
                        },
                        attrs:{
                          href:otherurl.infourl+"/home/advinfo?data=0,"+params.row.id+',other',
                          target:"_blank"
                        },
                        style: {
                          marginRight: "5px",
                          color:"#fff !important"
                        },
                        class:"ivu-btn ivu-btn-primary ivu-btn-small",
                        on: {
                          // click: () => {
                          //   this.goBack(params.index, item.url);
                          // }
                        }
                      },
                      item.title
                    )
                  );
                }
              });
            }
            return h("div", renderArr);
          };
        } else if (item.render == "img") {
          //添加属性
          item.className = "pos";
          let renderArr;
          item.render = (h, params) => {
            renderArr = [];
            renderArr.push(
              h("img", {
                attrs: {
                  src: params.row[params.column.key].split(",")[0],
                  alt: params.row[params.column.key],
                  class: "img"
                },
                style: {
                  width: "50px",
                  height: "40px"
                }
              })
            );
            if(params.row[params.column.key]){
              renderArr.push(
                h("img", {
                  attrs: {
                    src: params.row[params.column.key].split(",")[0],
                    alt: params.row[params.column.key],
                    class: "hideImg"
                  }
                })
              );
            }
            
            return h("div", renderArr);
          };
        } else if (item.render == "select") {
          //select  操作流程 执行 切换
          var url = item.url;
          item.render = (h, params) => {
            return h("div", [
              h(
                "i-select",
                {
                  props: {
                    value: params.row[params.column.key],
                    "label-in-value": true
                  },
                  on: {
                    "on-change": (val, url) => {
                      this.changeselectOPtion(val, url);
                    }
                  }
                },
                item.enum.map(option => {
                  let a = h("i-option", {
                    props: {
                      value: option.val,
                      label: option.name
                    }
                  });
                  return a;
                })
              )
            ]);
          };
        } else if (item.selectOPtion || item.colKey) {
          //当数据为枚举型的数据时
          let renderArr;
          item.render = (h, params) => {
            renderArr = [];
            let field = "";
            for (var i in item.selectOPtion) {
              if (params.row[params.column.key] == item.selectOPtion[i].value) {
                params.row[params.column.key] = item.selectOPtion[i].label;
              }
            }
            renderArr.push(
              h(
                "span",
                {
                  style: {
                    width: "50px",
                    height: "40px"
                  }
                },
                params.row[params.column.key]
              )
            );
            return h("div", renderArr);
          };
        } else if (item.render == "switch") {
          //switch  操作流程 执行 切换
          item.render = (h, params) => {
            return h("div", [
              h(
                "i-switch",
                {
                  props: {
                    value: params.row[params.column.key] == 1 ? true : false
                  },
                  on: {
                    "on-change": val => {
                      this.changeSwitch({
                        val: val ? 1 : 0,
                        url: params.column.url
                      });
                    }
                  }
                },
                params.row[params.column.key]
              )
            ]);
          };
        } else if(item.type == "splicing"){
          //当数据为两个字段拼接起来时
          let renderArr;
          item.render = (h, params) => {
            renderArr = [];
            let field = "";
            renderArr.push(
              h(
                "span",
                {
                  style: {
                    width: "50px",
                    height: "40px"
                  }
                },
                params.row[params.column.key]
              )
            );
            return h("div", renderArr);
          };
        } else if (item.type == "time") {
          //当为时间时  把时间戳转化成日期时间
          item.render = (h, params) => {
            return h("div", [
              h(
                "span",
                {},
                item.s
                  ? util.time.getNowTime(params.row[params.column.key], true)
                  : util.time.getNowTime(params.row[params.column.key])
              )
            ]);
          };
        }else if(item.type == "editting"){
          //当为时间时  把时间戳转化成日期时间
          item.render = (h, params) => {
            if(!params.editStatus){
              return h("div", [h(
                  "span",
                  {
                    style: {
                      width: "146px",
                      display:'inline-block',
                      overflow: 'hidden',
                      'text-overflow': 'ellipsis',
                      'padding-top':'9px'
                    },
                    attrs:{
                      title:params.row[params.column.key]
                    }
                  },
                  params.row[params.column.key]
                ), h(
                    "Button",
                    {
                      props: {
                          type: 'text',
                          icon: 'edit'
                      },
                      on: {
                        "click": val => {
                          this.$emit("changeName",params);
                        }
                      }
                    },
                  )]);
            }else{
                return h("div", [
                  h(
                    "i-input",
                    {
                      props: {
                        value: params.row[params.column.key]
                      },
                      style:{
                        width:"150px"
                      },
                      on: {
                        "on-change": val => {
                          
                        }
                      }
                    },
                  ),
                  h(
                    "Button",
                    {
                      props: {
                          type: 'text',
                          icon: 'checkmark'
                      },
                      on: {
                        "click": val => {

                        }
                      }
                    },
                  )
                ]);
            }
            
          };
        }
      });

      var topBtn = this.dataOpton.topBtnGroup;
      /**
       * 去除默认隐藏的列
       */
      this.columns = this.dataOpton.columns.filter(item => {
        return !item.hidden;
      });
      this.optionData.columns = this.columns;
      this.getInitData(this.optionData.url,  this.optionData.columns); //初始化列表数据
      this.topBtnGroup(topBtn); //获取展示顶部按钮
      this.ptSearch();  //初始化普通搜索
    },
    ptSearch(){

    },

    //遍历搜索list
    getSearchList(cols) {
      let item = {};
      let resourse = {};
      let option1 = [];
      this.dataOpton.columns.forEach((item, index) => {
        if (item.type == "select" && item.url) {
          if (item.selectOPtion) {
            //option:{0:"测试",1:"测试1"}   转化成  [{value:0,label:'测试'},{value:1,label:'测试1'}]
            item.option1 = [];
            for (var i in item.selectOPtion) {
              item.option1.push({
                value: i,
                label: item.selectOPtion[i]
              });
            }
            item.selectOPtion = item.option1;
            delete item.option1;
          } else if (item.url) {
            //当下拉框数据通过异步获取时
            this.promises.push(
              this.$ajaxPost(item.url, {
                select:
                  item.colKey +
                  " as " +
                  item.colKey +
                  "," +
                  item.colName +
                  " as " +
                  item.colName,
                limit: item.limit || 999,
                filter: item.filter || ""
              }).then(res => {
                item.selectOPtion = [];
                res.data.rows.forEach((item1, index) => {
                  item.selectOPtion.push({
                    value: item1[item.colKey],
                    label: item1[item.colName]
                  });
                });
              })
            );
          }
        }
      });

      Promise.all(this.promises).then(() => {
        this.dataOpton.columns.forEach((item1, index) => {
          if (item1.type != "selection" && item1.key != "action") {
            item = {
              range: "",
              search: item1.search,
              title: item1.title,
              value: "",
              type: item1.type,
              selectOPtion: item1.selectOPtion,
              pla:item1.pla,
              seaW:item1.seaW,
              seala:item1.seala
            };

            /**
             * 判断数据释否存在范围搜索   number  time 才存在
             */
            if (item1.type == "number" || item1.type == "time") {
              item.range = "";
            } else if (item1.type == "select" || item1.type == "switch") {
              item.selectOPtion = [];
              item.selectOPtion = item1.selectOPtion;
            }
            if (item.search && item.render != "img") {
              //有搜索的 才push
              this.searchData.push(item);
            }

            this.checkboxGroup.push({
              label: item1.key,
              title: item1.title
            });

            //checkboxGroup组   过滤默认隐藏的列
            if (!item1.hidden) {
              this.tableColumnsChecked.push(item1.key);
            }

            //checkboxGroup对比
            this.ColumnList.push(item1.key);
          }
        });
        this.showForm = !this.showForm;
      });
    },

    changeSwitch(option) {
      // console.log(option);
    },

    changeselectOPtion(val, url) {
      // console.log(val, url);
    },

    //异步处理列表数据
    /**@augments --------------- */
    getInitData(url, cols) {
      this.tableData2 = [];
      var select = [];
      for (var i in cols) {
        if (cols[i].key != "action" && cols[i].type != "selection")
          select.push(cols[i].key + " as " + cols[i].key.replace(/\./, "-"));
      }
      let data =  {
        page: this.getList.page,
        limit: this.getList.limit,
        order: this.getList.order,
        // select: select.join(",")
      }
      var Data = Object.assign(data,this.getList.filter, this.filter)
      this.$ajaxPost(this.dataOpton.url, Data).then(res => {
        let data = res.data.data;
        let goodsList = this.tableData2;
        if (data) {
          var Key = "";
          for (var i in data) {
            for (var key in data[i]) {
              if (key.indexOf("-") != -1) {
                data[i][key.replace(/\-/, ".")] = data[i][key];
                delete data[i][key];
              } else {
                data[i][key.replace(/\-/, ".")] = data[i][key];
              }
            }
          }
        }
        this.tableData2 = data ? data : []; //当值没有数据时返回空String  需要Array
        this.getList.count = parseInt(res.data.total);
        this.getList.page = parseInt(res.data.current_page);
        if (this.tableData2.length < 10) {
          // this.tableHeight = 0;
        }
      });
    }
  },
  watch: {
    screenWidth(val) {
      this.screenWidth = val;
    }
  },
  mounted() {
    this.top = (document.querySelector(".layout").offsetHeight - 112) / 2;
    if(!this.dataOpton.autoHeight){
      this.getHeight();
      
    }
    
  },
  created() {
    this.initTable();
  }
};
</script>

<style>
.btnGroup {
  /* margin: 15px 10px; */
}
.searchCon {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.psearchCon{
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.searchItem {
  width: 33.3333333333333%;
}
.pos {
  position: relative;
}
.img {
  cursor: pointer;
}
.pos .hideImg {
  opacity: 0;
}
.hideImg {
  position: absolute;
  left: 80%;
  width: 0px;
  height: 0px;
  object-fit: cover;
  border: 1px solid #e2e2e2;
  transition: 0.3s ease-in;
  border-radius: 5px;
  /* display: none; */
  opacity: 0;
  z-index: 1000;
  background: #fff;
  animation: move 1s ease-in-out;
}

.pos:hover .hideImg {
  opacity: 0.8;
  width: 100px;
  height: 100px;
}
@keyframes move {
  0% {
    transform: sscale(1);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: sscale(1);
  }
}
.ivu-table-small th {
  height: 40px;
}
.ivu-page-item-active a, .ivu-page-item-active:hover a{
  color: #fff !important;
}
.ivu-form-item-content div{
  margin-right: 2px;
}
</style>