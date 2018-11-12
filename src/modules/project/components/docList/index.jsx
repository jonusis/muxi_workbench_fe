import React from "react";
import PropTypes from "prop-types";
import "./index.css";

function DocList(props) {
  const { item, docUrl, deleteDoc, moveDoc, DocToTop } = props;
  const createTimeArray = item.create_time.split(/\D/);
  return (
    <div className="project-fileList-container">
      <div className="project-fileList-left">
        <div title={item.name} className="project-fileList-name">
          {item.name}
        </div>
        <div className="project-fileList-uploader">{item.creator}</div>
        <div className="project-fileList-time">
          {`${createTimeArray[0]}/${createTimeArray[1]}/${createTimeArray[2]}`}
        </div>
        <div title={docUrl} className="project-fileList-url">
          {docUrl}
        </div>
      </div>
      <div className="project-fileList-right">
        <a className="project-fileList-download" href={`../docEdit/${item.id}`}>
          编辑
        </a>
        {/* <div onClick={() => {downloadFile(item.id)}} onKeyDown={() => {}} role="presentation">下载</div> */}
        <div
          onClick={() => {
            deleteDoc(item.id);
          }}
          onKeyDown={() => {}}
          role="presentation"
        >
          删除
        </div>
        <div
          onClick={() => {
            moveDoc(item.id);
          }}
          onKeyDown={() => {}}
          role="presentation"
        >
          移动
        </div>
        <div
          onClick={() => {
            DocToTop(item.id);
          }}
          onKeyDown={() => {}}
          role="presentation"
        >
          置顶
        </div>
      </div>
    </div>
  );
}

DocList.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    creator: PropTypes.string,
    create_time: PropTypes.string
  }),
  docUrl: PropTypes.string,
  deleteDoc: PropTypes.func,
  moveDoc: PropTypes.func,
  DocToTop: PropTypes.func
};

DocList.defaultProps = {
  item: {
    id: null,
    name: "",
    creator: "",
    create_time: "",
    url: ""
  },
  docUrl: "",
  deleteDoc: () => {},
  moveDoc: () => {},
  DocToTop: () => {}
};

export default DocList;