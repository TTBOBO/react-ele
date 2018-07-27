import React, { Component } from 'react';
import {Pagination} from "element-react"

class page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageOpt:{
                pageSizes:[10,20,50,100],
                limie:10, //默认分页条数
                currentPage:1,  //默认第一页
                total:100,
                layout:"total, sizes, prev, pager, next, jumper"
            },
            align:"center"
        }
    }

    componentWillMount() {
        if(this.props.align){
            this.setState({
                align:this.props.align
            })
        }
        this.setState({
            pageOpt:this.props.pageOpts
        })
    }

    componentDidMount() {

    }
    setSize(size){
        let obj = {limie:size};
        this.setState({
            pageOpt:Object.assign(this.state.pageOpt,obj)
        })
    }
    setCurrentPage(page){
        let obj = {currentPage:page};
        this.setState({
            pageOpt:Object.assign(this.state.pageOpt,obj)
        })
    }
    sizeChange(size){
        this.setSize(size);
        if(this.props.changeOpt)
            this.props.changeOpt(this.state.pageOpt)
    }
    currentChange(current){
        this.setCurrentPage(current);
        if(this.props.changeOpt)
            this.props.changeOpt(this.state.pageOpt)
    }
    render() {
        return (
            <div style={{textAlign:this.state.align,marginTop:'30px'}}>   
                <Pagination layout="total, sizes, prev, pager, next, jumper" onCurrentChange={(e) => this.currentChange(e)} onSizeChange={(e) => {this.sizeChange(e)}}   total={this.state.pageOpt.total} pageSizes={this.state.pageOpt.pageSizes} pageSize={this.state.pageOpt.limie} currentPage={this.state.pageOpt.currentPage}/>
            </div>
        );
    }
}

page.propTypes = {

};

export default page;