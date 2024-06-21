import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container } from './DragAndDrop/Container';
import "../../Styles/worldExplorer.css"
import { TouchBackend } from 'react-dnd-touch-backend';

function DragNDrop({ Wordexplore }) {
  // console.log( WordExplorerData)
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const Backend = isMobile ? TouchBackend : HTML5Backend;

  return (
    <div>
      <DndProvider backend={Backend}>
        <Container Wordexplore={Wordexplore} />
      </DndProvider>
    </div>
  );
}

export default DragNDrop