import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/client"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonIcon from "@material-ui/icons/Person"
import AssignmentIcon from "@material-ui/icons/Assignment"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import { loadUser, socialReg } from "../../redux/actions/userActions"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import MenuButton from "../layout/MenuButton"
import InstructorMenu from "./InstructorMenu"
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople"
import { Alert } from "@mui/material"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function Header() {
  const [socialUser, setSocialUser] = useState(false)
  const [session] = useSession()

  // console.log(session)

  const dispatch = useDispatch()

  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  useEffect(() => {
    if (session) {
      const { user } = session

      if (!user.email) {
        setSocialUser(true)
      }

      const userData = {
        id: user.id,
        name: user.name,
        email: user?.email,
        password: user?.password,
      }
      // console.log(dbUser)
      if (!dbUser) {
        if (user.id) {
          dispatch(socialReg(userData))
          console.log(userData)
        }
      }
    }
    if (!dbUser) {
      if (session) {
        dispatch(loadUser())
      }
    }
    if (dbUser?.email) {
      setSocialUser(false)
    } else if (dbUser?.isPassword === false) {
      setSocialUser(true)
    }
  }, [session])

  const classes = useStyles()

  return (
    <div>
      <div component="nav">
        <AppBar position="static" style={{ color: "primary" }}>
          <Toolbar>
            <IconButton aria-label="menu">
              <Link href="/">
                {<img src="/v3.png" height="40px" alt="logo" />}
              </Link>
            </IconButton>

            <Typography variant="h6" className={classes.title}></Typography>

            <>
              {dbUser && dbUser.role && dbUser.role.includes("instructor") ? (
                <InstructorMenu dbUser={dbUser} />
              ) : (
                dbUser && (
                  <Link href="/user/instructor/new">
                    <Button style={{ color: "white" }}>
                      <EmojiPeopleIcon style={{ marginRight: "0.3rem" }} />
                      Become Instructor
                    </Button>
                  </Link>
                )
              )}

              {dbUser ? (
                <>
                  <div></div>

                  <MenuButton dbUser={dbUser} />
                </>
              ) : (
                <>
                  <Link href="/user/register">
                    <Button color="inherit">
                      <AssignmentIcon style={{ marginRight: "0.25rem" }} />
                      Register
                    </Button>
                  </Link>
                  <Link href="/user/login">
                    <Button color="inherit">
                      <PersonIcon style={{ marginRight: "0.25rem" }} />
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </>
          </Toolbar>
        </AppBar>
      </div>
      {socialUser && (
        <Alert severity="warning">
          Complete Your Full User Profile click{" "}
          <Link href="/user/profile">here</Link>
        </Alert>
      )}
    </div>
  )
}

export default Header
