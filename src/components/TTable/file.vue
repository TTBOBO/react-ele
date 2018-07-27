<template>
  <div style="background:#fff;width:100%;">
      <div class="headere-top">
        <span>您的账户剩余余额：{{login.userinfo.earn}}LCB</span>   <Button @click.native = "buye(true)" style="width: 90px;height:30px; margin-left:30px;" type="primary">充值</Button>
      </div>
      <div style="width:80%; margin-top:30px;margin: 30px;">
        <Tabs :animated="false" type="card" :active-key="akey" @on-click="changeTab">
            <TabPane label="自制广告" key="tab1" name="tab1" >
              <div >
                <InitTable ref="tab1" :dataOpton="dataOpton" @deleteList="getDelete" @openInfo="openInfo" @buye="buye" @detail="detail" @make="buy"  @getSearch="getSearch" @delItem="delitem"></InitTable>
              </div>
            </TabPane>
            <!-- <TabPane label="创意广告" key="tab2" >
              <div >
                <InitTable ref="tab2" :dataOpton="dataOpton1" @deleteList="getDelete" @openInfo="openInfo" @buye="buye" @detail="detail" @make="buy"  @getSearch="getSearch"></InitTable>
              </div>

            </TabPane> -->
             <!-- <TabPane label="个性定制" key="tab3">
               <div>
                <InitTable ref="tab3" :dataOpton="dataOpton2" @deleteList="getDelete" @openInfo="openInfo" @buye="buye" @detail="detail" @make ="buy"  @getSearch="getSearch" @delItem="delitem"></InitTable>
                </div>
                </TabPane> -->
            <TabPane label="悬浮广告" key="tab4" name="tab4" >
              <div >
                <InitTable ref="tab4" :dataOpton="dataOpton3" @deleteList="getDelete" @openInfo="openInfo" @buye="buye" @detail="detail" @make="buy"  @getSearch="getSearch"></InitTable>
              </div>

            </TabPane>
      </Tabs>
      </div>

      <Modal v-model="show" class-name="vertical-center-modal"  width="350px">
          <div>
            <Form ref="formInline" :model="formInline" >
              <FormItem prop="" label="充值金额">
                 <Input v-model="money" size="large" placeholder="请输入充值金额"></Input>
              </FormItem>
            </Form>

          </div>
          <div slot="close"></div>
          <div slot="footer" style="text-align: center;">
            <Button style="width: 100px;" type="primary" @click="canle">取消</Button>
            <Button style="width: 100px;" type="primary" @click="payMoney">我要充值</Button>
          </div>
      </Modal>
      <Modal v-model="showFileInfo"  class-name="vertical-center-modal" width="700" style="top: 200px; ">
          <div class="">
            <!-- pay-box -->
            <p style=" margin-bottom: 5px;">{{user}}的文件夹</p>
              <div>
                <InitTable ref="tableInfo" v-if="showFileInfo" @changeName="changeName" @seeInfo="seeInfo" @openInfo1="openInfo1" :dataOpton="showInfo" @reload="reload"></InitTable>
              </div>
          </div>
           <div slot="footer" style="text-align: center;" v-show="activeName != 'tab4'">
             <Button style="width: 100px;" type="primary" @click="handAddTwo">添加二级页</Button>
            <Button style="width: 100px;" type="primary" @click="handUpload">上传展示图片</Button>
          </div>
      </Modal>
      <Modal v-model="showChange" width="350px" class-name="vertical-center-modal" style="top: 200px;">
          <div class="pay-box">
            <Input v-model="name" size="large" placeholder=""></Input>
          </div>
          <div slot="close"></div>
          <div slot="footer">
            <Button style="width: 100px;" type="primary" @click="changeTitle">确认</Button>
          </div>
      </Modal>
      <Modal
        v-model="xj"
        title=""
        width='400px'
        class-name="vertical-center-modal"
          @on-ok="backStatus"
          @on-cancel="cancel">
          <p>是否将广告下架</p>
      </Modal>

      <Modal
            v-model="buyModal"
            width="300px"
             class-name="vertical-center-modal"
            >
            <div class="">
                      <Form :model="formItem" :label-width="80">
                        <FormItem label="充值金额">
                            <Input v-model="formItem.money" placeholder="请输入充值金额"></Input>
                        </FormItem>
                      </Form>
                      <div style="text-align:center;">
                        <Button @click.native="payfor" style=" width:100px;" type="primary">充值</Button>
                      </div>

                  </div>
            <div slot="close"></div>
            <div slot="footer"></div>
        </Modal>

        <Modal
            v-model="payDate"
            title=""
            @on-ok="ok"
            width="300px"
             class-name="vertical-center-modal"
            >
            <p>确认是否充值成功</p>
            <div slot="close"></div>
            <div slot="footer">
               <div style="text-align:center;">
                  <Button @click.native = "ok" style=" width:100px;" type="primary">确认充值</Button>
                </div>
            </div>
        </Modal>
        <Modal
            v-model="uploadNew"
            title=""
            width="300px"
             class-name="vertical-center-modal"
            >
            <div>
              <img v-if="uploadNew" :src="uploadImg" style="width:100%;"/>
            </div>
            <div slot="close"></div>
            <div slot="footer">
               <div style="text-align:center;">
                  <Button @click.native = "handuploadImg" style=" width:100px;" type="primary">上传新的图片</Button>
                </div>
            </div>
        </Modal>
        <Modal
          v-model="addCard"
          @on-ok="addCards"
          @on-cancel="cancelCard">
          <p>您的信息未认证成功，前往认证？</p>
      </Modal>
      <cutting ref="cutting" @editSuccess="editSuccess"></cutting>

  </div>
