import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Info from './Info';
import EditIssue from './edit/EditIssue';
import Edits from './edit/Edits';
import { useDispatch, useSelector } from 'react-redux';
import { issueActions } from '../store/modules/issue-slice';
import usePost from '../hooks/usePost';

const Issue = ({ contents }) => {
  const { title, id } = contents;

  const dispatch = useDispatch();

  const { issues } = useSelector((state) => state.issue);

  const { resetIssues, getAllIssues } = usePost();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditsOpen, setIsEditsOpen] = useState(false);
  const [showEdits, setShowEdits] = useState(false);

  // dnd target data
  const [isDrop, setIsDrop] = useState(false);
  const [targetData, setTargetData] = useState({ id: '', status: '' });
  const [startData, setStartData] = useState('');

  const showModalHandler = () => setIsModalOpen(true);

  const closeModalHandler = () => setIsModalOpen(false);

  const startEdit = () => setIsEditsOpen(true);

  const closeEditHandler = () => {
    closeModalHandler();
    setIsEditsOpen(false);
  };

  // dnd events ##########
  const startDrag = (e) => {
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('status', contents.status);
  };

  const dragEnter = (e) => {
    e.preventDefault();
    if (e.target.id === '') return;

    setTargetData({ id: e.target.id, status: contents.status });
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e) => {
    const dragElementId = e.dataTransfer.getData('id');
    const dragElementStatus = e.dataTransfer.getData('status');

    setIsDrop(true);
    setStartData(dragElementId);

    dispatch(issueActions.changePosition({ id: dragElementId, targetData }));

    // if (dragElementStatus === targetData.status) {
    //   console.log('same status');
    //   dispatch(issueActions.changePosition({ id: dragElementId, targetData }));
    // } else {
    //   console.log('different status');
    //   dispatch(issueActions.changePosition({ id: dragElementId, targetData }));
    // }
  };

  // useEffect(() => {
  //   if (isDrop) {
  //     resetIssues({ id: startData, targetId: targetData.id }, issues);
  //   }
  // }, [isDrop]);

  return (
    <>
      {isModalOpen && !isEditsOpen && (
        <Info info={contents} closeModal={closeModalHandler} />
      )}
      {isEditsOpen && (
        <EditIssue
          editing={isEditsOpen}
          onCloseEdit={closeEditHandler}
          issue={contents}
        />
      )}
      {!isEditsOpen && (
        <IssueWrap
          draggable
          id={id}
          onMouseOver={() => setShowEdits(true)}
          onMouseOut={() => setShowEdits(false)}
          onDragStart={startDrag}
          onDragEnter={dragEnter}
          onDragOver={dragOver}
          onDrop={dropHandler}
        >
          <ListItem onClick={showModalHandler}>
            {title}
            {showEdits && <Edits startEdit={startEdit} id={id} />}
          </ListItem>
        </IssueWrap>
      )}
    </>
  );
};

const IssueWrap = styled.li`
  width: 280px;
  height: 45px;
  border: 1px solid #c1c1c1;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 5px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #f4f4f4;
  }
`;
const ListItem = styled.div`
  width: 75%;
  height: 100%;
  line-height: 44px;
  text-indent: 8px;
`;

export default Issue;
