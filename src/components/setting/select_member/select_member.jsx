/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from "react";
import Mem from "../member/member";
import Save from "../save/save";
import Func from "../../common/function/function";
import "../../../static/css/common.css";
import "./select_member.css";

class SelMem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selMembers: [],
      members: [
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false }
      ]
    };

    Func.selAll = Func.selAll.bind(this);
    Func.transferMsgMem = Func.transferMsgMem.bind(this);
    Func.save = Func.save.bind(this);
  }

  render() {
    const { members, selMembers, ifSave } = this.state;
    return (
      <div className="present">
        <b className="title littleSize SelMem_vice">选择成员</b>
        <span
          className="fakeBtn"
          onClick={() => {
            Func.selAll();
          }}
          onKeyDown={this.handleClick}
          role="button"
          tabIndex="-1"
        >
          全选
        </span>
        <Mem
          members={members}
          selMembers={selMembers}
          transferMsg={(mem, selMem) => {
            Func.transferMsgMem(mem, selMem);
          }}
        />
        <button
          type="button"
          className="saveBtn footerBtn"
          onClick={() => {
            Func.save();
          }}
        >
          {ifSave ? "已保存" : "保存设置"}
        </button>

        <Save ifSave={ifSave} />
      </div>
    );
  }
}

export default SelMem;
