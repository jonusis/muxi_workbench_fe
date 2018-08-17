import React from 'react';
import PropTypes from 'prop-types'
import AvatarSrc from '../../../assets/img/avatar.png'

const Avatar = ({width, height, square, src}) => {
  
  const style = {
    width,
    height,
    borderRadius: square ? "0" : "100%"
  }

  return (
    <img style={style} src={src} alt="avatar" />
  );
}

Avatar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  square: PropTypes.bool,
  src: PropTypes.string
}

Avatar.defaultProps = {
  width: "44px",
  height: "44px",
  square: false,
  src: AvatarSrc
};

export default Avatar;