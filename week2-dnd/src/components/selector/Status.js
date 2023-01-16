import { forwardRef } from 'react';
import styled from 'styled-components';

const statusList = ['todo', 'proceeding', 'done'];

const Status = forwardRef(({ content, isSelected, toggle, setValue }, ref) => {
  const toggleHandler = () => {
    toggle();
  };

  const setStatusHandler = ({ target }) => {
    setValue((prev) => {
      return { ...prev, status: target.textContent };
    });
    toggle();
  };

  return (
    <>
      {!isSelected && (
        <Selector onClick={toggleHandler}>
          <Circle status={content} />
          {content}
        </Selector>
      )}
      {isSelected && (
        <StatusList>
          <ul ref={ref}>
            {statusList.map((item) => (
              <li key={item} onClick={setStatusHandler}>
                {item}
              </li>
            ))}
          </ul>
        </StatusList>
      )}
    </>
  );
});

const Selector = styled.div`
  width: 240px;
  border-radius: 25px;
  line-height: 2;

  &:hover {
    background-color: #f4f4f4;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const Circle = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${({ status }) => {
    if (status === 'todo') {
      return '#bcbcbc';
    } else if (status === 'proceeding') {
      return '#29b6f6';
    } else {
      return '#66bb6a';
    }
  }};
`;

const StatusList = styled.div`
  position: relative;

  ul {
    position: absolute;
    top: 0;
    left: 0;
    width: 240px;
    padding: 10px;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  li {
    padding: 5px;
    color: grey;

    &:hover {
      color: #000;
      background-color: #f4f4f4;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

export default Status;
