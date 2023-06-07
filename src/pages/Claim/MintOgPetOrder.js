import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { patchMintOrdersOgPets } from "../../client/ApiMetaLegends";
import {toast, ToastContainer} from "react-toastify";

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: []
}

const MintOgPetOrder = ({mintOrders}) => {

  const [list, setList] = useState(mintOrders);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list
    });
    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData("text/html", '');
  }

  const onDragOver = (event) => {
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((item, index) => index !== draggedFrom);

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
    ];

    if (draggedTo !== dragAndDrop.draggedTo){
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo
      })
    }
  }

  const onDrop = (event) => {
    setList(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false
    });

    patchMintOrdersOgPets(dragAndDrop.updatedOrder).then((res) => {
      toast("Mint order updated Legend !", { position: "top-right", hideProgressBar: true, className: 'bg-success text-white' });
    })
  }

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null
    });
  }

  const getUcFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
  }, [mintOrders]);

  useEffect( ()=>{
    console.log("List updated!");
  }, [list])

  return (
    <React.Fragment>
      <Col xl={2}>
        <Card>
          <CardHeader>
            <h4 className="card-title mb-0">Order Mint</h4>
          </CardHeader>
          <CardBody>
            <p className="text-muted">
              Sort your <code>mint OG Pet</code> as you want.
            </p>
            <ul className="list-group nested-list nested-sortable-handle">
              {list.map( (item, index) => {

                return(
                  <li
                    key={index}
                    data-position={index} draggable
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onDragLeave={onDragLeave}
                    className={dragAndDrop && dragAndDrop.draggedTo=== Number(index) ? "dropArea nested-1 list-group-item" : "nested-1 list-group-item"}
                  >
                    <i className="fas fa-arrows-alt-v"></i>{getUcFirst(item.choice)}
                  </li>
                )
              })}
            </ul>

          </CardBody>
        </Card>
        <ToastContainer />
      </Col>

    </React.Fragment>
  );
}

export default MintOgPetOrder;