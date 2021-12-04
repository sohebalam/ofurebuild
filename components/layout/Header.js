import Link from "next/link"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import PersonIcon from "@material-ui/icons/Person"
import AssignmentIcon from "@material-ui/icons/Assignment"
import { loadUser, socialReg } from "../../redux/actions/userActions"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import MenuButton from "../layout/MenuButton"
import InstructorMenu from "./InstructorMenu"
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople"
import { Alert } from "@mui/material"
import { wrapper } from "../../redux/store"
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
  const { data: session } = useSession()

  // console.log(session.user)

  const dispatch = useDispatch()

  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  useEffect(() => {
    // if (!dbUser) {
    //   // if (session) {
    //   dispatch(loadUser())
    //   // }
    // }
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
          // console.log(userData)
        }
      }
    }

    if (dbUser?.email) {
      setSocialUser(false)
    } else if (dbUser?.isPassword === false) {
      setSocialUser(true)
    }
  }, [session])

  const AUser = dbUser || session?.user

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
              {(AUser && AUser.role && AUser.role.includes("instructor")) ||
              (session?.user &&
                session?.user.role &&
                session?.user.role.includes("instructor")) ? (
                <InstructorMenu dbUser={dbUser} />
              ) : (
                AUser &&
                AUser.isAllowed === true && (
                  <Link href="/user/instructor/new">
                    <Button style={{ color: "white" }}>
                      <EmojiPeopleIcon style={{ marginRight: "0.3rem" }} />
                      Become Instructor
                    </Button>
                  </Link>
                )
              )}

              {AUser ? (
                <>
                  <div></div>

                  <MenuButton dbUser={AUser} />
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req })

      store.dispatch(loadUser(req.headers.cookie, req))

      if (!session || !session.user.role.includes("user")) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        }
      }
    }
)

export default Header
