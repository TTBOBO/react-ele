import React, { Component } from 'react';
import {Layout,Card} from "element-react"
import './container/index.css'
import TTable from '../components/TTable/TTable';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardList:[{
                imgUrl:"https://elemefe.github.io/element-react/50e4091cc60a.png",

            },{
                imgUrl:"https://elemefe.github.io/element-react/50e4091cc60a.png",

            },{
                imgUrl:"https://elemefe.github.io/element-react/50e4091cc60a.png",

            }],
            dataOption:{
                columns: [
                    {type: 'selection'},
                    {label: "日期",prop: "date", width: 180,type:"time"},
                    {label: "姓名",prop: "name",width: 180},
                    {label: "地址",prop: "address"},
                    {label: "操作",prop: "action", fixed: 'right', width: 100}
                ],
                toolEvent: [
                    { type: "edit",title:"编辑", actionName:"openInfo" },
                    { type: "del",title:"删除",url:"bannerDel",otherParam:{folder_id:"folder_id"} ,msg:"确认删除么"},
                    { type: "href",title:"浏览"},
                    // { type: "edit",title:"已发布", actionName:"make" ,handStatus: {obj:"address",title:{1:"未发布",2:"已发布",3:"审核中",4:"审核失败"},type:{1:"warning",2:"success",3:"info",4:"danger"}}},
                ],
            }
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    openInfo(e){
        console.log(e);
    }
    render() {
        return (
            <div>
                <div className="cardcon">
                    {this.state.cardList.map((item,index) =>{
                        return (<Card bodyStyle={{ padding: 0 }} className="carditem" key={index}>
                            <img src="https://elemefe.github.io/element-react/50e4091cc60a.png" className="image" />
                            <div style={{ padding: 14 }}>
                                <span>好吃的汉堡</span>
                                <div className="bottom clearfix">
                                <time className="time">2016-10-21 16:19</time>
                                </div>
                            </div>
                        </Card>)
                    })}
                </div>
                <TTable dataOption={this.state.dataOption} openInfo={(e) => this.openInfo(e)}></TTable>
            </div>
        );
    }
}

index.propTypes = {

};

export default index;