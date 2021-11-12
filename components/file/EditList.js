import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import axios from "axios"
import { Button, Card, CircularProgress, Grid } from "@material-ui/core"
import { Box } from "@mui/system"
import { wrapper } from "../../redux/store"
import { useSelector, useDispatch } from "react-redux"
import { postLessons } from "../../redux/actions/lessonActions"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

const EditList = ({ slug }) => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  const lessonsList = useSelector((state) => state.lessonsList)
  const { loading, error, lessons } = lessonsList

  // console.log(lessons)

  const { files, videos, lessons: dblessons } = lessons

  const listLessons = [...files, ...videos]

  useEffect(() => {
    if (dblessons.length > 0) {
      setData(dblessons)
    }

    if (listLessons.length > dblessons.length) {
      setData(listLessons)
    }
  }, [dblessons, setData])

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

  const handleDelete = async (index, item) => {
    console.log(index, item)
    // const answer = window.confirm("Are you sure you want to delete?")
    // if (!answer) return
    let allLessons = data
    allLessons.splice(index, 1)
    setData(allLessons)

    fileDelete(item)

    // console.log("lessondeleted", data)
  }

  const fileDelete = async (item) => {
    const { data } = await axios.put(`/api/lessons/${slug}`, { item })
  }

  // console.log(data)
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
                            <Grid container>
                              <Grid item xs={11}>
                                {item.title}
                              </Grid>
                              <Grid item xs={1}>
                                {item.videoId === "" && (
                                  <div
                                    onClick={() => handleDelete(index, item)}
                                  >
                                    <DeleteForeverIcon />
                                  </div>
                                )}
                              </Grid>
                            </Grid>
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

export default EditList
