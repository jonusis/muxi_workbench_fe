import React from 'react';
import ReactSVG from 'react-svg'
import './index.css'
import Icon1 from '../../../assets/svg/projectIcon/icon1.svg'
import Icon2 from '../../../assets/svg/projectIcon/icon2.svg'
import Icon3 from '../../../assets/svg/projectIcon/icon3.svg'
import Icon4 from '../../../assets/svg/projectIcon/icon4.svg'
import Icon5 from '../../../assets/svg/projectIcon/icon5.svg'
import Icon6 from '../../../assets/svg/projectIcon/icon6.svg'
const Icons = [Icon1, Icon2, Icon3, Icon4, Icon5, Icon6]

function Item(props) {
  return (
    <div className="project-item-container">
      <ReactSVG className="project-item-img" path={Icons[props.item.index]} />
      <div className="project-item-text">{props.item.name}</div>
    </div>
  );
}

export default Item;