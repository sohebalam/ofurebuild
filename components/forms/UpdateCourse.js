import { useState, useEffect } from "react"
import EditList from "../file/EditList"
import { Box, CircularProgress, Input } from "@material-ui/core"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import { InputLabel } from "@material-ui/core"
import { DropzoneArea } from "material-ui-dropzone"
import { Avatar, FormControl, Select, TextField } from "@material-ui/core"
import { CssBaseline } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { FormControlLabel } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { Checkbox } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import { Button } from "@material-ui/core"
import { Container } from "@material-ui/core"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import Image from "next/image"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    backgroundColor: theme.palette.secondary.main,
  },
}))

const UpdateCourse = ({
  handleSubmit,
  handleChange,
  onDropzoneArea,
  handleImageRemove,
  setValues,
  values,
  slug,
  course,
}) => {
  const children = []
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<option key={i.toFixed(2)}>£{i.toFixed(2)}</option>)
  }

  const router = useRouter()

  // console.log(values)

  const classes = useStyles()

  useEffect(() => {
    setValues(course)
  }, [])

  return (
    <Container component="main" maxWidth="sm">
      {/* <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MenuBookIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Course
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Course Title"
            name="title"
            autoFocus
            value={values?.title || ""}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="playlistId"
            label="Playlist Id"
            name="playlistId"
            autoFocus
            value={values?.playlistId || ""}
            onChange={handleChange}
          />

          <TextField
            multiline
            minRows={2}
            maxRows={5}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="text"
            id="description"
            value={values?.description || ""}
            onChange={handleChange}
          />
          <Grid container>
            <Box padding="1.3rem">
              {values?.price && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.paid || false}
                      color="primary"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          paid: e.target.checked || false,
                        })
                      }
                      // onChange={(e) => console.log(e.target.checked)}
                    />
                  }
                  label="Paid"
                />
              )}
            </Box>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Price
              </InputLabel>

              <Select
                native
                value={values?.price || ""}
                onChange={(e) =>
                  setValues({ ...values, price: e.target.value })
                }
              >
                {children}
              </Select>
            </FormControl>
          </Grid>

          <Box mt="2rem">
            <Grid container>
              {values?.images && (
                <>
                  <Grid item xs={8}>
                    <DropzoneArea
                      // initialFiles={[values[0]?.images[0]?.url || ""]}
                      acceptedFiles={["image/*"]}
                      filesLimit={1}
                      maxFileSize={1048576} //1 MB
                      showFileNames={true}
                      dropzoneText={"Drag and drop an image here or click"}
                      onChange={onDropzoneArea}
                      onDelete={handleImageRemove}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Image
                      src={values?.images[0]?.url || "/course.jpg"}
                      alt="Picture of the author"
                      width={200}
                      height={200}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {values.loading ? "Updating..." : "Update & Continue"}
          </Button>
          {values.loading && <CircularProgress />}
          <Grid container>
            <EditList slug={slug} lessons={course?.lessons} />
          </Grid>
        </form>
      </div> */}
    </Container>
  )
}

export default UpdateCourse
