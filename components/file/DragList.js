import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import axios from "axios"
import { Card, CircularProgress } from "@material-ui/core"
import { Box } from "@mui/system"
import { wrapper } from "../../redux/store"
import { useSelector, useDispatch } from "react-redux"
import { postLessons } from "../../redux/actions/lessonActions"

const DragList = ({ slug, lessons }) => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (lessons?.length > 0) {
      setData(lessons)
    }
  }, [])

  const reorder = (data, startIndex, endIndex) => {
    const result = Array.from(data)
    const [removed] = result.splice(startIndex, 1)

    result.splice(endIndex, 0, removed)
    dispatch(postLessons(result, slug))
    return result
  }

  const onEnd = async (result) => {
    // console.log(result)
    setData(reorder(data, result.source.index, result.destination.index))
  }
  return (
    <DragDropContext onDragEnd={onEnd}>
      <Droppable droppableId="123456">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {!data ? (
              <CircularProgress />
            ) : (
              data.map((item, index) => (
                <Draggable draggableId={item._id} key={item._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
                        <Box style={{ marginTop: "0.25rem" }}>
                          <Card style={{ padding: "0.25rem" }}>
                            {item.title}
                          </Card>
                        </Box>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragList
