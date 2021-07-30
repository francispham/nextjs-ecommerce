import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";

const Dot = styled.div`
  background-color: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  /* Make Numbers have same width */
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  position: relative;
  top: -0.5rem;
  left: -0.5rem;
`;

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

function oldCartCount({ count }) {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          className='count'
          classNames='count'
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
};

function CartCount({ count }) {
  return (
    <span className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center">{count}</span>
  );
};

export default CartCount;