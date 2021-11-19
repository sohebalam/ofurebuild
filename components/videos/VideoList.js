import React, { useState, useEffect } from "react"
import Posts from "../videos/posts/Posts"
import { Box, makeStyles } from "@material-ui/core"
import Pagination from "@mui/material/Pagination"
import { PaginationItem, Stack } from "@mui/material"

function VideoList({ videos }) {
  const useStyles = makeStyles((theme) => ({
    stretch: { height: "100%" },
    item: { display: "flex", flexDirection: "column", borderRadius: "999px" }, // KEY CHANGES
  }))
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(2)

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost)

  // console.log("currentposts", currentPosts)

  console.log("vidoes", videos)

  useEffect(() => {
    setPosts(videos)
  }, [videos, currentPosts])

  // Change page

  const handleChange = async (number) => {
    if (!number) number = 1
    setCurrentPage(number)
  }

  const count = Math.ceil(posts?.length / postsPerPage)

  const classes = useStyles()

  return (
    <Box style={{ padding: "0.25rem" }}>
      <Posts posts={currentPosts} />
      {/* <Stack spacing={2}> */}
      <Box style={{ padding: "0.25rem", marginLeft: "1.5rem" }}>
        <Pagination
          className="pagination "
          count={count}
          color="secondary"
          onChange={(e) => handleChange(e.target.textContent)}
          renderItem={(item) => (
            <PaginationItem {...item} className={classes.item} />
          )}
        />
      </Box>
      {/* </Stack> */}
    </Box>
  )
}

export default VideoList
