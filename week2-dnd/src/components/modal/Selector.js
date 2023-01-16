import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Assign from '../selector/Assign';

import Id from '../selector/Id';
import Status from '../selector/Status';

const Selector = ({ title, content, setValue }) => {
  const [isSelected, setIsSelected] = useState(false);

  const cateRef = useRef();

  const toggleTag = () => {
    setIsSelected((prev) => !prev);
  };

  const clickOutside = ({ target }) => {
    if (isSelected && !cateRef.current.contains(target)) {
      toggleTag();
    }
  };

  useEffect(() => {
    if (isSelected) document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  });

  return (
    <CategoryWrap>
      <Title>{title}</Title>
      {title === 'Status' && (
        <Status
          content={content}
          isSelected={isSelected}
          toggle={toggleTag}
          setValue={setValue}
          ref={cateRef}
        />
      )}
      {title === 'Assign' && (
        <Assign
          content={content}
          isSelected={isSelected}
          toggle={toggleTag}
          setValue={setValue}
          ref={cateRef}
        />
      )}
      {/* {title === 'Date' && ()} */}
      {title === 'ID' && <Id content={content} />}
    </CategoryWrap>
  );
};

const CategoryWrap = styled.div`
  display: flex;
`;

const Title = styled.div`
  width: 160px;
  padding: 8px;
  font-weight: 500;
  color: grey;
`;

export default Selector;
