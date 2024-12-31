import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Shape = ({ shape }) => (
  <motion.div
    style={{
      position: 'absolute',
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      background: shape.type === 'circle' ? 'none' : shape.color,
      borderRadius: shape.type === 'circle' ? '50%' : '0%',
      border: shape.type === 'circle' ? `2px solid ${shape.color}` : 'none',
      top: shape.top,
      left: shape.left,
      zIndex: 1,
      filter: 'blur(3px)',
    }}
    initial={{ x: '-100vw' }}
    animate={{ x: '100vw' }}
    transition={{
      duration: shape.duration,
      delay: shape.delay,
      repeat: Infinity,
    }}
  />
);

Shape.propTypes = {
  shape: PropTypes.shape({
    size: PropTypes.number.isRequired,
    left: PropTypes.string.isRequired,
    top: PropTypes.string.isRequired,
    delay: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['circle', 'square']).isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

export default Shape;
