import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <div>
      <h2>Page Component!!!</h2>
      {children}
    </div>
  );
}

Page.propTypes = {
  /* This accept 1 or and Array of Node
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  */
  children: PropTypes.any,
};
