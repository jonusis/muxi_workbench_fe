/*
选择成员组件
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import ManageService from "service/manage";
import Loading from "components/common/loading/index";
import { Store } from "store";
import Save from "../save/save";
import Member from "../member/member";
import "static/css/common.scss";
import "./selectMember.scss";

class SelectMember extends Component {
  static changeGroupMemberFormat(mem) {
    const obj = {};

    obj.name = mem.username;
    obj.id = mem.userID;
    obj.email = mem.email;
    obj.role = mem.role;
    obj.avatar = mem.avatar;
    obj.group = mem.groupName;
    obj.selected = false;

    return obj;
  }

  constructor(props) {
    super(props);

    this.state = {
      selMembers: [],
      members: [],
      ifSave: false,
      deleteAdmin: [],
      loading: true
    };
  }

  componentDidMount() {
    const { addGroup, groupMember, setManager, groupID } = this.props;

    if (groupMember || addGroup) {
      ManageService.getAllMem()
        .then(member => {
          if (member) {
            const arr = member.list.map(mem => {
              const obj = SelectMember.changeGroupMemberFormat(mem);

              return obj;
            });

            if (groupMember && groupID) {
              ManageService.groupMember(groupID)
                .then(member1 => {
                  let preArray = [];
                  if (member1) {
                    preArray = member1.list.map(mem => mem.userID);

                    arr.map(mem1 => {
                      const mem = mem1;

                      if (preArray.indexOf(mem.id) !== -1) mem.selected = true;

                      return mem;
                    });
                  }

                  this.setState({
                    members: arr,
                    selMembers: preArray,
                    loading: false
                  });
                })
                .catch(error => {
                  Store.dispatch({
                    type: "substituteWrongInfo",
                    payload: error
                  });
                });
            } else {
              this.setState({ members: arr, loading: false });
            }
          }
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    }

    if (setManager) {
      ManageService.getAllMem()
        .then(member => {
          if (member) {
            const arr = member.list.map(mem => {
              const obj = SelectMember.changeGroupMemberFormat(mem);

              return obj;
            });

            ManageService.getAdminList()
              .then(admins => {
                let preArray = [];
                if (admins) {
                  preArray = admins.list.map(admin => admin.userID);

                  arr.map(mem1 => {
                    const mem = mem1;

                    if (preArray.indexOf(mem.id) !== -1) mem.selected = true;

                    return mem;
                  });
                }

                this.setState({
                  members: arr,
                  selMembers: preArray,
                  deleteAdmin: [...preArray],
                  loading: false
                });
              })
              .catch(error => {
                Store.dispatch({
                  type: "substituteWrongInfo",
                  payload: error
                });
              });
          }
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    }
  }

  setManagerDeleteAdmins(deleteAdmins) {
    return new Promise((resolve, reject) => {
      if (deleteAdmins.length > 0) {
        deleteAdmins.map(id => {
          ManageService.deleteManager(id)
            .then(() => {
              resolve();
            })
            .catch(error => {
              reject(error);
            });
          return id;
        });
      } else {
        resolve(this);
      }
    });
  }

  setManagerAddAdmins(addMembers) {
    return new Promise((resolve, reject) => {
      if (addMembers.length > 0) {
        addMembers.map(id => {
          ManageService.setManager(id)
            .then(() => {
              resolve();
            })
            .catch(error => {
              reject(error);
            });
          return id;
        });
      } else {
        resolve(this);
      }
    });
  }

  save = () => {
    const {
      groupMember,
      addGroup,
      groupName,
      setManager,
      groupID,
      transferMsg
    } = this.props;
    const { selMembers, deleteAdmin } = this.state;

    if (groupMember) {
      if (!groupName.trim()) {
        transferMsg(true);
        return;
      }
      ManageService.updateGroupName(groupID, groupName)
        .then(() => {
          ManageService.updateGroupMember(groupID, selMembers)
            .then(() => {
              this.setState({ ifSave: true });

              setTimeout(() => {
                this.setState({ ifSave: false });
                window.history.back();
              }, 1000);
            })
            .catch(error => {
              Store.dispatch({
                type: "substituteWrongInfo",
                payload: error
              });
            });
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    }

    if (addGroup) {
      if (!groupName.trim()) {
        transferMsg(true);
        return;
      }
      ManageService.addGroup(groupName, selMembers)
        .then(() => {
          this.setState({ ifSave: true });

          setTimeout(() => {
            this.setState({ ifSave: false });
            window.history.back();
          }, 1000);
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    }

    if (setManager) {
      const deleteAdmins = deleteAdmin.filter(
        num => selMembers.indexOf(num) === -1
      );
      const addMembers = selMembers.filter(
        num => deleteAdmin.indexOf(num) === -1
      );

      Promise.all([
        this.setManagerDeleteAdmins(deleteAdmins),
        this.setManagerAddAdmins(addMembers)
      ])
        .then(() => {
          this.setState({ ifSave: true });
          setTimeout(() => {
            this.setState({ ifSave: false });
            window.history.back();
          }, 1000);
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    }
  };

  transferMsgMem = (arr1, arr2) => {
    this.setState({
      members: arr1,
      selMembers: arr2
    });
  };

  selAll = () => {
    this.setState(prevState => {
      const { members: arr1 } = prevState;
      const arr2 = [];
      let num = 0;

      if (arr1) {
        arr1.map(i => {
          if (i.selected) num += 1;
          return i;
        });

        if (num === arr1.length) {
          arr1.map(i => {
            const j = i;
            j.selected = false;
            return j;
          });
        } else {
          arr1.map(i => {
            const j = i;
            j.selected = true;
            arr2.push(j.id);
            return j;
          });
        }
      }

      return { members: arr1, selMembers: arr2 };
    });
  };

  render() {
    const { members, selMembers, ifSave, loading } = this.state;

    return (
      <div className="selectMember">
        {loading ? (
          <Loading />
        ) : (
          <div className="present selectMember-present">
            <div className="header">
              <b className="title littleSize selectMember-vice">选择成员</b>
              <span
                className="fakeBtn"
                onClick={this.selAll}
                onKeyDown={this.handleClick}
                role="button"
                tabIndex="-1"
              >
                {members.length === selMembers.length ? "取消全选" : "全选"}
              </span>
            </div>

            <Member
              members={members}
              selMembers={selMembers}
              transferMsg={this.transferMsgMem}
            />
            <div className="footerBtn">
              <button type="button" className="saveBtn" onClick={this.save}>
                {ifSave ? "已保存" : "保存设置"}
              </button>
            </div>
            <Save ifSave={ifSave} />
          </div>
        )}
      </div>
    );
  }
}

export default SelectMember;

SelectMember.propTypes = {
  groupMember: PropTypes.bool,
  addGroup: PropTypes.bool,
  groupName: PropTypes.string,
  setManager: PropTypes.bool,
  groupID: PropTypes.number,
  transferMsg: PropTypes.func
};
SelectMember.defaultProps = {
  groupMember: false,
  addGroup: false,
  groupName: "",
  setManager: false,
  groupID: 0,
  transferMsg: () => {}
};
