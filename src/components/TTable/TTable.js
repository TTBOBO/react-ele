import React, { Component } from 'react';
import { Table, Button, Message, MessageBox,Select } from "element-react"
import Page from '../page/page'
import util from '../../assets/js/util';
import './tabel.css'

class TTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageOpt: {
                pageSizes: [10, 20, 50, 100],
                limie: 10, //默认分页条数
                currentPage: 1,  //默认第一页
                total: 100,
                layout: "total, sizes, prev, pager, next, jumper"
            },
            columns: [],
            data: [{
                date: '1532745035',
                name: '1',
                address: 'https://file.iviewui.com/dist/3e7ccd0fec857c20cce63871fe690812.jpg'
            }, {
                date: '1532745035',
                name: '2',
                address: 'https://file.iviewui.com/dist/3e7ccd0fec857c20cce63871fe690812.jpg'
            }, {
                date: '1532745035',
                name: '3',
                address: 'https://file.iviewui.com/dist/3e7ccd0fec857c20cce63871fe690812.jpg'
            }, {
                date: '1532745035',
                name: '0',
                address: 'https://file.iviewui.com/dist/3e7ccd0fec857c20cce63871fe690812.jpg'
            }],
            defaultFilter: {}
        }
    }

    componentWillMount() {
        this.initTable();
    }
    initTable() {
        console.log(this.props.dataOption);
        if (this.props.dataOption.getList && this.props.dataOption.getList.filter) {
            this.setState({
                defaultFilter: JSON.parse(JSON.stringify(this.props.dataOption.getList.filter))
            })
        }

        let cols = this.props.dataOption.columns;

        this.props.dataOption.columns.forEach((item, index) => {
            if (item.prop == "action") {
                //根据   操作按钮的数据 定宽
                item.width = this.props.dataOption.toolEvent.length * 55 + 65;
                item.render = (data, column) => {
                    return this.getToolBtn(data, column);
                }
            }else if(item.type == 'img'){
                item.render = (data,column) =>{
                    return (<div>
                        <img src={data[column.prop]} style={{width:"50px",height:"50px","objectFit": "cover"}} />
                    </div>)
                }
            }else if(item.type == 'time'){
                item.render = (data,column) =>{
                    return (<span>
                        {util.time.getNowTime(data[column.prop], item.s)}
                    </span>)
                }
            }else if(item.type == "select"){
               
                item.render = (data,column) =>{
                    console.log(11111111)
                    // console.log(item.selectOPtion)
                    return ( <Select value={data[column.prop]} onChange={this.tSelChange.bind(this)}>
                        {
                          item.selectOPtion.map(el => {
                            return <Select.Option key={el.value} label={el.label} value={el.value} />
                          })
                        }
                      </Select>)
                }
            }
        });
        this.setState({
            columns: this.props.dataOption.columns
        })
    }
    getToolBtn(data, column) {
        let colorBtn = {
            href: "info",
            edit: "success",
            warning: "warning",
            del: "danger"
        }
        return this.props.dataOption.toolEvent.map((item, index) => {
            return (<Button size="small" onClick={() => this.handToolBtn({ data: data, col: column, item: item })} key={index} type={item.handStatus ? util.getHandType(data[item.handStatus.obj], item.handStatus.type) : colorBtn[item.type]} icon={item.icon} >{item.title}</Button>)
        })
    }

    /**
     * 
     * @param {*} option -> data  当前行数据
     * @param {*} option -> col   当前行clo数据
     * @param {*} option -> item  当前行初始化配置数据
     */
    handToolBtn(option) {
        //如果toolbtn  里面有 actionName   就调父组件方法 
        if (option.item.actionName) {
            this.props[option.item.actionName](option);
        } else {
            switch (option.item.type) {
                case "del":
                    this.del(option.data, option.item)
                    break;

                default:
                    break;
            }
        }

    }

    del() {
        MessageBox.confirm('删除数据, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            Message({
                type: 'success',
                message: '删除成功!'
            });
        }).catch(() => {
            Message({
                type: 'info',
                message: '已取消删除'
            });
        });
    }
    changeOpt(e) {
        console.log(e);
    }
    onSelectAll(res){
        console.log(res);
    }
    //table select change 事件
    tSelChange(e){
        console.log(e);
    }


    render() {
        return (
            <div>
                <Table
                    style={{ width: '100%' }}
                    columns={this.state.columns}
                    data={this.state.data}
                    stripe={true}
                    onSelectAll={this.onSelectAll.bind(this)}
                />
                <Page pageOpts={this.state.pageOpt} changeOpt={(e) => this.changeOpt(e)}></Page>
            </div>
        );
    }
}

TTable.propTypes = {

};

export default TTable;