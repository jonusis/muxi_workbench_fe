/*
项目设置--项目信息页面组件
为项目设置首页，下接编辑成员页面
*/
import React, { Component } from "react";
import "../../../static/css/common.css";
import "./project_setting.css";
import { Link } from "react-router-dom";
import Del from "../../../components/setting/delete/delete";

class SetProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteX: false
    };
  }

  transferDel(del) {
    this.setState({
      deleteX: del
    });
  }

  render() {
    const { deleteX } = this.state;

    return (
      <div className="subject minH">
        <div className="title">项目设置</div>
        <br />
        <input type="text" className="inputSize" placeholder="项目名称" />
        <textarea
          className="inputSize textareaSize"
          placeholder="简单描述项目，便于其他人了解（选填）"
        />
        <br />
        <div className="select">
          <button type="button" className="saveBtn">
            <Link to="/editMem" className="link">
              保存
            </Link>
          </button>
          <button
            type="button"
            className="delBtn"
            onClick={() => {
              this.transferDel(true);
            }}
          >
            删除项目
          </button>
          <span className="fakeBtn">取消</span>
        </div>

        <Del
          name="确认要移除该项目吗?"
          delete={deleteX}
          transferMsg={() => {
            this.transferDel();
          }}
        />
      </div>
    );
  }
}

export default SetProject;