</template>

<script>
import InitTable from "../../components/table";
import cutting from "../../components/cutting";
import util from '../../assets/js/util'
import otherurl from '../../api/otherurl'
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data(){
    return {
      tabs:{
        obj:{
          status:"1",
          option:[{value: '1',label: '发布'},
                  {value: '2',label: '未发布'}]
        }
      },
      show:false,// 显示余额不足
      buyModal:false,  //  显示充值
      showFileInfo:false,  //  显示文件详情
      akey:"tab1",
      filename:"",
      payImg:"",
      user:"",  //用户
      dataOpton1:{},
      dataOpton2:{},
      dataOpton3:{},
      dataOpton: {
        url: "folderList",   //folderList
        columns: [
          {title: "序号", key: "id", search: "", sortType:"desc", type: ""},
          {title: "文件夹名称",key: "name",search: "name", type: "",pla:"请输入您所要搜的文件名",seaW:270,seala:"空"},
          {title: "发布状态", key: "status", search: "status", type: "select",hidden:true,seala:"空",seaW:100,selectOPtion:[{label:"全部",value:"0"},{label:"未发布",value:"1"},{label:"已发布",value:"2"},{label:"审核中",value:"3"},{label:"审核失败",value:"4"}]},
          {title: "当前余额LCB", key: "money", search: "", type: "", },
          {title: "操作",key: "action",align: "center",render:""}
        ],
        formWidth:0,
        autoCol: false,
        primary:"id",
        topBtnGroup: [],
        getList:{
          filter:{
            type:1,
            status:1,
            name:"",
            uid:166
          }
        },
        toolEvent: [
          { type: "edit",title:"打开", actionName:"openInfo"},
          { type: "edit",title:"充值", actionName:"buye" },
          { type: "edit",title:"已发布", actionName:"make" ,handStatus: {obj:"status",title:{1:"未发布",2:"已发布",3:"审核中",4:"审核失败"},type:{1:"ghost",2:"success",3:"warning",4:"error"}}},
          { type: "del",title:"删除",url:"folderDel",msg:"确认删除么"},
        ],
        tab:true,
        autoHeight:true
      },
      showInfo:{
        url: "fbannerList",
        columns: [
          {title: "属性",key: "is_index",search: "", type: ""},
          {title: "名称", key: "name", search: "", type: "editting"},
          {title: "操作",key: "action",align: "center",render:""
          }
        ],
        autoCol: false,
        primary:"id",
        topBtnGroup: [

        ],
        getList:{
          filter:{}
        },
        toolEvent: [
          { type: "edit",title:"编辑", actionName:"openInfo1" },
          { type: "del",title:"删除",url:"bannerDel",otherParam:{folder_id:"folder_id"},actionName:"reload" ,msg:"确认删除么"},
          { type: "href",title:"浏览"},
        ],
        autoHeight:true,
        // hiddenPage:true
      },
      activeName:"tab1",
      showChange:false,
      name:"",
      folder_id:"",   //二级页id
      money:"",
      formInline:{},
      params:{},   //点击未发布  已发布的返回数据
      xj:false,
      formItem:{  // 充值
        money:""
      },
      payDate:false,  //显示支付成功modal
      payFile:true, //true  充值文件夹  false 充值余额
      uploadNew:false,  //上传新的图片
      uploadImg:"",
      addCard:false
    }
  },
  components: {
    InitTable,
    cutting
  },
   computed: {
     ...mapState([
      "login", //页面初始化数据
      "pageInfo"
    ]),
  },
  methods: {
    delitem(res){
      if(res.data.earn){
        this.login.userinfo.earn = res.data.earn;
        util.setSessionStorage("userInfo", JSON.stringify(this.login.userinfo));
      }
    },
    payfor(){
      if(!this.formItem.money){
        this.$Message.success("请输入金额");
        return false;
      }
      if(this.payFile){   //文件夹充值
        this.$ajaxPost("banner_charge", {
          uid: this.login.userinfo.uid,
          folder_id:this.params.id,
          money:this.formItem.money
        }).then(res => {
          if(res.code == 400){
               this.$Message.error(res.msg);
          }else{
              this.$Message.success('充值成功');
              this.$refs[this.activeName].reload();
              this.formItem.money = "";
              this.login.userinfo.earn = res.data.earn;
              util.setSessionStorage("userInfo", JSON.stringify(this.login.userinfo));
          }
          this.buyModal = false;
        });
      }else{  //余额充值
        this.time = parseInt(Math.random()*10000000);
        window.open(`${otherurl.payurl}/api/Wxpay/index?money=${this.formItem.money}&channel=微信&time_conditions=${this.time}&uid=${this.login.userinfo.uid}`)
        this.payDate = true;
      }

    },
    //判断是否充值成功
    ok(){
      this.$ajaxPost("payStatus", {
        uid: this.login.userinfo.uid,
        time_conditions:this.time
      }).then(res => {

        if(res.data.status == 1){
          this.$Message.success("充值成功");
          this.payDate = false;
          this.recharge();
          this.login.userinfo.earn = res.data.earn;
          this.formItem = util.clearObj(this.formItem);
          let userinfo = JSON.parse(util.getSessionStorage('userInfo'));
          userinfo.earn = res.data.earn;
          util.setSessionStorage('userInfo',JSON.stringify(userinfo));
        }else{
          this.$Message.success("充值失败");
        }

      });
    },
    //裁剪成功
    editSuccess(base){
      this.$ajaxPost("upload_index_img", {
          fold_id:this.folder_id,
          base_url:base
      }).then(res => {
          this.$Message.success('添加成功!');
          this.$refs["tableInfo"].reload();
          this.$refs.cutting.destroy();
      });
    },
    editImg(){
      this.cuttingModal =!this.cuttingModal;
    },
    cancel(){
      this.xj = !this.xj;
    },
    canle(){
      this.show = false;
      this.showFileInfo = false;
    },
    handAddTwo(){
      this.$ajaxPost("banner_add", {
          folder_id:this.folder_id,
        }).then(res => {
          this.$Message.success('添加成功!');
          this.$refs["tableInfo"].reload();
        });
    },
    handUpload(){
      this.$ajaxPost("folder_img", {
          folder_id:this.folder_id,
      }).then(res => {
         if(!res.data.image){
          this.$refs.cutting.showcuttingModal();
         }else{
           this.uploadNew = true;
           this.uploadImg = res.data.image;
         }
      });
      // uploadNew

    },
    handuploadImg(){
      this.uploadNew = false;
      this.$refs.cutting.showcuttingModal();
    },
    addCards(){
      setTimeout(() => {
            this.$router.push({
              path:"/card",
            });
          })
    },
    cancelCard(){
       this.addCard = false;
    },
    buy(params){
      this.params = params;
      if(this.login.userinfo.status != 2){
          this.addCard = true;
          return false;
      }
      if(params.money == 0 && params.status == 1){
        this.show = true;
        this.buyModal = false;
      }else{
        if(params.status == 1 || params.status == 2){
              if(params.status == 2){
                this.xj = true;
              }else{
                this.changeStatus(params.id,params.status == 1 ? 3 : 1);
              }

            }
      }

    },
    //修改发布状态
    changeStatus(folder_id,status){
      let data = {
          fold_id:folder_id,
          status:status
        }
        if(status == 3){
          data.money = this.money
        }
      this.$ajaxPost("folder_status", data).then(res => {
        if(res.code == 400) {
          this.$Message.error('充值失败!');
          return false;
        }
         this.show = false;
         this.login.userinfo.earn = res.data.earn;
         this.$refs[this.activeName].reload();
          util.setSessionStorage('userInfo',JSON.stringify( this.login.userinfo));
         this.$Message.success(status == 3 ? '充值成功，广告已发布' : '广告已下架');
      });
    },
    //已发布切换成 未发布
    backStatus() {
      this.changeStatus(this.params.id,1);
    },
    buye(params){
      //设置是 余额充值 还是  文件夹充值
      if(params == true){
        this.payFile = false;
      }else{
        if(params.status != 2 ){
          this.$Message.error('上架才能充值');
          return false;
        }
        this.payFile = true;
        this.params = params;
      }
      this.show = false;
      this.buyModal = true;
    },
    //支付
    payMoney(){
      console.log(this.money ,this.login.userinfo.earn )
      if(this.money > parseInt(this.login.userinfo.earn)){
         this.$Message.error('账户余额不足，请充值！');
      }else{
        if(this.params.status == 1 || this.params.status == 0){
          this.changeStatus(this.params.id,this.params.status == 1 ? 3 : 1);
        }
      }
    },
    getDelete(id) {
      console.log(id);
    },
    search(){  //搜索
      // this.dataOpton.getList.filter = "hm_archives.id != 1";
      // this.$refs.tabTable.reload();
    },
    reload(){
      this.$refs[this.activeName].reload();
    },
    //打开
    openInfo(res){
      // console

      console.log( this.showInfo.toolEvent)
      // { type: "href",title:"浏览"},
      this.showInfo.getList.filter.id = res.id;
      this.folder_id = res.id;
      this.user = res.name;
      this.showFileInfo = true;

    },
    //编辑
    openInfo1(res){
//      console.log(res);
//      console.log((res.id+5.19)*1000);
      switch (res.type)
      {
        case 1:
          this.$router.push({
            path:"/makeAd",
            query:{
              res:(res.id+5.19)*1000*(2.8*1000)/1000000
            }
          });
          break;
        case 4:
          this.$router.push({
            path:"/floatAd",
            query:{
              res:(res.id+5.19)*1000*(2.8*1000)/1000000
            }
          });
          break;
        default:

      }

    },
    //浏览
    seeInfo(res){
      console.log(res);
    },
    //点击tab 返回  选中的key
    changeTab(key){
      this.akey = key;
      this.activeName = key;
      if(this.activeName == "tab4"){
        this.showInfo.toolEvent.pop();
      }else{
        this.showInfo.toolEvent.push({ type: "href",title:"浏览"})
      }
    },
     /**
     * 获取该条记录的id
     */
    edit(id) {
      //  console.log(id);
    },
    detail(params){
      this.showFileInfo = true;

      console.log(params)
    },
    info(id) {
      console.log(id);
    },
    getSearch(data) {
      console.log(data);
    },
    doImport(){

    },
    InitTable(){
      this.dataOpton.getList.filter.uid = this.login.userinfo.uid;
      let option = JSON.parse(JSON.stringify(this.dataOpton));
      option.getList.filter.type = 2;
      console.log(option)
      this.dataOpton1 = option;
     let option1 = JSON.parse(JSON.stringify(option));
      option1.getList.filter.type = 4;
      this.dataOpton2 = option1;
       let option2 = JSON.parse(JSON.stringify(option));
      option2.getList.filter.type = 4;
      this.dataOpton3 = option2;
    },
    changeName(params){
      this.showChange = true;
      this.name = params.row.name;
      this.folder_id = params.row.id;
    },
    changeTitle(){
       this.$ajaxPost("bannerNameEdit", {
          id: this.folder_id,
          name:this.name
        }).then(res => {
          this.showChange = false;
          this.$Message.success('修改成功!');
          this.$refs["tableInfo"].reload();
        });
    },
     initEara(){
       this.$ajaxPost("balance", {
            uid:this.login.userinfo.uid,
        }).then(res => {
           this.login.userinfo.money = res.data.all_money;
           this.login.userinfo.earn = res.data.earn;
           util.setSessionStorage("userInfo", JSON.stringify(this.login.userinfo));
        });
    }
  },
  created () {
    this.InitTable();
    this.initEara();
  },
  mounted () {

  }
}
</script>

<style>
.headere-top{
  width: 100%;
  height: 68px;
  padding-left: 26px;
  color: #6b6b6b;
  border-bottom: 1px solid #b4b4b4;
  line-height: 68px;
}
.ivu-modal-footer{
  /* padding: 0 !important; */
  border:none  !important;
}
.pay-box{
    display: flex;
    flex-flow: column;
    flex: 1;
    justify-content: center;
    /* align-content: center; */
    align-items: center;
}
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;


    }
</style>
