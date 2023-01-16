import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { managers } from '../../data/fake-data';

const Assign = forwardRef(({ content, isSelected, toggle, setValue }, ref) => {
  const [filteredManager, setFilteredManager] = useState(managers);

  const toggleHandler = () => {
    toggle();
  };

  const setManagerHandler = ({ target }) => {
    setValue((prev) => {
      return { ...prev, assign: target.textContent };
    });
    toggle();
  };

  const searchHandler = ({ target }) => {
    // console.log(target.value);
    // setFilteredManager((prev) => {
    //   return prev.filter((manager) => manager.startsWith(target.value));
    // });
  };

  return (
    <>
      {!isSelected && <Selector onClick={toggleHandler}>{content}</Selector>}
      {isSelected && (
        <SearchArea ref={ref}>
          <div>
            <input
              type='text'
              placeholder='사용자 검색'
              onChange={searchHandler}
            />
            <ul>
              {filteredManager?.map((manager) => (
                <li key={manager} onClick={setManagerHandler}>
                  {manager}
                </li>
              ))}
            </ul>
          </div>
        </SearchArea>
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

const SearchArea = styled.div`
  position: relative;

  div {
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

  input {
    width: 95%;
    border: none;
    outline: none;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #c7c7c7;
  }

  ul {
    padding: 5px;
  }

  li {
    width: 100%;
    height: 30px;
    line-height: 2;
    text-indent: 5px;
    color: grey;

    &:hover {
      color: #000;
      background-color: #f4f4f4;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

export default Assign;
